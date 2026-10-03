import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Body } from '@/components/typography/Body';
import { ButtonLink } from '@/components/ui/Button';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { VerifyReceiptButton } from '@/components/receipt/VerifyReceiptButton';
import { TrustDocument, FactList } from '@/components/templates/TrustDocument';
import { RecordTable } from '@/components/templates/RecordTable';
import { ClosingBand } from '@/components/templates/ClosingBand';
import { RequestPilotButton } from '@/components/ui/RequestPilotButton';
import { SAMPLE_DISPLAY } from '@/lib/receipts/display';
import { CONTACT_EMAIL, DEMO_KEY_NOTE, RECEIPT_TERM, SAMPLE_LABEL_SIGNED } from '@/config/site';

export const metadata: Metadata = {
  title: 'Developers: Thursdai',
  description: `A signed sample ${RECEIPT_TERM}, its schema and a short script that verifies its signature without an account. There is no public API or SDK yet.`,
};

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
  const mail = `mailto:${CONTACT_EMAIL}?subject=Connecting%20a%20system`;
  return (
    <TrustDocument
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Developers' }]}
      label="Developers"
      title="Verify a signed receipt yourself."
      lead={
        <>
          The sample {RECEIPT_TERM} on this site is signed, and you can check it without an account.
          This page shows the receipt format and a short script that verifies it. There is no public
          API or SDK yet.
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
        { label: 'Schema', value: 'thursdai.ai-receipt/1' },
        { label: 'API', value: 'Not public' },
      ]}
      sections={[
        {
          id: 'access',
          title: 'Access',
          body: (
            <FactList
              items={[
                {
                  term: 'API',
                  body: (
                    <>
                      There is no public API. To connect one of your systems,{' '}
                      <a href={mail} style={UNDERLINED}>
                        email us
                      </a>{' '}
                      and we will talk through what a pilot involves.
                    </>
                  ),
                },
                { term: 'SDK', body: 'A TypeScript SDK exists in our repository and is not yet published.' },
                { term: 'Verify', body: 'Verifying a receipt needs no key: use the public check above or the public key in the sample file.' },
              ]}
            />
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
                is a complete instance. This is the format of the sample on this site.
              </Body>
              <Body variant="small">{DEMO_KEY_NOTE}</Body>
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
          id: 'rate-limits',
          title: 'Rate limit',
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
              ]}
            />
          ),
        },
      ]}
      close={
        <ClosingBand
          heading="Check the signature before you write a line."
          body="The demo verifies the sample receipt in the page. To connect a system of your own, a pilot gives you a tenant."
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
