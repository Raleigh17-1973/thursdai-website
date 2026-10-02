import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import { Split } from '@/components/layout/Split';
import { Display } from '@/components/typography/Display';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { H3_STYLE, LABEL_STYLE } from '@/components/typography/scale';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { ReceiptFrame } from '@/components/receipt/ReceiptFrame';
import { SAMPLE_HIRING_RECEIPT } from '@/components/receipt/sample';
import { TimeTravelScrubber } from '@/components/demos/TimeTravelScrubber';
import { PolicyEditor } from '@/components/demos/PolicyEditor';
import { ExecutiveDashboard } from '@/components/demos/ExecutiveDashboard';
import { HeroCTAs } from '@/components/ui/HeroCTAs';
import { CertBadge } from '@/components/content/CertBadge';
import { ClosingCTAs } from '@/components/ui/ClosingCTAs';
import { HowItWorksSteps } from '@/components/ui/HowItWorksSteps';


// ── Cert badges data ──────────────────────────────────────────

const CERT_BADGES = [
  { name: 'SOC 2 Type II', status: 'in-progress' as const, href: '/trust#certifications' },
  { name: 'ISO 27001', status: 'in-progress' as const, href: '/trust#certifications' },
  { name: 'ISO 42001', status: 'in-progress' as const, href: '/trust#certifications' },
  { name: 'HIPAA-eligible Architecture', status: 'ready' as const, href: '/trust#certifications' },
  { name: 'EU AI Act Annex III', status: 'ready' as const, href: '/trust/annex-iii' },
  { name: 'FedRAMP Moderate', status: 'in-progress' as const, href: '/trust#certifications' },
];

// ── invoke_role code snippet ───────────────────────────────────

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

# The receipt is signed and compliance-checked immediately
print(f"Receipt:  {receipt.id}")
print(f"Signed:   {receipt.signed_at}")
print(f"Checks:   {receipt.compliance_results}")`;

// ── Shared inline styles ─────────────────────────────────────

const MONO_SMALL: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '12px',
  lineHeight: 1.5,
  letterSpacing: '0.04em',
  color: 'var(--color-text-secondary)',
};

const FRAME: React.CSSProperties = {
  border: '1px solid var(--color-border-default)',
  borderRadius: '2px',
  background: 'var(--color-surface-primary)',
};

const INLINE_LINK: React.CSSProperties = { fontSize: '17px', fontWeight: 500 };

// ── Page ───────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── Section 1: Hero ──────────────────────────────────── */}
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
                  Thursdai is AI governance infrastructure that writes an AI Receipt for every
                  decision your AI makes: the answer, the roles, the policies and the sources.
                  Audit-ready evidence, not bolted on after.
                </Body>
                <div style={{ marginTop: '0.5rem' }}>
                  <HeroCTAs />
                </div>
                <ul
                  className="list-none m-0 p-0"
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.5rem', marginTop: '0.5rem' }}
                >
                  {[
                    '✓ A receipt for every decision',
                    '✓ Audit-ready evidence',
                    '✓ EU AI Act ready',
                  ].map((item) => (
                    <li key={item} style={LABEL_STYLE}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            }
            right={<ReceiptFrame {...SAMPLE_HIRING_RECEIPT} style={{ marginLeft: 'auto' }} />}
          />
        </Container>
      </Section>

      {/* ── Trust band ───────────────────────────────────────── */}
      <Container>
        <div
          style={{
            borderTop: '1px solid var(--color-border-default)',
            borderBottom: '1px solid var(--color-border-default)',
            padding: '1.25rem 0',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem 2rem',
            alignItems: 'baseline',
          }}
        >
          <span style={LABEL_STYLE}>Trusted by compliance teams in</span>
          {[
            'Financial Services',
            'Healthcare & Life Sciences',
            'Human Resources & Workforce',
            'Legal & Professional Services',
            'Insurance',
            'Government Contracting',
          ].map((industry) => (
            <span
              key={industry}
              style={{ fontSize: '15px', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}
            >
              {industry}
            </span>
          ))}
        </div>
      </Container>

      {/* ── AI Receipts ──────────────────────────────────────── */}
      <Section>
        <Container>
          <Label>AI Receipts</Label>
          <Heading2 style={{ marginTop: '1rem' }}>A signed record for every AI decision.</Heading2>
          <Body variant="large" style={{ marginTop: '1.5rem' }}>
            Every time an AI system in your business makes a decision, Thursdai captures it as a signed AI Receipt: the source system, the model, the policies that applied, the sources cited and a tamper-evident signature, written at the moment it occurs, never reconstructed after the fact.
          </Body>

          <ul
            className="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
            style={{ marginTop: '4rem' }}
          >
            {[
              {
                title: 'Tamper-evident signature',
                body: 'Every receipt is anchored in a tamper-evident Merkle chain at the moment it occurs. The record cannot be altered or backdated.',
              },
              {
                title: 'Policy compliance status',
                body: 'Each receipt records which of your policies ran against the decision and whether they passed or flagged.',
              },
              {
                title: 'Bundled into compliance packs',
                body: 'Group receipts by framework, time window or AI system and export them as signed evidence for auditors and regulators.',
              },
            ].map(({ title, body }) => (
              <li
                key={title}
                style={{
                  borderTop: '1px solid var(--color-text-primary)',
                  paddingTop: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <span style={LABEL_STYLE}>✓ Included</span>
                <h3 style={H3_STYLE}>{title}</h3>
                <p className="m-0" style={{ fontSize: '17px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                  {body}
                </p>
              </li>
            ))}
          </ul>

          <p className="m-0" style={{ marginTop: '3rem' }}>
            <Link href="/product/ai-receipts" style={INLINE_LINK}>
              See AI Receipts in depth →
            </Link>
          </p>
          <Body variant="small" style={{ marginTop: '0.5rem' }}>
            or <a href="#request-demo">book a live walk-through →</a>
          </Body>
        </Container>
      </Section>

      {/* ── How it works ──────────────────────────────────────── */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Label>How it works</Label>
            <Heading2 style={{ marginTop: '1rem' }}>Three steps. One trusted answer.</Heading2>
          </div>
          <HowItWorksSteps />
        </Container>
      </Section>

      {/* ── Investigation bridge ─────────────────────────────── */}
      <Section>
        <Container>
          <Split
            ratio="50/50"
            alignItems="center"
            gap="xl"
            left={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Label>Decision Intelligence</Label>
                <Heading2>Ask questions of your entire decision record.</Heading2>
                <Body>
                  Every receipt Thursdai captures becomes part of a queryable record. Use Thursdai&apos;s agents to investigate patterns, surface anomalies and answer regulators, in plain language, with the receipts as evidence.
                </Body>
                <Body>
                  The more decisions are recorded, the more powerful the investigation. Your receipt history becomes the source of truth your compliance team, legal team and auditors can all query independently.
                </Body>
              </div>
            }
            right={
              <ul className="list-none m-0 p-0" style={{ borderTop: '1px solid var(--color-text-primary)' }}>
                {[
                  'Which AI systems generated the most compliance flags last quarter?',
                  'Show me all hiring decisions where confidence was below 80%.',
                  'Compare override rates across departments for this year.',
                  'Which decisions were flagged by ll144-bias-audit but still followed?',
                ].map((query) => (
                  <li
                    key={query}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '1rem',
                      padding: '1.125rem 0',
                      borderBottom: '1px solid var(--color-border-default)',
                    }}
                  >
                    <span aria-hidden="true" style={{ ...MONO_SMALL, color: 'var(--color-text-primary)' }}>›</span>
                    <span style={{ fontSize: '17px', color: 'var(--color-text-primary)', lineHeight: 1.5 }}>{query}</span>
                  </li>
                ))}
              </ul>
            }
          />
        </Container>
      </Section>

      {/* ── Solutions / People + executive dashboard ─────────── */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center' }}>
            <Label>Solutions</Label>
            <Heading2 style={{ marginTop: '1rem' }}>Put it to work where the stakes are highest.</Heading2>
            <Body style={{ maxWidth: '640px', margin: '1.5rem auto 3rem' }}>
              The People space governs hiring and workforce AI: bias-audit evidence, an AI system
              register and a compliance pack for every framework an HR team answers to. Leaders see
              it all at a glance.
            </Body>
          </div>
          <ExecutiveDashboard />
          <p className="m-0" style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/solutions/people" style={INLINE_LINK}>
              Explore the People space →
            </Link>
          </p>
        </Container>
      </Section>

      {/* ── Thursdai Agent ───────────────────────────────────── */}
      <Section>
        <Container>
          <Label>Thursdai Agent</Label>
          <Heading2 style={{ marginTop: '1rem' }}>Governed answers for every question your team asks.</Heading2>
          <Body variant="large" style={{ marginTop: '1.5rem', marginBottom: '4rem' }}>
            When your employees use the Thursdai Agent, every answer is grounded in your business&apos;s own knowledge base: your policies, procedures, contracts and guidelines. The agent cannot answer outside what you have approved. Every response is an AI Receipt showing exactly what knowledge was used, which policies applied and what alternatives were considered.
          </Body>

          <Split
            ratio="50/50"
            alignItems="start"
            gap="xl"
            left={
              <div style={{ ...FRAME, border: '1px solid var(--color-text-primary)' }}>
                {/* Question */}
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-text-primary)' }}>
                  <p className="m-0" style={{ ...LABEL_STYLE, marginBottom: '0.5rem' }}>Employee question</p>
                  <p className="m-0" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', lineHeight: 1.35, color: 'var(--color-text-primary)' }}>
                    &ldquo;Can we reject a candidate based on a three-year employment gap?&rdquo;
                  </p>
                </div>

                {/* Internal receipt */}
                <div style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.875rem' }}>
                    <span style={{ ...LABEL_STYLE, color: 'var(--color-text-primary)' }}>AI Receipt: Internal</span>
                    <span style={{ ...LABEL_STYLE, color: 'var(--color-text-primary)' }}>✓ Signed</span>
                  </div>

                  <p className="m-0" style={{ fontSize: '15px', color: 'var(--color-text-primary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    No. Under Fair Hiring Policy §4.2, employment gaps cannot be used as a disqualifying factor without documented evidence of role-relevant impact. Document your reasoning if this affects a decision.
                  </p>

                  <p className="m-0" style={{ ...LABEL_STYLE, marginBottom: '0.375rem' }}>Knowledge consulted</p>
                  {[
                    'Fair Hiring Policy v2.3, §4.2 Employment Gaps',
                    'HR Handbook v3.2, Chapter 7: Screening',
                    'EEOC Guidance 2025, Background Checks',
                  ].map((source) => (
                    <div key={source} style={{ padding: '0.4rem 0', borderTop: '1px solid var(--color-border-default)' }}>
                      <span style={{ ...MONO_SMALL, color: 'var(--color-text-primary)' }}>{source}</span>
                    </div>
                  ))}

                  <p className="m-0" style={{ ...LABEL_STYLE, margin: '1rem 0 0.375rem' }}>Policies applied</p>
                  {[
                    { label: 'fair-hiring-v2', status: 'passed' },
                    { label: 'equal-opportunity-v1', status: 'passed' },
                    { label: 'pii-block', status: 'passed' },
                  ].map(({ label, status }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderTop: '1px solid var(--color-border-default)' }}>
                      <span style={{ ...MONO_SMALL, color: 'var(--color-text-primary)' }}>{label}</span>
                      <span style={MONO_SMALL}>✓ {status}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.5rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-text-primary)' }}>
                    <span style={MONO_SMALL}>Confidence: 94% · Alternatives: 2</span>
                    <span style={MONO_SMALL}>sha256 f3d9…</span>
                  </div>
                </div>
              </div>
            }
            right={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p className="m-0" style={LABEL_STYLE}>More use cases</p>
                {[
                  {
                    team: 'Legal',
                    question: 'Can we share this contract excerpt with a prospective vendor?',
                    answer: 'No. The NDA signed with Acme Corp on 2024-03-15 covers this section under §3.1 (Confidential Business Terms). Sharing requires written consent from your legal team.',
                    knowledge: ['Acme Corp NDA v1, §3.1', 'Data Classification Policy, Tier 2', 'Vendor Engagement Guidelines'],
                  },
                  {
                    team: 'Finance',
                    question: 'What is the approval threshold for this software purchase at $42,000?',
                    answer: 'Purchases between $25,000 and $75,000 require VP-level approval plus a security review. This purchase also triggers a SOC 2 vendor check under your procurement policy.',
                    knowledge: ['Procurement Policy v4, §2.3 Thresholds', 'Security Review Requirements', 'Vendor Risk Framework'],
                  },
                  {
                    team: 'Operations',
                    question: 'Do we need a bias audit before rolling out this screening tool?',
                    answer: 'Yes. Under your AI System Register policy and New York Local Law 144, any AEDT used in hiring requires a bias audit before deployment and annually thereafter.',
                    knowledge: ['AI System Register Policy v1', 'NYC Local Law 144 Compliance Pack', 'HR Technology Approval Process'],
                  },
                ].map(({ team, question, answer, knowledge }) => (
                  <div
                    key={team}
                    style={{ ...FRAME, padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}
                  >
                    <span style={{ ...LABEL_STYLE, color: 'var(--color-text-primary)' }}>{team}</span>
                    <p className="m-0" style={{ fontFamily: 'var(--font-display)', fontSize: '18px', lineHeight: 1.4, color: 'var(--color-text-primary)' }}>
                      &ldquo;{question}&rdquo;
                    </p>
                    <p className="m-0" style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>{answer}</p>
                    <div style={{ borderTop: '1px solid var(--color-border-default)', paddingTop: '0.625rem' }}>
                      <p className="m-0" style={{ ...LABEL_STYLE, marginBottom: '0.25rem' }}>Knowledge consulted</p>
                      {knowledge.map((k) => (
                        <p key={k} className="m-0" style={MONO_SMALL}>· {k}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            }
          />
        </Container>
      </Section>

      {/* ── How we compare ────────────────────────────────────── */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Label>HOW WE COMPARE</Label>
            <Heading2 style={{ marginTop: '1rem' }}>Most AI tools weren&apos;t built for accountability.</Heading2>
            <Body style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
              Thursdai is the only platform purpose-built for enterprises where AI decisions need to be explained, audited and traced.
            </Body>
          </div>
          <Grid cols={3} gap="md">
            {[
              {
                competitor: 'Microsoft Copilot',
                theyGive: 'AI embedded in Office 365: excellent for drafting and writing',
                thursdaiAdds: 'The audit trail, policy enforcement and decision replay that Copilot cannot provide',
                keyDifference: 'No policy layer. No moderation. No audit trail.',
                href: '/compare/microsoft-copilot',
              },
              {
                competitor: 'ChatGPT Enterprise',
                theyGive: 'A private, powerful instance of the world\'s best language model',
                thursdaiAdds: 'The governance layer: role-based deliberation, hard-constraint policies and replayable decisions',
                keyDifference: 'No governance. No roles. No replay.',
                href: '/compare/chatgpt-enterprise',
              },
              {
                competitor: 'Glean',
                theyGive: 'Best-in-class enterprise search: finds the document that says X',
                thursdaiAdds: 'The decision layer: given our policies and our knowledge, what should we do about X (with proof)',
                keyDifference: 'Knowledge retrieval only. No decisions, no compliance.',
                href: '/compare/glean',
              },
            ].map(({ competitor, theyGive, thursdaiAdds, keyDifference, href }) => (
              <div
                key={competitor}
                style={{ ...FRAME, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              >
                <h3 style={H3_STYLE}>{competitor}</h3>
                <div>
                  <Label style={{ marginBottom: '0.375rem' }}>They give you</Label>
                  <Body variant="small">{theyGive}</Body>
                </div>
                <div>
                  <Label style={{ marginBottom: '0.375rem', color: 'var(--color-text-primary)' }}>Thursdai adds</Label>
                  <Body variant="small" style={{ color: 'var(--color-text-primary)' }}>{thursdaiAdds}</Body>
                </div>
                <p
                  className="m-0"
                  style={{
                    borderTop: '1px solid var(--color-border-default)',
                    paddingTop: '1rem',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {keyDifference}
                </p>
                <Link href={href} style={{ fontSize: '15px', marginTop: 'auto' }}>
                  Full comparison →
                </Link>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ── Time-Travel ──────────────────────────────────────── */}
      <Section id="replay-demo">
        <Container>
          <Split
            ratio="50/50"
            alignItems="center"
            gap="xl"
            left={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Label>Time-Travel</Label>
                <Heading2>Every AI decision, period-accurate.</Heading2>
                <Body>
                  Thursdai records every agent decision with the knowledge base, policies and role
                  definitions that were active at the time. Move the slider to any point in the
                  past: see the answer that would have been given then, and what has changed since.
                </Body>
                <Link href="/product/time-travel" style={INLINE_LINK}>
                  See Time-Travel in depth →
                </Link>
              </div>
            }
            right={<TimeTravelScrubber />}
          />
        </Container>
      </Section>

      {/* ── Policy-as-Code ───────────────────────────────────── */}
      <Section>
        <Container>
          <Split
            ratio="50/50"
            alignItems="start"
            gap="xl"
            left={<PolicyEditor />}
            right={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Label>Policy-as-Code</Label>
                <Heading2>Rules your AI must follow. No exceptions.</Heading2>
                <Body>
                  Tell Thursdai what your AI is and isn&apos;t allowed to do. It will enforce those rules on every answer, automatically. Block sensitive information from leaking. Require sources on any claim. Prevent the AI from quoting below your contract minimums. Works out of the box; full customisation available for technical teams.
                </Body>
                <Body>Three policy primitives:</Body>
                <ul
                  className="list-none m-0 p-0"
                  style={{ borderTop: '1px solid var(--color-border-default)' }}
                >
                  {[
                    ['allowed_sources', 'restrict citations to approved knowledge sources'],
                    ['required_attribution', 'mandate source citation on specified claim types'],
                    ['pricing_floor', 'prevent the system from quoting below contract minimums'],
                  ].map(([name, desc]) => (
                    <li
                      key={name}
                      style={{
                        padding: '0.75rem 0',
                        borderBottom: '1px solid var(--color-border-default)',
                        fontSize: '17px',
                        lineHeight: 1.6,
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 400, fontSize: '15px' }}>
                        {name}
                      </strong>
                      {': '}
                      {desc}
                    </li>
                  ))}
                </ul>
                <Link href="/product/policy-as-code" style={INLINE_LINK}>
                  Read the policy language spec →
                </Link>
              </div>
            }
          />
        </Container>
      </Section>

      {/* ── Security & compliance ─────────────────────────────── */}
      <Section variant="compact">
        <Container>
          <p className="m-0" style={{ ...LABEL_STYLE, textAlign: 'center', marginBottom: '1.5rem' }}>
            Security &amp; compliance
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.75rem',
              alignItems: 'center',
            }}
          >
            {CERT_BADGES.map((badge) => (
              <CertBadge key={badge.name} {...badge} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Developers band ──────────────────────────────────── */}
      <Section>
        <Container>
          <Split
            ratio="50/50"
            alignItems="center"
            gap="xl"
            left={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Label>Developers</Label>
                <Heading2>Any AI system. One call. A signed receipt.</Heading2>
                <Body>
                  Wherever a decision happens in your stack, whether your own model, a vendor&apos;s agent or a third-party tool, record it to Thursdai with a single API call. The receipt is signed, compliance-checked and stored against your tenant the moment it lands.
                </Body>
                <Link href="/developers" style={INLINE_LINK}>
                  Explore the developer surface →
                </Link>
              </div>
            }
            right={
              <CodeBlock
                language="python"
                filename="record_receipt.py"
                code={RECORD_RECEIPT_SNIPPET}
              />
            }
          />
        </Container>
      </Section>

      {/* ── Closing CTA band (the page's one ink surface) ───────── */}
      <Section tone="ink" style={{ textAlign: 'center' }}>
        <Container>
          <Heading2>Ready to use AI you can actually trust?</Heading2>
          <Body variant="large" style={{ maxWidth: '520px', margin: '1.5rem auto 2.5rem' }}>
            Try the replay demo (no login required) or talk to us about a pilot.
          </Body>
          <ClosingCTAs />
        </Container>
      </Section>
    </>
  );
}
