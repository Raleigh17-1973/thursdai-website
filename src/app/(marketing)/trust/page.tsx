import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Body } from '@/components/typography/Body';
import { LABEL_STYLE } from '@/components/typography/scale';
import { ButtonLink } from '@/components/ui/Button';
import { TrustDocument, FactList } from '@/components/templates/TrustDocument';
import { RecordTable } from '@/components/templates/RecordTable';
import { CertRoadmapTable } from '@/components/templates/CertRoadmapTable';
import { ClosingBand } from '@/components/templates/ClosingBand';
import { sampleArtifacts } from '@/lib/artifacts';
import { CONTACT_EMAIL } from '@/config/site';

export const metadata: Metadata = {
  title: 'Trust: Thursdai',
  description:
    'Where Thursdai stands on security and compliance: no certifications held, a roadmap with no dates, the security overview and signed sample artifacts you can verify.',
};

const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

const DOCUMENTS = [
  { href: '/security', title: 'Security overview', covers: 'Architecture, encryption, data categories, subprocessors and the security contact. Written for vendor review.' },
  { href: '/trust/iso-42001', title: 'ISO/IEC 42001', covers: 'What the AI management system standard is and where Thursdai stands against it.' },
];

export default function TrustPage() {
  const artifacts = sampleArtifacts();
  return (
    <TrustDocument
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Trust' }]}
      label="Trust"
      title="What we can show you today."
      lead={
        <>
          Thursdai holds no certifications yet. This page says what is in place, what is on the
          roadmap and where each document lives, so procurement, compliance and engineering can
          check it rather than take our word for it.
        </>
      }
      meta={[
        { label: 'Status as of', value: 'October 2026' },
        { label: 'Certifications held', value: 'None' },
      ]}
      heroActions={
        <ButtonLink href="/security" variant="primary" size="lg">
          Read the security overview
        </ButtonLink>
      }
      sections={[
        {
          id: 'position',
          title: 'Where we stand',
          body: (
            <FactList
              items={[
                {
                  term: 'In place',
                  body: (
                    <>
                      Each record is hash-chained to the one before it and signed with a key held in AWS
                      KMS. Changing a record breaks the chain and the signature. Tenant data is separated
                      by row-level security in the database. None of this has been independently audited.
                      The{' '}
                      <Link href="/security" style={UNDERLINED}>
                        security overview
                      </Link>{' '}
                      sets out the controls.
                    </>
                  ),
                },
                {
                  term: 'Not held',
                  body: 'SOC 2 Type II, ISO/IEC 27001 and ISO/IEC 42001. No auditor is engaged yet, so no date is given.',
                },
                {
                  term: 'What we are',
                  body: 'An evidence layer. Thursdai records what your AI systems decided and makes it provable. It is not an auditor and does not certify your systems.',
                },
              ]}
            />
          ),
        },
        {
          id: 'certifications',
          title: 'Certification roadmap',
          body: (
            <>
              <Body>
                The standards we intend to certify against and what is ready now. Dates appear here
                only once an auditor is engaged.
              </Body>
              <CertRoadmapTable style={{ marginTop: '0.5rem' }} />
            </>
          ),
        },
        {
          id: 'documents',
          title: 'Trust documents',
          body: (
            <RecordTable
              caption="Trust documents and what each covers"
              columns={[
                { key: 'title', label: 'Document', width: '34%' },
                { key: 'covers', label: 'What it covers' },
              ]}
              rows={DOCUMENTS.map((d) => ({
                id: d.href,
                title: (
                  <Link href={d.href} style={{ color: 'var(--ink)' }}>
                    {d.title}
                  </Link>
                ),
                covers: d.covers,
              }))}
            />
          ),
        },
        {
          id: 'artifacts',
          title: 'Sample artifacts you can verify',
          body: (
            <>
              <Body>
                Signed from the fictional Northwind Financial sample tenant with the same key the{' '}
                <Link href="/demo#receipt" style={UNDERLINED}>
                  demo verifier
                </Link>{' '}
                checks. Download them and verify the signature yourself.
              </Body>
              <ul className="list-none p-0 m-0" style={{ borderTop: '1px solid var(--ink)' }}>
                {artifacts.map((a) => (
                  <li
                    key={a.href}
                    className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1"
                    style={{ padding: '1rem 0', borderBottom: '1px solid var(--rule)' }}
                  >
                    <div>
                      <a href={a.href} download style={{ fontWeight: 500 }}>
                        {a.title}
                      </a>
                      <Body variant="small" style={{ marginTop: '0.25rem' }}>
                        {a.note}
                      </Body>
                    </div>
                    <span style={{ ...LABEL_STYLE, color: 'var(--ink-3)', paddingTop: '0.25rem' }}>
                      {a.meta.join(' · ')}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ),
        },
      ]}
      close={
        <ClosingBand
          heading="Running a vendor review?"
          body={
            <>
              Start with the security overview. For a questionnaire, a DPA or anything the documents
              do not answer, email {CONTACT_EMAIL} and a person will reply.
            </>
          }
          actions={
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <ButtonLink href="/security" variant="primary" size="lg">
                Read the security overview
              </ButtonLink>
              <ButtonLink href={`mailto:${CONTACT_EMAIL}?subject=Vendor%20review`} variant="secondary" size="lg">
                Email the team
              </ButtonLink>
            </div>
          }
        />
      }
    />
  );
}
