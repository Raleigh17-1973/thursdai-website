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
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/nav/Breadcrumb';
import { TimeTravelScrubber } from '@/components/demos/TimeTravelScrubber';

export const metadata: Metadata = {
  title: 'Time-Travel — Thursdai',
  description:
    'Replay any AI decision with the knowledge and policies that were active at the time. Full audit trail for every agent output.',
};

function IconKnowledge() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function IconPolicy() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function IconRoles() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="7" r="4" stroke="var(--color-accent)" strokeWidth="2" />
      <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 11l2 2 4-4" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconAudit() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="var(--color-accent)" strokeWidth="2" />
      <path d="M8 12h8M8 8h8M8 16h4" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconInvestigate() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="8" stroke="var(--color-accent)" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconCompare() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="8" height="18" rx="1.5" stroke="var(--color-accent)" strokeWidth="2" />
      <rect x="14" y="3" width="8" height="18" rx="1.5" stroke="var(--color-accent)" strokeWidth="2" />
      <path d="M10 12h4" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function TimeTravelPage() {
  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <Section variant="compact">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Product', href: '/product' },
              { label: 'Time-Travel' },
            ]}
          />
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Label>Time-Travel</Label>
            <Display>Replay any decision. Exactly as it happened.</Display>
            <Body variant="large">
              Every agent decision is recorded with a snapshot of the active knowledge base, role
              definitions, and policy set. Go back to any point — not a summary, the actual
              decision with full provenance.
            </Body>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/#replay-demo">
                <Button variant="primary">Try Time-Travel</Button>
              </Link>
              <Link href="/developers/api">
                <Button variant="secondary">View API docs</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 2. TimeTravelScrubber ────────────────────────────── */}
      <Section variant="default" id="time-travel-scrubber">
        <Container>
          <TimeTravelScrubber />
        </Container>
      </Section>

      {/* ── 3. How snapshots work ────────────────────────────── */}
      <Section variant="default" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Label>Architecture</Label>
          <Heading2 style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}>
            What gets recorded
          </Heading2>
          <Grid cols={3} gap="lg">
            <Card
              variant="feature"
              icon={<IconKnowledge />}
              title="Knowledge snapshot"
              body="Every inference is tagged with the exact version of the knowledge base that was active. Standard corpus and tenant corpus are versioned independently."
            />
            <Card
              variant="feature"
              icon={<IconPolicy />}
              title="Policy state"
              body="The policy YAML that governed the response is stored alongside the output. You can see exactly which rules applied — and run the same question with the current policy set to see what would change."
            />
            <Card
              variant="feature"
              icon={<IconRoles />}
              title="Role definitions"
              body="Which roles were active, what their scope was, and which corpus sections they could cite are all part of the snapshot. Role changes are versioned and auditable."
            />
          </Grid>
        </Container>
      </Section>

      {/* ── 4. Audit use cases ──────────────────────────────── */}
      <Section variant="default">
        <Container>
          <Label>Use cases</Label>
          <Heading2 style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}>
            Built for the audit moment
          </Heading2>
          <Grid cols={3} gap="lg">
            <Card
              variant="feature"
              icon={<IconAudit />}
              title="Regulatory audit"
              body="When a regulator asks 'what did your AI recommend in March 2025?', you can produce the exact answer with full source attribution — not a reconstruction."
            />
            <Card
              variant="feature"
              icon={<IconInvestigate />}
              title="Incident investigation"
              body="Trace an AI-influenced decision back through the decision chain. See what knowledge was active, which role drove the recommendation, and what policy applied."
            />
            <Card
              variant="feature"
              icon={<IconCompare />}
              title="Model comparison"
              body="Run the same question with today's model versus the model active 12 months ago. See what changed and why."
            />
          </Grid>
        </Container>
      </Section>

      {/* ── 5. CTA ──────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #14b8a6 100%)',
          padding: '4rem 0',
          textAlign: 'center',
        }}
      >
        <Container>
          <Heading2 style={{ color: '#fff' }}>Try Time-Travel in the demo</Heading2>
          <Body
            variant="large"
            style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '480px', margin: '0.75rem auto 1.5rem' }}
          >
            Move the slider to replay any decision with period-accurate knowledge and policies.
          </Body>
          <Link href="/">
            <Button
              variant="primary"
              size="lg"
              style={{ background: '#ffffff', color: '#0d9488' }}
            >
              See the demo →
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
