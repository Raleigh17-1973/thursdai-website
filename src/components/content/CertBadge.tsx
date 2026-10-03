import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { statusText, type CertStatus } from '@/lib/certifications';

export type { CertStatus };

interface CertStatusTagProps {
  status: CertStatus;
  /** Shown only when a real quarter is confirmed, e.g. "Q3 2027". */
  quarter?: string | null;
}

// In-audit reads in ink; not-started in a dashed frame, so a standard that is not yet under
// audit never looks like one that is.
const statusVariant = {
  'in-audit': 'green',
  'not-started': 'amber',
} as const;

export function CertStatusTag({ status, quarter }: CertStatusTagProps) {
  return <Badge variant={statusVariant[status]}>{statusText(status, quarter)}</Badge>;
}

interface CertBadgeProps extends CertStatusTagProps {
  name: string;
  href: string;
}

// A ruled certificate stub: name in ink, status as a mono tag. The frame never implies a
// certificate is held; the status tag carries that.
// No aria-label: the visible name and status are the accessible name, so speech
// input users can say what they see (WCAG 2.5.3).
export function CertBadge({ name, status, quarter, href }: CertBadgeProps) {
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
      <CertStatusTag status={status} quarter={quarter} />
    </Link>
  );
}
