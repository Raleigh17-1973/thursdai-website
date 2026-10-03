import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Body } from '@/components/typography/Body';
import { ButtonLink } from '@/components/ui/Button';
import { TrustDocument, FactList } from '@/components/templates/TrustDocument';
import { RecordTable } from '@/components/templates/RecordTable';
import { CertRoadmapTable } from '@/components/templates/CertRoadmapTable';
import { ClosingBand } from '@/components/templates/ClosingBand';
import { SUBPROCESSORS } from '@/lib/subprocessors';
import { CONTACT_EMAIL, PUBLIC_KEYS_PATH, PUBLIC_KEYS_URL, RECEIPT_TERM } from '@/config/site';

export const metadata: Metadata = {
  title: 'Security overview: Thursdai',
  description:
    'Technical and procedural security controls for Thursdai: architecture, encryption, data categories, subprocessors, certification status and the security contact, for procurement and compliance teams.',
};

const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

const ARCHITECTURE = [
  { id: 'api', component: 'API server', description: 'Fastify HTTP API: authentication, request routing and approval workflows.' },
  { id: 'worker', component: 'Temporal worker', description: 'Durable workflow execution for long-running approval workflows. Temporal is self-hosted on Railway.' },
  { id: 'db', component: 'Database', description: 'PostgreSQL on Railway: audit events, identities, cases and signed records. Every tenant table has a forced row-level security policy.' },
  { id: 'compliance', component: 'Compliance engine', description: 'Renders and signs report packs.' },
];

const DATA_CATEGORIES = [
  { id: 'decisions', category: 'Governed decisions', description: 'Approval requests, case outcomes and policy evaluations.' },
  { id: 'identity', category: 'Identity data', description: 'Employee names, email addresses, departments and roles.' },
  { id: 'artifacts', category: 'Compliance artifacts', description: 'Signed report packs.' },
  { id: 'audit', category: 'Audit events', description: 'An append-only log of agent actions, human approvals and system events.' },
  { id: 'workflow', category: 'Workflow metadata', description: 'Case status, SLA tracking and assignee history.' },
];

export default function SecurityPage() {
  const mail = `mailto:${CONTACT_EMAIL}?subject=Security`;
  return (
    <TrustDocument
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Trust', href: '/trust' },
        { label: 'Security overview' },
      ]}
      label="Security overview"
      title="Security, in plain terms."
      lead="For security, compliance and procurement teams evaluating Thursdai as a vendor: how it is built, what data it holds, who processes it and where certification stands."
      meta={[{ label: 'Status as of', value: 'October 2026' }]}
      sections={[
        {
          id: 'summary',
          title: 'Summary',
          body: (
            <>
              <Body>
                Thursdai records the decisions AI systems make, including systems it does not
                operate, and signs each one as an {RECEIPT_TERM}. Those decisions carry legal,
                financial and regulatory weight, so security is a requirement of the product rather
                than a feature of it.
              </Body>
              <Body>
                We have not started a SOC 2 engagement. Some controls run today and have not been
                audited: row-level security in the database, KMS signing of records and secret
                scanning in CI.
              </Body>
            </>
          ),
        },
        {
          id: 'architecture',
          title: 'Architecture',
          body: (
            <>
              <Body>
                Thursdai runs on Railway, a managed cloud platform, in one US East region. Today all
                customers share one multi-tenant deployment and one Postgres database. Tenant data
                is separated by row-level security that is forced on every tenant table and enforced
                by the database. Dedicated deployments for individual customers, with
                customer-managed keys, are the model we are building towards: designed and being
                built, not yet offered.
              </Body>
              <RecordTable
                caption="Architecture components"
                columns={[
                  { key: 'component', label: 'Component', width: '28%' },
                  { key: 'description', label: 'What it does' },
                ]}
                rows={ARCHITECTURE}
              />
              <FactList
                items={[
                  {
                    term: 'In transit',
                    body: 'Traffic is encrypted with TLS at the platform edge. Not independently audited.',
                  },
                  {
                    term: 'At rest',
                    body: 'Encrypted at rest by our hosting provider (Railway). Not independently audited. Customer-managed keys are designed and being built, not yet offered.',
                  },
                  {
                    term: 'Signing',
                    body: (
                      <>
                        Production records are signed with an ES256 key held in AWS KMS, and the private key
                        never leaves KMS. The public key set is published at{' '}
                        <a href={PUBLIC_KEYS_URL} rel="noopener noreferrer" target="_blank" style={UNDERLINED}>
                          {PUBLIC_KEYS_PATH}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                        . The sample receipts on this site use a separate demonstration key.
                      </>
                    ),
                  },
                ]}
              />
            </>
          ),
        },
        {
          id: 'data',
          title: 'Data categories',
          body: (
            <>
              <Body>
                The categories Thursdai processes in operation. Decision records store each governed
                decision&apos;s inputs and outputs. During a pilot, please do not send payroll, bank
                or health data.
              </Body>
              <RecordTable
                caption="Data categories Thursdai processes"
                columns={[
                  { key: 'category', label: 'Category', width: '28%' },
                  { key: 'description', label: 'Includes' },
                ]}
                rows={DATA_CATEGORIES}
              />
            </>
          ),
        },
        {
          id: 'subprocessors',
          title: 'Subprocessors',
          body: (
            <>
              <Body>
                Our policy is to tell customers at least 30 days before a new subprocessor is added.
                The DPA that will carry this commitment is in preparation.
              </Body>
              <RecordTable
                caption="Subprocessors, their purpose and DPA status"
                columns={[
                  { key: 'name', label: 'Subprocessor', width: '28%' },
                  { key: 'purpose', label: 'Purpose' },
                  { key: 'dpa', label: 'DPA', width: '24%' },
                ]}
                rows={SUBPROCESSORS.map((s) => ({ id: s.name, ...s }))}
              />
            </>
          ),
        },
        {
          id: 'certifications',
          title: 'Certification status',
          body: (
            <>
              <Body>
                Thursdai holds no certifications today. The roadmap below is the same one on the{' '}
                <Link href="/trust#certifications" style={UNDERLINED}>
                  trust page
                </Link>
                ; dates appear only once an auditor is engaged.
              </Body>
              <CertRoadmapTable />
            </>
          ),
        },
        {
          id: 'contact',
          title: 'Security contact',
          body: (
            <Body>
              For security questions, vulnerability reports, DPA requests or a vendor questionnaire,
              email{' '}
              <a href={mail} style={UNDERLINED}>
                {CONTACT_EMAIL}
              </a>
              .
            </Body>
          ),
        },
      ]}
      close={
        <ClosingBand
          heading="Questions this does not answer?"
          body="Send the questionnaire or the question, and a person will reply."
          actions={
            <ButtonLink href={mail} variant="primary" size="lg">
              Email security
            </ButtonLink>
          }
        />
      }
    />
  );
}
