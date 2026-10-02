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
import { CONTACT_EMAIL, RECEIPT_TERM } from '@/config/site';

export const metadata: Metadata = {
  title: 'Security overview: Thursdai',
  description:
    'Technical and procedural security controls for Thursdai: architecture, encryption, data categories, subprocessors, certification status and the security contact, for procurement and compliance teams.',
};

const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

const ARCHITECTURE = [
  { id: 'api', component: 'API server', description: 'Fastify HTTP API: authentication, request routing and approval workflows.' },
  { id: 'worker', component: 'Temporal worker', description: 'Durable workflow execution for long-running approval and compliance workflows.' },
  { id: 'db', component: 'Database', description: 'PostgreSQL in production (SQLite for single-node and development): audit events, identities, cases and compliance artifacts.' },
  { id: 'compliance', component: 'Compliance engine', description: 'Signs and renders compliance packs; manages evidence bindings and cryptographic attestation.' },
];

const DATA_CATEGORIES = [
  { id: 'decisions', category: 'Governed decisions', description: 'Approval requests, case outcomes and policy evaluations.' },
  { id: 'identity', category: 'Identity data', description: 'Employee names, email addresses, departments and roles.' },
  { id: 'artifacts', category: 'Compliance artifacts', description: 'Framework packs, evidence bindings and attestation records.' },
  { id: 'audit', category: 'Audit events', description: 'An immutable log of agent actions, human approvals and system events.' },
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
      meta={[
        { label: 'Version', value: '1.0' },
        { label: 'Effective', value: '23 April 2026' },
        { label: 'Review', value: 'Quarterly' },
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
                Controls cover cryptography, access management, audit integrity and operational
                resilience. Engineering controls for the SOC 2 common criteria are implemented and
                in use. No SOC 2 report is held yet: the observation period starts once an auditor
                is engaged.
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
                Thursdai runs on Railway, a managed cloud platform, in Docker containers with strict
                container isolation. There is no shared hosting: each customer deployment is a
                dedicated tenant.
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
                    body: 'TLS 1.3 for all traffic. Plain HTTP is rejected or upgraded. Components talk over the private Railway network.',
                  },
                  {
                    term: 'At rest',
                    body: 'AES-256 storage encryption from the hosting provider. Personal data fields are also encrypted in the application with a configurable key independent of the storage backend.',
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
                The categories Thursdai processes in operation. Raw model conversation content is
                not kept beyond the active session. Thursdai does not ingest or store payroll data,
                bank account details or health records. Retention and isolation are on the{' '}
                <Link href="/trust/data" style={UNDERLINED}>
                  data handling
                </Link>{' '}
                page.
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
                Customers who have signed a DPA are told of material subprocessor changes at least
                30 days in advance. The list is also kept on the{' '}
                <Link href="/trust/subprocessors" style={UNDERLINED}>
                  subprocessors
                </Link>{' '}
                page.
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
              . We acknowledge reports within two business days.
            </Body>
          ),
        },
      ]}
      close={
        <ClosingBand
          heading="Questions this does not answer?"
          body="Send the questionnaire or the question. Vulnerability reports are acknowledged within two business days."
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
