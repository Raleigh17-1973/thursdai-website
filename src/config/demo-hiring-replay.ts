// The /demo replay: the sample tenant's requisition JR-204 at four points in time, with the
// decision on the signed receipt as the marked point. The decision-time snapshot is built
// from the signed fixture; the points either side are fictional sample-tenant history that
// shows what Time-Travel is for (the record keeps the state as it was, even after it moves on).
// No protected attributes: the applicant is a pseudonymous reference throughout.
import type { ReplaySnapshot } from '@/components/demos/TimeTravelScrubber';
import { SAMPLE_DISPLAY as S, SAMPLE_RECEIPT as R } from '@/lib/receipts/display';

const recommender = `Recommender: ${R.source.system} (${R.source.model} on ${R.source.model_host}, ${R.source.version})`;
const reviewer = `Reviewer: ${R.human_oversight.reviewer_role}`;
const policyAtDecision = R.policies_evaluated.map((p) => `${p.id}: ${p.result === 'pass' ? 'passed' : p.result}`);
const evidenceAtDecision = R.evidence.map((e) => e.ref);

export const HIRING_REPLAY_QUESTION = `What did the screening agent know, under which policies and with whom reviewing, when it advanced ${R.decision.subject_ref}?`;

export const HIRING_REPLAY: ReplaySnapshot[] = [
  {
    tick: 'Aug 4',
    label: 'Requisition opened',
    date: '2026-08-04',
    answer:
      'JR-204 is open and scored against rubric v2. The screening agent is not connected yet, so no AI decision can be recorded against this requisition.',
    state: [
      { title: 'Knowledge', items: ['JR-204', 'Hiring rubric v2'] },
      { title: 'Policy', items: ['pii-block'] },
      { title: 'Roles', items: ['Recommender: none', reviewer] },
    ],
    changes: ['JR-204 opened', 'Rubric v2 in use'],
  },
  {
    tick: 'Sep 2',
    label: 'Agent connected',
    date: '2026-09-02',
    answer:
      'Rubric v3 replaces v2 and the candidate notice for NYC Local Law 144 is filed. The vendor screening agent is connected as a recommender. A human reviewer still decides.',
    state: [
      { title: 'Knowledge', items: ['JR-204', 'Hiring rubric v3'] },
      { title: 'Policy', items: ['nyc-ll144-notice', 'pii-block'] },
      { title: 'Roles', items: [recommender, reviewer] },
    ],
    changes: ['Rubric v3 replaced v2', 'LL144 notice filed', 'Screening agent connected'],
  },
  {
    tick: 'Sep 16, 14:32',
    label: 'At decision',
    date: S.recordedAt,
    answer: `${S.decision} Both policies passed before the receipt was recorded; the reviewer followed the recommendation.`,
    state: [
      { title: 'Knowledge', items: evidenceAtDecision },
      { title: 'Policy', items: policyAtDecision },
      { title: 'Roles', items: [recommender, `${reviewer} (followed)`] },
    ],
    changes: ['Application received', `Receipt ${S.id} recorded`],
    marker: true,
  },
  {
    tick: 'Sep 30',
    label: 'Two weeks later',
    date: '2026-09-30',
    answer:
      'Rubric v4 has replaced v3 and the vendor has moved the agent to a newer model version. Neither change touches the receipt: replaying 14:32 on 16 September still shows rubric v3 and the model version that actually ran.',
    state: [
      { title: 'Knowledge', items: ['JR-204', 'Hiring rubric v4'] },
      { title: 'Policy', items: ['nyc-ll144-notice', 'pii-block'] },
      { title: 'Roles', items: [`Recommender: ${R.source.system} (newer model version)`, reviewer] },
    ],
    changes: ['Rubric v4 replaced v3', 'Vendor updated the model version'],
  },
];

export const HIRING_REPLAY_DECISION_INDEX = HIRING_REPLAY.findIndex((s) => s.marker);
