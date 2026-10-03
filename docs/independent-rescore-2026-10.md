# Independent re-score of getthursdai.com

**Date:** October 3, 2026
**Subject:** https://getthursdai.com, live, as a visitor sees it
**Reviewer:** an independent AI agent. It did not build any part of the site and did not read the builders' own scores, decision log, design notes, plans, PR descriptions or commit history. The only repository document consulted was `docs/competitive-benchmark-2026-10.md`, for the rubric, the 24 comparison scorecards and the original October 2 Thursdai scorecard, so that this pass uses the same scale as the original scorer.

## Method

- Fetched every URL in the live `sitemap.xml` (18 pages) plus `/privacy`, `/terms`, `/compare/glean` and `/company` with headless Chromium. Captured DOM text, title, description, `og:url`, canonical, computed fonts, page height, console errors, load time and horizontal overflow at 1440x900 and 390x844 (mobile UA, 2x).
- Screenshots (viewport and full page, desktop and mobile) of home, `/demo`, `/product`, `/product/ai-receipts`, `/solutions`, `/trust`, `/developers`, `/compare/glean` and `/company`, viewed and judged by eye. Full-page captures were repeated after a scroll-through because sections reveal on scroll.
- Interactive pieces exercised: the demo "Verify this receipt" and "Try a tampered id" buttons, the replay slider (keyboard Home and End), the Product mega-menu, the mobile menu, the "Request a pilot" modal (opened, not submitted), the cookie banner and a dark color-scheme render.
- Every internal link found on the crawled pages was requested once (23 unique URLs, all 200). External links were requested once. A random path was requested to check the 404.
- Downloaded the sample receipt JSON and the published production key set at `app.getthursdai.com/.well-known/aidr-keys.json`, and called `/api/verify` directly.
- Scored the 12 dimensions on the benchmark's anchors (9 to 10 studied by designers; 7 to 8 professional, nothing to fix; 5 to 6 competent but generic or with seams; 3 to 4 hurts trust; 1 to 2 absent). Total = visual mean x 5 + marketing mean x 5.

**Limitations.** One AI reviewer, one session, one day. No real buyer interviews, no usability study, no eye tracking. Legal and regulatory observations are a careful reader's checks, not legal advice. The original benchmark was scored by a different reviewer, so a difference of one point on a single dimension is within calibration noise; differences of two or more are meaningful.

## Scorecard

| # | Dimension | Oct 2 | Now | Evidence |
|---|---|---|---|---|
| 1 | Typography | 6 | 8 | Newsreader serif display at 72px (H1) and 44px (H2), Geist body at 17px, Geist Mono for labels and the receipt; no gradient text; one consistent system on every page checked. Free typefaces and some long mono runs keep it short of Antimetal or Harvey. |
| 2 | Layout and spacing | 6 | 7 | Stone base, hairline rules, label-left / content-right rhythm, generous margins (home, `/trust`, `/company/team`). Seams: the home page shows the same receipt three times; `/solutions` is two cards and a paragraph; some two-column sections leave a large dead left column. |
| 3 | Color and theming | 6 | 7 | One base (stone), one ink, one indigo for actions, amber reserved for the signature rule, one dark closing band. Disciplined, but indigo buttons on stone are not an owned look in the way Vanta's lavender or Linear's black are. |
| 4 | Motion and interaction | 6 | 7 | `/demo` verify calls a real endpoint and renders the JSON response; the tampered id returns `valid: false`; the replay slider is keyboard accessible and rewrites the panel per point in time; policy tabs; mega-menu; scroll reveals. Purposeful and working, nothing memorable. |
| 5 | Imagery and product visuals | 5 | 6 | The receipt card, audit-pack card and technical line diagrams (`/product/ai-receipts` "Capture, check, sign") share one hand and look intentional. Still no screenshot of the actual product anywhere on the site, and the same sample receipt is the visual on nearly every page. |
| 6 | Polish and craft | 5 | 6 | Fixed: domain, title, empty pages, broken nav. Every internal link returns 200, no console errors, no mobile overflow, real 404. New seams: `/privacy` and `/terms` are public drafts with bracketed counsel placeholders including the legal entity name; the same "demonstration key" paragraph appears twice in one section on several pillar pages; `og:url` is the home URL on every page and there is no canonical; mobile cookie banner covers about a quarter of the first screen. |
| 7 | Headline and value proposition | 7 | 8 | "Every AI decision, on the record." with a one-sentence sub that names the artifact; checkmarks gone; hero is headline, sub, two buttons, receipt. |
| 8 | Audience targeting | 7 | 8 | `/solutions` names two buyers (compliance and risk; HR and People) with separate pages that cite the rules each answers to; `/developers` is clearly for engineers; `/security` is written for vendor review. |
| 9 | Proof and trust | 2 | 4 | Still no customer, logo, quote, advisor, investor or certification ("Certifications held: None"). What is new is checkable: a signed sample with a live verifier, downloadable PDFs and JSON, sourced regulation links, a candid security overview with subprocessors. Candor plus a sample is better than apology, but there is no third party vouching for anything. |
| 10 | Narrative structure | 6 | 7 | Home: hero, problem (second beat, with the Article 99 number), what Thursdai is not, regulation, sample artifacts, the receipt, replay and pack, policy as code, close. Clear and in the right order; slowed by showing the receipt three times. |
| 11 | Calls to action | 5 | 7 | "Open the demo" now goes to a real no-login demo; "Request a pilot" opens a short four-field modal; the pair is consistent site-wide; `/developers` adds "Verify a receipt". No self-serve product, sandbox or pricing. |
| 12 | Differentiation | 7 | 7 | The signed AI Receipt as the named artifact, "What Thursdai is not" and "Proof of what happened, not that it was right" are sharp. The compare pages that carried the contrast with Copilot, ChatGPT Enterprise and Glean are gone (`/compare/glean` silently lands on `/product`). |

## Total and leaderboard position

- Visual: (8 + 7 + 7 + 7 + 6 + 6) / 6 = 6.83, so 68.3 / 100
- Marketing: (8 + 8 + 4 + 7 + 7 + 7) / 6 = 6.83, so 68.3 / 100
- **Total: 68.3 / 100** (October 2: 56.7, change +11.6)

On the original board this ties Credo AI, Runway and Sierra at 68.3, which occupy places 18 to 20. Placed among them, Thursdai is **tied 18th of 25** (21st if the four-way tie is broken against the newcomer). It moves past Lakera (65.8), Drata (61.7), Searchable (60.0) and Patronus AI (57.5) and sits 2.5 points behind Galileo (70.8). It is 9.2 points below the 10th-place site.

The gap to the top half is almost entirely Proof (4 against a top-10 median of 8) and Imagery (6 against 9). Neither is a design problem now.

## The five most important remaining weaknesses

Ranked by what they cost with a serious buyer, not by effort to fix.

1. **No third party vouches for anything.** No customer, logo, named quote, advisor, investor, auditor or certification; the trust page says "None" and every roadmap row says "No date". Honesty is to the site's credit, but a top-10 site always has at least one outside voice. Even one named design partner or advisor quote would move Proof more than any redesign.
2. **Draft legal pages are live.** `/privacy` and `/terms` carry "Draft pending legal review" and bracketed instructions to counsel, including "[confirm legal entity name, place of organisation and registered address]", "[retention period]" and "[Limitation of liability clause to be drafted by counsel]". For a product sold to compliance teams this is the single most damaging page on the site, because it is exactly the page a compliance reviewer opens first.
3. **The product itself is never shown.** Every visual on every page is the same fictional receipt, its pack or a line diagram. There is no screenshot of the tenant app, the receipt viewer, the dashboard or a real (redacted) pack. A buyer cannot tell whether a working product exists beyond the sample, and the published key set reports `"signOnWriteSince": null`, which reads as "production signing is not switched on yet".
4. **The "no need to trust us" verification is circular.** The sample is signed with a demonstration Ed25519 key that is not in the published key set; the public key used to verify it ships inside the same JSON file; the verifier is hosted by the vendor; and "Try a tampered id" is a lookup of a non-existent id, not a tampered record failing a signature check. A technical evaluator will notice that the demo proves the file is internally consistent, not that Thursdai produced it.
5. **Template repetition and thin pages.** All six product pillar pages end with the same "How it is signed and verified" block, and several print the demonstration-key paragraph twice in a row. The home page shows the receipt three times. `/solutions` is two cards. The compare pages were removed and their URLs redirect without explanation, which drops the clearest competitive contrast the site had.

## Unfinished, inconsistent, inaccurate or untrustworthy

- **Local Law 144 framing is inaccurate.** The HR page offers "a four-fifths impact-ratio dashboard for Local Law 144 work" and the sample dashboard shows "Bias audit pass rate 94%: AEDTs passing four-fifths threshold". LL144 requires impact ratios to be calculated and published; it sets no four-fifths pass or fail threshold. A compliance reader will see a pass rate against a threshold the law does not have.
- **A real vendor's name in a fictional sample.** The receipt's deciding system is "Greenhouse screening agent", and the JSON says "External vendor system, not operated by Thursdai". Greenhouse is a real applicant tracking vendor. The sample implies a Greenhouse product and an integration that a reader cannot confirm, and it sits awkwardly next to the terms page's statement that other companies' names are used "only to identify them".
- **Signing claims versus the key set.** `/trust` says "Each record is hash-chained to the one before it and signed with a key held in AWS KMS" and `/demo` says "In a live tenant a receipt is signed as it is recorded", while the live key set reports `signOnWriteSince: null`. Hash chaining is also never shown; the demo has one receipt.
- **Key set exposes infrastructure detail.** The `kid` in `aidr-keys.json` is the full KMS key ARN, which includes the AWS account number. Low severity, but a security reviewer will flag it.
- **Data handling contradictions.** Receipts carry "a reference, never a name", yet `/security` lists "Identity data: Employee names, email addresses". The site targets life and health insurance pricing, yet asks pilots not to send health data.
- **Subprocessor list includes Stripe "billing and payment processing"** while the site shows no pricing and no paid plan; Sentry's DPA is "pending confirmation"; the DPA itself is "in preparation" in two places.
- **Metadata.** Every page reports `og:url` as the home page and none sets a canonical, so shared deep links preview as the home page. The sitemap omits `/privacy` and `/terms`.
- **Silent redirects.** `/compare/glean` (and by implication the other compare URLs) and `/company` redirect to `/product` and `/company/team` with no notice; anyone holding an old link lands somewhere unrelated to what they clicked.
- **Founder card.** "Previously: Sprout" is ambiguous (there are several companies with that name). There is no photo or LinkedIn link, and the team is one person.
- **No dark mode.** The site renders light only even with a dark color scheme. This is fine and matches most of the top 10; noted only because the earlier site had a toggle.

## What a skeptical enterprise buyer or compliance reviewer would question

- Who is the contracting entity? The legal pages do not yet know.
- Is there a production deployment with real records today, or only the sample? Nothing on the site shows one, and the key set suggests signing on write has not started.
- Who has reviewed the audit pack format? The site says no auditor has.
- What independent assurance exists? None: no SOC 2 engagement, no penetration test summary and no named auditor. The controls listed are self-attested ("Not independently audited" appears twice on `/security`, and "have not been audited" once more).
- Single region, single shared database, one person. What is the continuity plan, the uptime commitment and the incident response contact beyond one shared mailbox?
- Can the verification be anchored to a key the vendor cannot quietly change, for example a production key with a published history or a transparency log?
- Does the HR offering understand LL144, given the four-fifths framing?
- Why does the sample name Greenhouse, and is there an agreement with them?

## What clearly improved since October 2

For balance, and so the score change is legible: the domain, sitemap and robots now point at `getthursdai.com`; the title matches the hero; the six empty pages are gone; the gradients, palette drift and four-voice typography are replaced by one coherent editorial system; "Try the replay demo" is now a real `/demo` with a working verifier; the problem is the second beat; buyers are named; the trust page states plainly what is and is not in place. Those changes account for the full 11.6 points.
