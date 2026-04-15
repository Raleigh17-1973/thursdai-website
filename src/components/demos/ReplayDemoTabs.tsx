'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Callout } from '@/components/ui/Callout';

interface ProvenanceItem {
  source: string;
  section: string;
  confidence: number;
}

interface AnnotatedSentence {
  sentence: string;
  match?: ProvenanceItem;
  citationId?: string;
}

export interface ReplayDecisionData {
  id: string;
  label: string;
  question: string;
  date: string;
  roleBreakdown: Record<string, number>;
  annotated: AnnotatedSentence[];
  provenance: ProvenanceItem[];
  whatChanged: string;
}

interface ReplayDemoTabsProps {
  decisions: ReplayDecisionData[];
}

const ROLE_VARIANT: Record<string, 'teal' | 'green' | 'amber' | 'muted'> = {
  Legal: 'amber',
  Engineering: 'teal',
  Finance: 'green',
  HR: 'muted',
  Compliance: 'amber',
};

function ConfidenceBar({ value }: { value: number }) {
  const filled = Math.round(value * 10);
  return (
    <span style={{ display: 'inline-flex', gap: '2px', verticalAlign: 'middle' }}>
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            width: '6px',
            height: '8px',
            borderRadius: '1px',
            background:
              i < filled ? 'var(--color-accent)' : 'var(--color-border-default)',
          }}
        />
      ))}
    </span>
  );
}

export function ReplayDemoTabs({ decisions }: ReplayDemoTabsProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const active = decisions[activeIdx];

  return (
    <div
      style={{
        border: '1px solid var(--color-border-default)',
        borderRadius: '16px',
        background: 'var(--color-surface-primary)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Tab switcher */}
      <div style={{ padding: '0.75rem 1.25rem 0' }}>
        <p
          style={{
            fontSize: '12px',
            color: 'var(--color-text-secondary)',
            marginBottom: '0.5rem',
            margin: '0 0 0.5rem 0',
          }}
        >
          ← Click to explore different decisions
        </p>
      </div>
      <div
        role="tablist"
        aria-label="Decision examples"
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--color-border-default)',
          overflowX: 'auto',
        }}
      >
        {decisions.map((d, i) => (
          <button
            key={d.id}
            role="tab"
            aria-selected={i === activeIdx}
            aria-controls={`replay-panel-${d.id}`}
            id={`replay-tab-${d.id}`}
            onClick={() => setActiveIdx(i)}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              flex: '0 0 auto',
              padding: '0.75rem 1.25rem',
              fontSize: '13px',
              fontWeight: i === activeIdx ? 600 : 400,
              color: i === activeIdx ? 'var(--color-accent)' : 'var(--color-text-secondary)',
              background: 'transparent',
              border: 'none',
              borderBottom:
                i === activeIdx
                  ? '2px solid var(--color-accent)'
                  : '2px solid transparent',
              cursor: 'pointer',
              transition: 'color 150ms ease, opacity 150ms ease',
              whiteSpace: 'nowrap',
              marginBottom: '-1px',
              opacity: i === activeIdx ? 1 : hoveredIdx === i ? 1 : 0.6,
            }}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div
        id={`replay-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`replay-tab-${active.id}`}
        aria-live="polite"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          flex: 1,
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
            {active.question}
          </p>

          {/* Role attribution chips */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {Object.entries(active.roleBreakdown).map(([role, pct]) => (
              <Badge key={role} variant={ROLE_VARIANT[role] ?? 'muted'}>
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
            {active.annotated.map(({ sentence, match, citationId }, idx) => {
              if (match && citationId) {
                const tooltipText = `${match.source} · ${match.section} · ${Math.round(match.confidence * 100)}% confidence`;
                return (
                  <React.Fragment key={idx}>
                    <span
                      className="replay-sentence"
                      data-has-citation=""
                      data-tooltip={tooltipText}
                      aria-describedby={citationId}
                    >
                      {sentence}
                    </span>
                    {idx < active.annotated.length - 1 ? ' ' : ''}
                  </React.Fragment>
                );
              }
              return (
                <React.Fragment key={idx}>
                  {sentence}
                  {idx < active.annotated.length - 1 ? ' ' : ''}
                </React.Fragment>
              );
            })}
          </p>

          {/* What changed callout */}
          <Callout variant="info">{active.whatChanged}</Callout>

          {/* Footer */}
          <div
            style={{
              marginTop: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <p
              style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', margin: 0 }}
            >
              Recorded {active.date}
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
              ↗ Request a live tenant demo
            </a>
          </div>
        </div>

        {/* Provenance panel — desktop: sidebar, mobile: accordion */}
        <div
          style={{
            background: 'var(--color-surface-secondary)',
          }}
          className="replay-provenance-panel"
        >
          {/* Desktop sidebar */}
          <div
            className="replay-provenance-desktop"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--color-text-tertiary)',
              }}
            >
              Sources
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {active.provenance.map((item, idx) => {
                const confPct = Math.round(item.confidence * 100);
                return (
                  <div
                    key={idx}
                    id={`citation-${activeIdx}-${idx}`}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      paddingBottom:
                        idx < active.provenance.length - 1 ? '0.875rem' : 0,
                      borderBottom:
                        idx < active.provenance.length - 1
                          ? '1px solid var(--color-border-default)'
                          : 'none',
                    }}
                  >
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
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {item.source}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {item.section}
                      </span>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '11px',
                          color: 'var(--color-text-tertiary)',
                        }}
                      >
                        <span>{confPct}%</span>
                        <ConfidenceBar value={item.confidence} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile accordion */}
          <details className="replay-provenance-mobile" style={{ padding: '1rem' }}>
            <summary
              style={{
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                listStyle: 'none',
              }}
            >
              View sources ({active.provenance.length})
            </summary>
            <div
              style={{
                marginTop: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {active.provenance.map((item, idx) => {
                const confPct = Math.round(item.confidence * 100);
                return (
                  <div key={idx} style={{ fontSize: '12px' }}>
                    <span
                      style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}
                    >
                      {idx + 1}. {item.source}
                    </span>
                    <span
                      style={{ color: 'var(--color-text-secondary)', display: 'block' }}
                    >
                      {item.section} · {confPct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
