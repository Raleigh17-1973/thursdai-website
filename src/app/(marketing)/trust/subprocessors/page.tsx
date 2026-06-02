import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Callout } from '@/components/ui/Callout';
import { Breadcrumb } from '@/components/nav/Breadcrumb';

export const metadata: Metadata = {
  title: 'Subprocessors: Thursdai',
  description: 'Third-party subprocessors used by Thursdai for infrastructure and security services.',
};

// ── Data ───────────────────────────────────────────────────────

const SUBPROCESSORS = [
  { name: 'Amazon Web Services', purpose: 'Cloud infrastructure', location: 'US, EU', dataProcessed: 'All data (tenant choice of region)' },
  { name: 'Anthropic', purpose: 'AI inference (Claude models)', location: 'US', dataProcessed: 'Inference requests (no corpus data)' },
  { name: 'OpenAI', purpose: 'AI inference (GPT models)', location: 'US', dataProcessed: 'Inference requests (no corpus data)' },
  { name: 'Datadog', purpose: 'Observability and monitoring', location: 'US', dataProcessed: 'System metrics, anonymised logs' },
  { name: 'Sentry', purpose: 'Error tracking', location: 'US', dataProcessed: 'Anonymised error events' },
];

// ── Styles ─────────────────────────────────────────────────────

const thStyle: React.CSSProperties = {
  padding: '10px 14px',
  textAlign: 'left',
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--color-text-primary)',
  borderBottom: '1px solid var(--color-border-default)',
  background: 'var(--color-surface-secondary)',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 14px',
  fontSize: '14px',
  lineHeight: 1.5,
  color: 'var(--color-text-secondary)',
  borderBottom: '1px solid var(--color-border-default)',
  verticalAlign: 'top',
};

// ── Page ───────────────────────────────────────────────────────

export default function SubprocessorsPage() {
  return (
    <>
      <Section variant="default">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Trust', href: '/trust' },
              { label: 'Subprocessors' },
            ]}
          />
          <Label style={{ marginTop: '1.5rem', display: 'block' }}>Subprocessors</Label>
          <Heading1 style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            Our subprocessors
          </Heading1>
          <Body variant="large">
            Thursdai uses a small number of carefully vetted subprocessors for infrastructure and
            security services. This list is updated when subprocessors change. Customers are
            notified 30 days before a new subprocessor is added.
          </Body>
        </Container>
      </Section>

      {/* LEGAL REVIEW REQUIRED */}
      <Section variant="compact">
        <Container>
          <Callout variant="warning" style={{ marginBottom: '1.5rem' }}>
            Content pending legal review before launch.
          </Callout>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Subprocessor</th>
                  <th style={thStyle}>Purpose</th>
                  <th style={thStyle}>Location</th>
                  <th style={thStyle}>Data processed</th>
                </tr>
              </thead>
              <tbody>
                {SUBPROCESSORS.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 1 ? 'rgba(0,0,0,0.02)' : undefined }}>
                    <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--color-text-primary)' }}>{row.name}</td>
                    <td style={tdStyle}>{row.purpose}</td>
                    <td style={tdStyle}>{row.location}</td>
                    <td style={tdStyle}>{row.dataProcessed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Body style={{ marginTop: '1.5rem', color: 'var(--color-text-tertiary)', fontSize: '13px' }}>
            This list is updated when subprocessors change. Customers are notified 30 days before
            a new subprocessor is added.
          </Body>
        </Container>
      </Section>
    </>
  );
}
