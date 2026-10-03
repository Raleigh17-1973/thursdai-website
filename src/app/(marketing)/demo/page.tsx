import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Display } from '@/components/typography/Display';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { H3_STYLE, LABEL_STYLE } from '@/components/typography/scale';
import { ReceiptFrame } from '@/components/receipt/ReceiptFrame';
import { SAMPLE_HIRING_RECEIPT } from '@/components/receipt/sample';
import { VerifyReceiptButton } from '@/components/receipt/VerifyReceiptButton';
import { AuditPackSummary } from '@/components/receipt/AuditPackSummary';
import { Reveal } from '@/components/motion/Reveal';
import { TimeTravelScrubber } from '@/components/demos/TimeTravelScrubber';
import { ClosingCTAs } from '@/components/ui/ClosingCTAs';
import { DEMO_KEY_NOTE, RECEIPT_TERM, SAMPLE_LABEL_SIGNED } from '@/config/site';
import { HIRING_REPLAY, HIRING_REPLAY_DECISION_INDEX, HIRING_REPLAY_QUESTION } from '@/config/demo-hiring-replay';
import { SAMPLE_DISPLAY as S, SAMPLE_RECEIPT as R, tamperedId } from '@/lib/receipts/display';
import { sampleArtifacts } from '@/lib/artifacts';
import { TrackDemoView } from '@/components/analytics/TrackDemoView';

export const metadata: Metadata = {
  title: 'Demo: Thursdai',
  description: `Verify a signed ${RECEIPT_TERM}, replay what a vendor's hiring screening agent knew at the moment it decided and download the audit pack. Sample tenant, a signature you can check, no login.`,
};

const DOWNLOADS = sampleArtifacts();

const PANES = [
  { n: '01', id: 'receipt', title: 'The receipt' },
  { n: '02', id: 'replay', title: 'The replay' },
  { n: '03', id: 'audit-pack', title: 'The audit pack' },
];

const REAL_THING = [
  {
    title: 'Tenant separation',
    body: 'Your receipts are written to your own tenant, separated from other tenants by row-level security. Nothing you record touches the sample.',
  },
  {
    title: 'Your policies',
    body: 'The checks are the ones you write, versioned as code. Every receipt names the policy version that ran.',
  },
  {
    title: 'Your records',
    body: 'A replay reopens a decision from its audit trail: the evidence, policies and roles named on your own receipts, at the versions they used.',
  },
  {
    title: 'SSO',
    body: 'SSO via WorkOS is integrated; availability is confirmed per pilot.',
  },
];

function PaneLabel({ n, title }: { n: string; title: string }) {
  return (
    <Label as="p" style={{ color: 'var(--ink)' }}>
      {n} <span style={{ color: 'var(--ink-3)' }}>/</span> {title}
    </Label>
  );
}

function SignedNote() {
  return (
    <p className="m-0" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.4, color: 'var(--ink-3)' }}>
      {SAMPLE_LABEL_SIGNED}
    </p>
  );
}

export default function DemoPage() {
  const tampered = tamperedId(S.id);

  return (
    <>
      <TrackDemoView />
      {/* ── Intro ─────────────────────────────────────────────── */}
      <Section variant="compact">
        <Container>
          <Label>Demo</Label>
          <Display style={{ marginTop: '1rem' }}>One hiring decision, on the record.</Display>
          <Body variant="large" style={{ marginTop: '1.5rem' }}>
            A vendor&apos;s screening agent advanced an applicant at Northwind Financial, a fictional
            sample tenant. Thursdai checked the decision against policy, recorded it and signed it.
            Verify the signature, replay what was known at the time and download the audit pack. No
            login, nothing to install.
          </Body>
          <nav aria-label="Demo panes" style={{ marginTop: '2.5rem' }}>
            <ol
              className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-3"
              style={{ borderTop: '1px solid var(--ink)' }}
            >
              {PANES.map((p) => (
                <li key={p.id} style={{ borderBottom: '1px solid var(--rule)' }}>
                  <a
                    href={`#${p.id}`}
                    className="flex items-baseline gap-3 py-3 pr-4"
                    style={{ color: 'var(--ink)', fontSize: '15px' }}
                  >
                    <span style={{ ...LABEL_STYLE, color: 'var(--ink-3)' }}>{p.n}</span>
                    {p.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div style={{ marginTop: '1rem' }}>
            <SignedNote />
          </div>
        </Container>
      </Section>

      {/* ── 01 The receipt ────────────────────────────────────── */}
      <Section id="receipt" style={{ scrollMarginTop: '64px' }}>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-x-16 md:gap-x-24 gap-y-10 items-start">
            <div className="md:col-start-1 md:row-start-1" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <PaneLabel n="01" title="The receipt" />
              <Heading2>The receipt, signed and checkable.</Heading2>
              <Body>
                This is the {RECEIPT_TERM} Thursdai wrote when the screening agent made its call. The
                decision came from {R.source.system}, running {R.source.model} on {R.source.model_host}.
                Thursdai added the policy check, the record and the signature.
              </Body>
              <Body>
                Verify it. The button calls the same verifier the downloadable receipt points to: it
                recomputes the hash from the stored record and checks the Ed25519 signature. Then try an
                id that is one character off.
              </Body>
              <Body variant="small">{DEMO_KEY_NOTE}</Body>
            </div>

            <div className="md:col-start-2 md:row-start-1 md:row-span-2 md:sticky md:top-24">
              <ReceiptFrame {...SAMPLE_HIRING_RECEIPT} signing style={{ maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto' }} />
            </div>

            <div className="md:col-start-1 md:row-start-2" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <VerifyReceiptButton receiptId={S.id} tamperedId={tampered} trackDemo />
              <div style={{ borderLeft: '2px solid var(--ink)', paddingLeft: '1rem' }}>
                <Label as="p">Scope</Label>
                <Body variant="small" style={{ marginTop: '0.375rem', color: 'var(--ink)' }}>
                  {R.scope_note} Proof of what happened, not that it was right.
                </Body>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 02 The replay ─────────────────────────────────────── */}
      <Section id="replay" style={{ scrollMarginTop: '64px' }}>
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <PaneLabel n="02" title="The replay" />
            <Heading2>What was known at 14:32 on 16 September.</Heading2>
            <Body>
              Time-Travel reopens a decision as its record had it: the knowledge it drew on, the policies
              that were live and who held which role. Move the slider, or use the arrow keys. The rubric
              and the model have both changed since the decision. The receipt has not.
            </Body>
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <TimeTravelScrubber
              question={HIRING_REPLAY_QUESTION}
              questionLabel="Replaying"
              snapshots={HIRING_REPLAY}
              initialIndex={HIRING_REPLAY_DECISION_INDEX}
              sliderLabel="Replay requisition JR-204 at a point in time"              footnote={SAMPLE_LABEL_SIGNED}
            />
          </div>
        </Container>
      </Section>

      {/* ── 03 The audit pack ─────────────────────────────────── */}
      <Section id="audit-pack" style={{ scrollMarginTop: '64px' }}>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-x-16 md:gap-x-24 gap-y-10 items-start">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <PaneLabel n="03" title="The audit pack" />
              <Heading2>The pack an auditor receives.</Heading2>
              <Body>
                An audit pack gathers receipts by framework, period or system into one signed document.
                This one holds a single receipt, and it carries the hash you just verified:
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: 'var(--ink)' }}> sha256 {S.fingerprint}</span>.
              </Body>
              <ul className="list-none m-0 p-0" style={{ borderTop: '1px solid var(--ink)' }}>
                {DOWNLOADS.map((d) => (
                  <li key={d.href} style={{ borderBottom: '1px solid var(--rule)', padding: '0.875rem 0' }}>
                    <a href={d.href} download style={{ fontSize: '17px', fontWeight: 500 }}>
                      {d.title}
                    </a>
                    <span style={{ ...LABEL_STYLE, display: 'block', marginTop: '0.25rem', color: 'var(--ink-3)' }}>
                      {d.meta.join(' · ')}
                    </span>
                    <Body variant="small" style={{ marginTop: '0.25rem' }}>
                      {d.note}
                    </Body>
                  </li>
                ))}
              </ul>
              <Body variant="small">
                This sample was signed once for this website on {S.signedAt.slice(0, 10)}, which is why its
                signed_at is later than the time it records. In a live tenant a receipt is signed as it is
                recorded.
              </Body>
            </div>
            <Reveal>
              <AuditPackSummary />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── What the real thing adds ──────────────────────────── */}
      <Section>
        <Container>
          <Label>Beyond the sample</Label>
          <Heading2 style={{ marginTop: '1rem' }}>What the real thing adds.</Heading2>
          <Body style={{ marginTop: '1.5rem' }}>
            The demo runs on one fictional tenant with one decision. A pilot runs on yours, starting with
            one decision flow you choose.
          </Body>
          <ul
            className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10"
            style={{ marginTop: '3rem' }}
          >
            {REAL_THING.map((r) => (
              <li key={r.title} style={{ borderTop: '1px solid var(--ink)', paddingTop: '1.25rem' }}>
                <h3 style={H3_STYLE}>{r.title}</h3>
                <p className="m-0" style={{ marginTop: '0.75rem', fontSize: '15px', lineHeight: 1.55, color: 'var(--color-text-secondary)' }}>
                  {r.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── Close (the page's one ink band) ───────────────────── */}
      <Section tone="ink">
        <Container>
          <Heading2>Put your own decisions on the record.</Heading2>
          <Body variant="large" style={{ marginTop: '1.5rem' }}>
            A pilot connects one of your AI systems to your own tenant, with your policies and your
            reviewers. Tell us which decision you would most want to replay.
          </Body>
          <ClosingCTAs primary="pilot-only" style={{ marginTop: '2.5rem' }} />
        </Container>
      </Section>
    </>
  );
}
