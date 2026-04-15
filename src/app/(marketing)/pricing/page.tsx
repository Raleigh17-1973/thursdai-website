import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — Thursdai',
  description: 'Published pricing. Platform fee, credits, and outcome units.',
};

export default function PricingPage() {
  return (
    <Section>
      <Container>
        <Heading1>Pricing</Heading1>
        <Body variant="large">Published pricing. Platform fee, credits, and outcome units.</Body>
      </Container>
    </Section>
  );
}
