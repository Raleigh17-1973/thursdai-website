// The Record's motion system: exactly three behaviours (docs/design/the-record.md, "Motion").
//
//   1. sign    The hero receipt signs on load: the sha256 fingerprint types in, the amber
//              signature rule draws left to right, the "Signed" seal fades in. Then static.
//   2. reveal  Product visuals and diagrams rise 12px and fade in on first viewport entry, once.
//   3. panel   The mega menu and the demo modal open with a fade and a 4px translate.
//              Both close instantly (they unmount).
//
// The timings live here and as CSS custom properties in globals.css (`--motion-*`); a unit
// test keeps the two in step. The animations themselves are CSS keyframes and transitions,
// wrapped in `@media (prefers-reduced-motion: no-preference)`, so reduced motion gets the
// final state with no start state at all. Nothing loops. No motion library is loaded.

/** The `panel` easing token (same curve as `--transition-menu`). */
export const EASE_PANEL = 'cubic-bezier(0.16, 1, 0.3, 1)';

export const MOTION = {
  sign: {
    /** The fingerprint types in over this long, one character per step. */
    hashMs: 600,
    /** The amber rule starts drawing as the last characters land. */
    ruleDelayMs: 450,
    ruleMs: 300,
    /** The seal fades in once the rule is drawn. */
    sealDelayMs: 750,
    sealMs: 150,
  },
  reveal: {
    ms: 240,
    risePx: 12,
  },
  panel: {
    ms: 180,
    shiftPx: 4,
  },
} as const;

/** When the signing animation is complete (it must finish inside one second). */
export const SIGN_TOTAL_MS = Math.max(
  MOTION.sign.hashMs,
  MOTION.sign.ruleDelayMs + MOTION.sign.ruleMs,
  MOTION.sign.sealDelayMs + MOTION.sign.sealMs,
);

/** CSS custom properties mirrored in globals.css. Checked by tests/lib/motion.test.ts. */
export const MOTION_CSS_VARS: Record<string, string> = {
  '--motion-sign-hash': `${MOTION.sign.hashMs}ms`,
  '--motion-sign-rule-delay': `${MOTION.sign.ruleDelayMs}ms`,
  '--motion-sign-rule': `${MOTION.sign.ruleMs}ms`,
  '--motion-sign-seal-delay': `${MOTION.sign.sealDelayMs}ms`,
  '--motion-sign-seal': `${MOTION.sign.sealMs}ms`,
  '--motion-reveal': `${MOTION.reveal.ms}ms`,
  '--motion-reveal-rise': `${MOTION.reveal.risePx}px`,
  '--motion-panel': `${MOTION.panel.ms}ms`,
  '--motion-panel-shift': `${MOTION.panel.shiftPx}px`,
  '--ease-panel': EASE_PANEL,
};

/** Class names used by the three behaviours (styles in globals.css). */
export const MOTION_CLASS = {
  panel: 'motion-panel',
  panelUp: 'motion-panel-up',
  scrim: 'motion-scrim',
} as const;

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Reveal only what the reader has not seen yet. An element whose top is already inside the
 * viewport when JavaScript arrives is left alone, so nothing visible ever disappears and
 * re-enters, and nothing above the fold is held back (no LCP cost). Without JavaScript
 * nothing is ever hidden.
 */
export function shouldDeferReveal(rectTop: number, viewportHeight: number): boolean {
  return rectTop >= viewportHeight;
}
