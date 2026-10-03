import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { H2_STYLE, LABEL_STYLE } from '@/components/typography/scale';
import { HeroCTAs } from '@/components/ui/HeroCTAs';
import { ClosingCTAs } from '@/components/ui/ClosingCTAs';
import { ClosingBand } from '@/components/templates/ClosingBand';
import { RECEIPT_TERM } from '@/config/site';

export const metadata: Metadata = {
  title: 'Solutions: Thursdai',
  description: `Thursdai for compliance and risk teams and for HR and People teams: a signed ${RECEIPT_TERM} for each AI decision they route to it.`,
};

const SOLUTIONS = [
  {
    href: '/solutions/compliance',
    number: '01',
    label: 'Compliance and risk',
    title: 'For compliance and risk',
    body: 'For compliance, risk and internal audit teams at firms that use AI in hiring, credit or insurance. A signed record of each decision, which is raw material for EU AI Act deployer log-keeping.',
    cta: 'See compliance and risk',
  },
  {
    href: '/solutions/people',
    number: '02',
    label: 'HR and People',
    title: 'For HR and People',
    body: 'For HR and talent acquisition leaders whose hiring tools use AI. A receipt for each screening decision routed to Thursdai and a four-fifths impact-ratio dashboard for Local Law 144 work.',
    cta: 'See HR and People',
  },
] as const;

export default function SolutionsPage() {
  return (
    <>
      <Section variant="compact">
        <Container>
          <Label>Solutions</Label>
          <Heading1 style={{ marginTop: '1rem' }}>Two teams answer for AI decisions.</Heading1>
          <Body variant="large" style={{ marginTop: '1.5rem' }}>
            Compliance and risk teams answer to examiners. HR and People teams answer to candidates,
            auditors and regulators. Both need the same thing: a signed {RECEIPT_TERM} for each
            decision their AI systems make.
          </Body>
          <div style={{ marginTop: '2.5rem' }}>
            <HeroCTAs />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          {/* Two cards in the serif: each is a ruled column, and the whole card is the link */}
          <ul className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-2 gap-8">
            {SOLUTIONS.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col no-underline hover:no-underline rounded-[2px]"
                  style={{ border: '1px solid var(--ink)', padding: '2rem', color: 'var(--ink)' }}
                >
                  <span style={{ ...LABEL_STYLE, display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <span>{s.label}</span>
                    <span style={{ color: 'var(--ink-3)' }}>{s.number}</span>
                  </span>
                  <h2 style={{ ...H2_STYLE, marginTop: '2.5rem' }}>{s.title}</h2>
                  <p
                    className="m-0"
                    style={{ marginTop: '1.25rem', fontSize: '17px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}
                  >
                    {s.body}
                  </p>
                  <span
                    className="mt-auto pt-8 group-hover:underline"
                    style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-accent)', textUnderlineOffset: '4px' }}
                  >
                    {s.cta} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
            <div className="lg:col-span-7">
              <Label as="p">One record underneath</Label>
              <Heading2 style={{ marginTop: '1rem' }}>Same receipt, different questions.</Heading2>
            </div>
            <Body className="lg:col-span-5 lg:self-end">
              Both solutions run on the same product: receipts, replay, compliance packs and policy
              as code. What changes is the policies you check and who reads the record.{' '}
              <Link href="/product" style={{ textDecoration: 'underline', textDecorationThickness: '1px' }}>
                See the product
              </Link>
              .
            </Body>
          </div>
        </Container>
      </Section>

      <ClosingBand
        heading="See one decision on the record."
        body="The demo follows one hiring decision from a vendor screening agent: the signed receipt, the replay and the audit pack, with no login."
        actions={<ClosingCTAs primary="demo" />}
      />
    </>
  );
}
