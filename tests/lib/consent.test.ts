import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  CONSENT_KEY,
  getConsent,
  onConsentReview,
  privacySignal,
  readStoredConsent,
  requestConsentReview,
  resetConsentForTests,
  setConsent,
  subscribe,
} from '@/lib/consent';

function memoryStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    data,
  };
}

const throwing = {
  getItem: () => {
    throw new Error('SecurityError');
  },
  setItem: () => {
    throw new Error('QuotaExceededError');
  },
};

const noSignal = { navigator: {} };

beforeEach(() => resetConsentForTests());

describe('privacySignal', () => {
  it('honours Global Privacy Control and Do Not Track', () => {
    expect(privacySignal({ globalPrivacyControl: true })).toBe(true);
    expect(privacySignal({ doNotTrack: '1' })).toBe(true);
    expect(privacySignal({ doNotTrack: 'yes' })).toBe(true);
    expect(privacySignal({ doNotTrack: '0' })).toBe(false);
    expect(privacySignal({ globalPrivacyControl: false })).toBe(false);
    expect(privacySignal({})).toBe(false);
    expect(privacySignal(null)).toBe(false);
  });
});

describe('getConsent', () => {
  it('is unset with nothing stored', () => {
    expect(getConsent({ ...noSignal, storage: memoryStorage() })).toBe('unset');
    expect(getConsent({ ...noSignal, storage: null })).toBe('unset');
  });

  it('is denied under GPC or DNT, whatever is stored', () => {
    const storage = memoryStorage({ [CONSENT_KEY]: JSON.stringify({ state: 'granted', at: 'x' }) });
    expect(getConsent({ storage, navigator: { globalPrivacyControl: true } })).toBe('denied');
    expect(getConsent({ storage, navigator: { doNotTrack: '1' } })).toBe('denied');
    expect(getConsent({ storage: memoryStorage(), navigator: { globalPrivacyControl: true } })).toBe('denied');
  });

  it('treats unreadable or malformed storage as unset', () => {
    expect(getConsent({ ...noSignal, storage: throwing })).toBe('unset');
    expect(getConsent({ ...noSignal, storage: memoryStorage({ [CONSENT_KEY]: 'not json' }) })).toBe('unset');
    expect(getConsent({ ...noSignal, storage: memoryStorage({ [CONSENT_KEY]: '{"state":"maybe"}' }) })).toBe('unset');
    expect(getConsent({ ...noSignal, storage: memoryStorage({ [CONSENT_KEY]: 'null' }) })).toBe('unset');
  });
});

describe('setConsent', () => {
  it('round-trips through storage with a timestamp', () => {
    const storage = memoryStorage();
    const now = new Date('2026-10-02T12:00:00Z');
    expect(setConsent('granted', { ...noSignal, storage }, now)).toBe(true);
    expect(JSON.parse(storage.data.get(CONSENT_KEY) as string)).toEqual({
      state: 'granted',
      at: '2026-10-02T12:00:00.000Z',
    });
    expect(readStoredConsent(storage)).toBe('granted');

    resetConsentForTests(); // a fresh page load
    expect(getConsent({ ...noSignal, storage })).toBe('granted');
    setConsent('denied', { ...noSignal, storage });
    resetConsentForTests();
    expect(getConsent({ ...noSignal, storage })).toBe('denied');
  });

  it('still applies for this page when storage fails, without throwing', () => {
    expect(setConsent('denied', { ...noSignal, storage: throwing })).toBe(false);
    expect(getConsent({ ...noSignal, storage: throwing })).toBe('denied');
    resetConsentForTests();
    expect(getConsent({ ...noSignal, storage: throwing })).toBe('unset');
  });

  it('a new choice on this page wins over an older stored one when the write fails', () => {
    const stored = memoryStorage({ [CONSENT_KEY]: JSON.stringify({ state: 'granted', at: 'x' }) });
    const readOnly = { getItem: stored.getItem, setItem: throwing.setItem };
    setConsent('denied', { ...noSignal, storage: readOnly });
    expect(getConsent({ ...noSignal, storage: readOnly })).toBe('denied');
  });

  it('notifies subscribers with the effective state, and GPC still wins', () => {
    const fn = vi.fn();
    const off = subscribe(fn);
    setConsent('granted', { ...noSignal, storage: memoryStorage() });
    setConsent('granted', { storage: memoryStorage(), navigator: { globalPrivacyControl: true } });
    off();
    setConsent('denied', { ...noSignal, storage: memoryStorage() });
    expect(fn.mock.calls).toEqual([['granted'], ['denied']]);
  });
});

describe('requestConsentReview', () => {
  it('reaches review listeners until they unsubscribe', () => {
    const fn = vi.fn();
    const off = onConsentReview(fn);
    requestConsentReview();
    off();
    requestConsentReview();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
