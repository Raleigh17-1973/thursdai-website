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

// Every statement here was checked against the production platform on 2026-10-13 (the app truth
// pass recorded in docs/decisions/premium-rebuild-2026-10.md). Present tense only for what runs
// in production today. scripts/check-copy.mjs bans the worst of the old claims.

export const metadata: Metadata = {
  title: 'Security overview: Thursdai',
  description:
    'Technical and procedural security controls for Thursdai: architecture, encryption, data categories, retention, sign-in, subprocessors, certification status and the security contact, for procurement and compliance teams.',
};

const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

const ARCHITECTURE = [
  { id: 'api', component: 'API server', description: 'Fastify HTTP API: authentication, request routing and approval workflows.' },
  { id: 'worker', component: 'Temporal worker', description: 'Durable workflow execution for long-running approval workflows. Temporal is self-hosted on Railway.' },
  { id: 'db', component: 'Database', description: 'PostgreSQL on Railway: decision records, audit events, identities and cases. Every tenant table has a forced row-level security policy.' },
  { id: 'compliance', component: 'Compliance engine', description: 'Renders report packs and signs them.' },
];

const DATA_CATEGORIES = [
  {
    id: 'decisions',
    category: 'Decision records',
    description:
      'Each decision as your system sends it: outcome, policies, evidence references, the subject id and the actor id, plus any reviewer rationale. The schema has no name, email, date of birth, social security number or address fields, but subject and actor ids are free-form and stored in clear, exactly as your system sends them. Treat decision records as personal data.',
  },
  { id: 'identity', category: 'User identity', description: 'Names, email addresses and roles of the people who sign in to Thursdai.' },
  { id: 'artifacts', category: 'Compliance artifacts', description: 'Rendered report packs.' },
  { id: 'audit', category: 'Audit events', description: 'An append-only log of agent actions, human approvals, admin actions and system events.' },
  { id: 'workflow', category: 'Workflow metadata', description: 'Case status, SLA tracking and assignee history.' },
  { id: 'assistant', category: 'Assistant data', description: 'Chat questions and answers, and saved memories for users who have not opted out of them.' },
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
      lead="For security, compliance and procurement teams evaluating Thursdai as a vendor: how it is built, where data goes, what it holds, who processes it and where certification stands."
      meta={[
        { label: 'Status as of', value: 'October 2026' },
      ]}
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
                Thursdai is pre-launch. No customer data has been processed in production yet, and
                the demo on this site runs on a fictional sample tenant.
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
                Thursdai runs on Railway, a managed cloud platform. Today all
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
                    body: 'Storage is encrypted at rest at the infrastructure level by our hosting providers. On top of that, chat, memories, audit details, case answers, journal text and demographic data are encrypted in the application with a key held in AWS KMS. Decision records are not: the decision ledger is stored without application-level encryption. Not independently audited.',
                  },
                  {
                    term: 'Signing',
                    body: (
                      <>
                        Records are signed on write with an ES256 key held in AWS KMS, and the private
                        key never leaves KMS. No customer records have been signed in production yet.
                        The public key set is published at{' '}
                        <a href={PUBLIC_KEYS_URL} rel="noopener noreferrer" target="_blank" style={UNDERLINED}>
                          {PUBLIC_KEYS_PATH}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                        . The sample receipts on this site use a separate demonstration key.
                      </>
                    ),
                  },
                  {
                    term: 'Anchoring',
                    body: 'Designed to publish record hashes to write-once storage in S3. It has not anchored any records yet.',
                  },
                ]}
              />
            </>
          ),
        },
        {
          id: 'data-flows',
          title: 'Where data goes',
          body: (
            <FactList
              items={[
                {
                  term: 'Platform',
                  body: 'The API, worker, database and monitoring run on Railway.',
                },
                {
                  term: 'Signing',
                  body: 'To sign a record, its full bytes are sent to AWS KMS.',
                },
                {
                  term: 'Backups',
                  body: 'Encrypted daily backups held in AWS.',
                },
                {
                  term: 'Model calls',
                  body: 'Assistant prompts go to Anthropic, or to OpenAI as a fallback. They can include record excerpts and the signed-in user’s identity details.',
                },
                {
                  term: 'Email and errors',
                  body: 'Notification email is sent through AWS SES. Application error reports go to Sentry.',
                },
              ]}
            />
          ),
        },
        {
          id: 'data',
          title: 'Data categories',
          body: (
            <>
              <Body>
                The categories Thursdai processes in operation. Thursdai does not block
                special-category or health data, so during a pilot please do not send payroll, bank
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
          id: 'retention',
          title: 'Retention and deletion',
          body: (
            <FactList
              items={[
                {
                  term: 'Retention',
                  body: 'Retention terms are not yet published.',
                },
                {
                  term: 'At contract end',
                  body: 'Tenant export and deletion at contract end are in development.',
                },
                {
                  term: 'Ledger',
                  body: 'The decision ledger is append-only, so a record cannot be edited once written.',
                },
              ]}
            />
          ),
        },
        {
          id: 'access',
          title: 'Sign-in and access',
          body: (
            <FactList
              items={[
                {
                  term: 'Sign-in',
                  body: 'Sign-in via WorkOS, by invitation. There is no self-serve signup.',
                },
                {
                  term: 'SSO',
                  body: 'SSO available on request during pilot setup.',
                },
                {
                  term: 'Admin actions',
                  body: 'Role changes, invitations, connector changes and API key events are logged to a hash-chained table and can be exported as NDJSON. There is no in-app viewer yet.',
                },
              ]}
            />
          ),
        },
        {
          id: 'subprocessors',
          title: 'Subprocessors',
          body: (
            <>
              <Body>
                Our policy is to tell customers at least 30 days before a new subprocessor is added.
                The DPA that will carry this commitment is in preparation. This website is hosted
                separately on Vercel, which receives no platform customer data.
              </Body>
              <RecordTable
                caption="Subprocessors, their purpose and DPA status"
                columns={[
                  { key: 'name', label: 'Subprocessor', width: '24%' },
                  { key: 'purpose', label: 'Purpose and data received' },
                  { key: 'dpa', label: 'DPA', width: '18%' },
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
