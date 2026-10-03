'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/** Fires demo_view once when /demo mounts. Its own file so only /demo loads it. */
export function TrackDemoView() {
  useEffect(() => {
    track({ name: 'demo_view' });
  }, []);
  return null;
}
