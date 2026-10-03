// The one subprocessor list, shown on /security. Source: the sub-processor register in the
// platform repository (docs/sub-processors.md), reconciled to what is actually integrated.
// Temporal is not listed: production Temporal is self-hosted, so it is not a third party.
// SendGrid is not listed: it is planned and not yet integrated. Stripe is not listed: it is
// only Thursdai's own billing, which is switched off (BILLING_ENABLED unset); add it back when
// billing goes live. Keep this the only copy and update it when the register changes.

export interface Subprocessor {
  name: string;
  purpose: string;
  dpa: string;
}

// Owner decision (October 3, 2026): no executed DPA could be verified for any subprocessor, so
// every row says so. Replace per row with the real status once each DPA is confirmed.
const DPA_NOT_CONFIRMED = 'Not confirmed';

export const SUBPROCESSORS: readonly Subprocessor[] = [
  { name: 'Railway', purpose: 'Production hosting and managed Postgres, the primary datastore', dpa: DPA_NOT_CONFIRMED },
  { name: 'Amazon Web Services', purpose: 'Key management (KMS) and object storage (S3). Region: us-east-1', dpa: DPA_NOT_CONFIRMED },
  { name: 'Anthropic', purpose: 'Model inference. Receives user queries and conversation context', dpa: DPA_NOT_CONFIRMED },
  { name: 'OpenAI', purpose: 'Model inference and embeddings, as a fallback provider', dpa: DPA_NOT_CONFIRMED },
  { name: 'Vercel', purpose: 'Frontend hosting, edge compute and CDN', dpa: DPA_NOT_CONFIRMED },
  { name: 'PagerDuty', purpose: 'Alerting and on-call management. No customer personal data', dpa: DPA_NOT_CONFIRMED },
  { name: 'Grafana Labs', purpose: 'Observability (metrics and logs), only when export is configured', dpa: DPA_NOT_CONFIRMED },
  // Region: the platform's CSP allows only Sentry's US ingest host (*.ingest.us.sentry.io,
  // thursdai packages/api/src/app.ts).
  { name: 'Sentry', purpose: 'Application error monitoring for the Thursdai platform (US region)', dpa: DPA_NOT_CONFIRMED },
];
