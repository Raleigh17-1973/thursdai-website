import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Body } from '@/components/typography/Body';
import { LABEL_STYLE } from '@/components/typography/scale';
import { ButtonLink } from '@/components/ui/Button';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { VerifyReceiptButton } from '@/components/receipt/VerifyReceiptButton';
import { TrustDocument, FactList } from '@/components/templates/TrustDocument';
import { RecordTable } from '@/components/templates/RecordTable';
import { ClosingBand } from '@/components/templates/ClosingBand';
import { RequestPilotButton } from '@/components/ui/RequestPilotButton';
import { SAMPLE_DISPLAY } from '@/lib/receipts/display';
import { RECEIPT_TERM, RECEIPT_TERM_PLURAL, SAMPLE_LABEL_SIGNED } from '@/config/site';

export const metadata: Metadata = {
  title: 'Developers: Thursdai',
  description: `The Thursdai API reference: authentication, recording ${RECEIPT_TERM_PLURAL} from any AI system, the receipt schema, verifying a signature yourself, queries, the agent and rate limits.`,
};

// Until separate docs exist, this page is the docs (plan Item 7.6).

const API_BASE = 'https://api.getthursdai.com/v1';

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

const CURL_RECEIPT = `curl -X POST ${API_BASE}/receipts \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "X-Tenant-ID: acme-financial" \\
  -H "Content-Type: application/json" \\
  -d '{
    "source": "greenhouse-screening-agent",
    "model": "gpt-4o",
    "decision": "Advanced applicant 4821 to interview stage",
    "context": {
      "job_req": "JR-204",
      "rubric_version": "v3",
      "tenant_id": "acme-financial"
    }
  }'`;

const PYTHON_QUERY = `from thursdai import ThursdaiClient

client = ThursdaiClient(api_key="thy_live_...")

# Query your receipt history in plain language
results = client.receipts.query(
    question="Which AI systems had the most compliance flags last quarter?",
    tenant_id="acme-financial",
    from_date="2026-04-01",
    to_date="2026-06-30",
)

for item in results.receipts:
    print(f"{item.source}: {item.compliance_summary}")
    print(f"  Receipt: {item.id}")`;

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

// Mirrors src/lib/receipts/verify.ts, so what we tell developers is what the verifier does.
const NODE_VERIFY = `import { createHash, createPublicKey, verify } from 'node:crypto';
import { readFileSync } from 'node:fs';

const file = JSON.parse(readFileSync('northwind-sample-receipt.json', 'utf8'));

// Canonical JSON: object keys sorted, no whitespace
const canon = (v) =>
  v === null || typeof v !== 'object'
    ? JSON.stringify(v)
    : Array.isArray(v)
      ? '[' + v.map(canon).join(',') + ']'
      : '{' + Object.keys(v).sort().map((k) => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}';

const bytes = Buffer.from(canon(file.receipt), 'utf8');
const sha256 = createHash('sha256').update(bytes).digest('hex');
const signed = verify(null, bytes, createPublicKey(file.public_key_pem), Buffer.from(file.signature, 'base64'));

console.log('fingerprint matches:', sha256 === file.sha256);
console.log('signature valid:', signed);`;

const SCOPES = [
  { scope: 'receipts:write', permits: 'Record AI Receipts from external systems and internal agents.' },
  { scope: 'receipts:read', permits: 'Read receipts, retrieve one by id and run plain-language queries against receipt history.' },
  { scope: 'agent:invoke', permits: 'Use the Thursdai agent for knowledge-grounded, policy-checked answers.' },
  { scope: 'replay:read', permits: 'Replay past decisions and run point-in-time queries.' },
  { scope: 'policy:read', permits: 'Read policy sets and dry-run them against recorded decisions.' },
  { scope: 'policy:write', permits: 'Create, update and publish policy sets.' },
  { scope: 'admin', permits: 'Tenant management, user provisioning and audit log export.' },
];

const ENDPOINTS = [
  { method: 'POST /v1/receipts', purpose: 'Record a decision from any AI system: your own model, a vendor agent or a third-party tool. Returns the receipt id, policy results and signature.' },
  { method: 'GET /v1/receipts/{id}', purpose: 'Read one receipt. Add include_anchor_proof=true for its Merkle anchor proof.' },
  { method: 'POST /v1/receipts/search', purpose: 'Filter receipts by source, date range or policy result. Cursor-paginated.' },
  { method: 'POST /v1/receipts/verify', purpose: 'Check the Merkle anchor for one or more receipts.' },
  { method: 'POST /v1/receipts/query', purpose: 'Ask questions of your receipt history in plain language. Returns matching receipts and summary statistics.' },
  { method: 'GET /v1/coverage', purpose: 'Decision counts and policy pass and fail rates for a tenant over a period.' },
  { method: 'GET /v1/frameworks', purpose: 'The compliance frameworks active for a tenant and their status.' },
  { method: 'POST /v1/agent/ask', purpose: 'Ask the Thursdai agent, grounded in your knowledge and policies. Every answer is itself an AI Receipt.' },
];

// The receipt schema as signed (src/lib/receipts/fixture.json is a real instance).
const SCHEMA_FIELDS = [
  { field: 'id', type: 'string', meaning: 'Receipt id, prefixed rcpt_.' },
  { field: 'schema', type: 'string', meaning: 'Schema version. Currently thursdai.ai-receipt/1.' },
  { field: 'tenant', type: 'string', meaning: 'The tenant that recorded the decision.' },
  { field: 'decision', type: 'object', meaning: 'summary, type, outcome, subject_ref (a reference, never a name) and confidence.' },
  { field: 'source', type: 'object', meaning: 'The system that decided: role, system, operator, model, model_host and version.' },
  { field: 'policies_evaluated', type: 'array', meaning: 'Each policy checked: id, name, result (pass, flag or block) and detail.' },
  { field: 'evidence', type: 'array', meaning: 'What the decision relied on: kind and ref for each item.' },
  { field: 'risk', type: 'object', meaning: 'tier and the framework it was assessed under.' },
  { field: 'human_oversight', type: 'object', meaning: 'reviewer_role and the action the reviewer took.' },
  { field: 'recorded_at', type: 'string', meaning: 'When the decision was recorded, ISO 8601 UTC.' },
  { field: 'scope_note', type: 'string', meaning: 'What the receipt does and does not claim.' },
];

const ENVELOPE_FIELDS = [
  { field: 'sha256', type: 'string', meaning: 'Hex sha256 of the canonical JSON of receipt: the fingerprint.' },
  { field: 'signature', type: 'string', meaning: 'Base64 Ed25519 signature over the same canonical bytes.' },
  { field: 'signature_algorithm', type: 'string', meaning: 'ed25519.' },
  { field: 'signed_at', type: 'string', meaning: 'When the signature was made, ISO 8601 UTC.' },
  { field: 'key_id', type: 'string', meaning: 'Which signing key was used.' },
];

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--ink)' };
const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

function Code({ children }: { children: React.ReactNode }) {
  return <code style={mono}>{children}</code>;
}

function CodeTabs({
  items,
}: {
  items: { label: string; code: string; language: 'python' | 'typescript' | 'bash'; filename: string }[];
}) {
  return (
    <div style={{ borderTop: '1px solid var(--ink)' }}>
      {items.map((it, i) => (
        <details key={it.label} open={i === 0} style={{ borderBottom: '1px solid var(--rule)' }}>
          <summary
            className="cursor-pointer py-3 flex items-center justify-between"
            style={{ ...LABEL_STYLE, color: 'var(--ink)', listStyle: 'none' }}
          >
            {it.label}
            <span aria-hidden="true" style={{ color: 'var(--ink-3)' }}>
              {it.filename}
            </span>
          </summary>
          <div style={{ paddingBottom: '1rem' }}>
            <CodeBlock code={it.code} language={it.language} filename={it.filename} />
          </div>
        </details>
      ))}
    </div>
  );
}

function SchemaTable({ caption, rows }: { caption: string; rows: { field: string; type: string; meaning: string }[] }) {
  return (
    <RecordTable
      caption={caption}
      columns={[
        { key: 'field', label: 'Field', width: '28%' },
        { key: 'type', label: 'Type', width: '12%' },
        { key: 'meaning', label: 'Meaning' },
      ]}
      rows={rows.map((r) => ({ id: r.field, field: <Code>{r.field}</Code>, type: r.type, meaning: r.meaning }))}
    />
  );
}

export default function DevelopersPage() {
  return (
    <TrustDocument
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Developers' }]}
      label="Developers"
      title="One API. Every AI decision on the record."
      lead={
        <>
          Record a signed {RECEIPT_TERM} from any system in one call, query your decision history in
          plain language and verify any receipt without an account. This page is the reference:
          authentication, the endpoints, the receipt schema and rate limits.
        </>
      }
      heroActions={
        <>
          <VerifyReceiptButton receiptId={SAMPLE_DISPLAY.id} label="Verify a receipt" className="max-w-[640px]" />
          <Body variant="small" style={{ marginTop: '1rem' }}>
            Runs <Code>GET /api/verify?id={SAMPLE_DISPLAY.id}</Code> against the signed sample
            receipt from the{' '}
            <Link href="/demo" style={UNDERLINED}>
              demo
            </Link>
            . {SAMPLE_LABEL_SIGNED}
          </Body>
        </>
      }
      meta={[
        { label: 'Base URL', value: API_BASE.replace('https://', '') },
        { label: 'Schema', value: 'thursdai.ai-receipt/1' },
        { label: 'Access', value: 'Pilot tenants' },
      ]}
      sections={[
        {
          id: 'access',
          title: 'Access',
          body: (
            <FactList
              items={[
                { term: 'Keys', body: 'API keys are issued with a pilot tenant. There is no self-serve sign-up yet.' },
                {
                  term: 'SDKs',
                  body: (
                    <>
                      TypeScript and Python SDKs and an MCP server are in private beta for
                      design partners. Everything they do is available over REST.
                    </>
                  ),
                },
                { term: 'Verify', body: 'Verifying a receipt needs no key: use the public check below or the public key.' },
              ]}
            />
          ),
        },
        {
          id: 'authentication',
          title: 'Authentication',
          body: (
            <>
              <Body>
                Every endpoint takes a bearer token in the <Code>Authorization</Code> header. Requests
                are scoped to a tenant with the <Code>X-Tenant-ID</Code> header or a{' '}
                <Code>tenant_id</Code> field. Keys carry scopes:
              </Body>
              <RecordTable
                caption="API key scopes and what each permits"
                columns={[
                  { key: 'scope', label: 'Scope', width: '28%' },
                  { key: 'permits', label: 'Permits' },
                ]}
                rows={SCOPES.map((s) => ({ id: s.scope, scope: <Code>{s.scope}</Code>, permits: s.permits }))}
              />
            </>
          ),
        },
        {
          id: 'endpoints',
          title: 'Endpoints',
          body: (
            <RecordTable
              caption="API endpoints"
              columns={[
                { key: 'method', label: 'Endpoint', width: '32%' },
                { key: 'purpose', label: 'What it does' },
              ]}
              rows={ENDPOINTS.map((e) => ({ id: e.method, method: <Code>{e.method}</Code>, purpose: e.purpose }))}
            />
          ),
        },
        {
          id: 'record',
          title: 'Record a receipt',
          body: (
            <>
              <Body>
                Send the system that decided, the model, the decision and any context you want on
                the record. The response carries the receipt id, the signing time and the result of
                every policy that ran.
              </Body>
              <CodeTabs
                items={[
                  { label: 'Python', code: PYTHON_RECEIPT, language: 'python', filename: 'record_receipt.py' },
                  { label: 'TypeScript', code: TS_RECEIPT, language: 'typescript', filename: 'record_receipt.ts' },
                  { label: 'cURL', code: CURL_RECEIPT, language: 'bash', filename: 'record_receipt.sh' },
                ]}
              />
            </>
          ),
        },
        {
          id: 'schema',
          title: 'The receipt schema',
          body: (
            <>
              <Body>
                A signed receipt is an envelope around one <Code>receipt</Code> object. The{' '}
                <a href="/artifacts/northwind-sample-receipt.json" download style={UNDERLINED}>
                  sample receipt JSON
                </a>{' '}
                is a complete instance.
              </Body>
              <SchemaTable caption="Fields of the receipt object" rows={SCHEMA_FIELDS} />
              <Body>The envelope around it:</Body>
              <SchemaTable caption="Fields of the signature envelope" rows={ENVELOPE_FIELDS} />
            </>
          ),
        },
        {
          id: 'verify',
          title: 'Verify a receipt yourself',
          body: (
            <>
              <Body>
                Serialise <Code>receipt</Code> as canonical JSON (keys sorted, no whitespace), hash it
                with sha256 and check the Ed25519 signature over the same bytes with the public key.
                If one character changes, both checks fail. This runs against the sample file with
                Node and nothing else:
              </Body>
              <CodeBlock code={NODE_VERIFY} language="typescript" filename="verify_receipt.mjs" />
            </>
          ),
        },
        {
          id: 'query',
          title: 'Query the record',
          body: (
            <>
              <Body>
                Ask questions of your receipt history in plain language, bounded by{' '}
                <Code>from_date</Code> and <Code>to_date</Code>.
              </Body>
              <CodeBlock code={PYTHON_QUERY} language="python" filename="query_receipts.py" />
            </>
          ),
        },
        {
          id: 'agent',
          title: 'Use the agent',
          body: (
            <>
              <Body>
                The agent answers from your knowledge base under your policies, and its answer is
                recorded as a receipt like any other decision.
              </Body>
              <CodeBlock code={PYTHON_AGENT} language="python" filename="agent_ask.py" />
            </>
          ),
        },
        {
          id: 'rate-limits',
          title: 'Rate limits',
          body: (
            <FactList
              items={[
                {
                  term: 'Public verify',
                  body: (
                    <>
                      <Code>GET /api/verify</Code> allows 60 requests a minute per IP address. Above
                      that it returns <Code>429</Code> with <Code>Retry-After: 60</Code>.
                    </>
                  ),
                },
                {
                  term: 'Tenant API',
                  body: 'Limits are set per pilot tenant from your expected receipt volume. There are no published tiers yet.',
                },
              ]}
            />
          ),
        },
      ]}
      close={
        <ClosingBand
          heading="Check the signature before you write a line."
          body="The demo verifies the sample receipt in the page. When you want keys, a pilot gives you a tenant of your own."
          actions={
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <ButtonLink href="/demo#receipt" variant="primary" size="lg">
                Verify a receipt
              </ButtonLink>
              <RequestPilotButton source="closing" variant="secondary" size="lg" />
            </div>
          }
        />
      }
    />
  );
}
