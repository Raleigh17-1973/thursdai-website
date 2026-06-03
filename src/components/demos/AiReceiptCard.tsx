import React from 'react';

// Static hero visual: a single AI Receipt for a decision made by an EXTERNAL AI
// system, captured and governed by Thursdai into a signed record. Fields drawn
// from the AIDR 1.1.0 schema — agent, evidence, compliance, provenance, record.
// Sample content, clearly labelled illustrative.

const LABEL: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--color-text-tertiary)',
  margin: '0 0 0.25rem 0',
};

const SECTION_HEADER: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--color-text-tertiary)',
  padding: '0.4rem 1.25rem',
  background: 'var(--color-surface-secondary)',
  borderTop: '1px solid var(--color-border-default)',
  borderBottom: '1px solid var(--color-border-default)',
};

function Field({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: '1rem',
      padding: '0.45rem 0',
      borderTop: '1px solid var(--color-border-default)',
    }}>
      <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', flexShrink: 0 }}>{label}</span>
      <span style={{
        fontSize: '11px',
        color: accent ? 'var(--color-accent)' : 'var(--color-text-secondary)',
        fontFamily: 'var(--font-mono, monospace)',
        textAlign: 'right',
      }}>
        {value}
      </span>
    </div>
  );
}

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
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.875rem 1.25rem',
        background: 'linear-gradient(135deg, #1e2a5a 0%, #5b3a7a 60%, #e8a34a 100%)',
        color: '#fff',
      }}>
        <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          AI Receipt
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '12px', fontWeight: 600 }}>
          <span aria-hidden="true">✓</span> Signed
        </span>
      </div>

      {/* Decision */}
      <div style={{ padding: '1rem 1.25rem 0.75rem' }}>
        <span style={{
          display: 'inline-block',
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--color-accent)',
          background: 'var(--color-accent-subtle, rgba(62,79,184,0.1))',
          border: '1px solid var(--color-border-default)',
          borderRadius: '999px',
          padding: '0.15rem 0.6rem',
          marginBottom: '0.6rem',
        }}>
          Decision by an external AI system
        </span>
        <p style={LABEL}>Decision</p>
        <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--color-text-primary)', margin: '0 0 0.5rem 0', fontWeight: 500 }}>
          Advanced applicant 4821 to the interview stage for the senior analyst role.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <div>
            <p style={LABEL}>Subject</p>
            <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono,monospace)', color: 'var(--color-text-secondary)', margin: 0 }}>
              Applicant 4821 (pseudonymized)
            </p>
          </div>
          <div>
            <p style={LABEL}>Outcome</p>
            <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono,monospace)', color: 'var(--color-accent)', margin: 0, fontWeight: 600 }}>
              ADVANCED
            </p>
          </div>
        </div>
      </div>

      {/* Agent */}
      <div style={SECTION_HEADER}>Agent</div>
      <div style={{ padding: '0 1.25rem 0.25rem' }}>
        <Field label="Role" value="RECOMMENDER" />
        <Field label="System" value="Greenhouse screening agent" />
        <Field label="Model" value="GPT-4o / Azure OpenAI" />
        <Field label="Model version" value="2025-04-01" />
        <Field label="Confidence" value="87%" accent />
      </div>

      {/* Evidence consulted */}
      <div style={SECTION_HEADER}>Evidence consulted</div>
      <div style={{ padding: '0 1.25rem 0.25rem' }}>
        <Field label="Job posting" value="Job req JR-204" />
        <Field label="Evaluation rubric" value="Hiring rubric v3" />
        <Field label="Knowledge corpus" value="Resume corpus v2026-05-01" />
      </div>

      {/* Compliance */}
      <div style={SECTION_HEADER}>Compliance</div>
      <div style={{ padding: '0 1.25rem 0.25rem' }}>
        <Field label="Policy checks" value="ll144-bias-audit, pii-block (passed)" accent />
        <Field label="Risk tier" value="High Risk — EU AI Act Annex III" />
        <Field label="Oversight" value="AI recommendation followed" />
        <Field label="Legal basis" value="EU AI Act Art. 27 Conformity" />
      </div>

      {/* Record */}
      <div style={SECTION_HEADER}>Record</div>
      <div style={{ padding: '0 1.25rem 0.25rem' }}>
        <Field label="Recorded" value="Jan 20, 2025 14:32 UTC" />
        <Field label="Signature" value="sha256 a1b2c4 (verified)" accent />
      </div>

      {/* Footer */}
      <div style={{
        padding: '0.625rem 1.25rem',
        background: 'var(--color-surface-secondary)',
        borderTop: '1px solid var(--color-border-default)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '0.25rem',
      }}>
        <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Illustrative data</span>
        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
          Recorded and signed
        </span>
      </div>
    </div>
  );
}
