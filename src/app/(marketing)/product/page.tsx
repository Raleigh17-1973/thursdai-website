import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading2 } from '@/components/typography/Heading';
import { Label } from '@/components/typography/Label';
import { H3_STYLE, LABEL_STYLE } from '@/components/typography/scale';
import { ProductPillar } from '@/components/templates/ProductPillar';
import { ThreeStepsDiagram } from '@/components/diagrams/ThreeStepsDiagram';
import { ReceiptFrame } from '@/components/receipt/ReceiptFrame';
import { SAMPLE_HIRING_RECEIPT_COMPACT } from '@/components/receipt/sample';
import { RECEIPT_TERM, RECEIPT_TERM_PLURAL } from '@/config/site';

export const metadata: Metadata = {
  title: 'Everything that goes on the record: Thursdai',
  description: `Thursdai records the decisions your AI systems make, checks them against your policies and signs each one as an ${RECEIPT_TERM} you can replay, bundle for an auditor and verify.`,
};

// Pillar order is fixed: receipts, replay, packs, policy, knowledge, moderator.
const PILLARS = [
  {
    name: RECEIPT_TERM_PLURAL,
    href: '/product/ai-receipts',
    line: 'One signed record per decision: what was decided, by which system, under which policies and on what evidence.',
  },
  {
    name: 'Time-Travel',
    href: '/product/time-travel',
    line: 'Replay any decision with the knowledge, policies and roles that were live when it was made.',
  },
  {
    name: 'Compliance Packs',
    href: '/product/compliance-packs',
    line: 'Receipts for a framework, period or system, gathered into one signed document for an auditor.',
  },
  {
    name: 'Policy-as-Code',
    href: '/product/policy-as-code',
    line: 'Rules written as code and evaluated at defined points. The result is recorded on the receipt.',
  },
  {
    name: 'Two-Tier Knowledge',
    href: '/product/two-tier-knowledge',
    line: 'A shared standard corpus and a tenant layer separated by row-level security, each source cited by tier.',
  },
  {
    name: 'Moderator',
    href: '/product/moderator',
    line: 'Thursdai’s own role panel. Its answers are recorded like a decision from any other system.',
  },
];

function PillarIndex() {
  return (
    <Section>
      <Container>
        <Label as="p">The parts</Label>
        <Heading2 style={{ marginTop: '1rem' }}>Six parts, one record.</Heading2>
        <ol className="list-none m-0 p-0" style={{ marginTop: '3rem', borderTop: '1px solid var(--ink)' }}>
          {PILLARS.map((p, i) => (
            <li
              key={p.href}
              className="grid grid-cols-[40px_1fr] md:grid-cols-[64px_minmax(0,4fr)_minmax(0,7fr)] gap-x-6 gap-y-2"
              style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--rule)' }}
            >
              <span style={{ ...LABEL_STYLE, color: 'var(--ink-3)', paddingTop: '0.45rem' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="m-0" style={H3_STYLE}>
                <Link href={p.href} style={{ color: 'var(--ink)' }}>
                  {p.name}
                </Link>
              </h3>
              <p
                className="m-0 col-start-2 md:col-start-3"
                style={{ fontSize: '17px', lineHeight: 1.6, color: 'var(--color-text-secondary)', paddingTop: '0.15rem' }}
              >
                {p.line}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export default function ProductPage() {
  return (
    <ProductPillar
      label="Product"
      title="Everything that goes on the record."
      promise={
        <>
          Thursdai records the decisions your AI systems make, checks them against your policies and
          signs each one as an {RECEIPT_TERM} you can replay, bundle for an auditor and verify.
        </>
      }
      visual={<ReceiptFrame {...SAMPLE_HIRING_RECEIPT_COMPACT} style={{ marginLeft: 'auto' }} />}
      diagram={{
        label: 'How it works',
        title: 'Three steps, every decision.',
        body: (
          <>
            Any AI system can send its decision. Thursdai captures it, checks it against your policies
            and signs it. The receipt has the same shape whichever system decided.
          </>
        ),
        figure: <ThreeStepsDiagram />,
      }}
      verify={
        <>
          Every part of the product reads from or adds to the same signed receipts, so there is one
          record to verify, not six.
        </>
      }
      close={{
        title: 'Every AI decision, on the record.',
        body: (
          <>
            Open the demo to verify a signed receipt, replay the decision behind it and download its audit
            pack. No login.
          </>
        ),
      }}
    >
      <PillarIndex />
    </ProductPillar>
  );
}
