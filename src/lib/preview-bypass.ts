// Decides whether a ?preview= value opens the coming-soon gate. The secret is configuration
// (PREVIEW_BYPASS_SECRET), never source: with it unset or blank nothing matches, so the gate
// fails closed instead of falling back to a known value.
export function readBypassSecret(raw: string | undefined): string | null {
  const secret = raw?.trim();
  return secret ? secret : null;
}

export function matchesBypassSecret(provided: string | null, secret: string | null): boolean {
  if (secret === null || provided === null) return false;
  return provided === secret;
}
