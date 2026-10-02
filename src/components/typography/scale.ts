import type React from 'react';

// The Record type scale: exactly three sizes above body (17px).
// Sizes interpolate linearly from a 360px viewport (mobile value) to 1440px (desktop value).
function fluid(min: number, max: number): string {
  const slope = (max - min) / (1440 - 360);
  const intercept = min - slope * 360;
  return `clamp(${min}px, calc(${intercept.toFixed(2)}px + ${(slope * 100).toFixed(3)}vw), ${max}px)`;
}

const display: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  color: 'var(--color-text-primary)',
  margin: 0,
};

export const H1_STYLE: React.CSSProperties = {
  ...display,
  fontWeight: 400,
  fontSize: fluid(40, 72),
  lineHeight: 1.05,
  letterSpacing: '-0.02em',
  fontVariationSettings: '"opsz" 72',
  textWrap: 'balance',
};

export const H2_STYLE: React.CSSProperties = {
  ...display,
  fontWeight: 400,
  fontSize: fluid(30, 44),
  lineHeight: 1.15,
  letterSpacing: '-0.015em',
  fontVariationSettings: '"opsz" 36',
  textWrap: 'balance',
};

export const H3_STYLE: React.CSSProperties = {
  ...display,
  fontWeight: 500,
  fontSize: fluid(22, 26),
  lineHeight: 1.25,
  letterSpacing: '-0.01em',
};

// H4 is not a fourth display size: it is body-size Geist, semibold, for small sub-heads.
export const H4_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontWeight: 600,
  fontSize: '17px',
  lineHeight: 1.4,
  color: 'var(--color-text-primary)',
  margin: 0,
};

export const LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '12px',
  lineHeight: 1.4,
  fontWeight: 400,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--color-text-secondary)',
};
