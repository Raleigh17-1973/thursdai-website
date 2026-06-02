import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Display } from '@/components/typography/Display';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Card } from '@/components/ui/Card';
import { Callout } from '@/components/ui/Callout';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Developers: Thursdai',
  description:
    'Thursdai is infrastructure other agents call. REST API, MCP server, TypeScript and Python SDKs and full documentation.',
};

// ── Code snippets ──────────────────────────────────────────────

const PYTHON_SNIPPET = `from thursdai import ThursdaiClient

client = ThursdaiClient(api_key="thy_live_...")

result = client.invoke_role(
    question="Should we deploy GPT-4o to tier-1 clients?",
    roles=["legal", "finance", "engineering"],
    tenant_id="acme-financial",
    policy_set="production-v2",
)

for role in result.panel:
    print(f"{role.name}: {role.answer[:100]}...")

print(f"\\nModerator: {result.moderator.answer}")
print(f"Consensus: {result.moderator.consensus}")`;

const TS_SNIPPET = `import { ThursdaiClient } from '@thursdai/sdk';

const client = new ThursdaiClient({ apiKey: 'thy_live_...' });

const result = await client.invokeRole({
  question: 'Should we deploy GPT-4o to tier-1 clients?',
  roles: ['legal', 'finance', 'engineering'],
  tenantId: 'acme-financial',
  policySet: 'production-v2',
});

result.panel.forEach(role => {
  console.log(\`\${role.name}: \${role.answer.slice(0, 100)}...\`);
});

console.log('Moderator:', result.moderator.answer);`;

const CURL_SNIPPET = `curl -X POST https://api.thursdai.com/v1/invoke-role \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "question": "Should we deploy GPT-4o to tier-1 clients?",
    "roles": ["legal", "finance", "engineering"],
    "tenant_id": "acme-financial",
    "policy_set": "production-v2"
  }'`;

// ── Icons ──────────────────────────────────────────────────────

function IconMCP() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="9" height="9" rx="2" stroke="var(--color-accent)" strokeWidth="2" />
      <rect x="13" y="2" width="9" height="9" rx="2" stroke="var(--color-accent)" strokeWidth="2" />
      <rect x="2" y="13" width="9" height="9" rx="2" stroke="var(--color-accent)" strokeWidth="2" />
      <path d="M17.5 13v9M13 17.5h9" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconAPI() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 10h16M4 14h10M4 18h7" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconSDK() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="8 6 2 12 8 18" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconDocs() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
      <polyline points="14 2 14 8 20 8" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 13h6M9 17h4" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconChangelog() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="var(--color-accent)" strokeWidth="2" />
      <polyline points="12 7 12 12 15 15" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconBench() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 20h18M3 20V8l6-5 6 5v12" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
      <rect x="9" y="12" width="6" height="8" stroke="var(--color-accent)" strokeWidth="2" />
    </svg>
  );
}

// ── Page ───────────────────────────────────────────────────────

export default function DevelopersPage() {
  return (
    <>
      {/* Hero */}
      <Section variant="default" style={{ background: '#0b0f19' }}>
        <Container>
          <Label style={{ color: '#8b9ef0' }}>Developers</Label>
          <Display style={{ color: '#e4e4e7', marginTop: '1rem', marginBottom: '1.5rem' }}>
            Thursdai is infrastructure other agents call.
          </Display>
          <Body variant="large" style={{ color: '#a1a1aa', marginBottom: '2rem' }}>
            invoke_role(), replay_case(), dry_run_policy(): seven MCP tools and a full REST API
            built for the agent-to-agent layer. Works with Claude Desktop, Cursor and any
            MCP-compatible client.
          </Body>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/developers/mcp"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 20px',
                background: '#3e4fb8',
                color: '#ffffff',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              View MCP docs →
            </Link>
            <Link
              href="/developers/api"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 20px',
                border: '1px solid #8b9ef0',
                color: '#8b9ef0',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              API reference →
            </Link>
          </div>
        </Container>
      </Section>

      {/* Code snippets */}
      {/*
        TODO Week 6: Replace CodeBlock with SyntaxHighlighter (async server component) +
        a client-side tab switcher. Currently using CodeBlock with plain rendering because
        SyntaxHighlighter output can't be passed as children to the client-side Tabs component
        without serialization. Options:
        (a) Build a DeveloperCodeTabs client component that accepts pre-highlighted HTML strings
            as props from the server and renders them with dangerouslySetInnerHTML.
        (b) Use a URL-param approach for active tab (searchParams).
      */}
      <section style={{ background: '#0b0f19', paddingBottom: '4rem' }}>
        <Container>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0' }}>
            {(['Python', 'TypeScript', 'cURL'] as const).map((lang, i) => (
              <span
                key={lang}
                style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: i === 0 ? '#8b9ef0' : 'rgba(255,255,255,0.4)',
                  borderBottom: i === 0 ? '2px solid #8b9ef0' : '2px solid transparent',
                  marginBottom: '-1px',
                }}
              >
                {lang}
              </span>
            ))}
          </div>
          {/* Python shown by default — static rendering, no client JS needed */}
          <CodeBlock code={PYTHON_SNIPPET} language="python" filename="invoke_role.py" />
          <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
            <details style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
              <summary style={{ cursor: 'pointer' }}>TypeScript</summary>
              <div style={{ marginTop: '0.75rem' }}>
                <CodeBlock code={TS_SNIPPET} language="typescript" filename="invoke_role.ts" />
              </div>
            </details>
            <details style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
              <summary style={{ cursor: 'pointer' }}>cURL</summary>
              <div style={{ marginTop: '0.75rem' }}>
                <CodeBlock code={CURL_SNIPPET} language="bash" filename="invoke_role.sh" />
              </div>
            </details>
          </div>
        </Container>
      </section>

      {/* Nav cards */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Developer resources</Heading2>
          <Grid cols={3} gap="md">
            <Card variant="feature" icon={<IconMCP />} title="MCP Server" body="Seven MCP tools for governed agent orchestration. Works with Claude Desktop, Cursor and any MCP-compatible client." href="/developers/mcp" />
            <Card variant="feature" icon={<IconAPI />} title="API Reference" body="Full REST API reference. Authenticate with a bearer token and start routing questions in minutes." href="/developers/api" />
            <Card variant="feature" icon={<IconSDK />} title="SDK" body="TypeScript and Python SDKs with full type coverage and async-first design." href="/developers/sdk" />
            <Card variant="feature" icon={<IconDocs />} title="Documentation" body="Architecture overview, deployment guides and integration tutorials." href="/developers/docs" />
            <Card variant="feature" icon={<IconChangelog />} title="Changelog" body="API versioning policy, breaking change notices and release notes." href="/developers/changelog" />
            <Card variant="feature" icon={<IconBench />} title="Role Bench" body="Open benchmark measuring answer quality across roles, domains and policy configurations." href="/resources/role-bench" />
          </Grid>
        </Container>
      </Section>

      {/* Auth overview */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2 style={{ marginBottom: '1rem' }}>Authentication</Heading2>
          <Callout variant="info" style={{ marginBottom: '1.5rem' }}>
            All API endpoints require a bearer token in the{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>Authorization</code>{' '}
            header. Tenant scoping is applied via{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>X-Tenant-ID</code>{' '}
            header or the <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>tenantId</code>{' '}
            body parameter.
          </Callout>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--color-surface-primary)' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border-default)' }}>Scope</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border-default)' }}>Permits</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { scope: 'invoke:read', permits: 'Read existing invocations and panel results' },
                  { scope: 'invoke:write', permits: 'Create new role invocations' },
                  { scope: 'replay:read', permits: 'Replay past decisions and time-travel queries' },
                  { scope: 'policy:read', permits: 'Read policy sets and dry-run results' },
                  { scope: 'policy:write', permits: 'Create, update and publish policy sets' },
                  { scope: 'admin', permits: 'Tenant management, user provisioning and audit log export' },
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'var(--color-surface-primary)' : undefined }}>
                    <td style={{ padding: '10px 14px', fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--color-accent)', borderBottom: '1px solid var(--color-border-default)' }}>{row.scope}</td>
                    <td style={{ padding: '10px 14px', fontSize: '14px', color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-border-default)' }}>{row.permits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Rate limits */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Rate limits</Heading2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--color-surface-secondary)' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border-default)' }}>Tier</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border-default)' }}>Requests/min</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border-default)' }}>Tokens/min</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border-default)' }}>Burst</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: 'SMB', rpm: '60', tpm: '1M', burst: '120' },
                  { tier: 'Mid-market', rpm: '300', tpm: '5M', burst: '600' },
                  { tier: 'Enterprise', rpm: '1,000', tpm: '20M', burst: '2,000' },
                  { tier: 'Fortune 100', rpm: 'Custom', tpm: 'Custom', burst: 'Custom' },
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 1 ? 'var(--color-surface-secondary)' : undefined }}>
                    <td style={{ padding: '10px 14px', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border-default)' }}>{row.tier}</td>
                    <td style={{ padding: '10px 14px', fontSize: '14px', color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-border-default)' }}>{row.rpm}</td>
                    <td style={{ padding: '10px 14px', fontSize: '14px', color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-border-default)' }}>{row.tpm}</td>
                    <td style={{ padding: '10px 14px', fontSize: '14px', color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-border-default)' }}>{row.burst}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>
    </>
  );
}
