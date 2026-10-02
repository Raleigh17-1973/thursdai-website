// Formatting helpers shared by every receipt surface. No data imports, so any component
// (server, client or the edge share image) can use them without pulling in the fixture.

/** "2026-09-16T14:32:07Z" → "2026-09-16 14:32:07 UTC". Seconds optional. */
export function formatUtc(iso: string, { seconds = true }: { seconds?: boolean } = {}): string {
  const m = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})(:\d{2})?/.exec(iso);
  if (!m) return iso;
  return `${m[1]} ${m[2]}${seconds && m[3] ? m[3] : ''} UTC`;
}

/** First 6 and last 4 hex characters, the fingerprint style used on every receipt surface. */
export function shortHash(hash: string): string {
  const hex = hash.replace(/^sha256[:\s]*/i, '');
  if (hex.length <= 12) return hex;
  return `${hex.slice(0, 6)}…${hex.slice(-4)}`;
}

/** A copy of an id with its last character changed, so it cannot match the signed record. */
export function tamperedId(id: string): string {
  const last = id.slice(-1);
  return id.slice(0, -1) + (last === 'f' ? 'e' : 'f');
}