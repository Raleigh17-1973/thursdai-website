import React from 'react';

// Static, illustrative governance dashboard for marketing surfaces.
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
  { label: 'Bias audit pass rate', value: '94%', sub: 'AEDTs passing four-fifths threshold', fill: 94 },
  { label: 'AI systems in cadence', value: '12 / 12', sub: 'Within annual audit window', fill: 100 },
  { label: 'Hiring override rate', value: '7%', sub: 'Human reversed the AI recommendation', fill: 7 },
  { label: 'Screening consent rate', value: '99.2%', sub: 'Candidates notified and consented', fill: 99 },
];

const WORKFORCE_KPIS: Kpi[] = [
  { label: 'Headcount', value: '4,820', sub: 'Active employees' },
  { label: 'Voluntary attrition', value: '9.1%', sub: 'Trailing 12 months' },
  { label: 'Median time-to-fill', value: '38 days', sub: 'Across open requisitions' },
  { label: 'Pay gap', value: '1.4%', sub: 'Adjusted, under reporting threshold' },
];

function IllustrativeBanner() {
  return (
    <div
      role="note"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 0.875rem',
        borderRadius: '8px',
        background: 'color-mix(in srgb, var(--color-amber, #e8a34a) 16%, transparent)',
        border: '1px solid color-mix(in srgb, var(--color-amber, #e8a34a) 40%, transparent)',
        fontSize: '12px',
        fontWeight: 600,
        color: 'var(--color-text-secondary)',
        marginBottom: '1.25rem',
      }}
    >
      <span aria-hidden="true">●</span>
      Illustrative data. Sample figures shown to demonstrate the surface, not real customer results.
    </div>
  );
}

function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <div
      style={{
        border: '1px solid var(--color-border-default)',
        borderRadius: '12px',
        background: 'var(--color-surface-primary)',
        padding: '1.1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.35rem',
      }}
    >
      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-tertiary)' }}>
        {kpi.label}
      </span>
      <span
        style={{
          fontSize: '26px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-display, inherit)',
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
            height: '4px',
            borderRadius: '999px',
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
              borderRadius: '999px',
              background: 'linear-gradient(90deg, var(--color-indigo, #3e4fb8), var(--color-plum, #5b3a7a))',
            }}
          />
        </span>
      )}
      <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{kpi.sub}</span>
    </div>
  );
}

function KpiGroup({ title, kpis }: { title: string; kpis: Kpi[] }) {
  return (
    <div>
      <p
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-text-tertiary)',
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
    <section
      aria-label="Executive governance dashboard preview"
      style={{
        border: '1px solid var(--color-border-default)',
        borderRadius: '16px',
        background: 'var(--color-surface-secondary)',
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
        <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          AI governance, at a glance
        </span>
        <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
          People space &middot; this quarter
        </span>
      </div>
      <IllustrativeBanner />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <KpiGroup title="AI governance" kpis={GOVERNANCE_KPIS} />
        <KpiGroup title="Workforce" kpis={WORKFORCE_KPIS} />
      </div>
    </section>
  );
}
