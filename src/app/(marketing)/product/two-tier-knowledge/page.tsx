import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import { Split } from '@/components/layout/Split';
import { Display } from '@/components/typography/Display';
import { Heading2, Heading4 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Breadcrumb } from '@/components/nav/Breadcrumb';

export const metadata: Metadata = {
  title: 'Two-Tier Knowledge — Thursdai',
  description:
    'Standard corpus and isolated tenant knowledge — never mixed. Your proprietary knowledge never trains the base model or leaks to other tenants.',
};

function IconRegulatory() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function IconIndustry() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" stroke="var(--color-accent)" strokeWidth="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="var(--color-accent)" strokeWidth="2" />
      <line x1="12" y1="12" x2="12" y2="16" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="14" x2="14" y2="14" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconPrecedent() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export default function TwoTierKnowledgePage() {
  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <Section variant="compact">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Product', href: '/product' },
              { label: 'Two-Tier Knowledge' },
            ]}
          />
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Label>Two-Tier Knowledge</Label>
            <Display>Standard and tenant. Never mixed.</Display>
            <Body variant="large">
              Thursdai maintains a standard corpus of cross-domain knowledge and a fully isolated
              tenant layer for your proprietary content. The two are versioned, audited, and
              attributed separately in every response.
            </Body>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/developers/docs">
                <Button variant="primary">See the provenance spec</Button>
              </Link>
              <Link href="/trust/data">
                <Button variant="secondary">Read about data handling</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 2. Delta visualisation ──────────────────────────── */}
      <Section variant="default" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            Two layers. Full attribution.
          </Heading2>
          <Split
            ratio="50/50"
            gap="lg"
            alignItems="start"
            left={
              <div
                style={{
                  border: '1px solid var(--color-border-default)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  background: 'var(--color-surface-primary)',
                }}
              >
                <Badge variant="muted">Standard Corpus</Badge>
                <Heading4 style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
                  Cross-domain knowledge
                </Heading4>
                <ul
                  style={{
                    paddingLeft: '1.25rem',
                    color: 'var(--color-text-secondary)',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                  }}
                >
                  <li>Regulatory frameworks (GDPR, HIPAA, ISO 42001, EU AI Act)</li>
                  <li>Industry standards and best practices</li>
                  <li>Legal precedent summaries</li>
                  <li>Common contract structures</li>
                  <li>Technology reference documentation</li>
                </ul>
                <Body variant="small" style={{ marginTop: '1rem', color: 'var(--color-text-tertiary)' }}>
                  Maintained by Thursdai. Versioned monthly. Available to all tenants.
                </Body>
              </div>
            }
            right={
              <div
                style={{
                  border: '2px solid var(--color-accent)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  background: 'var(--color-surface-primary)',
                }}
              >
                <Badge variant="teal">Tenant Corpus</Badge>
                <Heading4 style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
                  Your proprietary knowledge
                </Heading4>
                <ul
                  style={{
                    paddingLeft: '1.25rem',
                    color: 'var(--color-text-secondary)',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                  }}
                >
                  <li>Internal policies and procedures</li>
                  <li>Contract templates and approved language</li>
                  <li>Prior decisions and precedents</li>
                  <li>Custom role definitions</li>
                  <li>Tenant-specific regulatory mappings</li>
                </ul>
                <Body variant="small" style={{ marginTop: '1rem', color: 'var(--color-text-tertiary)' }}>
                  Owned by you. Isolated to your tenant. Never shared. Never used for training.
                </Body>
              </div>
            }
          />
        </Container>
      </Section>

      {/* ── 3. Standard corpus contents ─────────────────────── */}
      <Section variant="default">
        <Container>
          <Label>Standard Corpus</Label>
          <Heading2 style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}>
            What&apos;s in the standard corpus
          </Heading2>
          <Grid cols={3} gap="lg">
            <Card
              variant="feature"
              icon={<IconRegulatory />}
              title="Regulatory frameworks"
              body="GDPR, HIPAA, ISO 27001, ISO 42001, EU AI Act Annex III, FedRAMP, SOC 2 — all major frameworks tracked and versioned monthly."
            />
            <Card
              variant="feature"
              icon={<IconIndustry />}
              title="Industry standards"
              body="Financial services, healthcare, legal, and technology domain standards. Best practices from authoritative bodies, not curated from the open web."
            />
            <Card
              variant="feature"
              icon={<IconPrecedent />}
              title="Legal precedents"
              body="Summary-level legal precedents and common contract structure references, reviewed by domain attorneys before inclusion."
            />
          </Grid>
        </Container>
      </Section>

      {/* ── 4. Tenant corpus isolation ──────────────────────── */}
      <Section variant="default" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Label>Isolation guarantees</Label>
          <Heading2 style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}>
            Your data stays yours
          </Heading2>
          <Grid cols={2} gap="lg">
            <Card
              variant="feature"
              title="Zero cross-tenant leakage"
              body="Your tenant corpus is cryptographically isolated. No query from another tenant can retrieve your documents, and no Thursdai system prompt can access your corpus without your API key."
            />
            <Card
              variant="feature"
              title="No training on customer data"
              body="Thursdai never uses tenant corpus content to improve the standard corpus, fine-tune models, or contribute to any shared system. This is not in the fine print — it is the headline commitment of this section."
            />
          </Grid>
        </Container>
      </Section>

      {/* ── 5. Delta API callout ─────────────────────────────── */}
      <Section variant="compact">
        <Container>
          <Callout variant="info" title="check_tenant_vs_standard MCP tool">
            The check_tenant_vs_standard tool returns a structured delta — which sentences in a
            response came from the standard corpus versus your tenant corpus, with confidence
            scores for each attribution. See{' '}
            <Link href="/developers/mcp" style={{ color: 'var(--color-accent)' }}>
              /developers/mcp
            </Link>{' '}
            for the full tool schema.
          </Callout>
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
            <Heading2 style={{ color: '#fff' }}>See the provenance spec</Heading2>
            <Body
              variant="large"
              style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '480px', margin: '0.75rem auto 1.5rem' }}
            >
              Full API schema for source attribution, delta reporting, and corpus versioning.
            </Body>
            <Link href="/developers/docs">
              <Button
                variant="primary"
                size="lg"
                style={{ background: '#ffffff', color: '#3e4fb8' }}
              >
                Provenance docs →
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
