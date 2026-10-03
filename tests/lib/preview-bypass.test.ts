import { describe, expect, it } from 'vitest';
import {
  MIN_BYPASS_SECRET_LENGTH,
  isBypassGranted,
  resolveBypassSecret,
  timingSafeEqualStrings,
} from '@/lib/preview-bypass';

const SECRET = 'a'.repeat(MIN_BYPASS_SECRET_LENGTH - 4) + 'b7c9';

describe('resolveBypassSecret', () => {
  it('disables the bypass when the env var is unset or empty', () => {
    expect(resolveBypassSecret(undefined)).toBeNull();
    expect(resolveBypassSecret(null)).toBeNull();
    expect(resolveBypassSecret('')).toBeNull();
    expect(resolveBypassSecret('   ')).toBeNull();
  });

  it('disables the bypass when the secret is shorter than 16 characters', () => {
    expect(resolveBypassSecret('x'.repeat(MIN_BYPASS_SECRET_LENGTH - 1))).toBeNull();
  });

  it('accepts a secret of 16 characters or more, trimmed', () => {
    expect(resolveBypassSecret(SECRET)).toBe(SECRET);
    expect(resolveBypassSecret(`  ${SECRET}\n`)).toBe(SECRET);
  });
});

describe('isBypassGranted', () => {
  it('grants only an exact match', () => {
    expect(isBypassGranted(SECRET, SECRET)).toBe(true);
    expect(isBypassGranted(SECRET.toUpperCase(), SECRET)).toBe(false);
    expect(isBypassGranted(SECRET.slice(0, -1), SECRET)).toBe(false);
    expect(isBypassGranted(`${SECRET}x`, SECRET)).toBe(false);
  });

  it('never grants when no secret is configured, whatever is supplied', () => {
    expect(isBypassGranted('', null)).toBe(false);
    expect(isBypassGranted('anything-at-all-123', null)).toBe(false);
    expect(isBypassGranted(null, null)).toBe(false);
  });

  it('never grants without a supplied value', () => {
    expect(isBypassGranted(null, SECRET)).toBe(false);
    expect(isBypassGranted(undefined, SECRET)).toBe(false);
    expect(isBypassGranted('', SECRET)).toBe(false);
  });

  it('ignores a well-formed guess when the env var is unset', () => {
    const guess = '00000000-0000-4000-8000-000000000000';
    expect(isBypassGranted(guess, resolveBypassSecret(undefined))).toBe(false);
    expect(isBypassGranted(guess, SECRET)).toBe(false);
  });
});

describe('timingSafeEqualStrings', () => {
  it('matches equal strings and rejects different ones', () => {
    expect(timingSafeEqualStrings('', '')).toBe(true);
    expect(timingSafeEqualStrings('abc', 'abc')).toBe(true);
    expect(timingSafeEqualStrings('abc', 'abd')).toBe(false);
    expect(timingSafeEqualStrings('abc', 'ab')).toBe(false);
    expect(timingSafeEqualStrings('é', 'e')).toBe(false);
  });
});
