import React from 'react';
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
import { ClosingCTAs } from '@/components/ui/ClosingCTAs';

export const metadata: Metadata = {
  title: 'Thursdai vs Glean',
  description:
    'Where Glean is strong and where Thursdai differs. Feature matrix, real-world scenarios and a signed sample receipt you can verify in the Thursdai demo.',
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
      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
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
        <span style={{ fontSize: '15px' }}>✓</span>
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
        ✓ dedicated+
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
      <td style={{ padding: '0.75rem 1rem', fontSize: '15px' }}>✓</td>
    );
  }
  if (value === 'no') {
    return (
      <td style={{ padding: '0.75rem 1rem', fontSize: '15px', color: 'var(--color-text-secondary)' }}>✗</td>
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
        <Badge variant="amber">Planned</Badge>
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
          <Heading1 style={{ marginTop: '0.75rem' }}>Search is not governance.</Heading1>
          <Body variant="large" style={{ marginTop: '1rem' }}>
            Glean is a strong enterprise search and knowledge product. Thursdai is a governed agent
            substrate. These are different tools for different problems, but they&apos;re often
            evaluated together. Here&apos;s where each excels.
          </Body>
        </Container>
      </Section>

      {/* ── Where Glean is strong ── */}
      <Section variant="compact">
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
              body="Glean has been in production at large enterprises since 2022. It has a track record, case studies and a well-understood security model that procurement teams know."
            />
            <Card
              variant="feature"
              title="Broad connector ecosystem"
              body="Deep integrations with Google Workspace, Microsoft 365, Salesforce, Jira and dozens more. If your workflow is connector-dependent, Glean's ecosystem is mature."
            />
          </Grid>
        </Container>
      </Section>

      {/* ── Where Thursdai differs ── */}
      <Section variant="default">
        <Container>
          <Heading2>Where Thursdai differs</Heading2>
          <Body style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
            These aren&apos;t feature comparisons. They&apos;re architectural differences that
            matter for regulated use cases.
          </Body>
          <Grid cols={2} gap="lg">
            <Card
              variant="feature"
              title="Role-based panel vs single-model response"
              body="Thursdai routes every question to Legal, Finance and Engineering simultaneously and reconciles their answers. Glean returns a single AI-generated response. For regulated decisions, you need to know which domain drove the answer."
            />
            <Card
              variant="feature"
              title="Decision replay vs no audit trail"
              body="Thursdai records every decision with the knowledge and policies active at the time. You can replay any decision from 2 years ago. Glean has no equivalent: answers are stateless."
            />
            <Card
              variant="feature"
              title="Policy-as-Code vs UI-only guardrails"
              body="Thursdai enforces governance rules at the inference layer in YAML: the model cannot override them. Glean's guardrails are prompt-level and can be worked around by the model."
            />
            <Card
              variant="feature"
              title="EU AI Act Annex III readiness"
              body="Thursdai documents its Annex III obligations mapping, provides FRIA/DPIA templates and has audit logs meeting the Act's record-keeping requirements. Glean has no published EU AI Act compliance surface."
            />
          </Grid>
        </Container>
      </Section>

      {/* ── Feature matrix ── */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Feature matrix</Heading2>
          <div style={{ overflowX: 'auto' }}>
            <table className="rec-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      position: 'sticky',
                      left: 0,
                      background: 'var(--sunk)',
                    }}
                  >
                    Feature
                  </th>
                  <th scope="col" style={{ padding: '0.75rem 1rem', textAlign: 'left', minWidth: '140px' }}>
                    Glean
                  </th>
                  <th scope="col" style={{ padding: '0.75rem 1rem', textAlign: 'left', minWidth: '160px' }}>
                    Thursdai
                  </th>
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row) => (
                  <tr key={row.feature}>
                    <th
                      scope="row"
                      style={{
                        padding: '0.75rem 1rem',
                        textAlign: 'left',
                        fontWeight: 500,
                        fontFamily: 'var(--font-sans)',
                        fontSize: '14px',
                        textTransform: 'none',
                        letterSpacing: 'normal',
                        color: 'var(--color-text-primary)',
                        position: 'sticky',
                        left: 0,
                        background: 'var(--color-surface-primary)',
                      }}
                    >
                      {row.feature}
                    </th>
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
      <Section variant="compact">
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
                <strong>You need a lower-cost entry point.</strong> Thursdai is built for
                enterprise budgets; if cost is the deciding factor, Glean may be more accessible.
              </li>
            </ul>
          </Callout>
        </Container>
      </Section>

      {/* ── Bottom line ── */}
      <Section variant="compact">
        <Container>
          <Callout variant="info" title="Bottom line">
            Glean finds information. Thursdai governs decisions. If your team needs AI that surfaces knowledge AND answers for it, Glean alone isn&apos;t enough.
          </Callout>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section tone="ink" variant="compact" style={{ textAlign: 'center' }}>
        <Container>
          <Heading2>Put your own AI decisions on the record</Heading2>
          <Body style={{ marginTop: '0.75rem' }}>
            A pilot connects one of your AI systems to your own tenant. Before that, the demo shows a
            signed sample receipt you can verify yourself, with no login.
          </Body>
          <ClosingCTAs primary="pilot" align="center" style={{ marginTop: '1.5rem' }} />
        </Container>
      </Section>    </>
  );
}
