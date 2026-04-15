import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Display } from '@/components/typography/Display';
import { Label } from '@/components/typography/Label';
import { Body } from '@/components/typography/Body';
import { GradientText } from '@/components/typography/GradientText';

export default function HomePage() {
  return (
    <Section>
      <Container>
        <Label>Enterprise Agent Platform</Label>
        <Display>
          The governed substrate for{' '}
          <GradientText>regulated AI agents</GradientText>
        </Display>
        <Body variant="large">
          Role-based moderation, decision replay, and policy-as-code.
          Built for enterprises where the model cannot be the last line of defence.
        </Body>
      </Container>
    </Section>
  );
}
