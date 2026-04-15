import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product — Thursdai',
  description: 'The five pillars of the governed agent substrate.',
};

export default function ProductPage() {
  return (
    <Section>
      <Container>
        <Heading1>Product</Heading1>
        <Body variant="large">The five pillars of the governed agent substrate.</Body>
      </Container>
    </Section>
  );
}
