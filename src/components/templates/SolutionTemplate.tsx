import React from 'react';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { LABEL_STYLE } from '@/components/typography/scale';
import { HeroCTAs } from '@/components/ui/HeroCTAs';
import { ClosingCTAs } from '@/components/ui/ClosingCTAs';
import { Breadcrumb } from '@/components/nav/Breadcrumb';
import { ReceiptFrame } from '@/components/receipt/ReceiptFrame';
import { SAMPLE_HIRING_RECEIPT } from '@/components/receipt/sample';
import { ClosingBand } from './ClosingBand';

// Solution template (The Record, page anatomy 3): H1 and a sub-line naming the buyer; the
// problem in one serif paragraph with a sourced number and its sources in the margin; what goes
// on the record for this buyer beside the signed sample receipt; optional page-specific
// sections; "Open the demo" primary in the hero and repeated in the ink close.

export interface SolutionSource {
  label: string;
  href: string;
}

interface SolutionTemplateProps {
  crumb: string;
  label: string;
  title: React.ReactNode;
  /** The hero sub-line. It names the buyer. */
  buyerLine: React.ReactNode;
  problem: React.ReactNode;
  sources: SolutionSource[];
  record: {
    heading: string;
    intro: React.ReactNode;
    items: { label: string; body: React.ReactNode }[];
  };
  /** Page-specific sections between the record and the close. */
  children?: React.ReactNode;
  close: { heading: React.ReactNode; body: React.ReactNode };
}

const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

export function SolutionTemplate({
  crumb,
  label,
  title,
  buyerLine,
  problem,
  sources,
  record,
  children,
  close,
}: SolutionTemplateProps) {
  return (
    <>
      <Section variant="compact">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Solutions', href: '/solutions' },
              { label: crumb },
            ]}
          />
          <Label style={{ marginTop: '2rem' }}>{label}</Label>
          <Heading1 style={{ marginTop: '1rem' }}>{title}</Heading1>
          <Body variant="large" style={{ marginTop: '1.5rem' }}>
            {buyerLine}
          </Body>
          <div style={{ marginTop: '2.5rem' }}>
            <HeroCTAs />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12">
            <div className="lg:col-span-8">
              <h2 className="m-0" style={LABEL_STYLE}>
                The problem
              </h2>
              <p
                className="m-0"
                style={{
                  marginTop: '1.5rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, calc(19.33px + 0.74vw), 30px)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.01em',
                  color: 'var(--ink)',
                  textWrap: 'pretty',
                }}
              >
                {problem}
              </p>
            </div>
            <aside
              aria-label="Sources"
              className="lg:col-start-10 lg:col-span-3 lg:self-end"
              style={{ borderTop: '1px solid var(--ink)', paddingTop: '1.25rem' }}
            >
              <Label as="p">Sources</Label>
              <ul className="list-none p-0 m-0" style={{ marginTop: '0.75rem' }}>
                {sources.map((s) => (
                  <li key={s.href + s.label} style={{ padding: '0.4rem 0', fontSize: '15px', lineHeight: 1.5 }}>
                    <a href={s.href} rel="noopener noreferrer" target="_blank" style={UNDERLINED}>
                      {s.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 items-start">
            <div className="order-2 lg:order-1 lg:col-span-6">
              <ReceiptFrame {...SAMPLE_HIRING_RECEIPT} style={{ maxWidth: '560px' }} />
            </div>
            <div className="order-1 lg:order-2 lg:col-start-8 lg:col-span-5">
              <Label as="p">On the record</Label>
              <Heading2 style={{ marginTop: '1rem' }}>{record.heading}</Heading2>
              <Body style={{ marginTop: '1.5rem' }}>{record.intro}</Body>
              <dl className="m-0" style={{ marginTop: '2rem', borderTop: '1px solid var(--ink)' }}>
                {record.items.map((f) => (
                  <div
                    key={f.label}
                    className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-x-6 gap-y-1"
                    style={{ padding: '1.25rem 0', borderBottom: '1px solid var(--rule)' }}
                  >
                    <dt style={{ ...LABEL_STYLE, color: 'var(--ink)', paddingTop: '0.3rem' }}>{f.label}</dt>
                    <dd className="m-0" style={{ fontSize: '17px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                      {f.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {children}

      <ClosingBand heading={close.heading} body={close.body} actions={<ClosingCTAs primary="demo" />} />
    </>
  );
}
