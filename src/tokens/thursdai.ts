// Design tokens: "The Record" (October 2026). Binding spec: docs/design/the-record.md
//
// The marketing site is light only: paper, ink, one indigo accent and one amber seal.
// Amber means "signed" and appears only on the receipt signature rule and the seal; it
// never carries text. The `dark` set below is kept for the app; marketing never uses it.
//
// Contrast (WCAG, against paper #F7F5F0 unless stated):
//   ink 17.2:1 · ink2 8.1:1 (7.5:1 on sunk) · ink3 5.2:1 (4.8:1 on sunk) · indigo 6.4:1
//   on the ink band: paper 17.2:1 · inkBandText2 10.7:1 · inkBandText3 6.9:1 · indigoOnInk 8.3:1

export const tokens = {
  colors: {
    // Surfaces
    paper: '#F7F5F0', // the one base surface
    sunk: '#EFECE4', // code, table headers, receipt field wells. Never a section background.
    ink: '#14120F', // text and the single contrast surface (closing CTA band)

    // Text on paper
    ink2: '#4E4A44', // secondary
    ink3: '#6B665E', // tertiary: metadata only, never body copy

    // Text on the ink band
    inkBandText: '#F7F5F0',
    inkBandText2: '#C9C3B7',
    inkBandText3: '#A39D92',

    // Rules
    rule: 'rgba(20,18,15,0.14)', // hairline
    ruleStrong: '#14120F', // 1px rules that carry meaning (receipt, section dividers)
    ruleOnInk: 'rgba(247,245,240,0.16)',

    // Accent: links, primary buttons and focus rings only
    indigo: '#3e4fb8',
    indigoHover: '#2d3d9e',
    indigoOnInk: '#9DA8F0',

    // Seal: receipt signature rule and the "Signed" seal only. 1.97:1 on paper, never text.
    amber: '#e8a34a',
    amberText: '#9A5B12', // 5.0:1 on paper, only if amber text is ever unavoidable

    // Receipt-only status inks (inside ReceiptFrame and demo panes, never as page colour)
    statusPass: '#2f6b3a', // 5.9:1 on paper
    statusFlag: '#b42318', // 6.0:1 on paper
  },

  // App-only dark set. Not used by (marketing).
  dark: {
    bg: '#0a0a0e',
    surfacePrimary: '#141418',
    surfaceSecondary: '#1a1a20',
    surfaceTertiary: '#222228',
    textPrimary: '#e4e4e9',
    textSecondary: '#a1a1b0',
    textTertiary: '#8a8a96',
    borderDefault: '#2a2a32',
    borderStrong: '#3a3a46',
    borderFocus: '#8b9ef0',
    accent: '#8b9ef0',
    accentHover: '#a8b6f5',
  },

  fonts: {
    // Newsreader is loaded by next/font/google in app/layout.tsx and exposed as --font-display.
    display: ['Newsreader', 'Georgia', 'ui-serif', 'serif'],
    sans: ['Geist', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['Geist Mono', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
    // Instrument Serif survives only in the wordmark.
    wordmark: ['Instrument Serif', 'Georgia', 'serif'],
  },

  // Type scale: exactly three sizes above body. Mobile → desktop, interpolated with clamp().
  type: {
    h1: { mobile: 40, desktop: 72, lineHeight: 1.05, tracking: '-0.02em', opsz: 72 },
    h2: { mobile: 30, desktop: 44, lineHeight: 1.15, tracking: '-0.015em', opsz: 36 },
    h3: { mobile: 22, desktop: 26, lineHeight: 1.25, tracking: '-0.01em', weight: 500 },
    body: { size: 17, lineHeight: 1.6 },
    ui: { size: 15 },
    label: { size: 12, tracking: '0.04em' },
  },

  space: {
    base: 8,
    sectionDesktop: 128,
    sectionMobile: 80,
    headingToBody: 24,
    cardPadding: 32,
  },

  layout: {
    container: 1200,
    containerNarrow: 760,
  },

  radii: {
    frame: '2px', // buttons, inputs, cards, frames
    receipt: '0px',
  },

  shadows: {
    // The only shadow on the site: a printed-card offset rule under the receipt.
    receipt: '4px 4px 0 0 #14120F',
  },

  transitions: {
    fast: '100ms ease',
    base: '150ms ease',
    menu: '180ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

export type TokenColors = typeof tokens.colors;
