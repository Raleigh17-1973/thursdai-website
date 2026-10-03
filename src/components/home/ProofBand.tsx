import React from 'react';
import Link from 'next/link';
import { H3_STYLE, LABEL_STYLE } from '@/components/typography/scale';
import { SAMPLE_LABEL_SIGNED } from '@/config/site';
import { sampleArtifacts } from '@/lib/artifacts';

// Proof band (plan Item 4.1, decision D8): proof that can be checked, not claimed.
// Two cells on one ink rule: the regulatory duty with its articles, and the signed sample
// artifacts with a live verifier. No partner tiles, counts or endorsers until real
// permissions exist. Every statement links to its source.
//
// Designed for two cells: equal halves split by a hairline, so it reads as a complete
// spread rather than a row missing its third item.

export const EU_AI_ACT_URL = 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj';

const CELL_BODY: React.CSSProperties = {
  margin: 0,
  fontSize: '17px',
  lineHeight: 1.6,
  color: 'var(--color-text-secondary)',
};

const LINK_ROW: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem 1.5rem',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  fontSize: '15px',
  fontWeight: 500,
};

const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

function Cell({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 py-10 md:py-12 md:px-12 md:first:pl-0 md:last:pr-0">
      <p className="m-0" style={LABEL_STYLE}>
        {label}
      </p>
      <h3 style={H3_STYLE}>{title}</h3>
      {children}
    </div>
  );
}

export function ProofBand() {
  const artifacts = sampleArtifacts();
  const pdf = artifacts.find((a) => a.href.endsWith('receipt.pdf'));
  const json = artifacts.find((a) => a.href.endsWith('.json'));
  const pack = artifacts.find((a) => a.href.endsWith('audit-pack.pdf'));

  return (
    <>
      <h2 className="sr-only">Proof you can check</h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 md:divide-x divide-y md:divide-y-0 divide-[var(--rule)]"
        style={{ borderTop: '1px solid var(--ink)' }}
      >
        <Cell label="EU AI Act · Annex III, Art. 12, Art. 26(6)" title="At least six months of logs.">
          <p style={CELL_BODY}>
            AI used in hiring, credit scoring and life and health insurance pricing is high-risk under
            Annex III. Article 12 requires those systems to be built to log events automatically, and
            Article 26(6) requires the businesses that deploy them to keep the logs under their control
            for at least six months.
          </p>
          <ul style={LINK_ROW}>
            <li>
              <a href={EU_AI_ACT_URL} rel="noopener noreferrer" target="_blank" style={UNDERLINED}>
                Read the Act on EUR-Lex<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </Cell>

        <Cell label="Artifacts · Signed sample" title="A receipt you can check yourself.">
          <p style={CELL_BODY}>
            Download a signed sample receipt and the four-page audit pack built from it, then verify the
            signature live in the demo. No login and no need to trust us.
          </p>
          <ul style={LINK_ROW}>
            {[pdf, json, pack].map((a) =>
              a ? (
                <li key={a.href}>
                  <a href={a.href} download style={UNDERLINED}>
                    {a.title}
                  </a>
                  <span style={{ ...LABEL_STYLE, marginLeft: '0.5rem', color: 'var(--ink-3)', textTransform: 'none' }}>
                    {a.meta.filter((m) => /KB$/.test(m)).join('')}
                  </span>
                </li>
              ) : null,
            )}
            <li>
              <Link href="/demo#receipt" style={UNDERLINED}>
                Verify it live
              </Link>
            </li>
          </ul>
          <p className="m-0" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.4, color: 'var(--ink-3)' }}>
            {SAMPLE_LABEL_SIGNED}
          </p>
        </Cell>
      </div>
    </>
  );
}
