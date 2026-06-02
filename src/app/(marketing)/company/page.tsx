import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import { Display } from '@/components/typography/Display';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Company — Thursdai',
  description:
    'Thursdai is AI governance infrastructure built by practitioners who watched AI make confident, wrong, unauditable decisions — and decided to fix it.',
};

export default function CompanyPage() {
  return (
    <>
      {/* ── Section 1: Founder story ── */}
      <Section variant="default" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Label>Our Story</Label>
          <Display style={{ marginTop: '1rem' }}>
            Built because I couldn&apos;t see what my own agents were doing.
          </Display>
          <Body variant="large" style={{ maxWidth: '680px', marginTop: '1.5rem' }}>
            I&apos;m Jeffrey Hoyt. In February 2026 I was laid off, and for the first time in years I
            had the time to actually build something I&apos;d been thinking about for a long time: a
            business operations agent. I started with Program and Project Management — the domain I
            know best — and HR, which my wife knows inside out.
          </Body>
          <Body style={{ maxWidth: '680px', marginTop: '1.25rem' }}>
            The further I got into building, the more I ran into the same wall: I had no idea how
            my own agents were arriving at their answers. So I built a case object — a place where
            agents could interact with each other and leave evidence of how they were getting to
            their work product. That case object turned out to be the most interesting thing I
            built.
          </Body>
          <Body style={{ maxWidth: '680px', marginTop: '1.25rem' }}>
            Around the same time, AI regulation bills started landing. And it clicked: the hard
            problem isn&apos;t building agents that do things — it&apos;s building agents that can
            prove what they did and why. The operations agent market is crowded and every company is
            building their own internal tooling. But the governance layer? Nobody was doing that
            right. So I pivoted, and Thursdai became what it is today.
          </Body>
          <Body style={{ maxWidth: '680px', marginTop: '1.25rem' }}>
            I&apos;m building in public and looking for early design partners who have the same
            problem I had. If that&apos;s you, reach out at{' '}
            <a href="mailto:thursdai@getthursdai.com" style={{ color: 'var(--color-accent)' }}>
              thursdai@getthursdai.com
            </a>
            .
          </Body>
        </Container>
      </Section>

      {/* ── Section 2: What we're building ── */}
      <Section variant="compact">
        <Container>
          <Heading2>What we&apos;re building</Heading2>
          <Body style={{ maxWidth: '680px', marginTop: '1rem' }}>
            Thursdai is a governed agent substrate — a thin, specialized layer that sits between
            AI models and regulated enterprise workflows. Every answer is role-moderated, every
            decision is replayable, and every policy is enforced at the inference layer, not
            bolted on after.
          </Body>
          <Body style={{ maxWidth: '680px', marginTop: '0.75rem' }}>
            We&apos;re not competing with ChatGPT or Copilot. We&apos;re the governance layer
            enterprises need to actually trust the AI they&apos;ve already decided to deploy.
          </Body>
        </Container>
      </Section>

      {/* ── Section 3: Why now ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2>Why now</Heading2>
          <Body style={{ maxWidth: '680px', marginTop: '1rem' }}>
            The EU AI Act binding date, SEC AI disclosure rules, and three years of enterprises
            deploying AI without governance have created a forcing function. Every major financial
            services firm, healthcare system, and law firm that shipped AI in 2023–2025 now needs
            to demonstrate that their AI decisions are auditable, explainable, and policy-compliant.
          </Body>
          <Body style={{ maxWidth: '680px', marginTop: '0.75rem' }}>
            Thursdai exists at exactly this inflection point. The window to capture this market
            is the next 18 months — and we&apos;re already in it.
          </Body>
        </Container>
      </Section>

      {/* ── Section 4: Why Thursdai wins ── */}
      <Section variant="compact">
        <Container>
          <Heading2>Why Thursdai wins</Heading2>
          <Grid cols={3} gap="md" style={{ marginTop: '1.5rem' }}>
            <Card
              variant="feature"
              title="Audit layer first"
              body="Every competitor added governance on top of an existing chatbot. We built the audit layer first. That's an architectural difference, not a feature gap."
            />
            <Card
              variant="feature"
              title="Infrastructure, not an app"
              body="Thursdai doesn't replace your AI tools. It governs them. Any model, any stack — if you can make an API call, you can add Thursdai's governance layer today."
            />
            <Card
              variant="feature"
              title="Regulatory-native"
              body="EU AI Act Annex III documentation, FRIA/DPIA templates, and full audit logs that meet record-keeping requirements — built in, not bolted on."
            />
          </Grid>
        </Container>
      </Section>

      {/* ── Section 5: Design partners ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2>Early design partners</Heading2>
          <Body style={{ maxWidth: '640px', marginTop: '1rem' }}>
            We&apos;re working with a small group of design partners in financial services,
            healthcare, and legal — industries where the cost of an unauditable AI decision is
            highest. The value varies significantly depending on how deeply AI is embedded in your
            workflows and how tightly regulated your domain is, which is exactly why we work
            closely with each partner rather than promising universal numbers.
          </Body>
          <Body style={{ maxWidth: '640px', marginTop: '0.75rem' }}>
            If you&apos;re in a regulated industry and AI governance is on your roadmap for 2026,
            we&apos;d like to talk.
          </Body>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="mailto:thursdai@getthursdai.com">
              <Button variant="primary" size="md">Become a design partner →</Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── Section 6: For investors ── */}
      <Section variant="compact">
        <Container>
          <Heading2>For investors</Heading2>
          <Body style={{ maxWidth: '640px', marginTop: '1rem' }}>
            We&apos;re building Thursdai with a small group of design partners and early customers.
            If you&apos;re an investor who sees the AI governance opportunity, I&apos;d like to talk.
          </Body>
          <Body style={{ marginTop: '0.75rem' }}>
            <a
              href="mailto:thursdai@getthursdai.com"
              style={{ color: 'var(--color-accent)', fontWeight: 600 }}
            >
              Reach out → thursdai@getthursdai.com
            </a>
          </Body>
        </Container>
      </Section>

      {/* ── Section 7: Press & Media ── */}
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
