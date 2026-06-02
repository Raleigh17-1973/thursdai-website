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
  title: 'Thursdai vs Harvey',
  description:
    'Where Harvey is strong and where Thursdai differs. Legal AI for lawyers vs. cross-functional AI governance infrastructure.',
};

type MatrixStatus = 'yes' | 'no' | 'partial' | 'in-progress';

interface MatrixRow {
  feature: string;
  harvey: MatrixStatus | string;
  thursdai: MatrixStatus | string;
}

const MATRIX: MatrixRow[] = [
  { feature: 'Legal document drafting', harvey: 'yes', thursdai: 'no' },
  { feature: 'Contract review & redlining', harvey: 'yes', thursdai: 'no' },
  { feature: 'Legal research', harvey: 'yes', thursdai: 'no' },
  { feature: 'Due diligence support', harvey: 'yes', thursdai: 'no' },
  { feature: 'Matter management', harvey: 'yes', thursdai: 'no' },
  { feature: 'Role-based answer panel', harvey: 'no', thursdai: 'yes' },
  { feature: 'Cross-functional moderation (Legal + Finance + Engineering)', harvey: 'no', thursdai: 'yes' },
  { feature: 'Decision replay / time-travel', harvey: 'no', thursdai: 'yes' },
  { feature: 'Policy-as-Code enforcement', harvey: 'no', thursdai: 'yes' },
  { feature: 'Sentence-level provenance', harvey: 'partial', thursdai: 'yes' },
  { feature: 'Tenant knowledge isolation', harvey: 'yes', thursdai: 'yes' },
  { feature: 'EU AI Act Annex III documentation', harvey: 'no', thursdai: 'yes' },
  { feature: 'FRIA/DPIA templates', harvey: 'no', thursdai: 'yes' },
  { feature: 'Published pricing', harvey: 'no', thursdai: 'yes' },
  { feature: 'MCP server (agent-to-agent)', harvey: 'no', thursdai: 'yes' },
  { feature: 'Ambient case management', harvey: 'partial', thursdai: 'yes' },
  { feature: 'Audit log API', harvey: 'partial', thursdai: 'yes' },
  { feature: 'SOC 2 Type II', harvey: 'yes', thursdai: 'yes' },
  { feature: 'ISO 27001', harvey: 'yes', thursdai: 'yes' },
  { feature: 'ISO 42001', harvey: 'no', thursdai: 'in-progress' },
  { feature: 'HIPAA-eligible', harvey: 'partial', thursdai: 'yes' },
];

function StatusCell({ value }: { value: MatrixStatus | string }) {
  if (value === 'yes') return <td style={{ padding: '0.75rem 1rem', fontSize: '15px' }}>✅</td>;
  if (value === 'no') return <td style={{ padding: '0.75rem 1rem', fontSize: '15px', color: 'var(--color-text-tertiary)' }}>✗</td>;
  if (value === 'partial') return <td style={{ padding: '0.75rem 1rem' }}><Badge variant="amber">Partial</Badge></td>;
  if (value === 'in-progress') return <td style={{ padding: '0.75rem 1rem' }}><Badge variant="amber">In progress</Badge></td>;
  return <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-secondary)' }}>{String(value)}</td>;
}

export default function CompareHarveyPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section>
        <Container>
          <Label>Thursdai vs Harvey</Label>
          <Heading1 style={{ marginTop: '0.75rem' }}>Legal AI for lawyers. Governance infrastructure for the whole enterprise.</Heading1>
          <Body variant="large" style={{ marginTop: '1rem' }}>
            Harvey is a strong AI platform purpose-built for legal professionals. Thursdai is
            governance infrastructure for cross-functional enterprise AI decisions. These operate
            at different layers, but legal and compliance teams often evaluate both.
          </Body>
        </Container>
      </Section>

      {/* ── Where Harvey is strong ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2>Where Harvey is strong</Heading2>
          <Body style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
            These are genuine strengths. If your primary need is one of these, Harvey may be
            the right choice.
          </Body>
          <Grid cols={3} gap="md">
            <Card
              variant="feature"
              title="Legal document drafting"
              body="Harvey is purpose-built for lawyers drafting contracts, briefs and memos. The model is trained on legal corpora and understands legal language, structure and risk in ways general models don't. For legal drafting at scale, Harvey's quality is real."
            />
            <Card
              variant="feature"
              title="Contract review and redlining"
              body="Harvey can review contracts, flag non-standard clauses and suggest redlines in context. If your primary workflow is contract review, especially in volume, Harvey's legal specialization gives it an edge over general AI tools."
            />
            <Card
              variant="feature"
              title="Legal research depth"
              body="Harvey integrates with legal research platforms and understands case law, precedent and statute in ways that matter to attorneys. For lawyers doing deep legal research, Harvey's domain specialization is valuable."
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
            matter when decisions cross domain lines.
          </Body>
          <Grid cols={2} gap="lg">
            <Card
              variant="feature"
              title="Cross-functional governance vs single-domain AI"
              body="Harvey is built for legal professionals doing legal work. Thursdai governs decisions that simultaneously require Legal, Finance and Engineering input, and reconciles them. If a decision crosses domain lines, Harvey has no answer for Finance or Engineering."
            />
            <Card
              variant="feature"
              title="Decision replay vs no audit trail"
              body="Every Thursdai decision is recorded with the knowledge and policies active at that exact moment. You can replay any decision from two years ago with full provenance. Harvey has no decision replay capability. Decisions are stateless."
            />
            <Card
              variant="feature"
              title="Policy-as-Code vs no enforcement layer"
              body="Thursdai enforces governance rules at the inference layer in YAML (pricing floors, PII blocks, role scope constraints) before any answer reaches a user. Harvey has no equivalent policy enforcement mechanism across domains."
            />
            <Card
              variant="feature"
              title="Infrastructure vs application"
              body="Harvey is a legal work application. Thursdai is infrastructure that other applications and agents call. If you need governed AI across your entire enterprise stack, not just your legal team, Thursdai operates at a different layer."
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
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '13px', minWidth: '140px' }}>Harvey</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '13px', minWidth: '160px' }}>Thursdai</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row, i) => (
                  <tr key={row.feature} style={{ background: i % 2 === 0 ? 'var(--color-surface-primary)' : 'var(--color-surface-secondary)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: 'var(--color-text-primary)', position: 'sticky', left: 0, background: i % 2 === 0 ? 'var(--color-surface-primary)' : 'var(--color-surface-secondary)', fontSize: '14px' }}>
                      {row.feature}
                    </td>
                    <StatusCell value={row.harvey} />
                    <StatusCell value={row.thursdai} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ── When Harvey is the right choice ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Callout variant="info" title="When Harvey is the right choice">
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              <li>
                <strong>Your primary users are attorneys doing legal work.</strong> Harvey&apos;s
                domain specialization (legal drafting, contract review, legal research) is
                purpose-built for lawyers. If the user is an attorney and the work is legal,
                Harvey&apos;s depth in that domain is ahead of general-purpose governance infrastructure.
              </li>
              <li>
                <strong>Your AI use case stays within the legal department.</strong> If the
                decisions you need to govern are entirely legal in nature, with no Finance or
                Engineering input required, Harvey&apos;s legal specialization may be more
                valuable than cross-functional governance.
              </li>
              <li>
                <strong>You need legal research platform integration.</strong> Harvey&apos;s
                integrations with legal research platforms and matter management systems are
                mature. If your workflow depends on those integrations, Harvey&apos;s ecosystem
                is ahead.
              </li>
            </ul>
          </Callout>
        </Container>
      </Section>

      {/* ── Bottom line ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Callout variant="info" title="Bottom line">
            Harvey makes lawyers faster. Thursdai governs decisions across Legal, Finance and
            Engineering simultaneously. If a decision requires more than one domain and you need
            to audit it, Harvey alone isn&apos;t the answer.
          </Callout>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--color-surface-secondary)', padding: '3rem 0', textAlign: 'center' }}>
        <Container>
          <Heading2>See Thursdai for yourself</Heading2>
          <Body style={{ marginTop: '0.75rem' }}>The replay demo takes 2 minutes. No login required.</Body>
          <Link href="/?ref=compare-harvey#replay-demo">
            <Button variant="primary" size="lg" style={{ marginTop: '1.5rem' }}>
              Try the replay demo →
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
