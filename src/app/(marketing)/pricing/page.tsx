import React, { Suspense } from 'react';
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
import { DealDesigner } from '@/components/demos/DealDesigner';

export const metadata: Metadata = {
  title: 'Pricing — Thursdai',
  description:
    'Published pricing for Thursdai. Platform fee, credit units, and outcome-based pricing. No "contact us" — design your deal and see the math.',
};

const PRICING_FAQ = [
  {
    q: 'Why do you publish pricing?',
    a: "Because procurement teams waste weeks on calls that could be replaced by a transparent pricing page. If our pricing doesn't fit your budget, you know before the first call. If it does, we can move faster.",
  },
  {
    q: 'Can we negotiate?',
    a: "Enterprise and Fortune 100 tiers have flexibility on multi-year commitments, bundled professional services, and custom SLAs. The published platform fee and per-unit rates are our standard terms — we don't discount those for early-stage customers.",
  },
  {
    q: 'What if our usage is unpredictable?',
    a: "Credits are billed monthly in arrears based on actual usage. You can set a monthly credit cap — if you hit the cap, inference pauses rather than running up an unexpected bill. No surprises.",
  },
  {
    q: 'How does the outcome unit get measured?',
    a: "A \"closed case\" is a case that transitions to a terminal state (resolved, closed, or archived) in Thursdai's Ambient Cases system. Only cases that Thursdai actively processed count — cases imported for record-keeping without inference do not.",
  },
  {
    q: 'Is there a free trial or proof-of-concept tier?',
    a: 'We offer a 30-day pilot on a dedicated tenant with a $10K credit allocation. Pilots are for qualified enterprise buyers with a defined use case. Apply via the demo request form.',
  },
  {
    q: 'What does the platform fee cover?',
    a: 'The platform fee covers: unlimited role configurations, unlimited policy rules, all deployment models (SaaS through VPC), standard corpus access, support (SLA depends on tier), and SSO/SCIM provisioning.',
  },
  {
    q: 'Are credits shared across departments?',
    a: 'Yes — credits are pooled at the tenant level. You can configure per-department budgets and alerts via the admin API, but the underlying credit pool is shared.',
  },
  {
    q: 'What happens at overage?',
    a: 'You set a monthly credit cap during onboarding. At 80% of cap, you receive an alert. At 100%, inference pauses and you receive a notification. You can increase the cap in the admin dashboard with immediate effect.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: PRICING_FAQ.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Hero ── */}
      <Section style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        <Container>
          <Label>Pricing</Label>
          <Display style={{ marginTop: '0.75rem' }}>Published pricing. Tuned to outcome.</Display>
          <Body variant="large" style={{ maxWidth: '640px', marginTop: '1rem' }}>
            Three components. All published. No &ldquo;contact us for pricing.&rdquo; Design your
            deal below — the math is transparent and the formula is shown.
          </Body>
        </Container>
      </Section>

      {/* ── Example deal cards (anchoring) ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <p
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--color-text-tertiary)',
              marginBottom: '1.5rem',
              textAlign: 'center',
            }}
          >
            Example deals — click to load in the calculator below
          </p>
          <Grid cols={3} gap="md">
            <div
              className="hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
              style={{
                background: 'var(--color-surface-primary)',
                border: '1px solid var(--color-border-default)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'transform 200ms ease, border-color 200ms ease',
              }}
            >
              <Card
                variant="stat"
                number="$72K"
                label="SMB / year"
                sub="400 seats · 5M tokens/mo · 500 outcome cases"
              />
              <Link
                href="/pricing?example=smb"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  color: 'var(--color-accent)',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                Load this example →
              </Link>
            </div>

            <div
              className="hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
              style={{
                background: 'var(--color-surface-primary)',
                border: '1px solid var(--color-border-default)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'transform 200ms ease, border-color 200ms ease',
              }}
            >
              <Card
                variant="stat"
                number="$385K"
                label="Enterprise / year"
                sub="5,000 seats · 50M tokens/mo · 3,000 outcome cases"
              />
              <Link
                href="/pricing?example=enterprise"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  color: 'var(--color-accent)',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                Load this example →
              </Link>
            </div>

            <div
              className="hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
              style={{
                background: 'var(--color-surface-primary)',
                border: '1px solid var(--color-border-default)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'transform 200ms ease, border-color 200ms ease',
              }}
            >
              <Card
                variant="stat"
                number="$1.2M"
                label="Fortune 100 / year"
                sub="15,000 seats · 250M tokens/mo · 15,000 outcome cases"
              />
              <Link
                href="/pricing?example=fortune100"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  color: 'var(--color-accent)',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                Load this example →
              </Link>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* ── DealDesigner ── */}
      <Section>
        <Container>
          <Suspense>
            <DealDesigner />
          </Suspense>
        </Container>
      </Section>

      {/* ── How pricing works ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2 style={{ marginBottom: '2rem' }}>How pricing works</Heading2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              {
                name: 'Platform fee',
                desc: 'Annual fee based on seat count. Covers all roles, all policies, all deployment models, and unlimited policy rules. No per-seat overage.',
                when: 'From day one of your subscription.',
              },
              {
                name: 'Credits',
                desc: 'Per 1,000 inference tokens across all role invocations. Pooled across your entire tenant — not per-user or per-role.',
                when: 'Each time invoke_role() or replay_case() is called.',
              },
              {
                name: 'Outcome',
                desc: 'Optional per-closed-case fee for deployments where Thursdai directly influences case resolution. Only applicable to Ambient Cases workflows.',
                when: 'Only if you enable outcome-based billing. Off by default.',
              },
            ].map((row, i) => (
              <div
                key={row.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr',
                  gap: '1.5rem',
                  padding: '1.5rem 0',
                  borderTop: i === 0 ? '1px solid var(--color-border-default)' : '1px solid var(--color-border-default)',
                  borderBottom: i === 2 ? '1px solid var(--color-border-default)' : undefined,
                }}
              >
                <div>
                  <p style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-text-primary)' }}>
                    {row.name}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Body>{row.desc}</Body>
                  <Body variant="small" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>When does this apply?</strong> {row.when}
                  </Body>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── FAQ ── */}
      <Section>
        <Container>
          <Heading2 style={{ marginBottom: '2rem' }}>Frequently asked questions</Heading2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {PRICING_FAQ.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '1.5rem 0',
                  borderTop: '1px solid var(--color-border-default)',
                  borderBottom: i === PRICING_FAQ.length - 1 ? '1px solid var(--color-border-default)' : undefined,
                }}
              >
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: '16px',
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {item.q}
                </p>
                <Body style={{ color: 'var(--color-text-secondary)' }}>{item.a}</Body>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
