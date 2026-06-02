import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers: Thursdai',
  description: 'Open roles at Thursdai.',
};

export default function CareersPage() {
  return (
    <Section>
      <Container>
        <Heading1>Careers</Heading1>
        <Body variant="large">Open roles at Thursdai.</Body>
      </Container>
    </Section>
  );
}
