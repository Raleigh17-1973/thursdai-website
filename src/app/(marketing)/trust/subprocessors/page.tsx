import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subprocessors — Thursdai',
  description: 'Third-party subprocessors used by Thursdai.',
};

export default function SubprocessorsPage() {
  return (
    <Section>
      <Container>
        <Heading1>Subprocessors</Heading1>
        <Body variant="large">Third-party subprocessors used by Thursdai.</Body>
      </Container>
    </Section>
  );
}
