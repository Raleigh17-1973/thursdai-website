import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Display } from '@/components/typography/Display';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';

export const metadata: Metadata = {
  title: 'Company — Thursdai',
  description: 'Built by someone who felt the pain of unauditable AI. Meet the founder behind Thursdai.',
};

export default function CompanyPage() {
  return (
    <>
      {/* ── Section 1: Founder story ── */}
      <Section variant="default" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Label>OUR STORY</Label>
          <Display style={{ marginTop: '1rem' }}>
            Built by someone who got burned so you don&apos;t have to.
          </Display>
          <Body variant="large" style={{ maxWidth: '680px', marginTop: '1.5rem' }}>
            {/* TODO: Replace with real info */}
            <span style={{ fontStyle: 'italic', opacity: 0.7 }}>
              I&apos;m [Your Name], and I built Thursdai because I spent [X years] watching AI make
              confident, wrong, unauditable decisions — and watching the teams that trusted those
              decisions pay for it. When I looked for a platform that would let me govern AI outputs,
              replay decisions, and enforce business rules at the model layer, I found nothing that
              did all three. So I built it.
            </span>
          </Body>
          <Body style={{ maxWidth: '680px', marginTop: '1.25rem' }}>
            {/* TODO: Replace with real info */}
            <span style={{ fontStyle: 'italic', opacity: 0.7 }}>
              Thursdai is what I wished existed. I&apos;m building it in public, shipping fast, and
              I want early design partners who have the same problem I had. If that&apos;s you, reach
              out directly at{' '}
              <a href="mailto:[your@email.com]" style={{ color: 'var(--color-accent)' }}>
                [your@email.com]
              </a>
              .
            </span>
          </Body>
          <Body
            variant="small"
            style={{ marginTop: '1.5rem', color: 'var(--color-text-tertiary)' }}
          >
            {/* TODO: Replace with real info */}
            <span style={{ fontStyle: 'italic', opacity: 0.7 }}>
              Previously: [Relevant role — e.g. AI/ML engineer, compliance lead, etc.] &middot;{' '}
              [Company or industry type] &middot; Built the first internal AI governance framework
              for [client/org type].
            </span>
          </Body>
        </Container>
      </Section>

      {/* ── Section 2: Market opportunity ── */}
      <Section variant="compact">
        <Container>
          <Heading2>The market opportunity</Heading2>
          <Body style={{ marginTop: '1rem' }}>
            {/* TODO: Replace with real info */}
            <span style={{ fontStyle: 'italic', opacity: 0.7 }}>
              The AI governance market is projected to reach [$XX billion] by 2028 — driven by the
              EU AI Act binding date, SEC AI disclosure rules, and every enterprise that deployed AI
              in 2023–2025 and now needs to govern it. [Add IDC/Gartner citation here.] The window
              to capture this market is the next 18 months.
            </span>
          </Body>
          <Body style={{ marginTop: '1rem' }}>
            Thursdai exists at exactly this inflection point. Every major AI platform gives you
            capability. We give you governance — role-based deliberation, decision replay, and policy
            enforcement at the inference level, not bolted on after.
          </Body>
        </Container>
      </Section>

      {/* ── Section 3: Unfair advantage ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2>Why Thursdai wins</Heading2>
          <Body style={{ marginTop: '1rem' }}>
            {/* TODO: Replace with real info */}
            <span style={{ fontStyle: 'italic', opacity: 0.7 }}>
              [Your unfair advantage — e.g.: &ldquo;We built this because I spent 3 years inside
              [relevant org] watching AI decisions go wrong with no way to audit them. Our
              architecture was designed from the ground up for audit — every competitor added
              governance on top of an existing chatbot. We built the audit layer first.&rdquo;]
            </span>
          </Body>
        </Container>
      </Section>

      {/* ── Section 4: For investors ── */}
      <Section variant="compact">
        <Container>
          <Heading2>For investors</Heading2>
          <Body style={{ marginTop: '1rem' }}>
            We&apos;re building Thursdai with a small group of design partners and early customers.
            If you&apos;re an investor who sees the AI governance opportunity, I&apos;d like to talk.
          </Body>
          <Body style={{ marginTop: '0.75rem' }}>
            {/* TODO: Replace with real info */}
            <a
              href="mailto:[investor@thursdai.com]"
              style={{ color: 'var(--color-accent)', fontWeight: 600 }}
            >
              <span style={{ fontStyle: 'italic', opacity: 0.7 }}>
                Reach out → [investor@thursdai.com]
              </span>
            </a>
          </Body>
        </Container>
      </Section>

      {/* ── Section 5: Press & Media ── */}
      <Section variant="compact">
        <Container>
          <Heading2>Press &amp; Media</Heading2>
          <Body style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
            For press inquiries, interview requests, or the media kit, email{' '}
            <a href="mailto:press@thursdai.com" style={{ color: 'var(--color-accent)' }}>
              press@thursdai.com
            </a>
            .
          </Body>
        </Container>
      </Section>
    </>
  );
}
