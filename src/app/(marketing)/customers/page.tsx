import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Badge } from '@/components/ui/Badge';
import { CaseStudyApplyForm } from '@/components/content/CaseStudyApplyForm';

export const metadata: Metadata = {
  title: 'Customers: Thursdai',
  description:
    'We are onboarding our first design partners in regulated industries. Work with us to put governed AI into production and shape the first Thursdai case studies.',
};

export default function CustomersPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        <Container>
          <Label>Customers</Label>
          <Heading1 style={{ marginTop: '0.75rem' }}>Our first design partners.</Heading1>
          <Body variant="large" style={{ marginTop: '1rem' }}>
            We&apos;re working with a small group of regulated enterprises to put governed AI into
            production. Real case studies will live here as those deployments mature.
          </Body>
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
              deployed&rsquo; technical section. We write the case study; you approve it before
              publication.
            </Body>
            <CaseStudyApplyForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
