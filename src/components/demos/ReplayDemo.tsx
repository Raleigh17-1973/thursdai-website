// Server component — no 'use client' needed; all data is static imports.
import React from 'react';
import { DEMO_DECISIONS } from '@/config/demo-data';
import { Badge } from '@/components/ui/Badge';
import { Label } from '@/components/typography/Label';

// The first decision is shown in the hero. Week 5 will add a decision-switcher.
const decision = DEMO_DECISIONS[0];

// Simple role → badge colour mapping
const roleVariant: Record<string, 'teal' | 'green' | 'amber'> = {
  Legal: 'teal',
  Engineering: 'green',
  Finance: 'amber',
};

// Split answer text into sentences and annotate with provenance
function buildAnnotatedAnswer(
  answer: string,
  provenance: typeof decision.provenance
) {
  // Split on '. ' but keep the period by re-attaching it
  const rawSentences = answer.split(/(?<=\.)\s+/);
  return rawSentences.map((sentence, idx) => {
    const match = provenance.find((p) => sentence.startsWith(p.text.replace(/,$/, '')));
    const citationId = match ? `citation-${idx}` : undefined;
    return { sentence, match, citationId };
  });
}

const annotated = buildAnnotatedAnswer(decision.answer, decision.provenance as unknown as typeof decision.provenance);

function confidenceVariant(conf: number): 'green' | 'amber' | 'muted' {
  if (conf >= 0.9) return 'green';
  if (conf >= 0.7) return 'amber';
  return 'muted';
}

export function ReplayDemo() {
  const formattedDate = new Date(decision.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      style={{
        border: '1px solid var(--color-border-default)',
        borderRadius: '16px',
        background: 'var(--color-surface-primary)',
        overflow: 'hidden',
        maxHeight: '520px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Two-column layout on desktop, stacked on mobile */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          flex: 1,
          overflowY: 'auto',
        }}
        className="md:grid-cols-[65%_35%]"
      >
        {/* Answer panel */}
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid var(--color-border-default)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
          className="md:border-b-0 md:border-r"
        >
          {/* Question */}
          <p
            style={{
              fontSize: '14px',
              fontStyle: 'italic',
              color: 'var(--color-text-secondary)',
              margin: 0,
            }}
          >
            {decision.question}
          </p>

          {/* Role attribution */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {Object.entries(decision.roleBreakdown).map(([role, pct]) => (
              <Badge key={role} variant={roleVariant[role] ?? 'muted'}>
                {role} {pct}%
              </Badge>
            ))}
          </div>

          {/* Annotated answer text */}
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.65,
              color: 'var(--color-text-primary)',
              margin: 0,
            }}
          >
            {annotated.map(({ sentence, match, citationId }, idx) => {
              if (match && citationId) {
                return (
                  <React.Fragment key={idx}>
                    <span
                      className="replay-citation"
                      aria-describedby={citationId}
                      data-tooltip={match.source}
                      style={{
                        textDecoration: 'underline dotted',
                        textDecorationColor: 'var(--color-accent)',
                        textUnderlineOffset: '3px',
                        cursor: 'help',
                        position: 'relative',
                      }}
                    >
                      {sentence}
                    </span>
                    {idx < annotated.length - 1 ? ' ' : ''}
                  </React.Fragment>
                );
              }
              return (
                <React.Fragment key={idx}>
                  {sentence}
                  {idx < annotated.length - 1 ? ' ' : ''}
                </React.Fragment>
              );
            })}
          </p>

          {/* Footer */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', margin: 0 }}>
              Decision recorded {formattedDate}
            </p>
            <a
              href="#demo-request"
              style={{
                fontSize: '13px',
                color: 'var(--color-accent)',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Request a live tenant demo →
            </a>
          </div>
        </div>

        {/* Provenance panel — collapses to accordion on mobile via CSS */}
        <div
          style={{
            padding: '1.5rem',
            background: 'var(--color-surface-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Label>Sources</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {decision.provenance.map((item, idx) => {
              const citationId = `citation-${annotated.findIndex(
                (a) => a.match?.source === item.source
              )}`;
              const confPct = Math.round(item.confidence * 100);
              return (
                <div
                  key={idx}
                  id={citationId}
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    paddingBottom: idx < decision.provenance.length - 1 ? '0.875rem' : 0,
                    borderBottom:
                      idx < decision.provenance.length - 1
                        ? '1px solid var(--color-border-default)'
                        : 'none',
                  }}
                >
                  {/* Number badge */}
                  <span
                    style={{
                      flexShrink: 0,
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'var(--color-accent)',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '2px',
                    }}
                  >
                    {idx + 1}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span
                      style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}
                    >
                      {item.source}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                      {item.section}
                    </span>
                    <Badge variant={confidenceVariant(item.confidence)}>
                      {confPct}% confidence
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
