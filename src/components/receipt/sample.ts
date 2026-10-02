import { SAMPLE_LABEL } from '@/config/site';
import type { ReceiptFrameProps } from './ReceiptFrame';

// The sample tenant's hiring receipt: a decision made by an external screening agent,
// policy-checked, recorded and signed by Thursdai. Fictional tenant, clearly labelled.
// Same id and fingerprint as the share image (app/opengraph-image.tsx).
export const SAMPLE_HIRING_RECEIPT: ReceiptFrameProps = {
  id: 'rcpt_7f3a91c2',
  decision: 'Advanced applicant 4821 to the interview stage for the senior analyst role.',
  source: { system: 'Greenhouse screening agent', model: 'GPT-4o / Azure' },
  fields: [
    { label: 'Subject', value: 'Applicant 4821 (pseudonymized)' },
    { label: 'Outcome', value: 'Advanced' },
    { label: 'Policies', value: 'll144, pii-block: passed', tone: 'pass' },
    { label: 'Risk tier', value: 'High / Annex III' },
    { label: 'Evidence', value: 'JR-204, hiring rubric v3' },
    { label: 'Oversight', value: 'Recommendation followed' },
    { label: 'Confidence', value: '87%' },
  ],
  hash: 'a1b2c4d8e07f3a91c25b6e4d0c9a7f12e3b48d56c1a0f9e2b7d4c3a6e5f8e9f0',
  recordedAt: '2026-01-20 14:32 UTC',
  label: SAMPLE_LABEL,
};
