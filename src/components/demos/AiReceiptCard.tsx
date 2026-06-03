import React from 'react';

// Static hero visual: a single AI Receipt for a decision made by an EXTERNAL AI
// system, captured and governed by Thursdai into a signed record. Most receipts
// come from systems that are not Thursdai, so the visual leads with the source.
// Sample content, clearly labelled illustrative.

const FIELDS: { label: string; value: string }[] = [
  { label: 'Source', value: 'Greenhouse screening agent' },
  { label: 'Model', value: 'GPT-4o, Azure OpenAI' },
  { label: 'Policy check', value: 'll144-bias-audit, pii-block (passed)' },
  { label: 'Citations', value: 'Job req JR-204, rubric v3' },
  { label: 'Recorded', value: 'Jan 20, 2025 14:32 UTC' },
  { label: 'Signature', value: 'sha256 a1b2c4 (verified)' },
];

export function AiReceiptCard() {
  return (
    <div
      aria-label="Example AI Receipt"
      style={{
        border: '1px solid var(--color-border-default)',
        borderRadius: '16px',
        background: 'var(--color-surface-primary)',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        maxWidth: '460px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.875rem 1.25rem',
          background: 'linear-gradient(135deg, #1e2a5a 0%, #5b3a7a 60%, #e8a34a 100%)',
          color: '#fff',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          AI Receipt
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '12px', fontWeight: 600 }}>
          <span aria-hidden="true">✓</span> Signed
        </span>
      </div>

      {/* Origin tag + decision */}
      <div style={{ padding: '1.1rem 1.25rem 0.75rem' }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--color-accent)',
            background: 'var(--color-accent-subtle, rgba(62,79,184,0.1))',
            border: '1px solid var(--color-border-default)',
            borderRadius: '999px',
            padding: '0.15rem 0.6rem',
            marginBottom: '0.6rem',
          }}
        >
          Decision by an external AI system
        </span>
        <p
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-text-tertiary)',
            margin: '0 0 0.4rem 0',
          }}
        >
          Decision
        </p>
        <p style={{ fontSize: '15px', lineHeight: 1.5, color: 'var(--color-text-primary)', margin: 0, fontWeight: 500 }}>
          Advanced applicant 4821 to the interview stage for the senior analyst role.
        </p>
      </div>

      {/* Fields */}
      <div style={{ padding: '0.5rem 1.25rem 1rem' }}>
        {FIELDS.map((f) => (
          <div
            key={f.label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              padding: '0.5rem 0',
              borderTop: '1px solid var(--color-border-default)',
            }}
          >
            <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', flexShrink: 0 }}>{f.label}</span>
            <span
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-mono, monospace)',
                textAlign: 'right',
              }}
            >
              {f.value}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '0.625rem 1.25rem',
          background: 'var(--color-surface-secondary)',
          borderTop: '1px solid var(--color-border-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Illustrative data</span>
        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-accent)' }}>
          Replay this receipt →
        </span>
      </div>
    </div>
  );
}
