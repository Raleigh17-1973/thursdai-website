import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Split } from '@/components/layout/Split';
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
    'Submit AI Receipts from any system, query your decision record and use the Thursdai agent — REST API, MCP server, TypeScript and Python SDKs.',
};

// ── Receipt API snippets ────────────────────────────────────────

const PYTHON_RECEIPT = `from thursdai import ThursdaiClient

client = ThursdaiClient(api_key="thy_live_...")

# Record a decision made by any AI system
receipt = client.receipts.record(
    source="greenhouse-screening-agent",
    model="gpt-4o",
    decision="Advanced applicant 4821 to interview stage",
    context={
        "job_req": "JR-204",
        "rubric_version": "v3",
        "tenant_id": "acme-financial",
    },
)

print(f"Receipt ID: {receipt.id}")
print(f"Signed at:  {receipt.signed_at}")
print(f"Checks:     {receipt.compliance_results}")`;

const TS_RECEIPT = `import { ThursdaiClient } from '@thursdai/sdk';

const client = new ThursdaiClient({ apiKey: 'thy_live_...' });

// Record a decision made by any AI system
const receipt = await client.receipts.record({
  source: 'greenhouse-screening-agent',
  model: 'gpt-4o',
  decision: 'Advanced applicant 4821 to interview stage',
  context: {
    jobReq: 'JR-204',
    rubricVersion: 'v3',
    tenantId: 'acme-financial',
  },
});

console.log('Receipt:', receipt.id);
console.log('Signed:', receipt.signedAt);
console.log('Checks:', receipt.complianceResults);`;

const CURL_RECEIPT = `curl -X POST https://api.thursdai.com/v1/receipts \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "source": "greenhouse-screening-agent",
    "model": "gpt-4o",
    "decision": "Advanced applicant 4821 to interview stage",
    "context": {
      "job_req": "JR-204",
      "rubric_version": "v3"
    },
    "tenant_id": "acme-financial"
  }'`;

// ── Agent API snippets ──────────────────────────────────────────

const PYTHON_AGENT = `from thursdai import ThursdaiClient

client = ThursdaiClient(api_key="thy_live_...")

# Ask a question grounded in your knowledge base and policies
result = client.agent.ask(
    question="Can we reject a candidate based on a 3-year employment gap?",
    tenant_id="acme-financial",
    knowledge_set="hr-policies-v3",
    policy_set="fair-hiring-v2",
)

print(result.answer)
print(f"Knowledge used: {[k.title for k in result.knowledge_consulted]}")
print(f"Receipt ID:     {result.receipt.id}")`;

// ── Query snippet ───────────────────────────────────────────────

const PYTHON_QUERY = `from thursdai import ThursdaiClient

client = ThursdaiClient(api_key="thy_live_...")

# Query your receipt history in plain language
results = client.receipts.query(
    question="Which AI systems had the most compliance flags last quarter?",
    tenant_id="acme-financial",
    date_range={"start": "2025-01-01", "end": "2025-03-31"},
)

for item in results.receipts:
    print(f"{item.source}: {item.compliance_summary}")
    print(f"  Receipt: {item.id}")`;

// ── Icons ──────────────────────────────────────────────────────

function IconReceipt() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 2v20l3-2 2 2 3-2 3 2 2-2 3 2V2z" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 8h6M9 12h6M9 16h3" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconAgent() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="var(--color-accent)" strokeWidth="2" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 3l2 2-2 2" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconQuery() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="var(--color-accent)" strokeWidth="2" />
      <path d="M16.5 16.5L21 21" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 11h6M11 8v6" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

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

// ── Page ───────────────────────────────────────────────────────

export default function DevelopersPage() {
  return (
    <>
      {/* Hero */}
      <Section variant="default" style={{ background: '#0b0f19' }}>
        <Container>
          <Label style={{ color: '#8b9ef0' }}>Developers</Label>
          <Display style={{ color: '#e4e4e7', marginTop: '1rem', marginBottom: '1.5rem' }}>
            One API. Every AI decision on the record.
          </Display>
          <Body variant="large" style={{ color: '#a1a1aa', marginBottom: '2rem', maxWidth: '680px' }}>
            Submit AI Receipts from any system in a single call. Query your decision history in plain
            language. Use the Thursdai Agent for governed, knowledge-grounded answers. REST API,
            MCP server and TypeScript and Python SDKs.
          </Body>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/developers/api"
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
              API reference →
            </Link>
            <Link
              href="/developers/mcp"
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
              View MCP docs →
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── Three API surfaces ─────────────────────────────────── */}
      <section style={{ background: '#0b0f19', paddingBottom: '2rem' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {[
              {
                icon: <IconReceipt />,
                label: 'POST /v1/receipts',
                title: 'Receipt API',
                body: 'Submit a signed AI Receipt from any system — your own model, a vendor\'s agent or a third-party tool. Returns a receipt ID, compliance results and tamper-evident signature.',
              },
              {
                icon: <IconQuery />,
                label: 'POST /v1/receipts/query',
                title: 'Query API',
                body: 'Ask questions of your full receipt history in plain language. Get back matching receipts, aggregate statistics and trend data for compliance reporting.',
              },
              {
                icon: <IconAgent />,
                label: 'POST /v1/agent/ask',
                title: 'Agent API',
                body: 'Use the Thursdai Agent grounded in your knowledge base and policies. Every answer is a signed AI Receipt — knowledge consulted, policies applied, confidence score.',
              },
            ].map(({ icon, label, title, body }) => (
              <div key={title} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.625rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {icon}
                  <code style={{ fontSize: '11px', color: '#8b9ef0', fontFamily: 'var(--font-mono,monospace)' }}>{label}</code>
                </div>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#e4e4e7', margin: 0 }}>{title}</p>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#a1a1aa', margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Code snippets ──────────────────────────────────────── */}
      <section style={{ background: '#0b0f19', paddingBottom: '4rem' }}>
        <Container>

          {/* Receipt — primary */}
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8b9ef0', margin: '0 0 0.75rem' }}>
            Submit a receipt
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {(['Python', 'TypeScript', 'cURL'] as const).map((lang, i) => (
              <span key={lang} style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 600,
                color: i === 0 ? '#8b9ef0' : 'rgba(255,255,255,0.4)',
                borderBottom: i === 0 ? '2px solid #8b9ef0' : '2px solid transparent',
                marginBottom: '-1px',
              }}>
                {lang}
              </span>
            ))}
          </div>
          <CodeBlock code={PYTHON_RECEIPT} language="python" filename="record_receipt.py" />
          <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
            <details style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
              <summary style={{ cursor: 'pointer' }}>TypeScript</summary>
              <div style={{ marginTop: '0.75rem' }}>
                <CodeBlock code={TS_RECEIPT} language="typescript" filename="record_receipt.ts" />
              </div>
            </details>
            <details style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
              <summary style={{ cursor: 'pointer' }}>cURL</summary>
              <div style={{ marginTop: '0.75rem' }}>
                <CodeBlock code={CURL_RECEIPT} language="bash" filename="record_receipt.sh" />
              </div>
            </details>
          </div>

          {/* Query + Agent — secondary */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2.5rem' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8b9ef0', margin: '0 0 0.75rem' }}>
                Query the receipt record
              </p>
              <CodeBlock code={PYTHON_QUERY} language="python" filename="query_receipts.py" />
            </div>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8b9ef0', margin: '0 0 0.75rem' }}>
                Use the agent
              </p>
              <CodeBlock code={PYTHON_AGENT} language="python" filename="agent_ask.py" />
            </div>
          </div>
        </Container>
      </section>

      {/* Nav cards */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Developer resources</Heading2>
          <Grid cols={3} gap="md">
            <Card variant="feature" icon={<IconAPI />} title="API Reference" body="Full REST API reference for the Receipt, Query and Agent APIs. Authenticate with a bearer token and start submitting receipts in minutes." href="/developers/api" />
            <Card variant="feature" icon={<IconMCP />} title="MCP Server" body="MCP tools for governed agent orchestration including receipt submission, decision replay and policy dry-runs. Works with Claude Desktop, Cursor and any MCP-compatible client." href="/developers/mcp" />
            <Card variant="feature" icon={<IconSDK />} title="SDK" body="TypeScript and Python SDKs with full type coverage and async-first design for receipts, queries and agent calls." href="/developers/sdk" />
            <Card variant="feature" icon={<IconDocs />} title="Documentation" body="Architecture overview, receipt schema reference, deployment guides and integration tutorials." href="/developers/docs" />
            <Card variant="feature" icon={<IconChangelog />} title="Changelog" body="API versioning policy, breaking change notices and release notes for the receipt schema and endpoints." href="/developers/changelog" />
            <Card variant="feature" icon={<IconReceipt />} title="Receipt Schema" body="Full AIDR 1.1.0 schema reference — all fields, agent types, evidence formats, compliance classifications and extension points." href="/developers/docs" />
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
            header. Tenant scoping is applied via the{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>X-Tenant-ID</code>{' '}
            header or the <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>tenant_id</code>{' '}
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
                  { scope: 'receipts:write', permits: 'Submit AI Receipts from external systems and internal agents' },
                  { scope: 'receipts:read', permits: 'Read receipts, retrieve by ID and run plain-language queries against receipt history' },
                  { scope: 'agent:invoke', permits: 'Use the Thursdai Agent for knowledge-grounded, policy-checked answers' },
                  { scope: 'replay:read', permits: 'Replay past decisions and run time-travel queries' },
                  { scope: 'policy:read', permits: 'Read policy sets and dry-run results against submitted decisions' },
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
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border-default)' }}>Receipts/min</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border-default)' }}>Agent calls/min</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border-default)' }}>Burst</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: 'SMB', rpm: '120', apm: '60', burst: '240' },
                  { tier: 'Mid-market', rpm: '600', apm: '300', burst: '1,200' },
                  { tier: 'Enterprise', rpm: '2,000', apm: '1,000', burst: '4,000' },
                  { tier: 'Fortune 100', rpm: 'Custom', apm: 'Custom', burst: 'Custom' },
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 1 ? 'var(--color-surface-secondary)' : undefined }}>
                    <td style={{ padding: '10px 14px', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border-default)' }}>{row.tier}</td>
                    <td style={{ padding: '10px 14px', fontSize: '14px', color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-border-default)' }}>{row.rpm}</td>
                    <td style={{ padding: '10px 14px', fontSize: '14px', color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-border-default)' }}>{row.apm}</td>
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
