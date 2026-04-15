import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press — Thursdai',
  description: 'Press kit, media coverage, and company announcements.',
};

export default function PressPage() {
  return (
    <Section>
      <Container>
        <Heading1>Press</Heading1>
        <Body variant="large">Press kit, media coverage, and company announcements.</Body>
      </Container>
    </Section>
  );
}
