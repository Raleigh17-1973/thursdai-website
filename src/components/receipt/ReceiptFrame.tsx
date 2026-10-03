import React from 'react';
import { RECEIPT_TERM } from '@/config/site';
import { shortHash } from '@/lib/receipts/format';

// ReceiptFrame: the signature visual of The Record (docs/design/the-record.md).
// A printed card: paper, 1px ink border, radius 0, a solid 4px offset rule as its only
// shadow. Mono header (term + id), the decision in Newsreader, mono fields in sunk
// wells, then the signature: a 3px amber rule, the "SIGNED" seal and the sha256
// fingerprint. Amber is decorative here and never carries text.
//
// The decision always comes from a named external source (a customer agent or vendor
// tool); Thursdai adds the policy check, the record and the signature.
//
// Motion (src/lib/motion.ts, behaviour 1): with `signing` the root carries
// data-receipt-state="signing" and globals.css plays the signature once on load: the
// fingerprint (data-receipt-part="hash") types in, the amber rule ("signature-rule") draws and
// the seal ("seal") fades in. The markup is the final, signed state either way, so no-JS
// readers, crawlers and reduced motion all get the signed receipt at first paint. It depicts
// the sample's existing signature; nothing is signed or verified in the browser.

export interface ReceiptField {
  label: string;
  value: string;
  /** Receipt-only status ink: pass (green) or flag (red). Text stays AA on the well. */
  tone?: 'pass' | 'flag';
}

export interface ReceiptSource {
  /** The external system that made the decision, e.g. "Vendor applicant-screening agent". */
  system: string;
  /** Model and host, e.g. "GPT-4o / Azure". */
  model?: string;
}

export interface ReceiptFrameProps {
  id: string;
  decision: string;
  source: ReceiptSource;
  fields: ReceiptField[];
  /** Full or truncated sha256 hex. Shown as a fingerprint (first 6 … last 4). */
  hash: string;
  /** Human-readable timestamp, e.g. "2026-01-20 14:32 UTC". */
  recordedAt: string;
  /** Provenance label for sample data, e.g. SAMPLE_LABEL. Omit for real receipts. */
  label?: string;
  /** Header term. Defaults to RECEIPT_TERM. */
  term?: string;
  /** Play the signature once on load (hero receipts only). The markup is unchanged. */
  signing?: boolean;
  /** Field grid columns at ≥ 480px. Default 2. */
  columns?: 1 | 2;
  className?: string;
  style?: React.CSSProperties;
}

const MONO_LABEL: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '12px',
  lineHeight: 1.4,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

const TONE_COLOR: Record<NonNullable<ReceiptField['tone']>, string> = {
  pass: 'var(--status-pass)',
  flag: 'var(--status-flag)',
};

/** sha256 shown as a fingerprint: first 6 … last 4 hex characters. */
export const fingerprint = shortHash;

export function ReceiptFrame({
  id,
  decision,
  source,
  fields,
  hash,
  recordedAt,
  label,
  term = RECEIPT_TERM,
  signing = false,
  columns = 2,
  className = '',
  style,
}: ReceiptFrameProps) {
  const fp = fingerprint(hash);
  return (
    <figure
      className={['rec-receipt m-0', className].filter(Boolean).join(' ')}
      aria-label={label ? `Sample ${term}` : term}
      data-receipt-state={signing ? 'signing' : 'signed'}
      style={{
        background: 'var(--paper)',
        color: 'var(--ink)',
        border: '1px solid var(--ink)',
        borderRadius: 0,
        boxShadow: '4px 4px 0 0 var(--ink)',
        // Leave room for the 4px offset rule so it never pokes past the column.
        width: 'calc(100% - 4px)',
        maxWidth: '520px',
        ...style,
      }}
    >
      {/* Header: term left, receipt id right */}
      <div
        className="flex items-baseline justify-between gap-4 px-5 py-3"
        style={{ borderBottom: '1px solid var(--ink)' }}
      >
        <span style={{ ...MONO_LABEL, color: 'var(--ink)' }}>{term}</span>
        <span style={{ ...MONO_LABEL, textTransform: 'none', color: 'var(--ink-2)', overflowWrap: 'anywhere' }}>
          {id}
        </span>
      </div>

      <div className="px-5 pt-5 pb-5">
        {/* Source: who decided */}
        <p className="m-0" style={{ ...MONO_LABEL, color: 'var(--ink-2)' }}>
          Decision by
        </p>
        <p className="m-0 mt-1" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.45, color: 'var(--ink)' }}>
          {source.system}
          {source.model ? <span style={{ color: 'var(--ink-2)' }}> · {source.model}</span> : null}
        </p>

        {/* Decision line */}
        <p
          className="m-0 mt-3"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, calc(18.67px + 0.37vw), 24px)',
            lineHeight: 1.3,
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: 'var(--ink)',
            textWrap: 'pretty',
          }}
        >
          {decision}
        </p>

        {/* Fields in sunk wells */}
        <dl
          className={[
            'grid grid-cols-1 gap-[2px] m-0 mt-5',
            columns === 2 ? 'min-[480px]:grid-cols-2' : '',
          ].join(' ')}
        >
          {fields.map((f) => (
            <div key={f.label} className="px-3 py-2.5" style={{ background: 'var(--sunk)' }}>
              <dt style={{ ...MONO_LABEL, color: 'var(--ink-3)' }}>{f.label}</dt>
              <dd
                className="m-0 mt-1"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  lineHeight: 1.45,
                  color: f.tone ? TONE_COLOR[f.tone] : 'var(--ink)',
                  overflowWrap: 'anywhere',
                }}
              >
                {f.value}
              </dd>
            </div>
          ))}
          <div className="px-3 py-2.5" style={{ background: 'var(--sunk)' }}>
            <dt style={{ ...MONO_LABEL, color: 'var(--ink-3)' }}>Recorded</dt>
            <dd
              className="m-0 mt-1"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.45, color: 'var(--ink)' }}
            >
              {recordedAt}
            </dd>
          </div>
        </dl>
      </div>

      {/* Signature: amber rule, seal, fingerprint */}
      <div className="px-5 pb-4">
        <div data-receipt-part="signature-rule" aria-hidden="true" style={{ height: '3px', background: 'var(--amber)' }} />
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pt-3">
          <span
            data-receipt-part="seal"
            style={{ ...MONO_LABEL, color: 'var(--ink)', letterSpacing: '0.12em' }}
          >
            Signed
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-2)' }}>
            sha256{' '}
            <span
              data-receipt-part="hash"
              style={signing ? ({ '--sign-steps': fp.length } as React.CSSProperties) : undefined}
            >
              {fp}
            </span>
          </span>
        </div>
        {label ? (
          <p className="m-0 mt-3" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.4, color: 'var(--ink-3)' }}>
            {label}
          </p>
        ) : null}
      </div>
    </figure>
  );
}
