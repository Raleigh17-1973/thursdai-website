import React from 'react';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { H3_STYLE, H4_STYLE, LABEL_STYLE } from '@/components/typography/scale';
import { Breadcrumb } from '@/components/nav/Breadcrumb';

// Trust document template (The Record, page anatomy 4): a plain document. Breadcrumb, mono label,
// serif H1, a lead paragraph and a mono metadata line; then numbered sections under ink rules
// with a contents column on desktop; tables use RecordTable. Ends on the page's ink band if the
// page has a close.

export interface DocSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

interface TrustDocumentProps {
  crumbs: { label: string; href?: string }[];
  label: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  /** Document facts shown in mono under the lead, e.g. version and effective date. */
  meta?: { label: string; value: React.ReactNode }[];
  /** Anything that belongs in the hero after the lead (a primary action). */
  heroActions?: React.ReactNode;
  sections: DocSection[];
  close?: React.ReactNode;
}

const num = (i: number) => String(i + 1).padStart(2, '0');

export function TrustDocument({ crumbs, label, title, lead, meta, heroActions, sections, close }: TrustDocumentProps) {
  return (
    <>
      <Section variant="compact">
        <Container>
          <Breadcrumb items={crumbs} />
          <Label style={{ marginTop: '2rem' }}>{label}</Label>
          <Heading1 style={{ marginTop: '1rem' }}>{title}</Heading1>
          <Body variant="large" style={{ marginTop: '1.5rem' }}>
            {lead}
          </Body>
          {heroActions ? <div style={{ marginTop: '2rem' }}>{heroActions}</div> : null}
          {meta?.length ? (
            <dl
              className="m-0 flex flex-wrap gap-x-8 gap-y-2"
              style={{ marginTop: '2.5rem', paddingTop: '1rem', borderTop: '1px solid var(--rule)' }}
            >
              {meta.map((m) => (
                <div key={m.label} className="flex gap-2">
                  <dt style={{ ...LABEL_STYLE, color: 'var(--ink-3)' }}>{m.label}</dt>
                  <dd className="m-0" style={{ ...LABEL_STYLE, color: 'var(--ink)', textTransform: 'none' }}>
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </Container>
      </Section>

      <Section variant="compact">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10">
            <nav aria-label="Contents" className="lg:col-span-3">
              <div className="lg:sticky lg:top-24">
                <Label as="p" style={{ margin: 0 }}>
                  Contents
                </Label>
                <ol className="list-none p-0 m-0" style={{ marginTop: '1rem', borderTop: '1px solid var(--ink)' }}>
                  {sections.map((s, i) => (
                    <li key={s.id} style={{ borderBottom: '1px solid var(--rule)' }}>
                      <a
                        href={`#${s.id}`}
                        className="flex gap-3 py-2.5 no-underline hover:underline"
                        style={{ fontSize: '15px', lineHeight: 1.4, color: 'var(--ink-2)', textUnderlineOffset: '4px' }}
                      >
                        <span aria-hidden="true" style={{ ...LABEL_STYLE, color: 'var(--ink-3)', paddingTop: '2px' }}>
                          {num(i)}
                        </span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <div className="lg:col-span-9 flex flex-col gap-16 md:gap-20 min-w-0">
              {sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  aria-labelledby={`${s.id}-title`}
                  style={{ borderTop: '1px solid var(--ink)', paddingTop: '1.25rem', scrollMarginTop: '88px' }}
                >
                  <p className="m-0" style={{ ...LABEL_STYLE, color: 'var(--ink-3)' }}>
                    Section {num(i)}
                  </p>
                  <h2 id={`${s.id}-title`} style={{ ...H3_STYLE, marginTop: '0.75rem' }}>
                    {s.title}
                  </h2>
                  <div className="flex flex-col gap-5" style={{ marginTop: '1.5rem' }}>
                    {s.body}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {close}
    </>
  );
}

/** Term and explanation pairs under a hairline, the mono term in the margin. */
export function FactList({ items }: { items: { term: string; body: React.ReactNode }[] }) {
  return (
    <dl className="m-0" style={{ borderTop: '1px solid var(--rule)' }}>
      {items.map((f) => (
        <div
          key={f.term}
          className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-6 gap-y-1"
          style={{ padding: '1rem 0', borderBottom: '1px solid var(--rule)' }}
        >
          <dt style={{ ...LABEL_STYLE, color: 'var(--ink)', paddingTop: '0.3rem' }}>{f.term}</dt>
          <dd className="m-0" style={{ fontSize: '17px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
            {f.body}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Questions and answers, each under a hairline. Pair with FAQ JSON-LD on the page. */
export function QAList({ items }: { items: { question: string; answer: React.ReactNode }[] }) {
  return (
    <div style={{ borderTop: '1px solid var(--rule)' }}>
      {items.map((q) => (
        <div key={q.question} style={{ padding: '1.25rem 0', borderBottom: '1px solid var(--rule)' }}>
          <h3 style={H4_STYLE}>{q.question}</h3>
          <Body style={{ marginTop: '0.5rem' }}>{q.answer}</Body>
        </div>
      ))}
    </div>
  );
}
