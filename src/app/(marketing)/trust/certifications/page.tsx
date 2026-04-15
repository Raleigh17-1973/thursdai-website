import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certifications — Thursdai',
  description: 'Security and compliance certifications.',
};

export default function CertificationsPage() {
  return (
    <Section>
      <Container>
        <Heading1>Certifications</Heading1>
        <Body variant="large">Security and compliance certifications.</Body>
      </Container>
    </Section>
  );
}
