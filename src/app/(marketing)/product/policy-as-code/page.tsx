import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Split } from '@/components/layout/Split';
import { Display } from '@/components/typography/Display';
import { Heading2, Heading3 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Breadcrumb } from '@/components/nav/Breadcrumb';
import { PolicyEditor } from '@/components/demos/PolicyEditor';

export const metadata: Metadata = {
  title: 'Policy-as-Code: Thursdai',
  description:
    'Express governance constraints in YAML. The Moderator enforces them before any answer leaves the system: not as a prompt suggestion, but as a hard constraint.',
};

const DRY_RUN_SNIPPET = `thursdai policy dry-run \\
  --policy ./policies/pii-block.yaml \\
  --tenant acme-financial \\
  --queries ./test-queries.jsonl`;

const PRIMITIVES = [
  {
    primitive: 'allowed_sources',
    purpose: 'Restrict citations to approved knowledge sources',
    example: 'Only cite from approved vendor list',
  },
  {
    primitive: 'required_attribution',
    purpose: 'Mandate source citation on specified claim types',
    example: 'All regulatory claims must cite chapter/verse',
  },
  {
    primitive: 'pricing_floor',
    purpose: 'Prevent quoting below contract minimums',
    example: 'No discount below the agreed price floor',
  },
  {
    primitive: 'pii_block',
    purpose: 'Redact PII patterns before output',
    example: 'Redact email, phone, national ID',
  },
  {
    primitive: 'legal_review_gate',
    purpose: 'Block outputs above a value threshold',
    example: 'Require Legal sign-off on contracts > $500K',
  },
  {
    primitive: 'role_scope',
    purpose: 'Restrict role answers to defined corpus sections',
    example: 'Legal role cannot cite Engineering runbooks',
  },
];

export default function PolicyAsCodePage() {
  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <Section variant="compact">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Product', href: '/product' },
              { label: 'Policy-as-Code' },
            ]}
          />
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Label>Policy-as-Code</Label>
            <Display>Governance rules the model cannot break.</Display>
            <Body variant="large">
              Your legal and compliance team expresses policies in plain YAML. Thursdai enforces
              them at the Moderator layer, before any answer reaches a user. Not a system prompt.
              A hard constraint.
            </Body>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/#policy-demo">
                <Button variant="primary">See the demo</Button>
              </Link>
              <Link href="/developers/docs">
                <Button variant="secondary">Read the spec</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 2. PolicyEditor ─────────────────────────────────── */}
      <Section variant="default" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <PolicyEditor />
        </Container>
      </Section>

      {/* ── 3. Policy primitives reference table ────────────── */}
      <Section variant="default">
        <Container>
          <Label>Reference</Label>
          <Heading2 style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}>
            Policy primitives
          </Heading2>
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px',
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: '2px solid var(--color-border-default)',
                  }}
                >
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '0.75rem 1rem',
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                    }}
                  >
                    Primitive
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '0.75rem 1rem',
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Purpose
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '0.75rem 1rem',
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Example
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRIMITIVES.map((row, i) => (
                  <tr
                    key={row.primitive}
                    style={{
                      borderBottom: '1px solid var(--color-border-default)',
                      background:
                        i % 2 === 0 ? 'transparent' : 'var(--color-surface-secondary)',
                    }}
                  >
                    <td
                      style={{
                        padding: '0.875rem 1rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        color: 'var(--color-accent)',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.primitive}
                    </td>
                    <td
                      style={{
                        padding: '0.875rem 1rem',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {row.purpose}
                    </td>
                    <td
                      style={{
                        padding: '0.875rem 1rem',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {row.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ── 4. Dry-run section ──────────────────────────────── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Split
            ratio="50/50"
            gap="lg"
            alignItems="start"
            left={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <Label>Dry-run mode</Label>
                <Heading3>Test policies before deploying them</Heading3>
                <Body>
                  Every policy can be run in dry-run mode: the Moderator evaluates the policy
                  against real queries and returns what would have been blocked, transformed, or
                  flagged. No production traffic affected.
                </Body>
                <CodeBlock language="bash" code={DRY_RUN_SNIPPET} />
              </div>
            }
            right={
              <Callout variant="info" title="dry_run_policy MCP tool">
                The dry_run_policy tool in the Thursdai MCP server runs any policy against a batch
                of queries and returns a structured report: violations found, sentences affected,
                and recommended policy adjustments. See{' '}
                <Link href="/developers/mcp" style={{ color: 'var(--color-accent)' }}>
                  /developers/mcp
                </Link>{' '}
                for the full tool schema.
              </Callout>
            }
          />
        </Container>
      </Section>

      {/* ── 5. CTA ──────────────────────────────────────────── */}
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
            <Heading2 style={{ color: '#fff' }}>Read the policy language spec</Heading2>
            <Body
              variant="large"
              style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '480px', margin: '0.75rem auto 1.5rem' }}
            >
              Full reference for every primitive, operator and dry-run flag.
            </Body>
            <Link href="/developers/docs">
              <Button
                variant="primary"
                size="lg"
                style={{ background: '#ffffff', color: '#3e4fb8' }}
              >
                Policy language docs →
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
