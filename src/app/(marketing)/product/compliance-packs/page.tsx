import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Display } from '@/components/typography/Display';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Breadcrumb } from '@/components/nav/Breadcrumb';

export const metadata: Metadata = {
  title: 'Compliance Packs: Thursdai',
  description:
    'Signed, framework-shaped evidence bundles generated on demand from the AI Decision Ledger. The exportable, auditor-ready form of every governed decision.',
};

const PACK_SECTIONS = [
  { n: '1', title: 'Methodology', detail: 'Audit type, engine version and date' },
  { n: '2', title: 'Population', detail: 'Records and demographics in scope' },
  { n: '3', title: 'Selection and impact ratios', detail: 'Rates by group and four-fifths analysis' },
  { n: '4', title: 'Findings', detail: 'Adverse-impact flags and pass or fail status' },
  { n: '5', title: 'Attestation', detail: 'Signed verification from the compliance engine' },
  { n: '6', title: 'Provenance', detail: 'The decision chain showing how the pack was rendered' },
];

export default function CompliancePacksPage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Product', href: '/product' },
              { label: 'Compliance Packs' },
            ]}
          />
          <Label style={{ marginTop: '1.5rem', display: 'block' }}>Compliance Packs</Label>
          <Display style={{ marginTop: '0.75rem' }}>Evidence on demand.</Display>
          <Body variant="large" style={{ marginTop: '1.5rem', maxWidth: '720px' }}>
            A compliance pack is a signed, framework-shaped evidence bundle generated on demand from
            the AI Decision Ledger. It is the exportable, auditor-ready form of the decisions
            Thursdai already records, not a report you assemble by hand the week before an audit.
          </Body>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/product/time-travel">
              <Button variant="secondary" size="md">See where the record comes from →</Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* From audit trail to signed evidence */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2>From audit trail to signed evidence.</Heading2>
          <Body style={{ maxWidth: '720px', marginTop: '1rem' }}>
            Time-Travel records every decision with the knowledge, roles and policy state active at
            the time. A pack is that record, selected for a framework, rendered into a document and
            cryptographically signed so it cannot be altered after the fact.
          </Body>
          <Grid cols={3} gap="md" style={{ marginTop: '1.5rem' }}>
            <Card
              variant="feature"
              title="Two formats"
              body="A human-readable PDF for auditors and boards, and machine-readable JSON-LD for systems that ingest evidence directly."
            />
            <Card
              variant="feature"
              title="Signed and tamper-evident"
              body="Each pack carries cryptographic signatures and is written to immutable storage, so a pack you produce today still verifies years from now."
            />
            <Card
              variant="feature"
              title="Traceable to source"
              body="Every figure in a pack links back through provenance to the ledger records it was rendered from. Nothing is asserted without lineage."
            />
          </Grid>
        </Container>
      </Section>

      {/* What's inside */}
      <Section variant="compact">
        <Container>
          <Heading2>What is inside a pack.</Heading2>
          <Body style={{ maxWidth: '720px', marginTop: '1rem' }}>
            Packs are shaped to the framework they serve. A bias-audit pack, for example, is
            structured so an independent auditor or a regulator can read it without translation.
          </Body>
          <Grid cols={3} gap="md" style={{ marginTop: '1.5rem' }}>
            {PACK_SECTIONS.map((s) => (
              <div
                key={s.n}
                style={{
                  border: '1px solid var(--color-border-default)',
                  borderRadius: '12px',
                  background: 'var(--color-surface-primary)',
                  padding: '1.1rem 1.25rem',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-accent)' }}>{s.n}</span>
                <p style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-text-primary)', margin: '0.25rem 0 0 0' }}>
                  {s.title}
                </p>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0.35rem 0 0 0' }}>
                  {s.detail}
                </p>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* The honesty line */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Callout variant="info" title="What a pack is, and is not.">
            A compliance pack is the evidence and documentation that supports an audit. It is not
            the independent audit itself, and it is not a guarantee of compliance. Thursdai produces
            the record, shaped and signed; your independent auditor and your regulators reach the
            conclusions.
          </Callout>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="compact">
        <Container>
          <Heading2>See packs in a space.</Heading2>
          <Body style={{ marginTop: '0.75rem' }}>
            The People space is the first to ship packs across a full set of workforce frameworks.
          </Body>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/solutions/people">
              <Button variant="primary" size="md">Explore the People space →</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
