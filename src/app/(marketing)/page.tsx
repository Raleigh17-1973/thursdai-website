import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Split } from '@/components/layout/Split';
import { Display } from '@/components/typography/Display';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { H1_STYLE, LABEL_STYLE } from '@/components/typography/scale';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { HeroCTAs } from '@/components/ui/HeroCTAs';
import { ClosingCTAs } from '@/components/ui/ClosingCTAs';
import { ReceiptFrame } from '@/components/receipt/ReceiptFrame';
import { SAMPLE_HIRING_RECEIPT, SAMPLE_HIRING_RECEIPT_COMPACT } from '@/components/receipt/sample';
import { AuditPackSummary } from '@/components/receipt/AuditPackSummary';
import { Reveal } from '@/components/motion/Reveal';
import { ProofBand, EU_AI_ACT_URL } from '@/components/home/ProofBand';
import { RECEIPT_TERM, SAMPLE_LABEL_SIGNED } from '@/config/site';
import { HIRING_REPLAY, HIRING_REPLAY_DECISION_INDEX, HIRING_REPLAY_QUESTION } from '@/config/demo-hiring-replay';
import { SAMPLE_DISPLAY as S } from '@/lib/receipts/display';

// The two client islands below the fold load as their own chunks (still server-rendered,
// so nothing shifts); the hero stays a server component.
const TimeTravelScrubber = dynamic(() =>
  import('@/components/demos/TimeTravelScrubber').then((m) => m.TimeTravelScrubber),
);
const PolicyEditor = dynamic(() => import('@/components/demos/PolicyEditor').then((m) => m.PolicyEditor));

// Home: seven beats (plan Item 5). Hero, problem, proof, the receipt once, replay and packs,
// policy as code, close. Everything else lives on its own page, reachable from nav and footer.

const RECORD_RECEIPT_SNIPPET = `from thursdai import ThursdaiClient

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

# The receipt is signed and policy-checked on arrival
print(f"Receipt:  {receipt.id}")
print(f"Signed:   {receipt.signed_at}")
print(f"Checks:   {receipt.compliance_results}")`;

const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

// The four facts beside the receipt (beat 4). Retention is stated as configured, not promised.
const RECEIPT_FACTS: { label: string; body: React.ReactNode }[] = [
  {
    label: 'Captured',
    body: (
      <>
        The decision and the system that made it, the model and its version, every policy that ran
        and its result, the evidence used, the human reviewer and the time to the second.
      </>
    ),
  },
  {
    label: 'Signed',
    body: (
      <>
        Ed25519 over the receipt&apos;s canonical JSON, with a sha256 fingerprint (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: 'var(--ink)' }}>{S.fingerprint}</span>)
        that changes if a single character does.
      </>
    ),
  },
  {
    label: 'Verified',
    body: (
      <>
        Anyone can verify a receipt without an account: recompute the hash and check the signature
        against the public key.{' '}
        <Link href="/demo#receipt" style={UNDERLINED}>
          Verify this one in the demo
        </Link>
        .
      </>
    ),
  },
  {
    label: 'Kept',
    body: (
      <>
        Retention is set per tenant, so you can meet the six month minimum for deployers or keep
        receipts for as long as your own policy or sector rules require.
      </>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────────── */}
      <Section variant="compact">
        <Container>
          <Split
            ratio="60/40"
            alignItems="center"
            gap="xl"
            left={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Display>Every AI decision, on the record.</Display>
                <Body variant="large">
                  Thursdai writes a signed {RECEIPT_TERM} for every decision your AI makes, so your
                  auditors see the answer, the policy and the sources.
                </Body>
                <div style={{ marginTop: '0.5rem' }}>
                  <HeroCTAs />
                </div>
              </div>
            }
            right={<ReceiptFrame {...SAMPLE_HIRING_RECEIPT_COMPACT} signing style={{ marginLeft: 'auto' }} />}
          />
        </Container>
      </Section>

      {/* ── 2. Problem, then what Thursdai is not ────────────── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12">
            <div className="lg:col-span-7">
              {/* The label is the section heading, so the outline reads h1, h2, h3 */}
              <h2 className="m-0" style={LABEL_STYLE}>
                The problem
              </h2>
              <p
                id="problem"
                className="m-0"
                style={{
                  marginTop: '1.5rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, calc(19.33px + 0.74vw), 30px)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.01em',
                  color: 'var(--ink)',
                  textWrap: 'pretty',
                }}
              >
                Your AI already decides who gets an interview, who gets credit and what a policy
                costs. When an auditor asks why, the output is often all there is: not the policy it
                ran under, the sources it used or the person who reviewed it. The EU AI Act puts a
                price on that gap,{' '}
                <a href={EU_AI_ACT_URL} rel="noopener noreferrer" target="_blank" style={UNDERLINED}>
                  fines of up to €15 million or 3% of worldwide turnover
                  <span className="sr-only"> (Article 99, opens in a new tab)</span>
                </a>{' '}
                for deployers of high-risk systems that miss their obligations.
              </p>
            </div>

            <aside
              aria-label="What Thursdai is not"
              className="lg:col-start-9 lg:col-span-4 lg:self-end"
              style={{ borderTop: '1px solid var(--ink)', paddingTop: '1.25rem' }}
            >
              <Label as="p">What Thursdai is not</Label>
              <p
                className="m-0"
                style={{
                  marginTop: '1rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  lineHeight: 1.45,
                  color: 'var(--ink)',
                  textWrap: 'pretty',
                }}
              >
                Thursdai is not a chatbot, not an auditor and not a model. It records what your AI
                systems decided, signs it and makes it provable. If you need a general assistant,
                Copilot is better. A receipt is proof of what happened, not that it was right.
              </p>
            </aside>
          </div>
        </Container>
      </Section>

      {/* ── 3. Proof band: two cells on one rule ─────────────── */}
      <Section variant="flush">
        <Container>
          <ProofBand />
        </Container>
      </Section>

      {/* ── 4. The receipt, once ─────────────────────────────── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 items-start">
            <Reveal className="order-2 lg:order-1 lg:col-span-6">
              <ReceiptFrame {...SAMPLE_HIRING_RECEIPT} style={{ maxWidth: '560px' }} />
            </Reveal>
            <div className="order-1 lg:order-2 lg:col-start-8 lg:col-span-5">
              <Label as="p">The receipt</Label>
              <Heading2 style={{ marginTop: '1rem' }}>One decision, one signed record.</Heading2>
              <dl className="m-0" style={{ marginTop: '2.5rem', borderTop: '1px solid var(--ink)' }}>
                {RECEIPT_FACTS.map((f) => (
                  <div
                    key={f.label}
                    className="grid grid-cols-1 sm:grid-cols-[112px_1fr] gap-x-6 gap-y-1"
                    style={{ padding: '1.25rem 0', borderBottom: '1px solid var(--rule)' }}
                  >
                    <dt style={{ ...LABEL_STYLE, color: 'var(--ink)', paddingTop: '0.3rem' }}>{f.label}</dt>
                    <dd className="m-0" style={{ fontSize: '17px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                      {f.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 5. Replay and packs: the one interactive moment ──── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
            <div className="lg:col-span-7">
              <Label as="p">Replay and audit packs</Label>
              <Heading2 style={{ marginTop: '1rem' }}>Replay any decision as it was.</Heading2>
            </div>
            <Body className="lg:col-span-5 lg:self-end">
              The rubric and the model have both changed since this decision. The receipt has not. Move
              the slider to see what was known at each point, then hand an auditor the signed pack.
            </Body>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" style={{ marginTop: '3rem' }}>
            <div className="lg:col-span-7">
              <TimeTravelScrubber
                question={HIRING_REPLAY_QUESTION}
                questionLabel="Replaying"
                snapshots={HIRING_REPLAY}
                initialIndex={HIRING_REPLAY_DECISION_INDEX}
                sliderLabel="Replay requisition JR-204 at a point in time"
                footnote={SAMPLE_LABEL_SIGNED}
              />
            </div>
            <Reveal className="lg:col-span-5">
              <AuditPackSummary compact />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── 6. Policy as code ────────────────────────────────── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
            <div className="lg:col-span-7">
              <Label as="p">Policy as code</Label>
              <Heading2 style={{ marginTop: '1rem' }}>Write the rules once. Every decision meets them.</Heading2>
            </div>
            <Body className="lg:col-span-5 lg:self-end">
              Policies are versioned files your team reviews like code. Any AI system records its
              decisions with one call, and every receipt names the policy version that checked it.
            </Body>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start" style={{ marginTop: '3rem' }}>
            <PolicyEditor />
            {/* The snippet rides alongside the taller editor so the pair stays read together */}
            <div className="lg:sticky lg:top-24">
              <CodeBlock language="python" filename="record_receipt.py" code={RECORD_RECEIPT_SNIPPET} />
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 7. Close: the page's one ink band ────────────────── */}
      <Section tone="ink">
        <Container>
          <h2 style={H1_STYLE}>Every AI decision, on the record.</h2>
          <Body variant="large" style={{ marginTop: '1.5rem' }}>
            Open the demo to verify a signed receipt and replay the decision behind it, with no login.
            A pilot connects one of your own AI systems to your own tenant, starting with one decision
            flow you choose.
          </Body>
          <ClosingCTAs primary="demo" style={{ marginTop: '2.5rem' }} />
        </Container>
      </Section>
    </>
  );
}
