import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import { Split } from '@/components/layout/Split';
import { Display } from '@/components/typography/Display';
import { Heading2, Heading3 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Breadcrumb } from '@/components/nav/Breadcrumb';
import { ModeratorPanel } from '@/components/demos/ModeratorPanel';

export const metadata: Metadata = {
  title: 'Moderator: Thursdai',
  description:
    'Role-based answer panels that reconcile across Legal, Finance and Engineering. Every AI question answered by every relevant role. Simultaneously.',
};

function IconRoute() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="5" cy="12" r="2" stroke="var(--color-accent)" strokeWidth="2" />
      <circle cx="19" cy="6" r="2" stroke="var(--color-accent)" strokeWidth="2" />
      <circle cx="19" cy="18" r="2" stroke="var(--color-accent)" strokeWidth="2" />
      <path d="M7 12h4m4-4 4-2M11 12l8 6" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconRespond() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function IconReconcile() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="var(--color-accent)" strokeWidth="2" />
      <polyline points="9 12 11 14 15 10" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ModeratorPage() {
  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <Section variant="compact">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Product', href: '/product' },
              { label: 'Moderator' },
            ]}
          />
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Label>Moderator</Label>
            <Display>Three roles. One reconciled answer.</Display>
            <Body variant="large">
              Ask once. Legal, Finance and Engineering respond simultaneously. The Moderator
              reconciles, flags disagreements and applies your policies before any answer reaches
              your team.
            </Body>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/#moderator-demo">
                <Button variant="primary">See the demo</Button>
              </Link>
              <Link href="/developers/mcp">
                <Button variant="secondary">View API docs</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 2. ModeratorPanel ───────────────────────────────── */}
      <section style={{ background: '#0b0f19', padding: '5rem 0' }}>
        <Container>
          <ModeratorPanel />
        </Container>
      </section>

      {/* ── 3. How it works ─────────────────────────────────── */}
      <Section variant="default">
        <Container>
          <Label>How it works</Label>
          <Heading2 style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}>
            Three steps. One governed answer.
          </Heading2>
          <Grid cols={3} gap="lg">
            <Card
              variant="feature"
              icon={<IconRoute />}
              title="1. Route"
              body="Every question is routed to all configured roles simultaneously. No sequential processing: Legal, Finance and Engineering all see the same question at the same time."
            />
            <Card
              variant="feature"
              icon={<IconRespond />}
              title="2. Respond"
              body="Each role answers from its own knowledge layer and policy set. Role definitions control which corpus sections each role can cite and what constraints apply."
            />
            <Card
              variant="feature"
              icon={<IconReconcile />}
              title="3. Reconcile"
              body="The Moderator synthesises all role answers, flags disagreements for human review, applies cross-role policies and produces a single attributed response."
            />
          </Grid>
        </Container>
      </Section>

      {/* ── 4. Provenance at sentence level ─────────────────── */}
      <Section variant="default" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Split
            ratio="50/50"
            alignItems="center"
            gap="xl"
            left={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <Label>Provenance</Label>
                <Heading2>Every sentence. Every source.</Heading2>
                <Body>
                  The Moderator tracks which sentence came from which source in which role&apos;s
                  knowledge base. Hover any sentence in the answer to see its citation: document
                  name, section, date indexed and confidence score.
                </Body>
                <Body>
                  Audit logs record the full provenance chain for every decision. Available via
                  API, exportable to your SIEM.
                </Body>
              </div>
            }
            right={
              <Callout variant="info" title="Provenance in the API">
                Every invoke_role() response includes a provenance array: one entry per sentence,
                with source_id, section, confidence, and role_attribution fields. See{' '}
                <Link href="/developers/api" style={{ color: 'var(--color-accent)' }}>
                  /developers/api
                </Link>{' '}
                for the full schema.
              </Callout>
            }
          />
        </Container>
      </Section>

      {/* ── 5. Role Bench callout ────────────────────────────── */}
      <Section variant="compact">
        <Container>
          <div
            style={{
              border: '1px solid var(--color-border-default)',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            <Badge variant="amber">Coming Q3 2026</Badge>
            <Heading3 style={{ marginTop: '1rem' }}>
              Role Bench: see how Thursdai&apos;s roles compare
            </Heading3>
            <Body style={{ marginTop: '0.75rem', maxWidth: '520px', margin: '0.75rem auto 0' }}>
              We&apos;re benchmarking Thursdai&apos;s role-based answers against single-model responses
              across 8 domains. Results publishing July 2026.
            </Body>
            <div style={{ marginTop: '1.25rem' }}>
              <Link href="/resources/role-bench" style={{ color: 'var(--color-accent)', fontSize: '15px', fontWeight: 600 }}>
                Join the waitlist →
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 6. CTA ──────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1e2a5a 0%, #5b3a7a 55%, #e8a34a 100%)',
          padding: '4rem 0',
          textAlign: 'center',
        }}
      >
        <Container>
          <div style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '20px',
            padding: '3rem',
            maxWidth: '640px',
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <Heading2 style={{ color: '#fff' }}>See the full role library</Heading2>
            <Body style={{ color: 'rgba(255,255,255,0.85)', marginTop: '0.75rem' }}>
              Configure roles for Legal, Finance, Engineering, HR and more, or define custom roles
              for your domain.
            </Body>
            <div style={{ marginTop: '1.5rem' }}>
              <Link href="/developers/docs">
                <Button
                  variant="secondary"
                  style={{ borderColor: '#fff', color: '#fff' }}
                >
                  Read the role configuration docs
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
