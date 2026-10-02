import React from 'react';
import Link from 'next/link';
import { CertStatusTag } from '@/components/content/CertBadge';
import { CERT_ROADMAP, auditorText, targetText } from '@/lib/certifications';
import { RecordTable } from './RecordTable';

// The certification roadmap from the single source (src/lib/certifications.ts). Used on
// /trust#certifications and /security so the two can never disagree.
export function CertRoadmapTable({ style }: { style?: React.CSSProperties }) {
  return (
    <RecordTable
      style={style}
      caption="Certification roadmap: each control or standard, its status, whether an auditor is engaged and the target quarter"
      columns={[
        { key: 'name', label: 'Control or standard', width: '46%' },
        { key: 'status', label: 'Status' },
        { key: 'auditor', label: 'Auditor engaged' },
        { key: 'target', label: 'Target' },
      ]}
      rows={CERT_ROADMAP.map((row) => ({
        id: row.name,
        name: (
          <>
            <Link href={row.href} style={{ color: 'var(--ink)', fontWeight: 500 }}>
              {row.name}
            </Link>
            <span
              style={{
                display: 'block',
                marginTop: '0.375rem',
                fontSize: '15px',
                fontWeight: 400,
                lineHeight: 1.55,
                color: 'var(--color-text-secondary)',
              }}
            >
              {row.note}
            </span>
          </>
        ),
        status: <CertStatusTag status={row.status} quarter={row.targetQuarter} />,
        auditor: <span style={{ color: 'var(--ink)' }}>{auditorText(row.auditorEngaged)}</span>,
        target: (
          <span style={{ color: row.targetQuarter || row.status === 'ready' ? 'var(--ink)' : undefined }}>
            {targetText(row)}
          </span>
        ),
      }))}
    />
  );
}
