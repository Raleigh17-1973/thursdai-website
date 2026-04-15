import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Handling — Thursdai',
  description: 'How Thursdai stores, processes, and protects your data.',
};

export default function DataPage() {
  return (
    <Section>
      <Container>
        <Heading1>Data Handling</Heading1>
        <Body variant="large">How Thursdai stores, processes, and protects your data.</Body>
      </Container>
    </Section>
  );
}
