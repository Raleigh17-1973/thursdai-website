// Browser analytics (PostHog), cookieless and loaded late.
//
// - No key (NEXT_PUBLIC_POSTHOG_KEY unset), Do Not Track or Global Privacy Control: every
//   call is a no-op and posthog-js is never downloaded.
// - posthog-js is a dynamic import, so it is its own chunk and stays out of the shared JS.
//   It loads after the page's load event, when the browser is idle, or on the first tracked
//   event, whichever comes first. Events tracked before it arrives are queued.
// - persistence 'memory': no cookies and no localStorage, so a visitor gets a new anonymous
//   id on every full page load. No session recording, no autocapture, no surveys, no
//   feature flags or remote config, and no scripts fetched from PostHog's servers: the only
//   network traffic is the events below, sent to the API host.

import { posthogApiHost } from './posthog-host';

export type AnalyticsEvent =
  | { name: 'cta_click'; props: { location: string; label: string } }
  | { name: 'demo_view'; props?: Record<string, never> }
  | { name: 'demo_verify'; props: { valid: boolean } }
  | { name: 'pilot_request'; props: { cta_location: string; delivered: boolean } };

type PostHogLike = { capture: (event: string, props?: Record<string, unknown>) => void };

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

let client: PostHogLike | null = null;
let loading: Promise<PostHogLike | null> | null = null;
const queue: AnalyticsEvent[] = [];

/** True when the visitor has asked not to be tracked (DNT or GPC). */
export function optedOut(nav: Partial<Navigator> & { globalPrivacyControl?: boolean } = navigator): boolean {
  const w = typeof window === 'undefined' ? undefined : (window as unknown as { doNotTrack?: string });
  const dnt = nav.doNotTrack ?? w?.doNotTrack;
  return dnt === '1' || dnt === 'yes' || nav.globalPrivacyControl === true;
}

export function analyticsEnabled(): boolean {
  return Boolean(KEY) && typeof window !== 'undefined' && !optedOut();
}

function load(): Promise<PostHogLike | null> {
  if (loading) return loading;
  loading = import('posthog-js')
    .then(({ default: posthog }) => {
      posthog.init(KEY as string, {
        api_host: posthogApiHost(process.env.NEXT_PUBLIC_POSTHOG_HOST),
        persistence: 'memory',
        autocapture: false,
        capture_pageview: 'history_change',
        capture_pageleave: false,
        disable_session_recording: true,
        disable_surveys: true,
        disable_web_experiments: true,
        disable_external_dependency_loading: true,
        advanced_disable_flags: true,
        capture_dead_clicks: false,
        capture_exceptions: false,
        capture_heatmaps: false,
        capture_performance: false,
        rageclick: false,
        respect_dnt: true,
      });
      client = posthog;
      for (const e of queue.splice(0)) posthog.capture(e.name, e.props);
      return client;
    })
    .catch(() => null);
  return loading;
}

/** Starts loading posthog-js once the page has loaded and the browser is idle. */
export function initAnalytics(): void {
  if (!analyticsEnabled() || loading) return;
  const idle = () => {
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void })
      .requestIdleCallback;
    if (ric) ric(() => void load(), { timeout: 4000 });
    else setTimeout(() => void load(), 1500);
  };
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
}

export function track(event: AnalyticsEvent): void {
  if (!analyticsEnabled()) return;
  if (client) {
    client.capture(event.name, event.props);
    return;
  }
  queue.push(event);
  void load();
}
