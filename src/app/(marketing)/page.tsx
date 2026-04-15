// TODO Week 3: evaluate PostHog 'hero-variant' flag server-side
// Default: 'option-b' until PostHog is configured
const variant: 'option-a' | 'option-b' = 'option-b';

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
import { ReplayDemo } from '@/components/demos/ReplayDemo';
import { ModeratorPanel } from '@/components/demos/ModeratorPanel';
import { TimeTravelScrubber } from '@/components/demos/TimeTravelScrubber';
import { PolicyEditor } from '@/components/demos/PolicyEditor';
import { HeroCTAs } from '@/components/ui/HeroCTAs';

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
  // variant is reserved for PostHog A/B — currently always 'option-b'
  void variant;

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
                <Display>
                  See who said what. Replay the decision. Know why it changed.
                </Display>
                <Body variant="large">
                  Thursdai gives regulated enterprises a governed agent substrate — role-based
                  moderation, decision replay, and policies the model cannot break.
                </Body>
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
    </>
  );
}
