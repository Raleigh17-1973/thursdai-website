import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thursdai vs Glean — Thursdai',
  description: 'A fair comparison: where Glean is strong and where Thursdai differs.',
};

export default function CompareGleanPage() {
  return (
    <Section>
      <Container>
        <Heading1>Thursdai vs Glean</Heading1>
        <Body variant="large">A fair comparison: where Glean is strong and where Thursdai differs.</Body>
      </Container>
    </Section>
  );
}
