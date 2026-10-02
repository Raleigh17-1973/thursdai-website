# The Record: Thursdai marketing design system

Owner: design lead (Claude, acting as senior brand and product designer). Status: approved for build, October 2, 2026.
Source plan: `docs/plans/premium-site-rebuild-2026-10.md` Item 2. Decisions and confidence: `docs/decisions/premium-rebuild-2026-10.md`.

## The idea

Thursdai's product output is a signed document. The site should look like the institution that issues it: paper, ink, a serif with authority, technical drawings and one seal colour. Every page is a well-set document. The signed AI Receipt is the recurring signature. Amber appears in exactly one role, the signature line and the "Signed" seal, so that it comes to mean "signed". Nothing on the site glows, floats or gradients.

Restraint is the craft. Premium here comes from typography, spacing, alignment and a small number of perfectly drawn details, not from effects.

## Decisions (binding)

| Element | Decision |
|---|---|
| Base surface | Paper `#F7F5F0`. One base for every marketing page. |
| Sunk surface | `#EFECE4` for code blocks, table header rows and the receipt's field wells. Never a full section background. |
| Ink | Primary `#14120F` (17.2:1 on paper). Secondary `#4E4A44` (target 7:1 or better on paper; verify). Tertiary `#6B665E` (5.2:1, metadata only, never body copy). |
| Rules | Hairline `rgba(20,18,15,0.14)`; strong rule `#14120F` 1px for the receipt and section dividers that carry meaning. |
| Contrast surface | Ink `#14120F` used once per page, for the closing CTA band only. Text on it: paper `#F7F5F0`, secondary `#C9C3B7`. Replaces every navy `#0b0f19` section. |
| Accent | Indigo `#3e4fb8` for links, primary buttons and focus rings only. Hover `#2d3d9e`. On ink: `#9DA8F0`. |
| Seal | Amber `#e8a34a` only for the receipt signature rule and the "Signed" seal. 1.97:1 on paper, so it never carries text. If amber text is ever needed, use `#9A5B12` (5.0:1), but prefer not to. |
| Retired | Dawn gradient (backgrounds and text), `.hero-dawn*`, `GradientText.tsx`, plum `#5b3a7a`, periwinkle on light, the cream tertiary band, navy sections, status colours outside the receipt, dark mode on `(marketing)`. |
| Display type | Newsreader (Google, variable, `opsz` axis) via `next/font/google` so it is self-hosted at build (CSP `font-src 'self'` holds). Weights 400 and 500 only. H1 `opsz` 72, H2 `opsz` 36. Italic allowed for one emphasised word per heading at most. |
| Text and UI | Geist Sans (already loaded). Body 17px / 1.6. UI 15px. |
| Mono | Geist Mono for labels, receipt fields and code. Label = 12px, uppercase rendered as `font-variant-caps: all-small-caps` where supported, letter-spacing 0.04em, secondary ink. Labels replace every tracked-uppercase sans eyebrow. |
| Scale | H1 72px desktop / 40px mobile, line-height 1.05, letter-spacing -0.02em. H2 44px / 30px, 1.15. H3 26px / 22px, 1.25, Newsreader 500. Body 17px. Label 12px. Exactly three sizes above body. Use `clamp()` between the mobile and desktop values. |
| Measure | Prose fills the column (house rule). The column is the measure: `Container` max 1200px; long-form article pages use the narrow container (760px) which is the column, not a cap on prose inside it. |
| Spacing | 8px base. Section padding 128px desktop / 80px mobile. Heading to body 24px. Card padding 32px. |
| Radius | 2px on frames, buttons, inputs and cards. 0 on the receipt. |
| Shadow | None, except the receipt: a 1px ink rule offset 4px down-right (a printed-card shadow, solid, no blur). |
| Buttons | Primary: indigo fill, paper text, 2px radius, 15px Geist 500, 12px 20px padding, hover darkens to `#2d3d9e`. Secondary: 1px ink rule, ink text, transparent, hover sunk fill. On ink band: primary becomes paper fill with ink text. |
| Cards | Cards are not links unless the whole card is the only action. No icons in circles. A card is a hairline-ruled box or simply a column under a rule. Prefer rules and columns over boxes. |
| Linework | Single colour, `currentColor` at 60% ink, 1.25px strokes, on a 4px dot grid (dots at 12% ink). For every diagram: three steps, two-tier knowledge, policy flow, moderator roles. No illustrations with people. No icons in circles. |
| The receipt (`ReceiptFrame`) | Paper card, 1px ink border, radius 0, the offset rule shadow. Header row in mono: "AI RECEIPT" left, receipt id right, ink rule under it. Decision line in Newsreader. Field grid in mono (label tertiary, value ink) in sunk wells. Footer: 3px amber rule, then "SIGNED" mono seal and the sha256 fingerprint. Reused as the hero visual, product visual, OG image, compare summary and `/demo` pane. |
| Motion | Exactly three behaviours (Item 6): receipt signs on load (hash types over 600ms, amber rule draws, seal fades in), product visuals rise 12px and fade over 240ms on first view, menus and modals open at 180ms. All wrapped in `useReducedMotion`; reduced motion renders the final state. Nothing loops. |
| Hover | Buttons darken. Links shift underline offset 2px to 4px. Cards do nothing. |
| Focus | 2px indigo outline, 2px offset, on every interactive element. Visible on paper (indigo 6.4:1). |
| Wordmark | "thursdai" in Instrument Serif (the only surviving use of Instrument Serif). Only "ai" is coloured, now solid indigo `#3e4fb8` (on ink: `#9DA8F0`) instead of the retired dawn gradient. |
| Dark mode | Removed from `(marketing)`: no toggle, no `data-theme` switching, no dark variants. Dark tokens stay in `src/tokens/thursdai.ts` for the app. `(standalone)` untouched. |
| Imagery | Real product captures (from `/demo`) or linework diagrams only. No stock, no 3D, no abstract blobs, no logo walls until real logos exist. |

## Page anatomy (six templates)

1. Home: seven beats (plan Item 5).
2. Product pillar: H1 + one-sentence promise; receipt or capture right; three mono-labelled facts; one linework diagram; how it is signed and verified; closing ink band.
3. Solution: H1 naming the buyer; the problem in one paragraph with a sourced number; what goes on the record for them; demo CTA; closing band.
4. Trust: plain document layout, numbered sections, tables with hairline rules, the certification roadmap table.
5. Long-form (blog, legal, research): narrow container, Newsreader H1, Geist body, mono metadata line.
6. Compare: summary `ReceiptFrame`-style card, an honest table, "where they are strong" section, Request a pilot close.

## Voice in the visual system

Labels are nouns, not slogans ("RECORDED", "POLICY", "SOURCE"). Headings are short declaratives in sentence case. No em dashes, no Oxford commas. Numbers carry their source.
