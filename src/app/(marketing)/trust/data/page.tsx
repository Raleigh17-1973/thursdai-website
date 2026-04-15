import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Callout } from '@/components/ui/Callout';
import { Breadcrumb } from '@/components/nav/Breadcrumb';

export const metadata: Metadata = {
  title: 'Data Handling — Thursdai',
  description:
    "How Thursdai stores, processes, and protects your data. Retention windows, PII handling, tenant isolation, encryption, and our training policy.",
};

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

// ── Data ───────────────────────────────────────────────────────

const RETENTION_ROWS = [
  { type: 'Inference logs', defaultRetention: '365 days', maxRetention: '7 years', notes: 'Required for AI Act audit trail' },
  { type: 'Tenant corpus content', defaultRetention: 'Indefinite (until deleted)', maxRetention: 'N/A', notes: 'Customer-controlled deletion' },
  { type: 'User session data', defaultRetention: '30 days', maxRetention: '1 year', notes: 'Covers auth tokens, session state' },
  { type: 'Audit events', defaultRetention: '7 years', maxRetention: '7 years', notes: 'Non-configurable; regulatory requirement' },
  { type: 'API request logs', defaultRetention: '90 days', maxRetention: '1 year', notes: 'Access patterns, rate limiting data' },
];

// ── Page ───────────────────────────────────────────────────────

export default function DataPage() {
  return (
    <>
      {/* Hero */}
      <Section variant="default">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Trust', href: '/trust' },
              { label: 'Data Handling' },
            ]}
          />
          <Label style={{ marginTop: '1.5rem', display: 'block' }}>Data Handling</Label>
          <Heading1 style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            Your data is yours. We don&apos;t train on it.
          </Heading1>
          <Body variant="large" style={{ maxWidth: '700px' }}>
            This is not fine print. Thursdai never uses customer data to train models, fine-tune
            systems, or improve the standard corpus. This section documents every data flow,
            retention window, and isolation guarantee.
          </Body>
        </Container>
      </Section>

      {/* Training policy statement */}
      {/* LEGAL REVIEW REQUIRED */}
      <Section variant="compact">
        <Container>
          <Callout variant="warning" style={{ marginBottom: '1.5rem' }}>
            Content pending legal review before launch. Full data handling documentation requires
            review by DPO/legal counsel before launch.
          </Callout>
          <div
            style={{
              background: 'linear-gradient(135deg, #0f766e22, #0d948822)',
              border: '2px solid var(--color-accent)',
              borderRadius: '16px',
              padding: '2rem',
              margin: '2rem 0',
              textAlign: 'center',
            }}
          >
            <Heading2>Thursdai never trains on customer data.</Heading2>
            <Body variant="large" style={{ marginTop: '1rem' }}>
              Not in the fine print. Not as an opt-out. Never. Your tenant corpus content, your
              queries, and your outputs are never used for model training, fine-tuning, or standard
              corpus improvement.
            </Body>
          </div>
        </Container>
      </Section>

      {/* Retention windows */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Retention windows</Heading2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Data type</th>
                  <th style={thStyle}>Default retention</th>
                  <th style={thStyle}>Configurable max</th>
                  <th style={thStyle}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {RETENTION_ROWS.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 1 ? 'rgba(0,0,0,0.02)' : undefined }}>
                    <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--color-text-primary)' }}>{row.type}</td>
                    <td style={tdStyle}>{row.defaultRetention}</td>
                    <td style={tdStyle}>{row.maxRetention}</td>
                    <td style={tdStyle}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Encryption */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Encryption</Heading2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                border: '1px solid var(--color-border-default)',
                borderRadius: '12px',
                padding: '1.5rem',
                background: 'var(--color-surface-primary)',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text-tertiary)',
                  marginBottom: '0.75rem',
                }}
              >
                At rest
              </p>
              <Body>
                AES-256-GCM. Tenant corpus encrypted with tenant-specific key. CMEK available on
                dedicated and above tiers.
              </Body>
            </div>
            <div
              style={{
                border: '1px solid var(--color-border-default)',
                borderRadius: '12px',
                padding: '1.5rem',
                background: 'var(--color-surface-primary)',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text-tertiary)',
                  marginBottom: '0.75rem',
                }}
              >
                In transit
              </p>
              <Body>
                TLS 1.3 minimum. Certificate pinning available for dedicated deployments. mTLS
                supported for VPC and on-premises.
              </Body>
            </div>
          </div>
        </Container>
      </Section>

      {/* Tenant isolation */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Tenant isolation</Heading2>
          <div style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Body>
              Cryptographic isolation ensures no cross-tenant query is possible at any layer of the
              stack. The architecture enforces tenant boundaries at the database level — not purely
              as an application-layer check.
            </Body>
            <Body>
              Each tenant operates on separate database schemas. Queries are scoped to the tenant
              at connection time; there is no code path that permits reading another tenant&apos;s
              data even with a crafted request.
            </Body>
            <Body>
              Access logs are generated per-tenant and auditable by the customer via API. You can
              independently verify who accessed your data and when, without relying on Thursdai
              support.
            </Body>
          </div>
        </Container>
      </Section>

      {/* PII handling */}
      {/* LEGAL REVIEW REQUIRED */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>PII handling</Heading2>
          <Callout variant="warning" style={{ marginBottom: '1.5rem' }}>
            Content pending legal review before launch.
          </Callout>
          <div style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                Detection
              </p>
              <Body>
                PII detected in inference inputs and outputs using pattern matching plus ML
                classification.
              </Body>
            </div>
            <div>
              <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                Redaction
              </p>
              <Body>
                <code
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'var(--color-surface-secondary)',
                    padding: '1px 4px',
                    borderRadius: '3px',
                    fontSize: '13px',
                  }}
                >
                  pii_block
                </code>{' '}
                policy primitive redacts before output.
              </Body>
            </div>
            <div>
              <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                Storage
              </p>
              <Body>
                PII in inference logs masked by default; full logs available on-demand with audit
                trail.
              </Body>
            </div>
            <div>
              <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                Right to erasure
              </p>
              <Body>
                Documented workflow — customer submits erasure request via API, Thursdai processes
                within 30 days, confirmation receipt issued.
              </Body>
            </div>
          </div>
        </Container>
      </Section>

      {/* Subprocessors */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Callout variant="info" title="Subprocessors">
            Thursdai uses a small number of carefully vetted subprocessors for infrastructure and
            security services.{' '}
            <Link href="/trust/subprocessors" style={{ color: 'var(--color-accent)' }}>
              View the full subprocessors list →
            </Link>
          </Callout>
        </Container>
      </Section>
    </>
  );
}
