import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Body } from '@/components/typography/Body';
import { ClosingCTAs } from '@/components/ui/ClosingCTAs';
import { TrustDocument, FactList, QAList } from '@/components/templates/TrustDocument';
import { ClosingBand } from '@/components/templates/ClosingBand';
import { CERT_ROADMAP, auditorText, statusText, targetText } from '@/lib/certifications';

export const metadata: Metadata = {
  title: 'ISO/IEC 42001: Thursdai',
  description:
    'What ISO/IEC 42001, the AI management system standard, is; how it relates to the EU AI Act; and where Thursdai stands: not certified, no auditor engaged yet.',
};

const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

const FAQ = [
  {
    question: 'What is ISO/IEC 42001?',
    answer:
      'ISO/IEC 42001:2023 is the international standard for AI management systems. It sets requirements for establishing, running, maintaining and improving an AI management system inside an organisation.',
  },
  {
    question: 'How does it relate to the EU AI Act?',
    answer:
      'Certification is not required by the EU AI Act, and at the time of writing ISO/IEC 42001 is not a harmonised standard under the Act, so it does not by itself give a presumption of conformity. Much of what it asks for, such as risk management, documentation and oversight, overlaps with the Act, which is why buyers ask about it.',
  },
  {
    question: 'When will Thursdai be certified?',
    answer:
      'There is no date. Certification needs an operating AI management system with enough production history for an accredited body to audit, and no certification body is engaged yet. A date will appear on the certification roadmap once one is.',
  },
  {
    question: "Can I rely on Thursdai's certification for my own program?",
    answer:
      "Once Thursdai is certified, the certificate will cover Thursdai's own AI management system. Your organisation would still need its own; ours would support your effort, not replace it.",
  },
];

export default function Iso42001Page() {
  const row = CERT_ROADMAP.find((r) => r.name === 'ISO/IEC 42001');
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <TrustDocument
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Trust', href: '/trust' },
          { label: 'ISO/IEC 42001' },
        ]}
        label="ISO/IEC 42001"
        title="Not certified yet. Here is where we stand."
        lead="ISO/IEC 42001 is the international standard for AI management systems. Thursdai does not hold it. This page explains what the standard is, why it matters to buyers and what has to happen before we can be audited against it."
        meta={
          row
            ? [
                { label: 'Status', value: statusText(row.status, row.targetQuarter) },
                { label: 'Auditor engaged', value: auditorText(row.auditorEngaged) },
                { label: 'Target', value: targetText(row) },
              ]
            : undefined
        }
        sections={[
          {
            id: 'position',
            title: 'Where we stand',
            body: (
              <>
                <Body>
                  The formal certification process has not started and there is no target date.
                  Certification needs an operating AI management system that an accredited body can
                  audit against real production history.
                </Body>
                <Body>
                  We would rather earn it on real deployments than publish a date we cannot stand
                  behind. When a certification body is engaged, it will be named here and on the{' '}
                  <Link href="/trust#certifications" style={UNDERLINED}>
                    certification roadmap
                  </Link>
                  .
                </Body>
              </>
            ),
          },
          {
            id: 'why',
            title: 'Why it matters',
            body: (
              <FactList
                items={[
                  {
                    term: 'Scope',
                    body: 'It is the first international standard written for AI management systems, covering risk, transparency, human oversight and the lifecycle of AI systems rather than information security alone.',
                  },
                  {
                    term: 'Assurance',
                    body: 'A certificate means an accredited third party has audited how an organisation manages AI, rather than the organisation attesting to it.',
                  },
                  {
                    term: 'Limits',
                    body: 'It certifies a management system, not that any single AI decision was right.',
                  },
                ]}
              />
            ),
          },
          {
            id: 'faq',
            title: 'Questions',
            body: <QAList items={FAQ} />,
          },
        ]}
        close={
          <ClosingBand
            heading="Judge the record, not the badge."
            body="Until there is a certificate, the evidence is the product itself. A pilot puts signed receipts on one of your own AI systems."
            actions={<ClosingCTAs primary="pilot" />}
          />
        }
      />
    </>
  );
}
