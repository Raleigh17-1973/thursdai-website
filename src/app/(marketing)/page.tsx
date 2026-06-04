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
import { CodeBlock } from '@/components/ui/CodeBlock';
import { AiReceiptCard } from '@/components/demos/AiReceiptCard';
import { TimeTravelScrubber } from '@/components/demos/TimeTravelScrubber';
import { PolicyEditor } from '@/components/demos/PolicyEditor';
import { ExecutiveDashboard } from '@/components/demos/ExecutiveDashboard';
import { HeroCTAs } from '@/components/ui/HeroCTAs';
import { CertBadge } from '@/components/content/CertBadge';
import { ClosingCTAs } from '@/components/ui/ClosingCTAs';
import { HowItWorksSteps } from '@/components/ui/HowItWorksSteps';


// ── Cert badges data ──────────────────────────────────────────

const CERT_BADGES = [
  { name: 'SOC 2 Type II', status: 'in-progress' as const, href: '/trust/certifications#soc2', ariaLabel: 'SOC 2 Type II planned' },
  { name: 'ISO 27001', status: 'in-progress' as const, href: '/trust/certifications#iso27001', ariaLabel: 'ISO 27001 planned' },
  { name: 'ISO 42001', status: 'in-progress' as const, href: '/trust/certifications#iso42001', ariaLabel: 'ISO 42001 planned' },
  { name: 'HIPAA-eligible Architecture', status: 'ready' as const, href: '/trust/certifications#hipaa', ariaLabel: 'HIPAA-eligible Architecture' },
  { name: 'EU AI Act Annex III', status: 'ready' as const, href: '/trust/annex-iii', ariaLabel: 'EU AI Act Annex III ready' },
  { name: 'FedRAMP Moderate', status: 'in-progress' as const, href: '/trust/certifications#fedramp', ariaLabel: 'FedRAMP Moderate planned' },
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

// ── Inline SVG icons ─────────────────────────────────────────

// ── ScrollCue — pure CSS animation, no client needed ──────────

function ScrollCue() {
  return (
    <div
      aria-hidden="true"
      className="hidden md:flex"
      style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'scrollCueBounce 2s ease-in-out infinite',
        color: 'var(--color-text-tertiary)',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <polyline
          points="6 9 12 15 18 9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── Section 1: Hero ──────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          paddingTop: '6rem',
          paddingBottom: '4rem',
          background: 'var(--color-bg)',
        }}
      >
        {/* Dawn horizon backdrop — "a new day for regulated AI" (theme-aware, see .hero-dawn in globals.css) */}
        <div aria-hidden="true" className="hero-dawn">
          <div className="hero-dawn__sky" />
          <div className="hero-dawn__sun" />
        </div>
        <Container className="relative z-[1]">
          <Split
            ratio="60/40"
            alignItems="start"
            gap="xl"
            left={
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  position: 'relative',
                }}
              >
                <Display>
                  Every AI decision, <span className="dawn-gradient-text">on the record.</span>
                </Display>
                <Body variant="large">
                  Thursdai is AI governance infrastructure that writes an AI Receipt for every
                  decision your AI makes: the answer, the roles, the policies and the sources.
                  Audit-ready evidence, not bolted on after.
                </Body>
                <HeroCTAs />
                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.5rem',
                  justifyContent: 'center', alignItems: 'center',
                  marginTop: '1.5rem',
                  fontSize: '12px', fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                }}>
                  {[
                    '✓ A receipt for every decision',
                    '✓ Audit-ready evidence',
                    '✓ EU AI Act ready',
                  ].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            }
            right={<AiReceiptCard />}
          />
        </Container>
        <ScrollCue />
      </section>

      {/* ── Trust band ───────────────────────────────────────── */}
      <div style={{
        borderTop: '1px solid var(--color-border-default)',
        borderBottom: '1px solid var(--color-border-default)',
        padding: '1.25rem 0',
      }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.5rem 2rem',
          justifyContent: 'center', alignItems: 'center',
          padding: '0 1.5rem',
        }}>
          <span style={{
            fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em',
            color: 'var(--color-text-secondary)', whiteSpace: 'nowrap',
          }}>
            Trusted by compliance teams in
          </span>
          {[
            'Financial Services',
            'Healthcare & Life Sciences',
            'Human Resources & Workforce',
            'Legal & Professional Services',
            'Insurance',
            'Government Contracting',
          ].map((industry) => (
            <span key={industry} style={{
              fontSize: '13px', fontWeight: 600,
              color: 'var(--color-text-tertiary)',
              opacity: 0.7,
              whiteSpace: 'nowrap',
            }}>
              {industry}
            </span>
          ))}
        </div>
      </div>

      {/* ── AI Receipts ──────────────────────────────────────── */}
      <section style={{ background: '#0b0f19', color: '#e4e4e7', padding: '6rem 0' }}>
        <Container>
          <Label style={{ color: '#8b9ef0' }}>AI Receipts</Label>
          <Heading2 style={{ color: '#e4e4e7', marginTop: '0.75rem' }}>
            <span className="font-display">A signed record for every AI decision.</span>
          </Heading2>
          <Body
            variant="large"
            style={{ color: '#a1a1aa', marginTop: '1rem' }}
          >
            Every time an AI system in your business makes a decision, Thursdai captures it as a signed AI Receipt: the source system, the model, the policies that applied, the sources cited and a tamper-evident signature, written at the moment it occurs, never reconstructed after the fact.
          </Body>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginTop: '3rem',
          }}>
            {[
              {
                title: 'Tamper-evident signature',
                body: 'Every receipt is sha256-signed at the moment of decision. The record cannot be altered or backdated.',
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
              <div
                key={title}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#8b9ef0', letterSpacing: '0.04em', textTransform: 'uppercase' }}>✓ Included</span>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#e4e4e7', margin: 0 }}>{title}</p>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#a1a1aa', margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <Link href="/product/ai-receipts" style={{ color: '#8b9ef0', fontSize: '15px', fontWeight: 600 }}>
              See AI Receipts in depth →
            </Link>
          </div>
          <Body variant="small" style={{ color: 'rgba(161,161,170,0.9)', marginTop: '0.5rem' }}>
            or <a href="#request-demo" style={{ color: '#8b9ef0' }}>book a live walk-through →</a>
          </Body>
        </Container>
      </section>

      {/* ── How it works ──────────────────────────────────────── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Label>How it works</Label>
            <Heading2 style={{ marginTop: '0.5rem' }}><span className="font-display">Three steps. One trusted answer.</span></Heading2>
          </div>
          <HowItWorksSteps />
        </Container>
      </Section>

      {/* ── Investigation bridge ─────────────────────────────── */}
      <Section variant="default">
        <Container>
          <Split
            ratio="50/50"
            alignItems="center"
            gap="xl"
            left={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <Label>Decision Intelligence</Label>
                <Heading2>
                  <span className="font-display">Ask questions of your entire decision record.</span>
                </Heading2>
                <Body>
                  Every receipt Thursdai captures becomes part of a queryable record. Use Thursdai&apos;s agents to investigate patterns, surface anomalies and answer regulators, in plain language, with the receipts as evidence.
                </Body>
                <Body style={{ color: 'var(--color-text-secondary)' }}>
                  The more decisions are recorded, the more powerful the investigation. Your receipt history becomes the source of truth your compliance team, legal team and auditors can all query independently.
                </Body>
              </div>
            }
            right={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Which AI systems generated the most compliance flags last quarter?',
                  'Show me all hiring decisions where confidence was below 80%.',
                  'Compare override rates across departments for this year.',
                  'Which decisions were flagged by ll144-bias-audit but still followed?',
                ].map((query) => (
                  <div
                    key={query}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.875rem 1rem',
                      background: 'var(--color-surface-secondary)',
                      border: '1px solid var(--color-border-default)',
                      borderRadius: '10px',
                    }}
                  >
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--color-accent)',
                      fontFamily: 'var(--font-mono, monospace)',
                      flexShrink: 0,
                      marginTop: '1px',
                    }}>›</span>
                    <span style={{
                      fontSize: '14px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.5,
                    }}>{query}</span>
                  </div>
                ))}
              </div>
            }
          />
        </Container>
      </Section>

      {/* ── Solutions / People + executive dashboard ─────────── */}
      <Section variant="default" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Label style={{ textAlign: 'center', display: 'block', marginBottom: '0.5rem' }}>
            Solutions
          </Label>
          <Heading2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span className="font-display">Put it to work where the stakes are highest.</span>
          </Heading2>
          <Body
            style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem', color: 'var(--color-text-secondary)' }}
          >
            The People space governs hiring and workforce AI: bias-audit evidence, an AI system
            register and a compliance pack for every framework an HR team answers to. Leaders see
            it all at a glance.
          </Body>
          <ExecutiveDashboard />
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/solutions/people" style={{ color: 'var(--color-accent)', fontSize: '15px', fontWeight: 600 }}>
              Explore the People space →
            </Link>
          </p>
        </Container>
      </Section>

      {/* ── Thursdai Agent ───────────────────────────────────── */}
      <section style={{ background: '#0b0f19', color: '#e4e4e7', padding: '6rem 0' }}>
        <Container>
          <Label style={{ color: '#8b9ef0' }}>Thursdai Agent</Label>
          <Heading2 style={{ color: '#e4e4e7', marginTop: '0.75rem', marginBottom: '1rem' }}>
            <span className="font-display">Governed answers for every question your team asks.</span>
          </Heading2>
          <Body variant="large" style={{ color: '#a1a1aa', marginBottom: '3rem' }}>
            When your employees use the Thursdai Agent, every answer is grounded in your business&apos;s own knowledge base: your policies, procedures, contracts and guidelines. The agent cannot answer outside what you have approved. Every response is an AI Receipt showing exactly what knowledge was used, which policies applied and what alternatives were considered.
          </Body>

          {/* Split: example agent session left, use cases right */}
          <Split
            ratio="50/50"
            alignItems="start"
            gap="xl"
            left={
              <div>
                {/* Example agent session */}
                <div style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                }}>
                  {/* Question bubble */}
                  <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8b9ef0', margin: '0 0 0.5rem' }}>Employee question</p>
                    <p style={{ fontSize: '14px', color: '#e4e4e7', margin: 0, lineHeight: 1.5 }}>
                      &ldquo;Can we reject a candidate based on a three-year employment gap?&rdquo;
                    </p>
                  </div>

                  {/* Internal receipt */}
                  <div style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8b9ef0' }}>AI Receipt — Internal</span>
                      <span style={{ fontSize: '10px', fontWeight: 600, color: '#8b9ef0' }}>✓ Signed</span>
                    </div>

                    <p style={{ fontSize: '13px', color: '#e4e4e7', lineHeight: 1.5, margin: '0 0 1rem', fontWeight: 500 }}>
                      No. Under Fair Hiring Policy §4.2, employment gaps cannot be used as a disqualifying factor without documented evidence of role-relevant impact. Document your reasoning if this affects a decision.
                    </p>

                    {/* Knowledge used */}
                    <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#71717a', margin: '0 0 0.4rem' }}>Knowledge consulted</p>
                    {[
                      'Fair Hiring Policy v2.3 — §4.2 Employment Gaps',
                      'HR Handbook v3.2 — Chapter 7: Screening',
                      'EEOC Guidance 2025 — Background Checks',
                    ].map((source) => (
                      <div key={source} style={{ display: 'flex', gap: '0.5rem', padding: '0.3rem 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <span style={{ fontSize: '10px', color: '#8b9ef0', flexShrink: 0 }}>·</span>
                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono,monospace)', color: '#a1a1aa' }}>{source}</span>
                      </div>
                    ))}

                    {/* Policies applied */}
                    <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#71717a', margin: '0.75rem 0 0.4rem' }}>Policies applied</p>
                    {[
                      { label: 'fair-hiring-v2', status: 'passed' },
                      { label: 'equal-opportunity-v1', status: 'passed' },
                      { label: 'pii-block', status: 'passed' },
                    ].map(({ label, status }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono,monospace)', color: '#a1a1aa' }}>{label}</span>
                        <span style={{ fontSize: '10px', fontWeight: 600, color: '#8b9ef0' }}>✓ {status}</span>
                      </div>
                    ))}

                    {/* Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.875rem', paddingTop: '0.625rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>Confidence: 94% · Alternatives: 2</span>
                      <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono,monospace)', color: '#52525b' }}>sha256 f3d9…</span>
                    </div>
                  </div>
                </div>
              </div>
            }
            right={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#8b9ef0', margin: 0 }}>More use cases</p>
                {[
                  {
                    team: 'Legal',
                    question: 'Can we share this contract excerpt with a prospective vendor?',
                    answer: 'No. The NDA signed with Acme Corp on 2024-03-15 covers this section under §3.1 (Confidential Business Terms). Sharing requires written consent from your legal team.',
                    knowledge: ['Acme Corp NDA v1 — §3.1', 'Data Classification Policy — Tier 2', 'Vendor Engagement Guidelines'],
                  },
                  {
                    team: 'Finance',
                    question: 'What is the approval threshold for this software purchase at $42,000?',
                    answer: 'Purchases between $25,000 and $75,000 require VP-level approval plus a security review. This purchase also triggers a SOC 2 vendor check under your procurement policy.',
                    knowledge: ['Procurement Policy v4 — §2.3 Thresholds', 'Security Review Requirements', 'Vendor Risk Framework'],
                  },
                  {
                    team: 'Operations',
                    question: 'Do we need a bias audit before rolling out this screening tool?',
                    answer: 'Yes. Under your AI System Register policy and New York Local Law 144, any AEDT used in hiring requires a bias audit before deployment and annually thereafter.',
                    knowledge: ['AI System Register Policy v1', 'NYC Local Law 144 Compliance Pack', 'HR Technology Approval Process'],
                  },
                ].map(({ team, question, answer, knowledge }) => (
                  <div key={team} style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '1rem 1.125rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.625rem',
                  }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8b9ef0' }}>{team}</span>
                    <p style={{ fontSize: '13px', color: '#c4c4cf', margin: 0, fontStyle: 'italic' }}>&ldquo;{question}&rdquo;</p>
                    <p style={{ fontSize: '12px', color: '#a1a1aa', margin: 0, lineHeight: 1.5 }}>{answer}</p>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem' }}>
                      <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#52525b', margin: '0 0 0.3rem' }}>Knowledge consulted</p>
                      {knowledge.map((k) => (
                        <p key={k} style={{ fontSize: '10px', fontFamily: 'var(--font-mono,monospace)', color: '#71717a', margin: '0.1rem 0' }}>· {k}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            }
          />
        </Container>
      </section>

      {/* ── How we compare ────────────────────────────────────── */}
      <Section variant="compact">
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <Label>HOW WE COMPARE</Label>
            <Heading2 style={{ marginTop: '0.5rem' }}><span className="font-display">Most AI tools weren&apos;t built for accountability.</span></Heading2>
            <Body style={{ marginTop: '0.75rem', color: 'var(--color-text-secondary)', maxWidth: '640px', margin: '0.75rem auto 0' }}>
              Thursdai is the only platform purpose-built for enterprises where AI decisions need to be explained, audited and traced.
            </Body>
          </div>
          <Grid cols={3} gap="lg">
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
                className="hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border, rgba(255,255,255,0.08))',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
                }}
              >
                <Body style={{ fontWeight: 600 }}>{competitor}</Body>
                <div>
                  <Label style={{ fontSize: '10px', marginBottom: '0.25rem' }}>They give you</Label>
                  <Body variant="small" style={{ color: 'var(--color-text-secondary)' }}>{theyGive}</Body>
                </div>
                <div>
                  <Label style={{ fontSize: '10px', marginBottom: '0.25rem', color: 'var(--color-accent)' }}>Thursdai adds</Label>
                  <Body variant="small">{thursdaiAdds}</Body>
                </div>
                <div style={{
                  borderTop: '1px solid var(--color-border-default)',
                  paddingTop: '0.75rem',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--color-text-tertiary)',
                  letterSpacing: '0.02em',
                }}>
                  {keyDifference}
                </div>
                <a href={href} style={{ fontSize: '13px', color: 'var(--color-accent)', marginTop: 'auto', textDecoration: 'none' }}>
                  Full comparison →
                </a>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ── Time-Travel ──────────────────────────────────────── */}
      <Section variant="default" id="replay-demo" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Split
            ratio="50/50"
            alignItems="center"
            gap="xl"
            left={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <Label>Time-Travel</Label>
                <Heading2>Every AI decision, period-accurate.</Heading2>
                <Body>
                  Thursdai records every agent decision with the knowledge base, policies and role
                  definitions that were active at the time. Move the slider to any point in the
                  past: see the answer that would have been given then, and what has changed since.
                </Body>
                <Link
                  href="/product/time-travel"
                  style={{ color: 'var(--color-accent)', fontSize: '15px', fontWeight: 600 }}
                >
                  See Time-Travel in depth →
                </Link>
              </div>
            }
            right={<TimeTravelScrubber />}
          />
        </Container>
      </Section>

      {/* ── Policy-as-Code ───────────────────────────────────── */}
      <Section variant="default">
        <Container>
          <Split
            ratio="50/50"
            alignItems="start"
            gap="xl"
            left={<PolicyEditor />}
            right={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <Label>Policy-as-Code</Label>
                <Heading2>Rules your AI must follow. No exceptions.</Heading2>
                <Body>
                  Tell Thursdai what your AI is and isn&apos;t allowed to do. It will enforce those rules on every answer, automatically. Block sensitive information from leaking. Require sources on any claim. Prevent the AI from quoting below your contract minimums. Works out of the box; full customisation available for technical teams.
                </Body>
                <Body>Three policy primitives:</Body>
                <ul
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '17px',
                    lineHeight: 1.6,
                    paddingLeft: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <li>
                    <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                      allowed_sources
                    </strong>{': '}
                    restrict citations to approved knowledge sources
                  </li>
                  <li>
                    <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                      required_attribution
                    </strong>{': '}
                    mandate source citation on specified claim types
                  </li>
                  <li>
                    <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                      pricing_floor
                    </strong>{': '}
                    prevent the system from quoting below contract minimums
                  </li>
                </ul>
                <Link
                  href="/product/policy-as-code"
                  style={{ color: 'var(--color-accent)', fontSize: '15px', fontWeight: 600 }}
                >
                  Read the policy language spec →
                </Link>
              </div>
            }
          />
        </Container>
      </Section>

      {/* ── Security & compliance ─────────────────────────────── */}
      <Section
        variant="compact"
        style={{
          background: 'var(--color-surface-secondary)',
          borderTop: '1px solid var(--color-border-default)',
          borderBottom: '1px solid var(--color-border-default)',
        }}
      >
        <Container>
          <p
            style={{
              textAlign: 'center',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-text-tertiary)',
              marginBottom: '1.5rem',
            }}
          >
            Security &amp; compliance
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
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
      <section style={{ background: '#0b0f19', color: '#e4e4e7', padding: '5rem 0' }}>
        <Container>
          <Split
            ratio="50/50"
            alignItems="center"
            gap="xl"
            left={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <Label style={{ color: '#8b9ef0' }}>Developers</Label>
                <Heading2 style={{ color: '#e4e4e7' }}>
                  <span className="font-display">Any AI system. One call. A signed receipt.</span>
                </Heading2>
                <Body style={{ color: '#a1a1aa' }}>
                  Wherever a decision happens in your stack, whether your own model, a vendor&apos;s agent or a third-party tool, record it to Thursdai with a single API call. The receipt is signed, compliance-checked and stored against your tenant the moment it lands.
                </Body>
                <Link href="/developers" style={{ color: '#8b9ef0', fontSize: '15px', fontWeight: 600 }}>
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
      </section>

      {/* ── Section 10: Closing CTA band ─────────────────────── */}
      <section
        style={{
          background: '#0a0a0e',
          padding: '5rem 0',
          textAlign: 'center',
        }}
      >
        <Container>
          <Heading2 style={{ marginBottom: '1rem' }}>
            <span
              className="font-display"
              style={{
                background: 'linear-gradient(135deg, #8b9ef0 0%, #c084fc 50%, #e8a34a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ready to use AI you can actually trust?
            </span>
          </Heading2>
          <Body
            variant="large"
            style={{
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '500px',
              margin: '0 auto 2rem',
            }}
          >
            Try the replay demo (no login required) or talk to us about a pilot.
          </Body>
          <ClosingCTAs />
        </Container>
      </section>
    </>
  );
}
