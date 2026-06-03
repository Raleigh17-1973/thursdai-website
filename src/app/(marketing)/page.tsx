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
import { Card } from '@/components/ui/Card';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { AiReceiptCard } from '@/components/demos/AiReceiptCard';
import { ModeratorPanel } from '@/components/demos/ModeratorPanel';
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

const INVOKE_ROLE_SNIPPET = `from thursdai import ThursdaiClient

client = ThursdaiClient(api_key="thy_live_...")

# Route a question through three roles
result = client.invoke_role(
    question="Should we deploy GPT-4o to tier-1 clients?",
    roles=["legal", "finance", "engineering"],
    tenant_id="acme-financial",
    policy_set="production-v2",
)

# Access role-specific answers
for role in result.panel:
    print(f"{role.name}: {role.answer}")
    print(f"  Sources: {[s.name for s in role.sources]}")

# Get the Moderator's reconciled answer
print(result.moderator.answer)
print(f"Consensus: {result.moderator.consensus}")`;

// ── Inline SVG icons ─────────────────────────────────────────

function IconPanel() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="5" height="18" rx="1.5" fill="var(--color-accent)" opacity="0.8" />
      <rect x="9.5" y="3" width="5" height="18" rx="1.5" fill="var(--color-accent)" />
      <rect x="17" y="3" width="5" height="18" rx="1.5" fill="var(--color-accent)" opacity="0.6" />
    </svg>
  );
}

function IconReplay() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="var(--color-accent)" strokeWidth="2" />
      <polyline points="12 7 12 12 15 15" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 6.5 A7.5 7.5 0 0 0 4.5 12" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <polyline points="4 8 4.5 12 8.5 11" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
      <polyline points="9 12 11 14 15 10" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
        <Container>
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

      {/* ── Section 2: Three Promises ────────────────────────── */}
      <Section variant="compact">
        <Container>
          <Grid cols={3} gap="md" data-animate="stagger">
            <Card
              variant="feature"
              icon={<IconReplay />}
              title="An AI Receipt for every decision"
              body="Every decision your AI makes is recorded as a signed AI Receipt: the answer, the roles that weighed in, the policies that applied and the sources cited. The provable record behind every answer, ready to replay or bundle into an audit pack."
              className="hover:-translate-y-1 transition-transform duration-200"
            />
            <Card
              variant="feature"
              icon={<IconShield />}
              title="Policies the model cannot break"
              body="Set rules your AI must follow. It literally cannot break them. Block sensitive data from outputs. Enforce your pricing floors. Require citations on legal claims. No coding needed for the essentials."
              className="hover:-translate-y-1 transition-transform duration-200"
            />
            <Card
              variant="feature"
              icon={<IconPanel />}
              title="A panel behind every answer"
              body="Roles deliberate before any answer reaches you, and that deliberation is captured on the receipt. The substance behind the record, not the headline."
              className="hover:-translate-y-1 transition-transform duration-200"
            />
          </Grid>
        </Container>
      </Section>

      {/* ── Section 3: Moderator Demo ────────────────────────── */}
      <section style={{ background: '#0b0f19', color: '#e4e4e7', padding: '6rem 0' }}>
        <Container>
          <Label style={{ color: '#8b9ef0' }}>Behind the receipt</Label>
          <Heading2 style={{ color: '#e4e4e7', marginTop: '0.75rem' }}>
            <span className="font-display">What makes a receipt worth reading.</span>
          </Heading2>
          <Body
            variant="large"
            style={{ color: '#a1a1aa', marginTop: '1rem' }}
          >
            Behind every AI Receipt is a panel, not a single model. Thursdai brings together your business&apos;s Legal, Finance and Operations knowledge, flags where they disagree, cites every source and applies your rules. That deliberation is what each receipt records.
          </Body>
          <ModeratorPanel />
          <div style={{ marginTop: '2rem' }}>
            <Link href="/product/moderator" style={{ color: '#8b9ef0', fontSize: '15px', fontWeight: 600 }}>
              See Moderator in depth →
            </Link>
          </div>
          <Body variant="small" style={{ color: 'rgba(161,161,170,0.9)', marginTop: '0.5rem' }}>
            or <a href="#request-demo" style={{ color: '#8b9ef0' }}>book a live walk-through →</a>
          </Body>
        </Container>
      </section>

      {/* ── Section 4: Time-Travel ───────────────────────────── */}
      <Section variant="default" id="replay-demo">
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

      {/* ── Section 5: Policy-as-Code ────────────────────────── */}
      <Section variant="default" style={{ background: 'var(--color-surface-secondary)' }}>
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

      {/* ── Section 6: Trust banner ───────────────────────────── */}
      <Section
        variant="compact"
        style={{
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

      {/* ── Section 7: Solutions / People + executive dashboard ── */}
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

      {/* ── Section 8: Developers band ───────────────────────── */}
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
                  <span className="font-display">Built to connect to your existing tools. With an open API for technical teams.</span>
                </Heading2>
                <Body style={{ color: '#a1a1aa' }}>
                  Thursdai works out of the box for most teams. For developers and IT: a full API, SDK and MCP server. Connect to your existing systems, automate workflows and build on top of Thursdai&apos;s roles and policies.
                </Body>
                <Link href="/developers" style={{ color: '#8b9ef0', fontSize: '15px', fontWeight: 600 }}>
                  Explore the developer surface →
                </Link>
              </div>
            }
            right={
              <CodeBlock
                language="python"
                filename="example.py"
                code={INVOKE_ROLE_SNIPPET}
              />
            }
          />
        </Container>
      </section>

      {/* ── Why Thursdai vs. competitors ──────────────────────── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
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
