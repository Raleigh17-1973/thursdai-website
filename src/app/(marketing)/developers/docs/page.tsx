import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation: Thursdai',
  description: 'Getting started guides, reference docs and deployment guides.',
};

export default function DocsPage() {
  return (
    <Section>
      <Container>
        <Heading1>Documentation</Heading1>
        <Body variant="large">Getting started guides, reference docs and deployment guides.</Body>
      </Container>
    </Section>
  );
}
