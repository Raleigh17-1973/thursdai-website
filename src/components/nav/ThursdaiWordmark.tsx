import React from 'react';

/**
 * Brand wordmark: Instrument Serif italic "thursdai" (the only surviving use of
 * Instrument Serif). Only "ai" is coloured, solid indigo on paper and #9DA8F0 on ink.
 * Live text, so it scales with font-size and never rasterizes.
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
      role="img"
      aria-label="Thursdai"
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-wordmark)',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: `${fontSize}px`,
        lineHeight: 1,
        letterSpacing: '-0.01em',
        color: onDark ? '#F7F5F0' : 'var(--ink)',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      thursd
      <span style={{ color: onDark ? '#9DA8F0' : 'var(--indigo)' }}>ai</span>
    </span>
  );
}
