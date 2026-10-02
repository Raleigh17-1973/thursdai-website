import React from 'react';
import { RECEIPT_TERM, SAMPLE_LABEL_SIGNED } from '@/config/site';
import { SAMPLE_DISPLAY as S, SAMPLE_RECEIPT as R } from '@/lib/receipts/display';

// A one-page rendering of the sample audit pack (public/artifacts/northwind-sample-audit-pack.pdf),
// set as a printed sheet: hairline-ruled rows, mono labels, the receipt's full hash and the
// signature line. Every value comes from the signed fixture, so it matches the PDF and the
// verifier exactly.

const MONO_LABEL: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '12px',
  lineHeight: 1.4,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--ink-3)',
};
const MONO_VALUE: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '13px',
  lineHeight: 1.5,
  color: 'var(--ink)',
  overflowWrap: 'anywhere',
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="grid grid-cols-1 min-[480px]:grid-cols-[132px_1fr] gap-x-4 gap-y-1 py-2.5"
      style={{ borderTop: '1px solid var(--rule)' }}
    >
      <dt style={MONO_LABEL}>{label}</dt>
      <dd className="m-0" style={MONO_VALUE}>
        {children}
      </dd>
    </div>
  );
}

const CONTENTS = ['Cover', RECEIPT_TERM, 'Policy evaluation and evidence', 'Signature and verification'];

interface AuditPackSummaryProps {
  /**
   * Compact drops the rows a neighbouring receipt or replay already shows (evidence and
   * oversight), so the sheet can sit beside the replay on the home page at a matching height.
   */
  compact?: boolean;
}

export function AuditPackSummary({ compact = false }: AuditPackSummaryProps = {}) {
  const frameworks = [R.risk.framework, ...R.policies_evaluated.filter((p) => /ll144/.test(p.id)).map(() => 'NYC Local Law 144')];

  return (
    <figure
      className="m-0"
      aria-label="Sample audit pack, page summary"
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--ink)',
        borderRadius: 0,
        color: 'var(--ink)',
      }}
    >
      <div
        className="flex items-baseline justify-between gap-4 px-5 py-3"
        style={{ borderBottom: '1px solid var(--ink)' }}
      >
        <span style={{ ...MONO_LABEL, color: 'var(--ink)' }}>Audit pack</span>
        <span style={{ ...MONO_LABEL, textTransform: 'none', color: 'var(--ink-2)' }}>4 pages · PDF</span>
      </div>

      <div className="px-5 pt-5 pb-2">
        <p
          className="m-0"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, calc(18.67px + 0.37vw), 24px)',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}
        >
          Northwind Financial (fictional): one hiring screening decision.
        </p>

        <dl className="m-0 mt-4">
          <Row label="Scope">One decision made by an external AI system</Row>
          <Row label="Period">2026-09-01 to 2026-09-30</Row>
          <Row label="Frameworks">{frameworks.join(', ')}</Row>
          <Row label="Receipts">
            1 · {S.id}
          </Row>
          <Row label="Policies">
            {R.policies_evaluated.map((p) => (
              <span key={p.id} style={{ display: 'block', color: p.result === 'pass' ? 'var(--status-pass)' : 'var(--status-flag)' }}>
                {p.id}: {p.result === 'pass' ? 'passed' : p.result}
              </span>
            ))}
          </Row>
          {compact ? null : (
            <>
              <Row label="Evidence">{S.evidence}</Row>
              <Row label="Oversight">{S.oversight}</Row>
            </>
          )}
          <Row label="Receipt sha256">{S.sha256}</Row>
          <Row label="Contents">
            {CONTENTS.map((c, i) => (
              <span key={c} style={{ display: 'block' }}>
                {i + 1}. {c}
              </span>
            ))}
          </Row>
        </dl>
      </div>

      {/* Signature: the pack is a signed document, so it carries the same seal as the receipt */}
      <div className="px-5 pb-4">
        <div aria-hidden="true" style={{ height: '3px', background: 'var(--amber)' }} />
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pt-3">
          <span style={{ ...MONO_LABEL, color: 'var(--ink)', letterSpacing: '0.12em' }}>Signed</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-2)' }}>
            Ed25519 · {S.keyId}
          </span>
        </div>
        <p className="m-0 mt-3" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.4, color: 'var(--ink-3)' }}>
          {SAMPLE_LABEL_SIGNED}
        </p>
      </div>
    </figure>
  );
}
