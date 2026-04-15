import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company — Thursdai',
  description: 'About Thursdai.',
};

export default function CompanyPage() {
  return (
    <Section>
      <Container>
        <Heading1>Company</Heading1>
        <Body variant="large">About Thursdai.</Body>
      </Container>
    </Section>
  );
}
