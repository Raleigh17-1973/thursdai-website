import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Body } from '@/components/typography/Body';
import { LABEL_STYLE } from '@/components/typography/scale';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { RequestPilotButton } from '@/components/ui/RequestPilotButton';
import { TrustDocument, FactList } from '@/components/templates/TrustDocument';
import { RecordTable } from '@/components/templates/RecordTable';
import { ClosingBand } from '@/components/templates/ClosingBand';
import { RECEIPT_TERM } from '@/config/site';

export const metadata: Metadata = {
  title: 'MCP server: Thursdai',
  description: `The Thursdai MCP server: five read-only tools for querying your ${RECEIPT_TERM} record from Claude Desktop, Cursor or any MCP client. Private beta for design partners.`,
};

const API_BASE = 'https://api.getthursdai.com/v1';

// Input schemas are JSON Schema, which is what MCP clients read from a tool's inputSchema.
const TOOLS = [
  {
    name: 'get_decision_record',
    description: 'Retrieve one AI Receipt by id with every schema field and, optionally, its Merkle anchor proof.',
    schema: {
      type: 'object',
      required: ['receipt_id', 'tenant_id'],
      properties: {
        receipt_id: { type: 'string', description: 'The receipt id to retrieve' },
        tenant_id: { type: 'string', description: 'Your tenant identifier' },
        include_anchor_proof: { type: 'boolean', default: false, description: 'Include the Merkle anchor proof' },
      },
    },
    curl: `curl "${API_BASE}/receipts/rcpt_7f3a9c21b84e?include_anchor_proof=true" \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "X-Tenant-ID: acme-financial"`,
  },
  {
    name: 'search_decisions',
    description: 'Search the record by source system, date range or policy result.',
    schema: {
      type: 'object',
      required: ['tenant_id'],
      properties: {
        tenant_id: { type: 'string', description: 'Your tenant identifier' },
        source: { type: 'string', description: 'Filter by source system' },
        from: { type: 'string', format: 'date-time', description: 'Start of date range (ISO 8601)' },
        to: { type: 'string', format: 'date-time', description: 'End of date range (ISO 8601)' },
        compliance_status: { type: 'string', enum: ['pass', 'flag', 'block'], description: 'Filter by policy result' },
        limit: { type: 'number', default: 20, description: 'Maximum results to return' },
        cursor: { type: 'string', description: 'Pagination cursor from a prior response' },
      },
    },
    curl: `curl -X POST ${API_BASE}/receipts/search \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "tenant_id": "acme-financial",
    "source": "greenhouse-screening-agent",
    "from": "2026-01-01T00:00:00Z",
    "compliance_status": "flag"
  }'`,
  },
  {
    name: 'verify_anchor',
    description: 'Verify the Merkle anchor for one or more receipts, confirming the record has not been altered.',
    schema: {
      type: 'object',
      required: ['receipt_ids', 'tenant_id'],
      properties: {
        receipt_ids: { type: 'array', items: { type: 'string' }, description: 'One or more receipt ids to verify' },
        tenant_id: { type: 'string', description: 'Your tenant identifier' },
      },
    },
    curl: `curl -X POST ${API_BASE}/receipts/verify \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "receipt_ids": ["rcpt_7f3a9c21b84e"],
    "tenant_id": "acme-financial"
  }'`,
  },
  {
    name: 'get_coverage_summary',
    description: 'Decision counts and policy pass and fail rates across a tenant for a period.',
    schema: {
      type: 'object',
      required: ['tenant_id'],
      properties: {
        tenant_id: { type: 'string', description: 'Your tenant identifier' },
        from: { type: 'string', format: 'date-time', description: 'Start of reporting period (ISO 8601)' },
        to: { type: 'string', format: 'date-time', description: 'End of reporting period (ISO 8601)' },
      },
    },
    curl: `curl "${API_BASE}/coverage?tenant_id=acme-financial&from=2026-01-01T00:00:00Z" \\
  -H "Authorization: Bearer thy_live_..."`,
  },
  {
    name: 'list_frameworks',
    description: 'The compliance frameworks active for a tenant, with status, last audit date and coverage.',
    schema: {
      type: 'object',
      required: ['tenant_id'],
      properties: {
        tenant_id: { type: 'string', description: 'Your tenant identifier' },
      },
    },
    curl: `curl "${API_BASE}/frameworks?tenant_id=acme-financial" \\
  -H "Authorization: Bearer thy_live_..."`,
  },
];

const NOT_YET = [
  { name: 'record_receipt', description: 'Record a receipt from an MCP client.' },
  { name: 'invoke_role', description: 'Route a question through the Moderator panel.' },
  { name: 'stream_moderator_response', description: 'Stream the Moderator reconciliation as role answers arrive.' },
];

const SERVER_ENTRY = `{
  "mcpServers": {
    "thursdai": {
      "command": "npx",
      "args": ["-y", "@thursdai/mcp-server"],
      "env": {
        "THURSDAI_API_KEY": "thy_live_...",
        "THURSDAI_TENANT_ID": "your-tenant-id"
      }
    }
  }
}`;

const GENERIC_INSTALL = `# Install
npm install -g @thursdai/mcp-server

# Run the server
THURSDAI_API_KEY=thy_live_... \\
THURSDAI_TENANT_ID=your-tenant-id \\
thursdai-mcp-server --port 3333`;

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--ink)' };
const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

export default function McpPage() {
  return (
    <TrustDocument
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Developers', href: '/developers' },
        { label: 'MCP server' },
      ]}
      label="MCP server"
      title="Query the record from any MCP client."
      lead={
        <>
          Five read-only tools for querying your {RECEIPT_TERM} record from Claude Desktop, Cursor or
          any MCP-compatible client. The server is in private beta for design partners.
        </>
      }
      heroActions={<RequestPilotButton source="hero" variant="primary" size="lg">Request access</RequestPilotButton>}
      meta={[
        { label: 'Package', value: '@thursdai/mcp-server' },
        { label: 'Tools', value: '5, read-only' },
        { label: 'Status', value: 'Private beta' },
      ]}
      sections={[
        {
          id: 'install',
          title: 'Installation',
          body: (
            <>
              <FactList
                items={[
                  {
                    term: 'Claude Desktop',
                    body: (
                      <>
                        Add the server entry to <code style={mono}>claude_desktop_config.json</code>:
                        on macOS in <code style={mono}>~/Library/Application Support/Claude/</code>, on
                        Windows in <code style={mono}>%APPDATA%\Claude\</code>.
                      </>
                    ),
                  },
                  {
                    term: 'Cursor',
                    body: (
                      <>
                        Add the same entry to <code style={mono}>.cursor/mcp.json</code> in your project
                        root.
                      </>
                    ),
                  },
                ]}
              />
              <CodeBlock code={SERVER_ENTRY} language="json" filename="claude_desktop_config.json" />
              <Body>Any other client can run the server over a port:</Body>
              <CodeBlock code={GENERIC_INSTALL} language="bash" filename="terminal" />
            </>
          ),
        },
        {
          id: 'tools',
          title: 'Tool reference',
          body: (
            <>
              <Body>
                Each tool calls the REST endpoint shown, documented in the{' '}
                <Link href="/developers#endpoints" style={UNDERLINED}>
                  API reference
                </Link>
                .
              </Body>
              <div style={{ borderTop: '1px solid var(--ink)' }}>
                {TOOLS.map((tool) => (
                  <details key={tool.name} style={{ borderBottom: '1px solid var(--rule)' }}>
                    <summary className="cursor-pointer py-4 grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-x-6 gap-y-1" style={{ listStyle: 'none' }}>
                      <code style={{ ...mono, fontSize: '15px', fontWeight: 500 }}>{tool.name}</code>
                      <span style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--color-text-secondary)' }}>
                        {tool.description}
                      </span>
                    </summary>
                    <div className="flex flex-col gap-4" style={{ paddingBottom: '1.5rem' }}>
                      <p className="m-0" style={LABEL_STYLE}>
                        Input schema
                      </p>
                      <CodeBlock code={JSON.stringify(tool.schema, null, 2)} language="json" filename={`${tool.name}.schema.json`} />
                      <p className="m-0" style={LABEL_STYLE}>
                        Equivalent request
                      </p>
                      <CodeBlock code={tool.curl} language="bash" filename={`${tool.name}.sh`} />
                    </div>
                  </details>
                ))}
              </div>
            </>
          ),
        },
        {
          id: 'not-yet',
          title: 'Not yet available',
          body: (
            <>
              <Body>
                These action tools are not in the server yet. Until they are, record receipts over
                REST.
              </Body>
              <RecordTable
                caption="MCP tools not yet available"
                columns={[
                  { key: 'name', label: 'Tool', width: '34%' },
                  { key: 'description', label: 'What it will do' },
                ]}
                rows={NOT_YET.map((t) => ({ id: t.name, name: <code style={mono}>{t.name}</code>, description: t.description }))}
              />
            </>
          ),
        },
      ]}
      close={
        <ClosingBand
          heading={<>Access comes with a pilot.</>}
          body="Design partners get the MCP server, the SDKs and API keys for a tenant of their own."
          actions={<RequestPilotButton source="closing" variant="primary" size="lg">Request access</RequestPilotButton>}
        />
      }
    />
  );
}
