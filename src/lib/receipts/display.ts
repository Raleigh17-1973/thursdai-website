// Display helpers for the signed sample fixture. Pure (no node:crypto), so the edge share
// image, server components and client islands can all read the same values. Every surface
// that shows the sample receipt derives its text from fixture.json through this module, so
// the id, hash, timestamps and decision can never drift from what /api/verify checks.
import fixtureJson from './fixture.json';
import { formatUtc, shortHash } from './format';

export { formatUtc, shortHash } from './format';

export interface FixtureReceipt {
  id: string;
  tenant: string;
  decision: { summary: string; type: string; outcome: string; subject_ref: string; confidence: number };
  source: { role: string; system: string; operator: string; model: string; model_host: string; version: string };
  policies_evaluated: { id: string; name: string; result: string; detail: string }[];
  evidence: { kind: string; ref: string }[];
  risk: { tier: string; framework: string };
  human_oversight: { reviewer_role: string; action: string };
  recorded_at: string;
  scope_note: string;
}

export interface FixtureFile {
  receipt: FixtureReceipt;
  sha256: string;
  signature: string;
  signature_algorithm: string;
  signed_at: string;
  key_id: string;
}

export const SIGNED_FIXTURE = fixtureJson as unknown as FixtureFile;
export const SAMPLE_RECEIPT = SIGNED_FIXTURE.receipt;

/** "nyc-ll144-notice, pii-block" with a single result when every policy agrees. */
export function policySummary(receipt: FixtureReceipt = SAMPLE_RECEIPT): { text: string; allPassed: boolean } {
  const ids = receipt.policies_evaluated.map((p) => p.id).join(', ');
  const allPassed = receipt.policies_evaluated.every((p) => p.result === 'pass');
  return { text: `${ids}: ${allPassed ? 'passed' : 'see detail'}`, allPassed };
}

/** The decision sentence as it reads on a receipt: the summary with a closing full stop. */
export function decisionSentence(receipt: FixtureReceipt = SAMPLE_RECEIPT): string {
  const s = receipt.decision.summary.trim();
  return /[.!?]$/.test(s) ? s : `${s}.`;
}

const humanize = (s: string) => s.replace(/_/g, ' ');

export const SAMPLE_DISPLAY = {
  id: SAMPLE_RECEIPT.id,
  sha256: SIGNED_FIXTURE.sha256,
  fingerprint: shortHash(SIGNED_FIXTURE.sha256),
  decision: decisionSentence(),
  system: SAMPLE_RECEIPT.source.system,
  model: `${SAMPLE_RECEIPT.source.model} / ${SAMPLE_RECEIPT.source.model_host}`,
  recordedAt: formatUtc(SAMPLE_RECEIPT.recorded_at),
  recordedAtShort: formatUtc(SAMPLE_RECEIPT.recorded_at, { seconds: false }),
  signedAt: formatUtc(SIGNED_FIXTURE.signed_at),
  keyId: SIGNED_FIXTURE.key_id,
  algorithm: SIGNED_FIXTURE.signature_algorithm,
  policies: policySummary(),
  riskTier: `${SAMPLE_RECEIPT.risk.tier[0].toUpperCase()}${SAMPLE_RECEIPT.risk.tier.slice(1)} / ${SAMPLE_RECEIPT.risk.framework.replace(/^EU AI Act /, '')}`,
  oversight: `${SAMPLE_RECEIPT.human_oversight.reviewer_role}: ${humanize(SAMPLE_RECEIPT.human_oversight.action).replace(/^recommendation /, '')}`,
  evidence: SAMPLE_RECEIPT.evidence.map((e) => e.ref).join(', '),
  subject: `${SAMPLE_RECEIPT.decision.subject_ref} (pseudonymized)`,
  outcome: humanize(SAMPLE_RECEIPT.decision.outcome).replace(/^./, (c) => c.toUpperCase()),
  confidence: `${Math.round(SAMPLE_RECEIPT.decision.confidence * 100)}% (reported by source)`,
} as const;
