import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Breadcrumb } from '@/components/nav/Breadcrumb';

export const metadata: Metadata = {
  title: 'ISO 42001 Certification: Thursdai',
  description:
    "Thursdai's plan for ISO 42001 AI management system certification, and what the standard means for your compliance programme.",
};

// ── Data ───────────────────────────────────────────────────────

const ISO_FAQ = [
  {
    question: 'What is ISO 42001?',
    answer:
      'ISO/IEC 42001:2023 is the international standard for AI management systems. It specifies requirements for establishing, implementing, maintaining and continually improving an artificial intelligence management system within organisations.',
  },
  {
    question: 'How does ISO 42001 relate to the EU AI Act?',
    answer:
      'ISO 42001 certification is not a legal requirement under the EU AI Act, but it demonstrates a structured approach to AI governance that aligns with many Act requirements. It is recognised by regulators as evidence of good AI management practice.',
  },
  {
    question: 'When will Thursdai be certified?',
    answer:
      'We do not have a certification date. ISO 42001 certification requires an operational AI management system with enough production history for an accredited body to audit. We will begin the formal process once we have production customers and the operational data the audit requires.',
  },
  {
    question: "Can I use Thursdai's ISO 42001 certification for my own compliance programme?",
    answer:
      "Once we are certified, our certification will cover Thursdai's own AI management system. For customer deployments, you will still need your own AI management system. Our certification will support, but not replace, your organisation's own certification effort.",
  },
  {
    question: 'Have you engaged a certification body?',
    answer:
      'Not yet. When we begin the certification process we will select an accredited body with experience in AI and technology sector certifications, and we will name it here.',
  },
];

// ── Page ───────────────────────────────────────────────────────

export default function Iso42001Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ISO_FAQ.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <Section variant="default">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Trust', href: '/trust' },
              { label: 'ISO 42001' },
            ]}
          />
          <Label style={{ marginTop: '1.5rem', display: 'block' }}>ISO 42001</Label>
          <Heading1 style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            AI management system certification, planned.
          </Heading1>
          <Body variant="large">
            ISO 42001 is the international standard for AI management systems. Certification is on
            our roadmap. This page explains what the standard is and where we stand.
          </Body>
        </Container>
      </Section>

      {/* Where we stand */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container narrow>
          <Heading2>Where we stand</Heading2>
          <Body style={{ marginTop: '1rem' }}>
            We have not started the formal certification process and we do not have a target date.
            ISO 42001 certification requires an operational AI management system that an accredited
            body can audit against real production history.
          </Body>
          <Body style={{ marginTop: '1rem' }}>
            We will begin once we have production customers and the operational data the audit
            requires. We would rather earn the certification on real deployments than publish a date
            we cannot stand behind. When the process starts, we will share the certification body
            and our progress here.
          </Body>
        </Container>
      </Section>

      {/* Why it matters */}
      <Section variant="default">
        <Container narrow>
          <Heading2>Why ISO 42001 matters</Heading2>
          <Body style={{ marginTop: '1rem' }}>
            ISO 42001 is the first internationally recognised standard specifically for AI management
            systems. Unlike generic information security standards, it addresses the unique governance
            challenges of AI: fairness, transparency, human oversight and the management of
            AI-specific risks.
          </Body>
          <Body style={{ marginTop: '1rem' }}>
            For regulated enterprises, ISO 42001 certification provides an independent, audited
            baseline that an AI system is managed according to international best practices. It
            complements, and in some jurisdictions satisfies, the governance requirements of the EU
            AI Act.
          </Body>
          <Body style={{ marginTop: '1rem' }}>
            Once certified, it will mean Thursdai&apos;s AI management practices have been assessed by
            an accredited third party, not just self-attested.
          </Body>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '2rem' }}>Frequently asked questions</Heading2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {ISO_FAQ.map((item, i) => (
              <div key={i}>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {item.question}
                </p>
                <Body>{item.answer}</Body>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
