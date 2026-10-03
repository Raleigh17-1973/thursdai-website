'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CONTACT_EMAIL } from '@/config/site';

// There is no lead destination behind this form, so it does not pretend to send anything. It
// fills in an email to CONTACT_EMAIL from the fields and hands it to the visitor's mail app.
// Nothing leaves the browser until they press send there.

const EMPTY = { companyName: '', role: '', email: '', outcome: '' };

export function CaseStudyApplyForm() {
  const [fields, setFields] = useState(EMPTY);
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);

  function update(key: keyof typeof fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Design partner application: ${fields.companyName}`,
    )}&body=${encodeURIComponent(
      [
        `Company: ${fields.companyName}`,
        `Role: ${fields.role}`,
        `Email: ${fields.email}`,
        `The AI decision I would put on the record first: ${fields.outcome}`,
      ].join('\n'),
    )}`;
    setMailtoHref(href);
    window.location.href = href;
  }

  if (mailtoHref) {
    return (
      <div style={{ maxWidth: '560px' }}>
        <p style={{ color: 'var(--color-text-primary)', fontWeight: 600, fontSize: '16px', margin: 0 }}>
          Your email app should now have a draft addressed to {CONTACT_EMAIL}.
        </p>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.6, marginTop: '0.75rem' }}>
          Nothing has been sent. The application reaches us when you send that email. If no draft
          opened,{' '}
          <a href={mailtoHref} style={{ textDecoration: 'underline', textDecorationThickness: '1px' }}>
            open it again
          </a>{' '}
          or write to {CONTACT_EMAIL} yourself.
        </p>
      </div>
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
      <Button type="submit" variant="primary" size="md">
        Prepare the email
      </Button>
      <p style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', margin: 0 }}>
        This opens a draft in your email app. We only receive it when you send it.
      </p>
    </form>
  );
}
