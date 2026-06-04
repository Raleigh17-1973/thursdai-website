import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Display } from '@/components/typography/Display';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumb } from '@/components/nav/Breadcrumb';

export const metadata: Metadata = {
  title: 'MCP Server: Thursdai',
  description:
    'The Thursdai MCP server: five read-only audit tools for querying your AI Receipt record from any MCP-compatible client.',
};

// ── Tool definitions ────────────────────────────────────────────

const MCP_TOOLS = [
  {
    name: 'get_decision_record',
    description:
      'Retrieve a specific AI Receipt by ID, with full TCDS schema fields and anchor proof.',
    schema: {
      receipt_id: 'string (required)',
      tenant_id: 'string (required)',
      include_anchor_proof: 'boolean (optional, default false)',
    },
    curlExample: `curl "https://api.thursdai.com/v1/receipts/rec_01HXYZ..." \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "X-Tenant-ID: acme-financial"`,
  },
  {
    name: 'search_decisions',
    description:
      'Search the decision record by source system, date range, outcome, policy flag or compliance status.',
    schema: {
      tenant_id: 'string (required)',
      source: 'string (optional)',
      from: 'ISO8601 timestamp (optional)',
      to: 'ISO8601 timestamp (optional)',
      compliance_status: "'pass' | 'flag' | 'block' (optional)",
      limit: 'number (optional, default 20)',
      cursor: 'string (optional, for pagination)',
    },
    curlExample: `curl -X POST https://api.thursdai.com/v1/receipts/search \\
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
    description:
      'Verify the Merkle chain anchor for one or more receipts, confirming the record has not been altered.',
    schema: {
      receipt_ids: 'string[] (required)',
      tenant_id: 'string (required)',
    },
    curlExample: `curl -X POST https://api.thursdai.com/v1/receipts/verify \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "receipt_ids": ["rec_01HXYZ...", "rec_01HABC..."],
    "tenant_id": "acme-financial"
  }'`,
  },
  {
    name: 'get_coverage_summary',
    description:
      'Return a governance coverage summary: total decision count, compliance pass/fail rates and framework status across a tenant.',
    schema: {
      tenant_id: 'string (required)',
      from: 'ISO8601 timestamp (optional)',
      to: 'ISO8601 timestamp (optional)',
    },
    curlExample: `curl "https://api.thursdai.com/v1/coverage?tenant_id=acme-financial&from=2026-01-01T00:00:00Z" \\
  -H "Authorization: Bearer thy_live_..."`,
  },
  {
    name: 'list_frameworks',
    description:
      'List the compliance frameworks active for a tenant with their status, last audit date and coverage metrics.',
    schema: {
      tenant_id: 'string (required)',
    },
    curlExample: `curl "https://api.thursdai.com/v1/frameworks?tenant_id=acme-financial" \\
  -H "Authorization: Bearer thy_live_..."`,
  },
];

// ── Coming-soon action tools ────────────────────────────────────

const COMING_TOOLS = [
  {
    name: 'record_receipt',
    description: 'Submit a signed AI Receipt from any external system. Ships with the Receipt API.',
  },
  {
    name: 'invoke_role',
    description: 'Route a question through the Moderator panel. Ships with the Agent API.',
  },
  {
    name: 'stream_moderator_response',
    description: 'Stream the Moderator reconciliation in real time as role answers arrive.',
  },
];

// ── Installation snippets ───────────────────────────────────────

const CLAUDE_DESKTOP_CONFIG = `// ~/.claude/claude_desktop_config.json
{
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

const CURSOR_CONFIG = `// .cursor/mcp.json
{
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

const GENERIC_INSTALL = `# Install globally
npm install -g @thursdai/mcp-server

# Run the server
THURSDAI_API_KEY=thy_live_... \\
THURSDAI_TENANT_ID=your-tenant-id \\
thursdai-mcp-server --port 3333`;

// ── Styles ─────────────────────────────────────────────────────

const codeStyle: React.CSSProperties = {
  display: 'block',
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px',
  padding: '1rem',
  fontFamily: 'var(--font-mono, monospace)',
  fontSize: '13px',
  lineHeight: 1.6,
  color: 'rgba(255,255,255,0.85)',
  overflowX: 'auto',
  whiteSpace: 'pre',
  margin: '0',
};

// ── Page ───────────────────────────────────────────────────────

export default function McpPage() {
  return (
    <>
      {/* Hero */}
      <Section variant="default" style={{ background: '#0b0f19' }}>
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Developers', href: '/developers' },
              { label: 'MCP Server' },
            ]}
          />
          <Label style={{ color: '#8b9ef0', marginTop: '1.5rem', display: 'block' }}>MCP Server</Label>
          <Display style={{ color: '#e4e4e7', marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            Thursdai speaks MCP natively.
          </Display>
          <Body variant="large" style={{ color: '#a1a1aa' }}>
            Five read-only audit tools for querying your AI Receipt record from any
            MCP-compatible client, including Claude Desktop and Cursor. Action tools for
            recording decisions and routing through the Moderator panel ship as the Receipt
            and Agent APIs come online.
          </Body>
        </Container>
      </Section>

      {/* Installation */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '1rem' }}>Installation</Heading2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '1.25rem', padding: '0.75rem 1rem', background: 'var(--color-surface-secondary)', border: '1px solid var(--color-border-default)', borderRadius: '8px' }}>
            <strong style={{ color: 'var(--color-text-primary)' }}>Private beta:</strong>{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>@thursdai/mcp-server</code> is available to design partners. Contact{' '}
            <a href="mailto:dev@thursdai.com" style={{ color: 'var(--color-accent)' }}>dev@thursdai.com</a> for access.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--color-border-default)', marginBottom: '1.5rem' }}>
            {['Claude Desktop', 'Cursor', 'Generic MCP client'].map((label, i) => (
              <span
                key={label}
                style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: i === 0 ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  borderBottom: i === 0 ? '2px solid var(--color-accent)' : '2px solid transparent',
                  marginBottom: '-1px',
                }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Claude Desktop shown by default */}
          <div>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
              Add to your <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>~/.claude/claude_desktop_config.json</code>:
            </p>
            <pre style={codeStyle}>{CLAUDE_DESKTOP_CONFIG}</pre>
          </div>

          <details style={{ marginTop: '1.5rem' }}>
            <summary style={{ cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.75rem', listStyle: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>▶</span> Cursor configuration
            </summary>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0.75rem 0' }}>
              Add to <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>.cursor/mcp.json</code> in your project root:
            </p>
            <pre style={codeStyle}>{CURSOR_CONFIG}</pre>
          </details>

          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.75rem', listStyle: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>▶</span> Generic MCP client
            </summary>
            <pre style={{ ...codeStyle, marginTop: '0.75rem' }}>{GENERIC_INSTALL}</pre>
          </details>
        </Container>
      </Section>

      {/* Tool reference */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2 style={{ marginBottom: '0.5rem' }}>Tool reference</Heading2>
          <Body style={{ marginBottom: '2rem' }}>Five read-only audit tools, with three action tools coming.</Body>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {MCP_TOOLS.map((tool) => (
              <details
                key={tool.name}
                style={{
                  border: '1px solid var(--color-border-default)',
                  borderRadius: '10px',
                  background: 'var(--color-surface-primary)',
                  overflow: 'hidden',
                }}
              >
                <summary
                  style={{
                    padding: '1rem 1.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    listStyle: 'none',
                  }}
                >
                  <code
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'var(--color-accent)',
                    }}
                  >
                    {tool.name}
                  </code>
                  <Badge variant="teal">MCP Tool</Badge>
                  <span
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-text-secondary)',
                      flex: 1,
                    }}
                  >
                    {tool.description}
                  </span>
                </summary>

                <div
                  style={{
                    padding: '1rem 1.25rem 1.25rem',
                    borderTop: '1px solid var(--color-border-default)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--color-text-tertiary)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Input schema
                    </p>
                    <pre style={codeStyle}>
                      {JSON.stringify(tool.schema, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--color-text-tertiary)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      cURL example
                    </p>
                    <pre style={codeStyle}>{tool.curlExample}</pre>
                  </div>
                </div>
              </details>
            ))}
          </div>

          {/* Coming-soon action tools */}
          <Heading2 style={{ marginTop: '2.5rem', marginBottom: '0.5rem' }}>Coming soon</Heading2>
          <Body style={{ marginBottom: '1.5rem' }}>
            Action tools shipping with the Receipt and Agent APIs.
          </Body>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {COMING_TOOLS.map((tool) => (
              <div
                key={tool.name}
                style={{
                  border: '1px solid var(--color-border-default)',
                  borderRadius: '10px',
                  background: 'var(--color-surface-primary)',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  opacity: 0.65,
                }}
              >
                <code
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {tool.name}
                </code>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-text-tertiary)',
                    background: 'var(--color-surface-secondary)',
                    border: '1px solid var(--color-border-default)',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Coming soon
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-text-secondary)',
                    flex: 1,
                  }}
                >
                  {tool.description}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
