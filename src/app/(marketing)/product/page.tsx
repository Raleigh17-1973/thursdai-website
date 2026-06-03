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
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Product: Thursdai',
  description:
    'The capabilities that let regulated enterprises actually deploy AI: role-based moderation, decision replay, policy enforcement, ambient case assembly, isolated knowledge and signed compliance packs.',
};

const PILLARS = [
  {
    label: 'The record',
    title: 'AI Receipts',
    href: '/product/ai-receipts',
    description:
      'Every AI decision is recorded as a signed AI Receipt: the answer, the roles, the policies and the sources. The provable record behind every answer.',
    callout: 'Provable record',
  },
  {
    label: 'Replay',
    title: 'Time-Travel',
    href: '/product/time-travel',
    description:
      'Reopen any AI Receipt exactly as it was, with the knowledge base, role definitions and policy set that were live at that moment.',
    callout: 'Decision replay',
  },
  {
    label: 'Evidence',
    title: 'Compliance Packs',
    href: '/product/compliance-packs',
    description:
      'Bundle the relevant receipts into a signed, framework-shaped evidence pack on demand. The auditor-ready form of the record.',
    callout: 'Signed audit packs',
  },
  {
    label: 'Constraints',
    title: 'Policy-as-Code',
    href: '/product/policy-as-code',
    description:
      'Express governance rules in plain YAML. Thursdai enforces them at the inference layer, before any answer reaches a user, and records them on every receipt.',
    callout: 'Hard constraint enforcement',
  },
  {
    label: 'Knowledge',
    title: 'Two-Tier Knowledge',
    href: '/product/two-tier-knowledge',
    description:
      'A shared standard corpus of regulatory frameworks and best practices, plus a cryptographically isolated tenant layer for your proprietary policies and precedents. Never mixed.',
    callout: 'Knowledge isolation',
  },
  {
    label: 'Cases',
    title: 'Ambient Cases',
    href: '/product/ambient-cases',
    description:
      'Thursdai monitors your event streams and assembles structured case files in the background. By the time an investigator opens a case, the evidence is already there.',
    callout: 'Background case assembly',
  },
  {
    label: 'The panel',
    title: 'Moderator',
    href: '/product/moderator',
    description:
      'Legal, Finance and Engineering deliberate before any answer reaches a user. The panel behind every answer, and the substance each receipt records.',
    callout: 'Multi-role deliberation',
  },
];

export default function ProductPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section>
        <Container>
          <Label>Product</Label>
          <Heading1 style={{ marginTop: '0.75rem' }}>
            The governed agent substrate.
          </Heading1>
          <Body variant="large" style={{ marginTop: '1rem' }}>
            Every AI decision becomes a provable record. These capabilities, designed together, let
            regulated enterprises deploy AI that documents every decision, enforces policy
            automatically and produces audit-ready evidence.
          </Body>
        </Container>
      </Section>

      {/* ── Five pillars ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Grid cols={3} gap="lg">
            {PILLARS.map((pillar) => (
              <Card
                key={pillar.href}
                variant="feature"
                title={pillar.title}
                body={pillar.description}
                href={pillar.href}
                className="h-full"
              />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ── How they fit together ── */}
      <Section variant="compact">
        <Container>
          <Heading2>Designed to work together.</Heading2>
          <Body style={{ marginTop: '1rem' }}>
            Each pillar is useful on its own. Together, they form a complete governance
            layer: every decision becomes an AI Receipt, Policy-as-Code constrains it, Two-Tier
            Knowledge grounds it, Time-Travel replays it and a signed audit pack turns the receipts
            into evidence. The Moderator is the panel behind each answer.
          </Body>
          <Body style={{ marginTop: '0.75rem' }}>
            Every answer is traceable. Every policy is provable. Every audit is answerable.
          </Body>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/developers">
              <Button variant="primary" size="md">Read the API docs →</Button>
            </Link>
            <Link href="/trust">
              <Button variant="secondary" size="md">View trust & compliance</Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── Developers callout ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2>Built for your stack.</Heading2>
          <Body style={{ marginTop: '1rem' }}>
            Thursdai ships with a Python SDK, TypeScript SDK, REST API and an MCP server
            for agent-to-agent orchestration. If you can make an HTTP call, you can add
            governance to your AI stack today.
          </Body>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/developers">
              <Button variant="secondary" size="md">Developer docs →</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
