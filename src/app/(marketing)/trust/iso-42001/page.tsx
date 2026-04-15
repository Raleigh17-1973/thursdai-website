import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ISO 42001 Certification — Thursdai',
  description: "Thursdai's ISO 42001 AI management system certification roadmap.",
};

export default function Iso42001Page() {
  return (
    <Section>
      <Container>
        <Heading1>ISO 42001 Certification</Heading1>
        <Body variant="large">{"Thursdai's ISO 42001 AI management system certification roadmap."}</Body>
      </Container>
    </Section>
  );
}
