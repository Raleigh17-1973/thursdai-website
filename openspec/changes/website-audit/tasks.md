# Tasks: website-audit

## Sprint 1 — Critical

- [ ] 1.1 `src/components/nav/TopNav.tsx` — Add "Get a Demo" text to primary CTA button; set `text-white` hardcoded; verify light + dark
- [ ] 1.2 `src/components/demos/DealDesigner.tsx` — Remove the JSX developer note mentioning "Jeff Hoyt" and "src/config/pricing.ts"; move to code comment
- [ ] 1.3 Find and gate any debug badge/pill behind `process.env.NODE_ENV !== 'development'`
- [ ] 1.4 `src/config/demo-data.ts` or `ReplayDemo.tsx` — Fix "Recorded Recorded" double-word in timestamp render
- [ ] 1.5 `src/app/(marketing)/page.tsx` + other hero pages — Remove excess top padding from hero sections; target ≤100px gap below nav
- [ ] 1.6 `src/app/(marketing)/customers/page.tsx` — Replace "publishing August 2026" hero copy with neutral framing
- [ ] 1.7 `src/app/(marketing)/pricing/page.tsx` — Fix middle pricing card missing container/background
- [ ] 1.8 `src/app/(marketing)/page.tsx` + `customers/page.tsx` — Remove all "Named case study publishing August 2026" badges from stat cards
- [ ] 1.9 `src/app/(marketing)/page.tsx` — Change closing CTA primary button to bg-gray-900 text-white

## Sprint 2 — High + Copy

- [ ] 2.1 `src/components/layout/Section.tsx` — Audit all padding variants; reduce default py-40/py-48 → py-24; tight → py-16
- [ ] 2.2 `src/components/demos/ModeratorPanel.tsx` — Increase card body text to ≥ gray-400; elevate card background; animation starts at opacity 0.4 min
- [ ] 2.3 `src/components/nav/Footer.tsx` — Add light mode variant: soften footer background in data-theme="light"
- [ ] 2.4 `src/config/demo-data.ts` — Rename tabs: Model Selection→Vendor Decision, Conversation Logs→Past Decision Replay, AI Agent Deployment→Policy Enforcement
- [ ] 2.5 `src/app/(marketing)/page.tsx` — Replace eyebrow "ENTERPRISE AGENT PLATFORM" with "AI THAT WORKS FOR YOUR WHOLE TEAM"
- [ ] 2.6 `src/app/(marketing)/page.tsx` — Add trust bar (SOC 2 · ISO 27001 · HIPAA-eligible · EU AI Act Ready) below hero CTA buttons
- [ ] 2.7 Create `src/app/(marketing)/company/page.tsx` — Placeholder founder/company page
- [ ] 2.8 `src/components/nav/TopNav.tsx` — Add "Company" link to nav items
- [ ] 2.9 `src/app/(marketing)/page.tsx` — Add 3-step "How it works" section between hero and Three Promises
- [ ] 2.10 `src/app/(marketing)/page.tsx` + other pages — Add alternating section backgrounds using existing CSS tokens
- [ ] 2.11 `src/app/(marketing)/page.tsx` — Apply all homepage copy rewrites (S2-copy-1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13)
- [ ] 2.12 `src/components/nav/Footer.tsx` — Rename "Two-Tier Knowledge" → "Your data, kept separate", "Ambient Cases" → "Auto-built case files"; update footer tagline
- [ ] 2.13 `src/app/(marketing)/trust/page.tsx` — Apply copy rewrites S2-copy-18 and S2-copy-19
- [ ] 2.14 `src/app/(marketing)/customers/page.tsx` — Apply copy rewrite S2-copy-20

## Sprint 3 — Medium

- [ ] 3.1 `src/components/demos/DealDesigner.tsx` — Rename slider labels to plain English; convert token display to queries
- [ ] 3.2 `src/app/(marketing)/page.tsx` — Update closing CTA sub-copy
- [ ] 3.3 `src/components/nav/Footer.tsx` — Change email placeholder from "you@company.com" to "your@email.com"
- [ ] 3.4 `src/components/demos/ReplayDemoTabs.tsx` — Add "Click to explore →" label; add tab hover states
- [ ] 3.5 `src/app/(marketing)/page.tsx` — Add secondary micro-CTA below Moderator demo "See Moderator in depth" link
- [ ] 3.6 Create `src/components/ui/BackToTop.tsx` — Floating back-to-top button; add to root layout
