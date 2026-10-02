// Single source for the canonical origin. thursdai.com is not ours (it is a
// for-sale lander), so the fallback must never point there.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://getthursdai.com').replace(/\/+$/, '');

// Label for every surface that shows the fictional sample tenant. Add "Real signatures."
// only once the receipts it labels are signed by the real fixture (plan Item 3).
export const SAMPLE_LABEL = 'Sample tenant: Northwind Financial (fictional).';

// Where people reach us when an automated channel is unavailable.
export const CONTACT_EMAIL = 'thursdai@getthursdai.com';

// The product's name for the signed record (decision D6). Centralised so a rename is one line.
export const RECEIPT_TERM = 'AI Receipt';
