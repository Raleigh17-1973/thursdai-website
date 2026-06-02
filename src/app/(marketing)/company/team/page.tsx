import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Team — Thursdai',
  description: 'Meet the people building Thursdai — AI governance infrastructure for regulated enterprises.',
};

export default function TeamPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section>
        <Container>
          <Label>Team</Label>
          <Heading1 style={{ marginTop: '0.75rem' }}>Small team. High stakes.</Heading1>
          <Body variant="large" style={{ maxWidth: '600px', marginTop: '1rem' }}>
            Thursdai is built by practitioners who believe regulated enterprises deserve AI
            they can actually trust — and audit.
          </Body>
        </Container>
      </Section>

      {/* ── Founder ── */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <div
            style={{
              display: 'flex',
              gap: '2.5rem',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {/* Avatar placeholder */}
            <div
              style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-indigo) 0%, var(--color-plum) 100%)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#fff',
                fontFamily: 'var(--font-sans)',
              }}
              aria-hidden="true"
            >
              JH
            </div>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Jeffrey Hoyt
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--color-accent)',
                  fontWeight: 600,
                  margin: '0.25rem 0 0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Founder
              </p>
              <Body style={{ maxWidth: '560px' }}>
                Previously at Sprout, where I spent years in Program and Project Management and
                kept wishing someone would build a governed AI layer that could actually explain
                its decisions. After getting laid off in early 2026, I finally had the time to
                build it myself. Thursdai started as an operations agent and pivoted to
                governance infrastructure when I realized the audit trail I was building for
                myself was the real product.
              </Body>
              <div style={{ marginTop: '1rem' }}>
                <a
                  href="mailto:thursdai@getthursdai.com"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-accent)',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  thursdai@getthursdai.com
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── We're hiring ── */}
      <Section variant="compact">
        <Container>
          <Heading2>We&apos;re hiring.</Heading2>
          <Body style={{ maxWidth: '580px', marginTop: '1rem' }}>
            Building a governed AI layer for regulated enterprises requires deep expertise in
            compliance, distributed systems, and product. If that sounds like you, check out
            our open roles.
          </Body>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/company/careers">
              <Button variant="secondary" size="md">See open roles →</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
