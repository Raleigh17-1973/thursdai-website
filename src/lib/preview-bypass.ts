// Coming-soon preview bypass: visiting /?preview=<secret> sets a 24h cookie that skips the gate.
//
// The secret comes only from the server-side env var COMING_SOON_BYPASS_SECRET (never a
// NEXT_PUBLIC_ variable, so it is not inlined into browser bundles). The value that used to be
// hard-coded in src/middleware.ts is in git history and must never be reused.

/** Shorter secrets are treated as unset: the bypass is then disabled entirely. */
export const MIN_BYPASS_SECRET_LENGTH = 16;

/** The configured secret, or null when it is missing or too short to be safe. */
export function resolveBypassSecret(raw: string | undefined | null): string | null {
  const secret = raw?.trim();
  if (!secret || secret.length < MIN_BYPASS_SECRET_LENGTH) return null;
  return secret;
}

/**
 * Compares two strings in time that depends only on their lengths, not on where they first
 * differ. The edge runtime has no node:crypto timingSafeEqual, so this XORs every UTF-16 code
 * unit. The length check leaks only the length, which says nothing useful about the secret.
 */
export function timingSafeEqualStrings(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** True only when a bypass secret is configured and the supplied value matches it exactly. */
export function isBypassGranted(supplied: string | null | undefined, configured: string | null): boolean {
  if (configured === null || typeof supplied !== 'string') return false;
  return timingSafeEqualStrings(supplied, configured);
}
