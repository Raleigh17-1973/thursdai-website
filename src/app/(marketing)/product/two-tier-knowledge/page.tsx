import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Two-Tier Knowledge — Thursdai',
  description: 'Standard corpus and isolated tenant knowledge, never mixed.',
};

export default function TwoTierKnowledgePage() {
  return (
    <Section>
      <Container>
        <Heading1>Two-Tier Knowledge</Heading1>
        <Body variant="large">Standard corpus and isolated tenant knowledge, never mixed.</Body>
      </Container>
    </Section>
  );
}
