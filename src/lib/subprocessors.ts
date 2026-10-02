// The one subprocessor list, shown on /trust/subprocessors and summarised on /security.
// Source: the platform's vendor security overview (thursday-platform docs/security), which
// /security is regenerated from. The two pages used to carry different lists; keep this the
// only copy and update it when the overview changes.

export interface Subprocessor {
  name: string;
  purpose: string;
  dpa: string;
}

export const SUBPROCESSORS: readonly Subprocessor[] = [
  { name: 'Railway', purpose: 'Cloud hosting and container runtime', dpa: 'DPA on file' },
  { name: 'Amazon Web Services', purpose: 'Key management (KMS) and GovCloud deployments', dpa: 'DPA on file (AWS standard DPA)' },
  { name: 'Temporal Technologies', purpose: 'Durable workflow orchestration', dpa: 'DPA on file' },
  { name: 'Anthropic', purpose: 'Model inference for governed decisions and compliance analysis', dpa: 'DPA on file' },
  { name: 'OpenAI', purpose: 'Model inference (supplemental provider)', dpa: 'DPA on file' },
  { name: 'Stripe', purpose: 'Payment processing and billing', dpa: 'DPA on file' },
];
