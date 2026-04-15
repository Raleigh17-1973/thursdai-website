import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moderator — Thursdai',
  description: 'Role-based answer panels that reconcile across Legal, Finance, and Engineering.',
};

export default function ModeratorPage() {
  return (
    <Section>
      <Container>
        <Heading1>Moderator</Heading1>
        <Body variant="large">Role-based answer panels that reconcile across Legal, Finance, and Engineering.</Body>
      </Container>
    </Section>
  );
}
