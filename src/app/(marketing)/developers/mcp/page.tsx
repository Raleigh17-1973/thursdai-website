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
    'The Thursdai MCP server: invoke_role, replay_case, dry_run_policy and four more tools for governed AI agent orchestration.',
};

// ── Tool definitions ────────────────────────────────────────────

const MCP_TOOLS = [
  {
    name: 'invoke_role',
    description:
      'Route a question through one or more roles. Returns panel answers + Moderator reconciliation.',
    schema: {
      question: 'string (required)',
      roles: 'string[] (optional, defaults to all configured roles)',
      tenant_id: 'string (required)',
      policy_set: 'string (optional, defaults to active policy set)',
      replay_at: 'ISO8601 timestamp (optional, for time-travel)',
    },
    curlExample: `curl -X POST https://api.thursdai.com/v1/invoke-role \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "question": "Should we deploy GPT-4o to tier-1 clients?",
    "roles": ["legal", "finance", "engineering"],
    "tenant_id": "acme-financial",
    "policy_set": "production-v2"
  }'`,
  },
  {
    name: 'replay_case',
    description:
      'Replay a past decision with the knowledge and policies active at a specific timestamp.',
    schema: {
      case_id: 'string (required)',
      replay_at: 'ISO8601 timestamp (required)',
      tenant_id: 'string (required)',
      include_diff: 'boolean (optional, default false)',
    },
    curlExample: `curl -X POST https://api.thursdai.com/v1/replay-case \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "case_id": "case_01HXYZ...",
    "replay_at": "2025-12-01T00:00:00Z",
    "tenant_id": "acme-financial",
    "include_diff": true
  }'`,
  },
  {
    name: 'check_tenant_vs_standard',
    description:
      'Compare how an answer changes between the standard corpus and your tenant corpus.',
    schema: {
      question: 'string (required)',
      tenant_id: 'string (required)',
      roles: 'string[] (optional)',
      format: "'summary' | 'full' (optional, default 'summary')",
    },
    curlExample: `curl -X POST https://api.thursdai.com/v1/corpus-compare \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "question": "What is our policy on AI vendor selection?",
    "tenant_id": "acme-financial",
    "format": "full"
  }'`,
  },
  {
    name: 'dry_run_policy',
    description:
      'Test a policy YAML against a set of queries without affecting production.',
    schema: {
      policy_yaml: 'string (required)',
      test_questions: 'string[] (required)',
      tenant_id: 'string (required)',
      roles: 'string[] (optional)',
    },
    curlExample: `curl -X POST https://api.thursdai.com/v1/policy/dry-run \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "policy_yaml": "allowed_sources:\\n  - internal-legal\\nrequired_attribution: true",
    "test_questions": ["Can we cite competitor pricing?"],
    "tenant_id": "acme-financial"
  }'`,
  },
  {
    name: 'list_roles',
    description:
      'List all configured roles for a tenant, with scope and corpus access details.',
    schema: {
      tenant_id: 'string (required)',
      include_disabled: 'boolean (optional, default false)',
    },
    curlExample: `curl https://api.thursdai.com/v1/roles \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "X-Tenant-ID: acme-financial"`,
  },
  {
    name: 'get_case_history',
    description:
      'Retrieve the full decision history for a case ID, with all versions and policy states.',
    schema: {
      case_id: 'string (required)',
      tenant_id: 'string (required)',
      limit: 'number (optional, default 20)',
      cursor: 'string (optional, for pagination)',
    },
    curlExample: `curl "https://api.thursdai.com/v1/cases/case_01HXYZ.../history" \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "X-Tenant-ID: acme-financial"`,
  },
  {
    name: 'stream_moderator_response',
    description:
      'Stream the Moderator\'s reconciliation in real time as role answers arrive.',
    schema: {
      question: 'string (required)',
      roles: 'string[] (optional)',
      tenant_id: 'string (required)',
      policy_set: 'string (optional)',
    },
    curlExample: `curl -X POST https://api.thursdai.com/v1/stream/moderator \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "Content-Type: application/json" \\
  -H "Accept: text/event-stream" \\
  -d '{
    "question": "What is our GDPR exposure for this feature?",
    "tenant_id": "acme-financial"
  }'`,
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
            Seven MCP tools for governed agent orchestration. Works with Claude Desktop, Cursor,
            and any Model Context Protocol-compatible client. invoke_role() brings Thursdai&apos;s
            Moderator into any agent workflow.
          </Body>
        </Container>
      </Section>

      {/* Installation */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>Installation</Heading2>
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
          <Body style={{ marginBottom: '2rem' }}>Seven tools for governed agent orchestration.</Body>

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
        </Container>
      </Section>
    </>
  );
}
