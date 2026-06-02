import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SDK: Thursdai',
  description: 'TypeScript and Python SDKs for integrating Thursdai.',
};

export default function SdkPage() {
  return (
    <Section>
      <Container>
        <Heading1>SDK</Heading1>
        <Body variant="large">TypeScript and Python SDKs for integrating Thursdai.</Body>
      </Container>
    </Section>
  );
}
