import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';

export const metadata: Metadata = {
  title: 'Team: Thursdai',
  description: 'Meet the people building Thursdai: AI governance infrastructure for regulated enterprises.',
};

export default function TeamPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section>
        <Container>
          <Label>Team</Label>
          <Heading1 style={{ marginTop: '0.75rem' }}>Small team. High stakes.</Heading1>
          <Body variant="large" style={{ marginTop: '1rem' }}>
            Thursdai is built by practitioners who believe regulated enterprises deserve AI
            they can actually trust and audit.
          </Body>
        </Container>
      </Section>

      {/* ── Founder ── */}
      <Section variant="compact">
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
                borderRadius: '2px',
                background: 'var(--color-surface-primary)',
                border: '1px solid var(--color-text-primary)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
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
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Jeffrey Hoyt
              </p>
              <Label style={{ margin: '0.25rem 0 0.75rem' }}>Founder</Label>
              <Body>
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
    </>
  );
}
