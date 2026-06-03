import React from 'react';

/**
 * Brand wordmark. Instrument Serif italic "thursdai" with only the trailing
 * "ai" carrying the dawn gradient. The gradient is CSS background-clip (not a
 * baked SVG), so the mark scales with font-size and never rasterizes.
 *
 * Use `onDark` in the always-dark footer: it lightens "thursd" and forces the
 * periwinkle to amber dark gradient, which reads on a dark panel regardless of
 * the active light/dark theme.
 */
export function ThursdaiWordmark({
  onDark = false,
  fontSize = 28,
}: {
  onDark?: boolean;
  fontSize?: number;
}) {
  return (
    <span
      className="font-display"
      role="img"
      aria-label="Thursdai"
      style={{
        display: 'inline-block',
        fontWeight: 400,
        fontSize: `${fontSize}px`,
        lineHeight: 1,
        color: onDark ? '#f4f4f6' : 'var(--color-text-primary)',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      thursd
      <span className={onDark ? 'dawn-gradient-text-dark' : 'dawn-gradient-text'}>ai</span>
    </span>
  );
}
