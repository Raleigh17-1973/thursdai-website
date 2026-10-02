import React from 'react';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';

interface ClosingBandProps {
  heading: React.ReactNode;
  body: React.ReactNode;
  /** The page's primary action repeated, usually <ClosingCTAs />. */
  actions: React.ReactNode;
}

// The page's one ink band (The Record: ink is used once, for the close). Left-aligned like the
// home close; the heading is a short declarative, the body one or two sentences.
export function ClosingBand({ heading, body, actions }: ClosingBandProps) {
  return (
    <Section tone="ink">
      <Container>
        <Heading2>{heading}</Heading2>
        <Body variant="large" style={{ marginTop: '1.5rem' }}>
          {body}
        </Body>
        <div style={{ marginTop: '2.5rem' }}>{actions}</div>
      </Container>
    </Section>
  );
}
