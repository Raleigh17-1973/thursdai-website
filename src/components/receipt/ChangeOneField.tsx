'use client';

import React, { useId, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { shortHash } from '@/lib/receipts/format';
import { track } from '@/lib/analytics';
import type { FixtureReceipt } from '@/lib/receipts/display';

// The tamper proof on /demo. The visitor edits one visible field of the signed sample, and the
// page POSTs the edited receipt to /api/verify together with the ORIGINAL signature and
// fingerprint. The server recomputes the hash and checks the Ed25519 signature against the
// key committed with the site, so a one-field change fails for real. Reset sends the
// untouched record and it verifies again.

interface VerifyObjectResponse {
  sha256: string;
  valid: boolean;
  reason: 'hash_mismatch' | 'signature_mismatch' | null;
}

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'done'; result: VerifyObjectResponse; changed: string[] }
  | { status: 'error'; rateLimited: boolean };

export interface ChangeOneFieldProps {
  receipt: FixtureReceipt;
  signature: string;
  sha256: string;
}

const OUTCOMES = ['advance_to_interview', 'reject', 'hold_for_review'];

const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.5 };
const MONO_LABEL: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '12px',
  lineHeight: 1.4,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--ink-3)',
};
const FIELD: React.CSSProperties = {
  ...MONO,
  color: 'var(--ink)',
  background: 'var(--paper)',
  border: '1px solid var(--ink)',
  borderRadius: '2px',
  padding: '0.5rem 0.625rem',
  width: '100%',
  minHeight: '44px',
};

export function ChangeOneField({ receipt, signature, sha256 }: ChangeOneFieldProps) {
  const ids = { outcome: useId(), recorded: useId() };
  const [outcome, setOutcome] = useState(receipt.decision.outcome);
  const [recordedAt, setRecordedAt] = useState(receipt.recorded_at);
  const [state, setState] = useState<State>({ status: 'idle' });
  const loading = state.status === 'loading';

  async function send(nextOutcome: string, nextRecordedAt: string) {
    const edited = {
      ...receipt,
      decision: { ...receipt.decision, outcome: nextOutcome },
      recorded_at: nextRecordedAt,
    };
    const changed = [
      nextOutcome !== receipt.decision.outcome ? 'decision.outcome' : null,
      nextRecordedAt !== receipt.recorded_at ? 'recorded_at' : null,
    ].filter((c): c is string => c !== null);
    setState({ status: 'loading' });
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receipt: edited, signature, sha256 }),
      });
      if (!res.ok) {
        setState({ status: 'error', rateLimited: res.status === 429 });
        return;
      }
      const result = (await res.json()) as VerifyObjectResponse;
      track({ name: 'demo_verify', props: { valid: result.valid } });
      setState({ status: 'done', result, changed });
    } catch {
      setState({ status: 'error', rateLimited: false });
    }
  }

  function reset() {
    setOutcome(receipt.decision.outcome);
    setRecordedAt(receipt.recorded_at);
    void send(receipt.decision.outcome, receipt.recorded_at);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(outcome, recordedAt);
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={ids.outcome} style={{ ...MONO_LABEL, display: 'block', textTransform: 'none' }}>
              decision.outcome
            </label>
            <select
              id={ids.outcome}
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              style={{ ...FIELD, marginTop: '0.375rem' }}
            >
              {OUTCOMES.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={ids.recorded} style={{ ...MONO_LABEL, display: 'block', textTransform: 'none' }}>
              recorded_at
            </label>
            <input
              id={ids.recorded}
              type="text"
              value={recordedAt}
              maxLength={40}
              spellCheck={false}
              autoComplete="off"
              onChange={(e) => setRecordedAt(e.target.value)}
              style={{ ...FIELD, marginTop: '0.375rem' }}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <Button type="submit" variant="secondary" disabled={loading}>
            {loading ? 'Verifying…' : 'Verify the changed copy'}
          </Button>
          <Button type="button" variant="ghost" onClick={reset} disabled={loading}>
            Reset
          </Button>
        </div>
      </form>

      <div aria-live="polite" aria-atomic="true">
        {state.status === 'done' || state.status === 'error' ? (
          <div className="mt-5" style={{ borderTop: '1px solid var(--ink)', paddingTop: '14px' }}>
            <p className="m-0" style={MONO_LABEL}>
              Response <span style={{ textTransform: 'none' }}>· POST /api/verify</span>
            </p>
            {state.status === 'error' ? (
              <p className="m-0 mt-3" style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--ink)' }}>
                {state.rateLimited
                  ? 'Too many checks from this address in the last minute. Try again shortly.'
                  : 'Could not reach the verifier. Try again shortly.'}
              </p>
            ) : (
              <Result result={state.result} changed={state.changed} originalSha256={sha256} />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Result({
  result,
  changed,
  originalSha256,
}: {
  result: VerifyObjectResponse;
  changed: string[];
  originalSha256: string;
}) {
  const rows: [string, string][] = [
    ['signed', shortHash(originalSha256)],
    ['this copy', shortHash(result.sha256)],
    ['valid', String(result.valid)],
    ['reason', result.reason ?? '(none)'],
  ];
  const what = changed.length ? changed.join(' and ') : 'nothing';

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
          ? 'The record matches its signed fingerprint and the signature checks out.'
          : `You changed ${what}. The verifier recomputed the fingerprint from the copy you sent, and it no longer matches the one that was signed, so the original signature cannot vouch for it.`}
      </p>
      <dl className="grid grid-cols-1 gap-[2px] m-0 mt-4">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[88px_1fr] gap-3 px-3 py-2" style={{ background: 'var(--sunk)' }}>
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
