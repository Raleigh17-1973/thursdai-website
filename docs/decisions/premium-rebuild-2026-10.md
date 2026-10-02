# Decision log: premium site rebuild (October 2026)

Plan: `docs/plans/premium-site-rebuild-2026-10.md`. Design system: `docs/design/the-record.md`.
Mandate from Jeff (October 2, 2026): use the free font; act as the designer; retire the dawn gradient; merge every PR when green; work through the whole plan autonomously; record every choice and why; list every choice under 90% confidence for review at the end.

Format: one row per decision. Confidence is the decider's honest estimate that Jeff would make the same call. Anything under 90% is repeated in "For review" at the bottom.

## Orchestration and plan-level decisions

| # | Decision | Why | Confidence |
|---|---|---|---|
| D1 | G2: Newsreader (free, Google, variable) as display face, no licensed Klim face, no external designer. | Jeff's instruction. | 100% |
| D2 | Retire the dawn gradient everywhere on the marketing site (hero backdrop, text gradients, wordmark gradient). | Jeff's instruction ("get rid of it"). | 100% |
| D3 | Wordmark keeps Instrument Serif "thursdai" with only "ai" coloured, now solid indigo `#3e4fb8` (on ink `#9DA8F0`). | Keeps the June decision that only "ai" is coloured; amber is reserved for "signed", so indigo (the accent) is the only system colour left. | 80% |
| D4 | Secondary ink darkened from the plan's `#5A5650` (6.69:1) to `#4E4A44` to meet the plan's own 7:1 target. | The plan's value fails its own accessibility condition. | 95% |
| D5 | Sequence as six PRs: design system, demo and CTAs, proof and home, visuals and motion, cascade and copy, quality gates. Merge each when required checks pass. | Each wave builds on the previous; one PR per wave keeps review and rollback simple. | 95% |
| D6 | G1 default: keep "AI Receipt", centralised as `RECEIPT_TERM` so a rename is a one-line change. | Plan default; renaming mid-rebuild doubles copy work. | 85% |
| D7 | G3 default: verify route is a Next route handler (`/api/verify`) against a static fixture signed once, not a public route on the API. | Plan default; no dependency on API uptime; no live tenant reachable from the marketing origin. | 90% |
| D8 | G4 default: proof band ships with the sourced Annex III cell and the artifacts; no design-partner tiles, no named endorser, cert table shows "Scheduled, quarter to be confirmed". | No permissions, names or dates exist; inventing any would break the no-fabrication rule. | 95% |
| D9 | G5 default: Policy-as-Code, Two-Tier Knowledge and Ambient Cases use linework diagrams, not mockups. | No real app screens available for those pillars. | 90% |

## Wave decisions

(Each wave appends its own section below.)

### Wave 1: design system

| # | Decision | Why | Confidence |
|---|---|---|---|
| W1-1 | Colours live as CSS variables (`--paper`, `--sunk`, `--ink`, `--ink-2`, `--ink-3`, `--rule`, `--indigo`, `--amber`) and the old semantic names (`--color-text-primary`, `--color-surface-secondary` and so on) are remapped onto them instead of renamed across 40 pages. | One source of truth with a small diff; pages that already used variables move to the new palette without edits. Later waves can rename call sites as they rewrite pages. | 90% |
| W1-2 | The ink band is a CSS scope (`.surface-ink`, set by `<Section tone="ink">`) that redefines the same variables for light-on-ink, including button colours. | Components need no "on dark" props; the closing CTA cannot drift from the system. Tertiary on ink is `#A39D92` (6.9:1), which the spec did not define. | 90% |
| W1-3 | Newsreader loads as the full variable font (wght and opsz axes), normal style only; the CSS uses only 400 and 500. | `next/font/google` cannot combine the `opsz` axis with a fixed weight list. Italic is not loaded yet to protect the performance budget; add `style: ['normal', 'italic']` when the first heading uses an italic word. | 85% |
| W1-4 | Instrument Serif now loads italic only and is exposed as `--font-wordmark`; the wordmark keeps its italic cut. | The wordmark is the only use and it was already italic; dropping the roman halves the font payload. | 90% |
| W1-5 | Fonts reference the `next/font` variables (`--font-geist-sans`, `--font-geist-mono`) instead of the literal family names. | The old `'Geist'` literal only resolved where Geist was installed locally; visitors were getting the system font. | 95% |
| W1-6 | Labels use `text-transform: uppercase` at 12px rather than `font-variant-caps: all-small-caps`. | Geist Mono ships no small-cap glyphs; synthesized small caps at 12px render around 6 to 7px tall, below legible size. Uppercase mono at 12px keeps the documentary look and passes AA. | 70% |
| W1-7 | Type sizes interpolate from a 360px to a 1440px viewport with `clamp()`. `Heading1` and `Display` share the H1 size; `Heading4` is body-size Geist semibold, not a fourth display size; `Body` large (lead) is 20px. | Keeps exactly three display sizes above body. A 20px lead paragraph under the H1 is a body variant, not a heading size. | 80% |
| W1-8 | Section padding 128/80 for `default`; `compact` is 80/56 (not in the spec). Consecutive paper sections get an automatic hairline at the column width. | Paper on paper with no colour change needs a separator; a hairline between sections reads like the rule between numbered sections of a report. Compact keeps dense pages (trust, legal) from doubling to 256px gaps. | 75% |
| W1-9 | `Section` silently drops `background` from its `style` prop, in addition to pages being cleaned. | Enforces "sections paint paper or ink only" so a later page cannot reintroduce a band. | 85% |
| W1-10 | Code samples are set in monochrome ink Geist Mono on the sunk surface, comments in tertiary ink, no syntax colours; Shiki is no longer loaded on the client by `PolicyEditor`. | A document does not have syntax colours, and the GitHub light/dark themes fail AA on `#EFECE4`. Removing client Shiki also cuts the home page's JS. | 80% |
| W1-11 | Badges become mono tags in a hairline frame. "Partial" and "Planned" (the old amber variant) use a dashed frame in secondary ink; green and red read as solid ink frames. | Amber never carries text and status colours are retired outside the receipt; the frame style carries state instead of hue. | 80% |
| W1-12 | Callouts are a 2px left rule with no tint: indigo for info, ink for warning and danger. | Tinted boxes are a second surface colour; a ruled margin note fits the document look. | 85% |
| W1-13 | Inputs and control borders use ink at 50% (`--color-border-strong`, 3.5:1) instead of the 14% hairline. | WCAG 1.4.11 asks for 3:1 on control boundaries; the hairline is about 1.3:1. Form errors keep a red (`#b42318`, 6:1) as a functional exception. | 85% |
| W1-14 | `ReceiptFrame` puts the source line ("Decision by Greenhouse screening agent · GPT-4o / Azure") above the Newsreader decision, uses status ink only inside its field wells (policies passed in green `#2f6b3a`) and shows "Recorded" as the last well. Sample data moved to `components/receipt/sample.ts` with the same id and fingerprint as the OG image. | Makes the external source explicit (Thursdai records other systems' decisions) and keeps one sample receipt across hero, OG and later `/demo`. | 85% |
| W1-15 | `ReceiptFrame` animation hook: `data-receipt-state="signing"|"signed"` on the root and `data-receipt-part="hash"|"signature-rule"|"seal"` on the animated parts, driven by a `signing` prop that defaults to false. | Wave 4 can animate with CSS or Motion without changing the markup; with no JS the final signed state renders. | 90% |
| W1-16 | `AiReceiptCard` stays as a two-line wrapper over `ReceiptFrame`. | Avoids churn in imports while later waves move call sites to `ReceiptFrame` directly. | 90% |
| W1-17 | New `ButtonLink`; every `<Link><Button/></Link>` on the swept pages became a `ButtonLink`. | The nested pattern is two interactive elements in one (double tab stop, invalid HTML). | 95% |
| W1-18 | Home hero: the dawn backdrop, the gradient on "on the record." and the looping scroll cue are removed; the checkmark row is set as mono labels, left-aligned under the CTAs. Home navy sections (AI Receipts, Agent, Developers) became paper sections; the closing CTA is the only ink band. | Spec: plain paper hero, nothing loops, one ink band per page. Copy and section order unchanged (Wave 3 rebuilds the page). | 90% |
| W1-19 | The home "AI Receipt: Internal" mock and its demo strings had em dashes replaced with a colon or comma. | House rule binds on any text touched, including demo data. | 95% |
| W1-20 | Cards: hairline box, 2px radius, 24/32px padding, card body at the 15px UI size, icons drawn in `currentColor` at 60% ink with 1.25px strokes, no tinted icon tile, no hover. | Spec says cards do nothing on hover and no icons in circles; 17px body in a four-up grid gives 28 characters a line, so card copy uses the UI size. | 80% |
| W1-21 | Top nav is solid paper with a hairline (no translucency or blur); the mega menu numbers its items 01 to 07 in mono and closes on a 1px ink rule; the mobile drawer is paper with an ink left rule. | Blur is an effect; numbered items echo the document look and the receipt's mono details. | 80% |
| W1-22 | Footer is paper with a hairline top rule, column headings as mono labels (`h2` for heading order) and the "Subscribe" button as a secondary button. The newsletter form stays (Wave 5 decides its fate). | Spec reserves ink for the closing CTA. | 90% |
| W1-23 | Pages whose last section is a CTA got the ink band (all product pages including ai-receipts and compliance-packs, compare pages, trust/deployment). Pages that do not end on a CTA (company, solutions/people, developers, trust) have no ink band until later waves add a close. | "At most one ink band, the closing CTA"; inventing a CTA would be a copy change. | 85% |
| W1-24 | Removed motion from `HowItWorksSteps` and `ModeratorPanel` (they started at 15% opacity and rose 16 to 24px). | Wave 4 owns motion with the 12px/240ms rule; content parked at 15% opacity also fails contrast until scrolled into view. | 90% |
| W1-25 | Range sliders draw a flat 2px rule and a solid indigo fill as divs behind a transparent native track, with a square indigo thumb. | The old fill used a hard-stop `linear-gradient`; zero gradients is an acceptance criterion. | 85% |
| W1-26 | Added `RECEIPT_TERM` to `src/config/site.ts` (decision D6) and used it as the `ReceiptFrame` header term. | D6 called for it; the receipt is the first consumer. | 95% |
| W1-27 | Geist and Geist Mono now load through `next/font/google` (Latin subset, about 54KB) instead of the `geist` package's full variable files (about 142KB). Both stay preloaded. | Adding Newsreader (133KB) pushed simulated performance to 0.87 to 0.90; the subset brings it back to 0.92 to 0.94. Mono must stay preloaded: without it the hero receipt swaps late and CLS hit 0.053. Same faces, still self-hosted, CSP unchanged. | 85% |
| W1-28 | `ReceiptFrame` is `calc(100% - 4px)` wide so its offset rule ends exactly on the column edge. | The printed-card shadow otherwise pokes 4px past the grid. | 95% |
| W1-29 | The trust page tagline is set in Newsreader roman at 22px instead of italic Geist. | Geist has no italic, so it rendered as a synthetic slant; Newsreader italic is not loaded (W1-3). | 85% |
| W1-30 | `/developers` resource cards run four-up and the code-sample disclosure headers sit on paper rather than sunk. | Avoids a three-plus-one orphan row, and sunk-in-sunk nesting around the CodeBlock. | 85% |

## For review (confidence under 90%)

(Collected at the end.)

Wave 1: W1-3 (85%), W1-6 (70%), W1-7 (80%), W1-8 (75%), W1-9 (85%), W1-10 (80%), W1-11 (80%), W1-12 (85%), W1-13 (85%), W1-14 (85%), W1-20 (80%), W1-21 (80%), W1-23 (85%), W1-25 (85%), W1-27 (85%), W1-29 (85%), W1-30 (85%).
