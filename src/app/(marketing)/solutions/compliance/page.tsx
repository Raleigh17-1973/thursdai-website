import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { LABEL_STYLE } from '@/components/typography/scale';
import { SolutionTemplate } from '@/components/templates/SolutionTemplate';
import { FactList } from '@/components/templates/TrustDocument';
import { RECEIPT_TERM } from '@/config/site';
import { EU_AI_ACT_URL } from '@/config/sources';

export const metadata: Metadata = {
  title: 'Compliance and risk: Thursdai',
  description: `For compliance, risk and internal audit teams at firms that use AI in hiring, credit or insurance decisions: a signed ${RECEIPT_TERM} for every decision, evidence for EU AI Act deployer obligations and audit packs on demand.`,
};

const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

export default function ComplianceSolutionPage() {
  return (
    <SolutionTemplate
      crumb="Compliance and risk"
      label="Solutions / Compliance and risk"
      title="Your high-risk AI, on the record."
      buyerLine={
        <>
          For compliance, risk and internal audit teams at firms that use AI to decide on hiring,
          credit or insurance. Thursdai writes a signed {RECEIPT_TERM} for each decision your AI
          systems make, so you can show an examiner what happened instead of describing it.
        </>
      }
      problem={
        <>
          The EU AI Act treats AI that screens job applicants, scores creditworthiness or prices
          life and health insurance as high-risk. Deployers must keep the logs those systems
          generate for at least six months, and{' '}
          <a href={EU_AI_ACT_URL} rel="noopener noreferrer" target="_blank" style={UNDERLINED}>
            fines for deployers that miss their obligations reach €15 million or 3% of worldwide
            turnover
            <span className="sr-only"> (Article 99, opens in a new tab)</span>
          </a>
          . Often the output is all a firm can show: not the policy it ran under, the evidence it
          used or the person who reviewed it.
        </>
      }
      sources={[
        { label: 'EU AI Act, Annex III: high-risk uses', href: EU_AI_ACT_URL },
        { label: 'Article 26(6): deployers keep logs six months', href: EU_AI_ACT_URL },
        { label: 'Article 99(4): penalties', href: EU_AI_ACT_URL },
      ]}
      record={{
        heading: 'What an examiner can check.',
        intro: (
          <>
            Each receipt is signed when it is recorded and anyone can verify it without an account.
            A question about one decision becomes a document you can hand over.
          </>
        ),
        items: [
          {
            label: 'Decision',
            body: 'What the system decided and about which subject reference, with the system, the model, its version and who operates it.',
          },
          {
            label: 'Policies',
            body: 'Every policy checked at the time, its version and its result, such as a required notice being on file.',
          },
          {
            label: 'Risk',
            body: 'The risk tier and the framework it was assessed under, for example EU AI Act Annex III.',
          },
          {
            label: 'Oversight',
            body: "The human reviewer's role and what they did with the recommendation.",
          },
          {
            label: 'Kept',
            body: 'For as long as your tenant setting says. Six months or more meets the deployer minimum in Article 26(6).',
          },
        ],
      }}
      close={{
        heading: 'Put one decision flow on the record.',
        body: (
          <>
            Open the demo to verify a signed receipt and read the audit pack behind it, with no
            login. A pilot connects one of your own AI systems to your own tenant.
          </>
        ),
      }}
    >
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
            <div className="lg:col-span-7">
              <Label as="p">In your program</Label>
              <Heading2 style={{ marginTop: '1rem' }}>Where it fits, and where it stops.</Heading2>
            </div>
            <Body className="lg:col-span-5 lg:self-end">
              Thursdai is an evidence layer for the AI systems you already run, including vendor
              tools. A receipt is proof of what happened, not that it was right.
            </Body>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12" style={{ marginTop: '3rem' }}>
            <div>
              <h3 style={{ ...LABEL_STYLE, margin: 0, color: 'var(--ink)' }}>
                What it supports
              </h3>
              <div style={{ marginTop: '1rem' }}>
                <FactList
                  items={[
                    {
                      term: 'Log keeping',
                      body: 'An independent, signed record of each decision, kept for your retention period (Article 26(6)).',
                    },
                    {
                      term: 'Monitoring',
                      body: 'Policy results on every decision, so a failed check shows up as it happens rather than at the annual review (Article 26(5)).',
                    },
                    {
                      term: 'Audit packs',
                      body: (
                        <>
                          Receipts for a period bundled into one signed pack for an auditor or
                          examiner.{' '}
                          <Link href="/product/compliance-packs" style={UNDERLINED}>
                            How packs work
                          </Link>
                          .
                        </>
                      ),
                    },
                    {
                      term: 'Replay',
                      body: 'What the system knew, and which rules applied, at the moment it decided.',
                    },
                  ]}
                />
              </div>
            </div>
            <div>
              <h3 style={{ ...LABEL_STYLE, margin: 0, color: 'var(--ink)' }}>
                What it does not do
              </h3>
              <div style={{ marginTop: '1rem' }}>
                <FactList
                  items={[
                    {
                      term: 'Classify',
                      body: 'Whether a system is high-risk is a legal assessment for you and your counsel.',
                    },
                    {
                      term: 'Certify',
                      body: 'Thursdai does not perform conformity assessments, register systems or replace your auditor.',
                    },
                    {
                      term: 'Judge',
                      body: 'A receipt shows what was decided and under which rules, not whether the decision was correct or fair.',
                    },
                  ]}
                />
              </div>
              <Body style={{ marginTop: '1.5rem' }}>
                The article-by-article view is on the{' '}
                <Link href="/trust/annex-iii" style={UNDERLINED}>
                  EU AI Act mapping
                </Link>
                .
              </Body>
            </div>
          </div>
        </Container>
      </Section>
    </SolutionTemplate>
  );
}
