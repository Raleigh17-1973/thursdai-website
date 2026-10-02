import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Body } from '@/components/typography/Body';
import { ClosingCTAs } from '@/components/ui/ClosingCTAs';
import { TrustDocument, FactList, QAList } from '@/components/templates/TrustDocument';
import { RecordTable } from '@/components/templates/RecordTable';
import { ClosingBand } from '@/components/templates/ClosingBand';
import { RECEIPT_TERM } from '@/config/site';
import { EU_AI_ACT_URL } from '@/config/sources';

export const metadata: Metadata = {
  title: 'EU AI Act mapping for Annex III systems: Thursdai',
  description:
    'The EU AI Act obligations for high-risk AI systems listed in Annex III, article by article: who owns each one and what a Thursdai AI Receipt records for it, including the six month log retention floor for deployers.',
};

const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

// The obligations that apply to high-risk systems, which Annex III lists by use case. Articles
// 9 to 15 are requirements on the system (met by its provider), 16 to 20 are provider duties,
// 26 and 27 are deployer duties; 43, 49, 72 and 73 cover conformity, registration and
// post-market duties. Each row says plainly when Thursdai does not cover it.
const OBLIGATIONS = [
  { article: 'Art. 9', title: 'Risk management system', owner: 'Provider', thursdai: 'Not covered. Policy results and the risk tier on each receipt are inputs to your risk reviews.' },
  { article: 'Art. 10', title: 'Data and data governance', owner: 'Provider', thursdai: 'Not covered. Thursdai does not see training data; each receipt lists the evidence used for that decision.' },
  { article: 'Art. 11', title: 'Technical documentation', owner: 'Provider', thursdai: 'Not covered. Receipts can be cited as examples of the system in operation.' },
  { article: 'Art. 12', title: 'Record-keeping (automatic logging)', owner: 'Provider builds it in', thursdai: `A signed ${RECEIPT_TERM} per decision, recorded at the time and kept outside the system that made it. It complements the system's own logs.` },
  { article: 'Art. 13', title: 'Transparency to deployers', owner: 'Provider', thursdai: 'Each receipt names the system, the operator, the model and its version.' },
  { article: 'Art. 14', title: 'Human oversight', owner: 'Provider designs; deployer assigns', thursdai: "Each receipt records the reviewer's role and what they did with the output." },
  { article: 'Art. 15', title: 'Accuracy, robustness and cybersecurity', owner: 'Provider', thursdai: 'Not covered. Replay shows what the system knew at the time, which helps when a result is questioned.' },
  { article: 'Arts. 16 to 20', title: 'Provider duties: quality management, documentation, logs, corrective action', owner: 'Provider', thursdai: 'Receipts and audit packs are evidence a provider can keep. Thursdai holds no ISO/IEC 42001 certification.' },
  { article: 'Art. 26(1) to (5)', title: 'Use as instructed, assign oversight, monitor', owner: 'Deployer', thursdai: 'Policies check every decision against your rules, and a failed check is on the receipt.' },
  { article: 'Art. 26(6)', title: 'Keep logs for at least six months', owner: 'Deployer', thursdai: 'Receipts are retained for your tenant setting. Six months or more meets the floor; sector rules may require longer.' },
  { article: 'Art. 26(7) and (11)', title: 'Inform workers and the people decisions are about', owner: 'Deployer', thursdai: 'A policy can confirm a required notice was on file before the decision, as the sample receipt does.' },
  { article: 'Art. 27', title: 'Fundamental rights impact assessment', owner: 'Some deployers', thursdai: 'Not covered. Receipts supply real decisions to test the assessment against.' },
  { article: 'Arts. 43 and 49', title: 'Conformity assessment and registration', owner: 'Provider', thursdai: 'Not covered. Thursdai does not perform conformity assessments or register systems.' },
  { article: 'Arts. 72 and 73', title: 'Post-market monitoring and serious incidents', owner: 'Provider', thursdai: 'Receipts are searchable by system, period and policy result, which helps when an incident has to be reconstructed.' },
];

const FAQ = [
  {
    question: 'What is Annex III?',
    answer:
      'Annex III is the list of high-risk use cases in the EU AI Act. It includes AI used in employment, such as screening or evaluating candidates; creditworthiness and credit scoring; risk assessment and pricing in life and health insurance; and uses in education, essential public services, law enforcement, migration and justice. The obligations themselves are in Articles 9 to 27 and the articles that follow.',
  },
  {
    question: 'When do the obligations apply?',
    answer:
      'The Act entered into force on 1 August 2024. Under the Act as adopted, the obligations for high-risk systems listed in Annex III apply from 2 August 2026. The European Commission has proposed, in its digital omnibus package, to delay that date. Until a change is adopted, the date in the Act stands, so check the current text before you plan around it.',
  },
  {
    question: 'How long do deployers have to keep logs?',
    answer:
      'Article 26(6) requires deployers of high-risk systems to keep the logs the system generates, to the extent they are under their control, for a period appropriate to the intended purpose and of at least six months, unless other Union or national law, in particular data protection law, provides otherwise.',
  },
  {
    question: 'Who has to complete a fundamental rights impact assessment?',
    answer:
      'Article 27 applies to deployers that are bodies governed by public law or private entities providing public services, and to deployers of systems used for creditworthiness or credit scoring and for life and health insurance risk assessment and pricing. It is not required of every deployer.',
  },
  {
    question: 'Is Thursdai itself a high-risk AI system?',
    answer:
      'Thursdai does not make the decisions it records; the AI systems you connect do. Whether one of your systems is high-risk depends on its use under Annex III, which is a legal assessment for you and your counsel.',
  },
  {
    question: 'Does a receipt make my system compliant?',
    answer:
      'No. A receipt is proof of what happened, not that it was right. It is evidence that supports several obligations, mainly deployer log keeping and monitoring, but compliance depends on your system, your processes and your provider.',
  },
];

export default function AnnexIiiPage() {
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
          { label: 'EU AI Act mapping' },
        ]}
        label="EU AI Act"
        title="The EU AI Act, article by article."
        lead={
          <>
            Annex III lists the uses of AI the Act treats as high-risk, from hiring to credit to
            insurance. This page sets out the obligations that follow for those systems, who owns
            each one and what a signed {RECEIPT_TERM} records for it, including where Thursdai does not
            help.
          </>
        }
        meta={[
          { label: 'Regulation', value: '(EU) 2024/1689' },
          { label: 'In force', value: '1 August 2024' },
          { label: 'High-risk obligations', value: '2 August 2026, may change' },
        ]}
        sections={[
          {
            id: 'scope',
            title: 'Dates and scope',
            body: (
              <>
                <FactList
                  items={[
                    { term: 'In force', body: 'The Act entered into force on 1 August 2024.' },
                    {
                      term: 'Applies',
                      body: 'Under the Act as adopted, the obligations for high-risk systems listed in Annex III apply from 2 August 2026. The European Commission has proposed, in its digital omnibus package, to delay that date. Until a change is adopted the date in the Act stands; check the current text before you plan around it.',
                    },
                    {
                      term: 'Annex III',
                      body: 'The list of high-risk use cases, including employment, creditworthiness, life and health insurance pricing, education and essential services. Annex III names the uses; the obligations are in the articles below.',
                    },
                    {
                      term: 'Log floor',
                      body: 'Deployers keep the logs a high-risk system generates, where they control them, for at least six months (Article 26(6)). Providers have a matching duty in Article 19.',
                    },
                    {
                      term: 'Penalties',
                      body: 'Up to €15 million or 3% of worldwide annual turnover, whichever is higher, for operators that breach these obligations (Article 99(4)).',
                    },
                  ]}
                />
                <Body variant="small">
                  Source: Regulation (EU) 2024/1689 on{' '}
                  <a href={EU_AI_ACT_URL} rel="noopener noreferrer" target="_blank" style={UNDERLINED}>
                    EUR-Lex
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  . This page is a summary, not legal advice.
                </Body>
              </>
            ),
          },
          {
            id: 'obligations',
            title: 'Obligations for high-risk systems',
            body: (
              <>
                <Body>
                  Most requirements fall on the provider that builds the system; deployers that use
                  it carry their own duties in Article 26. The right-hand column says what a receipt
                  contributes, and says so when the answer is nothing.
                </Body>
                <RecordTable
                  caption="Obligations for high-risk AI systems under the EU AI Act, who owns each one and what Thursdai records for it"
                  columns={[
                    { key: 'title', label: 'Obligation', width: '30%' },
                    { key: 'article', label: 'Article', width: '13%' },
                    { key: 'owner', label: 'Owner', width: '17%' },
                    { key: 'thursdai', label: 'What Thursdai records' },
                  ]}
                  rows={OBLIGATIONS.map((o) => ({
                    id: o.article,
                    title: o.title,
                    article: <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--ink)' }}>{o.article}</span>,
                    owner: o.owner,
                    thursdai: o.thursdai,
                  }))}
                />
              </>
            ),
          },
          {
            id: 'faq',
            title: 'Questions',
            body: <QAList items={FAQ} />,
          },
          {
            id: 'related',
            title: 'Related',
            body: (
              <Body>
                For compliance teams, the{' '}
                <Link href="/solutions/compliance" style={UNDERLINED}>
                  compliance and risk
                </Link>{' '}
                page shows how receipts fit a program. For hiring, see{' '}
                <Link href="/solutions/people" style={UNDERLINED}>
                  HR and People
                </Link>
                . Where Thursdai stands on its own certifications is on the{' '}
                <Link href="/trust#certifications" style={UNDERLINED}>
                  certification roadmap
                </Link>
                .
              </Body>
            ),
          },
        ]}
        close={
          <ClosingBand
            heading="See what a receipt records."
            body="The demo shows one high-risk hiring decision as a signed receipt you can verify, with the replay and the audit pack behind it."
            actions={<ClosingCTAs primary="demo" />}
          />
        }
      />
    </>
  );
}
