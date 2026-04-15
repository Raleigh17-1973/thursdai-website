import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team — Thursdai',
  description: 'The people building Thursdai.',
};

export default function TeamPage() {
  return (
    <Section>
      <Container>
        <Heading1>Team</Heading1>
        <Body variant="large">The people building Thursdai.</Body>
      </Container>
    </Section>
  );
}
