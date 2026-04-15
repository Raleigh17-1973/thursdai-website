import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ambient Cases — Thursdai',
  description: 'Background case files that populate automatically from your event streams.',
};

export default function AmbientCasesPage() {
  return (
    <Section>
      <Container>
        <Heading1>Ambient Cases</Heading1>
        <Body variant="large">Background case files that populate automatically from your event streams.</Body>
      </Container>
    </Section>
  );
}
