// Single source for the canonical origin. thursdai.com is not ours (it is a
// for-sale lander), so the fallback must never point there.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://getthursdai.com').replace(/\/+$/, '');

// Label for surfaces that show the fictional sample tenant with unsigned sample figures
// (for example the executive dashboard).
export const SAMPLE_LABEL = 'Sample tenant: Northwind Financial (fictional).';

// Where the production signing key set is published. The path is a literal endpoint, which is
// why it is the one allowlisted use of the retired term in scripts/check-copy.mjs.
export const PUBLIC_KEYS_PATH = 'app.getthursdai.com/.well-known/aidr-keys.json';
export const PUBLIC_KEYS_URL = `https://${PUBLIC_KEYS_PATH}`;

// Label for surfaces that show the genuinely signed fixture (src/lib/receipts/fixture.json):
// the hero receipt, the share image and every pane of /demo. The signature is genuine, but the
// key behind it is the website's own demonstration key, so the label says so.
export const SAMPLE_LABEL_SIGNED = 'Sample tenant: Northwind Financial (fictional). Signed with a demonstration key.';

// Scope note for every claim about how the sample is signed. The sample uses an Ed25519 key held
// by this website; production records use a different key held in AWS KMS.
export const DEMO_KEY_NOTE = `Signed with a demonstration key held by this website. Production records use an AWS KMS ES256 key; its public key set is published at ${PUBLIC_KEYS_PATH}.`;

// Where people reach us when an automated channel is unavailable.
export const CONTACT_EMAIL = 'thursdai@getthursdai.com';

// The product's name for the signed record (decision D6). Centralised so a rename is one line.
export const RECEIPT_TERM = 'AI Receipt';
export const RECEIPT_TERM_PLURAL = 'AI Receipts';
