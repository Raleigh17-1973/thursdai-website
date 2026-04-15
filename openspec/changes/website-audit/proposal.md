# Proposal: Website Audit Fixes & SMB Positioning

**Change name:** website-audit  
**Source:** Thursdai-Website-Audit-And-Improvement-Plan.docx (April 15, 2026)  
**Reviewed by:** Claude (Cowork) — live browser session on localhost:3002  
**Issues:** 9 Critical · 14 High · 13 Medium · 10 Content/SMB

---

## Executive Summary

A live browser review of the thursdai-website at localhost:3002 found 46 issues across four severity levels. The site has fundamental broken-UI problems (invisible button text, exposed developer notes, a debug badge visible to all users) that must be fixed before any external demo. Beyond the critical fixes, the site is positioned exclusively for large regulated enterprises using jargon-heavy copy, which conflicts with the stated goal of also attracting SMBs. The audit provides exact replacement copy and code-level fixes for every issue.

---

## Affected Areas

| Area | Files |
|------|-------|
| TopNav CTA button | `src/components/nav/TopNav.tsx` |
| DealDesigner (pricing note) | `src/components/demos/DealDesigner.tsx` |
| Debug badge / dev tools | `src/app/(marketing)/layout.tsx` or root layout |
| ReplayDemo (typo + tab labels) | `src/components/demos/ReplayDemo.tsx`, `src/components/demos/ReplayDemoTabs.tsx`, `src/config/demo-data.ts` |
| Hero sections (padding) | `src/app/(marketing)/page.tsx`, `src/app/(marketing)/pricing/page.tsx`, `src/app/(marketing)/trust/page.tsx`, `src/app/(marketing)/customers/page.tsx` |
| Customers page copy | `src/app/(marketing)/customers/page.tsx` |
| Pricing cards layout | `src/app/(marketing)/pricing/page.tsx` |
| Homepage stat cards | `src/app/(marketing)/page.tsx` |
| Closing CTA button | `src/app/(marketing)/page.tsx` |
| Section padding (all) | `src/components/layout/Section.tsx` |
| Moderator panel cards | `src/components/demos/ModeratorPanel.tsx` |
| Footer | `src/components/nav/Footer.tsx` |
| Hero copy (eyebrow, headline, sub) | `src/app/(marketing)/page.tsx`, `src/config/demo-data.ts` |
| Trust bar (new) | `src/app/(marketing)/page.tsx` |
| Company page (new) | `src/app/(marketing)/company/page.tsx` |
| How it works section (new) | `src/app/(marketing)/page.tsx` |
| Alternating section backgrounds | `src/app/globals.css`, page files |
| All copy rewrites | Component and page files |

---

## Proposed Approach

### Sprint 1 — Critical (fix before any external demo)
Fix all 9 critical broken-UI and credibility issues. Each fix is surgical — no architecture changes.

### Sprint 2 — High (same sprint as critical)
Fix the 14 high-priority items: section padding, contrast, footer light mode, demo tab labels, trust bar, /company page, 3-step how-it-works section, alternating backgrounds, and all 20 copy rewrites.

### Sprint 3 — Medium Polish
Fix 13 medium items: slider label plain-English, closing CTA copy, back-to-top button, footer email placeholder, Time-Travel demo content, Moderator demo content, etc.

---

## Risks

| Risk | Mitigation |
|------|------------|
| Copy changes break existing tsc types (string prop types) | tsc --noEmit after each change |
| Section padding reduction breaks mobile layouts | Check responsive behavior at 375px after Section changes |
| /company page exposes real personal info | Use placeholder founder names until Jeff confirms content |
| Alternating backgrounds may conflict with dark mode tokens | Use existing CSS variables (--color-surface, --color-surface-secondary) only |

---

## Non-Goals

- Issue #15 (add Starter pricing tier): business decision, not code — excluded from this change
- Issue #19 (footer tagline): part of copy Sprint 2
- Issue #20 (/company page): create shell with placeholder content only
- Issues #25, #29, #33: nice-to-have polish, included in Sprint 3
