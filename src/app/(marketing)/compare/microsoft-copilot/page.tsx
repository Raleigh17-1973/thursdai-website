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
import { Callout } from '@/components/ui/Callout';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Thursdai vs Microsoft Copilot: AI Governance vs AI Assistance',
  description:
    "Microsoft Copilot is the world's best writing assistant. It's not a decision governance platform. Here's where they diverge.",
};

type MatrixStatus = 'yes' | 'no' | 'partial' | 'text';

interface MatrixRow {
  feature: string;
  copilot: MatrixStatus | string;
  thursdai: MatrixStatus | string;
}

const MATRIX: MatrixRow[] = [
  { feature: 'AI writing & drafting', copilot: 'text', thursdai: 'text' },
  { feature: 'Office 365 integration', copilot: 'yes', thursdai: 'no' },
  { feature: 'Decision audit trail', copilot: 'no', thursdai: 'yes' },
  { feature: 'Role-based deliberation', copilot: 'no', thursdai: 'yes' },
  { feature: 'Policy enforcement (hard constraints)', copilot: 'no', thursdai: 'yes' },
  { feature: 'Decision replay / time-travel', copilot: 'no', thursdai: 'yes' },
  { feature: 'Foundation-model choice', copilot: 'text', thursdai: 'text' },
  { feature: 'EU AI Act compliance tooling', copilot: 'partial', thursdai: 'yes' },
];

const COPILOT_WRITING = 'copilot';
const THURSDAI_WRITING = 'thursdai';

function MatrixCell({ row, col }: { row: MatrixRow; col: 'copilot' | 'thursdai' }) {
  const value = row[col];

  if (row.feature === 'AI writing & drafting') {
    if (col === COPILOT_WRITING) {
      return (
        <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-primary)' }}>
          ✓ Excellent
        </td>
      );
    }
    return (
      <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
        Via API
      </td>
    );
  }

  if (row.feature === 'Foundation-model choice') {
    if (col === COPILOT_WRITING) {
      return (
        <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Microsoft/OpenAI only
        </td>
      );
    }
    return (
      <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
        Claude, GPT-4o, Gemini
      </td>
    );
  }

  if (row.feature === 'EU AI Act compliance tooling' && col === COPILOT_WRITING) {
    return (
      <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
        Limited
      </td>
    );
  }

  if (row.feature === 'EU AI Act compliance tooling' && col === THURSDAI_WRITING) {
    return (
      <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-primary)' }}>
        ✓ Full Annex III mapping
      </td>
    );
  }

  if (value === 'yes') {
    return <td style={{ padding: '0.75rem 1rem', fontSize: '15px' }}>✅</td>;
  }
  if (value === 'no') {
    return (
      <td style={{ padding: '0.75rem 1rem', fontSize: '15px', color: 'var(--color-text-tertiary)' }}>
        ✗
      </td>
    );
  }
  if (value === 'partial') {
    return (
      <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
        Limited
      </td>
    );
  }
  return (
    <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
      {String(value)}
    </td>
  );
}

export default function CompareMicrosoftCopilotPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section>
        <Container>
          <Label>Thursdai vs Microsoft Copilot</Label>
          <Heading1 style={{ marginTop: '0.75rem' }}>
            Microsoft Copilot is the best writing assistant in the world. It is not a decision
            governance platform.
          </Heading1>
          <Body variant="large" style={{ marginTop: '1rem' }}>
            When your compliance team asks &ldquo;what did the AI say and why,&rdquo; Copilot has
            no answer. Thursdai does. These are different tools for different problems.
          </Body>
        </Container>
      </Section>

      {/* ── Where Copilot is strong ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2>Where Copilot is strong</Heading2>
          <Body style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
            These are genuine strengths. If your primary need is one of these, Copilot may be the
            right choice.
          </Body>
          <Grid cols={3} gap="md">
            <Card
              variant="feature"
              title="Deep Office 365 integration"
              body="Copilot is embedded in Word, Excel, Outlook, Teams and every Microsoft application. If your team lives in Microsoft 365, Copilot is the lowest-friction AI available."
            />
            <Card
              variant="feature"
              title="World-class language model"
              body="Copilot is powered by GPT-4o. The underlying model quality is excellent: fast, capable and accurate for drafting, summarisation and writing tasks."
            />
            <Card
              variant="feature"
              title="Enterprise-scale deployment"
              body="Microsoft's enterprise distribution, security posture and compliance certifications (FedRAMP, ISO 27001) make Copilot easy to clear procurement for large organisations."
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
              title="Decision audit trail"
              body="Copilot has no audit trail for decisions. If your auditor asks 'what did the AI say and why', there is no record. Thursdai logs every decision with the knowledge state, policy set and role breakdown that governed it."
            />
            <Card
              variant="feature"
              title="Role-based deliberation"
              body="Copilot gives you one AI perspective. Thursdai gives you Legal, Finance and Operations simultaneously, with disagreements flagged and sources cited before the answer reaches you."
            />
            <Card
              variant="feature"
              title="Policy enforcement at inference"
              body="Copilot's safety guardrails are prompt-level: the model can reason around them. Thursdai enforces policies as hard constraints at the inference layer. The model cannot quote below your pricing floor or make a regulatory claim without a citation."
            />
            <Card
              variant="feature"
              title="Decision replay"
              body="Copilot cannot replay a decision from 6 months ago and show you what knowledge was active. Thursdai's Time-Travel engine lets you reconstruct any decision: what the AI knew, what rules were in effect, what it said."
            />
            <Card
              variant="feature"
              title="Foundation-model agnostic"
              body="Copilot is tied to OpenAI models via Microsoft's stack. Thursdai runs on Claude, GPT-4o, or Gemini, whichever model your team prefers."
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
                      minWidth: '180px',
                    }}
                  >
                    Microsoft Copilot
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
                    <MatrixCell row={row} col="copilot" />
                    <MatrixCell row={row} col="thursdai" />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ── When Copilot is the right choice ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Callout variant="info" title="When Copilot is the right choice">
            <p style={{ marginTop: '0.5rem', lineHeight: 1.7 }}>
              If your team primarily needs AI-assisted writing, summarisation or drafting within
              Microsoft 365, Copilot is the right choice. It is best-in-class for that use case.
              Thursdai is the right choice when those AI outputs need to be governed, audited, and
              replayable.
            </p>
          </Callout>
        </Container>
      </Section>

      {/* ── Bottom line ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Callout variant="info" title="Bottom line">
            If your team needs to explain every AI-assisted decision to a regulator, a client or a board, Copilot cannot do that. Thursdai can.
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
          <Link href="/?ref=compare-copilot#replay-demo">
            <Button variant="primary" size="lg" style={{ marginTop: '1.5rem' }}>
              Try the replay demo →
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
