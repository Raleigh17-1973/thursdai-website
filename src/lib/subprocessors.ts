// The one subprocessor list, shown on /security. Reconciled on 2026-10-13 against prod config
// (the app truth pass), which overrides the older register in the platform repository.
// Locations (owner ruling, 2026-11-08): the move to Railway US East was verified on 2026-11-08,
// so Railway says "United States (US East)" and Sentry says "US", matching the app's public list.
// Every other row makes no location claim. Never "only" or "exclusively" and no residency wording.
// Not listed, on purpose:
// - Temporal and Prometheus: self-hosted on Railway, so not third parties.
// - Grafana Labs: monitoring is self-hosted Prometheus. PagerDuty: no routing key is set.
// - Vercel: hosts this marketing website only and receives no customer data.
// - LegiScan, Cohere and Cloudflare: not subprocessors of the platform.
// - GitHub, Discord and Stripe: owner ruling, not listed.
// Keep this the only copy and update it when the register changes.

export interface Subprocessor {
  name: string;
  purpose: string;
  /** Listed under the purpose. Only where the app's public list itemises them. */
  dataCategories?: readonly string[];
  /** Only Railway and Sentry state a location. */
  location?: string;
  dpa: string;
}

// Owner decision (October 3, 2026): no executed DPA could be verified for any subprocessor, so
// every row says so. Replace per row with the real status once each DPA is confirmed.
const DPA_NOT_CONFIRMED = 'Not confirmed';

export const SUBPROCESSORS: readonly Subprocessor[] = [
  {
    name: 'Railway',
    purpose: 'Hosts the platform: the API, worker, Postgres database, Redis, Temporal, monitoring and the operator console.',
    location: 'United States (US East)',
    dpa: DPA_NOT_CONFIRMED,
  },
  {
    name: 'Amazon Web Services',
    purpose:
      'KMS signs records and receives the full record bytes to do so. S3 holds encrypted daily backups, anchor hashes and audit pack exports. SES sends notification email and access request form data.',
    dpa: DPA_NOT_CONFIRMED,
  },
  {
    name: 'Anthropic',
    purpose:
      'Model inference. Receives prompts, which can include record excerpts and the signed-in user’s identity details.',
    dpa: DPA_NOT_CONFIRMED,
  },
  {
    name: 'OpenAI',
    purpose: 'Model inference as a fallback provider. Receives the same prompts when it is used.',
    dpa: DPA_NOT_CONFIRMED,
  },
  {
    name: 'Sentry',
    purpose: 'Error and crash monitoring for the API, background workers and web app',
    dataCategories: [
      'Error events and stack traces',
      'Request and browser context',
      'Customer data that appears in an error message or request URL',
    ],
    location: 'US',
    dpa: DPA_NOT_CONFIRMED,
  },
  {
    name: 'WorkOS',
    purpose: 'Sign-in. Receives the name and email address of each user who signs in.',
    dpa: DPA_NOT_CONFIRMED,
  },
];
