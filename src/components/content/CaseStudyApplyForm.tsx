'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function CaseStudyApplyForm() {
  const [fields, setFields] = useState({
    companyName: '',
    role: '',
    email: '',
    outcome: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  function update(key: keyof typeof fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'case-study-application',
          companyName: fields.companyName,
          role: fields.role,
          email: fields.email,
          outcome: fields.outcome,
        }),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '16px' }}>
        Application received. We&apos;ll be in touch within 5 business days.
      </p>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    background: 'var(--color-surface-primary)',
    border: '1px solid var(--color-border-default)',
    borderRadius: '8px',
    color: 'var(--color-text-primary)',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '480px', margin: '0 auto' }}
    >
      {status === 'error' && (
        <p style={{ color: 'rgb(239,68,68)', fontSize: '14px' }}>
          Something went wrong. Please try again.
        </p>
      )}
      <input
        type="text"
        required
        aria-label="Company name"
        placeholder="Company name"
        value={fields.companyName}
        onChange={(e) => update('companyName', e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        required
        aria-label="Your role"
        placeholder="Your role (e.g. Head of Legal Technology)"
        value={fields.role}
        onChange={(e) => update('role', e.target.value)}
        style={inputStyle}
      />
      <input
        type="email"
        required
        aria-label="Email address"
        placeholder="you@company.com"
        value={fields.email}
        onChange={(e) => update('email', e.target.value)}
        style={inputStyle}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <textarea
          required
          aria-label="What outcome would you highlight?"
          placeholder="What outcome would you highlight? (max 200 characters)"
          maxLength={200}
          rows={3}
          value={fields.outcome}
          onChange={(e) => update('outcome', e.target.value)}
          style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
        />
        <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', textAlign: 'right' }}>
          {fields.outcome.length}/200
        </p>
      </div>
      <Button type="submit" variant="primary" size="md" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting…' : 'Apply to be featured'}
      </Button>
    </form>
  );
}
