import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Heading1, Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Solutions: Thursdai',
  description:
    'Thursdai spaces put the governed agent substrate to work in a specific domain. People is our first space: AI governance for hiring and workforce decisions.',
};

export default function SolutionsPage() {
  return (
    <>
      <Section>
        <Container>
          <Label>Solutions</Label>
          <Heading1 style={{ marginTop: '0.75rem' }}>Governed AI, shaped to the work.</Heading1>
          <Body variant="large" style={{ marginTop: '1rem' }}>
            The five pillars are the substrate. A space puts them to work in a specific domain:
            the roles, the policies, the frameworks and the evidence a team in that domain actually
            needs. People is our first space.
          </Body>
        </Container>
      </Section>

      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Grid cols={3} gap="md">
            <Card
              variant="feature"
              title="People"
              body="AI governance for hiring and workforce decisions. Bias-audit evidence, an AI system register and a compliance pack for every framework an HR team answers to."
              href="/solutions/people"
              className="h-full"
            />
          </Grid>
          <Body variant="small" style={{ marginTop: '1.5rem', color: 'var(--color-text-tertiary)' }}>
            More spaces are coming. We are building the next ones with design partners and will
            list them here as they are ready.
          </Body>
        </Container>
      </Section>

      <Section variant="compact">
        <Container>
          <Heading2>Built on the same substrate.</Heading2>
          <Body style={{ maxWidth: '680px', marginTop: '1rem' }}>
            Every space inherits role-based moderation, decision replay, policy-as-code, isolated
            tenant knowledge and signed compliance packs. The substrate does not change from one
            space to the next. What changes is the domain: the roles that deliberate, the policies
            that apply and the frameworks the evidence is shaped to.
          </Body>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/product" style={{ color: 'var(--color-accent)', fontSize: '15px', fontWeight: 600 }}>
              See how the substrate works →
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
