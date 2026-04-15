import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Policy-as-Code — Thursdai',
  description: 'Governance rules the model cannot break, expressed in YAML.',
};

export default function PolicyAsCodePage() {
  return (
    <Section>
      <Container>
        <Heading1>Policy-as-Code</Heading1>
        <Body variant="large">Governance rules the model cannot break, expressed in YAML.</Body>
      </Container>
    </Section>
  );
}
