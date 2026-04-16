import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';

interface CertBadgeProps {
  name: string;
  status: 'live' | 'in-progress' | 'ready';
  href: string;
  ariaLabel: string;
}

const statusVariant = {
  live: 'green',
  'in-progress': 'amber',
  ready: 'indigo',
} as const;

const statusLabel = {
  live: 'Live',
  'in-progress': 'In Progress',
  ready: 'Ready',
} as const;

export function CertBadge({ name, status, href, ariaLabel }: CertBadgeProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      style={{ textDecoration: 'none' }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '9999px',
          border: '1px solid var(--color-border-default)',
          background: 'var(--color-surface-primary)',
          transition: 'border-color 150ms ease, box-shadow 150ms ease',
        }}
        className="hover:border-[var(--color-accent)] hover:shadow-sm"
      >
        <span
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}
        >
          {name}
        </span>
        <Badge variant={statusVariant[status]}>{statusLabel[status]}</Badge>
      </div>
    </Link>
  );
}
