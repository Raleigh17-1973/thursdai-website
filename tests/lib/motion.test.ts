import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { MOTION, MOTION_CSS_VARS, SIGN_TOTAL_MS, shouldDeferReveal } from '@/lib/motion';

const css = readFileSync(fileURLToPath(new URL('../../src/app/globals.css', import.meta.url)), 'utf8');

describe('motion tokens', () => {
  it('globals.css declares every token with the value in motion.ts', () => {
    for (const [name, value] of Object.entries(MOTION_CSS_VARS)) {
      expect(css, name).toContain(`${name}: ${value};`);
    }
  });

  it('the signature completes inside one second', () => {
    expect(SIGN_TOTAL_MS).toBeLessThan(1000);
    expect(MOTION.sign.hashMs).toBe(600);
  });

  it('reveal and panel stay under the system timing', () => {
    expect(MOTION.reveal).toEqual({ ms: 240, risePx: 12 });
    expect(MOTION.panel).toEqual({ ms: 180, shiftPx: 4 });
  });

  it('every animation is gated on reduced motion and none loops', () => {
    const gated = css.slice(css.indexOf('@media (prefers-reduced-motion: no-preference)'));
    expect(gated.length).toBeLessThan(css.length);
    expect(css).not.toMatch(/animation[^;]*infinite/);
    // Keyframe users all live inside the no-preference block.
    const before = css.slice(0, css.indexOf('@media (prefers-reduced-motion: no-preference)'));
    expect(before).not.toMatch(/animation:\s*rec-/);
  });
});

describe('shouldDeferReveal', () => {
  it('leaves anything already in the viewport alone', () => {
    expect(shouldDeferReveal(0, 800)).toBe(false);
    expect(shouldDeferReveal(799, 800)).toBe(false);
    expect(shouldDeferReveal(-200, 800)).toBe(false);
  });

  it('defers only what is below the fold', () => {
    expect(shouldDeferReveal(800, 800)).toBe(true);
    expect(shouldDeferReveal(2400, 800)).toBe(true);
  });
});
