import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Split } from '@/components/layout/Split';
import { Heading1, Heading2, Heading3 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { H2_STYLE, LABEL_STYLE } from '@/components/typography/scale';
import { ButtonLink } from '@/components/ui/Button';
import { ClosingBand } from '@/components/templates/ClosingBand';
import { CONTACT_EMAIL } from '@/config/site';

export const metadata: Metadata = {
  title: 'Team: Thursdai',
  description:
    'Jeff Hoyt founded Thursdai in 2026 after building AI agents he could not explain. The story behind the record, and how to work with him as a design partner.',
};


// ── Name plate ─────────────────────────────────────────────────
// A typographic portrait in place of a headshot: the founder set like the signature block
// of a document. No photo, no illustration of a person. Every field is a plain fact.

const PLATE_FIELDS = [
  { label: 'Founded', value: '2026' },
  { label: 'Previously', value: 'Sprout' },
  { label: 'First build', value: 'A business operations agent' },
  { label: 'Focus', value: 'Decision transparency' },
] as const;

function NamePlate() {
  return (
    <figure
      aria-label="Founder name plate"
      style={{
        margin: 0,
        border: '1px solid var(--ink)',
        borderRadius: '2px',
        background: 'var(--color-surface-primary)',
      }}
    >
      <div
        style={{
          ...LABEL_STYLE,
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '0.875rem 1.5rem',
          borderBottom: '1px solid var(--ink)',
        }}
      >
        <span>Founder</span>
        <span>Thursdai</span>
      </div>
      <div style={{ padding: '2rem 1.5rem 1.5rem' }}>
        <p style={{ ...H2_STYLE, margin: 0 }}>Jeff Hoyt</p>
        <div
          aria-hidden="true"
          style={{ height: '1px', background: 'var(--ink)', marginTop: '1.25rem' }}
        />
        <dl
          style={{
            margin: '1.75rem 0 0',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            columnGap: '1.25rem',
            rowGap: '0.375rem',
          }}
        >
          {PLATE_FIELDS.map((field) => (
            <React.Fragment key={field.label}>
              <dt style={{ ...LABEL_STYLE, color: 'var(--color-text-tertiary)', padding: '0.5rem 0' }}>
                {field.label}
              </dt>
              <dd
                style={{
                  margin: 0,
                  padding: '0.4rem 0.75rem',
                  background: 'var(--sunk)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  lineHeight: 1.5,
                  color: 'var(--color-text-primary)',
                }}
              >
                {field.value}
              </dd>
            </React.Fragment>
          ))}
        </dl>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '0.5rem 1rem',
          padding: '0.875rem 1.5rem',
          borderTop: '1px solid var(--rule)',
        }}
      >
        <span style={LABEL_STYLE}>Contact</span>
        <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
          {CONTACT_EMAIL}
        </a>
      </div>
    </figure>
  );
}

// ── The story ──────────────────────────────────────────────────

const STORY = [
  {
    label: 'Before',
    heading: 'Operations, at Sprout.',
    body: 'Before founding Thursdai I worked at Sprout, and program and project management is the domain I know best. It is a discipline that runs on one habit: being able to say why a decision was made and who made it.',
  },
  {
    label: 'First build',
    heading: 'A business operations agent.',
    body: 'Thursdai began as an agent for running business operations. I started with program and project management, and with HR, which is my wife’s field. Her knowledge of how decisions about people are made informed the early design.',
  },
  {
    label: 'The wall',
    heading: 'I couldn’t see how my agents decided.',
    body: 'The further I got, the more often I hit the same wall. An agent would produce an output and I had no visibility into how it got there. Without that I couldn’t trust the work, let alone defend it to anyone else.',
  },
  {
    label: 'Case object',
    heading: 'Evidence, left behind on purpose.',
    body: 'So I built a case object: a shared place where agents could work together and leave evidence of how they reached their work product. It turned out to be the most interesting thing I had built, and it is where the audit trail and decision replay in Thursdai come from.',
  },
  {
    label: 'The focus',
    heading: 'Decision transparency.',
    body: 'Then AI regulation started to arrive and the point became clear. The hard problem is not building agents that act; it is proving what they did and why. Thursdai now does that one thing: a signed record of each AI decision. Proof of what happened, not that it was right.',
  },
] as const;

export default function TeamPage() {
  return (
    <>
      {/* ── Hero: the founder ── */}
      <Section>
        <Container>
          <Split
            ratio="60/40"
            gap="xl"
            alignItems="start"
            left={
              <div>
                <Label>Team</Label>
                <Heading1 style={{ marginTop: '1rem' }}>
                  It started with an agent I couldn&apos;t explain.
                </Heading1>
                <Body variant="large" style={{ marginTop: '1.5rem' }}>
                  I&apos;m Jeff Hoyt and I founded Thursdai in 2026. I was building AI agents to
                  run business operations and kept hitting the same wall: I couldn&apos;t see how
                  they reached their answers. Thursdai is the record I built for myself, made for
                  teams whose AI decisions carry real consequences.
                </Body>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
                  <ButtonLink href="/customers" variant="primary" size="lg">
                    Become a design partner
                  </ButtonLink>
                  <ButtonLink href={`mailto:${CONTACT_EMAIL}`} variant="secondary" size="lg">
                    Email Jeff
                  </ButtonLink>
                </div>
              </div>
            }
            right={<NamePlate />}
          />
        </Container>
      </Section>

      {/* ── The story, as a ruled record ── */}
      <Section>
        <Container>
          <Label>How Thursdai got here</Label>
          <Heading2 style={{ marginTop: '1rem' }}>From an operations agent to the record.</Heading2>
          <ol
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '2.5rem 0 0',
              borderTop: '1px solid var(--ink)',
            }}
          >
            {STORY.map((step, i) => (
              <li
                key={step.label}
                className="grid grid-cols-1 gap-y-3 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-x-16"
                style={{ borderBottom: '1px solid var(--rule)' }}
              >
                <p style={{ ...LABEL_STYLE, margin: 0, paddingTop: '0.375rem' }}>
                  <span style={{ color: 'var(--color-text-tertiary)', marginRight: '0.75rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {step.label}
                </p>
                <div>
                  <Heading3>{step.heading}</Heading3>
                  <Body style={{ marginTop: '0.75rem' }}>{step.body}</Body>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── Closing band ── */}
      <ClosingBand
        heading="Bring me the decision you can't explain yet."
        body="I'm taking on a small number of design partners: regulated teams putting AI into hiring, lending, insurance or similar decisions. Partners get a pilot tenant, receipts on their own systems and a direct line to me."
        actions={
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <ButtonLink href="/customers" variant="primary" size="lg">
              Become a design partner
            </ButtonLink>
            <ButtonLink href={`mailto:${CONTACT_EMAIL}`} variant="secondary" size="lg">
              Email Jeff
            </ButtonLink>
          </div>
        }
      />
    </>
  );
}
