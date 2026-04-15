import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Body } from '@/components/typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Time-Travel — Thursdai',
  description: 'Replay any AI decision with the knowledge and policies that were active at the time.',
};

export default function TimeTravelPage() {
  return (
    <Section>
      <Container>
        <Heading1>Time-Travel</Heading1>
        <Body variant="large">Replay any AI decision with the knowledge and policies that were active at the time.</Body>
      </Container>
    </Section>
  );
}
