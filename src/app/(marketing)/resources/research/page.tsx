import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research — Thursdai',
  description: 'Long-form research on governed AI agents for regulated enterprises.',
};

export default function ResearchPage() {
  return (
    <Section>
      <Container>
        <Heading1>Research</Heading1>
        <Body variant="large">Long-form research on governed AI agents for regulated enterprises.</Body>
      </Container>
    </Section>
  );
}
