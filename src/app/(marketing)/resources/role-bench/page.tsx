import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Role Bench — Thursdai',
  description: 'Benchmark comparing AI agent accuracy across roles and domains.',
};

export default function RoleBenchPage() {
  return (
    <Section>
      <Container>
        <Heading1>Role Bench</Heading1>
        <Body variant="large">Benchmark comparing AI agent accuracy across roles and domains.</Body>
      </Container>
    </Section>
  );
}
