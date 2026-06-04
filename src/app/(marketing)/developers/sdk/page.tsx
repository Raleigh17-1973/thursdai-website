import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Display } from '@/components/typography/Display';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Callout } from '@/components/ui/Callout';
import { Breadcrumb } from '@/components/nav/Breadcrumb';

export const metadata: Metadata = {
  title: 'SDK: Thursdai',
  description:
    'TypeScript and Python SDKs for Thursdai are in private beta. Integrate today using the REST API directly.',
};

const CURL_WRITE = `curl -X POST https://api.thursdai.com/v1/receipts \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "Content-Type: application/json" \\
  -H "X-Tenant-ID: your-tenant-id" \\
  -d '{
    "source": "your-agent-id",
    "model": "gpt-4o",
    "decision": "candidate_advance",
    "context_summary": "Screened resume for senior engineer role",
    "policy_ids": ["pol_hiring_v2"],
    "metadata": { "candidate_id": "c_8821", "requisition": "req_441" }
  }'`;

const CURL_READ = `curl "https://api.thursdai.com/v1/receipts/rec_01HXYZ..." \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "X-Tenant-ID: your-tenant-id"`;

const CURL_SEARCH = `curl -X POST https://api.thursdai.com/v1/receipts/search \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "tenant_id": "your-tenant-id",
    "source": "your-agent-id",
    "from": "2026-01-01T00:00:00Z",
    "compliance_status": "flag",
    "limit": 20
  }'`;

const codeStyle: React.CSSProperties = {
  display: 'block',
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px',
  padding: '1rem',
  fontFamily: 'var(--font-mono, monospace)',
  fontSize: '13px',
  lineHeight: 1.6,
  color: 'rgba(255,255,255,0.85)',
  overflowX: 'auto',
  whiteSpace: 'pre',
  margin: '0',
};

export default function SdkPage() {
  return (
    <>
      {/* Hero */}
      <Section variant="default" style={{ background: '#0b0f19' }}>
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Developers', href: '/developers' },
              { label: 'SDK' },
            ]}
          />
          <Label style={{ color: '#8b9ef0', marginTop: '1.5rem', display: 'block' }}>SDK</Label>
          <Display style={{ color: '#e4e4e7', marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            Integrate via REST today.
          </Display>
          <Body variant="large" style={{ color: '#a1a1aa' }}>
            TypeScript and Python SDKs are in private beta. While the SDKs ship, the REST API
            gives you full access to every Thursdai capability.
          </Body>
        </Container>
      </Section>

      {/* Beta note */}
      <Section variant="compact">
        <Container>
          <Callout variant="info" title="SDKs in private beta">
            TypeScript and Python SDK packages are available to design partners. If you are
            building on Thursdai and want early access, reach out at{' '}
            <a href="mailto:dev@thursdai.com" style={{ color: 'var(--color-accent)' }}>
              dev@thursdai.com
            </a>
            .
          </Callout>
        </Container>
      </Section>

      {/* Write a receipt */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2 style={{ marginBottom: '1rem' }}>Write a receipt</Heading2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
            POST to{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>/v1/receipts</code>{' '}
            to record a decision from any AI system in your stack.
          </p>
          <pre style={codeStyle}>{CURL_WRITE}</pre>
        </Container>
      </Section>

      {/* Read a receipt */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '1rem' }}>Read a receipt</Heading2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
            GET by receipt ID. Append{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>?include_anchor_proof=true</code>{' '}
            to retrieve the Merkle anchor proof.
          </p>
          <pre style={codeStyle}>{CURL_READ}</pre>
        </Container>
      </Section>

      {/* Search receipts */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2 style={{ marginBottom: '1rem' }}>Search receipts</Heading2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
            POST to{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>/v1/receipts/search</code>{' '}
            to filter by source, date range or compliance status. Cursor-paginated.
          </p>
          <pre style={codeStyle}>{CURL_SEARCH}</pre>
        </Container>
      </Section>
    </>
  );
}
