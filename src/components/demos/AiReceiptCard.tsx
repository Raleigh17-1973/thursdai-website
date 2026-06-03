import React from 'react';

// Static hero visual: a single AI Receipt for a decision made by an EXTERNAL AI
// system, captured and governed by Thursdai into a signed record. Fields drawn
// from the AIDR 1.1.0 schema — agent, evidence, compliance, provenance, record.
// Body uses a 2-column layout so the card is wide rather than tall.
// Sample content, clearly labelled illustrative.

const SECTION_LABEL: React.CSSProperties = {
  fontSize: '9px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--color-text-tertiary)',
  padding: '0.35rem 0.875rem',
  background: 'var(--color-surface-secondary)',
  borderTop: '1px solid var(--color-border-default)',
  borderBottom: '1px solid var(--color-border-default)',
  display: 'block',
};

function Field({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: '0.5rem',
      padding: '0.35rem 0',
      borderTop: '1px solid var(--color-border-default)',
    }}>
      <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', flexShrink: 0 }}>{label}</span>
      <span style={{
        fontSize: '10px',
        color: accent ? 'var(--color-accent)' : 'var(--color-text-secondary)',
        fontFamily: 'var(--font-mono, monospace)',
        textAlign: 'right',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: '120px',
      }}>
        {value}
      </span>
    </div>
  );
}

function Col({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  );
}

function ColBody({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '0 0.875rem 0.25rem', flex: 1 }}>
      {children}
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
        maxWidth: '480px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1.25rem',
        background: 'linear-gradient(135deg, #1e2a5a 0%, #5b3a7a 60%, #e8a34a 100%)',
        color: '#fff',
      }}>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          AI Receipt
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '11px', fontWeight: 600 }}>
          <span aria-hidden="true">✓</span> Signed
        </span>
      </div>

      {/* Decision */}
      <div style={{ padding: '0.875rem 1.25rem 0.625rem' }}>
        <span style={{
          display: 'inline-block',
          fontSize: '10px',
          fontWeight: 600,
          color: 'var(--color-accent)',
          background: 'var(--color-accent-subtle, rgba(62,79,184,0.1))',
          border: '1px solid var(--color-border-default)',
          borderRadius: '999px',
          padding: '0.1rem 0.5rem',
          marginBottom: '0.5rem',
        }}>
          Decision by an external AI system
        </span>
        <p style={{
          fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--color-text-tertiary)', margin: '0 0 0.3rem',
        }}>
          Decision
        </p>
        <p style={{ fontSize: '13px', lineHeight: 1.45, color: 'var(--color-text-primary)', margin: '0 0 0.5rem', fontWeight: 500 }}>
          Advanced applicant 4821 to the interview stage for the senior analyst role.
        </p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div>
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', margin: '0 0 0.15rem' }}>Subject</p>
            <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono,monospace)', color: 'var(--color-text-secondary)', margin: 0 }}>Applicant 4821 (pseudonymized)</p>
          </div>
          <div>
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', margin: '0 0 0.15rem' }}>Outcome</p>
            <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono,monospace)', color: 'var(--color-accent)', margin: 0, fontWeight: 700 }}>ADVANCED</p>
          </div>
        </div>
      </div>

      {/* 2-column body */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderTop: '1px solid var(--color-border-default)',
      }}>
        {/* Left column: Agent + Record */}
        <Col>
          <span style={{ ...SECTION_LABEL, borderRight: '1px solid var(--color-border-default)' }}>Agent</span>
          <ColBody>
            <Field label="Role" value="RECOMMENDER" />
            <Field label="System" value="Greenhouse agent" />
            <Field label="Model" value="GPT-4o / Azure" />
            <Field label="Version" value="2025-04-01" />
            <Field label="Confidence" value="87%" accent />
          </ColBody>
          <span style={{ ...SECTION_LABEL, borderRight: '1px solid var(--color-border-default)' }}>Record</span>
          <ColBody>
            <Field label="Recorded" value="Jan 20 14:32 UTC" />
            <Field label="Signature" value="sha256 a1b2c4" accent />
          </ColBody>
        </Col>

        {/* Right column: Evidence + Compliance */}
        <Col>
          <span style={SECTION_LABEL}>Evidence consulted</span>
          <ColBody>
            <Field label="Job posting" value="JR-204" />
            <Field label="Rubric" value="Hiring rubric v3" />
            <Field label="Corpus" value="Resume v2026-05-01" />
          </ColBody>
          <span style={SECTION_LABEL}>Compliance</span>
          <ColBody>
            <Field label="Policies" value="ll144, pii-block ✓" accent />
            <Field label="Risk tier" value="High / Annex III" />
            <Field label="Oversight" value="Rec. followed" />
            <Field label="Legal basis" value="EU AI Art. 27" />
          </ColBody>
        </Col>
      </div>

      {/* Footer */}
      <div style={{
        padding: '0.5rem 1.25rem',
        background: 'var(--color-surface-secondary)',
        borderTop: '1px solid var(--color-border-default)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>Illustrative data</span>
        <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
          Recorded and signed
        </span>
      </div>
    </div>
  );
}
