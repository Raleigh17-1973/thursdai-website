import React, { Suspense } from 'react';
import { cookies } from 'next/headers';
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
import { ReplayDemo } from '@/components/demos/ReplayDemo';
import { ModeratorPanel } from '@/components/demos/ModeratorPanel';
import { TimeTravelScrubber } from '@/components/demos/TimeTravelScrubber';
import { PolicyEditor } from '@/components/demos/PolicyEditor';
import { DealDesigner } from '@/components/demos/DealDesigner';
import { HeroCTAs } from '@/components/ui/HeroCTAs';
import { CertBadge } from '@/components/content/CertBadge';
import { Badge } from '@/components/ui/Badge';
import { ClosingCTAs } from '@/components/ui/ClosingCTAs';
import { getHeroVariant } from '@/lib/posthog';

// ── Cert badges data ──────────────────────────────────────────

const CERT_BADGES = [
  { name: 'SOC 2 Type II', status: 'live' as const, href: '/trust/certifications#soc2', ariaLabel: 'SOC 2 Type II certified' },
  { name: 'ISO 27001', status: 'live' as const, href: '/trust/certifications#iso27001', ariaLabel: 'ISO 27001 certified' },
  { name: 'ISO 42001', status: 'in-progress' as const, href: '/trust/certifications#iso42001', ariaLabel: 'ISO 42001 in progress' },
  { name: 'HIPAA-eligible', status: 'live' as const, href: '/trust/certifications#hipaa', ariaLabel: 'HIPAA-eligible infrastructure' },
  { name: 'EU AI Act Annex III', status: 'ready' as const, href: '/trust/annex-iii', ariaLabel: 'EU AI Act Annex III ready' },
  { name: 'FedRAMP Moderate', status: 'in-progress' as const, href: '/trust/certifications#fedramp', ariaLabel: 'FedRAMP Moderate in progress' },
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

function IconBuilding() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="var(--color-accent)" strokeWidth="2" />
      <path d="M9 21V9h6v12" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
      <rect x="10.5" y="12" width="3" height="3" fill="var(--color-accent)" opacity="0.6" />
    </svg>
  );
}

function IconLightning() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="var(--color-accent)" strokeWidth="2" />
      <polyline points="9 12 11 14 15 10" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

export default async function HomePage() {
  const cookieStore = await cookies();
  const distinctId = cookieStore.get('__thursdai_id')?.value ?? 'anon';
  const variant = await getHeroVariant(distinctId);

  return (
    <>
      {/* ── Section 1: Hero ──────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--color-bg)',
        }}
        className="md:min-h-0 md:py-32"
      >
        <Container>
          <Split
            ratio="60/40"
            alignItems="center"
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
                {/* Teal radial gradient accent behind copy */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: '-60px -40px -60px -40px',
                    background:
                      'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(45,212,191,0.05) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />
                <Label>Enterprise Agent Platform</Label>
                {variant === 'option-a' ? (
                  <>
                    <Display>
                      The governed agent substrate for regulated enterprises.
                    </Display>
                    <Body variant="large">
                      Role-based moderation, decision replay, and policies the model cannot break
                      — built for the teams that can&apos;t afford an unauditable AI.
                    </Body>
                  </>
                ) : (
                  <>
                    <Display>
                      See who said what. Replay the decision. Know why it changed.
                    </Display>
                    <Body variant="large">
                      Thursdai gives regulated enterprises a governed agent substrate — role-based
                      moderation, decision replay, and policies the model cannot break.
                    </Body>
                  </>
                )}
                <HeroCTAs />
              </div>
            }
            right={<ReplayDemo />}
          />
        </Container>
        <ScrollCue />
      </section>

      {/* ── Section 2: Three Promises ────────────────────────── */}
      <Section variant="compact">
        <Container>
          <Grid cols={3} gap="md" data-animate="stagger">
            <Card
              variant="feature"
              icon={<IconPanel />}
              title="A panel, not a chatbot"
              body="Every question goes to Legal, Finance, and Engineering simultaneously. The Moderator reconciles the answers. You see who agreed, who differed, and why."
            />
            <Card
              variant="feature"
              icon={<IconReplay />}
              title="Replay any decision"
              body="Every agent decision is recorded with the knowledge and policies that were active at the time. Go back to any point and see exactly what happened and why."
            />
            <Card
              variant="feature"
              icon={<IconShield />}
              title="Policies the model cannot break"
              body="Express governance rules in YAML. The Moderator enforces them before any answer leaves the system — not as a prompt suggestion, but as a hard constraint."
            />
          </Grid>
        </Container>
      </Section>

      {/* ── Section 3: Moderator Demo ────────────────────────── */}
      <section style={{ background: '#0b0f19', color: '#e4e4e7', padding: '6rem 0' }}>
        <Container>
          <Label style={{ color: '#2dd4bf' }}>Moderator</Label>
          <Heading2 style={{ color: '#e4e4e7', marginTop: '0.75rem' }}>
            Three roles. One reconciled answer.
          </Heading2>
          <Body
            variant="large"
            style={{ color: '#a1a1aa', maxWidth: '640px', marginTop: '1rem' }}
          >
            Ask once. Get Legal, Finance, and Engineering in the same panel. The Moderator
            reconciles — flagging disagreements, citing sources, applying your policies before the
            answer leaves.
          </Body>
          <ModeratorPanel />
          <div style={{ marginTop: '2rem' }}>
            <Link href="/product/moderator" style={{ color: '#2dd4bf', fontSize: '15px', fontWeight: 600 }}>
              See Moderator in depth →
            </Link>
          </div>
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
                  Thursdai records every agent decision with the knowledge base, policies, and role
                  definitions that were active at the time. Move the slider to any point in the
                  past — see the answer that would have been given then, and what has changed since.
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
                <Heading2>Rules the model cannot break.</Heading2>
                <Body>
                  Express governance constraints in YAML. The Moderator enforces them before any
                  answer leaves the system — blocking, transforming, or flagging outputs that
                  violate your policies.
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
                    </strong>{' '}
                    — restrict citations to approved knowledge sources
                  </li>
                  <li>
                    <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                      required_attribution
                    </strong>{' '}
                    — mandate source citation on specified claim types
                  </li>
                  <li>
                    <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                      pricing_floor
                    </strong>{' '}
                    — prevent the system from quoting below contract minimums
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

      {/* ── Section 7: Customer logos + stats ────────────────── */}
      <Section variant="default">
        <Container>
          <Label style={{ textAlign: 'center', display: 'block', marginBottom: '0.5rem' }}>
            Customers
          </Label>
          <Heading2 style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Governed AI in production
          </Heading2>
          <Grid cols={3} gap="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Card variant="stat" number="4×" label="Faster compliance review" sub="A Financial Services Company" />
              <Body variant="small" style={{ color: 'var(--color-text-secondary)', padding: '0 0.25rem' }}>
                A financial services company uses Thursdai&apos;s Moderator to route every AI output through Legal, Compliance, and Risk before it reaches a relationship manager.
              </Body>
              <Badge variant="muted" style={{ marginTop: '0.5rem' }}>Named case study publishing August 2026</Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Card variant="stat" number="91%" label="Policy violation catch rate" sub="A Healthcare Organisation" />
              <Body variant="small" style={{ color: 'var(--color-text-secondary)', padding: '0 0.25rem' }}>
                A healthcare organisation enforces HIPAA policy rules at the model layer — no PII leaves the system without explicit approval.
              </Body>
              <Badge variant="muted" style={{ marginTop: '0.5rem' }}>Named case study publishing August 2026</Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Card variant="stat" number="$2.1M" label="Avoided in contract risk" sub="A Legal Services Firm" />
              <Body variant="small" style={{ color: 'var(--color-text-secondary)', padding: '0 0.25rem' }}>
                A legal services firm replays every AI-assisted contract review to audit what knowledge was active when a recommendation was made.
              </Body>
              <Badge variant="muted" style={{ marginTop: '0.5rem' }}>Named case study publishing August 2026</Badge>
            </div>
          </Grid>
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link
              href="/customers"
              style={{ color: 'var(--color-accent)', fontSize: '15px', fontWeight: 600 }}
            >
              See deployment context + apply to be featured →
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
                <Label style={{ color: '#2dd4bf' }}>Developers</Label>
                <Heading2 style={{ color: '#e4e4e7' }}>
                  Thursdai is infrastructure other agents call.
                </Heading2>
                <Body style={{ color: '#a1a1aa' }}>
                  invoke_role(), replay_case(), dry_run_policy() — seven MCP tools and a REST API
                  built for the agent-to-agent layer. Your orchestrator calls Thursdai; Thursdai
                  handles governance, attribution, and audit.
                </Body>
                <Body style={{ color: '#a1a1aa' }}>
                  Works with Claude Desktop, Cursor, and any MCP-compatible client out of the box.
                </Body>
                <Link href="/developers" style={{ color: '#2dd4bf', fontSize: '15px', fontWeight: 600 }}>
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

      {/* ── Section 9: Pricing wedge ─────────────────────────── */}
      <Section variant="default" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Label style={{ textAlign: 'center', display: 'block' }}>Pricing</Label>
          <Heading2 style={{ textAlign: 'center' }}>
            Published pricing. Tuned to outcome.
          </Heading2>
          <Body
            variant="large"
            style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}
          >
            Three components. All published. No &ldquo;contact us for pricing.&rdquo;
          </Body>
          <Grid cols={3} gap="md">
            <Card
              variant="feature"
              icon={<IconBuilding />}
              title="Platform"
              body="Annual platform fee based on seat count. Covers all roles, all policies, all deployment models. Starting at $60K/year."
            />
            <Card
              variant="feature"
              icon={<IconLightning />}
              title="Credits"
              body="Per 1,000 inference tokens across all roles. Pay for what you use, nothing more. $0.018 per 1K tokens."
            />
            <Card
              variant="feature"
              icon={<IconCheckCircle />}
              title="Outcome"
              body="Optional per-closed-case fee for outcome-based deployments. $2.20 per resolved case. Only pay when the system delivers."
            />
          </Grid>
          <p style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/pricing">
              <button
                className="inline-flex items-center justify-center font-semibold rounded-lg transition-colors px-6 py-3 text-[17px] bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]"
              >
                Design your deal →
              </button>
            </Link>
          </p>
          <Body
            variant="small"
            style={{ textAlign: 'center', color: 'var(--color-text-tertiary)', marginTop: '1rem' }}
          >
            Illustrative pricing.{' '}
            <Link href="/pricing" style={{ color: 'var(--color-accent)' }}>
              See the full Deal Designer →
            </Link>
          </Body>

          {/* Deal Designer inline preview */}
          <div
            style={{
              marginTop: '3rem',
              border: '1px solid var(--color-border-default)',
              borderRadius: '16px',
              padding: '2rem',
              background: 'var(--color-surface-primary)',
            }}
          >
            <Suspense>
              <DealDesigner />
            </Suspense>
          </div>
        </Container>
      </Section>

      {/* ── Section 10: Closing CTA band ─────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #14b8a6 100%)',
          padding: '5rem 0',
          textAlign: 'center',
        }}
      >
        <Container>
          <Heading2 style={{ color: '#ffffff', marginBottom: '1rem' }}>
            Ready to govern your AI agents?
          </Heading2>
          <Body
            variant="large"
            style={{
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '500px',
              margin: '0 auto 2rem',
            }}
          >
            Try the replay demo or request a dedicated tenant pilot.
          </Body>
          <ClosingCTAs />
        </Container>
      </section>
    </>
  );
}
