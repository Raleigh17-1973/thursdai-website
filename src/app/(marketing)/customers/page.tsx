import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Heading2, Heading3 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { CaseStudyApplyForm } from '@/components/content/CaseStudyApplyForm';

export const metadata: Metadata = {
  title: 'Design partners: Thursdai',
  description:
    'A small design partner program for regulated teams putting AI into hiring, lending, insurance and other consequential decisions: a pilot tenant, receipts on your own AI systems and a direct line to the founder.',
};

// ── Program terms ──────────────────────────────────────────────
// Every line here is a commitment Thursdai can keep today. No partner names, logos or
// results appear on this page until a partner gives written permission.

interface Term {
  title: string;
  detail: string;
}

interface Clause {
  number: string;
  label: string;
  heading: string;
  intro: string;
  terms: Term[];
}

const CLAUSES: Clause[] = [
  {
    number: '01',
    label: 'Who it is for',
    heading: 'Teams whose AI makes decisions about people.',
    intro:
      'The program is for regulated teams putting AI into hiring, lending, insurance or decisions of similar weight, where someone will eventually ask how a specific outcome was reached.',
    terms: [
      {
        title: 'An AI system that informs real decisions',
        detail:
          'In production or in pilot: screening candidates, assessing credit, pricing or settling claims, or something with the same consequences for the person on the other end.',
      },
      {
        title: 'A named owner',
        detail:
          'Someone in compliance, risk, legal or engineering who is accountable for how that system decides and has time to work with us.',
      },
      {
        title: 'A reason to need evidence',
        detail:
          'EU AI Act Annex III record keeping, fair lending or employment rules, a customer audit or your own internal audit function.',
      },
    ],
  },
  {
    number: '02',
    label: 'What you get',
    heading: 'Receipts on your own systems, not a demo.',
    intro:
      'A partner works with Thursdai on their own AI systems and their own decisions, with the person who built it.',
    terms: [
      {
        title: 'A pilot tenant of your own',
        detail:
          'Set up with you and scoped to the AI systems you choose, rather than a shared sandbox.',
      },
      {
        title: 'AI Receipts on your own AI systems',
        detail:
          'Signed records of what each system decided, the evidence it relied on and the policies it was checked against. Proof of what happened, not that it was right: the judgement stays with your team.',
      },
      {
        title: 'A direct line to the founder',
        detail:
          'You work with Jeff Hoyt, who built Thursdai, rather than a support queue.',
      },
      {
        title: 'Influence on the roadmap',
        detail:
          'Your requirements shape what gets built next, and you see changes as they ship.',
      },
    ],
  },
  {
    number: '03',
    label: 'What we ask',
    heading: 'Feedback, and a reference only if you choose.',
    intro: 'The program works when the feedback is grounded in real use. That is the whole ask.',
    terms: [
      {
        title: 'Connect at least one system',
        detail: 'So that what you tell us comes from receipts on your decisions, not from a slide.',
      },
      {
        title: 'Regular, candid feedback',
        detail:
          'On a cadence that suits you, for example a short call every two weeks. What is missing matters more to us than what works.',
      },
      {
        title: 'A reference, only if you choose',
        detail:
          'If the pilot is useful and you want to say so, we would value a reference. It is your call, and saying no changes nothing about the pilot.',
      },
    ],
  },
  {
    number: '04',
    label: 'What it is not',
    heading: 'No fine print.',
    intro: 'Three things to rule out before you apply.',
    terms: [
      {
        title: 'Not a paid trial in disguise',
        detail:
          'The pilot is not a sales stage with a countdown. Any commercial conversation happens separately and only if you want one.',
      },
      {
        title: 'Nothing published without permission',
        detail:
          'We do not publish your name, logo, quotes or results without your written permission. That is why there are no partner logos on this site.',
      },
      {
        title: 'Not an audit',
        detail:
          'Thursdai is an evidence layer. It records what your AI systems decided and makes that record provable; it does not certify your systems or replace your auditor.',
      },
    ],
  },
];

// Left column: mono clause number and label, like the margin of a printed agreement.
// Right column: the clause itself, prose filling its column.
const clauseGrid = 'grid grid-cols-1 gap-y-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-x-16';

function ClauseSection({ clause }: { clause: Clause }) {
  return (
    <Section variant="compact">
      <Container>
        <div className={clauseGrid}>
          <div>
            <Label as="p" style={{ margin: 0 }}>
              <span style={{ color: 'var(--color-text-tertiary)', marginRight: '0.75rem' }}>{clause.number}</span>
              {clause.label}
            </Label>
          </div>
          <div>
            <Heading2 id={`clause-${clause.number}`}>{clause.heading}</Heading2>
            <Body variant="large" style={{ marginTop: '1.5rem' }}>
              {clause.intro}
            </Body>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '2rem 0 0',
                borderTop: '1px solid var(--color-text-primary)',
              }}
            >
              {clause.terms.map((term) => (
                <li
                  key={term.title}
                  style={{ padding: '1.25rem 0', borderBottom: '1px solid var(--rule)' }}
                >
                  <Heading3>{term.title}</Heading3>
                  <Body style={{ marginTop: '0.5rem' }}>{term.detail}</Body>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default function DesignPartnersPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section>
        <Container>
          <Label>Design partners</Label>
          <Heading1 style={{ marginTop: '1rem' }}>
            Be first on the record.
          </Heading1>
          <Body variant="large" style={{ marginTop: '1.5rem' }}>
            Thursdai is taking on a small number of design partners: regulated teams that need
            to show how their AI reached a decision, not just what it decided. Partners run
            Thursdai on their own systems, work directly with the founder and shape what it
            becomes. This page sets out the terms plainly, including what the program is not.
          </Body>
        </Container>
      </Section>

      {CLAUSES.map((clause) => (
        <ClauseSection key={clause.number} clause={clause} />
      ))}

      {/* ── Apply ── */}
      <Section id="apply" style={{ scrollMarginTop: '80px' }}>
        <Container>
          <div className={clauseGrid}>
            <div>
              <Label as="p" style={{ margin: 0 }}>
                <span style={{ color: 'var(--color-text-tertiary)', marginRight: '0.75rem' }}>05</span>
                Apply
              </Label>
            </div>
            <div>
              <Heading2>Tell us about the decision you would record first.</Heading2>
              <Body style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
                A few lines are enough: the system, the decision it informs and who answers for
                it. Prefer email? Write to{' '}
                <a href="mailto:thursdai@getthursdai.com">thursdai@getthursdai.com</a>.
              </Body>
              <CaseStudyApplyForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
