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
  title: 'Thursdai vs Writer',
  description:
    'Where Writer is strong and where Thursdai differs. Content generation with brand guardrails vs. governed decisions with full audit trail.',
};

type MatrixStatus = 'yes' | 'no' | 'partial' | 'in-progress';

interface MatrixRow {
  feature: string;
  writer: MatrixStatus | string;
  thursdai: MatrixStatus | string;
}

const MATRIX: MatrixRow[] = [
  { feature: 'Enterprise content generation', writer: 'yes', thursdai: 'no' },
  { feature: 'Brand voice enforcement', writer: 'yes', thursdai: 'no' },
  { feature: 'Style guide compliance', writer: 'yes', thursdai: 'no' },
  { feature: 'Marketing copy & templates', writer: 'yes', thursdai: 'no' },
  { feature: 'Role-based answer panel', writer: 'no', thursdai: 'yes' },
  { feature: 'Cross-functional moderation (Legal + Finance + Engineering)', writer: 'no', thursdai: 'yes' },
  { feature: 'Decision replay / time-travel', writer: 'no', thursdai: 'yes' },
  { feature: 'Policy-as-Code enforcement (inference-layer)', writer: 'partial', thursdai: 'yes' },
  { feature: 'Sentence-level provenance', writer: 'partial', thursdai: 'yes' },
  { feature: 'Tenant knowledge isolation', writer: 'yes', thursdai: 'yes' },
  { feature: 'EU AI Act Annex III documentation', writer: 'no', thursdai: 'yes' },
  { feature: 'FRIA/DPIA templates', writer: 'no', thursdai: 'yes' },
  { feature: 'MCP server (agent-to-agent)', writer: 'no', thursdai: 'yes' },
  { feature: 'Ambient case management', writer: 'no', thursdai: 'yes' },
  { feature: 'Audit log API', writer: 'partial', thursdai: 'yes' },
  { feature: 'SOC 2 Type II', writer: 'yes', thursdai: 'yes' },
  { feature: 'ISO 27001', writer: 'yes', thursdai: 'yes' },
  { feature: 'ISO 42001', writer: 'no', thursdai: 'in-progress' },
  { feature: 'HIPAA-eligible', writer: 'partial', thursdai: 'yes' },
];

function StatusCell({ value }: { value: MatrixStatus | string }) {
  if (value === 'yes') return <td style={{ padding: '0.75rem 1rem', fontSize: '15px' }}>✅</td>;
  if (value === 'no') return <td style={{ padding: '0.75rem 1rem', fontSize: '15px', color: 'var(--color-text-tertiary)' }}>✗</td>;
  if (value === 'partial') return <td style={{ padding: '0.75rem 1rem' }}><Badge variant="amber">Partial</Badge></td>;
  if (value === 'in-progress') return <td style={{ padding: '0.75rem 1rem' }}><Badge variant="amber">Planned</Badge></td>;
  return <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-secondary)' }}>{String(value)}</td>;
}

export default function CompareWriterPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section>
        <Container>
          <Label>Thursdai vs Writer</Label>
          <Heading1 style={{ marginTop: '0.75rem' }}>Brand guardrails aren&apos;t audit trails.</Heading1>
          <Body variant="large" style={{ marginTop: '1rem' }}>
            Writer is a strong enterprise content generation platform with brand guardrails.
            Thursdai is a governed agent substrate for regulated decisions. These solve different
            problems, but compliance teams often ask both questions in the same AI governance review.
          </Body>
        </Container>
      </Section>

      {/* ── Where Writer is strong ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2>Where Writer is strong</Heading2>
          <Body style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
            These are genuine strengths. If your primary need is one of these, Writer may be
            the right choice.
          </Body>
          <Grid cols={3} gap="md">
            <Card
              variant="feature"
              title="Enterprise content generation"
              body="Writer is built for high-volume enterprise content: marketing copy, internal communications, product descriptions. If your AI use case is generating consistent, on-brand text at scale, Writer's generation quality is strong."
            />
            <Card
              variant="feature"
              title="Brand voice and style enforcement"
              body="Writer's brand voice and style guide features are mature. If your primary governance concern is content consistency (not decision auditability), Writer's guardrails are purpose-built for that problem."
            />
            <Card
              variant="feature"
              title="Broad team accessibility"
              body="Writer is designed for non-technical users: marketing, communications and HR teams. If your priority is giving a broad internal audience access to AI with guardrails, Writer's UX is built for that."
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
            matter for regulated, high-stakes decisions.
          </Body>
          <Grid cols={2} gap="lg">
            <Card
              variant="feature"
              title="Decision governance vs content generation"
              body="Writer helps teams produce content. Thursdai governs decisions: pricing calls, contract approvals, compliance determinations. If the output has regulatory, legal or financial consequence, you need the audit trail and policy enforcement that Writer doesn't provide."
            />
            <Card
              variant="feature"
              title="Cross-functional moderation vs single model"
              body="Thursdai routes every question to Legal, Finance and Engineering simultaneously and reconciles their answers. Writer returns a single AI-generated response. For decisions that require multi-domain sign-off, Writer has no equivalent."
            />
            <Card
              variant="feature"
              title="Decision replay vs no audit trail"
              body="Every Thursdai decision is recorded with the exact knowledge and policies active at that moment. You can replay any decision from two years ago. Writer has no decision replay capability."
            />
            <Card
              variant="feature"
              title="Inference-layer enforcement vs prompt-level rules"
              body="Thursdai enforces policy in YAML at the inference layer: the model cannot override it. Writer's 'Rules' feature operates at the prompt level and can be worked around by the model or by rephrasing the request."
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
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '13px', minWidth: '140px' }}>Writer</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '13px', minWidth: '160px' }}>Thursdai</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row, i) => (
                  <tr key={row.feature} style={{ background: i % 2 === 0 ? 'var(--color-surface-primary)' : 'var(--color-surface-secondary)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: 'var(--color-text-primary)', position: 'sticky', left: 0, background: i % 2 === 0 ? 'var(--color-surface-primary)' : 'var(--color-surface-secondary)', fontSize: '14px' }}>
                      {row.feature}
                    </td>
                    <StatusCell value={row.writer} />
                    <StatusCell value={row.thursdai} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ── When Writer is the right choice ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Callout variant="info" title="When Writer is the right choice">
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              <li>
                <strong>Your primary need is content, not decisions.</strong> If the AI output
                is copy (blog posts, emails, internal comms) and it doesn&apos;t require a
                legal or compliance audit trail, Writer is purpose-built for that workflow.
              </li>
              <li>
                <strong>Brand voice is your governance concern, not regulatory compliance.</strong>{' '}
                Writer excels at enforcing consistent brand voice across a large team. If your
                governance concern is tone and style rather than policy and auditability,
                Writer&apos;s guardrails are more relevant.
              </li>
              <li>
                <strong>Your audience is non-technical content teams.</strong> Writer&apos;s
                interface is designed for marketers and communicators. If ease of adoption for
                non-technical users is the priority, Writer&apos;s UX is more accessible.
              </li>
            </ul>
          </Callout>
        </Container>
      </Section>

      {/* ── Bottom line ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Callout variant="info" title="Bottom line">
            Writer generates content. Thursdai governs decisions. If the AI output has legal,
            financial, or regulatory consequence, and you need to prove what happened and why,
            Writer alone isn&apos;t enough.
          </Callout>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--color-surface-secondary)', padding: '3rem 0', textAlign: 'center' }}>
        <Container>
          <Heading2>See Thursdai for yourself</Heading2>
          <Body style={{ marginTop: '0.75rem' }}>The replay demo takes 2 minutes. No login required.</Body>
          <Link href="/?ref=compare-writer#replay-demo">
            <Button variant="primary" size="lg" style={{ marginTop: '1.5rem' }}>
              Try the replay demo →
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
