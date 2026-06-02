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
  title: 'Thursdai vs ChatGPT Enterprise: Governance vs Capability',
  description:
    "ChatGPT Enterprise gives you a powerful private AI. It gives you no audit trail, no role-based deliberation and no policy enforcement. Here's where they diverge.",
};

type MatrixStatus = 'yes' | 'no' | 'partial' | 'text';

interface MatrixRow {
  feature: string;
  chatgpt: MatrixStatus | string;
  thursdai: MatrixStatus | string;
}

const MATRIX: MatrixRow[] = [
  { feature: 'Language model quality', chatgpt: 'text', thursdai: 'text' },
  { feature: 'Data privacy', chatgpt: 'yes', thursdai: 'yes' },
  { feature: 'Decision audit trail', chatgpt: 'no', thursdai: 'yes' },
  { feature: 'Role-based deliberation', chatgpt: 'no', thursdai: 'yes' },
  { feature: 'Policy enforcement (hard constraints)', chatgpt: 'no', thursdai: 'yes' },
  { feature: 'Decision replay / time-travel', chatgpt: 'no', thursdai: 'yes' },
  { feature: 'Foundation-model choice', chatgpt: 'text', thursdai: 'text' },
  { feature: 'EU AI Act compliance tooling', chatgpt: 'partial', thursdai: 'yes' },
  { feature: 'Published pricing', chatgpt: 'yes', thursdai: 'yes' },
];

function MatrixCell({ row, col }: { row: MatrixRow; col: 'chatgpt' | 'thursdai' }) {
  const value = row[col];

  if (row.feature === 'Language model quality') {
    if (col === 'chatgpt') {
      return (
        <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-primary)' }}>
          ✓ GPT-4o (excellent)
        </td>
      );
    }
    return (
      <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
        Via API (Claude, GPT-4o, Gemini)
      </td>
    );
  }

  if (row.feature === 'Foundation-model choice') {
    if (col === 'chatgpt') {
      return (
        <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          OpenAI only
        </td>
      );
    }
    return (
      <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
        Claude, GPT-4o, Gemini
      </td>
    );
  }

  if (row.feature === 'EU AI Act compliance tooling' && col === 'chatgpt') {
    return (
      <td style={{ padding: '0.75rem 1rem', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
        Limited
      </td>
    );
  }

  if (row.feature === 'EU AI Act compliance tooling' && col === 'thursdai') {
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

export default function CompareChatGPTEnterprisePage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section>
        <Container>
          <Label>Thursdai vs ChatGPT Enterprise</Label>
          <Heading1 style={{ marginTop: '0.75rem' }}>
            ChatGPT Enterprise gives you a private, powerful AI. It gives you no record of what it
            said.
          </Heading1>
          <Body variant="large" style={{ marginTop: '1rem' }}>
            For teams where AI outputs have legal or compliance implications, that gap costs money.
            Thursdai adds the governance layer that no raw AI platform provides.
          </Body>
        </Container>
      </Section>

      {/* ── Where ChatGPT Enterprise is strong ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2>Where ChatGPT Enterprise is strong</Heading2>
          <Body style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
            These are genuine strengths. If your primary need is one of these, ChatGPT Enterprise
            may be the right choice.
          </Body>
          <Grid cols={3} gap="md">
            <Card
              variant="feature"
              title="World's most capable model"
              body="GPT-4o is the most capable general-purpose language model available. For open-ended reasoning, coding, analysis and drafting, it is the strongest tool in the market."
            />
            <Card
              variant="feature"
              title="Private, secure instance"
              body="ChatGPT Enterprise provides data isolation, SOC 2 certification and no training on your data. It clears most enterprise security requirements."
            />
            <Card
              variant="feature"
              title="Broad ecosystem"
              body="OpenAI's plugin and tools ecosystem is the largest in the industry. Thousands of integrations, a mature API and extensive documentation."
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
              title="No audit trail in ChatGPT"
              body="ChatGPT Enterprise has no decision audit trail. Conversations are logged but there is no structured record of what knowledge was active, what rules applied or what policy governed an answer."
            />
            <Card
              variant="feature"
              title="Prompt-level guardrails only"
              body="ChatGPT's system prompt is your only governance tool, and a sophisticated user or adversarial input can reason around it. Thursdai enforces constraints at the inference layer before any answer is formed."
            />
            <Card
              variant="feature"
              title="No role-based synthesis"
              body="ChatGPT gives you one model's perspective. Thursdai gives you Legal, Finance and Operations simultaneously, with the Moderator synthesising disagreements and citing sources."
            />
            <Card
              variant="feature"
              title="No decision replay"
              body="You cannot go back 18 months and reconstruct what ChatGPT knew, what it said and what rules were active at that moment. Thursdai's replay engine makes every decision replayable indefinitely."
            />
            <Card
              variant="feature"
              title="Model lock-in"
              body="ChatGPT Enterprise is OpenAI-only. Thursdai runs on Claude, GPT-4o, or Gemini, and you can switch models without changing your governance layer."
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
                      minWidth: '200px',
                    }}
                  >
                    ChatGPT Enterprise
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
                    <MatrixCell row={row} col="chatgpt" />
                    <MatrixCell row={row} col="thursdai" />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ── When ChatGPT Enterprise is the right choice ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Callout variant="info" title="When ChatGPT Enterprise is the right choice">
            <p style={{ marginTop: '0.5rem', lineHeight: 1.7 }}>
              If your team needs a capable, private AI for general-purpose work (writing, analysis,
              coding), ChatGPT Enterprise is excellent. Thursdai is the right choice when those
              outputs need to be governed, audited and defensible to regulators or auditors.
            </p>
          </Callout>
        </Container>
      </Section>

      {/* ── Bottom line ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Callout variant="info" title="Bottom line">
            ChatGPT Enterprise is a powerful general assistant. Thursdai is governance infrastructure. They solve different problems. For regulated teams, governance isn&apos;t optional.
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
          <Heading2>See Thursdai pricing</Heading2>
          <Body style={{ marginTop: '0.75rem' }}>
            Published pricing. No &ldquo;contact us.&rdquo; No surprises.
          </Body>
          <Link href="/pricing?ref=compare-chatgpt">
            <Button variant="primary" size="lg" style={{ marginTop: '1.5rem' }}>
              See Thursdai pricing →
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
