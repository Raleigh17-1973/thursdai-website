import React from 'react';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Heading2, Heading3 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { LABEL_STYLE } from '@/components/typography/scale';
import { ClosingCTAs } from '@/components/ui/ClosingCTAs';
import { RequestPilotButton } from '@/components/ui/RequestPilotButton';
import { ButtonLink } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/nav/Breadcrumb';
import { CONTACT_EMAIL } from '@/config/site';
import { RecordTable } from './RecordTable';
import { ClosingBand } from './ClosingBand';

// Compare template (The Record, page anatomy 6): a summary card set like a receipt, an honest
// table, "where they are strong" before "where Thursdai differs", and a Request a pilot close
// (plan 3.3: compare pages lead with the pilot; the demo is the secondary).
//
// Honesty rules for the data: Thursdai certifications read from src/lib/certifications.ts
// (none held); competitor cells state only what the competitor publishes about itself, and say
// "Not published" rather than guess.

export interface CompareRow {
  capability: string;
  them: string;
  thursdai: string;
}

export interface ComparePoint {
  title: string;
  body: string;
}

export interface CompareTemplateProps {
  /** Competitor product name, e.g. "Glean". */
  competitor: string;
  slug: string;
  title: string;
  lead: React.ReactNode;
  summary: {
    /** One sentence, set in the serif like a receipt's decision line. */
    line: string;
    theyAreFor: string;
    thursdaiIsFor: string;
    chooseThem: string;
    chooseThursdai: string;
  };
  rows: CompareRow[];
  strengths: ComparePoint[];
  differences: ComparePoint[];
  close?: { heading?: string; body?: string };
}

function SummaryCard({ competitor, summary }: Pick<CompareTemplateProps, 'competitor' | 'summary'>) {
  const fields = [
    { label: `${competitor} is for`, value: summary.theyAreFor },
    { label: 'Thursdai is for', value: summary.thursdaiIsFor },
    { label: `Choose ${competitor} when`, value: summary.chooseThem },
    { label: 'Choose Thursdai when', value: summary.chooseThursdai },
  ];
  return (
    <figure
      className="m-0"
      aria-label={`Summary: Thursdai and ${competitor}`}
      style={{
        width: 'calc(100% - 4px)',
        background: 'var(--paper)',
        border: '1px solid var(--ink)',
        boxShadow: '4px 4px 0 0 var(--ink)',
      }}
    >
      <div
        className="flex justify-between gap-4"
        style={{ ...LABEL_STYLE, color: 'var(--ink)', padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--ink)' }}
      >
        <span>Comparison</span>
        <span>Thursdai / {competitor}</span>
      </div>
      <p
        className="m-0"
        style={{
          padding: '1.5rem 1.25rem 1.25rem',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(22px, calc(19.33px + 0.74vw), 30px)',
          lineHeight: 1.3,
          letterSpacing: '-0.01em',
          color: 'var(--ink)',
          textWrap: 'balance',
        }}
      >
        {summary.line}
      </p>
      <dl className="m-0 grid grid-cols-1 sm:grid-cols-2 gap-2" style={{ padding: '0 1.25rem 1.25rem' }}>
        {fields.map((f) => (
          <div key={f.label} style={{ background: 'var(--sunk)', padding: '0.75rem 0.875rem' }}>
            <dt style={{ ...LABEL_STYLE, color: 'var(--ink-3)' }}>{f.label}</dt>
            <dd className="m-0" style={{ marginTop: '0.375rem', fontSize: '15px', lineHeight: 1.5, color: 'var(--ink)' }}>
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
      <figcaption
        style={{ ...LABEL_STYLE, padding: '0.75rem 1.25rem', borderTop: '1px solid var(--rule)', textTransform: 'none', letterSpacing: 0 }}
      >
        Something out of date?{' '}
        <a href={`mailto:${CONTACT_EMAIL}?subject=Comparison%20correction`} style={{ textDecoration: 'underline' }}>
          Tell us
        </a>{' '}
        and we will correct it.
      </figcaption>
    </figure>
  );
}

function PointList({ items }: { items: ComparePoint[] }) {
  return (
    <ol className="list-none p-0 m-0" style={{ borderTop: '1px solid var(--ink)' }}>
      {items.map((p, i) => (
        <li
          key={p.title}
          className="grid grid-cols-1 md:grid-cols-[64px_minmax(0,1fr)] gap-x-6 gap-y-2"
          style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--rule)' }}
        >
          <span aria-hidden="true" style={{ ...LABEL_STYLE, color: 'var(--ink-3)', paddingTop: '0.4rem' }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <Heading3>{p.title}</Heading3>
            <Body style={{ marginTop: '0.5rem' }}>{p.body}</Body>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function CompareTemplate({
  competitor,
  slug,
  title,
  lead,
  summary,
  rows,
  strengths,
  differences,
  close,
}: CompareTemplateProps) {
  return (
    <>
      <Section variant="compact">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Compare', href: '/compare' },
              { label: `Thursdai and ${competitor}` },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 items-start" style={{ marginTop: '2rem' }}>
            <div className="lg:col-span-6">
              <Label>Thursdai and {competitor}</Label>
              <Heading1 style={{ marginTop: '1rem' }}>{title}</Heading1>
              <Body variant="large" style={{ marginTop: '1.5rem' }}>
                {lead}
              </Body>
              <div className="flex flex-wrap gap-4" style={{ marginTop: '2.5rem' }}>
                <RequestPilotButton source="hero" variant="primary" size="lg" />
                <ButtonLink href="/demo" variant="secondary" size="lg">
                  Open the demo
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-start-8 lg:col-span-5">
              <SummaryCard competitor={competitor} summary={summary} />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
            <div className="lg:col-span-7">
              <Label as="p">Where they are strong</Label>
              <Heading2 style={{ marginTop: '1rem' }}>What {competitor} does well.</Heading2>
            </div>
            <Body className="lg:col-span-5 lg:self-end">
              These are real strengths. If your main need is one of them, {competitor} may be the
              right choice.
            </Body>
          </div>
          <div style={{ marginTop: '3rem' }}>
            <PointList items={strengths} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
            <div className="lg:col-span-7">
              <Label as="p">Where Thursdai differs</Label>
              <Heading2 style={{ marginTop: '1rem' }}>A different job.</Heading2>
            </div>
            <Body className="lg:col-span-5 lg:self-end">
              The differences that matter when an AI decision has to be explained to an auditor,
              an examiner or the person it was about.
            </Body>
          </div>
          <div style={{ marginTop: '3rem' }}>
            <PointList items={differences} />
          </div>
        </Container>
      </Section>

      <Section id="table">
        <Container>
          <Label as="p">Side by side</Label>
          <Heading2 style={{ marginTop: '1rem' }}>The table, without the ticks.</Heading2>
          <Body style={{ marginTop: '1.5rem' }}>
            Each cell says what the product does, in words. Where we could not confirm a detail
            about {competitor}, the cell says so rather than guess. Thursdai holds no certifications
            yet.
          </Body>
          <RecordTable
            style={{ marginTop: '2.5rem' }}
            caption={`Thursdai and ${competitor} compared`}
            columns={[
              { key: 'capability', label: 'Capability', width: '30%' },
              { key: 'them', label: competitor, width: '35%' },
              { key: 'thursdai', label: 'Thursdai' },
            ]}
            rows={rows.map((r) => ({ id: `${slug}-${r.capability}`, ...r }))}
          />
        </Container>
      </Section>

      <ClosingBand
        heading={close?.heading ?? 'Put your own AI decisions on the record.'}
        body={
          close?.body ??
          'A pilot connects one of your AI systems to your own tenant. Before that, the demo shows a signed sample receipt you can verify yourself, with no login.'
        }
        actions={<ClosingCTAs primary="pilot" />}
      />
    </>
  );
}
