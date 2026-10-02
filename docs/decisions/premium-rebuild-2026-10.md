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

## For review (confidence under 90%)

(Collected at the end.)
