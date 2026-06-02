# Master Implementation Plan — People, Reporting Packs & Executive Dashboard on the Marketing Site

Status: Reviewed (6-phase pipeline + 15-persona review). Final confidence: **READY WITH CONDITIONS.**
Scope: changes to the **marketing site** (thursdai-website) only. The underlying product features already exist in the product repo.

---

## Section A — Executive Summary

The marketing site sells Thursdai as horizontal **governance infrastructure** (five pillars: Moderator, Time-Travel, Policy-as-Code, Ambient Cases, Two-Tier Knowledge) aimed at developers/platform buyers. The actual product has a much larger **application layer** on top of that substrate: vertical "spaces" (People being the flagship, alongside government/SLED modules), signed **compliance packs** generated from the AI Decision Ledger, and **executive dashboards**. None of that application/outcome layer is on the site.

This plan adds three surfaces and resolves one strategic question:

1. **People** — a solution page for AI-governance in hiring/workforce (the strongest regulation-driven wedge: NYC Local Law 144 bias audits, EU AI Act high-risk employment systems, EEOC four-fifths rule).
2. **Compliance / Reporting Packs** — a capability page for signed, framework-shaped evidence bundles (the exportable, audit-ready form of the audit trail).
3. **Executive Dashboard** — a governance-altitude KPI surface, added as a strong home-page section and a People sub-section.

**Strategic recommendation (the headline decision):** evolve the IA from "infrastructure-only" to **"infrastructure + solutions."** Lead with the *outcome* (the regulatory pain People solves), use the dashboard as a supporting interactive/illustrative visual, and keep the substrate/pillars as the "how it works" layer beneath. **Do not** replace the home hero's value proposition with a generic dashboard screenshot — A/B test a dashboard-forward hero variant instead.

What success looks like: a regulated-industry buyer (HR/Compliance/Legal leader) lands, immediately sees Thursdai solves a named legal obligation (LL 144 / EU AI Act), sees the evidence it produces (signed packs) and the executive visibility it gives — all without a single fabricated metric or overclaimed certification.

---

## Section B — Individual Item Plans (in implementation sequence)

### [PLAN: Item 1 — People solution page]  Complexity: Medium

**Why it matters / research grounding.** People-ops is Thursdai's most *concrete, regulation-forced* buying trigger. NYC Local Law 144 requires an independent bias audit of automated employment decision tools within one year of use, **public** posting of the audit summary, and candidate notice, with civil penalties of $500–$1,500/day ([DCWP](https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page); [NY State Comptroller, Dec 2025 enforcement audit](https://www.osc.ny.gov/state-agencies/audits/2025/12/02/enforcement-local-law-144-automated-employment-decision-tools)). The EU AI Act classifies employment AI as high-risk with conformity-assessment and record-keeping duties. B2B value-prop research is clear that pages should **lead with the problem/outcome, not the feature list** ([Powered by Search](https://www.poweredbysearch.com/blog/b2b-saas-homepage-design/); [SaaS Hero](https://www.saashero.net/strategy/b2b-saas-value-prop-messaging/)).

**Tasks.**
1. Decide IA placement (see Section D conflict): add a **Solutions** (or "Spaces") nav node; People is the first entry. (Nav stays ≤7 items — research caps main nav at ~7 — current nav is 6.)
2. Create `/solutions/people` (route + page) following the existing Section/Container/Split component patterns.
3. Page structure (outcome-led): hero stating the obligation it solves → "what it governs" (AEDT/hiring decisions) → frameworks covered (EEOC EEO-1, EU AI Act Art. 26, EU Pay Transparency, ISO 30414, OFCCP AAP, VETS-4212 — the **real** list from the product) → the outputs (link to Compliance Packs + Executive Dashboard sections) → honest CTA (design-partner, matching the rest of the site).
4. Build an illustrative People-overview visual reusing existing demo component patterns; **label data illustrative** (see Risk Register R2).
5. Add `/solutions/people` to sitemap; metadata; internal links from Product hub and Trust.

**Acceptance criteria.** Page leads with the regulatory outcome; lists only frameworks the product actually supports; no fabricated customer metrics; illustrative data labeled clear-and-conspicuously; passes Lighthouse CI budgets (perf ≥0.90, a11y ≥0.97); type-check + lint clean.

**Blockers.** Final framework list confirmation; IA decision (Section D); copy must clear Legal verbs (Section D conflict 2).

### [PLAN: Item 2 — Compliance / Reporting Packs capability page]  Complexity: Medium

**Why it matters / research grounding.** The packs are signed, framework-shaped evidence bundles (PDF + JSON-LD, JWS ES256, WORM storage) generated from the AI Decision Ledger — the *exportable, auditor-acceptable* form of Time-Travel's audit trail. Compliance-automation leaders make "show passing controls / produce evidence" a central marketing surface and tie it to a Trust Center ([Vanta](https://www.vanta.com/); [Drata](https://drata.com/)). LL 144's **public-summary** requirement and EU AI Act record-keeping map directly to "evidence on demand."

**Tasks.**
1. Create `/product/compliance-packs` (a 6th capability under the Product megamenu) — packs are cross-cutting, so capability placement beats burying them in one solution.
2. Structure: what a pack is (signed evidence bundle) → what's inside (methodology, population, selection/impact ratios, findings, attestation, provenance, signatures) → formats (PDF + JSON-LD) → how it's produced (from the AIDR, on demand) → who consumes it (auditors, regulators, boards).
3. Show a **sample/redacted illustrative pack** visual, labeled illustrative.
4. Cross-link from Time-Travel (audit trail → signed pack), Trust, and People.

**Acceptance criteria.** Describes packs accurately (do not overclaim crypto/frameworks beyond product reality); uses precise verbs ("produces evidence / record / documentation," **never** "performs your bias audit" or "guarantees compliance"); illustrative sample labeled; passes CI gates.

**Blockers.** Legal sign-off on the independent-auditor distinction (Section D conflict 2 / Risk R1).

### [PLAN: Item 3 — Executive Dashboard surface + home-hero decision]  Complexity: Medium–High

**Why it matters / research grounding.** The product has an executive KPI surface (AI-governance KPIs: bias-audit pass rate, AI systems in cadence, override rate, consent rate; workforce KPIs) with a built-in **"illustrative data" banner**. Research: lead with the value proposition, not raw product visuals; but **interactive demos convert ~2× static screenshots** and shorten sales cycles ([Powered by Search](https://www.poweredbysearch.com/blog/how-to-design-b2b-saas-product-pages-with-examples/)). FTC requires that any non-typical/sample results be disclosed **clearly and conspicuously / unavoidably** ([FTC Endorsement Guides, 2023](https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking)).

**Tasks.**
1. Build an illustrative executive-dashboard component for marketing (static/SSR, lightweight — no heavy charting lib that blows the Lighthouse budget). Carry the product's own **"Illustrative data"** banner onto the marketing surface.
2. Add it as a strong home section ("Governance at the executive altitude") and as a section on `/solutions/people`.
3. **Home-hero decision:** do **not** hard-replace the current outcome-led hero. Instead add a **PostHog A/B hero variant** (the site already does hero variants) that leads with the dashboard visual + outcome headline, and measure. Keep the differentiated substrate message as the control.

**Acceptance criteria.** Dashboard data is unmistakably illustrative; component is accessible (not color-only status, table semantics, contrast — WCAG 2.2) and within perf budget; hero change ships as a measurable variant, not a silent replacement.

**Blockers.** Lighthouse budget (Risk R4); a11y review; A/B instrumentation.

---

## Section C — Dependency Map

1. **IA / positioning decision (Solutions node)** → blocks final nav + People page placement (Item 1).
2. **Legal verb/claims review** → blocks copy on Items 1, 2, 3.
3. **Item 2 (Packs page)** is referenced by Item 1 (People) and Trust → build the packs capability page before/with People so links resolve.
4. **Illustrative-data labeling pattern (R2)** → shared dependency for Items 1 & 3 (build once, reuse).
5. **Item 3 home-hero variant** depends on Items 1–2 existing (so the dashboard links somewhere real).

Sequence: IA decision → Packs page (Item 2) → People page (Item 1) → Dashboard section + hero A/B (Item 3).

---

## Section D — Conflict Detection & Resolution

**Conflict 1 — Positioning: infrastructure vs application/outcome.** Leading with People + a dashboard pulls toward an application/BI story; the site's differentiation is the substrate (replay, policy-as-code, signed packs). *Resolution:* "infrastructure **+** solutions" — Solutions/People is the outcome doorway; pillars become the "how it works" proof beneath. Dashboard is supporting visual, not the core promise. Avoids becoming "just another governance dashboard."

**Conflict 2 — Marketing punch vs Legal accuracy.** "Compliance," "bias audit," "certified," "guarantee" are landmines. LL 144 requires an **independent** auditor — Thursdai must not imply *it* is that auditor. *Resolution:* precise verb set — Thursdai **produces evidence, records, documentation; prepares you for; demonstrates** — never **certifies, guarantees compliance, or performs your independent audit.** Applies to all three pages. (See R1.)

**Conflict 3 — Rich interactive dashboard vs performance budget.** The repo enforces Lighthouse CI (perf ≥0.90, LCP ≤2000ms, CLS ≤0.05). A heavy live/charted dashboard risks the gate. *Resolution:* static/SSR illustrative dashboard, no heavy chart dependency, lazy-loaded below the fold; hero variant kept light. (See R4.)

**Conflict 4 — "Show the product" vs "don't fabricate metrics."** We just removed fabricated stats this session; a dashboard full of impressive numbers re-introduces exactly that risk. *Resolution:* every dashboard/pack number is labeled **illustrative** and uses obviously-sample framing; no implied customer outcomes. (See R2.)

No impossible sequencing; no item overwrites another. Resolutions introduce no new conflicts.

---

## Section E — Domain Accountability Matrix

| Plan item | Primary owner | Secondary | Key acceptance criteria | Escalation |
|---|---|---|---|---|
| People page | Product/Marketing | Legal | Outcome-led; real frameworks; illustrative labeled | Positioning → Jeff |
| Packs page | Product | Legal/Compliance | Accurate pack description; auditor distinction | Claims → Legal/Jeff |
| Exec dashboard + hero | Marketing | Eng/UX/A11y | Illustrative; perf+a11y budgets; A/B not silent swap | Hero direction → Jeff |

---

## Section F — Integrated Risk Register

| ID | Risk | Source persona(s) | Likelihood | Impact | Mitigation in plan | Residual |
|---|---|---|---|---|---|---|
| R1 | Implying Thursdai *is* the independent bias auditor / guarantees compliance | Legal, Compliance, Ethics | High | High (regulatory/false-advertising) | Precise verb set (Conflict 2); Legal sign-off gate | Low |
| R2 | Dashboard/pack numbers read as real customer results (FTC; repeats this session's fabrication problem) | Legal, Ethics, Product | High | High | Unavoidable "Illustrative data" labeling, sample framing | Low |
| R3 | Marketing demo wired to real product APIs → PII/auth exposure | Security, Eng, Infra | Low | High | Static/illustrative components only; no prod API calls | Very low |
| R4 | Dashboard breaks Lighthouse CI budget (perf/LCP/CLS) | QA, Eng, Staff Eng | Medium | Medium | Static/SSR, no heavy chart lib, lazy-load | Low |
| R5 | Data-viz inaccessibility (color-only status, unlabeled charts) | Accessibility | Medium | Medium | WCAG 2.2: text+icon status, table semantics, contrast | Low |
| R6 | Positioning dilution → invites BI/dashboard-tool comparison | Product, Brand | Medium | Medium | Infra+solutions framing; dashboard secondary | Low |
| R7 | Nav overload (>7 items) hurts findability | UX | Medium | Low | Solutions as 7th node or fold packs into Product megamenu | Low |
| R8 | Overstating ISO 30414 / framework coverage beyond product | Compliance, Tech Writer | Medium | Medium | List only product-supported frameworks; cite | Low |

---

## Section G — Open Questions & Escalations (need Jeff)

1. **Positioning** — approve "infrastructure + Solutions" and a new **Solutions/Spaces** nav node? *Default if no input:* add Solutions as 7th nav item, People as first entry. Blocks Item 1 placement.
2. **Home hero** — A/B test a dashboard-forward variant (recommended) **or** keep current hero and add dashboard as a section only? *Default:* A/B variant via existing PostHog. Blocks Item 3 hero work.
3. **Other spaces** — People only for now, or also tease the government/SLED modules (Public Benefits, Higher Ed, Corrections, Grants, Shadow AI)? *Default:* People only; mention "more spaces coming" without detail.
4. **Legal review** — who signs off on compliance verbs / the independent-auditor distinction before publish? *Default:* hold publish on those sections until confirmed.

---

## Phase 3 Persona Findings (condensed; CRITICAL/HIGH absorbed above)

- **Security (HIGH):** marketing demo must not call real product APIs (PII/auth) → R3. Don't overclaim crypto specifics.
- **Engineering (HIGH):** reuse existing demo/Section components; static illustrative data; no new heavy deps → R3, R4.
- **Staff Engineer (HIGH):** "interactive dashboard" is the 10×-longer task (responsive + a11y + perf); keep it static-first.
- **Auditing/Compliance (CRITICAL):** LL 144 independent-auditor distinction → R1; list only real frameworks → R8.
- **Product Owner (HIGH):** lead with the regulatory pain, not chrome; sequence People first; dashboard supports.
- **Data Science (HIGH):** define KPIs honestly (four-fifths/impact ratio); never imply Thursdai guarantees a passing audit.
- **UX (HIGH):** Solutions vs Product IA; ≤7 nav; dashboard cognitive load; mobile → R7.
- **Infra/DevOps (MEDIUM):** static pages, no prod dependency → R3.
- **Legal (CRITICAL):** claims verbs, FTC illustrative-data disclosure, no unverified metrics → R1, R2.
- **Customer Success (MEDIUM):** set expectation that packs/dashboard populate from real data (pilot framing).
- **CFO (LOW/positive):** low marginal cost; reuse + PostHog A/B already in place.
- **QA (HIGH):** Lighthouse budget gate; cross-page consistency → R4.
- **Tech Writer (MEDIUM):** document the supported-framework list; keep claims sourced → R8.
- **Accessibility (HIGH):** data-viz a11y, not color-only status, WCAG 2.2 → R5.
- **Ethics (CRITICAL):** do not imply AI hiring is bias-free/safe; responsible framing; protect candidates; illustrative honesty → R1, R2.

---

## Phase 6 — Overall Readiness Assessment

Vote: **11 APPROVE WITH CONDITIONS, 4 APPROVE, 0 DO NOT APPROVE.**

Non-negotiable conditions before publish:
1. Legal-safe verb set enforced on all three pages (R1).
2. Every dashboard/pack figure labeled illustrative, unavoidably (R2).
3. No marketing surface calls real product APIs (R3).
4. Pages pass Lighthouse + a11y CI gates (R4, R5).
5. Only product-real frameworks/claims listed (R8).

Final confidence: **READY WITH CONDITIONS.** The work is low-risk to build and high-value to the regulated-industry buyer, *provided* it inherits the honesty discipline from this session's accuracy pass — illustrative data stays labeled, and Thursdai is positioned as the system that **produces the evidence**, not the independent auditor and not a guarantee of compliance.

Plain-language next step: get Jeff's calls on the four open questions (esp. positioning + hero A/B), then build in this order: Compliance Packs page → People solution page → Executive Dashboard section + hero A/B variant.
