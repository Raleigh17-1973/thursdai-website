import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Heading1, Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { LABEL_STYLE } from '@/components/typography/scale';
import { ButtonLink } from '@/components/ui/Button';
import { ClosingBand } from '@/components/templates/ClosingBand';
import { FactList } from '@/components/templates/TrustDocument';
import { CONTACT_EMAIL, RECEIPT_TERM } from '@/config/site';
import { EU_AI_ACT_URL } from '@/config/sources';

export const metadata: Metadata = {
  title: 'Company: Thursdai',
  description: `Thursdai records the decisions AI systems make and signs each one as an ${RECEIPT_TERM}. Founded in 2026 by Jeff Hoyt after building agents he could not explain.`,
};

const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

const LINKS = [
  { href: '/customers', label: 'Design partners', body: 'The terms of the program, who it is for and how to apply.' },
  { href: '/company/team', label: 'Team', body: 'The founder, how Thursdai got here and how to reach him.' },
  { href: '/trust', label: 'Trust', body: 'Where security and certification stand today, without the badges.' },
];

export default function CompanyPage() {
  return (
    <>
      {/* ── Founder story ── */}
      <Section variant="compact">
        <Container>
          <Label>Company</Label>
          <Heading1 style={{ marginTop: '1rem' }}>Built because I couldn&apos;t see what my own agents were doing.</Heading1>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8" style={{ marginTop: '2.5rem' }}>
            <div className="lg:col-span-8 flex flex-col gap-5">
              <Body variant="large">
                I&apos;m Jeff Hoyt. In February 2026 I was laid off, and for the first time in years I
                had the time to build something I had been thinking about for a long while: a
                business operations agent. I started with program and project management, the
                domain I know best, and HR, which my wife knows inside out.
              </Body>
              <Body>
                The further I got, the more I ran into the same wall: I had no idea how my own agents
                were arriving at their answers. So I built a case object, a place where agents could
                work together and leave evidence of how they reached their work product. That case
                object turned out to be the most interesting thing I had built.
              </Body>
              <Body>
                Around the same time, AI regulation started to land, and it clicked. The hard problem
                is not building agents that do things. It is proving what they did and why. Plenty
                of companies build operations agents; very few were building the record. So I
                pivoted, and Thursdai became what it is today.
              </Body>
            </div>
            <aside
              className="lg:col-start-10 lg:col-span-3 lg:self-end"
              style={{ borderTop: '1px solid var(--ink)', paddingTop: '1.25rem', marginTop: '2.5rem' }}
            >
              <Label as="p">Founder</Label>
              <p className="m-0" style={{ marginTop: '0.75rem', fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--ink)' }}>
                Jeff Hoyt
              </p>
              <Link href="/company/team" className="inline-block" style={{ ...UNDERLINED, marginTop: '0.5rem', fontSize: '15px' }}>
                The longer story
              </Link>
            </aside>
          </div>
        </Container>
      </Section>

      {/* ── What we are, and are not ── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
            <div className="lg:col-span-7">
              <Label as="p">What we build</Label>
              <Heading2 style={{ marginTop: '1rem' }}>A record of what your AI decided.</Heading2>
            </div>
            <Body className="lg:col-span-5 lg:self-end">
              Thursdai sits beside the AI systems you already run, your own and your vendors&apos;,
              and writes a signed {RECEIPT_TERM} for each decision they make: the answer, the policy
              it ran under, the evidence it used and the person who reviewed it.
            </Body>
          </div>
          <div style={{ marginTop: '3rem' }}>
            <FactList
              items={[
                { term: 'An evidence layer', body: 'Each receipt is signed and verifiable by anyone, without an account.' },
                { term: 'Not a chatbot', body: 'If you need a general assistant, Copilot or ChatGPT will serve you better.' },
                { term: 'Not an auditor', body: 'Thursdai does not certify your systems. A receipt is proof of what happened, not that it was right.' },
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* ── Why now ── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
            <div className="lg:col-span-7">
              <Label as="p">Why now</Label>
              <Heading2 style={{ marginTop: '1rem' }}>The rules arrived before the records.</Heading2>
            </div>
            <Body className="lg:col-span-5 lg:self-end">
              Firms put AI into hiring, lending and insurance decisions faster than they built ways
              to show how those decisions were made. The{' '}
              <a href={EU_AI_ACT_URL} rel="noopener noreferrer" target="_blank" style={UNDERLINED}>
                EU AI Act
                <span className="sr-only"> (opens in a new tab)</span>
              </a>{' '}
              now treats those uses as high-risk and asks deployers to keep the logs; New York City
              already requires bias audits of automated hiring tools. The record has to exist before
              anyone asks for it.
            </Body>
          </div>
        </Container>
      </Section>

      {/* ── Design partners: honest, non-numeric ── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
            <div className="lg:col-span-7">
              <Label as="p">Design partners</Label>
              <Heading2 style={{ marginTop: '1rem' }}>Open to teams that answer for AI decisions.</Heading2>
            </div>
            <div className="lg:col-span-5 lg:self-end">
              <Body>
                The design partner program is open to teams in financial services, healthcare,
                legal and other regulated work where the cost of an unexplained AI decision is
                highest. Partners run Thursdai on their own systems and work directly with me.
              </Body>
              <div style={{ marginTop: '1.5rem' }}>
                <ButtonLink href="/customers" variant="primary" size="lg">
                  Become a design partner
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Elsewhere in the company ── */}
      <Section>
        <Container>
          <ul className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-3 gap-8">
            {LINKS.map((l) => (
              <li key={l.href} style={{ borderTop: '1px solid var(--ink)', paddingTop: '1.25rem' }}>
                <Link href={l.href} style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--ink)' }}>
                  {l.label}
                </Link>
                <Body variant="small" style={{ marginTop: '0.5rem' }}>
                  {l.body}
                </Body>
              </li>
            ))}
            <li className="md:col-span-3" style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.25rem' }}>
              <p className="m-0" style={{ ...LABEL_STYLE }}>
                Press and media
              </p>
              <Body variant="small" style={{ marginTop: '0.5rem' }}>
                For press enquiries or an interview, email{' '}
                <a href={`mailto:${CONTACT_EMAIL}?subject=Press`} style={UNDERLINED}>
                  {CONTACT_EMAIL}
                </a>
                .
              </Body>
            </li>
          </ul>
        </Container>
      </Section>

      <ClosingBand
        heading="Put your hardest AI decision on the record."
        body="Design partners get a pilot tenant, receipts on their own AI systems and a direct line to the founder."
        actions={
          <ButtonLink href="/customers" variant="primary" size="lg">
            Become a design partner
          </ButtonLink>
        }
      />
    </>
  );
}
