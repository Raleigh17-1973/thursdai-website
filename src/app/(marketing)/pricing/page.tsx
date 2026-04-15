import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Display } from '@/components/typography/Display';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { DealDesigner } from '@/components/demos/DealDesigner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — Thursdai',
  description: 'Published pricing. Platform fee, credits, and outcome units.',
};

export default function PricingPage() {
  return (
    <>
      <Section>
        <Container>
          <Label>Pricing</Label>
          <Display>Published pricing. Tuned to outcome.</Display>
          <Body variant="large">
            Three components. All published. Design your deal below.
          </Body>
        </Container>
      </Section>
      <Section variant="compact">
        <Container>
          <DealDesigner />
        </Container>
      </Section>
    </>
  );
}
