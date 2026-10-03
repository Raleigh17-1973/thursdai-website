import React from 'react';
import { SAMPLE_LABEL } from '@/config/site';

// Static, sample-tenant governance dashboard for marketing surfaces.
// Data is sample/seed only and is clearly labelled as such — no live product
// API is called and no figure here represents a real customer outcome.

interface Kpi {
  label: string;
  value: string;
  sub: string;
  // 0..100 fill for the track; purely decorative, mirrors `value` where sensible
  fill?: number;
}

const GOVERNANCE_KPIS: Kpi[] = [
  // LL144 requires impact ratios to be calculated and published; it sets no pass mark. The
  // 0.80 shown here is the EEOC four-fifths rule of thumb, for reference only.
  { label: 'Lowest impact ratio', value: '0.86', sub: 'Across AEDT categories; EEOC four-fifths reference 0.80', fill: 86 },
  { label: 'AI systems in cadence', value: '12 / 12', sub: 'Bias audit within the last year', fill: 100 },
  { label: 'Hiring override rate', value: '7%', sub: 'Human reversed the AI recommendation', fill: 7 },
  { label: 'Candidate notice rate', value: '99.2%', sub: 'Candidates given the AEDT notice', fill: 99 },
];

const WORKFORCE_KPIS: Kpi[] = [
  { label: 'Headcount', value: '4,820', sub: 'Active employees' },
  { label: 'Voluntary attrition', value: '9.1%', sub: 'Trailing 12 months' },
  { label: 'Median time-to-fill', value: '38 days', sub: 'Across open requisitions' },
  { label: 'Pay gap', value: '1.4%', sub: 'Adjusted, under reporting threshold' },
];

function SampleTenantBanner() {
  return (
    <div
      role="note"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 0.875rem',
        borderRadius: '2px',
        border: '1px dashed var(--color-border-strong)',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        lineHeight: 1.5,
        color: 'var(--color-text-secondary)',
        marginBottom: '1.25rem',
      }}
    >
      {SAMPLE_LABEL} Sample figures shown to demonstrate the surface, not real customer results.
    </div>
  );
}

function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <div
      style={{
        border: '1px solid var(--color-border-default)',
        borderRadius: '2px',
        background: 'var(--color-surface-primary)',
        padding: '1.1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.35rem',
      }}
    >
      <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
        {kpi.label}
      </span>
      <span
        style={{
          fontSize: '26px',
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-display)',
          lineHeight: 1.1,
        }}
      >
        {kpi.value}
      </span>
      {typeof kpi.fill === 'number' && (
        <span
          aria-hidden="true"
          style={{
            display: 'block',
            height: '2px',
            background: 'var(--color-border-default)',
            overflow: 'hidden',
            marginTop: '0.15rem',
          }}
        >
          <span
            style={{
              display: 'block',
              height: '100%',
              width: `${kpi.fill}%`,
              background: 'var(--color-text-primary)',
            }}
          />
        </span>
      )}
      <span style={{ fontSize: '13px', lineHeight: 1.45, color: 'var(--color-text-secondary)' }}>{kpi.sub}</span>
    </div>
  );
}

function KpiGroup({ title, kpis }: { title: string; kpis: Kpi[] }) {
  return (
    <div>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'var(--color-text-secondary)',
          margin: '0 0 0.75rem 0',
        }}
      >
        {title}
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {kpis.map((k) => (
          <KpiCard key={k.label} kpi={k} />
        ))}
      </div>
    </div>
  );
}

export function ExecutiveDashboard() {
  return (
    <div
      role="region"
      aria-label="Executive governance dashboard preview"
      style={{
        border: '1px solid var(--color-border-default)',
        borderRadius: '2px',
        background: 'var(--color-surface-primary)',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        <span style={{ fontSize: '17px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
          AI governance, at a glance
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
          People space &middot; this quarter
        </span>
      </div>
      <SampleTenantBanner />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <KpiGroup title="AI governance" kpis={GOVERNANCE_KPIS} />
        <KpiGroup title="Workforce" kpis={WORKFORCE_KPIS} />
      </div>
    </div>
  );
}
