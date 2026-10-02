import React from 'react';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Display } from '@/components/typography/Display';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { LABEL_STYLE } from '@/components/typography/scale';

// Long-form template (docs/design/the-record.md, "Page anatomy" 5): the narrow container,
// a mono metadata line, a Newsreader H1 and Geist body. The 760px column is the measure;
// prose inside it fills it.

interface LongFormProps {
  /** Mono metadata line, joined with middots: category, date, status. */
  meta: string[];
  title: string;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}

export function LongForm({ meta, title, lead, children }: LongFormProps) {
  return (
    <Section variant="compact">
      <Container narrow>
        <p className="m-0" style={LABEL_STYLE}>
          {meta.join(' · ')}
        </p>
        <Display style={{ marginTop: '1.25rem' }}>{title}</Display>
        {lead ? (
          <Body variant="large" style={{ marginTop: '1.5rem' }}>
            {lead}
          </Body>
        ) : null}
        {children}
      </Container>
    </Section>
  );
}

/** A numbered or plain section inside a long-form page, under an ink rule. */
export function LongFormSection({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} style={{ borderTop: '1px solid var(--ink)', paddingTop: '1.5rem', marginTop: '4rem' }}>
      <Heading2>{title}</Heading2>
      <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>{children}</div>
    </section>
  );
}
