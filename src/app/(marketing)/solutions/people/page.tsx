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
  description: `For HR and talent acquisition leaders whose hiring tools use AI: a signed ${RECEIPT_TERM} for each hiring decision routed to Thursdai, and a four-fifths impact-ratio dashboard for NYC Local Law 144 work.`,
};

const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

// Only list a framework when the product does something real for it today. Other framework
// reports (EEO-1, pay transparency, OFCCP and the rest) are stubs and must not appear here.
const FRAMEWORKS = [
  {
    name: 'NYC Local Law 144',
    detail: 'A four-fifths impact-ratio dashboard on live HR data. The independent audit and the public summary remain yours.',
  },
  {
    name: 'EU AI Act, Articles 12 and 26',
    detail: 'Thursdai records decisions that deployers can use as evidence for their own log-keeping work.',
  },
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
          interview tools use AI. Thursdai writes a signed {RECEIPT_TERM} for each hiring decision
          those tools route to it, including vendor tools. A four-fifths impact-ratio dashboard
          supports Local Law 144 work.
        </>
      }
      problem={
        <>
          In New York City, an automated employment decision tool needs an independent bias audit
          in the year before use, a public summary of the results and notice to candidates. Civil
          penalties are{' '}
          <a href={NYC_LL144_URL} rel="noopener noreferrer" target="_blank" style={UNDERLINED}>
            up to $500 for a first violation and $500 to $1,500 for each later one
            <span className="sr-only"> (Local Law 144, opens in a new tab)</span>
          </a>
          , and each day of use can count separately. Confirm the details with your counsel. Under the EU AI Act, AI that screens or evaluates candidates is high-risk, and the
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
            signed, so an edit after the fact is detectable.
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
              <Heading2 style={{ marginTop: '1rem' }}>What it does for the rules you answer to.</Heading2>
            </div>
            <Body className="lg:col-span-5 lg:self-end">
              Thursdai does not perform your independent audit. Other framework reports are in
              development.
            </Body>
          </div>
          <RecordTable
            style={{ marginTop: '3rem' }}
            caption="Frameworks and what Thursdai provides for each"
            columns={[
              { key: 'name', label: 'Framework', width: '40%' },
              { key: 'detail', label: 'What Thursdai provides' },
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
              A sample of the view for the people who sign off: each automated tool in the hiring
              funnel, its audit status and its policy results.
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
