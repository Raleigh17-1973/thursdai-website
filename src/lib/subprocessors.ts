// The one subprocessor list, shown on /security. Reconciled on 2026-10-13 against prod config
// (the app truth pass), which overrides the older register in the platform repository.
// Not listed, on purpose:
// - Temporal and Prometheus: self-hosted on Railway, so not third parties.
// - Grafana Labs: monitoring is self-hosted Prometheus. PagerDuty: no routing key is set.
// - Vercel: hosts this marketing website only and receives no customer data.
// - LegiScan, Cohere and Cloudflare: not subprocessors of the platform.
// - GitHub (DB dumps run on Actions runners), Discord (alert webhook) and Stripe (test mode,
//   billing off): Jeff decides whether each is listed. Do not add them without that decision.
// Keep this the only copy and update it when the register changes.

export interface Subprocessor {
  name: string;
  purpose: string;
  location: string;
  dpa: string;
}

// Owner decision (October 3, 2026): no executed DPA could be verified for any subprocessor, so
// every row says so. Replace per row with the real status once each DPA is confirmed.
const DPA_NOT_CONFIRMED = 'Not confirmed';

export const SUBPROCESSORS: readonly Subprocessor[] = [
  {
    name: 'Railway',
    purpose:
      'Hosts the platform: the API, worker, Postgres database, Redis, Temporal and Prometheus. The operator console runs in a US West region.',
    location: 'EU West (Amsterdam)',
    dpa: DPA_NOT_CONFIRMED,
  },
  {
    name: 'Amazon Web Services',
    purpose:
      'KMS signs records and receives the full record bytes to do so. S3 holds encrypted daily database backups, anchor hashes and audit pack exports. SES sends notification email and access request form data.',
    location: 'AWS us-east-1 (N. Virginia)',
    dpa: DPA_NOT_CONFIRMED,
  },
  {
    name: 'Anthropic',
    purpose:
      'Model inference. Receives prompts, which can include record excerpts and the signed-in user’s identity details. Prompts are not redacted.',
    location: 'United States',
    dpa: DPA_NOT_CONFIRMED,
  },
  {
    name: 'OpenAI',
    purpose: 'Model inference as a fallback provider. Receives the same prompts when it is used.',
    location: 'United States',
    dpa: DPA_NOT_CONFIRMED,
  },
  // Region: the platform's CSP allows only Sentry's US ingest host (*.ingest.us.sentry.io).
  {
    name: 'Sentry',
    purpose: 'Application error monitoring. Receives error reports with personal data scrubbed.',
    location: 'United States',
    dpa: DPA_NOT_CONFIRMED,
  },
  {
    name: 'WorkOS',
    purpose: 'Sign-in. Receives the name and email address of each user who signs in.',
    location: 'United States',
    dpa: DPA_NOT_CONFIRMED,
  },
];
