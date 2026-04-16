import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import { Display } from '@/components/typography/Display';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/nav/Breadcrumb';

export const metadata: Metadata = {
  title: 'Ambient Cases — Thursdai',
  description:
    'Background case files that populate automatically from your event streams. No manual intake. Cases arrive ready for AI-assisted investigation.',
};

function IconContract() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8L14 2z" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
      <polyline points="14 2 14 8 20 8" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
      <line x1="8" y1="13" x2="16" y2="13" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="17" x2="12" y2="17" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconCompliance() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
      <polyline points="9 12 11 14 15 10" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconIncident() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
      <line x1="12" y1="9" x2="12" y2="13" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12.01" y2="17" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconEvidence() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="var(--color-accent)" strokeWidth="2" />
      <path d="M8 12h8M8 8h8M8 16h4" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconRole() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="7" r="4" stroke="var(--color-accent)" strokeWidth="2" />
      <circle cx="17" cy="10" r="3" stroke="var(--color-accent)" strokeWidth="2" />
      <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconAudit() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8L14 2z" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
      <polyline points="14 2 14 8 20 8" stroke="var(--color-accent)" strokeWidth="2" />
      <polyline points="9 15 11 17 15 13" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const INTEGRATIONS = [
  'ServiceNow',
  'Jira',
  'Salesforce',
  'Workday',
  'Microsoft 365',
  'Slack',
];

export default function AmbientCasesPage() {
  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <Section variant="compact">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Product', href: '/product' },
              { label: 'Ambient Cases' },
            ]}
          />
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Label>Ambient Cases</Label>
            <Display>Cases that build themselves.</Display>
            <Body variant="large">
              Thursdai monitors your event streams and builds structured case files in the
              background. By the time an investigator opens a case, the facts are assembled, the
              relevant policies are identified, and the AI panel is ready.
            </Body>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/customers">
                <Button variant="primary">See Ambient Cases in context</Button>
              </Link>
              <Link href="#event-sources">
                <Button variant="secondary">View event sources</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 2. Event sources ────────────────────────────────── */}
      <Section variant="default" style={{ background: 'var(--color-surface-secondary)' }} id="event-sources">
        <Container>
          <Label>Event sources</Label>
          <Heading2 style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}>
            What triggers a case
          </Heading2>
          <Grid cols={3} gap="lg">
            <Card
              variant="feature"
              icon={<IconContract />}
              title="Contract events"
              body="New contracts, amendments, renewals, and expirations trigger case creation. Thursdai extracts parties, value, terms, and risk flags automatically."
            />
            <Card
              variant="feature"
              icon={<IconCompliance />}
              title="Compliance triggers"
              body="Regulatory deadlines, policy version changes, and audit events create cases with the relevant obligations pre-populated from your compliance corpus."
            />
            <Card
              variant="feature"
              icon={<IconIncident />}
              title="Incident signals"
              body="Security events, SLA breaches, and escalation flags from connected systems create investigation cases with the initial evidence already assembled."
            />
          </Grid>
        </Container>
      </Section>

      {/* ── 3. Investigator role ────────────────────────────── */}
      <Section variant="default">
        <Container>
          <Heading2 style={{ marginBottom: '1rem' }}>
            Built for the investigator, not the system
          </Heading2>
          <Body
            variant="large"
            style={{ maxWidth: '640px', marginBottom: '2.5rem', color: 'var(--color-text-secondary)' }}
          >
            Ambient Cases are designed around how investigators actually work — opening a case
            should mean starting the analysis, not assembling the facts.
          </Body>
          <Grid cols={3} gap="lg">
            <Card
              variant="feature"
              icon={<IconEvidence />}
              title="Pre-assembled evidence"
              body="When you open a case, the relevant documents, policy sections, and prior decisions are already surfaced. The AI panel has already run the initial analysis."
            />
            <Card
              variant="feature"
              icon={<IconRole />}
              title="Role-based perspective"
              body="Legal sees the contractual risk. Compliance sees the regulatory exposure. Engineering sees the technical blast radius. All in the same case file."
            />
            <Card
              variant="feature"
              icon={<IconAudit />}
              title="Audit-ready from day one"
              body="Every case records who saw what, when, and what the AI recommended at each stage. Export to your GRC system with one API call."
            />
          </Grid>
        </Container>
      </Section>

      {/* ── 4. Export integrations ──────────────────────────── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Label style={{ textAlign: 'center', display: 'block', marginBottom: '1.25rem' }}>
            Export integrations
          </Label>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.75rem',
            }}
          >
            {INTEGRATIONS.map((name) => (
              <Badge key={name} variant="muted">
                {name}
              </Badge>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 5. CTA ──────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1e2a5a 0%, #5b3a7a 55%, #e8a34a 100%)',
          padding: '4rem 0',
          textAlign: 'center',
        }}
      >
        <Container>
          <div style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '20px',
            padding: '3rem',
            maxWidth: '640px',
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <Heading2 style={{ color: '#fff' }}>See Ambient Cases in context</Heading2>
            <Body
              variant="large"
              style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '480px', margin: '0.75rem auto 1.5rem' }}
            >
              Read how Meridian Health and Sterling Legal use Ambient Cases to close
              investigations faster.
            </Body>
            <Link href="/customers">
              <Button
                variant="primary"
                size="lg"
                style={{ background: '#ffffff', color: '#3e4fb8' }}
              >
                Customer stories →
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
