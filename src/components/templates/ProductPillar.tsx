import React from 'react';
import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Display } from '@/components/typography/Display';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { LABEL_STYLE } from '@/components/typography/scale';
import { ButtonLink } from '@/components/ui/Button';
import { RequestPilotButton } from '@/components/ui/RequestPilotButton';
import { ClosingCTAs } from '@/components/ui/ClosingCTAs';
import { Breadcrumb } from '@/components/nav/Breadcrumb';
import { SAMPLE_DISPLAY as S } from '@/lib/receipts/display';

// Product pillar template (docs/design/the-record.md, "Page anatomy" 2):
// H1 and a one-sentence promise; the receipt or a live capture beside it; three
// mono-labelled facts; one linework diagram; how it is signed and verified; the ink close.
// "Open the demo" is the page's one primary, in the hero and again in the close.

export interface PillarFact {
  /** A noun, set as a mono label: "Source", "Policy", "Evidence". */
  label: string;
  body: React.ReactNode;
}

export interface ProductPillarProps {
  /** Breadcrumb leaf. Omit on the hub. */
  crumb?: string;
  /** Mono label above the H1. */
  label: string;
  title: string;
  /** One sentence. */
  promise: React.ReactNode;
  /** Primary action target; the label is always "Open the demo". */
  demoHref?: string;
  /** Optional status line under the CTAs (for example an early-access note). */
  status?: React.ReactNode;
  /** The receipt, or a live product surface where that is genuinely the product. */
  visual: React.ReactNode;
  /**
   * side: beside the headline (the receipt, the audit pack).
   * wide: full width under the headline (the scrubber, the policy editor, the panel).
   */
  visualLayout?: 'side' | 'wide';
  /** A short mono note under the visual. */
  visualNote?: React.ReactNode;
  facts?: { label: string; title: string; items: [PillarFact, PillarFact, PillarFact] };
  diagram: { label: string; title: string; body: React.ReactNode; figure: React.ReactNode };
  /** What this pillar adds to the signed record, one or two sentences. Leads the verify note. */
  verify: React.ReactNode;
  close: { title: string; body: React.ReactNode };
  /** Extra sections, set after the facts and before the diagram. Use sparingly. */
  children?: React.ReactNode;
}

const NOTE_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '12px',
  lineHeight: 1.5,
  color: 'var(--ink-3)',
};

const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

function Hero({
  crumb,
  label,
  title,
  promise,
  demoHref = '/demo',
  status,
  visual,
  visualLayout = 'side',
  visualNote,
}: ProductPillarProps) {
  const copy = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Label>{label}</Label>
      <Display>{title}</Display>
      <Body variant="large">{promise}</Body>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
        <ButtonLink href={demoHref} variant="primary" size="lg">
          Open the demo
        </ButtonLink>
        <RequestPilotButton source="hero" variant="secondary" size="lg" />
      </div>
      {status ? <div style={{ marginTop: '0.5rem' }}>{status}</div> : null}
    </div>
  );
  const note = visualNote ? (
    <p className="m-0" style={{ ...NOTE_STYLE, marginTop: '1.25rem' }}>
      {visualNote}
    </p>
  ) : null;

  return (
    <Section variant="compact">
      <Container>
        {crumb ? (
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Product', href: '/product' },
              { label: crumb },
            ]}
          />
        ) : null}
        {visualLayout === 'side' ? (
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 items-center"
            style={{ marginTop: crumb ? '2.5rem' : 0 }}
          >
            <div className="lg:col-span-6">{copy}</div>
            <div className="lg:col-start-8 lg:col-span-5">
              {visual}
              {note}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12" style={{ marginTop: crumb ? '2.5rem' : 0 }}>
              <div className="lg:col-span-8">{copy}</div>
            </div>
            <div style={{ marginTop: '4rem' }}>
              {visual}
              {note}
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}

function Facts({ facts }: { facts: NonNullable<ProductPillarProps['facts']> }) {
  return (
    <Section>
      <Container>
        <Label as="p">{facts.label}</Label>
        <Heading2 style={{ marginTop: '1rem' }}>{facts.title}</Heading2>
        <dl className="m-0 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10" style={{ marginTop: '3rem' }}>
          {facts.items.map((f) => (
            <div key={f.label} style={{ borderTop: '1px solid var(--ink)', paddingTop: '1.25rem' }}>
              <dt style={{ ...LABEL_STYLE, color: 'var(--ink)' }}>{f.label}</dt>
              <dd className="m-0" style={{ marginTop: '0.75rem', fontSize: '17px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                {f.body}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

function Diagram({ diagram }: { diagram: ProductPillarProps['diagram'] }) {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
          <div className="lg:col-span-6">
            <Label as="p">{diagram.label}</Label>
            <Heading2 style={{ marginTop: '1rem' }}>{diagram.title}</Heading2>
          </div>
          <Body className="lg:col-start-8 lg:col-span-5 lg:self-end">{diagram.body}</Body>
        </div>
        <div style={{ marginTop: '3rem' }}>{diagram.figure}</div>
      </Container>
    </Section>
  );
}

/** How the record is signed and verified: the same facts on every pillar, led by this pillar's part. */
export function SignedAndVerified({ lead }: { lead: React.ReactNode }) {
  return (
    <Section variant="compact">
      <Container>
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6"
          style={{ borderTop: '1px solid var(--ink)', paddingTop: '1.5rem' }}
        >
          <h2 className="m-0 lg:col-span-4" style={{ ...LABEL_STYLE, color: 'var(--ink)' }}>
            How it is signed and verified
          </h2>
          <div className="lg:col-start-6 lg:col-span-7" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Body>{lead}</Body>
            <Body>
              Each receipt is signed with Ed25519 over its canonical JSON and carries a sha256 fingerprint
              that changes if a single character does. Anyone can check one without an account: recompute
              the hash and verify the signature against the public key.{' '}
              <Link href="/demo#receipt" style={UNDERLINED}>
                Verify the sample receipt in the demo
              </Link>
              .
            </Body>
            <Body>A receipt is proof of what happened, not that it was right.</Body>
            <p className="m-0" style={NOTE_STYLE}>
              Sample: sha256 {S.fingerprint} · {S.algorithm} · {S.keyId}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Close({ close }: { close: ProductPillarProps['close'] }) {
  return (
    <Section tone="ink">
      <Container>
        <Heading2>{close.title}</Heading2>
        <Body variant="large" style={{ marginTop: '1.5rem' }}>
          {close.body}
        </Body>
        <ClosingCTAs primary="demo" style={{ marginTop: '2.5rem' }} />
      </Container>
    </Section>
  );
}

export function ProductPillar(props: ProductPillarProps) {
  return (
    <>
      <Hero {...props} />
      {props.facts ? <Facts facts={props.facts} /> : null}
      {props.children}
      <Diagram diagram={props.diagram} />
      <SignedAndVerified lead={props.verify} />
      <Close close={props.close} />
    </>
  );
}

/** A plain ruled section for the rare pillar that needs one more beat. */
export function ProductPillarSection({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
          <div className="lg:col-span-5">
            <Label as="p">{label}</Label>
            <Heading2 style={{ marginTop: '1rem' }}>{title}</Heading2>
          </div>
          <div className="lg:col-start-7 lg:col-span-6 lg:self-end" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {children}
          </div>
        </div>
      </Container>
    </Section>
  );
}
