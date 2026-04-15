import type { Metadata } from 'next';
import { getApprovedCaseStudies } from '@/lib/velite';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body, Label } from '@/components/typography';

export const metadata: Metadata = {
  title: 'Customers — Thursdai',
  description: 'How regulated enterprises use Thursdai to govern AI agent decisions.',
};

export default async function CustomersPage() {
  const studies = await getApprovedCaseStudies();
  return (
    <Section>
      <Container>
        <Label>Customers</Label>
        <Heading1>Governed AI in production</Heading1>
        {studies.length === 0 ? (
          <Body>Case studies coming soon.</Body>
        ) : (
          <div>{/* case study grid — built in Week 7 */}</div>
        )}
      </Container>
    </Section>
  );
}
