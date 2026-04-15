// Server component — builds static decision data and passes to client tabs island.
import React from 'react';
import { DEMO_DECISIONS } from '@/config/demo-data';
import { ReplayDemoTabs, type ReplayDecisionData } from './ReplayDemoTabs';

const TAB_LABELS = ['Model Selection', 'Conversation Logs', 'AI Agent Deployment'];

const WHAT_CHANGED = [
  'Since Sept 2024: GPT-4o now leads benchmarks for this use case. Role Bench v1 adds structured comparison data.',
  'Since March 2024: GDPR enforcement has expanded AI log retention guidance. 90-day window remains valid.',
  'Since Jan 2025: FRIA template updated to v1.4. Tier-1 checklist expanded to 12 items.',
];

function buildAnnotated(
  answer: string,
  provenance: ReadonlyArray<{ text: string; source: string; section: string; confidence: number }>
) {
  // Split on sentence boundaries (after . ? !) while keeping punctuation
  const rawSentences = answer.split(/(?<=[.!?])\s+/);
  return rawSentences.map((sentence, idx) => {
    const match = provenance.find((p) =>
      sentence.startsWith(p.text.replace(/,$/, '').replace(/\.$/, ''))
    );
    return {
      sentence,
      match: match
        ? { source: match.source, section: match.section, confidence: match.confidence }
        : undefined,
      citationId: match ? `citation-0-${idx}` : undefined,
    };
  });
}

export function ReplayDemo() {
  const decisions: ReplayDecisionData[] = DEMO_DECISIONS.map((d, i) => {
    const formattedDate = new Date(d.date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    return {
      id: d.id,
      label: TAB_LABELS[i] ?? d.id,
      question: d.question,
      date: `Recorded ${formattedDate}`,
      roleBreakdown: d.roleBreakdown as Record<string, number>,
      annotated: buildAnnotated(d.answer, d.provenance),
      provenance: d.provenance.map((p) => ({
        source: p.source,
        section: p.section,
        confidence: p.confidence,
      })),
      whatChanged: WHAT_CHANGED[i] ?? '',
    };
  });

  return <ReplayDemoTabs decisions={decisions} />;
}
