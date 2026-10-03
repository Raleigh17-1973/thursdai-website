'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { Button } from './Button';
import { H3_STYLE } from '@/components/typography/scale';
import { CONTACT_EMAIL } from '@/config/site';
import { MOTION_CLASS } from '@/lib/motion';
import { track } from '@/lib/analytics';

export type CtaLocation = 'hero' | 'closing' | 'nav';

export interface DemoRequestModalProps {
  open: boolean;
  onClose: () => void;
  /** Which CTA opened the modal; sent to HubSpot as cta_location. */
  source?: CtaLocation;
}

export function DemoRequestModal({ open, onClose, source }: DemoRequestModalProps) {
  const titleId = useId();
  const firstFocusRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // Set when /api/lead could not deliver the request; we hand over a pre-filled email instead.
  const [fallback, setFallback] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', decision: '' });

  // Focus first field when opened
  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setFallback(false);
      setForm({ name: '', company: '', email: '', decision: '' });
      setTimeout(() => firstFocusRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Focus trap
  function handleDialogKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'Tab') return;
    const dialog = e.currentTarget;
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'a[href], button, input, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    let delivered = false;
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'pilot', ...form, source }),
      });
      delivered = res.ok;
    } catch {
      delivered = false;
    }
    setSubmitting(false);
    track({ name: 'pilot_request', props: { cta_location: source ?? 'unknown', delivered } });
    if (!delivered) {
      setFallback(true);
      return;
    }
    setSubmitted(true);
    setTimeout(() => onClose(), 2000);
  }

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Pilot request: ${form.company}`,
  )}&body=${encodeURIComponent(
    [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      `Decision I would most want to replay: ${form.decision || '(not given)'}`,
      source ? `(Requested from the ${source} button)` : '',
    ]
      .filter(Boolean)
      .join('\n'),
  )}`;

  if (!open) return null;

  const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '10px 14px',
    background: 'var(--color-surface-primary)',
    border: '1px solid var(--color-border-strong)',
    borderRadius: '2px',
    color: 'var(--color-text-primary)',
    fontSize: '15px',
    transition: 'border-color 150ms ease',
    boxSizing: 'border-box',
  };

  return (
    <div
      className={MOTION_CLASS.scrim}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(20, 18, 15, 0.45)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={MOTION_CLASS.panelUp}
        aria-labelledby={titleId}
        style={{
          background: 'var(--color-surface-primary)',
          border: '1px solid var(--color-text-primary)',
          borderRadius: '2px',
          padding: '2.5rem 2rem 2rem',
          width: '100%',
          maxWidth: '480px',
          position: 'relative',
        }}
        onKeyDown={handleDialogKeyDown}
      >
        {/* Close button */}
        <button
          aria-label="Close"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-secondary)',
            fontSize: '20px',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '4px 8px',
            borderRadius: '2px',
          }}
        >
          ×
        </button>

        {fallback ? (
          <div style={{ padding: '0.5rem 0' }}>
            <h2
              id={titleId}
              style={{ ...H3_STYLE, marginBottom: '0.75rem' }}
            >
              One more step
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              We couldn&apos;t send your request automatically. Email it to us with your details already filled in
              and we&apos;ll reply within one business day.
            </p>
            <a
              href={mailtoHref}
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '12px 20px',
                background: 'var(--button-primary-bg)',
                color: 'var(--button-primary-fg)',
                borderRadius: '2px',
                fontWeight: 500,
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              Email {CONTACT_EMAIL}
            </a>
          </div>
        ) : submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p style={{ ...H3_STYLE }}>
              We&apos;ll be in touch within one business day.
            </p>
          </div>
        ) : (
          <>
            <h2
              id={titleId}
              style={{ ...H3_STYLE, marginBottom: '0.5rem' }}
            >
              Request a pilot
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginBottom: '1.75rem' }}>
              We&apos;ll set up a tenant pilot tailored to your use case.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {source && <input type="hidden" name="source" value={source} />}
              <div>
                <label
                  htmlFor="demo-name"
                  style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '6px' }}
                >
                  Name
                </label>
                <input
                  id="demo-name"
                  ref={firstFocusRef}
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  style={inputStyle}
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label
                  htmlFor="demo-company"
                  style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '6px' }}
                >
                  Company
                </label>
                <input
                  id="demo-company"
                  type="text"
                  required
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  style={inputStyle}
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label
                  htmlFor="demo-email"
                  style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '6px' }}
                >
                  Work email
                </label>
                <input
                  id="demo-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  style={inputStyle}
                  placeholder="jane@acmecorp.com"
                />
              </div>

              <div>
                <label
                  htmlFor="demo-decision"
                  style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '6px' }}
                >
                  What decision would you most want to replay?
                </label>
                <textarea
                  id="demo-decision"
                  rows={3}
                  value={form.decision}
                  onChange={(e) => setForm((f) => ({ ...f, decision: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  placeholder="e.g. Which AI vendor should we choose for our compliance workflow?"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" disabled={submitting}>
                {submitting ? 'Sending…' : 'Request a pilot'}
              </Button>
              <p className="m-0" style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>
                We use your details to respond to your request. See our{' '}
                <a href="/privacy" style={{ textDecoration: 'underline', textDecorationThickness: '1px' }}>
                  Privacy policy
                </a>
                .
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
