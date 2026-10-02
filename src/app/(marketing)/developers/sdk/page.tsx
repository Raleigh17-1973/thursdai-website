import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Body } from '@/components/typography/Body';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { RequestPilotButton } from '@/components/ui/RequestPilotButton';
import { TrustDocument } from '@/components/templates/TrustDocument';
import { ClosingBand } from '@/components/templates/ClosingBand';

export const metadata: Metadata = {
  title: 'SDK guide: Thursdai',
  description:
    'TypeScript and Python SDKs for Thursdai are in private beta. Write, read and search receipts over the REST API today.',
};

const API_BASE = 'https://api.getthursdai.com/v1';

const CURL_WRITE = `curl -X POST ${API_BASE}/receipts \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "X-Tenant-ID: your-tenant-id" \\
  -H "Content-Type: application/json" \\
  -d '{
    "source": "your-agent-id",
    "model": "gpt-4o",
    "decision": "Advanced candidate c_8821 to interview",
    "context": {
      "requisition": "req_441",
      "policy_ids": ["pol_hiring_v2"],
      "tenant_id": "your-tenant-id"
    }
  }'`;

const CURL_READ = `curl "${API_BASE}/receipts/rcpt_7f3a9c21b84e?include_anchor_proof=true" \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "X-Tenant-ID: your-tenant-id"`;

const CURL_SEARCH = `curl -X POST ${API_BASE}/receipts/search \\
  -H "Authorization: Bearer thy_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "tenant_id": "your-tenant-id",
    "source": "your-agent-id",
    "from": "2026-01-01T00:00:00Z",
    "compliance_status": "flag",
    "limit": 20
  }'`;

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--ink)' };
const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

export default function SdkPage() {
  return (
    <TrustDocument
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Developers', href: '/developers' },
        { label: 'SDK guide' },
      ]}
      label="SDK guide"
      title="Integrate over REST today."
      lead="The TypeScript and Python SDKs are in private beta for design partners. Everything they do is available over the REST API, and these three calls cover most integrations."
      heroActions={<RequestPilotButton source="hero" variant="primary" size="lg">Request SDK access</RequestPilotButton>}
      meta={[
        { label: 'Packages', value: '@thursdai/sdk, thursdai (Python)' },
        { label: 'Status', value: 'Private beta' },
      ]}
      sections={[
        {
          id: 'write',
          title: 'Write a receipt',
          body: (
            <>
              <Body>
                POST to <code style={mono}>/v1/receipts</code> to record a decision from any AI system
                in your stack. Fields and responses are in the{' '}
                <Link href="/developers#record" style={UNDERLINED}>
                  API reference
                </Link>
                .
              </Body>
              <CodeBlock code={CURL_WRITE} language="bash" filename="write_receipt.sh" />
            </>
          ),
        },
        {
          id: 'read',
          title: 'Read a receipt',
          body: (
            <>
              <Body>
                GET by receipt id. Add <code style={mono}>include_anchor_proof=true</code> to get the
                Merkle anchor proof with it.
              </Body>
              <CodeBlock code={CURL_READ} language="bash" filename="read_receipt.sh" />
            </>
          ),
        },
        {
          id: 'search',
          title: 'Search receipts',
          body: (
            <>
              <Body>
                POST to <code style={mono}>/v1/receipts/search</code> to filter by source, date range
                or policy result. Results are cursor-paginated.
              </Body>
              <CodeBlock code={CURL_SEARCH} language="bash" filename="search_receipts.sh" />
            </>
          ),
        },
      ]}
      close={
        <ClosingBand
          heading="SDK access comes with a pilot."
          body="Design partners get the SDKs, the MCP server and API keys for a tenant of their own."
          actions={<RequestPilotButton source="closing" variant="primary" size="lg">Request SDK access</RequestPilotButton>}
        />
      }
    />
  );
}
