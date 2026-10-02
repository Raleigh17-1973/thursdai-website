import { SAMPLE_LABEL_SIGNED } from '@/config/site';
import { SAMPLE_DISPLAY as S } from '@/lib/receipts/display';
import type { ReceiptFrameProps } from './ReceiptFrame';

// The sample tenant's hiring receipt: a decision made by an external screening agent,
// policy-checked, recorded and signed by Thursdai. Every value is derived from the signed
// fixture (src/lib/receipts/fixture.json) that /api/verify checks, so the hero, the share
// image and /demo all show the same genuinely signed record. Fictional tenant, labelled.

const BASE = {
  id: S.id,
  decision: S.decision,
  source: { system: S.system, model: S.model },
  hash: S.sha256,
  recordedAt: S.recordedAt,
  label: SAMPLE_LABEL_SIGNED,
} satisfies Omit<ReceiptFrameProps, 'fields'>;

/** Full receipt: every field on the record. Used on /demo. */
export const SAMPLE_HIRING_RECEIPT: ReceiptFrameProps = {
  ...BASE,
  fields: [
    { label: 'Subject', value: S.subject },
    { label: 'Outcome', value: S.outcome },
    { label: 'Policies', value: S.policies.text, tone: S.policies.allPassed ? 'pass' : 'flag' },
    { label: 'Risk tier', value: S.riskTier },
    { label: 'Evidence', value: S.evidence },
    { label: 'Oversight', value: S.oversight },
    { label: 'Confidence', value: S.confidence },
  ],
};

/**
 * Hero receipt: the three fields a buyer reads first (plus Recorded), so the whole card,
 * signature included, sits above the fold at 1440x800 without shrinking any type.
 */
export const SAMPLE_HIRING_RECEIPT_COMPACT: ReceiptFrameProps = {
  ...BASE,
  recordedAt: S.recordedAtShort,
  fields: [
    { label: 'Policies', value: S.policies.text, tone: S.policies.allPassed ? 'pass' : 'flag' },
    { label: 'Risk tier', value: S.riskTier },
    { label: 'Oversight', value: S.oversight },
  ],
};
