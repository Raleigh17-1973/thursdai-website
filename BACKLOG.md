# Thursdai Website — Backlog

## Your Content — Fill These In (blocks launch credibility)

- [ ] **Company page — founder name** — edit `src/app/(marketing)/company/page.tsx`, replace all `[Your Name]` / `[placeholder]` blocks with real content: your name, years of experience, specific incident that led to building Thursdai, your previous role/company, your direct email
- [ ] **Company page — market size** — add a real IDC/Gartner citation for the AI governance market size figure (currently `[$XX billion]`)
- [ ] **Company page — unfair advantage** — fill in the "Why Thursdai wins" section with your specific background/architecture advantage
- [ ] **SOC 2 audit** — badges now show "In Audit" (honest); begin the actual SOC 2 Type II audit process if not started; update badge to reflect real stage
- [ ] **Mobile testing** — manually test at 390px (iPhone 15) viewport: hero demo panel stacking, Moderator section readability, Policy-as-Code YAML overflow
- [ ] **Customers page** — if any early pilots have given permission, replace "A Financial Services Company" etc. with real names + quotes

## Pre-Launch (required before July 14, 2026)

- [ ] **Vercel project** — create project at vercel.com, link the GitHub repo, add `VERCEL_TOKEN` / `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` to GitHub repo secrets
- [ ] **PostHog** — create project, add `NEXT_PUBLIC_POSTHOG_KEY` to Vercel env vars; the `hero-variant` A/B flag (option-a vs option-b hero copy) will activate automatically once the key is set
- [ ] **HubSpot** — add `HUBSPOT_PORTAL_ID` + `HUBSPOT_ACCESS_TOKEN` to Vercel env vars to make the demo request form submit real leads
- [ ] **Legal review** — `/trust/annex-iii` has multiple LEGAL REVIEW callouts throughout; engage EU AI Act counsel before go-live
- [ ] **Pricing confirmation** — all values in `src/config/pricing.ts` are illustrative placeholders; confirm real numbers and remove the "illustrative" disclaimer banner from DealDesigner
- [ ] **Blog draft review** — 4 posts in `content/blog/` are marked as drafts; content lead sign-off required before launch
- [ ] **Submit sitemap** — after first deploy, submit `https://thursdai.com/sitemap.xml` to Google Search Console
- [ ] **Validate structured data** — run all primary routes through Google's Rich Results Test

## Post-Launch

- [ ] **Named case studies** — 3 named customers with hard numbers to replace anonymised placeholders (target: August 2026)
- [ ] **Compare pages** — `/compare/moveworks`, `/compare/writer`, `/compare/harvey` (weeks 4–9 post-launch)
- [ ] **Role Bench real data** — run benchmark suite and publish results; leaderboard currently shows all "—" with "Coming Q3 2026" badges
- [ ] **Security pack delivery** — wire `/api/security-pack` to actually generate and email the ZIP (currently a stub); `RESEND_API_KEY` needed
- [ ] **Real compliance docs** — replace stub `.txt` files in `/api/templates/` (fria, dpia, tech-doc) with actual DOCX content
- [ ] **Sentry** — add `SENTRY_DSN` to Vercel env vars for error tracking in production
