import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { artifactSize, sampleArtifacts } from '@/lib/artifacts';

const root = process.cwd();

describe('sample artifacts', () => {
  it('links only files that are actually served, each with a real size', () => {
    const artifacts = sampleArtifacts();
    expect(artifacts).toHaveLength(3);
    for (const a of artifacts) {
      expect(existsSync(path.join(root, 'public', a.href))).toBe(true);
      expect(a.meta.some((m) => /^\d+ KB$/.test(m))).toBe(true);
    }
  });

  it('returns no size for a missing file rather than inventing one', () => {
    expect(artifactSize('does-not-exist.pdf')).toBe('');
  });
});

// Copy gates for the home page (plan Items 4 and 5). Read as source so they run without a
// browser; the page is server-rendered from these literals.
describe('home page copy', () => {
  const page = readFileSync(path.join(root, 'src/app/(marketing)/page.tsx'), 'utf8');
  const band = readFileSync(path.join(root, 'src/components/home/ProofBand.tsx'), 'utf8');
  const copy = page + band;

  it('is exactly seven sections', () => {
    expect(page.match(/<Section\b/g)).toHaveLength(7);
  });

  it('carries the named constraints, including the scope sentence', () => {
    expect(page).toContain('not a chatbot, not an auditor and not a model');
    expect(page).toContain('Copilot is better');
    expect(page).toContain('proof of what happened, not that it was right.');
  });

  it('states the logging duty with the right articles and links its sources', () => {
    expect(band).toMatch(/Article 12/);
    expect(band).toMatch(/Article 26\(6\)/);
    expect(band).toMatch(/at least six months/);
    expect(band).toContain("href=\"/trust/annex-iii\"");
    expect(band).toContain('eur-lex.europa.eu');
    // The plan's draft wording attributed the six months to Annex III itself; it does not.
    expect(copy).not.toMatch(/Annex III requires/);
  });

  it('shows no partner counts, endorsers or logos (decision D8)', () => {
    expect(copy).not.toMatch(/design partners? in pilot|LogoWall|Trusted by/i);
  });

  it('uses no em dashes', () => {
    expect(copy).not.toContain('—');
  });
});
