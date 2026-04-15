import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Display } from '@/components/typography/Display';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';

export const metadata: Metadata = {
  title: 'Company — Thursdai',
  description: 'The team building Thursdai — the governed agent substrate for regulated enterprises.',
};

export default function CompanyPage() {
  return (
    <>
      <Section variant="default">
        <Container>
          <Label>Our Story</Label>
          <Display>Built by people who felt the pain.</Display>
          <Body variant="large" style={{ maxWidth: '640px', marginTop: '1.5rem' }}>
            Thursdai was founded after watching smart teams make expensive decisions with AI that couldn&apos;t explain itself, couldn&apos;t be audited, and couldn&apos;t be trusted in a regulated environment. We built the product we needed.
          </Body>
        </Container>
      </Section>
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2>Team</Heading2>
          <Body style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
            Founder profiles coming soon. In the meantime, <a href="mailto:hello@thursdai.com" style={{ color: 'var(--color-accent)' }}>reach out directly</a>.
          </Body>
        </Container>
      </Section>
      <Section variant="compact">
        <Container>
          <Heading2>Press &amp; Media</Heading2>
          <Body style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
            For press inquiries, interview requests, or the media kit, email <a href="mailto:press@thursdai.com" style={{ color: 'var(--color-accent)' }}>press@thursdai.com</a>.
          </Body>
        </Container>
      </Section>
    </>
  );
}
