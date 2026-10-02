# Master Implementation Plan: Rebuild the Thursdai site to a top-10 standard

Status: Reviewed (6-phase pipeline + 15-persona review). Final confidence: **READY WITH CONDITIONS** (three decisions needed from Jeff, listed in Section G; the first week of work is unblocked).
Input: [GAP LIST] from `docs/competitive-benchmark-2026-10.md` (Thursdai 25th of 25, 56.7/100; eleven of twelve rubric dimensions below the top-10 median; four technical defects).
Scope: marketing site (`thursdai-website`, Next.js 15, Tailwind 4, Velite, Vercel). Product features are out of scope except where the site needs a surface to show them.
Goal stated by Jeff: the site should look like a lot of time, care and money went into it.
Date: October 2, 2026

---

## Section A: Executive Summary

The benchmark put Thursdai last against 24 live AI SaaS sites. The causes split cleanly into three kinds of work, and this plan is sequenced by that split:

1. **Integrity defects that cost nothing to fix and currently cap the site below Drata.** Six empty pages in the nav and sitemap. Metadata, sitemap and robots all pointing at `thursdai.com`, a domain Thursdai does not own that resolves to a GoDaddy for-sale page. A title tag and description that still say "Governed Agent Substrate" four months after the receipts repositioning. A hero button labelled "demo" that scrolls to a slider. These are Week 1.
2. **One owned visual idea, executed with real craft.** Every top-10 site has one (Linear's black, Antimetal's blueprint on stone, Cursor's paintings, Granola's collage, Harvey's painted canvases, Vanta's lavender llama). Thursdai has a kit: three-card grids, indigo on white, five surfaces, a 2021 gradient. The plan commits the site to a single direction, **"The Record"**: a paper-and-ink editorial system in which the signed AI Receipt is the recurring visual signature, headings are set in a licensed editorial serif with real weights, diagrams are drawn as single-colour technical linework, and amber appears in exactly one place, the signature line, so it comes to mean "signed". This is the part Jeff is asking to look expensive, and it is where the money goes: a licensed display typeface, a short engagement with a brand designer for the system and six page templates, a photographer for the team page, and a motion pass.
3. **Proof without customers, done the way the research says it works.** The benchmark's lowest score (Proof 2) cannot be solved by design and must not be solved by invention. The plan replaces the three forms of apology on the current site ("Planned", "Illustrative", "case studies will live here") with the four forms of proof that work before case studies exist: a falsifiable product demonstration (a real `/demo` on sample data, no login), artifacts (a downloadable signed receipt and a sample audit pack, both verifiable against the live API), named constraints (what Thursdai is not for, stated on the home page), and named or context-anonymized endorsers (design partners and advisors) ([Pravin Kumar, 2026](https://www.pravinkumar.co/blog/proof-you-can-show-before-you-have-case-studies-2026)).

**Success.** Re-scored on the benchmark rubric after Phase 4, Thursdai models to 74 to 76 (14th, between Mistral and Anthropic) with Proof at 5. Above that requires customers. Lighthouse CI gates stay green, axe reports zero serious violations on the six templates, and the four integrity defects are covered by an automated test so they cannot recur.

**What changed from the Phase 2 draft after persona review.** Legal and Ethics added a "what Thursdai does not do" constraint block to the home page and tightened the verify-endpoint language. Security required the public verify endpoint be read-only, rate-limited and served from a sample tenant. Accessibility moved the "reduced motion" work from a nice-to-have into the motion item's acceptance criteria and added a contrast gate for the paper palette. CFO forced a budget ceiling and a free-font fallback so the typographic direction cannot stall on a licence. Product Owner reopened the June naming decision ("AI Receipt" vs "Decision Receipt") because this plan touches every heading and it must be settled before the copy pass. UX split the home page rebuild from the IA cascade so the home page can ship first.

---

## Section B: Individual Plans in Implementation Sequence

Sequence rationale: Items 1 and 2 are prerequisites for everything (integrity, then the design system that every later item is built with). Item 3 (demo and CTAs) and Item 4 (proof) run in parallel because the demo is itself the first proof artifact. Item 5 (home page) consumes 2, 3 and 4. Item 6 (visuals and motion) polishes 5. Item 7 cascades to the other 40 pages. Item 8 is the gate.

### [PLAN: Item 1. Integrity fixes]  Complexity: Low  ·  Week 1, days 1 to 2

**Research.** Next.js resolves every relative `openGraph`, `canonical` and `alternates` URL against `metadataBase`; a wrong value leaks into canonical and social tags on every inherited page, and the recommended fix is a single validated origin environment variable plus a post-build test that asserts the origin on representative routes ([Next.js metadata reference](https://nextjs.org/docs/app/api-reference/functions/generate-metadata); [bump.it, metadataBase and wrong canonical previews](https://www.bump.it.com/blog/metadata-base-wrong-canonical-previews)).

**Observed.** `src/app/layout.tsx:20` falls back to `https://thursdai.com` when `NEXT_PUBLIC_SITE_URL` is unset, and hard-codes `thursdai.com` in `openGraph.url` (line 24) and the JSON-LD `Organization` and `WebSite` blocks (lines 53, 54, 66, 69). `sitemap.ts:4` and `robots.ts:3` share the same fallback. `public/` contains only the create-next-app SVGs, so `/og-backgrounds/logo.png` referenced in the JSON-LD does not exist. Six routes render a heading, one sentence and the footer at 905px: `/company/careers`, `/company/press`, `/developers/api`, `/developers/docs`, `/resources/research`, `/trust/certifications`. `/pricing` and `/compare/{harvey,moveworks,writer}` exist in `src/app` but are not in the sitemap (pricing is intentionally parked per the June plan; the three compare pages need a decision).

**Tasks.**
1. Set `NEXT_PUBLIC_SITE_URL=https://getthursdai.com` in Vercel for production and preview; change all three fallbacks to `https://getthursdai.com`; replace the four hard-coded `thursdai.com` strings in `layout.tsx` with `SITE_URL`; remove the `SearchAction` JSON-LD (there is no `/search`).
2. Add `scripts/check-origin.mjs` run in `PR Checks` after build: fetch `/`, `/product`, `/trust`, `/sitemap.xml`, `/robots.txt` from the built output and fail if any absolute URL has a host other than `getthursdai.com`.
3. ✦ [Staff Eng] Add an `opengraph-image.tsx` at `src/app/` using `next/og` that renders the receipt frame (Item 6) with the page title, so every share card is the signature visual. Remove the dead `/og-backgrounds/logo.png` reference.
4. Empty pages: `/developers/api` and `/developers/docs` redirect (308) to `/developers`; `/trust/certifications` redirects to `/trust#certifications` and the cert roadmap (Item 4) lives there; `/resources/research` redirects to `/resources/role-bench` (the only research artifact that exists); `/company/careers` and `/company/press` are removed from `config/nav.ts`, `Footer.tsx` and `sitemap.ts` and return 404 until there is content. Add the redirects in `next.config.ts`.
5. Title and description in `layout.tsx` (lines 17, 26, 42) become: title "Thursdai: a signed record for every AI decision"; description "Thursdai writes a signed AI Receipt for every decision your AI makes and bundles them into audit-ready packs for the EU AI Act, NYC Local Law 144 and ISO 42001." Product hub H1 "The governed agent substrate." becomes "Everything that goes on the record." (Item 7 cascades the rest.)
6. `HeroCTAs.tsx`: rename "Try the replay demo" to "See a replay" as an interim label until Item 3 ships `/demo`, then relink. `ClosingCTAs.tsx` the same.
7. Theme toggle in `TopNav.tsx`: add `aria-label="Toggle colour theme"` now; Item 2 decides whether it stays.
8. Decide the three unlisted compare pages: add to sitemap if they are finished and reviewed to the same standard as the Glean page, otherwise `noindex` them. **[NEEDS CLARIFICATION: are /compare/harvey, /compare/moveworks and /compare/writer finished?]** Default: noindex until reviewed.

**Acceptance.** `check-origin` passes in CI; share card for `/` renders the receipt frame in the Vercel OG preview; zero routes in nav, footer or sitemap return a page under 1,200px tall; title, description, hero and og title all say "signed record" or "on the record"; Lighthouse SEO stays at or above 0.95.

**Blockers.** None. Vercel env access is Jeff's.

### [PLAN: Item 2. "The Record": one visual system]  Complexity: High  ·  Weeks 1 to 3 (design), Week 3 (tokens)

**Research.** Six of the top ten benchmark sites use a serif at display scale; none use gradient text or gradient backgrounds; all run one base surface, one contrast surface and at most one accent. Instrument Serif (the current display face) ships only Regular and Italic, which is why the June commit log records faux-bold at 56px looking wrong and the H1 retreating to Geist. Klim Type Foundry licenses web fonts by monthly page views (minimum tier 20,000 page views or 5,000 unique users) and offers test fonts for comps before purchase ([Klim FAQ](https://klim.co.nz/faqs/)); Signifier and Tiempos Headline are the two Klim faces with the editorial weight range this direction needs. Antimetal uses Signifier. Free alternatives with real optical sizes and weights: Newsreader and Fraunces (both Google Fonts, variable). Freelance rates for a 10 to 20 page redesign run roughly $3,000 to $10,000 over 2 to 6 weeks when the client supplies copy and strategy; agencies run $5,000 to $75,000 ([925 Studios, 2026](https://www.925studios.co/blog/website-redesign-cost-agency-vs-freelancer)). This plan supplies copy, strategy and a built component library, so the designer's scope is the system and six templates, which sits in the freelance band.

**Direction: "The Record."** The product's output is a signed document. The site should look like the institution that issues it: paper, ink, a serif with authority, technical drawings, one seal colour. Concretely:

| Element | Decision |
|---|---|
| Base surface | Paper `#F7F5F0` (replaces `bgLight #fafaf9` and the cream band). One base for all pages. |
| Ink | `#14120F` text, `#5A5650` secondary. |
| Contrast surface | `#14120F` used once per page, the closing CTA. Replaces the navy `#0b0f19` sections. |
| Accent | Indigo `#3e4fb8` kept, for links, buttons and focus only. Hover `#2d3d9e`. |
| Seal | Amber `#e8a34a` reserved for the receipt signature line and the "Signed" seal. Nowhere else. |
| Retired | Dawn gradient (background and text), plum `#5b3a7a`, periwinkle on light, `GradientText.tsx`, the cream tertiary band, status colours outside the receipt. |
| Display type | Tiempos Headline (preferred) or Signifier, licensed from Klim at the lowest page-view tier, Regular and Medium only. Fallback if licence not approved by end of Week 1: Newsreader (Google, variable) at `opsz` 72 for H1 and 36 for H2. |
| Text and UI type | Geist (already loaded, free). Body 17px / 1.6. |
| Mono | Geist Mono for labels (replacing tracked uppercase), receipt fields and code. Labels become `Geist Mono 12px, small caps, letter-spacing 0.04em, colour secondary`. |
| Scale | H1 72px desktop / 40px mobile, H2 44px / 30px, H3 26px / 22px, body 17px, label 12px. Exactly three sizes above body. Line-height 1.05 on display, 1.15 on H2. |
| Signature frame | The receipt: paper card, 1px ink rule, mono fields, serif decision text, amber signature line, "Signed" seal. Codified as `<ReceiptFrame>` and reused as hero, product visual, OG image, blog header, and the compare-page summary card. |
| Linework | Single-colour (ink at 60%) technical drawings on a 4px dot grid for every diagram (three steps, two-tier knowledge, policy flow). No icons in circles. No illustrations with people. |
| Radius and shadow | Radius 2px on frames and buttons (sharp, documentary), 0 on the receipt. Shadows removed except the receipt's one 1px offset rule. |
| Dark mode | Removed from the marketing site. Dark tokens stay in `tokens/thursdai.ts` for the app. Toggle removed from `TopNav`. |
| Wordmark | Unchanged (Instrument Serif "thursdai" with "ai" coloured). It is the one place Instrument Serif survives. |

**Tasks.**
1. Week 1: Jeff approves the direction and the budget (Section G). Download Klim test fonts, set a comp of the home hero in both candidate faces and in Newsreader, choose.
2. Week 1: engage a brand designer (Section G, budget) with this brief: produce the system above as a Figma file with tokens, the `ReceiptFrame`, the linework style with three drawn diagrams, and six page templates (home, product pillar, solution, trust, blog post, compare). Two rounds of revision. The designer is not writing copy and not building.
3. Week 3: encode tokens in `src/tokens/thursdai.ts` and `globals.css`; update `Display.tsx`, `Heading.tsx`, `Label.tsx`, `Body.tsx`, `Button.tsx`, `Card.tsx`, `Section.tsx` (padding 128px desktop / 80px mobile, no background prop), delete `GradientText.tsx`, build `ReceiptFrame.tsx` from `AiReceiptCard.tsx`.
4. ✦ [Accessibility] Run every text/background pair in the new palette through a contrast check before the tokens merge; paper `#F7F5F0` on ink is 15.9:1, secondary ink `#5A5650` on paper must stay above 7:1, amber on paper is decorative only and never carries text. Keep `borderFocus` indigo at 3:1 against paper.
5. ✦ [Security] Self-host the licensed font files under `public/fonts` with `next/font/local`; do not load from a third-party CDN (CSP is already strict per the Clarity commits).

**Acceptance.** One base surface and one contrast surface per page; zero gradients in the CSS; display face loads with `font-display: swap` and a metric-matched fallback so CLS stays under 0.05; all six templates approved by Jeff in Figma before build; licence on file.

**Blockers.** Budget approval (G2). Designer availability; fallback is Jeff building from the token table above without a designer, which this plan rates as reaching 7s not 8s on the visual rubric.

### [PLAN: Item 3. A real demo and a CTA system that does what it says]  Complexity: Medium  ·  Weeks 2 to 3

**Research.** The benchmark's top CTA scores (Arize 9, Attio 9) pair a slow path (demo request) with a fast path that is real: a sandbox, a download or a free tier. "Try the demo" that scrolls to a slider is the pattern the bottom 10 share. The site already has the components for a real demo: `ReplayDemo.tsx`, `ReplayDemoTabs.tsx`, `TimeTravelScrubber.tsx`, `PolicyEditor.tsx`, `AiReceiptCard.tsx` and static `config/demo-data.ts`.

**Tasks.**
1. Build `/demo` under `(marketing)`: a full-page, no-login walk through one hiring decision on a sample tenant. Three panes in sequence: the receipt (ReceiptFrame), the replay (TimeTravelScrubber), the audit pack (a rendered one-page pack with the receipt's hash). Every pane labelled "Sample tenant: Northwind Financial (fictional). Real signatures." The label replaces "Illustrative data" site-wide (five occurrences in `src`).
2. ✦ [Security] ✦ [Staff Eng] Add `GET /v1/receipts/verify?id=` on the API for the sample tenant only: read-only, unauthenticated, rate-limited at the edge (60/min/IP), returns `{id, sha256, signed_at, valid}`. The `/demo` receipt and the downloadable receipt (Item 4) both carry a "Verify this receipt" button that calls it in-page and shows the response. **[NEEDS CLARIFICATION: is a public read-only verify route acceptable on api.thursdai.com, or should it be a Next route handler at /api/verify backed by a static signed fixture?]** Default: Next route handler with a static fixture signed once, so the website has no dependency on API uptime.
3. CTA system, one primary per page: Home hero "Open the demo" (→ `/demo`) + "Request a pilot" (modal). Nav: "Request a pilot" (modal), "Demo" as a text link. Product and solution pages: "Open the demo" primary. Compare pages: "Request a pilot" primary (the reader has just been told why the alternative is not enough). Developers: "Verify a receipt" primary (runs the curl in-page) + "Read the API" (→ the SDK page until docs exist). Closing CTA on every page repeats the page's primary.
4. `DemoRequestModal.tsx`: rename title to "Request a pilot", keep the one open question field, add the HubSpot source property `cta_location` so PostHog/HubSpot can attribute by placement.
5. ✦ [Customer Success] `/demo` ends with "What the real thing adds": tenant isolation, your policies, your corpus, SSO. Sets pilot expectations before the form.

**Acceptance.** `/demo` loads in under 2s LCP on Lighthouse CI (add it to `lighthouserc.json`); no button on the site is labelled "demo" unless it opens `/demo`; verify button returns `valid: true` for the sample receipt and `valid: false` for a tampered id; PostHog funnel `hero_cta → /demo → request_pilot` reports.

**Blockers.** G3 (verify route location). Sample tenant data must be reviewed for anything resembling a real person (Legal).

### [PLAN: Item 4. Proof without customers]  Complexity: Medium (content) / Low (build)  ·  Weeks 2 to 4

**Research.** For startups without case studies the forms of proof that work are: a falsifiable product demonstration on real-shaped data; artifacts a buyer can hold; named constraints ("costly to say and nobody fakes a limitation"); and named endorsers, or anonymized ones with concrete context when NDAs apply ([Pravin Kumar](https://www.pravinkumar.co/blog/proof-you-can-show-before-you-have-case-studies-2026)). Investor logos and unaffiliated badges solve the wrong doubt. All standing honesty constraints from the June plan carry forward: no fabricated metrics or customers, pricing parked, certs never implied as held, evidence-not-auditor.

**Tasks.**
1. **Proof band** replaces the industry strip under the hero. Three cells on one rule: (a) one number with a source, "EU AI Act Annex III requires six months of logs for every automated hiring, credit and insurance decision. Art. 12." linked to `/trust/annex-iii`; (b) design-partner context tiles, anonymized if required, with industry, headcount band and use case ("Regional bank, 2,000 staff, loan-officer copilot"), count stated plainly ("2 design partners in pilot"); (c) one named endorser with a face: an advisor, a design-partner sponsor, or a named practitioner who has reviewed the receipt format, with the relationship disclosed. **[NEEDS CLARIFICATION: who can be named? Shawn Harrs or another advisor?]** Default: ship (a) and (b), hold (c) until a name is confirmed; the band is designed for two or three cells.
2. **Artifacts.** A downloadable sample AI Receipt (PDF and JSON) and a sample audit pack (PDF, 4 pages) from the sample tenant, each carrying the hash the verify route checks. Linked from the proof band, `/product/ai-receipts`, `/product/compliance-packs` and `/trust`. These replace the "Download the security pack" email gate on `/trust`; the security pack stays gated.
3. **Named constraints** block on the home page, beat 2b, in the serif: "Thursdai is not a chatbot, not an auditor and not a model. It records what your AI systems decided, signs it and makes it provable. If you need a general assistant, Copilot is better." ✦ [Legal] ✦ [Ethics] The block must include "proof of what happened, not that it was right."
4. **Certification roadmap** on `/trust#certifications`: a dated table (control, status, auditor engaged yes/no, target quarter) replacing the "Planned" badges. `CertBadge` statuses become `ready | in-audit | scheduled` with the quarter shown. "FedRAMP Moderate" is removed until there is an agency sponsor. **[NEEDS CLARIFICATION: real dates and auditor status for SOC 2 Type II, ISO 27001, ISO 42001.]**
5. **Team.** A photographed headshot for `/company/team`, LinkedIn link, and the founder paragraph from `/company` promoted to the hero of that page with the design-partner CTA. The "laid off" sentence stays only if Jeff wants it; it reads as candid to founders and as risk to procurement. ✦ [Product Owner] Default: keep it on `/company`, remove it from `/company/team`.
6. **Customers page** becomes "Design partners": the apply form stays, the empty-promise copy goes, the anonymized tiles from the proof band repeat here with one paragraph each.

**Acceptance.** Proof band renders with at least two cells on launch; both artifacts verify; zero occurrences of "Planned", "Illustrative" or "will live here" in `src`; every claim in the band has a link to its source or a disclosed relationship; Legal review signed on the constraint block and tiles.

**Blockers.** Design-partner permission for tiles (even anonymized), a named endorser, cert dates.

### [PLAN: Item 5. Home page: seven beats]  Complexity: Medium  ·  Week 4

**Research.** Top-10 home pages run 4 to 10 beats with the problem stated second or third in one sentence with a number; features appear only after proof; the closing CTA repeats the headline. Thursdai currently runs 13 beats with the problem at beat 8 and receipts explained twice (benchmark 6.6).

**Tasks.** Rebuild `src/app/(marketing)/page.tsx` as:
1. **Hero.** H1 "Every AI decision, on the record." in the display serif, solid ink, no gradient. One line: "Thursdai writes a signed AI Receipt for every decision your AI makes, so your auditors see the answer, the policy and the sources." (Pending G1 naming.) Buttons "Open the demo" / "Request a pilot". The `ReceiptFrame` right, signing on load (Item 6). The three checkmarks are deleted.
2. **Problem.** One paragraph, 60% width, serif, with the Annex III number and a link. Followed by the constraints block (Item 4.3) as a short second paragraph.
3. **Proof band** (Item 4.1).
4. **The receipt, once.** Two columns: real screenshot of the receipt viewer (Item 6) left, four mono-labelled facts right (what is captured, how it is signed, how it is verified, how long it is kept).
5. **Replay and packs.** Full-bleed `TimeTravelScrubber` with the audit pack rendered beside it. The one interactive moment on the page.
6. **Policy as code.** `PolicyEditor` left, the `RECORD_RECEIPT_SNIPPET` in `CodeBlock` right, under one heading. (June REC-10 closed.)
7. **Close.** Ink surface, "Every AI decision, on the record." repeated, "Open the demo", one line about pilots.

Removed from home: industries strip, three-steps grid, decision intelligence, People, Agent, comparisons, cert strip, API cards, executive dashboard. All exist on their own pages; the nav and footer keep them reachable.

**Acceptance.** Seven `<Section>`s; page height between 5,500 and 7,500px at 1440 wide; problem statement visible by 1,100px scroll; one primary CTA above the fold; Lighthouse performance at or above 0.9 with the display font loaded; benchmark re-score of Narrative at 8.

**Blockers.** Items 2, 3 and 4 must have shipped their pieces. If 4.1(c) has no name, the band ships with two cells.

### [PLAN: Item 6. Product visuals and motion]  Complexity: Medium  ·  Weeks 4 to 5

**Research.** Nine of the top ten show real product UI in every feature section; HTML mockups and icon cards are the signature of the bottom half. Motion in the top 10 is one entrance per element, once, under 300ms, with the hero carrying one signature moment. WCAG 2.2 SC 2.3.3 asks that motion triggered by interaction be disableable; `useReducedMotion` from the Motion library (already a dependency as `framer-motion`) returns the user's `prefers-reduced-motion` setting so animations can be replaced with instant states ([Motion docs](https://motion.dev/docs/react-use-reduced-motion)).

**Tasks.**
1. **Screenshots.** `/demo` runs real code against the sample tenant, so its three panes are legitimate product surfaces. Capture them with Playwright at 2x in window chrome (`scripts/capture-product.mjs`, deterministic) and commit to `public/product/`. Use them in home beat 4, `/product/ai-receipts`, `/product/time-travel`, `/product/compliance-packs`. **[NEEDS CLARIFICATION: does the tenant app have screens beyond what /demo shows that can be captured for Policy-as-Code, Two-Tier Knowledge and Ambient Cases?]** Default: those three pillars use linework diagrams, not mockups, until real screens exist.
2. **Linework diagrams** from the designer (Item 2): three steps, two-tier knowledge, policy flow, moderator roles. SVG, inline, currentColor, so they adapt if the app ever reuses them.
3. **Blog headers.** `ReceiptFrame` variant with the post title as the "decision" line and the date as the timestamp, generated by the same `next/og` component as the share image, used as the post hero.
4. **Motion.** Exactly three behaviours, in `src/lib/motion.ts`: (a) hero receipt "signs" on load: signature hash types in over 600ms, amber rule draws, "Signed" seal fades in; (b) product screenshots and diagrams rise 12px and fade over 240ms on first viewport entry, once; (c) mega-menu and modal open at 180ms with the existing `panel` easing. Everything else static. ✦ [Accessibility] Every one of the three is wrapped in `useReducedMotion`: with reduced motion the receipt renders already signed and screenshots render in place. Add a visible "Pause" control only if any animation ever loops (none do in this plan).
5. Hover: buttons darken 8%, links underline-offset shifts, cards do nothing (they are no longer links).

**Acceptance.** No `<img>` on a product or home page that is not a real capture or an SVG diagram; `prefers-reduced-motion: reduce` in Playwright produces a static page with the signed receipt visible at first paint; CLS under 0.05 with the signing animation; benchmark re-score of Imagery at 8, Motion at 7.

**Blockers.** Designer deliverables (Item 2); app screens (clarification).

### [PLAN: Item 7. Cascade across the other 40 pages]  Complexity: Medium  ·  Weeks 5 to 6

**Tasks.**
1. Apply the six templates: 7 product pillars, 2 solutions, trust + 6, developers + 3 (after redirects), company + 1, 3 to 6 compare pages, blog index + 5 posts, role-bench, security.
2. `/solutions` becomes two cards in the serif: "For compliance and risk" and "For HR and People", each with its own page and "Open the demo" CTA (benchmark 6.11). The hero sub-line on every solution page names the buyer.
3. Copy pass with the canonical vocabulary from the June glossary; zero "AIDR", zero "substrate" in headings; "AI Receipt" or "Decision Receipt" per G1; no em dashes; no Oxford commas; prose fills the column.
4. `config/nav.ts`: Product (mega-menu, pillars reordered receipts → replay → packs → policy → knowledge → cases → moderator, already so), Solutions, Developers, Trust, Company; "Demo" as a text link; "Request a pilot" button. Customers folds into Company as "Design partners". Five items plus one CTA.
5. Footer: remove the newsletter form unless it is wired and used (it posts nowhere visible); keep product, developers, trust, company columns and the wordmark.
6. ✦ [Technical Writer] `/developers`: until real docs exist, the page is the docs: authentication, the receipt schema, the three endpoints and rate limits, which it already contains. Rename the "API Reference" card to "Reference (on this page)" rather than linking to an empty route.

**Acceptance.** Every page uses one of the six templates; sitemap matches nav and footer exactly; `grep -r "substrate\|AIDR\|Illustrative" src` returns nothing; mobile capture of all pages shows no horizontal overflow (already true, keep it).

### [PLAN: Item 8. Quality gates and the re-score]  Complexity: Low  ·  Week 6 and ongoing

**Tasks.**
1. Extend `lighthouserc.json` URLs with `/demo`, `/product/ai-receipts`, `/solutions/people` and keep the existing thresholds (performance 0.9, accessibility 0.97, LCP 2,000ms, CLS 0.05).
2. Add axe-core via Playwright on the six templates in `PR Checks`; fail on serious or critical.
3. Add Playwright visual snapshots of the six templates at 1440 and 390 to catch regressions in the design system.
4. `check-origin` (Item 1) and a `check-empty-pages` script (fail any sitemap route under 1,200px) in CI.
5. Re-run the benchmark rubric on the live site in Week 7 using the capture scripts in the session workspace; target total at or above 74 with no dimension under 6. Record it in `docs/benchmark-2026-10.md` as a second column.
6. ✦ [CFO] PostHog funnel and Clarity recordings reviewed at Week 8: hero CTA click rate, `/demo` completion, pilot requests. These numbers, not the rubric, are the outcome measure.

**Acceptance.** All gates green on `main`; re-score documented; funnel dashboard shared.

---

## Section C: Dependency Map

1. **Item 1 (integrity)** has no dependencies and ships first. Nothing else should go live under the wrong origin.
2. **Item 2 (design system)** depends on G2 (budget) for the licensed face; the token work can start on the Newsreader fallback immediately.
3. **Item 3 (demo and CTAs)** depends on G3 (verify route) and on `ReceiptFrame` from Item 2 for its final look, but can be built on the current `AiReceiptCard` and restyled.
4. **Item 4 (proof)** depends on Item 3 for the verifiable artifacts and on G4 (names and cert dates) for cells (c) and the roadmap.
5. **Item 5 (home)** depends on 2, 3 and 4.
6. **Item 6 (visuals and motion)** depends on 2 (diagrams) and 3 (`/demo` for screenshots); motion depends on 5.
7. **Item 7 (cascade)** depends on 2 and 5 and on G1 (naming) for the copy pass.
8. **Item 8 (gates)** runs from Week 1 (origin and empty-page checks) and closes in Week 6 to 7.

Critical path: G2 → designer engagement → templates (Week 3) → home (Week 4) → cascade (Weeks 5 to 6). If G2 is declined, the critical path shortens by a week and the visual ceiling drops to roughly 7 per dimension.

---

## Section D: Conflict Detection and Resolution

1. **Horizon brand guide (April 2026, "dawn gradient") vs "The Record."** The tokens file says the dawn gradient is the brand. This plan retires it from the website and keeps the wordmark. Resolution: the brand guide is updated to version 2 as a deliverable of Item 2; the gradient may survive in the app if Jeff wants continuity there. **[ESCALATE TO STAKEHOLDERS: G2 includes approving the brand change.]**
2. **June REC-12 ("typography: no changes") vs Item 2.** The June call was made against a general B2B set; against the AI set typography is three points under median. Resolution: REC-12 is superseded; recorded in the benchmark's status table.
3. **June REC-06 (gradient text on the closing CTA) vs Item 2.** Superseded; both gradient uses are removed.
4. **Honesty constraints vs "look like we spent money."** Premium craft is not a claim; it cannot conflict with the no-fabrication rule as long as every proof cell has a source. Resolution: the Legal review in Item 4 is the gate, and the design system contains no component for logos until there are logos to put in it (`LogoWall.tsx` stays unused and is removed from the index export).
5. **Dark mode removal vs existing dark tokens and the app.** Resolution: tokens remain; only the marketing toggle and the `(marketing)` dark variants are removed. `(standalone)` and the app are untouched.
6. **`/demo` as a public product surface vs Security's "no real data on the marketing site."** Resolution: the sample tenant is fictional, static and signed once; the verify route is read-only against a fixture (G3 default). No live tenant is ever reachable from the marketing domain.
7. **Naming (G1) vs copy work in Items 5 and 7.** Resolution: Item 5 ships with "AI Receipt" if G1 is unanswered by Week 3, and a single `RECEIPT_TERM` constant in `config` makes a later change a one-line edit. This is the same default the June plan recorded.
8. **Removing Customers from nav vs the design-partner recruiting goal.** Resolution: "Design partners" is the second item in the Company menu and is linked from the proof band, which is more prominent than a nav item nobody clicks on a site with no customers.

No circular dependencies. The integrated plan is internally consistent.

---

## Section E: Domain Accountability Matrix

| Plan item | Primary | Secondary | Key acceptance | Escalation |
|---|---|---|---|---|
| 1 Integrity | Staff Eng | SEO (Technical Writer) | check-origin green; no empty routes; aligned titles | Jeff (Vercel env) |
| 2 Design system | UX / brand designer | Accessibility, Security (font hosting) | Six templates approved; contrast gate; licence on file | Jeff (G2) |
| 3 Demo and CTAs | Product Owner | Security, Staff Eng, Customer Success | /demo LCP < 2s; verify works; one primary per page | Jeff (G3) |
| 4 Proof | Marketing | Legal, Ethics, Compliance | Every cell sourced; zero "Planned/Illustrative"; Legal sign-off | Jeff (G4) |
| 5 Home | Marketing / UX | Product Owner, QA | Seven beats; problem second; re-score Narrative 8 | Jeff (final copy) |
| 6 Visuals and motion | UX | Accessibility, Staff Eng | Real captures only; reduced-motion static; CLS < 0.05 | Jeff (app screens) |
| 7 Cascade | Marketing / Eng | Technical Writer, QA | Templates everywhere; vocabulary clean; sitemap = nav | G1 |
| 8 Gates | QA / DevOps | CFO (funnel) | All CI gates green; re-score ≥ 74 | None |

---

## Section F: Integrated Risk Register

| ID | Risk | Source | Likelihood | Impact | Mitigation in plan | Residual | Owner |
|---|---|---|---|---|---|---|---|
| R1 | Share cards and crawlers keep pointing at a for-sale domain until Item 1 ships | Staff Eng, SEO | High (today) | High | Item 1 day 1; CI check prevents recurrence | Very low | Staff Eng |
| R2 | Licensed font stalls the visual direction | CFO, UX | Medium | Medium | Newsreader fallback chosen in Week 1; tokens built font-agnostic | Low | UX |
| R3 | Designer engagement overruns or produces a generic system | CFO, Product Owner | Medium | High | Fixed brief (system + six templates), two revision rounds, the token table in Item 2 as the floor | Medium | Jeff |
| R4 | Proof band ships with content that implies endorsement or compliance it does not have | Legal, Ethics, Compliance | Medium | High | Every cell sourced; constraints block; "proof of what happened, not that it was right"; Legal gate | Low | Marketing |
| R5 | Public verify route becomes an attack or cost surface | Security, DevOps | Low with G3 default | Medium | Static fixture via Next route; rate limit; no tenant access | Very low | Security |
| R6 | `/demo` is mistaken for the product and sets wrong pilot expectations | Customer Success | Medium | Medium | "What the real thing adds" closing pane; sample tenant label on every pane | Low | Product Owner |
| R7 | Removing dark mode and the gradient breaks brand continuity with the app | UX, Product Owner | Medium | Low | Brand guide v2; app untouched; wordmark unchanged | Low | UX |
| R8 | Display serif hurts LCP or CLS | Staff Eng, QA | Medium | Medium | Self-hosted, swap, metric-matched fallback; Lighthouse gate | Low | Staff Eng |
| R9 | Motion fails WCAG 2.3.3 for vestibular users | Accessibility | Low | Medium | useReducedMotion on all three behaviours; static fallback in acceptance | Very low | UX |
| R10 | Copy pass regresses the June honesty constraints or reintroduces "substrate" | Technical Writer, QA | Medium | Medium | grep gate in CI; glossary; RECEIPT_TERM constant | Low | Marketing |
| R11 | No design partner agrees to even an anonymized tile | Marketing | Medium | High | Band designed for two cells; artifacts and constraints carry proof until a tile exists | Medium | Jeff |
| R12 | Six weeks of site work displaces product and pilot work for a one-person company | CFO, Product Owner | High | Medium | Weeks 1 and 2 are the highest-return and cheapest; Weeks 3 to 6 are designer-led with Jeff reviewing; stop after Item 5 if a pilot needs the time | Medium | Jeff |

---

## Section G: Open Questions and Escalations (need Jeff)

1. **G1. Naming (carried from June, still open).** "AI Receipt" (live today) or "Decision Receipt" (June recommendation, collision-safe)? Blocks the Item 7 copy pass; Item 5 ships either way via `RECEIPT_TERM`. *Default:* "AI Receipt" on the site as-is, because changing it site-wide mid-rebuild doubles the copy work; revisit when the first pack ships to a design partner.
2. **G2. Budget and brand change.** Approve: (a) a Klim web licence for Tiempos Headline or Signifier at the lowest tier (quote required; test fonts are free); (b) a freelance brand designer for the system and six templates, budget band $4,000 to $8,000 for a 2 to 3 week engagement with the brief in Item 2; (c) a headshot session; (d) retiring the dawn gradient on the website. *Default if no answer by end of Week 1:* Newsreader, no designer, Jeff builds from the token table; expect 7s not 8s on the visual rubric.
3. **G3. Verify route.** Public read-only route on `api.thursdai.com` or a Next route handler against a static signed fixture? *Default:* Next route handler with a fixture; zero dependency on the API from the marketing domain.
4. **G4. Proof inputs.** Who can be named as an endorser (advisor or design-partner sponsor)? Which design partners allow an anonymized tile? Real dates and auditor status for SOC 2 Type II, ISO 27001 and ISO 42001? *Default:* ship the band with the Annex III number and the artifacts; add tiles and names as permissions arrive; the cert table shows "scheduled, quarter TBD" rather than "Planned".
5. **G5. App screens.** Are there tenant-app screens beyond the three `/demo` panes that can be captured? *Default:* linework for the remaining pillars.
6. **G6. The three unlisted compare pages** (Harvey, Moveworks, Writer): finished or not? *Default:* noindex.

---

## Timeline and budget at a glance

| Week | Work | Spend |
|---|---|---|
| 1 | Item 1 complete. Direction and budget decided. Font comps. Designer engaged. Item 3 build starts on current components. | Font licence quote; designer deposit |
| 2 | Item 3 `/demo` and CTA system ship. Item 4 artifacts generated and verifiable. Designer: system and ReceiptFrame. | |
| 3 | Tokens encoded. Designer: six templates. Item 4 proof band content and Legal review. | Headshot session |
| 4 | Item 5 home page ships on the new system. Item 6 captures and motion. | |
| 5 to 6 | Item 7 cascade. Item 8 gates. | |
| 7 | Re-score. Funnel review at Week 8. | |

Total external spend if G2 is approved in full: roughly $5,000 to $10,000 (designer $4,000 to $8,000 per the freelance band, font licence at the entry tier, headshots). Internal: about 60 to 80 hours of Jeff's time across six weeks, front-loaded in Weeks 1, 2 and 4.

---

## Phase 3 Persona Findings (condensed; CRITICAL and HIGH absorbed above)

- **Staff Engineer (CRITICAL):** the `thursdai.com` fallback and hard-coded strings (R1); OG image file missing; redirects belong in `next.config.ts` not middleware; font self-hosting under CSP.
- **Director of Security (HIGH):** public verify route must be read-only, rate-limited and fixture-backed by default (R5); no live tenant reachable from the marketing origin; fonts self-hosted.
- **Legal Counsel (HIGH):** proof band wording must not imply endorsement by unnamed parties or compliance not held; "proof of what happened, not that it was right"; sample tenant must be fictional and labelled; cert table must not read as certification.
- **Ethics Officer (HIGH):** constraints block is the single most trust-building addition; keep "not an auditor"; hiring-decision sample data must avoid protected attributes.
- **Director of Auditing and Compliance (MEDIUM):** cert roadmap with dates is better than badges; audit pack sample must match what the product actually exports.
- **Product Owner (HIGH):** reopen G1 before the copy pass; keep Moderator present-but-secondary (unchanged from June); R12, do not let the site eat pilot time; ship Items 1 to 5 before 6 to 8 if forced to choose.
- **Director of UX (HIGH):** split home from cascade; seven beats; one primary per page; remove cards-as-links; "Open the demo" must open something.
- **Accessibility Specialist (HIGH):** contrast gate on the paper palette; `useReducedMotion` on every animation; focus ring visible on paper; mono small-caps labels must stay above 12px and 4.5:1.
- **Director of Engineering (MEDIUM):** tokens-first then templates so the cascade is mechanical; visual snapshots to protect the system.
- **Infrastructure and DevOps (LOW):** add `/demo` to Lighthouse CI; env var set on preview too so preview share cards are right.
- **CFO (HIGH):** budget ceiling and a free fallback (G2); outcome measure is the funnel, not the rubric; stop-point after Item 5.
- **QA (MEDIUM):** origin, empty-page, grep and axe gates in CI; visual snapshots at two widths.
- **Technical Writer (HIGH):** `/developers` becomes the reference until docs exist; "API Reference" must not link to an empty route; glossary enforced by grep.
- **Customer Success (MEDIUM):** `/demo` closing pane sets pilot expectations (R6); pilot request form keeps one open question.
- **Data Science (LOW):** sample receipt confidence and model fields must reflect what the product records; no implied evaluation of model correctness.

---

## Phase 6: Overall Readiness Assessment

Vote: **11 APPROVE WITH CONDITIONS, 4 APPROVE, 0 DO NOT APPROVE.**

Non-negotiable conditions before build:
1. Item 1 ships before anything else goes live (R1).
2. G2 decided by end of Week 1, with the Newsreader fallback as the default so Item 2 cannot stall.
3. Every proof cell has a source or a disclosed relationship, and the constraints block ships with the home page (R4).
4. The verify route is read-only and fixture-backed unless G3 says otherwise (R5).
5. All three motion behaviours respect `prefers-reduced-motion` (R9).

Unresolved questions: G1 through G6 (defaults recorded for each).

Final confidence: **READY WITH CONDITIONS.** Week 1 is fully unblocked and is the highest-return work in the plan. The premium result Jeff is asking for depends on G2: with the licence and the designer the plan models to the mid-70s on the benchmark rubric, which is the ceiling for a site with no customers; without them the same plan lands around 70.

Plain-language next step: fix the domain, the empty pages and the title today; pick the display face from the Klim test fonts this week and approve the designer budget; while the designer works, build `/demo` and generate the two verifiable artifacts; rebuild the home page as seven beats in Week 4; cascade and gate in Weeks 5 and 6; re-score in Week 7.
