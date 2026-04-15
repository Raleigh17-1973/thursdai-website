import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MCP Server — Thursdai',
  description: 'The Thursdai MCP server: invoke_role, replay_case, dry_run_policy, and more.',
};

export default function McpPage() {
  return (
    <Section>
      <Container>
        <Heading1>MCP Server</Heading1>
        <Body variant="large">The Thursdai MCP server: invoke_role, replay_case, dry_run_policy, and more.</Body>
      </Container>
    </Section>
  );
}
