import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Callout } from '@/components/ui/Callout';
import { Breadcrumb } from '@/components/nav/Breadcrumb';

export const metadata: Metadata = {
  title: 'Security Overview — Thursdai',
  description:
    'Technical and procedural security controls for Thursdai. Architecture, data handling, subprocessors, certifications, and incident response for procurement and compliance teams.',
};

// ── Styles ─────────────────────────────────────────────────────

const thStyle: React.CSSProperties = {
  padding: '10px 14px',
  textAlign: 'left',
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--color-text-primary)',
  borderBottom: '1px solid var(--color-border-default)',
  background: 'var(--color-surface-secondary)',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 14px',
  fontSize: '14px',
  lineHeight: 1.5,
  color: 'var(--color-text-secondary)',
  borderBottom: '1px solid var(--color-border-default)',
  verticalAlign: 'top',
};

// ── Data ───────────────────────────────────────────────────────

const ARCHITECTURE_ROWS = [
  {
    component: 'API Server',
    description: 'Fastify-based HTTP API; handles authentication, request routing, and approval workflows',
  },
  {
    component: 'Temporal Worker',
    description: 'Durable workflow execution engine; manages long-running approval and compliance workflows',
  },
  {
    component: 'Database',
    description:
      'PostgreSQL (production) or SQLite (single-node/dev); stores audit events, identities, cases, and compliance artifacts',
  },
  {
    component: 'Compliance Engine',
    description:
      'Signs and renders compliance packs; manages evidence bindings and cryptographic attestation',
  },
];

const DATA_CLASSIFICATION_ROWS = [
  { category: 'HR decisions', description: 'Approval requests, case outcomes, policy evaluations' },
  { category: 'Identity data', description: 'Employee names, email addresses, departments, roles' },
  {
    category: 'Compliance artifacts',
    description: 'Framework packs, evidence bindings, attestation records',
  },
  {
    category: 'Audit events',
    description: 'Immutable log of all agent actions, human approvals, and system events',
  },
  { category: 'Workflow metadata', description: 'Case status, SLA tracking, assignee history' },
];

const SUBPROCESSOR_ROWS = [
  {
    name: 'Amazon Web Services',
    purpose: 'KMS key management; GovCloud deployments',
    dpaStatus: 'DPA on file (AWS standard DPA)',
  },
  {
    name: 'Anthropic',
    purpose: 'LLM inference (AI-powered HR guidance and compliance analysis)',
    dpaStatus: 'DPA on file',
  },
  {
    name: 'Temporal Technologies',
    purpose: 'Durable workflow orchestration',
    dpaStatus: 'DPA on file',
  },
  {
    name: 'Railway',
    purpose: 'Cloud hosting and container runtime',
    dpaStatus: 'DPA on file',
  },
  {
    name: 'Stripe',
    purpose: 'Payment processing and billing',
    dpaStatus: 'DPA on file',
  },
  {
    name: 'OpenAI',
    purpose: 'AI inference (supplemental model provider)',
    dpaStatus: 'DPA on file',
  },
];

const CERTIFICATION_ROWS = [
  {
    framework: 'SOC 2 Type II',
    status: 'In progress',
    notes: 'Observation period underway; third-party audit in progress. Contact security@thursdai.com for current status.',
  },
  {
    framework: 'ISO 42001',
    status: 'Planned',
    notes: 'Scoped for 2026. AI management system controls align with current architecture.',
  },
  {
    framework: 'EU AI Act Annex III',
    status: 'In progress',
    notes:
      'High-risk system classification assessment complete. Technical documentation and conformity controls in active implementation.',
  },
];

// ── Page ───────────────────────────────────────────────────────

export default function SecurityPage() {
  return (
    <>
      {/* Header */}
      <Section variant="default">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Security' },
            ]}
          />
          <Label style={{ marginTop: '1.5rem', display: 'block' }}>Security Overview</Label>
          <Heading1 style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
            Security Overview
          </Heading1>
          <Body variant="large" style={{ maxWidth: '700px', marginBottom: '1.5rem' }}>
            For security, compliance, and procurement teams evaluating Thursdai as a vendor.
          </Body>
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
              fontSize: '13px',
              color: 'var(--color-text-tertiary)',
              borderTop: '1px solid var(--color-border-default)',
              paddingTop: '1rem',
            }}
          >
            <span>
              <strong style={{ color: 'var(--color-text-secondary)' }}>Document version:</strong>{' '}
              1.0
            </span>
            <span>
              <strong style={{ color: 'var(--color-text-secondary)' }}>Effective date:</strong>{' '}
              2026-04-23
            </span>
            <span>
              <strong style={{ color: 'var(--color-text-secondary)' }}>Review frequency:</strong>{' '}
              Quarterly
            </span>
          </div>
        </Container>
      </Section>

      {/* Executive Summary */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Executive Summary</Heading2>
          <div style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Body>
              Thursdai is an AI-powered HR operations platform that helps enterprise teams manage
              approvals, compliance artifacts, and audit trails for workforce decisions. Security and
              compliance are load-bearing requirements of the product — Thursdai processes HR
              decisions that affect employees and must satisfy the same audit standards as the
              workflows it supports.
            </Body>
            <Body>
              Thursdai applies defense-in-depth across cryptographic controls, access management,
              audit integrity, and operational resilience. Engineering controls for SOC 2 CC-series
              requirements are implemented and in active use. An observation period for third-party
              SOC 2 Type II certification is in progress.
            </Body>
          </div>
        </Container>
      </Section>

      {/* Architecture */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Architecture Overview</Heading2>
          <Body style={{ maxWidth: '700px', marginBottom: '1.5rem' }}>
            Thursdai is deployed on Railway, a managed cloud platform. The application runs in
            Docker containers with strict container isolation. There is no shared hosting; each
            customer deployment is a dedicated tenant.
          </Body>
          <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Component</th>
                  <th style={thStyle}>Description</th>
                </tr>
              </thead>
              <tbody>
                {ARCHITECTURE_ROWS.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 1 ? 'rgba(0,0,0,0.02)' : undefined }}>
                    <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
                      {row.component}
                    </td>
                    <td style={tdStyle}>{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
            }}
          >
            <div
              style={{
                border: '1px solid var(--color-border-default)',
                borderRadius: '12px',
                padding: '1.25rem',
                background: 'var(--color-surface-primary)',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text-tertiary)',
                  marginBottom: '0.5rem',
                }}
              >
                Network &amp; Transport
              </p>
              <Body>
                All traffic in transit uses TLS 1.3. HTTP connections are rejected or upgraded.
                Internal component communication is within the private Railway network.
              </Body>
            </div>
            <div
              style={{
                border: '1px solid var(--color-border-default)',
                borderRadius: '12px',
                padding: '1.25rem',
                background: 'var(--color-surface-primary)',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text-tertiary)',
                  marginBottom: '0.5rem',
                }}
              >
                Data at Rest
              </p>
              <Body>
                AES-256 via hosting provider storage encryption. PII fields are encrypted at the
                application layer using a configurable key independent of the storage backend.
              </Body>
            </div>
          </div>
        </Container>
      </Section>

      {/* Data Classification */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Data Classification</Heading2>
          <Body style={{ maxWidth: '700px', marginBottom: '1.5rem' }}>
            Thursdai processes the following data categories in the course of its operation. Raw LLM
            conversation content is not persisted beyond the active session. Thursdai does not ingest
            or store payroll data, bank account information, or health records.
          </Body>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Data Category</th>
                  <th style={thStyle}>Description</th>
                </tr>
              </thead>
              <tbody>
                {DATA_CLASSIFICATION_ROWS.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 1 ? 'rgba(0,0,0,0.02)' : undefined }}>
                    <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
                      {row.category}
                    </td>
                    <td style={tdStyle}>{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Subprocessors */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Subprocessors</Heading2>
          <Body style={{ maxWidth: '700px', marginBottom: '1.5rem' }}>
            Thursdai maintains a complete and up-to-date subprocessor registry. Customers who have
            signed a DPA are notified of material subprocessor changes with at least 30 days advance
            notice.
          </Body>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Subprocessor</th>
                  <th style={thStyle}>Purpose</th>
                  <th style={thStyle}>DPA Status</th>
                </tr>
              </thead>
              <tbody>
                {SUBPROCESSOR_ROWS.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 1 ? 'rgba(0,0,0,0.02)' : undefined }}>
                    <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
                      {row.name}
                    </td>
                    <td style={tdStyle}>{row.purpose}</td>
                    <td style={tdStyle}>{row.dpaStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Certifications */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Certifications &amp; Compliance Status</Heading2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Framework</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {CERTIFICATION_ROWS.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 1 ? 'rgba(0,0,0,0.02)' : undefined }}>
                    <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
                      {row.framework}
                    </td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 600,
                          background:
                            row.status === 'In progress'
                              ? 'rgba(62,79,184,0.12)'
                              : 'rgba(0,0,0,0.06)',
                          color:
                            row.status === 'In progress'
                              ? 'var(--color-accent)'
                              : 'var(--color-text-tertiary)',
                        }}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td style={tdStyle}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section variant="compact">
        <Container>
          <Callout variant="info" title="Security contact">
            For security inquiries, vulnerability reports, DPA requests, or SOC 2 documentation,
            contact{' '}
            <a
              href="mailto:security@thursdai.com"
              style={{ color: 'var(--color-accent)', fontWeight: 600 }}
            >
              security@thursdai.com
            </a>
            . We acknowledge reports within 2 business days.
          </Callout>
        </Container>
      </Section>
    </>
  );
}
