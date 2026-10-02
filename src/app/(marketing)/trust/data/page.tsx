import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Body } from '@/components/typography/Body';
import { ClosingCTAs } from '@/components/ui/ClosingCTAs';
import { TrustDocument, FactList } from '@/components/templates/TrustDocument';
import { RecordTable } from '@/components/templates/RecordTable';
import { ClosingBand } from '@/components/templates/ClosingBand';
import { RECEIPT_TERM_PLURAL } from '@/config/site';

export const metadata: Metadata = {
  title: 'Data handling: Thursdai',
  description:
    'How Thursdai stores, processes and protects your data: no training on customer data, retention windows, encryption, tenant isolation and personal data handling.',
};

const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

const RETENTION = [
  { id: 'receipts', type: RECEIPT_TERM_PLURAL, standard: 'Set per tenant', max: 'Set per tenant', notes: 'Set it to six months or more to meet the deployer floor in EU AI Act Article 26(6).' },
  { id: 'inference', type: 'Inference logs', standard: '365 days', max: '7 years', notes: 'Configurable per tenant.' },
  { id: 'corpus', type: 'Tenant corpus content', standard: 'Until you delete it', max: 'Not applicable', notes: 'You control deletion.' },
  { id: 'session', type: 'User session data', standard: '30 days', max: '1 year', notes: 'Authentication tokens and session state.' },
  { id: 'audit', type: 'Audit events', standard: '7 years', max: '7 years', notes: 'Fixed; not configurable.' },
  { id: 'api', type: 'API request logs', standard: '90 days', max: '1 year', notes: 'Access patterns and rate limiting data.' },
];

export default function DataPage() {
  return (
    <TrustDocument
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Trust', href: '/trust' },
        { label: 'Data handling' },
      ]}
      label="Data handling"
      title="Your data is yours. We don't train on it."
      lead="Thursdai never uses customer data to train models, fine-tune systems or improve the standard corpus. This document sets out retention, encryption, isolation and how personal data is handled."
      meta={[
        { label: 'Status as of', value: 'October 2026' },
        { label: 'Legal review', value: 'Pending' },
      ]}
      sections={[
        {
          id: 'training',
          title: 'Training policy',
          body: (
            <p
              className="m-0"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, calc(19.33px + 0.74vw), 30px)',
                lineHeight: 1.35,
                letterSpacing: '-0.01em',
                color: 'var(--ink)',
              }}
            >
              Your tenant corpus, your queries and your outputs are never used for model training,
              fine-tuning or improving the standard corpus. Not as an opt-out and not in the fine
              print.
            </p>
          ),
        },
        {
          id: 'retention',
          title: 'Retention',
          body: (
            <RecordTable
              caption="Retention by data type: standard period, configurable maximum and notes"
              columns={[
                { key: 'type', label: 'Data type', width: '26%' },
                { key: 'standard', label: 'Standard', width: '18%' },
                { key: 'max', label: 'Configurable maximum', width: '18%' },
                { key: 'notes', label: 'Notes' },
              ]}
              rows={RETENTION}
            />
          ),
        },
        {
          id: 'encryption',
          title: 'Encryption',
          body: (
            <FactList
              items={[
                {
                  term: 'At rest',
                  body: 'AES-256-GCM. Tenant corpus encrypted with a tenant-specific key. Customer-managed keys are available on dedicated deployments and above.',
                },
                {
                  term: 'In transit',
                  body: 'TLS 1.3 minimum. Certificate pinning is available for dedicated deployments; mutual TLS is supported for your-cloud and on-premises deployments.',
                },
              ]}
            />
          ),
        },
        {
          id: 'isolation',
          title: 'Tenant isolation',
          body: (
            <>
              <Body>
                Tenant boundaries are enforced in the database, not only as an application check.
                Each tenant has its own database schema and queries are scoped to the tenant when
                the connection is made, so no code path reads another tenant&apos;s data, even with
                a crafted request.
              </Body>
              <Body>
                Access logs are generated per tenant and you can audit them through the API: who
                accessed your data and when, without asking Thursdai support.
              </Body>
            </>
          ),
        },
        {
          id: 'personal-data',
          title: 'Personal data',
          body: (
            <FactList
              items={[
                { term: 'Detection', body: 'Personal data in inference inputs and outputs is detected with pattern matching and a classifier.' },
                {
                  term: 'Redaction',
                  body: (
                    <>
                      The <code style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: 'var(--ink)' }}>pii_block</code>{' '}
                      policy redacts it before output.
                    </>
                  ),
                },
                { term: 'Storage', body: 'Masked in inference logs by default; full logs are available on request, and each request is itself logged.' },
                { term: 'Erasure', body: 'You submit an erasure request through the API; it is processed within 30 days and confirmed with a receipt.' },
              ]}
            />
          ),
        },
        {
          id: 'third-parties',
          title: 'Third parties',
          body: (
            <Body>
              The companies that process customer data on our behalf, and what each does, are on
              the{' '}
              <Link href="/trust/subprocessors" style={UNDERLINED}>
                subprocessors
              </Link>{' '}
              page.
            </Body>
          ),
        },
      ]}
      close={
        <ClosingBand
          heading="Test it on your own data."
          body="A pilot runs in a tenant of your own, under these controls, on one AI system you choose."
          actions={<ClosingCTAs primary="pilot" />}
        />
      }
    />
  );
}
