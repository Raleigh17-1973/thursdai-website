import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EU AI Act Annex III — Thursdai',
  description: 'How Thursdai maps to every EU AI Act Annex III obligation.',
};

export default function AnnexIiiPage() {
  return (
    <Section>
      <Container>
        <Heading1>EU AI Act Annex III</Heading1>
        <Body variant="large">How Thursdai maps to every EU AI Act Annex III obligation.</Body>
      </Container>
    </Section>
  );
}
