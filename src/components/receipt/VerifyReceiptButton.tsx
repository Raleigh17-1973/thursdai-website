'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { DEMO_KEY_NOTE } from '@/config/site';

// Runs the real verifier (/api/verify, backed by the signed fixture) in the page and shows
// its response field by field: id, sha256, signed_at and valid. The optional tampered-id
// action sends an id one character away from the real one, so a reader can watch the
// same check fail. Results land in a polite live region for screen readers.

interface VerifyResponse {
  id: string;
  sha256: string;
  signed_at: string;
  valid: boolean;
}

type State =
  | { status: 'idle' }
  | { status: 'loading'; requested: string }
  | { status: 'done'; requested: string; result: VerifyResponse }
  | { status: 'error'; requested: string; rateLimited: boolean };

export interface VerifyReceiptButtonProps {
  receiptId: string;
  /** When set, shows a secondary "Try a tampered id" action that verifies this id instead. */
  tamperedId?: string;
  /** Primary button text. */
  label?: string;
  size?: 'md' | 'lg';
  /** Extra actions rendered in the same row, after the verify buttons (e.g. a docs link). */
  children?: React.ReactNode;
  className?: string;
}

const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.5 };
const MONO_LABEL: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '12px',
  lineHeight: 1.4,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--ink-3)',
};

export function VerifyReceiptButton({
  receiptId,
  tamperedId,
  label = 'Verify this receipt',
  size = 'md',
  children,
  className = '',
}: VerifyReceiptButtonProps) {
  const [state, setState] = useState<State>({ status: 'idle' });
  const loading = state.status === 'loading';

  async function run(id: string) {
    setState({ status: 'loading', requested: id });
    try {
      const res = await fetch(`/api/verify?id=${encodeURIComponent(id)}`);
      if (!res.ok) {
        setState({ status: 'error', requested: id, rateLimited: res.status === 429 });
        return;
      }
      setState({ status: 'done', requested: id, result: (await res.json()) as VerifyResponse });
    } catch {
      setState({ status: 'error', requested: id, rateLimited: false });
    }
  }

  const requested = state.status === 'idle' ? null : state.requested;
  const isTamperedRun = tamperedId !== undefined && requested === tamperedId;

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-3">
        <Button size={size} onClick={() => run(receiptId)} disabled={loading}>
          {loading && !isTamperedRun ? 'Verifying…' : label}
        </Button>
        {tamperedId ? (
          <Button size={size} variant="secondary" onClick={() => run(tamperedId)} disabled={loading}>
            {loading && isTamperedRun ? 'Verifying…' : 'Try a tampered id'}
          </Button>
        ) : null}
        {children}
      </div>

      <div aria-live="polite" aria-atomic="true">
        {state.status === 'done' || state.status === 'error' ? (
          <div
            className="mt-5"
            style={{ borderTop: '1px solid var(--ink)', paddingTop: '14px' }}
          >
            <p className="m-0" style={{ ...MONO_LABEL, overflowWrap: 'anywhere' }}>
              Response <span style={{ textTransform: 'none' }}>· GET /api/verify?id={state.requested}</span>
            </p>

            {state.status === 'error' ? (
              <p className="m-0 mt-3" style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--ink)' }}>
                {state.rateLimited
                  ? 'Too many checks from this address in the last minute. Try again shortly.'
                  : 'Could not reach the verifier. Try again shortly.'}
              </p>
            ) : (
              <VerifyResult result={state.result} tampered={isTamperedRun} />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function VerifyResult({ result, tampered }: { result: VerifyResponse; tampered: boolean }) {
  const rows: [string, string][] = [
    ['id', result.id],
    ['sha256', result.sha256 || '(none)'],
    ['signed_at', result.signed_at || '(none)'],
    ['valid', String(result.valid)],
  ];

  return (
    <>
      <p
        className="m-0 mt-3"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '22px',
          lineHeight: 1.3,
          color: result.valid ? 'var(--status-pass)' : 'var(--status-flag)',
        }}
      >
        <span aria-hidden="true">{result.valid ? '✓ ' : '✕ '}</span>
        {result.valid ? 'Valid' : 'Not valid'}
      </p>
      <p className="m-0 mt-1" style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--ink-2)' }}>
        {result.valid
          ? "The hash was recomputed from the stored record and the Ed25519 signature checked against the sample's public key. Nothing has changed since it was signed."
          : tampered
            ? 'This id is one character away from the real receipt. No signed record matches it, so the verifier returns nothing but valid: false.'
            : 'No signed record matches this id.'}
      </p>
      {result.valid ? (
        <p className="m-0 mt-2" style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--ink-3)' }}>
          {DEMO_KEY_NOTE}
        </p>
      ) : null}
      <dl className="grid grid-cols-1 gap-[2px] m-0 mt-4">
        {rows.map(([k, v]) => (
          <div
            key={k}
            className="grid grid-cols-[88px_1fr] gap-3 px-3 py-2"
            style={{ background: 'var(--sunk)' }}
          >
            <dt style={{ ...MONO_LABEL, textTransform: 'none', lineHeight: 1.5 }}>{k}</dt>
            <dd className="m-0" style={{ ...MONO, color: 'var(--ink)', overflowWrap: 'anywhere' }}>
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
