import { describe, expect, it } from 'vitest';
import { matchesBypassSecret, readBypassSecret } from '@/lib/preview-bypass';

describe('preview bypass', () => {
  it('should treat an unset or blank secret as no secret', () => {
    expect(readBypassSecret(undefined)).toBeNull();
    expect(readBypassSecret('')).toBeNull();
    expect(readBypassSecret('   ')).toBeNull();
  });

  it('should keep a configured secret, trimmed', () => {
    expect(readBypassSecret(' s3cret ')).toBe('s3cret');
  });

  it('should refuse every value when no secret is configured', () => {
    expect(matchesBypassSecret('anything', null)).toBe(false);
    expect(matchesBypassSecret('', null)).toBe(false);
    expect(matchesBypassSecret(null, null)).toBe(false);
  });

  it('should refuse a request that carries no preview value', () => {
    expect(matchesBypassSecret(null, 's3cret')).toBe(false);
  });

  it('should accept only the exact configured value', () => {
    expect(matchesBypassSecret('s3cret', 's3cret')).toBe(true);
    expect(matchesBypassSecret('s3cret ', 's3cret')).toBe(false);
    expect(matchesBypassSecret('S3CRET', 's3cret')).toBe(false);
  });
});
