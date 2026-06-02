import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Callout } from '@/components/ui/Callout';
import { EnterpriseCTA } from '@/components/ui/EnterpriseCTA';
import { Breadcrumb } from '@/components/nav/Breadcrumb';

export const metadata: Metadata = {
  title: 'Deployment Options: Thursdai',
  description:
    'SaaS multi-tenant, dedicated single-tenant, VPC and on-premises. Data residency, CMEK support and deployment timelines for every tier.',
};

// ── Data ───────────────────────────────────────────────────────

const MATRIX_ROWS = [
  {
    label: 'Data residency',
    saas: 'US or EU (your choice)',
    dedicated: 'US or EU (your choice)',
    vpc: 'Your cloud region',
    onprem: 'Your datacenter',
  },
  {
    label: 'CMEK support',
    saas: 'No',
    dedicated: 'Yes: customer-managed encryption keys',
    vpc: 'Yes',
    onprem: 'Yes: bring your own HSM',
  },
  {
    label: 'Deployment time',
    saas: 'Minutes (API key)',
    dedicated: '5–10 business days',
    vpc: '15–30 business days',
    onprem: '60–90 business days',
  },
  {
    label: 'Maintenance model',
    saas: 'Fully managed by Thursdai',
    dedicated: 'Managed by Thursdai, isolated instance',
    vpc: 'Shared responsibility',
    onprem: 'Customer-managed, Thursdai support',
  },
  {
    label: 'Pricing implication',
    saas: 'Platform fee + credits + outcome',
    dedicated: '+$40K/yr dedicated infrastructure',
    vpc: '+$80K/yr VPC setup + running costs',
    onprem: 'Custom quote; typically +$150K/yr',
  },
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
  whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 14px',
  fontSize: '14px',
  lineHeight: 1.5,
  color: 'var(--color-text-secondary)',
  borderBottom: '1px solid var(--color-border-default)',
  verticalAlign: 'top',
};

const rowLabelStyle: React.CSSProperties = {
  ...tdStyle,
  fontWeight: 600,
  color: 'var(--color-text-primary)',
  whiteSpace: 'nowrap',
  background: 'var(--color-surface-secondary)',
  position: 'sticky',
  left: 0,
};

// ── Page ───────────────────────────────────────────────────────

export default function DeploymentPage() {
  return (
    <>
      {/* Hero */}
      <Section variant="default">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Trust', href: '/trust' },
              { label: 'Deployment Options' },
            ]}
          />
          <Label style={{ marginTop: '1.5rem', display: 'block' }}>Deployment</Label>
          <Heading1 style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            Deploy where your data needs to live.
          </Heading1>
          <Body variant="large">
            Four deployment models, from fully managed SaaS to on-premises air-gapped. Every tier
            supports your data residency requirements; CMEK is available from dedicated
            single-tenant upward.
          </Body>
        </Container>
      </Section>

      {/* Deployment matrix */}
      {/* LEGAL REVIEW REQUIRED */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Callout variant="warning" style={{ marginBottom: '1.5rem' }}>
            Content pending legal review before launch.
          </Callout>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Deployment matrix</Heading2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle }}></th>
                  <th style={thStyle}>SaaS Multi-tenant</th>
                  <th style={thStyle}>Dedicated Single-tenant</th>
                  <th style={thStyle}>VPC</th>
                  <th style={thStyle}>On-premises</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX_ROWS.map((row, i) => (
                  <tr
                    key={i}
                    style={{ background: i % 2 === 1 ? 'rgba(0,0,0,0.02)' : undefined }}
                  >
                    <td style={rowLabelStyle}>{row.label}</td>
                    <td style={tdStyle}>{row.saas}</td>
                    <td style={tdStyle}>{row.dedicated}</td>
                    <td style={tdStyle}>{row.vpc}</td>
                    <td style={tdStyle}>{row.onprem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Which tier */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Which tier is right for you?</Heading2>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px' }}
          >
            <Callout variant="info">
              <strong>SaaS is right for you if:</strong> you don&apos;t have strict data residency
              requirements, you want to get started in minutes, and your security team is comfortable
              with SOC 2 Type II + ISO 27001 shared infrastructure.
            </Callout>
            <Callout variant="info">
              <strong>Dedicated single-tenant is right for you if:</strong> you need logical data
              isolation, CMEK or a dedicated endpoint for compliance reasons, but don&apos;t want
              to manage infrastructure.
            </Callout>
            <Callout variant="warning">
              <strong>VPC or on-premises is right for you if:</strong> regulations prohibit data
              leaving your environment, you need air-gap capability, or you have specific network
              topology requirements. Engage our enterprise team early; these deployments have lead
              times.
            </Callout>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section
        variant="compact"
        style={{ background: 'var(--color-surface-secondary)', textAlign: 'center' }}
      >
        <Container>
          <Heading2 style={{ marginBottom: '1rem' }}>Talk to our enterprise team</Heading2>
          <Body style={{ maxWidth: '500px', margin: '0 auto 1.5rem' }}>
            Ready to scope your deployment? Our enterprise team will walk you through the right tier
            for your compliance posture and timeline.
          </Body>
          <EnterpriseCTA />
        </Container>
      </Section>
    </>
  );
}
