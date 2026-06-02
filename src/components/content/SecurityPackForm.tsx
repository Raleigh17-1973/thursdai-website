'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function SecurityPackForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/security-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '15px' }}>
        Check your inbox: the security pack is on its way.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
    >
      {status === 'error' && (
        <p style={{ color: 'rgb(239,68,68)', fontSize: '14px' }}>
          Something went wrong. Please try again or email{' '}
          <a href="mailto:security@thursdai.com" style={{ color: 'var(--color-accent)' }}>
            security@thursdai.com
          </a>
        </p>
      )}
      <div style={{ display: 'flex', gap: '0.75rem', width: '100%', maxWidth: '420px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <input
          type="email"
          required
          aria-label="Email address"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            flex: '1 1 200px',
            padding: '10px 14px',
            background: 'var(--color-surface-primary)',
            border: '1px solid var(--color-border-default)',
            borderRadius: '8px',
            color: 'var(--color-text-primary)',
            fontSize: '15px',
            outline: 'none',
          }}
        />
        <Button type="submit" variant="primary" size="md" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send me the security pack'}
        </Button>
      </div>
    </form>
  );
}
