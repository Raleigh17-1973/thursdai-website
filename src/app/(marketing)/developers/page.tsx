import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Display } from '@/components/typography/Display';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { H3_STYLE, LABEL_STYLE } from '@/components/typography/scale';
import { Card } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Developers: Thursdai',
  description:
    'Submit AI Receipts from any system, query your decision record and use the Thursdai agent: REST API, MCP server, TypeScript and Python SDKs.',
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

const CURL_RECEIPT = `curl -X POST https://api.getthursdai.com/v1/receipts \\
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
      <path d="M4 2v20l3-2 2 2 3-2 3 2 2-2 3 2V2z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M9 8h6M9 12h6M9 16h3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function IconAgent() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.25" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M16 3l2 2-2 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconQuery() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.25" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function IconMCP() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <rect x="13" y="2" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <rect x="2" y="13" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <path d="M17.5 13v9M13 17.5h9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function IconAPI() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 10h16M4 14h10M4 18h7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function IconSDK() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const detailsStyle: React.CSSProperties = {
  border: '1px solid var(--color-border-default)',
  borderRadius: '2px',
  overflow: 'hidden',
};

const summaryStyle: React.CSSProperties = {
  cursor: 'pointer',
  padding: '0.6rem 1rem',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--color-text-primary)',
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  background: 'var(--color-surface-primary)',
};

// ── Page ───────────────────────────────────────────────────────

export default function DevelopersPage() {
  return (
    <>
      {/* Hero */}
      <Section variant="default">
        <Container>
          <Label>Developers</Label>
          <Display style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            One API. Every AI decision on the record.
          </Display>
          <Body variant="large" style={{ marginBottom: '2rem' }}>
            Submit AI Receipts from any system in a single call. Query your decision history in plain
            language. Use the Thursdai Agent for governed, knowledge-grounded answers. REST API,
            MCP server and TypeScript and Python SDKs.
          </Body>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <ButtonLink href="#reference" variant="primary" size="md">
              API reference →
            </ButtonLink>
            <ButtonLink href="/developers/mcp" variant="secondary" size="md">
              View MCP docs →
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* ── Three API surfaces ─────────────────────────────────── */}
      <Section id="reference" variant="compact" style={{ scrollMarginTop: '80px' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {[
              {
                icon: <IconReceipt />,
                label: 'POST /v1/receipts',
                title: 'Receipt API',
                body: 'Submit a signed AI Receipt from any system, whether your own model, a vendor\'s agent or a third-party tool. Returns a receipt ID, compliance results and tamper-evident signature.',
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
                body: 'Use the Thursdai Agent grounded in your knowledge base and policies. Every answer is a signed AI Receipt: knowledge consulted, policies applied, confidence score.',
              },
            ].map(({ icon, label, title, body }) => (
              <div key={title} style={{
                background: 'var(--color-surface-primary)',
                border: '1px solid var(--color-border-default)',
                borderRadius: '2px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-primary)' }}>
                  {icon}
                  <code
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-text-primary)',
                      fontFamily: 'var(--font-mono, monospace)',
                      border: '1px solid var(--color-border-strong)',
                      borderRadius: '2px',
                      padding: '2px 8px',
                    }}
                  >
                    {label}
                  </code>
                </div>
                <h2 style={{ ...H3_STYLE, margin: 0 }}>{title}</h2>
                <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--color-text-secondary)', margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Code snippets ──────────────────────────────────────── */}
      <Section variant="compact">
        <Container>

          {/* Receipt — primary */}
          <p style={{ ...LABEL_STYLE, margin: '0 0 0.75rem' }}>
            Submit a receipt
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <details open style={detailsStyle}>
              <summary style={summaryStyle}>
                <span>▶</span> Python
              </summary>
              <div style={{ padding: '0.75rem' }}>
                <CodeBlock code={PYTHON_RECEIPT} language="python" filename="record_receipt.py" />
              </div>
            </details>
            <details style={detailsStyle}>
              <summary style={summaryStyle}>
                <span>▶</span> TypeScript
              </summary>
              <div style={{ padding: '0.75rem' }}>
                <CodeBlock code={TS_RECEIPT} language="typescript" filename="record_receipt.ts" />
              </div>
            </details>
            <details style={detailsStyle}>
              <summary style={summaryStyle}>
                <span>▶</span> cURL
              </summary>
              <div style={{ padding: '0.75rem' }}>
                <CodeBlock code={CURL_RECEIPT} language="bash" filename="record_receipt.sh" />
              </div>
            </details>
          </div>

          {/* Query + Agent — secondary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
            <div>
              <p style={{ ...LABEL_STYLE, margin: '0 0 0.75rem' }}>
                Query the receipt record
              </p>
              <CodeBlock code={PYTHON_QUERY} language="python" filename="query_receipts.py" />
            </div>
            <div>
              <p style={{ ...LABEL_STYLE, margin: '0 0 0.75rem' }}>
                Use the agent
              </p>
              <CodeBlock code={PYTHON_AGENT} language="python" filename="agent_ask.py" />
            </div>
          </div>
        </Container>
      </Section>
      {/* Nav cards */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Developer resources</Heading2>
          <Grid cols={4} gap="md">
            <Card variant="feature" icon={<IconAPI />} title="Reference (on this page)" body="Full REST API reference for the Receipt, Query and Agent APIs. Authenticate with a bearer token and start submitting receipts in minutes." href="#reference" />
            <Card variant="feature" icon={<IconMCP />} title="MCP Server" body="MCP tools for governed agent orchestration including receipt submission, decision replay and policy dry-runs. Works with Claude Desktop, Cursor and any MCP-compatible client." href="/developers/mcp" />
            <Card variant="feature" icon={<IconSDK />} title="SDK" body="TypeScript and Python SDKs with full type coverage and async-first design for receipts, queries and agent calls." href="/developers/sdk" />
            <Card variant="feature" icon={<IconReceipt />} title="Receipt Schema" body="Full AIDR 1.1.0 schema reference: all fields, agent types, evidence formats, compliance classifications and extension points." href="#reference" />
          </Grid>
        </Container>
      </Section>

      {/* Auth overview */}
      <Section variant="compact">
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
            <table className="rec-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Scope</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Permits</th>
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
                  <tr key={i}>
                    <td style={{ padding: '10px 14px', fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border-default)' }}>{row.scope}</td>
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
            <table className="rec-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Tier</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Receipts/min</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Agent calls/min</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Burst</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: 'SMB', rpm: 'See dashboard', apm: 'See dashboard', burst: 'See dashboard' },
                  { tier: 'Mid-market', rpm: 'See dashboard', apm: 'See dashboard', burst: 'See dashboard' },
                  { tier: 'Enterprise', rpm: 'Custom', apm: 'Custom', burst: 'Custom' },
                  { tier: 'Fortune 100', rpm: 'Custom', apm: 'Custom', burst: 'Custom' },
                ].map((row, i) => (
                  <tr key={i}>
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
