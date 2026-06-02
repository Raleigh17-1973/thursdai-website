import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Heading1 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Compare — Thursdai',
  description:
    "Side-by-side comparisons between Thursdai and the enterprise AI tools you're evaluating. Where each product is strong, where it isn't.",
};

const COMPARISONS = [
  {
    href: '/compare/glean',
    title: 'Thursdai vs Glean',
    description:
      'Glean is enterprise search. Thursdai is governed decisions. Different tools — but often evaluated together.',
  },
  {
    href: '/compare/microsoft-copilot',
    title: 'Thursdai vs Microsoft Copilot',
    description:
      "Copilot is a productivity layer. Thursdai is a governance layer. Here's where the architectural differences matter.",
  },
  {
    href: '/compare/chatgpt-enterprise',
    title: 'Thursdai vs ChatGPT Enterprise',
    description:
      'ChatGPT Enterprise is a general-purpose AI assistant. Thursdai governs AI decisions in regulated workflows.',
  },
  {
    href: '/compare/moveworks',
    title: 'Thursdai vs Moveworks',
    description:
      'Moveworks automates IT and HR service delivery. Thursdai governs cross-functional decisions with full audit trail.',
  },
  {
    href: '/compare/writer',
    title: 'Thursdai vs Writer',
    description:
      'Writer generates content with brand guardrails. Thursdai governs decisions with policy enforcement and replay.',
  },
  {
    href: '/compare/harvey',
    title: 'Thursdai vs Harvey',
    description:
      'Harvey is AI for lawyers. Thursdai is governance infrastructure across Legal, Finance, and Engineering simultaneously.',
  },
];

export default function ComparePage() {
  return (
    <>
      <Section>
        <Container>
          <Label>Compare</Label>
          <Heading1 style={{ marginTop: '0.75rem' }}>Side by side.</Heading1>
          <Body variant="large" style={{ maxWidth: '600px', marginTop: '1rem' }}>
            Every AI platform has genuine strengths. These comparisons show where each product
            excels — and where Thursdai&apos;s governance layer changes the equation.
          </Body>
        </Container>
      </Section>

      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Grid cols={3} gap="md">
            {COMPARISONS.map((c) => (
              <Card
                key={c.href}
                variant="feature"
                title={c.title}
                body={c.description}
                href={c.href}
                className="h-full"
              />
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  );
}
