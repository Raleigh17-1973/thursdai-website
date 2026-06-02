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

export type HeroVariant = 'option-a' | 'option-b' | 'option-c';

export async function getHeroVariant(distinctId: string): Promise<HeroVariant> {
  try {
    const client = getPostHogClient();
    const flag = await client.getFeatureFlag('hero-variant', distinctId);
    // option-c is the dashboard-forward hero. Add 'option-c' as a variant key on the
    // 'hero-variant' flag in PostHog to roll it into the A/B test; until then it stays dormant.
    if (flag === 'option-b') return 'option-b';
    if (flag === 'option-c') return 'option-c';
  } catch {
    // Fall back to option-a if PostHog is unavailable
  }
  return 'option-a';
}
