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
    'Five capabilities that let regulated enterprises actually deploy AI: role-based moderation, decision replay, policy enforcement, ambient case assembly and isolated knowledge.',
};

const PILLARS = [
  {
    label: 'Pillar 1',
    title: 'Moderator',
    href: '/product/moderator',
    description:
      'Legal, Finance and Engineering respond simultaneously. The Moderator reconciles their answers, flags disagreements and applies your policies before anything reaches a user.',
    callout: 'Role-based answer panels',
  },
  {
    label: 'Pillar 2',
    title: 'Time-Travel',
    href: '/product/time-travel',
    description:
      'Every decision is recorded with a snapshot of the active knowledge base, role definitions and policy set at that exact moment. Replay any answer, exactly as it happened.',
    callout: 'Decision replay',
  },
  {
    label: 'Pillar 3',
    title: 'Policy-as-Code',
    href: '/product/policy-as-code',
    description:
      'Express governance rules in plain YAML. Thursdai enforces them at the inference layer, before any answer reaches a user. The model cannot override them.',
    callout: 'Hard constraint enforcement',
  },
  {
    label: 'Pillar 4',
    title: 'Ambient Cases',
    href: '/product/ambient-cases',
    description:
      'Thursdai monitors your event streams and assembles structured case files in the background. By the time an investigator opens a case, the evidence is already there.',
    callout: 'Background case assembly',
  },
  {
    label: 'Pillar 5',
    title: 'Two-Tier Knowledge',
    href: '/product/two-tier-knowledge',
    description:
      'A shared standard corpus of regulatory frameworks and best practices, plus a cryptographically isolated tenant layer for your proprietary policies and precedents. Never mixed.',
    callout: 'Knowledge isolation',
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
            Five capabilities designed together so regulated enterprises can deploy AI that
            explains every decision, enforces policy automatically and passes any audit.
          </Body>
        </Container>
      </Section>

      {/* ── Five pillars ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Grid cols={2} gap="lg">
            {PILLARS.slice(0, 4).map((pillar) => (
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
          {/* Fifth pillar centered */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <div style={{ maxWidth: '480px', width: '100%' }}>
              <Card
                variant="feature"
                title={PILLARS[4].title}
                body={PILLARS[4].description}
                href={PILLARS[4].href}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ── How they fit together ── */}
      <Section variant="compact">
        <Container>
          <Heading2>Designed to work together.</Heading2>
          <Body style={{ marginTop: '1rem' }}>
            Each pillar is useful on its own. Together, they form a complete governance
            layer: the Moderator deliberates, Policy-as-Code constrains, Two-Tier Knowledge
            grounds every response, Time-Travel records the outcome and Ambient Cases
            ensures nothing falls through.
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
