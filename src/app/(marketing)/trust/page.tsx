import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Display } from '@/components/typography/Display';
import { Heading2, Heading3 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Card } from '@/components/ui/Card';
import { CertStatusTag } from '@/components/content/CertBadge';
import { LABEL_STYLE } from '@/components/typography/scale';
import { CERT_ROADMAP, auditorText, targetText } from '@/lib/certifications';
import { SecurityPackForm } from '@/components/content/SecurityPackForm';

export const metadata: Metadata = {
  title: 'Trust & Security: Thursdai',
  description:
    'How Thursdai handles security: an honest certification roadmap, EU AI Act Annex III documentation, deployment options and data handling, written for procurement, compliance and engineering.',
};

// ── Icons ─────────────────────────────────────────────────────

function IconShield() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <polyline
        points="9 12 11 14 15 10"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCertificate() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="12" cy="18" r="3" stroke="currentColor" strokeWidth="1.25" />
      <path d="M9 21l3-3 3 3" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M6 8h12M6 12h8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function IconServer() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="20" height="7" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <rect x="2" y="14" width="20" height="7" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="6" cy="6.5" r="1" fill="currentColor" />
      <circle cx="6" cy="17.5" r="1" fill="currentColor" />
    </svg>
  );
}

function IconDatabase() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.25" />
      <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

// ── Certification roadmap table ────────────────────────────────
// A plain document table: strong ink rule on top, sunk mono header, hairline rows.
// Below md each row stacks into a block with its own mono labels, so nothing scrolls sideways.

const COLUMNS = ['Control or standard', 'Status', 'Auditor engaged', 'Target'] as const;

const cellPad = 'block md:table-cell md:px-4 md:py-4 md:align-top';

function CellLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block md:hidden" style={{ ...LABEL_STYLE, marginBottom: '0.25rem' }}>
      {children}
    </span>
  );
}

function CertRoadmapTable() {
  return (
    <table
      className="block md:table"
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '2.5rem',
        borderTop: '1px solid var(--ink)',
      }}
    >
      <caption className="sr-only">
        Certification roadmap: each control or standard, its status, whether an auditor is
        engaged and the target quarter
      </caption>
      <thead className="hidden md:table-header-group">
        <tr style={{ background: 'var(--sunk)', borderBottom: '1px solid var(--rule)' }}>
          {COLUMNS.map((col) => (
            <th
              key={col}
              scope="col"
              className="px-4 py-3"
              style={{ ...LABEL_STYLE, color: 'var(--ink-2)', textAlign: 'left' }}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="block md:table-row-group">
        {CERT_ROADMAP.map((row) => (
          <tr
            key={row.name}
            className="grid grid-cols-2 gap-x-4 gap-y-4 py-5 md:table-row md:py-0"
            style={{ borderBottom: '1px solid var(--rule)' }}
          >
            <th
              scope="row"
              className={`col-span-2 ${cellPad} md:w-[46%]`}
              style={{ textAlign: 'left', fontWeight: 400 }}
            >
              <Link
                href={row.href}
                style={{
                  fontSize: '17px',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                }}
              >
                {row.name}
              </Link>
              <span
                style={{
                  display: 'block',
                  marginTop: '0.375rem',
                  fontSize: '15px',
                  lineHeight: 1.55,
                  color: 'var(--color-text-secondary)',
                }}
              >
                {row.note}
              </span>
            </th>
            <td className={cellPad}>
              <CellLabel>Status</CellLabel>
              <CertStatusTag status={row.status} />
            </td>
            <td className={cellPad} style={{ fontSize: '15px', color: 'var(--color-text-primary)' }}>
              <CellLabel>Auditor engaged</CellLabel>
              {auditorText(row.auditorEngaged)}
            </td>
            <td
              className={`col-span-2 ${cellPad}`}
              style={{
                fontSize: '15px',
                color: row.targetQuarter || row.status === 'ready'
                  ? 'var(--color-text-primary)'
                  : 'var(--color-text-secondary)',
              }}
            >
              <CellLabel>Target</CellLabel>
              {targetText(row)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── Page ───────────────────────────────────────────────────────

export default function TrustPage() {
  return (
    <>
      {/* Hero */}
      <Section variant="default">
        <Container>
          <Label>Trust &amp; Security</Label>
          <Display style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            Built so your team, your clients and your auditors all feel confident.
          </Display>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: '22px', lineHeight: 1.35,
            color: 'var(--color-text-primary)', margin: '0.75rem 0 0',
          }}>
            &ldquo;We show our work; so your auditors don&apos;t have to.&rdquo;
          </p>
          <Body
            variant="large"
            style={{ marginTop: '1.5rem' }}
          >
            Whether you&apos;re a 10-person team or a Fortune 500, Thursdai was built with security and accountability as its foundation. It was not bolted on later.
          </Body>
        </Container>
      </Section>

      {/* Nav cards */}
      <Section variant="compact">
        <Container>
          <Grid cols={2} gap="lg" style={{ marginTop: '2rem' }}>
            <Card
              variant="feature"
              headingLevel={2}
              icon={<IconShield />}
              title="EU AI Act Annex III"
              body="How Thursdai maps to every obligation under Annex III. Downloadable FRIA and DPIA templates."
              href="/trust/annex-iii"
            />
            <Card
              variant="feature"
              headingLevel={2}
              icon={<IconCertificate />}
              title="ISO/IEC 42001"
              body="Why the AI management system standard matters and where Thursdai stands against it today."
              href="/trust/iso-42001"
            />
            <Card
              variant="feature"
              headingLevel={2}
              icon={<IconServer />}
              title="Deployment Options"
              body="SaaS, dedicated single-tenant, VPC and on-premises. Data residency and CMEK for every tier."
              href="/trust/deployment"
            />
            <Card
              variant="feature"
              headingLevel={2}
              icon={<IconDatabase />}
              title="Data Handling"
              body="Retention windows, PII handling, encryption, tenant isolation and our training policy."
              href="/trust/data"
            />
          </Grid>
        </Container>
      </Section>

      {/* Certification roadmap */}
      <Section
        id="certifications"
        variant="compact"
        style={{ scrollMarginTop: '80px' }}
      >
        <Container>
          <Label>Certification roadmap</Label>
          <Heading2 style={{ marginTop: '1rem' }}>No certificates yet. Here is the plan.</Heading2>
          <Body variant="large" style={{ marginTop: '1.5rem' }}>
            Thursdai holds no certifications today. The table below lists the standards we intend
            to certify against and what is ready now, and it will be updated with dates when
            auditors are engaged.
          </Body>
          <CertRoadmapTable />
          <p
            style={{
              ...LABEL_STYLE,
              color: 'var(--color-text-tertiary)',
              marginTop: '1rem',
              marginBottom: 0,
            }}
          >
            Status as of October 2026
          </p>
          <Body style={{ marginTop: '1.5rem' }}>
            Running a vendor review now? The{' '}
            <a href="#security-pack">security pack</a> describes the controls in place today,
            and the <Link href="/trust/annex-iii">Annex III mapping</Link> shows how receipts
            line up with each record-keeping obligation.
          </Body>
        </Container>
      </Section>

      {/* Security pack download */}
      <Section id="security-pack" variant="compact" style={{ scrollMarginTop: '80px' }}>
        <Container>
          <div
            style={{
              background: 'var(--color-surface-primary)',
              border: '1px solid var(--color-border-default)',
              borderRadius: '2px',
              padding: '2rem',
              textAlign: 'center',
              marginTop: '1rem',
            }}
          >
            <Heading3>Download the security pack</Heading3>
            <Body style={{ margin: '0 auto 1.5rem', maxWidth: '500px' }}>
              Get our Security Overview: architecture summary, current controls and our certification
              plans, delivered to your inbox.
            </Body>
            <SecurityPackForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
