import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Heading1, Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Badge } from '@/components/ui/Badge';
import { Callout } from '@/components/ui/Callout';
import { Card } from '@/components/ui/Card';
import {
  RoleBenchTable,
  RoleBenchSubmitForm,
  RoleBenchNotifyForm,
} from '@/components/content/RoleBenchTable';

export const metadata: Metadata = {
  title: 'Role Bench: Thursdai',
  description:
    'Benchmark comparing AI agent accuracy across roles and domains. Methodology, leaderboard and raw data.',
};

export default function RoleBenchPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <Label>Role Bench</Label>
            <Badge variant="amber">Results publishing Q3 2026</Badge>
          </div>
          <Heading1>Measuring governed AI accuracy across domains.</Heading1>
          <Body variant="large" style={{ marginTop: '1rem' }}>
            Role Bench evaluates how accurately AI systems answer questions in Legal, Finance,
            Engineering, HR, Compliance and three other domains, with and without role-based
            moderation, policy enforcement and tenant knowledge.
          </Body>
        </Container>
      </Section>

      {/* ── Real data callout ── */}
      <Section variant="compact">
        <Container>
          <Callout variant="warning" title="Real data only">
            Role Bench scores will be published when the evaluation suite is complete, not before.
            We&apos;re running the benchmark in Q2 2026. Estimated publication: July 2026. Subscribe
            below to be notified when results are live.
          </Callout>
        </Container>
      </Section>

      {/* ── Leaderboard shell ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Leaderboard</Heading2>
          <RoleBenchTable />
        </Container>
      </Section>

      {/* ── Methodology ── */}
      <Section>
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>How we measure</Heading2>
          <Grid cols={3} gap="md">
            <Card
              variant="feature"
              title="Cross-domain accuracy"
              body="Does the role give the right answer for its domain? Scored by domain experts against a ground-truth answer set. 100-point scale."
            />
            <Card
              variant="feature"
              title="Citation precision"
              body="Are the sources cited actually in the knowledge base, and do they support the cited claim? Scored by automated verification against indexed corpus. 100-point scale."
            />
            <Card
              variant="feature"
              title="Policy compliance"
              body="Does the answer comply with the active policy set? Tested with a suite of 50 policy rules across 6 policy types. Binary pass/fail, reported as percentage."
            />
          </Grid>
        </Container>
      </Section>

      {/* ── Download raw data (disabled) ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <p style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-text-primary)', margin: 0 }}>
              Download raw data
            </p>
            <button
              disabled
              aria-label="Raw data available Q3 2026"
              title="Available Q3 2026"
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid var(--color-border-default)',
                background: 'var(--color-surface-primary)',
                color: 'var(--color-text-tertiary)',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'not-allowed',
                opacity: 0.6,
              }}
            >
              Download CSV: Available Q3 2026
            </button>
          </div>
        </Container>
      </Section>

      {/* ── Submit a role ── */}
      <Section>
        <Container>
          <div style={{ maxWidth: '560px' }}>
            <Heading2 style={{ marginBottom: '0.5rem' }}>Submit a role for evaluation</Heading2>
            <Body style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
              Have a role configuration you&apos;d like included in the v1 benchmark? Submit it
              below and we&apos;ll be in touch if it&apos;s selected.
            </Body>
            <RoleBenchSubmitForm />
          </div>
        </Container>
      </Section>

      {/* ── Email notification signup ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)', textAlign: 'center' }}>
        <Container>
          <Heading2 style={{ marginBottom: '0.5rem' }}>Get notified when results are live</Heading2>
          <Body style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
            We&apos;ll email you once when the first Role Bench results are published. No marketing, just the one notification.
          </Body>
          <RoleBenchNotifyForm />
        </Container>
      </Section>
    </>
  );
}
