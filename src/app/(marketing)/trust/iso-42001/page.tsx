import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Timeline } from '@/components/ui/Timeline';
import { Breadcrumb } from '@/components/nav/Breadcrumb';

export const metadata: Metadata = {
  title: 'ISO 42001 Certification — Thursdai',
  description:
    "Thursdai's ISO 42001 AI management system certification roadmap. Current stage, timeline, and what it means for your compliance programme.",
};

// ── Data ───────────────────────────────────────────────────────

interface TimelineItem {
  date: string;
  title: string;
  description?: string;
  status: 'done' | 'current' | 'upcoming';
}

const ISO_TIMELINE: TimelineItem[] = [
  {
    date: 'Q1 2026',
    title: 'Gap analysis completed',
    description: 'Internal assessment against ISO 42001 requirements. 23 gaps identified, 19 resolved.',
    status: 'done',
  },
  {
    date: 'Q2 2026',
    title: 'Stage 1 audit',
    description: 'Documentation review by accredited certification body. Scheduled May 2026.',
    status: 'current',
  },
  {
    date: 'Q3 2026',
    title: 'Stage 2 audit',
    description: 'On-site assessment of AI management system implementation. Scheduled July 2026.',
    status: 'upcoming',
  },
  {
    date: 'Q3 2026',
    title: 'Certification issued',
    description: 'Expected certification by September 2026 pending successful Stage 2 audit.',
    status: 'upcoming',
  },
  {
    date: 'Annual',
    title: 'Surveillance audits',
    description: 'Annual recertification audits to maintain certification status.',
    status: 'upcoming',
  },
];

const ISO_FAQ = [
  {
    question: 'What is ISO 42001?',
    answer:
      'ISO/IEC 42001:2023 is the international standard for AI management systems. It specifies requirements for establishing, implementing, maintaining, and continually improving an artificial intelligence management system within organisations.',
  },
  {
    question: 'How does ISO 42001 relate to the EU AI Act?',
    answer:
      'ISO 42001 certification is not a legal requirement under the EU AI Act, but it demonstrates a structured approach to AI governance that aligns with many Act requirements. It is recognised by regulators as evidence of good AI management practice.',
  },
  {
    question: 'When will Thursdai be certified?',
    answer:
      'We expect to receive ISO 42001 certification in Q3 2026, pending successful Stage 2 audit in July 2026. Status updates are published on this page.',
  },
  {
    question: "Can I use Thursdai's ISO 42001 certification for my own compliance programme?",
    answer:
      "Thursdai's certification covers our AI management system. For customer deployments, you will need your own AI management system — our certification demonstrates that Thursdai as a platform is managed to ISO 42001 standards, which supports but does not replace your organisation's own certification effort.",
  },
  {
    question: 'Which certification body is conducting the audit?',
    answer:
      'We will disclose the certification body name once the audit is confirmed. We are working with an accredited body with experience in AI and technology sector certifications.',
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
            AI management system certification in progress.
          </Heading1>
          <Body variant="large" style={{ maxWidth: '700px' }}>
            ISO 42001 is the international standard for AI management systems. Thursdai is working
            toward certification — this page shows our current stage, timeline, and what it means
            for enterprise buyers.
          </Body>
        </Container>
      </Section>

      {/* Timeline */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2 style={{ marginBottom: '2rem' }}>Certification timeline</Heading2>
          <div style={{ maxWidth: '600px' }}>
            <Timeline items={ISO_TIMELINE} />
          </div>
        </Container>
      </Section>

      {/* Why it matters */}
      <Section variant="default" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container narrow>
          <Heading2>Why ISO 42001 matters</Heading2>
          <Body style={{ marginTop: '1rem' }}>
            ISO 42001 is the first internationally recognised standard specifically for AI management
            systems. Unlike generic information security standards, it addresses the unique governance
            challenges of AI: fairness, transparency, human oversight, and the management of
            AI-specific risks.
          </Body>
          <Body style={{ marginTop: '1rem' }}>
            For regulated enterprises, ISO 42001 certification provides an independent, audited
            baseline that your AI systems are managed according to international best practices. It
            complements — and in some jurisdictions, satisfies — the governance requirements of the
            EU AI Act.
          </Body>
          <Body style={{ marginTop: '1rem' }}>
            For procurement teams, it means Thursdai&apos;s AI management practices have been
            assessed by an accredited third party, not just self-attested.
          </Body>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '2rem' }}>Frequently asked questions</Heading2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
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
