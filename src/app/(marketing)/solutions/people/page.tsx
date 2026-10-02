import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { SolutionTemplate } from '@/components/templates/SolutionTemplate';
import { RecordTable } from '@/components/templates/RecordTable';
import { ExecutiveDashboard } from '@/components/demos/ExecutiveDashboard';
import { RECEIPT_TERM } from '@/config/site';
import { EU_AI_ACT_URL, NYC_LL144_URL } from '@/config/sources';

export const metadata: Metadata = {
  title: 'HR and People: Thursdai',
  description: `For HR and talent acquisition leaders whose hiring tools use AI: a signed ${RECEIPT_TERM} for every hiring decision and the evidence NYC Local Law 144 bias audits and the EU AI Act ask for.`,
};

const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

// Frameworks the People space shapes evidence to. These are frameworks the product supports;
// do not list ones it does not.
const FRAMEWORKS = [
  { name: 'NYC Local Law 144', detail: 'Evidence for the independent bias audit and the public summary the law requires.' },
  { name: 'EU AI Act, Article 26', detail: 'Deployer obligations for high-risk employment systems, including log keeping.' },
  { name: 'EU Pay Transparency Directive 2023/970', detail: 'Evidence for pay-gap reporting.' },
  { name: 'EEOC EEO-1', detail: 'Workforce demographic reporting.' },
  { name: 'ISO 30414', detail: 'Human capital reporting metrics.' },
];

export default function PeopleSolutionPage() {
  return (
    <SolutionTemplate
      crumb="HR and People"
      label="Solutions / HR and People"
      title="Your hiring AI is a regulated system."
      buyerLine={
        <>
          For HR, talent acquisition and people analytics leaders whose screening, ranking or
          interview tools use AI. Thursdai writes a signed {RECEIPT_TERM} for every hiring decision
          those tools make, including vendor tools, and bundles them into the evidence your
          auditors ask for.
        </>
      }
      problem={
        <>
          In New York City, an automated employment decision tool needs an independent bias audit
          in the year before use, a public summary of the results and notice to candidates, with{' '}
          <a href={NYC_LL144_URL} rel="noopener noreferrer" target="_blank" style={UNDERLINED}>
            penalties of up to $1,500 per violation
            <span className="sr-only"> (Local Law 144, opens in a new tab)</span>
          </a>
          . Under the EU AI Act, AI that screens or evaluates candidates is high-risk, and the
          employer that deploys it must keep its logs for at least six months.
        </>
      }
      sources={[
        { label: 'NYC Local Law 144: rules and FAQ', href: NYC_LL144_URL },
        { label: 'EU AI Act, Annex III point 4: employment', href: EU_AI_ACT_URL },
        { label: 'Article 26(6): deployers keep logs six months', href: EU_AI_ACT_URL },
      ]}
      record={{
        heading: 'What a hiring decision leaves behind.',
        intro: (
          <>
            The sample receipt is a vendor screening agent advancing one applicant. Every field is
            signed, so the record cannot be edited after the fact.
          </>
        ),
        items: [
          {
            label: 'Decision',
            body: 'The stage the applicant moved to, against an applicant reference rather than a name.',
          },
          {
            label: 'Notice',
            body: 'A policy confirms the Local Law 144 candidate notice was on file for the requisition.',
          },
          {
            label: 'Evidence',
            body: 'The requisition, the rubric version and a snapshot of the application the tool saw.',
          },
          {
            label: 'Oversight',
            body: 'The reviewer role, such as a recruiting coordinator, and whether they followed the recommendation.',
          },
          {
            label: 'Source',
            body: "The vendor system, the model and its version, even when the tool is someone else's.",
          },
        ],
      }}
      close={{
        heading: 'Bring us your hiring AI.',
        body: (
          <>
            The demo walks through one screening decision made by a vendor agent: the signed
            receipt, the replay and the audit pack. A pilot puts receipts on your own hiring tools.
          </>
        ),
      }}
    >
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
            <div className="lg:col-span-7">
              <Label as="p">Frameworks</Label>
              <Heading2 style={{ marginTop: '1rem' }}>Shaped to the rules you answer to.</Heading2>
            </div>
            <Body className="lg:col-span-5 lg:self-end">
              Thursdai does not perform your independent audit. It produces the evidence that
              audit, and your regulators, expect, shaped to each framework.
            </Body>
          </div>
          <RecordTable
            style={{ marginTop: '3rem' }}
            caption="Frameworks the People space shapes evidence to"
            columns={[
              { key: 'name', label: 'Framework', width: '40%' },
              { key: 'detail', label: 'What the evidence covers' },
            ]}
            rows={FRAMEWORKS.map((f) => ({ id: f.name, name: f.name, detail: f.detail }))}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
            <div className="lg:col-span-7">
              <Label as="p">Oversight</Label>
              <Heading2 style={{ marginTop: '1rem' }}>One view for the people who sign off.</Heading2>
            </div>
            <Body className="lg:col-span-5 lg:self-end">
              Every automated tool in your hiring funnel, its audit status and its policy results,
              drawn from the receipts rather than from a survey.
            </Body>
          </div>
          <div style={{ marginTop: '3rem' }}>
            <ExecutiveDashboard />
          </div>
        </Container>
      </Section>
    </SolutionTemplate>
  );
}
