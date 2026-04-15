import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Display } from '@/components/typography/Display';
import { Heading3 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Card } from '@/components/ui/Card';
import { Callout } from '@/components/ui/Callout';
import { CertBadge } from '@/components/content/CertBadge';
import { SecurityPackForm } from '@/components/content/SecurityPackForm';

export const metadata: Metadata = {
  title: 'Trust & Security — Thursdai',
  description:
    'SOC 2 Type II, ISO 27001, EU AI Act Annex III readiness, and full deployment transparency. Built for procurement, compliance, and engineering to all say yes.',
};

// ── Icons ─────────────────────────────────────────────────────

function IconShield() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <polyline
        points="9 12 11 14 15 10"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCertificate() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="var(--color-accent)" strokeWidth="2" />
      <circle cx="12" cy="18" r="3" stroke="var(--color-accent)" strokeWidth="2" />
      <path d="M9 21l3-3 3 3" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M6 8h12M6 12h8" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconServer() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="20" height="7" rx="2" stroke="var(--color-accent)" strokeWidth="2" />
      <rect x="2" y="14" width="20" height="7" rx="2" stroke="var(--color-accent)" strokeWidth="2" />
      <circle cx="6" cy="6.5" r="1" fill="var(--color-accent)" />
      <circle cx="6" cy="17.5" r="1" fill="var(--color-accent)" />
    </svg>
  );
}

function IconDatabase() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" stroke="var(--color-accent)" strokeWidth="2" />
      <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="var(--color-accent)" strokeWidth="2" />
      <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" stroke="var(--color-accent)" strokeWidth="2" />
    </svg>
  );
}

// ── Cert badges ────────────────────────────────────────────────

const CERT_BADGES = [
  { name: 'SOC 2 Type II', status: 'live' as const, href: '/trust/certifications#soc2', ariaLabel: 'SOC 2 Type II certified' },
  { name: 'ISO 27001', status: 'live' as const, href: '/trust/certifications#iso27001', ariaLabel: 'ISO 27001 certified' },
  { name: 'ISO 42001', status: 'in-progress' as const, href: '/trust/certifications#iso42001', ariaLabel: 'ISO 42001 in progress' },
  { name: 'HIPAA-eligible', status: 'live' as const, href: '/trust/certifications#hipaa', ariaLabel: 'HIPAA-eligible infrastructure' },
  { name: 'EU AI Act Annex III', status: 'ready' as const, href: '/trust/annex-iii', ariaLabel: 'EU AI Act Annex III ready' },
  { name: 'FedRAMP Moderate', status: 'in-progress' as const, href: '/trust/certifications#fedramp', ariaLabel: 'FedRAMP Moderate in progress' },
];

// ── Page ───────────────────────────────────────────────────────

export default function TrustPage() {
  return (
    <>
      {/* Hero */}
      <Section variant="default">
        <Container>
          <Label>Trust &amp; Security</Label>
          <Display style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            Built for procurement, compliance, and engineering to all say yes.
          </Display>
          <Body
            variant="large"
            style={{ maxWidth: '700px' }}
          >
            Thursdai is designed for regulated enterprise deployment from the ground up — not
            retrofitted. Every architectural decision, certification, and policy is documented here.
          </Body>
        </Container>
      </Section>

      {/* Nav cards */}
      {/* LEGAL REVIEW REQUIRED */}
      <Section variant="compact">
        <Container>
          <Callout variant="warning">
            Content pending legal review before launch.
          </Callout>
          <Grid cols={2} gap="lg" style={{ marginTop: '2rem' }}>
            <Card
              variant="feature"
              icon={<IconShield />}
              title="EU AI Act Annex III"
              body="How Thursdai maps to every obligation under Annex III. Downloadable FRIA and DPIA templates."
              href="/trust/annex-iii"
            />
            <Card
              variant="feature"
              icon={<IconCertificate />}
              title="ISO 42001 Certification"
              body="Our AI management system certification roadmap. Current stage and timeline."
              href="/trust/iso-42001"
            />
            <Card
              variant="feature"
              icon={<IconServer />}
              title="Deployment Options"
              body="SaaS, dedicated single-tenant, VPC, and on-premises. Data residency and CMEK for every tier."
              href="/trust/deployment"
            />
            <Card
              variant="feature"
              icon={<IconDatabase />}
              title="Data Handling"
              body="Retention windows, PII handling, encryption, tenant isolation, and our training policy."
              href="/trust/data"
            />
          </Grid>
        </Container>
      </Section>

      {/* Certification badges row */}
      <Section
        variant="compact"
        style={{
          borderTop: '1px solid var(--color-border-default)',
          borderBottom: '1px solid var(--color-border-default)',
        }}
      >
        <Container>
          <p
            style={{
              textAlign: 'center',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-text-tertiary)',
              marginBottom: '1.5rem',
            }}
          >
            Security &amp; compliance
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            {CERT_BADGES.map((badge) => (
              <CertBadge key={badge.name} {...badge} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Security pack download */}
      <Section variant="compact">
        <Container>
          <div
            style={{
              background: 'var(--color-surface-secondary)',
              border: '1px solid var(--color-border-default)',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center',
              marginTop: '1rem',
            }}
          >
            <Heading3>Download the security pack</Heading3>
            <Body style={{ maxWidth: '500px', margin: '0 auto 1.5rem' }}>
              SOC 2 summary, ISO 27001 certificate, pen-test executive summary, and AI RMF
              self-assessment — delivered to your inbox.
            </Body>
            <SecurityPackForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
