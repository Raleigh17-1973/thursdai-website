import { describe, expect, it } from 'vitest';
import { posthogApiHost } from '@/lib/posthog-host';
import { analyticsEnabled, optedOut, track } from '@/lib/analytics';

describe('posthogApiHost', () => {
  it('defaults to the US ingestion host', () => {
    expect(posthogApiHost(undefined)).toBe('https://us.i.posthog.com');
    expect(posthogApiHost('')).toBe('https://us.i.posthog.com');
    expect(posthogApiHost('not a url')).toBe('https://us.i.posthog.com');
  });

  it('maps legacy app hosts to the ingestion host posthog-js actually calls', () => {
    expect(posthogApiHost('https://app.posthog.com')).toBe('https://us.i.posthog.com');
    expect(posthogApiHost('https://eu.posthog.com/')).toBe('https://eu.i.posthog.com');
  });

  it('keeps any other host as its origin', () => {
    expect(posthogApiHost('https://eu.i.posthog.com')).toBe('https://eu.i.posthog.com');
    expect(posthogApiHost('https://ph.example.com/ingest/')).toBe('https://ph.example.com');
  });
});

describe('optedOut', () => {
  it('honours Do Not Track and Global Privacy Control', () => {
    expect(optedOut({ doNotTrack: '1' })).toBe(true);
    expect(optedOut({ doNotTrack: 'yes' })).toBe(true);
    expect(optedOut({ globalPrivacyControl: true })).toBe(true);
    expect(optedOut({ doNotTrack: '0' })).toBe(false);
    expect(optedOut({})).toBe(false);
  });
});

describe('track without a key or a browser', () => {
  it('is a no-op', () => {
    expect(analyticsEnabled()).toBe(false);
    expect(() => track({ name: 'demo_view' })).not.toThrow();
  });
});
