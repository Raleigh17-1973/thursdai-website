// The PostHog API host the browser sends events to. Shared by the client (src/lib/analytics.ts)
// and the CSP in next.config.ts, so connect-src always names exactly the host in use.
// posthog-js rewrites the legacy app hosts to the ingestion hosts itself, so normalise them
// here the same way or the CSP would allow the wrong origin.

const DEFAULT_HOST = 'https://us.i.posthog.com';

const LEGACY: Record<string, string> = {
  'https://app.posthog.com': 'https://us.i.posthog.com',
  'https://us.posthog.com': 'https://us.i.posthog.com',
  'https://eu.posthog.com': 'https://eu.i.posthog.com',
};

export function posthogApiHost(configured: string | undefined): string {
  const raw = (configured ?? '').trim().replace(/\/+$/, '');
  if (!raw) return DEFAULT_HOST;
  let origin: string;
  try {
    origin = new URL(raw).origin;
  } catch {
    return DEFAULT_HOST;
  }
  return LEGACY[origin] ?? origin;
}
