# Benchmark re-score: Thursdai after the October 2026 rebuild

**Date:** October 2, 2026
**Status:** internal estimate, pending an independent re-score.
**Subject:** https://getthursdai.com as deployed from `main` after PRs #14 to #24 (Waves 1, 2, 2a, 3a, 3b, 5a, 5b and the performance pass). Wave 4 (motion) and Wave 6 (gates) are not merged at the time of scoring.
**Rubric:** `docs/competitive-benchmark-2026-10.md` section 2, unchanged. Original Thursdai scores are from section 6.1 of that document.

## Read this first: the bias

This re-score was written by the same team (an agent working for Jeff) that built the changes it scores. Self-scoring after a rebuild is biased upward: the scorer knows what each change was meant to fix and tends to credit intent. To push against that, every score below was set at the lower of the two numbers the evidence could support, scores use whole points like the original, and no dimension was raised for work that is not live on the production site. The original benchmark also captured 24 competitors with screenshots on the same day; this pass re-read Thursdai's live HTML with curl and the merged PRs, without the screenshot capture rig, so it is a lighter method than the original. Treat the total as an estimate of direction, not a rank. An independent scorer, ideally one who has not seen the plan, should re-run the full capture before anyone quotes a number.

## Rubric (unchanged)

Visual professionalism (50%): 1 Typography · 2 Layout and spacing · 3 Color and theming · 4 Motion and interaction · 5 Imagery and product visuals · 6 Polish and craft.
Marketing effectiveness (50%): 7 Headline and value proposition · 8 Audience targeting · 9 Proof and trust · 10 Narrative structure · 11 Calls to action · 12 Differentiation.

Anchors: **9 to 10** would be studied by other designers; **7 to 8** professional, nothing to fix; **5 to 6** competent but generic or with visible seams; **3 to 4** actively hurts trust; **1 to 2** absent.

Total = mean of the six visual dimensions × 5 + mean of the six marketing dimensions × 5.

## Scorecard

| # | Dimension | Original (Oct 2) | Re-score | Change | Evidence (live site and merged PRs) |
|---|---|---|---|---|---|
| 1 | Typography | 6 | 7 | +1 | Newsreader display serif for headings, Geist body, Geist Mono labels and receipt; three sizes above body; gradient text gone (#18). Free face rather than a licensed one and no italic yet, so professional but not studied. |
| 2 | Layout and spacing | 6 | 7 | +1 | One paper surface, one ink close per page, 128/80px section rhythm, beats vary (problem paragraph with margin note, two-cell proof band, two-column receipt) (#18, #21). Product pillar still opens its body with a three-column row (`/product/ai-receipts` "What a receipt holds"). |
| 3 | Color and theming | 6 | 7 | +1 | Paper, ink, one indigo accent; amber only on the signature line; dawn gradient and theme toggle retired (#18). Disciplined, but not yet an owned colour the way Vanta's lavender is. |
| 4 | Motion and interaction | 6 | 6 | 0 | Real interactions now: in-page receipt verify with a tamper test (`/demo`, `/developers`), the replay scrubber and policy tabs (#20). No entrance or signing motion is live (Wave 4 unmerged) and cards have no hover by design, so the craft the rubric rewards at 7 is not there yet. |
| 5 | Imagery and product visuals | 5 | 6 | +1 | One linework diagram style across the pillars and the signed receipt as the recurring artifact (#24, #18). Still no real product screenshot, no photography and no team photo (`/company/team` has no image). |
| 6 | Polish and craft | 5 | 7 | +2 | Origin defects fixed: sitemap (31 routes) and robots on getthursdai.com; title matches the hero; the six empty pages are gone; the fake security-pack and template routes are gone (#14, #23, this PR). Footer has no Privacy or Terms because neither page exists, which a buyer will notice; `/resources/role-bench` is thin (about 210 words). |
| 7 | Headline and value proposition | 7 | 8 | +1 | "Every AI decision, on the record." kept; sub cut to one sentence that names the artifact; checkmark row removed; one primary button (#21). |
| 8 | Audience targeting | 7 | 7 | 0 | `/solutions` now splits "For compliance and risk" and "For HR and People", each with its own page and CTA (#23). The home hero sub-line still does not name the buyer, which was the other half of the recommendation. |
| 9 | Proof and trust | 2 | 4 | +2 | Apology labels removed; verifiable signed sample receipt and audit pack; sourced Article 26(6) and Article 99(4) figures; named constraints; honest certification roadmap with no false dates (#16, #19, #21). Still no logo, customer, named endorser, quote or certification, so it remains below the competent band. |
| 10 | Narrative structure | 6 | 7 | +1 | Home is seven beats with the problem second and a sourced number in it; receipts explained once (#21). Proof band carries no partner evidence yet, so beat 3 is thinner than the model it follows. |
| 11 | Calls to action | 5 | 7 | +2 | "Open the demo" goes to a real no-login `/demo`; "Request a pilot" is one modal site-wide; `/developers` leads with an in-page verify (#20, #23). No self-serve sign-up, sandbox or key, so not at Arize's four speeds. |
| 12 | Differentiation | 7 | 7 | 0 | AI Receipt as the named artifact, "What Thursdai is not" constraints, compare pages that lead with the competitor's strengths (#21, #23). Sharper, but the claim itself is the same one the original already credited. |

| | Original | Re-score (internal estimate) |
|---|---|---|
| Visual (out of 50) | 28.3 | 33.3 |
| Marketing (out of 50) | 28.3 | 33.3 |
| **Total (out of 100)** | **56.7** | **66.7** |
| Position against the October 2 board | 25th of 25 | between Lakera (65.8) and Credo AI, Runway and Sierra (68.3), about 21st |

## What this says about the plan's targets

- The plan's success line was 74 to 76 with Proof at 5 and no dimension under 6. This estimate is 66.7 with Proof at 4. The gap is about 8 points, so the target is **not met** on this scoring.
- The three biggest movers are Proof and trust (+2), Polish and craft (+2) and Calls to action (+2). All three moved because things that were false or empty were removed or made real, not because of visual design.
- Motion is flat because Wave 4 is not live. If it lands as specified (the receipt signs on load, product visuals rise once, reduced motion respected), 7 is a fair expectation; that adds about 0.8 to the total.

## Dimensions that cannot rise much without real customers or real product

- **Proof and trust (4).** The remaining points need things design cannot make: a named design partner or advisor with a face and permission, logos, a case study or an audited certification. With one named endorser and a dated audit it could reach 5 to 6; 8 needs customers.
- **Imagery and product visuals (6).** Above 6 needs real tenant-app screenshots (a receipt in the viewer, the replay, a pack export) and a team photograph. That is product readiness, not site work.
- **Audience targeting (7).** The last point is a copy change (name the buyer in the hero sub-line), but confirming which buyer signs the contract needs pilot conversations.
- **Narrative structure (7).** Beat 3 is built to hold partner proof; until it has some, the sequence works but the proof beat is thin.

## Method notes

- Pages read: `/`, `/demo`, `/product/ai-receipts`, `/solutions`, `/solutions/compliance`, `/solutions/people`, `/trust`, `/company`, `/company/team`, `/customers`, `/developers`, `/compare/glean`, `/resources/role-bench`, `/sitemap.xml`, `/robots.txt`, fetched with curl on October 2, 2026 (every one returned 200). Titles, headings, image counts and body text were extracted from the HTML.
- No new screenshots of competitors were taken; their scores are the October 2 scores.
- Lighthouse and axe evidence for Polish comes from the gates added in the Wave 6 PR (axe: zero serious or critical findings on the nine template URLs at 1440 and 390 wide).
