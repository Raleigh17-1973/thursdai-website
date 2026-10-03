// Cookie consent for Microsoft Clarity, the only thing on the site that sets cookies.
//
// - Three states: unset (no choice yet), granted, denied.
// - The choice is kept in localStorage under CONSENT_KEY with the time it was made. That
//   entry is strictly necessary: without it the banner would ask on every page.
// - A Global Privacy Control or Do Not Track signal counts as denied and is never asked
//   about; it wins over anything stored.
// - Storage can throw (private windows, blocked site data). Every access is guarded, and a
//   choice that cannot be stored still applies to the rest of the page view.
// - Client components use getConsent / setConsent / subscribe; the footer's "Cookie
//   settings" uses requestConsentReview to reopen the banner.

export type ConsentState = 'unset' | 'granted' | 'denied';
export type ConsentChoice = Exclude<ConsentState, 'unset'>;

export const CONSENT_KEY = 'thursdai-consent-v1';

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;
type NavigatorLike = { doNotTrack?: string | null; globalPrivacyControl?: boolean };

export interface ConsentEnv {
  storage?: StorageLike | null;
  navigator?: NavigatorLike | null;
}

function browserStorage(): StorageLike | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

function browserNavigator(): NavigatorLike | null {
  return typeof navigator === 'undefined' ? null : (navigator as NavigatorLike);
}

/** True when the browser sends Global Privacy Control or Do Not Track. */
export function privacySignal(nav: NavigatorLike | null = browserNavigator()): boolean {
  if (!nav) return false;
  const w = typeof window === 'undefined' ? undefined : (window as unknown as { doNotTrack?: string });
  const dnt = nav.doNotTrack ?? w?.doNotTrack;
  return nav.globalPrivacyControl === true || dnt === '1' || dnt === 'yes';
}

// The choice made on this page, so it holds until the next load even if it could not be written.
let memory: ConsentChoice | null = null;

/** The stored choice, or null when there is none or it cannot be read. */
export function readStoredConsent(storage: StorageLike | null = browserStorage()): ConsentChoice | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    const state = (parsed as { state?: unknown } | null)?.state;
    return state === 'granted' || state === 'denied' ? state : null;
  } catch {
    return null;
  }
}

export function getConsent(env: ConsentEnv = {}): ConsentState {
  const nav = env.navigator === undefined ? browserNavigator() : env.navigator;
  if (privacySignal(nav)) return 'denied';
  const storage = env.storage === undefined ? browserStorage() : env.storage;
  // A choice made on this page wins over what was stored before it (the write may have failed).
  return memory ?? readStoredConsent(storage) ?? 'unset';
}

type Listener = (state: ConsentState) => void;
const listeners = new Set<Listener>();
const reviewListeners = new Set<() => void>();

/** Records a choice and tells subscribers. Returns false if it could not be stored. */
export function setConsent(choice: ConsentChoice, env: ConsentEnv = {}, now: Date = new Date()): boolean {
  memory = choice;
  let stored = false;
  const storage = env.storage === undefined ? browserStorage() : env.storage;
  if (storage) {
    try {
      storage.setItem(CONSENT_KEY, JSON.stringify({ state: choice, at: now.toISOString() }));
      stored = true;
    } catch {
      stored = false;
    }
  }
  const state = getConsent(env);
  for (const fn of Array.from(listeners)) fn(state);
  return stored;
}

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/** Asks the banner to open again so a choice can be changed (footer "Cookie settings"). */
export function requestConsentReview(): void {
  for (const fn of Array.from(reviewListeners)) fn();
}

export function onConsentReview(fn: () => void): () => void {
  reviewListeners.add(fn);
  return () => {
    reviewListeners.delete(fn);
  };
}

/** Test hook: forgets the in-memory fallback and every listener. */
export function resetConsentForTests(): void {
  memory = null;
  listeners.clear();
  reviewListeners.clear();
}
