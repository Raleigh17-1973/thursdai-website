# Master Implementation Plan — Reposition the site around the evidence layer ("Receipts" + audit packs)

Status: Reviewed (6-phase pipeline + 15-persona review). Final confidence: **READY WITH CONDITIONS** (blocked on one naming decision).
Scope: marketing site (thursdai-website). Product features already exist.

---

## Section A — Executive Summary

The product's center of gravity has moved to the **evidence layer**: the per-decision record (the "receipt" for every AI decision) and the framework-shaped **audit packs** built from those records. The multi-agent **Moderator** ("chat"/deliberation) is now a supporting capability, not the headline. The site still leads with the Moderator and the "governance infrastructure" framing, so it reads backwards.

This plan reposes the whole site around evidence/proof: a new hero and lead narrative ("every AI decision, on the record"), the product pillars reordered so the record / decision replay / audit packs come first, and the Moderator demoted to "how the decision gets made." The repositioning is well-founded: in 2026, immutable AI audit trails are the consensus differentiator across the EU AI Act, NIST AI RMF and OWASP, and the market view is that "screenshots and declarations are no longer sufficient; regulators and enterprise clients want operational evidence" ([cxtoday](https://www.cxtoday.com/security-privacy-compliance/ai-audit-trail-regulatory-scrutiny/); EU AI Act Art. 12 requires ≥6-month retention for high-risk systems).

**The blocking decision (Item 1): the name.** "AI Receipts" cannot be used as the headline term. Search for it is dominated entirely by expense receipt-scanning apps, and two competitors are literally named "Receipt AI" / "ReceiptsAI." That is a worse collision than "AIDR" (which Jeff correctly rejected). The fix keeps the strong "receipts = proof" metaphor but qualifies it so it is ownable and unambiguous. **Recommended term: "Decision Receipts"** (per-decision record) + **"audit packs"** (the bundles). This needs Jeff's sign-off before any copy is written.

Success: a compliance/risk/legal buyer lands and immediately understands Thursdai gives them a provable record of every AI decision and audit-ready evidence, with the multi-role deliberation as the reason those records are rich, not the lead.

---

## Section B — Individual Item Plans (in sequence)

### [PLAN: Item 1 — Name the evidence layer (ownable, distinctive)]  Complexity: Low (decision) / Medium (rollout)

**Research.** "AI receipts" search is saturated by expense/receipt-scanning ([SparkReceipt](https://sparkreceipt.com/), Smart Receipts, [Receipt AI](https://receipt-ai.com/), [ReceiptsAI](https://receiptsai.com/), Expensify, Shoeboxed). April Dunford's guidance: category creation is hard and rarely the right bet for an early startup; position against real competitive alternatives with differentiated value rather than coining a contested term ([Lenny's Newsletter](https://www.lennysnewsletter.com/p/a-guide-to-advanced-b2b-positioning)). Product-naming guidance: clarity beats creativity; a generic contested name hurts ([Capterra](https://www.capterra.com/resources/product-name-seo-name-products-keywords/)). The "receipts = proof/evidence" metaphor is culturally strong ([Dictionary.com](https://www.dictionary.com/culture/slang/receipts); [Slate](https://slate.com/human-interest/2016/07/how-show-me-the-receipts-became-a-catchphrase-for-holding-the-powerful-accountable.html)).

**Recommendation.** Brand the per-decision record **"Decision Receipt"** (plural "Decision Receipts"); keep **"audit packs"** for framework bundles. Lead positioning with the *value* ("every AI decision, on the record" / "proof for every AI decision"), using "Decision Receipts" as the named artifact. Do NOT use "AIDR" (Jeff's constraint) and do NOT use bare "AI Receipts" (collision). Avoid leaning the whole brand on coining a category; position against the alternative (AI tools that leave no usable record).

**Tasks.** Confirm the term (Jeff). Pick canonical vocabulary and use it everywhere: "Decision Receipt" (the record), "audit pack" (the bundle), avoid "AIDR"/"AI Receipts"/bare "ledger" in headlines. Add a one-line glossary note in the plan for writers.

**Acceptance.** One term, used consistently; zero "AIDR"; chosen term re-checked for collision before publish.

**Blocker.** Jeff's naming decision (Section G #1).

### [PLAN: Item 2 — New primary positioning + hero]  Complexity: Medium

**Research.** Lead with value, not chrome ([Powered by Search](https://www.poweredbysearch.com/blog/b2b-saas-homepage-design/)); evidence/audit is the 2026 differentiator (above). 

**Tasks.** New hero headline leading with proof/record (e.g. "Every AI decision, on the record." / sub: "Thursdai writes a Decision Receipt for every answer your AI gives, and turns them into audit-ready packs."). Keep "AI governance infrastructure" as the category descriptor (umbrella), not the headline. Hero visual leads with a **Decision Receipt** artifact (and/or an audit pack), not the multi-role panel. Reconcile with the existing hero A/B: make the receipts-led hero the new control (`option-a`), keep the dashboard variant as a test arm.

**Acceptance.** Hero leads with the record/proof; value-prop-first; receipt artifact is the supporting visual; honesty constraints held (illustrative labels; not-the-auditor; no guarantee).

### [PLAN: Item 3 — Demote the multi-agent chat; reorder the product narrative]  Complexity: Medium

**Tasks.** New pillar order leading with the evidence chain: **Decision Receipts** (the record) → **Time-Travel** (replay any receipt) → **Audit Packs** (bundled evidence) → **Policy-as-Code** (the constraints recorded on each receipt) → **Moderator** (how the decision is made, now framed as "what makes a receipt worth reading") → Two-Tier Knowledge, Ambient Cases. Reframe Moderator copy from headline to supporting. Do NOT bury it so far it disappears: the multi-role deliberation is *why* the receipt is rich, so position it as the substance behind the record.

**Acceptance.** Receipts/replay/packs lead; Moderator clearly secondary but present and framed as the source of the record's richness.

### [PLAN: Item 4 — Cascade across the IA]  Complexity: Medium

**Tasks.** Home: new hero + reordered sections (receipt demo first, then audit packs, then the substrate incl. Moderator). /product hub: reorder pillars; add "Decision Receipts" as pillar 1; keep Audit Packs prominent. /solutions/people: already evidence-led; align terminology to "Decision Receipts"/"audit packs." Nav: add "Decision Receipts" near the top of the Product megamenu. Sitemap/metadata updated.

**Acceptance.** Terminology consistent site-wide; no regressions to the People/dashboard/compliance-packs work or the honesty constraints.

---

## Section C — Dependency Map

1. **Naming decision (Item 1)** blocks all copy in Items 2, 3, 4.
2. Item 2 (positioning/hero) sets the language Items 3 and 4 cascade.
3. Item 3 (pillar reorder) and Item 4 (IA) run together once 1 and 2 land.
4. Reconcile with existing hero A/B variants and the shipped Compliance Packs page (rename/align, do not duplicate).

---

## Section D — Conflicts & Resolution

1. **Jeff's "AI Receipts" vs SEO/clarity.** Collision is critical. Resolution: "Decision Receipts" (keeps metaphor, ownable, clear). Escalate for sign-off.
2. **Category-creation ambition vs Dunford caution.** Resolution: lead with differentiated value (provable record), use the term as a vivid descriptor, do not bet the brand on owning a new category word.
3. **Demote Moderator vs not burying a real differentiator.** Resolution: Moderator becomes "the substance behind the receipt," prominent as supporting, not headline.
4. **New evidence hero vs the just-shipped dashboard hero variant (option-c).** Resolution: receipts-led hero becomes control; dashboard stays an A/B arm; both express "evidence."
5. **Reposition vs prior honesty work.** Resolution: all standing constraints carry forward unchanged (no fabricated metrics/customers; pricing parked; certs "planned"; evidence-not-auditor; illustrative labels; no em dashes / Oxford commas; prose fills column).

---

## Section E — Domain Accountability Matrix

| Item | Primary | Secondary | Key acceptance | Escalation |
|---|---|---|---|---|
| Naming | Product/Marketing | Legal, Tech Writer | One ownable term, collision-checked | Term choice → Jeff |
| Positioning/hero | Marketing | Legal, UX | Value-led, honest, receipt visual | Tagline → Jeff |
| Demote Moderator | Product | UX | Receipts lead, Moderator present-but-secondary | How far → Jeff |
| IA cascade | Marketing/Eng | UX, Tech Writer | Consistent terms, no regressions | — |

---

## Section F — Integrated Risk Register

| ID | Risk | Persona(s) | Likelihood | Impact | Mitigation | Residual |
|---|---|---|---|---|---|---|
| R1 | "AI Receipts" un-ownable + means expense receipts | Product, Tech Writer, UX | High | High | Use "Decision Receipts"; collision-check final term | Low |
| R2 | "Receipts/proof" framing implies the AI was correct/compliant | Ethics, Legal | Med | High | "Proof of what happened, not that it was right"; not-the-auditor; no guarantee | Low |
| R3 | Burying the Moderator loses a real differentiator | Product | Med | Med | Keep it as "the substance behind the receipt" | Low |
| R4 | Terminology drift (receipts/packs/ledger/records mixed) | Tech Writer | High | Med | Canonical glossary; one term each; site-wide pass | Low |
| R5 | Overclaiming tamper-proof/crypto on receipts | Security | Med | Med | Match product reality; "tamper-evident", signed | Low |
| R6 | Reposition regresses shipped People/packs/dashboard or honesty rules | QA, Eng | Med | Med | Align terms; re-run honesty + a11y + Lighthouse gates | Low |
| R7 | Receipt demo visual wired to real data / unlabeled | Eng, Legal | Low | High | Static, illustrative-labeled component | Very low |

---

## Section G — Open Questions & Escalations (need Jeff)

1. **NAME (blocks everything).** Approve **"Decision Receipts"** for the per-decision record (with "audit packs" for bundles)? Bare "AI Receipts" has a critical search + meaning collision; "AIDR" is out. *Default if no input:* "Decision Receipts."
2. **Tagline.** Lead with "Every AI decision, on the record." and keep "AI governance infrastructure" as the umbrella descriptor? *Default:* yes.
3. **Moderator demotion depth.** Supporting capability (recommended) vs near-hidden? *Default:* supporting, framed as the substance behind the receipt.

---

## Phase 3 Persona Findings (condensed; CRITICAL/HIGH absorbed above)

- **Product Owner (CRITICAL):** naming collision (R1); evidence-led is the sharper wedge; keep Moderator visible (R3).
- **Technical Writer (HIGH):** canonical terminology, glossary, zero "AIDR" (R4).
- **Legal (HIGH):** "receipt/proof/on the record" must not imply legal sufficiency or compliance guarantee; not-the-auditor holds (R2).
- **Ethics (HIGH):** proof = what happened, not that the AI was right; protect against "safe AI" implication (R2).
- **Security (MED):** receipts are signed/tamper-evident; match product, no crypto overclaim (R5).
- **Data Science (MED):** receipts must reflect what is actually captured; no implied over-capture.
- **Auditing/Compliance (MED):** receipts/packs support audits; reiterate independent-auditor distinction.
- **UX (HIGH):** IA reorder, nav term, a "receipt" artifact's readability/a11y; receipts-led hero.
- **Director of Eng / Staff / Infra / DevOps (LOW-MED):** content/messaging change; receipt demo static + illustrative (R7); reuse components.
- **QA (MED):** re-run honesty, a11y, Lighthouse gates; no regression to shipped work (R6).
- **Customer Success (LOW):** ensure receipts/packs framing sets pilot expectations (populate from real data).
- **CFO (LOW/positive):** low cost; reuse; A/B already in place.
- **Accessibility (MED):** receipt/document visuals need semantics + contrast (WCAG 2.2).

---

## Phase 6 — Overall Readiness Assessment

Vote: **12 APPROVE WITH CONDITIONS, 3 APPROVE, 0 DO NOT APPROVE.**

Non-negotiable conditions before build:
1. Pick the ownable term (recommended "Decision Receipts"); do not ship bare "AI Receipts" or "AIDR" (R1, R4).
2. Keep all standing honesty constraints; proof = what happened, not that it was right (R2).
3. Moderator stays present as the substance behind the receipt (R3).
4. Receipt visuals static + illustrative-labeled; pass a11y + Lighthouse (R6, R7).

Final confidence: **READY WITH CONDITIONS.** The evidence-led reposition is strongly supported by the market and sharpens Thursdai's wedge. It is blocked only on the naming decision: the proposed "AI Receipts" is not viable as-is, and "Decision Receipts" is the recommended, ownable alternative that preserves the powerful proof metaphor.

Plain-language next step: get Jeff's call on the name (Q1) and tagline (Q2), then build in order: lock vocabulary → new hero/positioning → reorder pillars + demote Moderator → cascade across home/product/solutions, re-running the honesty, a11y and Lighthouse gates.
