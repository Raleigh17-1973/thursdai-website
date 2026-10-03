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
- [ ] **Pricing confirmation** — all values in `src/config/pricing.ts` are illustrative placeholders; confirm real numbers and remove the "illustrative" disclaimer banner from DealDesigner
- [ ] **Blog draft review** — 4 posts in `content/blog/` are marked as drafts; content lead sign-off required before launch
- [ ] **Submit sitemap** — after first deploy, submit `https://thursdai.com/sitemap.xml` to Google Search Console
- [ ] **Validate structured data** — run all primary routes through Google's Rich Results Test

## Post-Launch

- [ ] **Named case studies** — 3 named customers with hard numbers to replace anonymised placeholders (target: August 2026)
- [ ] **Sentry** — add `SENTRY_DSN` to Vercel env vars for error tracking in production

## Withdrawn pages (2026-10-02)

These routes 307-redirect (see `next.config.ts`) because their copy claimed things Thursdai does not do
or hold. Their source is deleted; restore it from git history (the parent of the commit titled
"Hide the pages whose copy claims things...") and rebuild the copy from the claim ladder before removing
the redirect.

- `/trust/deployment`, `/trust/subprocessors`, `/trust/annex-iii`, `/trust/data`
- `/developers/mcp`, `/developers/sdk`
- `/resources/role-bench`, `/product/ambient-cases`
- `/company` (now `/company/team`), `/compare` and the six comparison pages
