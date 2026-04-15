import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deployment Options — Thursdai',
  description: 'SaaS, dedicated single-tenant, VPC, and on-premises deployment options.',
};

export default function DeploymentPage() {
  return (
    <Section>
      <Container>
        <Heading1>Deployment Options</Heading1>
        <Body variant="large">SaaS, dedicated single-tenant, VPC, and on-premises deployment options.</Body>
      </Container>
    </Section>
  );
}
