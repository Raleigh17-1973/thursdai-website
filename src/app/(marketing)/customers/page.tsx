import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Heading1, Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CaseStudyApplyForm } from '@/components/content/CaseStudyApplyForm';

export const metadata: Metadata = {
  title: 'Customers — Thursdai',
  description:
    'How regulated enterprises use Thursdai to govern AI agent decisions. Case studies publishing August 2026.',
};

export default function CustomersPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section>
        <Container>
          <Label>Customers</Label>
          <Heading1 style={{ marginTop: '0.75rem' }}>Governed AI in production.</Heading1>
          <Body variant="large" style={{ maxWidth: '640px', marginTop: '1rem' }}>
            Thursdai is deployed at regulated enterprises across financial services, healthcare, and
            legal. Named case studies — with real numbers and customer approval — are publishing in
            August 2026.
          </Body>
        </Container>
      </Section>

      {/* ── Anonymised stat cards ── */}
      <Section variant="compact">
        <Container>
          <Grid cols={3} gap="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Card
                variant="stat"
                number="4×"
                label="Faster compliance review"
                sub="A Financial Services Company"
              />
              <Badge variant="muted" style={{ marginTop: '0.5rem' }}>
                Identity disclosed August 2026
              </Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Card
                variant="stat"
                number="91%"
                label="Policy violation catch rate"
                sub="A Healthcare Organisation"
              />
              <Badge variant="muted" style={{ marginTop: '0.5rem' }}>
                Identity disclosed August 2026
              </Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Card
                variant="stat"
                number="$2.1M"
                label="Avoided in contract risk"
                sub="A Legal Services Firm"
              />
              <Badge variant="muted" style={{ marginTop: '0.5rem' }}>
                Identity disclosed August 2026
              </Badge>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* ── Apply to be featured ── */}
      <Section>
        <Container>
          <div
            style={{
              background: 'var(--color-surface-secondary)',
              border: '1px solid var(--color-border-default)',
              borderRadius: '16px',
              padding: '3rem',
              textAlign: 'center',
              marginTop: '1rem',
            }}
          >
            <Badge variant="teal">Now open</Badge>
            <Heading2 style={{ marginTop: '1rem' }}>Apply to be a launch case study</Heading2>
            <Body
              variant="large"
              style={{ maxWidth: '560px', margin: '1rem auto 2rem' }}
            >
              We&apos;re publishing three named case studies in August 2026 — each with one hard
              number, a technical deployment section, and your team&apos;s quote. If you&apos;re
              using Thursdai and want to be featured, apply below.
            </Body>
            <Body
              variant="small"
              style={{ color: 'var(--color-text-tertiary)', marginBottom: '1.5rem' }}
            >
              Requirements: named customer, one measurable outcome, approval for the &lsquo;What we
              deployed&rsquo; technical section. We write the case study — you approve it before
              publication.
            </Body>
            <CaseStudyApplyForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
