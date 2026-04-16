# Proposal: brand-rebrand-horizon

## Problem
The Thursdai marketing website uses an old teal accent palette (#0f766e / #2dd4bf) that violates the
Horizon Brand Guide (April 2026). The guide explicitly flags teal (#0d9488) as a DON'T and mandates
a new indigo/plum/amber palette with dawn gradient as the brand signature.

## Changes Required (from brand guide)

### 1. Color System Rewrite
- OLD accent: `#0f766e` (light), `#2dd4bf` (dark) → REMOVED
- NEW accent: `#3e4fb8` Indigo/Accent-Lt (light bg), `#8b9ef0` Periwinkle/Accent-Dk (dark bg)
- Dawn gradient: `#1e2a5a` Indigo → `#5b3a7a` Plum → `#e8a34a` Amber
- Background: `#fafaf9` warm paper (not `#fafafa`)
- Dark BG: `#0a0a0e` (not `#09090b`)
- Add brand palette tokens: indigo, plum, amber, periwinkle

### 2. Typography — Add Instrument Serif
- Display font for section titles, hero headings, large metrics, empty states
- Pair with Geist (body) — serif for display, sans for everything else
- Letter spacing: -0.02em on headings

### 3. Dawn Gradient Usage
- Hero sections: apply as directional gradient overlay or text gradient
- Brand moments: CTA sections, stat callouts
- NOT for buttons, badges, or full-page backgrounds

### 4. File Scope
- `globals.css` — full token rewrite
- `layout.tsx` — add Instrument Serif via next/font/google
- `tokens/thursdai.ts` — update constants
- `Badge.tsx`, `GradientText.tsx`, `CertBadge.tsx` — component token updates
- `ModeratorPanel.tsx`, `ReplayDemoTabs.tsx`, `Footer.tsx` — hardcoded teal → indigo
- All product pages (5), home page, developers pages (3), trust/data, customers — remove teal gradients

## Decision
Replace the full teal palette with the Horizon brand palette. All CSS vars and hardcoded hex values
updated. Dawn gradient used as hero accent (not full background). Instrument Serif added as display font.
