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
    'How regulated enterprises use Thursdai to govern AI agent decisions. Active deployments across financial services, healthcare, and legal.',
};

export default function CustomersPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        <Container>
          <Label>Customers</Label>
          <Heading1 style={{ marginTop: '0.75rem' }}>Real results, from real teams.</Heading1>
          <Body variant="large" style={{ maxWidth: '640px', marginTop: '1rem' }}>
            Here&apos;s what early pilots are delivering:
          </Body>
        </Container>
      </Section>

      {/* ── Anonymised stat cards ── */}
      <Section variant="compact">
        <Container>
          <Body
            variant="small"
            style={{
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--color-text-tertiary)',
              marginBottom: '1.5rem',
            }}
          >
            Early pilot results
          </Body>
          <Grid cols={3} gap="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Card
                variant="stat"
                number="4×"
                label="Faster compliance review"
                sub="A Financial Services Company"
              />
              <p style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', margin: '0.25rem 0 0 0' }}>
                median pilot result
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Card
                variant="stat"
                number="91%"
                label="Policy violation catch rate"
                sub="A Healthcare Organisation"
              />
              <p style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', margin: '0.25rem 0 0 0' }}>
                measured over 90-day pilot
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Card
                variant="stat"
                number="$2.1M"
                label="Avoided in contract risk"
                sub="A Legal Services Firm"
              />
              <p style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', margin: '0.25rem 0 0 0' }}>
                estimated by client legal team
              </p>
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
            <Heading2 style={{ marginTop: '1rem' }}>Become an early design partner</Heading2>
            <Body
              variant="large"
              style={{ maxWidth: '560px', margin: '1rem auto 2rem' }}
            >
              We&apos;re working with a small group of early customers to validate results and
              develop case studies. If you&apos;re seeing AI governance challenges in your
              organisation, we&apos;d like to work with you.
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
