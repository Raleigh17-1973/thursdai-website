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

export const metadata: Metadata = {
  title: 'AI Receipts: Thursdai',
  description:
    'Thursdai writes an AI Receipt for every AI decision: the answer, the roles that weighed in, the policies that applied and the sources cited, recorded and replayable. The provable record behind every answer.',
};

const ON_A_RECEIPT = [
  { title: 'The answer', detail: 'The exact output the AI produced, captured verbatim.' },
  { title: 'The roles', detail: 'Which roles weighed in and what each one contributed.' },
  { title: 'The policies', detail: 'The policy set that applied at that moment, and what it enforced.' },
  { title: 'The sources', detail: 'Every source cited, with sentence-level attribution and confidence.' },
  { title: 'The knowledge', detail: 'The exact version of the knowledge base active when the decision was made.' },
  { title: 'The moment', detail: 'A timestamped, tamper-evident, signed entry you can return to later.' },
];

export default function AiReceiptsPage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Product', href: '/product' },
              { label: 'AI Receipts' },
            ]}
          />
          <Label style={{ marginTop: '1.5rem', display: 'block' }}>AI Receipts</Label>
          <Display style={{ marginTop: '0.75rem' }}>Every AI decision, on the record.</Display>
          <Body variant="large" style={{ marginTop: '1.5rem' }}>
            Thursdai writes an AI Receipt for every decision your AI makes. Not an expense receipt:
            the provable record of what the AI decided, who weighed in, which policies applied and
            which sources it cited. When someone asks why your AI did what it did, you have the
            receipt.
          </Body>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="mailto:thursdai@getthursdai.com">
              <Button variant="primary" size="lg">Talk to us about a pilot</Button>
            </Link>
            <Link href="/product/compliance-packs">
              <Button variant="secondary" size="lg">Bundle receipts into audit packs</Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* What's on a receipt */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2>What is on an AI Receipt.</Heading2>
          <Body style={{ marginTop: '1rem' }}>
            Every receipt captures the full context of one decision, so it stands on its own months
            or years later.
          </Body>
          <Grid cols={3} gap="md" style={{ marginTop: '1.5rem' }}>
            {ON_A_RECEIPT.map((r) => (
              <div
                key={r.title}
                style={{
                  border: '1px solid var(--color-border-default)',
                  borderRadius: '12px',
                  background: 'var(--color-surface-primary)',
                  padding: '1.1rem 1.25rem',
                }}
              >
                <p style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-text-primary)', margin: 0 }}>
                  {r.title}
                </p>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0.35rem 0 0 0' }}>
                  {r.detail}
                </p>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Receipt to replay to pack */}
      <Section variant="compact">
        <Container>
          <Heading2>From receipt, to replay, to audit pack.</Heading2>
          <Grid cols={3} gap="md" style={{ marginTop: '1.5rem' }}>
            <Card
              variant="feature"
              title="The record"
              body="Each decision becomes a signed AI Receipt the moment it happens. Nothing is reconstructed after the fact."
            />
            <Card
              variant="feature"
              title="Replay it"
              body="Time-Travel lets you reopen any receipt exactly as it was, with the knowledge and policies that were live at the time."
              href="/product/time-travel"
            />
            <Card
              variant="feature"
              title="Bundle it"
              body="Audit packs gather the relevant receipts into a framework-shaped, signed evidence bundle an auditor accepts."
              href="/product/compliance-packs"
            />
          </Grid>
        </Container>
      </Section>

      {/* Honesty */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Callout variant="info" title="What a receipt proves, and what it does not.">
            An AI Receipt proves what happened: what the AI decided and on what basis. It does not
            claim the decision was correct, and it is not a guarantee of compliance. It gives you and
            your auditors the record to judge for yourselves.
          </Callout>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="compact">
        <Container>
          <Heading2>See receipts in a space.</Heading2>
          <Body style={{ marginTop: '0.75rem' }}>
            The People space puts AI Receipts to work on hiring and workforce decisions.
          </Body>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/solutions/people">
              <Button variant="primary" size="md">Explore the People space →</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
