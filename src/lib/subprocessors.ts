// The one subprocessor list, shown on /security. Source: the sub-processor register in the
// platform repository (docs/sub-processors.md), reconciled to what is actually integrated.
// Temporal is not listed: production Temporal is self-hosted, so it is not a third party.
// SendGrid is not listed: it is planned and not yet integrated. Keep this the only copy and
// update it when the register changes.

export interface Subprocessor {
  name: string;
  purpose: string;
  dpa: string;
}

const STANDARD_DPA = 'Standard DPA on file';
const PUBLISHED_DPA = "Vendor's published DPA";

export const SUBPROCESSORS: readonly Subprocessor[] = [
  { name: 'Railway', purpose: 'Production hosting and managed Postgres, the primary datastore', dpa: STANDARD_DPA },
  { name: 'Amazon Web Services', purpose: 'Key management (KMS) and object storage (S3). Region: us-east-1', dpa: PUBLISHED_DPA },
  { name: 'Anthropic', purpose: 'Model inference. Receives user queries and conversation context', dpa: PUBLISHED_DPA },
  { name: 'OpenAI', purpose: 'Model inference and embeddings, as a fallback provider', dpa: STANDARD_DPA },
  { name: 'Vercel', purpose: 'Frontend hosting, edge compute and CDN', dpa: STANDARD_DPA },
  { name: 'Stripe', purpose: 'Billing and payment processing', dpa: PUBLISHED_DPA },
  { name: 'PagerDuty', purpose: 'Alerting and on-call management. No customer personal data', dpa: STANDARD_DPA },
  { name: 'Grafana Labs', purpose: 'Observability (metrics and logs), only when export is configured', dpa: STANDARD_DPA },
  // Region: the platform's CSP allows only Sentry's US ingest host (*.ingest.us.sentry.io,
  // thursdai packages/api/src/app.ts). The platform's own register lists the Sentry DPA as not
  // yet confirmed, so this row says so rather than 'on file'.
  { name: 'Sentry', purpose: 'Application error monitoring for the Thursdai platform (US region)', dpa: 'DPA pending confirmation' },
];
