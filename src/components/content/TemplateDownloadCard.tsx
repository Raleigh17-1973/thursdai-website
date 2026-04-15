import React from 'react';
import { Badge } from '@/components/ui/Badge';

interface TemplateDownloadCardProps {
  title: string;
  desc: string;
  href: string;
}

export function TemplateDownloadCard({ title, desc, href }: TemplateDownloadCardProps) {
  return (
    <div
      style={{
        border: '1px solid var(--color-border-default)',
        borderRadius: '12px',
        padding: '1.5rem',
        background: 'var(--color-surface-primary)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
          {title}
        </p>
        <Badge variant="muted">DOCX</Badge>
      </div>
      <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--color-text-secondary)', margin: 0 }}>
        {desc}
      </p>
      <a
        href={href}
        download
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.375rem',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-accent)',
          textDecoration: 'none',
          marginTop: 'auto',
        }}
      >
        Download template →
      </a>
    </div>
  );
}
