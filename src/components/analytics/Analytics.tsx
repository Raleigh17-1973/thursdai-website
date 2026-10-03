'use client';

import { useEffect } from 'react';
import { analyticsEnabled, initAnalytics, track } from '@/lib/analytics';

/**
 * Mounted once in the root layout. Schedules the lazy PostHog load and records cta_click for
 * server-rendered links marked with data-cta-location and data-cta-label, so those links stay
 * server components (a client wrapper on each page pulled extra chunks into the initial load).
 * Client components (RequestPilotButton, TopNav) call track() directly.
 */
export function AnalyticsInit() {
  useEffect(() => {
    if (!analyticsEnabled()) return;
    initAnalytics();
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest?.('[data-cta-location]');
      if (!el) return;
      track({
        name: 'cta_click',
        props: {
          location: el.getAttribute('data-cta-location') ?? '',
          label: el.getAttribute('data-cta-label') ?? el.textContent?.trim() ?? '',
        },
      });
    }
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  return null;
}
