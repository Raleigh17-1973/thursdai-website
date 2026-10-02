// Single source for the canonical origin. thursdai.com is not ours (it is a
// for-sale lander), so the fallback must never point there.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://getthursdai.com').replace(/\/+$/, '');

// Label for surfaces that show the fictional sample tenant with unsigned sample figures
// (for example the executive dashboard).
export const SAMPLE_LABEL = 'Sample tenant: Northwind Financial (fictional).';

// Label for surfaces that show the genuinely signed fixture (src/lib/receipts/fixture.json):
// the hero receipt, the share image and every pane of /demo.
export const SAMPLE_LABEL_SIGNED = 'Sample tenant: Northwind Financial (fictional). Real signatures.';

// Where people reach us when an automated channel is unavailable.
export const CONTACT_EMAIL = 'thursdai@getthursdai.com';

// The product's name for the signed record (decision D6). Centralised so a rename is one line.
export const RECEIPT_TERM = 'AI Receipt';
export const RECEIPT_TERM_PLURAL = 'AI Receipts';
