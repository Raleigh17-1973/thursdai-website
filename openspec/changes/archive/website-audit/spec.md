# Spec: Website Audit Fixes & SMB Positioning

**Change:** website-audit  
**Status:** approved

---

## Sprint 1 — Critical

### S1-1: Nav CTA button text
- MUST render visible text "Get a Demo" in the TopNav primary button
- MUST use `text-white` (or `color: #FFFFFF`) hardcoded on this button, NOT a CSS variable
- MUST be visible in both dark mode and light mode

### S1-2: Remove developer note from DealDesigner
- MUST NOT render any text containing "Jeff Hoyt", "src/config/pricing.ts", or "Feature flag" in JSX output
- The note MAY exist as a code comment (`//`) but MUST NOT appear in rendered HTML

### S1-3: Debug badge gated to development
- The floating debug pill/badge MUST NOT render when `NODE_ENV !== 'development'`
- MUST verify it does not appear at `localhost:3002` in production build simulation

### S1-4: Fix "Recorded Recorded" typo
- Given the ReplayDemo renders a timestamp line, WHEN it renders, it MUST read "Recorded September 14, 2024" (exactly once — not "Recorded Recorded September 14, 2024")
- The fix MUST be in the data or the render logic, not a string replace hack

### S1-5: Hero section top padding
- Given a 900px viewport, WHEN the homepage loads, the hero eyebrow label MUST be visible without scrolling
- Hero sections MUST NOT have more than 100px of dead space between the navbar and the first visible text element
- Applies to: `/`, `/pricing`, `/trust`, `/customers`

### S1-6: Customers page "publishing" copy
- MUST remove "Named case studies — with real numbers and customer approval — are publishing in August 2026." from the /customers hero
- SHALL replace with neutral forward-positive framing that does not admit no deployments exist

### S1-7: Pricing page middle card
- Given three pricing tier cards, WHEN /pricing renders, all three cards MUST have visible background, border, padding, and border-radius
- The "Load this example →" link MUST NOT float in empty space outside a card container

### S1-8: Remove "publishing August 2026" banners
- MUST remove all "Named case study publishing August 2026" Badge/tag elements from homepage stat cards and /customers page
- Stat cards MAY retain their numbers and anonymous company names

### S1-9: Closing CTA button contrast
- The primary button in the closing CTA teal gradient band MUST use a dark background (bg-gray-900 or equivalent) with white text
- SHALL provide maximum contrast against the teal gradient background

---

## Sprint 2 — High

### S2-10: Section vertical padding
- All Section components MUST use no more than `py-24` (96px) for standard sections
- Tight sections SHOULD use `py-16` (64px)
- At 1440×900 viewport, a visitor MUST be able to see at least the top of the next section while viewing a section

### S2-11: Moderator role panel card contrast
- Card body text in dark mode MUST have a minimum color contrast of #9CA3AF (gray-400)
- Card background SHOULD use a slightly elevated surface (e.g., rgba white/5 or surface-secondary token) to separate from section background
- Scroll-in animation MUST start at opacity ≥ 0.4 (not 0)

### S2-12: Footer light mode
- In light mode (data-theme="light"), footer background MUST NOT be the same stark dark #0B0F19
- SHALL use a softer dark (bg-gray-900) OR a gradient transition from the page background color to the footer background

### S2-13: Demo tab labels (plain language)
- Tab "Model Selection" MUST be renamed to "Vendor Decision"
- Tab "Conversation Logs" MUST be renamed to "Past Decision Replay"  
- Tab "AI Agent Deployment" MUST be renamed to "Policy Enforcement"
- Changes MUST be in `src/config/demo-data.ts` or wherever tab labels are defined

### S2-14: Hero eyebrow label
- MUST replace "ENTERPRISE AGENT PLATFORM" with "AI THAT WORKS FOR YOUR WHOLE TEAM"

### S2-18: Trust bar in hero
- MUST add a trust signal row directly below the hero CTA buttons
- SHALL include: SOC 2 Type II · ISO 27001 · HIPAA-eligible · EU AI Act Ready
- MUST use muted small text (gray, ~12px), no large badges needed

### S2-20: /company page (shell)
- SHALL create `/company` page with placeholder founder content
- MUST add "Company" nav item to TopNav
- Minimum content: founding story paragraph, placeholder team section, press/media kit link

### S2-21: How it works section
- MUST add a 3-step plain-language section between the hero and the Three Promises section
- Steps: (1) You ask a question → (2) Thursdai consults Legal, Finance, Operations simultaneously → (3) One sourced, policy-checked answer with full audit trail
- MUST use plain English — no technical terms

### S2-23: Alternating section backgrounds
- Even sections SHALL use the base surface color (--color-bg / --color-surface)
- Odd sections SHALL use a slightly elevated surface (--color-surface-secondary)
- MUST use existing CSS token variables, not hardcoded colors

### S2-copy: All 20 copy rewrites
- See spec items S2-copy-1 through S2-copy-20 below

#### S2-copy-1: Hero eyebrow
- MUST change to: "AI THAT WORKS FOR YOUR WHOLE TEAM"

#### S2-copy-4: Hero sub-headline (Option B variant)
- MUST change to: "Ask a question. Thursdai consults Legal, Finance, and Operations simultaneously, reconciles their input, and gives you one sourced, policy-checked answer — with a full audit trail. No guesswork. No liability."

#### S2-copy-5: Three Promises Card 1
- MUST change body to: "Ask once and get perspectives from all your business areas — Legal, Finance, Operations — at the same time. Thursdai combines them into one clear answer, and shows you exactly where each part came from."

#### S2-copy-6: Three Promises Card 3
- MUST change body to: "Set rules your AI must follow — and it literally cannot break them. Block sensitive data from outputs. Enforce your pricing floors. Require citations on legal claims. No coding needed for the essentials."

#### S2-copy-7: Moderator section headline
- MUST change to: "Your whole team, asked at once. One clear answer."

#### S2-copy-8: Moderator section sub-copy
- MUST change to: "One question. Every relevant perspective. Thursdai brings together your business's Legal, Finance, and Operations knowledge — flags where they disagree, cites every source, and applies your rules before the answer reaches you."

#### S2-copy-9: Policy-as-Code headline
- MUST change to: "Rules your AI must follow. No exceptions."

#### S2-copy-10: Policy-as-Code body
- MUST change to: "Tell Thursdai what your AI is and isn't allowed to do. It will enforce those rules on every answer — automatically. Block sensitive information from leaking. Require sources on any claim. Prevent the AI from quoting below your contract minimums. Works out of the box; full customisation available for technical teams."

#### S2-copy-11: Developers section headline
- MUST change to: "Built to connect to your existing tools. With an open API for technical teams."

#### S2-copy-12: Developers section sub-copy
- MUST change to: "Thursdai works out of the box for most teams. For developers and IT: a full API, SDK, and MCP server. Connect to your existing systems, automate workflows, and build on top of Thursdai's roles and policies. See the developer docs →"

#### S2-copy-13: Closing CTA headline
- MUST change to: "Ready to use AI you can actually trust?"

#### S2-copy-14 & 15: Footer product links
- "Two-Tier Knowledge" → MUST rename to "Your data, kept separate"
- "Ambient Cases" → MUST rename to "Auto-built case files"

#### S2-copy-18: /trust hero headline
- MUST change to: "Built so your team, your clients, and your auditors all feel confident."

#### S2-copy-19: /trust sub-copy
- MUST change to: "Whether you're a 10-person team or a Fortune 500, Thursdai was built with security and accountability as its foundation — not bolted on later."

#### S2-copy-20: /customers headline
- MUST change to: "Real results, from real teams."

---

## Sprint 3 — Medium

### S3-26: Pricing slider labels
- "Monthly inference" → MUST rename to "Monthly AI queries (approx.)"
- Token values MUST display as "~N,000 queries/mo" not "NM tokens/mo"
- "Monthly resolved cases" → "Cases resolved by AI per month"
- "Not included" toggle text → "Pay only when AI resolves a case (optional)"

### S3-27: Closing CTA sub-copy
- MUST change to: "Try the replay demo — no login required — or talk to us about a pilot."

### S3-28: Footer email placeholder
- MUST change from "you@company.com" to "your@email.com"

### S3-30: Demo widget interaction invite
- MUST add a small label above the demo tabs: "Click to explore →" or similar
- Inactive tabs SHOULD have a visible hover state

### S3-31: Moderator section secondary CTA
- MUST add a secondary micro-CTA below "See Moderator in depth →"
- Text: "or book a live walk-through →" linking to the demo request form

### S3-33: Back-to-top button
- MUST add a floating back-to-top button that appears after 300px of scroll
- SHALL be bottom-right, ~48×48px, teal background, white up-arrow icon
- MUST fade in/out based on scroll position

### S3-footer-tagline: Footer brand tagline
- MUST change from "The governed agent substrate for regulated enterprises"
- MUST change to: "Your team's AI — controlled, auditable, and safe to use."
