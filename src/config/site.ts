// Single source for the canonical origin. thursdai.com is not ours (it is a
// for-sale lander), so the fallback must never point there.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://getthursdai.com').replace(/\/+$/, '');
