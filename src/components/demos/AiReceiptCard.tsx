import React from 'react';

// Static hero visual: a single AI Receipt, the signed record of one AI decision.
// Reads as a receipt/record, not a chat. Sample content, clearly labelled illustrative.

const FIELDS: { label: string; value: string }[] = [
  { label: 'Roles', value: 'Legal, Finance, Engineering' },
  { label: 'Policies', value: 'vendor-ai-policy v2.1, pii-block' },
  { label: 'Sources', value: '3 cited, 97% avg confidence' },
  { label: 'Knowledge', value: 'corpus snapshot 2025-01-20' },
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

      {/* Decision */}
      <div style={{ padding: '1.25rem 1.25rem 0.75rem' }}>
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
          Approve GPT-4o for tier-1 client support, contingent on a completed FRIA and verified data
          isolation.
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
