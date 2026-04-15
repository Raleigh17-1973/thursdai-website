// Design tokens — Thursdai Design System
// Source of truth: packages/frontend/src/styles/tokens.css in the product repo
// Keep in sync when the product's token file changes.

export const tokens = {
  colors: {
    // Accent — teal
    accentLight: '#0f766e',       // teal-600, used on light bg
    accentDark: '#2dd4bf',        // teal-400, used on dark bg
    accentHoverLight: '#115e59',
    accentHoverDark: '#5eead4',

    // Surfaces (light)
    bgLight: '#fafafa',
    surfacePrimaryLight: '#ffffff',
    surfaceSecondaryLight: '#f5f5f5',
    surfaceTertiaryLight: '#efefef',

    // Surfaces (dark)
    bgDark: '#09090b',
    surfacePrimaryDark: '#141416',
    surfaceSecondaryDark: '#1a1a1e',
    surfaceTertiaryDark: '#222225',

    // Text (light)
    textPrimaryLight: '#171717',
    textSecondaryLight: '#525252',
    textTertiaryLight: '#6b6b6b',

    // Text (dark)
    textPrimaryDark: '#e4e4e7',
    textSecondaryDark: '#a1a1aa',
    textTertiaryDark: '#8a8a93',

    // Borders (light)
    borderDefaultLight: '#e5e5e5',
    borderStrongLight: '#d4d4d4',
    borderFocusLight: '#0d9488',

    // Borders (dark)
    borderDefaultDark: '#27272a',
    borderStrongDark: '#3f3f46',
    borderFocusDark: '#2dd4bf',

    // Status
    success: '#16a34a',
    successDark: '#22c55e',
    warning: '#d97706',
    warningDark: '#f59e0b',
    danger: '#dc2626',
    dangerDark: '#ef4444',
    info: '#2563eb',
    infoDark: '#3b82f6',
  },

  fonts: {
    sans: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['Geist Mono', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
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
    fast: '100ms ease',
    base: '150ms ease',
    slow: '250ms ease',
    panel: '250ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

export type TokenColors = typeof tokens.colors;
