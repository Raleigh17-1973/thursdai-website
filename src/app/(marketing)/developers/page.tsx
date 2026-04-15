import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developers — Thursdai',
  description: 'Thursdai is infrastructure other agents call. APIs, MCP server, SDK, and docs.',
};

export default function DevelopersPage() {
  return (
    <Section>
      <Container>
        <Heading1>Developers</Heading1>
        <Body variant="large">Thursdai is infrastructure other agents call. APIs, MCP server, SDK, and docs.</Body>
      </Container>
    </Section>
  );
}
