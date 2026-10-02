import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';

interface CertBadgeProps {
  name: string;
  status: 'live' | 'in-progress' | 'ready';
  href: string;
}

const statusVariant = {
  live: 'green',
  'in-progress': 'amber',
  ready: 'indigo',
} as const;

const statusLabel = {
  live: 'Live',
  'in-progress': 'Planned',
  ready: 'Ready',
} as const;

// A ruled certificate stub: name in ink, status as a mono tag. The frame never implies a
// certificate is held; the status tag carries that.
// No aria-label: the visible name and status are the accessible name, so speech
// input users can say what they see (WCAG 2.5.3).
export function CertBadge({ name, status, href }: CertBadgeProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 rounded-[2px] px-4 py-2.5 no-underline hover:no-underline"
      style={{
        border: '1px solid var(--color-border-default)',
        background: 'var(--color-surface-primary)',
        color: 'var(--color-text-primary)',
      }}
    >
      <span style={{ fontSize: '15px', fontWeight: 500 }}>{name}</span>
      <Badge variant={statusVariant[status]}>{statusLabel[status]}</Badge>
    </Link>
  );
}
