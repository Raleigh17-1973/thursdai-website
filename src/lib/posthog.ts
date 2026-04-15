// PostHog server-side client for feature flag evaluation in RSC
// Used for the hero A/B test (hero-variant flag)

import { PostHog } from 'posthog-node';

let _client: PostHog | null = null;

export function getPostHogClient(): PostHog {
  if (!_client) {
    _client = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '', {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return _client;
}

export type HeroVariant = 'option-a' | 'option-b';

export async function getHeroVariant(distinctId: string): Promise<HeroVariant> {
  try {
    const client = getPostHogClient();
    const flag = await client.getFeatureFlag('hero-variant', distinctId);
    if (flag === 'option-b') return 'option-b';
  } catch {
    // Fall back to option-a if PostHog is unavailable
  }
  return 'option-a';
}
