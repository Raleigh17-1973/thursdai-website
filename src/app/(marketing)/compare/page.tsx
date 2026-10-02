import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Heading3 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { LABEL_STYLE } from '@/components/typography/scale';
import { ClosingCTAs } from '@/components/ui/ClosingCTAs';
import { RequestPilotButton } from '@/components/ui/RequestPilotButton';
import { ButtonLink } from '@/components/ui/Button';
import { ClosingBand } from '@/components/templates/ClosingBand';

export const metadata: Metadata = {
  title: 'Compare: Thursdai',
  description:
    'Side-by-side comparisons of Thursdai and the enterprise AI tools you may be evaluating: where each is strong, where Thursdai differs and what we could not confirm.',
};

const COMPARISONS = [
  {
    href: '/compare/glean',
    name: 'Glean',
    description:
      'Glean is enterprise search and an assistant over company knowledge. Thursdai is a record of AI decisions across any team.',
  },
  {
    href: '/compare/microsoft-copilot',
    name: 'Microsoft Copilot',
    description:
      'Copilot is a general assistant inside Microsoft 365. Thursdai is a record of AI decisions across any team.',
  },
  {
    href: '/compare/chatgpt-enterprise',
    name: 'ChatGPT Enterprise',
    description:
      'ChatGPT Enterprise is a general-purpose AI assistant for work. Thursdai is a record of AI decisions across any team.',
  },
  {
    href: '/compare/moveworks',
    name: 'Moveworks',
    description:
      'Moveworks automates IT and HR service requests. Thursdai is a record of AI decisions across any team.',
  },
  {
    href: '/compare/writer',
    name: 'Writer',
    description:
      'Writer generates on-brand content for enterprise teams. Thursdai is a record of AI decisions across any team.',
  },
  {
    href: '/compare/harvey',
    name: 'Harvey',
    description:
      'Harvey is AI for legal work. Thursdai is a record of AI decisions across any team.',
  },
];

export default function ComparePage() {
  return (
    <>
      <Section variant="compact">
        <Container>
          <Label>Compare</Label>
          <Heading1 style={{ marginTop: '1rem' }}>Side by side, without the ticks.</Heading1>
          <Body variant="large" style={{ marginTop: '1.5rem' }}>
            Each of these products does a real job well. Thursdai does a different one: it records
            the decisions AI systems make and signs each one. Every comparison says where the other
            product is strong, where Thursdai differs and what we could not confirm.
          </Body>
          <div className="flex flex-wrap gap-4" style={{ marginTop: '2.5rem' }}>
            <RequestPilotButton source="hero" variant="primary" size="lg" />
            <ButtonLink href="/demo" variant="secondary" size="lg">
              Open the demo
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <ol className="list-none p-0 m-0" style={{ borderTop: '1px solid var(--ink)' }}>
            {COMPARISONS.map((c, i) => (
              <li key={c.href} style={{ borderBottom: '1px solid var(--rule)' }}>
                <Link
                  href={c.href}
                  className="group grid grid-cols-1 md:grid-cols-[64px_minmax(0,1fr)_auto] gap-x-6 gap-y-2 no-underline hover:no-underline"
                  style={{ padding: '1.75rem 0', color: 'var(--ink)' }}
                >
                  <span aria-hidden="true" style={{ ...LABEL_STYLE, color: 'var(--ink-3)', paddingTop: '0.4rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <Heading3>Thursdai and {c.name}</Heading3>
                    <Body style={{ marginTop: '0.5rem' }}>{c.description}</Body>
                  </div>
                  <span
                    className="group-hover:underline md:self-center"
                    style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-accent)', textUnderlineOffset: '4px' }}
                  >
                    Read the comparison <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <ClosingBand
        heading="Put your own AI decisions on the record."
        body="A pilot connects one of your AI systems to your own tenant. Before that, the demo shows a signed sample receipt you can verify yourself, with no login."
        actions={<ClosingCTAs primary="pilot" />}
      />
    </>
  );
}
