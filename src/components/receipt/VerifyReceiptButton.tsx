'use client';

import { useState } from 'react';

interface Result {
  id: string;
  sha256: string;
  signed_at: string;
  valid: boolean;
}

type State = { status: 'idle' } | { status: 'loading' } | { status: 'done'; result: Result } | { status: 'error' };

export function VerifyReceiptButton({ receiptId }: { receiptId: string }) {
  const [state, setState] = useState<State>({ status: 'idle' });

  async function run() {
    setState({ status: 'loading' });
    try {
      const res = await fetch(`/api/verify?id=${encodeURIComponent(receiptId)}`);
      if (!res.ok) throw new Error('bad status');
      setState({ status: 'done', result: (await res.json()) as Result });
    } catch {
      setState({ status: 'error' });
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={run}
        disabled={state.status === 'loading'}
        style={{
          padding: '0.5rem 1rem',
          border: '1px solid var(--color-accent)',
          borderRadius: '6px',
          background: 'transparent',
          color: 'var(--color-text-primary)',
          cursor: 'pointer',
        }}
      >
        {state.status === 'loading' ? 'Verifying' : 'Verify this receipt'}
      </button>
      <div aria-live="polite" style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
        {state.status === 'error' && <p>Could not reach the verifier. Try again shortly.</p>}
        {state.status === 'done' && (
          <dl style={{ margin: 0 }}>
            <dt style={{ fontWeight: 600 }}>{state.result.valid ? 'Valid' : 'Not valid'}</dt>
            <dd style={{ margin: 0 }}>
              {state.result.valid ? (
                <>
                  <span>Receipt {state.result.id}</span>
                  <br />
                  <span style={{ fontFamily: 'var(--font-mono, monospace)' }}>
                    sha256 {state.result.sha256.slice(0, 12)}...{state.result.sha256.slice(-6)}
                  </span>
                  <br />
                  <span>Signed {state.result.signed_at}</span>
                </>
              ) : (
                <span>The hash or signature does not match the record.</span>
              )}
            </dd>
          </dl>
        )}
      </div>
    </div>
  );
}
