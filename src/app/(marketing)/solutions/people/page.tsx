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
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Breadcrumb } from '@/components/nav/Breadcrumb';
import { ExecutiveDashboard } from '@/components/demos/ExecutiveDashboard';

export const metadata: Metadata = {
  title: 'People: Thursdai',
  description:
    'AI governance for hiring and workforce decisions. Thursdai produces the bias-audit evidence, AI system register and compliance documentation that regulated employers need under NYC Local Law 144 and the EU AI Act.',
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
      {/* Hero — lead with the obligation, not the feature */}
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
            under the EU AI Act. The People space governs those decisions and produces the evidence
            you need to answer for them.
          </Body>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="mailto:thursdai@getthursdai.com">
              <Button variant="primary" size="lg">Talk to us about a pilot</Button>
            </Link>
            <Link href="/product/compliance-packs">
              <Button variant="secondary" size="lg">See the evidence it produces</Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* The problem */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
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
            replayable decision. On top of that, the People space adds the views a workforce team
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
              body="For any person, the AI decisions and cases that touched them, with full provenance: which sources, roles and policies shaped each one."
            />
          </Grid>
        </Container>
      </Section>

      {/* Frameworks covered */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
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
                  borderRadius: '12px',
                  background: 'var(--color-surface-primary)',
                  padding: '1rem 1.25rem',
                }}
              >
                <p style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-text-primary)', margin: 0 }}>
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
          <Heading2>Every decision becomes evidence.</Heading2>
          <Body style={{ marginTop: '1rem' }}>
            Because each decision is recorded with its sources, roles and policy state, the People
            space can produce a signed compliance pack on demand: methodology, population, selection
            and impact ratios, findings and provenance, in a format an auditor accepts.
          </Body>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/product/compliance-packs" style={{ color: 'var(--color-accent)', fontSize: '15px', fontWeight: 600 }}>
              How compliance packs work →
            </Link>
          </div>
        </Container>
      </Section>

      {/* Executive visibility */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Visibility at the executive altitude.</Heading2>
          <ExecutiveDashboard />
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="compact">
        <Container>
          <Callout variant="info" title="Bring us your hiring AI.">
            We are onboarding our first People design partners. If you run automated tools in hiring
            and need to answer for them, we would like to work with you. Reach us at{' '}
            <a href="mailto:thursdai@getthursdai.com" style={{ color: 'var(--color-accent)' }}>
              thursdai@getthursdai.com
            </a>
            .
          </Callout>
        </Container>
      </Section>
    </>
  );
}
