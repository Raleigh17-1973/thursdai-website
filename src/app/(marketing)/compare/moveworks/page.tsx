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
  title: 'Thursdai vs Moveworks — Thursdai',
  description:
    'Where Moveworks is strong and where Thursdai differs. IT service automation vs. cross-functional AI governance.',
};

type MatrixStatus = 'yes' | 'no' | 'partial' | 'in-progress';

interface MatrixRow {
  feature: string;
  moveworks: MatrixStatus | string;
  thursdai: MatrixStatus | string;
  note?: { col: 'moveworks' | 'thursdai'; label: string };
}

const MATRIX: MatrixRow[] = [
  { feature: 'IT service automation', moveworks: 'yes', thursdai: 'no' },
  { feature: 'HR service delivery', moveworks: 'yes', thursdai: 'no' },
  { feature: 'Agentic IT ticket resolution', moveworks: 'yes', thursdai: 'no' },
  { feature: 'Role-based answer panel', moveworks: 'no', thursdai: 'yes' },
  { feature: 'Cross-functional moderation (Legal + Finance + Engineering)', moveworks: 'no', thursdai: 'yes' },
  { feature: 'Decision replay / time-travel', moveworks: 'no', thursdai: 'yes' },
  { feature: 'Policy-as-Code enforcement', moveworks: 'no', thursdai: 'yes' },
  { feature: 'Sentence-level provenance', moveworks: 'no', thursdai: 'yes' },
  { feature: 'Tenant knowledge isolation', moveworks: 'yes', thursdai: 'yes' },
  { feature: 'EU AI Act Annex III documentation', moveworks: 'no', thursdai: 'yes' },
  { feature: 'FRIA/DPIA templates', moveworks: 'no', thursdai: 'yes' },
  { feature: 'Published pricing', moveworks: 'no', thursdai: 'yes' },
  { feature: 'MCP server (agent-to-agent)', moveworks: 'no', thursdai: 'yes' },
  { feature: 'Ambient case management', moveworks: 'partial', thursdai: 'yes' },
  { feature: 'Audit log API', moveworks: 'partial', thursdai: 'yes' },
  { feature: 'SOC 2 Type II', moveworks: 'yes', thursdai: 'yes' },
  { feature: 'ISO 27001', moveworks: 'yes', thursdai: 'yes' },
  { feature: 'ISO 42001', moveworks: 'no', thursdai: 'in-progress' },
  { feature: 'HIPAA-eligible', moveworks: 'yes', thursdai: 'yes' },
];

function StatusCell({ value }: { value: MatrixStatus | string }) {
  if (value === 'yes') return <td style={{ padding: '0.75rem 1rem', fontSize: '15px' }}>✅</td>;
  if (value === 'no') return <td style={{ padding: '0.75rem 1rem', fontSize: '15px', color: 'var(--color-text-tertiary)' }}>✗</td>;
  if (value === 'partial') return <td style={{ padding: '0.75rem 1rem' }}><Badge variant="amber">Partial</Badge></td>;
  if (value === 'in-progress') return <td style={{ padding: '0.75rem 1rem' }}><Badge variant="amber">In progress</Badge></td>;
  return <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-secondary)' }}>{String(value)}</td>;
}

export default function CompareMoveworksPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section>
        <Container>
          <Label>Thursdai vs Moveworks</Label>
          <Heading1 style={{ marginTop: '0.75rem' }}>Ticket deflection isn&apos;t decision governance.</Heading1>
          <Body variant="large" style={{ maxWidth: '640px', marginTop: '1rem' }}>
            Moveworks is a strong IT and HR service automation platform. Thursdai is a governed
            agent substrate for cross-functional regulated decisions. These solve different
            problems — but enterprises often evaluate them in the same AI governance review.
          </Body>
        </Container>
      </Section>

      {/* ── Where Moveworks is strong ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2>Where Moveworks is strong</Heading2>
          <Body style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
            These are genuine strengths. If your primary need is one of these, Moveworks may be
            the right choice.
          </Body>
          <Grid cols={3} gap="md">
            <Card
              variant="feature"
              title="IT helpdesk automation"
              body="Moveworks resolves IT tickets autonomously — password resets, software access, hardware requests. If your primary AI use case is deflecting IT service volume, Moveworks is purpose-built for that."
            />
            <Card
              variant="feature"
              title="HR service delivery"
              body="Deep integrations with Workday, ServiceNow, and HRIS systems. Moveworks handles onboarding, benefits queries, and PTO requests without human intervention. The employee experience layer is polished."
            />
            <Card
              variant="feature"
              title="Agentic workflow orchestration"
              body="Moveworks can chain multi-step IT workflows — provision access, spin up environments, notify stakeholders — without a human in the loop. For IT automation at scale, the orchestration depth is real."
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
            matter for regulated, cross-functional decisions.
          </Body>
          <Grid cols={2} gap="lg">
            <Card
              variant="feature"
              title="Cross-functional moderation vs single-domain automation"
              body="Moveworks operates in IT and HR. Thursdai simultaneously routes questions to Legal, Finance, and Engineering — reconciles their answers, and applies cross-role policies. If a decision touches more than one domain, Moveworks has no answer for that."
            />
            <Card
              variant="feature"
              title="Decision replay vs stateless responses"
              body="Every Thursdai decision is recorded with the knowledge and policies active at that moment. You can replay any decision from two years ago with full provenance. Moveworks has no decision replay capability — responses are stateless."
            />
            <Card
              variant="feature"
              title="Policy-as-Code vs no governance layer"
              body="Thursdai enforces governance rules at the inference layer in YAML — the model cannot override them. Moveworks has no equivalent policy enforcement mechanism for cross-functional decisions."
            />
            <Card
              variant="feature"
              title="EU AI Act readiness vs no compliance surface"
              body="Thursdai documents Annex III obligations, provides FRIA/DPIA templates, and has audit logs meeting the Act's record-keeping requirements. Moveworks has no published EU AI Act compliance surface for high-risk AI use cases."
            />
          </Grid>
        </Container>
      </Section>

      {/* ── Feature matrix ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Feature matrix</Heading2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--color-accent)', color: '#fff', position: 'sticky', top: 0 }}>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '13px', position: 'sticky', left: 0, background: 'var(--color-accent)' }}>Feature</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '13px', minWidth: '140px' }}>Moveworks</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '13px', minWidth: '160px' }}>Thursdai</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row, i) => (
                  <tr key={row.feature} style={{ background: i % 2 === 0 ? 'var(--color-surface-primary)' : 'var(--color-surface-secondary)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: 'var(--color-text-primary)', position: 'sticky', left: 0, background: i % 2 === 0 ? 'var(--color-surface-primary)' : 'var(--color-surface-secondary)', fontSize: '14px' }}>
                      {row.feature}
                    </td>
                    <StatusCell value={row.moveworks} />
                    <StatusCell value={row.thursdai} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ── When Moveworks is the right choice ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Callout variant="info" title="When Moveworks is the right choice">
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              <li>
                <strong>Your primary use case is IT or HR service automation.</strong> If the
                goal is deflecting helpdesk tickets and automating onboarding workflows, Moveworks
                is purpose-built and proven at enterprise scale. Thursdai is not an IT automation platform.
              </li>
              <li>
                <strong>You need deep ServiceNow or Workday integration.</strong> Moveworks has
                mature, production-hardened integrations with the major ITSM and HRIS platforms.
                If your workflows live there, Moveworks&apos; integrations are ahead.
              </li>
              <li>
                <strong>Your decisions are single-domain.</strong> If all your AI decisions
                stay within IT or HR and don&apos;t require Legal or Finance input, Moveworks&apos;
                single-domain depth may be sufficient.
              </li>
            </ul>
          </Callout>
        </Container>
      </Section>

      {/* ── Bottom line ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Callout variant="info" title="Bottom line">
            Moveworks automates IT and HR service delivery. Thursdai governs cross-functional
            decisions in regulated workflows. If your AI decisions touch Legal, Finance, or
            Engineering — and you need to audit them — Moveworks alone isn&apos;t the answer.
          </Callout>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--color-surface-secondary)', padding: '3rem 0', textAlign: 'center' }}>
        <Container>
          <Heading2>See Thursdai for yourself</Heading2>
          <Body style={{ marginTop: '0.75rem' }}>The replay demo takes 2 minutes. No login required.</Body>
          <Link href="/?ref=compare-moveworks#replay-demo">
            <Button variant="primary" size="lg" style={{ marginTop: '1.5rem' }}>
              Try the replay demo →
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
