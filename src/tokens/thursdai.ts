// Design tokens — Thursdai Design System (Horizon Brand, April 2026)
// Palette: indigo (#3e4fb8) + periwinkle (#8b9ef0) + dawn gradient
// DO NOT use old teal (#0d9488 / #2dd4bf / #0f766e) — see brand guide.

export const tokens = {
  colors: {
    // Brand palette — Horizon
    indigoDeep:   '#1e2a5a',   // deep navy — dawn gradient start
    indigo:       '#3e4fb8',   // primary accent on light bg
    periwinkle:   '#8b9ef0',   // primary accent on dark bg
    plum:         '#5b3a7a',   // dawn gradient mid
    amber:        '#e8a34a',   // dawn gradient end / warm highlight

    // Semantic accent (resolved per theme in CSS)
    accentLight:      '#3e4fb8',  // indigo — used on light bg
    accentDark:       '#8b9ef0',  // periwinkle — used on dark bg
    accentHoverLight: '#2d3d9e',
    accentHoverDark:  '#a8b6f5',

    // Surfaces (light) — warm paper tone, not pure white
    bgLight:               '#fafaf9',
    surfacePrimaryLight:   '#ffffff',
    surfaceSecondaryLight: '#f5f5f4',
    surfaceTertiaryLight:  '#efefed',

    // Surfaces (dark)
    bgDark:               '#0a0a0e',
    surfacePrimaryDark:   '#141418',
    surfaceSecondaryDark: '#1a1a20',
    surfaceTertiaryDark:  '#222228',

    // Text (light)
    textPrimaryLight:   '#171717',
    textSecondaryLight: '#525252',
    textTertiaryLight:  '#6b6b6b',

    // Text (dark)
    textPrimaryDark:   '#e4e4e9',
    textSecondaryDark: '#a1a1b0',
    textTertiaryDark:  '#8a8a96',

    // Borders (light)
    borderDefaultLight: '#e5e5e3',
    borderStrongLight:  '#d4d4d1',
    borderFocusLight:   '#3e4fb8',

    // Borders (dark)
    borderDefaultDark: '#2a2a32',
    borderStrongDark:  '#3a3a46',
    borderFocusDark:   '#8b9ef0',

    // Status
    success:     '#16a34a',
    successDark: '#22c55e',
    warning:     '#d97706',
    warningDark: '#f59e0b',
    danger:      '#dc2626',
    dangerDark:  '#ef4444',
    info:        '#2563eb',
    infoDark:    '#3b82f6',
  },

  gradients: {
    dawn: 'linear-gradient(135deg, #1e2a5a 0%, #5b3a7a 55%, #e8a34a 100%)',
    dawnText: 'linear-gradient(135deg, #3e4fb8 0%, #5b3a7a 55%, #e8a34a 100%)',
    dawnTextDark: 'linear-gradient(135deg, #8b9ef0 0%, #c084fc 55%, #e8a34a 100%)',
  },

  fonts: {
    sans:    ['Geist', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
    display: ['Instrument Serif', 'Georgia', 'ui-serif', 'serif'],
    mono:    ['Geist Mono', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
  },

  radii: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    full: '9999px',
  },

  shadows: {
    xs: '0 1px 2px rgba(0,0,0,0.04)',
    sm: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    md: '0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
    lg: '0 12px 32px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.04)',
    xl: '0 24px 48px rgba(0,0,0,0.12)',
  },

  transitions: {
    fast:  '100ms ease',
    base:  '150ms ease',
    slow:  '250ms ease',
    panel: '250ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

export type TokenColors = typeof tokens.colors;
