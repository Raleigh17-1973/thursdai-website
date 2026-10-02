import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Display } from '@/components/typography/Display';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Card } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import { ClosingCTAs } from '@/components/ui/ClosingCTAs';
import { Breadcrumb } from '@/components/nav/Breadcrumb';
import { ExecutiveDashboard } from '@/components/demos/ExecutiveDashboard';

export const metadata: Metadata = {
  title: 'People: Thursdai',
  description:
    'AI governance for hiring and workforce decisions. Thursdai writes an AI Receipt for every hiring decision and produces the bias-audit evidence, AI system register and compliance documentation regulated employers need under NYC Local Law 144 and the EU AI Act.',
};

// Frameworks the People space shapes evidence to. These are the real frameworks
// the product supports; do not list ones it does not.
const FRAMEWORKS = [
  { name: 'NYC Local Law 144', detail: 'Bias-audit evidence and the public summary the law requires' },
  { name: 'EU AI Act, Article 26', detail: 'Deployer obligations for high-risk employment systems' },
  { name: 'EU Pay Transparency 2023/970', detail: 'Pay-gap reporting evidence' },
  { name: 'EEOC EEO-1', detail: 'Workforce demographic reporting' },
  { name: 'OFCCP AAP', detail: 'Affirmative action program documentation' },
  { name: 'ISO 30414', detail: 'Human-capital reporting metrics' },
];

export default function PeopleSolutionPage() {
  return (
    <>
      {/* Hero: lead with the obligation, not the feature */}
      <Section>
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Solutions', href: '/solutions' },
              { label: 'People' },
            ]}
          />
          <Label style={{ marginTop: '1.5rem', display: 'block' }}>Solutions / People</Label>
          <Display style={{ marginTop: '0.75rem' }}>
            Your hiring AI is now a regulated system. Prove it behaves.
          </Display>
          <Body variant="large" style={{ marginTop: '1.5rem' }}>
            If an automated tool touches a hiring decision, you owe an independent bias audit, a
            public summary and candidate notice under NYC Local Law 144, and deployer obligations
            under the EU AI Act. The People space governs those decisions, writes an AI Receipt for
            each one and bundles them into the audit-ready packs you need to answer for them.
          </Body>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <ButtonLink href="/demo" variant="primary" size="lg">Open the demo</ButtonLink>
            <ButtonLink href="/product/compliance-packs" variant="secondary" size="lg">See the evidence it produces</ButtonLink>
          </div>
        </Container>
      </Section>

      {/* The problem */}
      <Section variant="compact">
        <Container>
          <Heading2>The rules already changed.</Heading2>
          <Grid cols={3} gap="md" style={{ marginTop: '1.5rem' }}>
            <Card
              variant="feature"
              title="A public bias audit, every year"
              body="NYC Local Law 144 requires an independent bias audit of automated employment decision tools, a public summary on your site and candidate notice. Penalties run $500 to $1,500 per day, per violation."
            />
            <Card
              variant="feature"
              title="High-risk under the EU AI Act"
              body="Employment AI is classed high-risk. Deployers carry record-keeping, transparency and human-oversight obligations, with documentation an auditor can inspect."
            />
            <Card
              variant="feature"
              title="The four-fifths rule still applies"
              body="EEOC adverse-impact analysis expects selection-rate ratios at or above 0.80 across protected groups. You need the numbers, the lineage and the record."
            />
          </Grid>
        </Container>
      </Section>

      {/* What it governs */}
      <Section variant="compact">
        <Container>
          <Heading2>What the People space governs.</Heading2>
          <Body style={{ marginTop: '1rem' }}>
            Every AI-assisted decision in the hiring funnel runs through the same governed
            substrate: role-based deliberation, policy-as-code constraints and a recorded,
            replayable AI Receipt. On top of that, the People space adds the views a workforce team
            actually works in.
          </Body>
          <Grid cols={3} gap="md" style={{ marginTop: '1.5rem' }}>
            <Card
              variant="feature"
              title="Recruiting"
              body="The hiring funnel by stage and source, AI screening consent rates and an AI system register: every automated tool in use, with its audit status."
            />
            <Card
              variant="feature"
              title="Compliance"
              body="Framework status across the jurisdictions you operate in, adverse-impact flags and the compliance packs that document each one."
            />
            <Card
              variant="feature"
              title="People records"
              body="For any person, the AI Receipts and cases that touched them, with full provenance: which sources, roles and policies shaped each one."
            />
          </Grid>
        </Container>
      </Section>

      {/* Frameworks covered */}
      <Section variant="compact">
        <Container>
          <Heading2>Shaped to the frameworks you answer to.</Heading2>
          <Body style={{ marginTop: '1rem' }}>
            Thursdai does not perform your independent audit. It produces the evidence and
            documentation that audit, and your regulators, expect, shaped to each framework.
          </Body>
          <Grid cols={2} gap="md" style={{ marginTop: '1.5rem' }}>
            {FRAMEWORKS.map((f) => (
              <div
                key={f.name}
                style={{
                  border: '1px solid var(--color-border-default)',
                  borderRadius: '2px',
                  background: 'var(--color-surface-primary)',
                  padding: '1rem 1.25rem',
                }}
              >
                <p style={{ fontWeight: 500, fontSize: '15px', color: 'var(--color-text-primary)', margin: 0 }}>
                  {f.name}
                </p>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0.35rem 0 0 0' }}>
                  {f.detail}
                </p>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* The evidence */}
      <Section variant="compact">
        <Container>
          <Heading2>Every decision becomes an AI Receipt.</Heading2>
          <Body style={{ marginTop: '1rem' }}>
            Because each decision is recorded as a signed AI Receipt, with its sources, roles and
            policy state, the People space can bundle those receipts into a compliance pack on
            demand: methodology, population, selection and impact ratios, findings and provenance,
            in a format an auditor accepts.
          </Body>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/product/compliance-packs" style={{ color: 'var(--color-accent)', fontSize: '15px', fontWeight: 500 }}>
              How compliance packs work →
            </Link>
          </div>
        </Container>
      </Section>

      {/* Executive visibility */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Visibility at the executive altitude.</Heading2>
          <ExecutiveDashboard />
        </Container>
      </Section>

      {/* CTA (the page's one ink band) */}
      <Section variant="compact" tone="ink">
        <Container>
          <Heading2>Bring us your hiring AI.</Heading2>
          <Body style={{ marginTop: '0.75rem' }}>
            The demo walks through one hiring decision made by a vendor screening agent: the signed
            receipt, the replay and the audit pack. We are onboarding our first People design
            partners; if you run automated tools in hiring and need to answer for them, request a pilot.
          </Body>
          <ClosingCTAs primary="demo" size="md" style={{ marginTop: '1.5rem' }} />
        </Container>
      </Section>
    </>
  );
}
