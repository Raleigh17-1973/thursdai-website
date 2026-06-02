import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Reference: Thursdai',
  description: 'REST API reference for the Thursdai platform.',
};

export default function ApiPage() {
  return (
    <Section>
      <Container>
        <Heading1>API Reference</Heading1>
        <Body variant="large">REST API reference for the Thursdai platform.</Body>
      </Container>
    </Section>
  );
}
