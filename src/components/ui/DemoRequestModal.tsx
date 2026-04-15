'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { Button } from './Button';

export interface DemoRequestModalProps {
  open: boolean;
  onClose: () => void;
}

export function DemoRequestModal({ open, onClose }: DemoRequestModalProps) {
  const titleId = useId();
  const firstFocusRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', decision: '' });

  // Focus first field when opened
  useEffect(() => {
    if (open) {
      setSubmitted(false);
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
      'button, input, textarea, [tabindex]:not([tabindex="-1"])'
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
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {
      // best effort — show success regardless
    }
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => onClose(), 2000);
  }

  if (!open) return null;

  const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '10px 14px',
    background: 'var(--color-surface-secondary)',
    border: '1px solid var(--color-border-default)',
    borderRadius: '8px',
    color: 'var(--color-text-primary)',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 150ms ease',
    boxSizing: 'border-box',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--color-surface-overlay, rgba(0,0,0,0.5))',
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
        aria-labelledby={titleId}
        style={{
          background: 'var(--color-surface-primary)',
          borderRadius: '16px',
          padding: '2rem',
          width: '100%',
          maxWidth: '480px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
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
            borderRadius: '6px',
          }}
        >
          ×
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '40px', marginBottom: '1rem' }}>✓</div>
            <p style={{ color: 'var(--color-text-primary)', fontSize: '17px', fontWeight: 600 }}>
              We&apos;ll be in touch within one business day.
            </p>
          </div>
        ) : (
          <>
            <h2
              id={titleId}
              style={{
                color: 'var(--color-text-primary)',
                fontSize: '20px',
                fontWeight: 700,
                marginBottom: '0.5rem',
              }}
            >
              Request a demo
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '1.5rem' }}>
              We&apos;ll set up a tenant pilot tailored to your use case.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label
                  htmlFor="demo-name"
                  style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}
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
                  style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}
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
                  style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}
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
                  style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}
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
                {submitting ? 'Sending…' : 'Request a demo'}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
