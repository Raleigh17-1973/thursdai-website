import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trust & Security — Thursdai',
  description: 'SOC 2, ISO 27001, EU AI Act Annex III readiness, and full deployment transparency.',
};

export default function TrustPage() {
  return (
    <Section>
      <Container>
        <Heading1>Trust &amp; Security</Heading1>
        <Body variant="large">SOC 2, ISO 27001, EU AI Act Annex III readiness, and full deployment transparency.</Body>
      </Container>
    </Section>
  );
}
