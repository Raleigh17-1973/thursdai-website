'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { LeadFallback } from '@/components/ui/LeadFallback';

export function CaseStudyApplyForm() {
  const [fields, setFields] = useState({
    companyName: '',
    role: '',
    email: '',
    outcome: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'fallback'>('idle');

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
          type: 'design-partner',
          companyName: fields.companyName,
          role: fields.role,
          email: fields.email,
          outcome: fields.outcome,
        }),
      });
      setStatus(res.ok ? 'success' : 'fallback');
    } catch {
      setStatus('fallback');
    }
  }

  if (status === 'fallback') {
    return (
      <LeadFallback
        subject={`Design partner application: ${fields.companyName}`}
        lines={[`Company: ${fields.companyName}`, `Role: ${fields.role}`, `Email: ${fields.email}`, `First decision to record: ${fields.outcome}`]}
      />
    );
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
    borderRadius: '2px',
    color: 'var(--color-text-primary)',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '560px' }}
    >
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
        placeholder="Your role (e.g. Head of Model Risk)"
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
          aria-label="Which AI decision would you put on the record first?"
          placeholder="Which AI decision would you put on the record first? (max 200 characters)"
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
        {status === 'submitting' ? 'Submitting…' : 'Apply to the program'}
      </Button>
    </form>
  );
}
