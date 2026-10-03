import React from 'react';
import { CONTACT_EMAIL } from '@/config/site';

/** A mailto link to CONTACT_EMAIL with the subject and body already filled in. */
export function leadMailto(subject: string, lines: string[]): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.filter(Boolean).join('\n'),
  )}`;
}

/**
 * Shown when /api/lead could not deliver a form (HubSpot not configured, upstream error or no
 * network): the honest fallback is an email the visitor sends themselves, never a false success.
 */
export function LeadFallback({ subject, lines, align = 'start' }: { subject: string; lines: string[]; align?: 'start' | 'center' }) {
  return (
    <div role="status" style={{ textAlign: align === 'center' ? 'center' : 'left' }}>
      <p className="m-0" style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
        We couldn&apos;t send this automatically. Email it to us with your details already filled in and
        we&apos;ll reply.
      </p>
      <a
        href={leadMailto(subject, lines)}
        style={{
          display: 'inline-block',
          marginTop: '0.75rem',
          padding: '10px 18px',
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
  );
}
