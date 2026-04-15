import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Heading1, Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Callout } from '@/components/ui/Callout';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Thursdai vs Glean — Thursdai',
  description:
    'A fair comparison: where Glean is strong and where Thursdai differs. Feature matrix, honest scenarios, and a direct link to try the Thursdai replay demo.',
};

type MatrixStatus = 'yes' | 'no' | 'partial' | 'in-progress' | 'text';

interface MatrixRow {
  feature: string;
  glean: MatrixStatus | string;
  thursdai: MatrixStatus | string;
}

const MATRIX: MatrixRow[] = [
  { feature: 'Enterprise search (100+ connectors)', glean: 'yes', thursdai: 'no' },
  { feature: 'Role-based answer panel', glean: 'no', thursdai: 'yes' },
  { feature: 'Decision replay / time-travel', glean: 'no', thursdai: 'yes' },
  { feature: 'Policy-as-Code enforcement', glean: 'partial', thursdai: 'yes' },
  { feature: 'Sentence-level provenance', glean: 'no', thursdai: 'yes' },
  { feature: 'Tenant knowledge isolation', glean: 'yes', thursdai: 'yes' },
  { feature: 'EU AI Act Annex III documentation', glean: 'no', thursdai: 'yes' },
  { feature: 'FRIA/DPIA templates', glean: 'no', thursdai: 'yes' },
  { feature: 'Published pricing', glean: 'no', thursdai: 'yes' },
  { feature: 'MCP server (agent-to-agent)', glean: 'no', thursdai: 'yes' },
  { feature: 'Ambient case management', glean: 'no', thursdai: 'yes' },
  { feature: 'Audit log API', glean: 'partial', thursdai: 'yes' },
  { feature: 'SOC 2 Type II', glean: 'yes', thursdai: 'yes' },
  { feature: 'ISO 27001', glean: 'yes', thursdai: 'yes' },
  { feature: 'ISO 42001', glean: 'no', thursdai: 'in-progress' },
  { feature: 'HIPAA-eligible', glean: 'yes', thursdai: 'yes' },
  { feature: 'On-premises deployment', glean: 'no', thursdai: 'yes' },
  { feature: 'CMEK support', glean: 'partial', thursdai: 'yes' },
  { feature: 'Google Workspace integration', glean: 'yes', thursdai: 'text' },
  { feature: 'GA since', glean: 'text', thursdai: 'text' },
];

const GA_LABELS: Record<string, string> = {
  glean: '2022',
  thursdai: '2026',
};

function MatrixCell({ row, col }: { row: MatrixRow; col: 'glean' | 'thursdai' }) {
  const value = row[col];
  const isGleanGA = col === 'glean' && row.feature === 'GA since';
  const isThursdaiGA = col === 'thursdai' && row.feature === 'GA since';
  const isThursdaiConnector =
    col === 'thursdai' && row.feature === 'Google Workspace integration';
  const isCMEKGlean = col === 'glean' && row.feature === 'CMEK support';
  const isThursdaiCMEK = col === 'thursdai' && row.feature === 'CMEK support';
  const isGleanAudit = col === 'glean' && row.feature === 'Audit log API';
  const isPolicyGlean = col === 'glean' && row.feature === 'Policy-as-Code enforcement';
  const isPolicyThursdai = col === 'thursdai' && row.feature === 'Policy-as-Code enforcement';
  const isGleanSearch2 = col === 'thursdai' && row.feature === 'Enterprise search (100+ connectors)';

  if (isGleanSearch2) {
    return (
      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-tertiary)', fontSize: '14px' }}>
        ✗ Not the use case
      </td>
    );
  }
  if (isGleanGA || isThursdaiGA) {
    return (
      <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-primary)' }}>
        {GA_LABELS[col]}
      </td>
    );
  }
  if (isThursdaiConnector) {
    return (
      <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
        Via connector
      </td>
    );
  }
  if (isPolicyGlean) {
    return (
      <td style={{ padding: '0.75rem 1rem' }}>
        <Badge variant="amber">Partial (prompt-level)</Badge>
      </td>
    );
  }
  if (isPolicyThursdai) {
    return (
      <td style={{ padding: '0.75rem 1rem' }}>
        <span style={{ fontSize: '15px' }}>✅</span>
        <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginLeft: '0.4rem' }}>
          (inference-layer)
        </span>
      </td>
    );
  }
  if (isCMEKGlean) {
    return (
      <td style={{ padding: '0.75rem 1rem' }}>
        <Badge variant="amber">Partial (enterprise)</Badge>
      </td>
    );
  }
  if (isThursdaiCMEK) {
    return (
      <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
        ✅ dedicated+
      </td>
    );
  }
  if (isGleanAudit) {
    return (
      <td style={{ padding: '0.75rem 1rem' }}>
        <Badge variant="amber">Partial</Badge>
      </td>
    );
  }

  if (value === 'yes') {
    return (
      <td style={{ padding: '0.75rem 1rem', fontSize: '15px' }}>✅</td>
    );
  }
  if (value === 'no') {
    return (
      <td style={{ padding: '0.75rem 1rem', fontSize: '15px', color: 'var(--color-text-tertiary)' }}>✗</td>
    );
  }
  if (value === 'partial') {
    return (
      <td style={{ padding: '0.75rem 1rem' }}>
        <Badge variant="amber">Partial</Badge>
      </td>
    );
  }
  if (value === 'in-progress') {
    return (
      <td style={{ padding: '0.75rem 1rem' }}>
        <Badge variant="amber">In progress</Badge>
      </td>
    );
  }
  return (
    <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
      {String(value)}
    </td>
  );
}

export default function CompareGleanPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section>
        <Container>
          <Label>Thursdai vs Glean</Label>
          <Heading1 style={{ marginTop: '0.75rem' }}>A fair comparison.</Heading1>
          <Body variant="large" style={{ maxWidth: '640px', marginTop: '1rem' }}>
            Glean is a strong enterprise search and knowledge product. Thursdai is a governed agent
            substrate. These are different tools for different problems — but they&apos;re often
            evaluated together. Here&apos;s where each excels.
          </Body>
        </Container>
      </Section>

      {/* ── Where Glean is strong ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2>Where Glean is strong</Heading2>
          <Body style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
            These are genuine strengths. If your primary need is one of these, Glean may be the
            right choice.
          </Body>
          <Grid cols={3} gap="md">
            <Card
              variant="feature"
              title="Enterprise search breadth"
              body="Glean connects to 100+ SaaS tools and indexes your entire digital workplace. If your core need is 'find anything across all our systems,' Glean is built for that."
            />
            <Card
              variant="feature"
              title="Established enterprise trust"
              body="Glean has been in production at large enterprises since 2022. It has a track record, case studies, and a well-understood security model that procurement teams know."
            />
            <Card
              variant="feature"
              title="Broad connector ecosystem"
              body="Deep integrations with Google Workspace, Microsoft 365, Salesforce, Jira, and dozens more. If your workflow is connector-dependent, Glean's ecosystem is mature."
            />
          </Grid>
        </Container>
      </Section>

      {/* ── Where Thursdai differs ── */}
      <Section variant="default">
        <Container>
          <Heading2>Where Thursdai differs</Heading2>
          <Body style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
            These aren&apos;t feature comparisons — they&apos;re architectural differences that
            matter for regulated use cases.
          </Body>
          <Grid cols={2} gap="lg">
            <Card
              variant="feature"
              title="Role-based panel vs single-model response"
              body="Thursdai routes every question to Legal, Finance, and Engineering simultaneously and reconciles their answers. Glean returns a single AI-generated response. For regulated decisions, you need to know which domain drove the answer."
            />
            <Card
              variant="feature"
              title="Decision replay vs no audit trail"
              body="Thursdai records every decision with the knowledge and policies active at the time. You can replay any decision from 2 years ago. Glean has no equivalent — answers are stateless."
            />
            <Card
              variant="feature"
              title="Policy-as-Code vs UI-only guardrails"
              body="Thursdai enforces governance rules at the inference layer in YAML — the model cannot override them. Glean's guardrails are prompt-level and can be worked around by the model."
            />
            <Card
              variant="feature"
              title="Published pricing vs contact-sales-only"
              body="Thursdai publishes platform fees, per-token rates, and outcome units. Glean requires a sales call for any pricing information."
            />
            <Card
              variant="feature"
              title="EU AI Act Annex III readiness"
              body="Thursdai documents its Annex III obligations mapping, provides FRIA/DPIA templates, and has audit logs meeting the Act's record-keeping requirements. Glean has no published EU AI Act compliance surface."
            />
          </Grid>
        </Container>
      </Section>

      {/* ── Feature matrix ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Feature matrix</Heading2>
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px',
              }}
            >
              <thead>
                <tr
                  style={{
                    background: 'var(--color-accent)',
                    color: '#fff',
                    position: 'sticky',
                    top: 0,
                  }}
                >
                  <th
                    style={{
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: '13px',
                      position: 'sticky',
                      left: 0,
                      background: 'var(--color-accent)',
                    }}
                  >
                    Feature
                  </th>
                  <th
                    style={{
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: '13px',
                      minWidth: '140px',
                    }}
                  >
                    Glean
                  </th>
                  <th
                    style={{
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: '13px',
                      minWidth: '160px',
                    }}
                  >
                    Thursdai
                  </th>
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row, i) => (
                  <tr
                    key={row.feature}
                    style={{
                      background:
                        i % 2 === 0
                          ? 'var(--color-surface-primary)'
                          : 'var(--color-surface-secondary)',
                    }}
                  >
                    <td
                      style={{
                        padding: '0.75rem 1rem',
                        fontWeight: 500,
                        color: 'var(--color-text-primary)',
                        position: 'sticky',
                        left: 0,
                        background:
                          i % 2 === 0
                            ? 'var(--color-surface-primary)'
                            : 'var(--color-surface-secondary)',
                        fontSize: '14px',
                      }}
                    >
                      {row.feature}
                    </td>
                    <MatrixCell row={row} col="glean" />
                    <MatrixCell row={row} col="thursdai" />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ── When Glean is the right choice ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Callout variant="info" title="When Glean is the right choice">
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              <li>
                <strong>Your primary need is search, not governance.</strong> If you need to find
                documents across your company&apos;s SaaS stack and the query doesn&apos;t require
                role-based moderation or audit trails, Glean is built for that workflow and Thursdai
                is not.
              </li>
              <li>
                <strong>You&apos;re already deeply embedded in Google Workspace.</strong>{' '}
                Glean&apos;s Google Workspace integration is mature and deeply integrated. If your
                team lives in Docs and Drive, Glean&apos;s context is better there.
              </li>
              <li>
                <strong>Your budget is under $40K/year.</strong> Thursdai&apos;s SMB tier starts
                at $60K. If your budget doesn&apos;t reach that, Glean may be accessible at a
                lower price point.
              </li>
            </ul>
          </Callout>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <section
        style={{
          background: 'var(--color-surface-secondary)',
          padding: '3rem 0',
          textAlign: 'center',
        }}
      >
        <Container>
          <Heading2>See Thursdai for yourself</Heading2>
          <Body style={{ marginTop: '0.75rem' }}>The replay demo takes 2 minutes. No login required.</Body>
          <Link href="/?ref=compare-glean#replay-demo">
            <Button variant="primary" size="lg" style={{ marginTop: '1.5rem' }}>
              Try the replay demo →
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
