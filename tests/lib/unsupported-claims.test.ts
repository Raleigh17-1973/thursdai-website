import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

// Phrases the 2026-10-02 truth pass removed because the product does not do, hold or offer
// the thing. They must not come back through a copy edit. Each needs a source before it can be
// reintroduced: the buyer-evidence claim ladder in the platform repo, not a draft or a plan.
const WITHDRAWN: { phrase: RegExp; why: string }[] = [
  { phrase: /HIPAA/i, why: 'no HIPAA attestation or audit-log-per-PHI-read exists' },
  { phrase: /GovCloud/i, why: 'no GovCloud deployment exists' },
  { phrase: /dedicated[ -]tenant|single-tenant|on-premises/i, why: 'one multi-tenant deployment; dedicated databases are designed, not offered' },
  { phrase: /certificate pinning|CMEK|(?:on|for) every deployment/i, why: 'dedicated deployments and customer-managed keys are the target model, designed and being built, not offered today (OD-3, 2026-10-02)' },
  { phrase: /Trusted by/i, why: 'there are no customers to be trusted by' },
  { phrase: /Merkle|cannot be altered|cannot be backdated/i, why: 'anchoring is built but off, and not independently verifiable yet' },
  { phrase: /ThursdaiClient|thy_live_|api\.getthursdai\.com/, why: 'no public API or published SDK exists' },
  { phrase: /pricing_floor|pii_block|legal_review_gate|required_attribution/, why: 'not primitives in the policy engine' },
  { phrase: /Real signatures/, why: 'the sample is signed with a demonstration key' },
  { phrase: /rules the model cannot break/i, why: 'policies are evaluated at defined points; no hard fence' },
];

const SRC = path.resolve(__dirname, '..', '..', 'src');

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.(ts|tsx)$/.test(entry.name) ? [full] : [];
  });
}

describe('withdrawn claims', () => {
  const files = sourceFiles(SRC).map((file) => ({
    name: path.relative(SRC, file).split(path.sep).join('/'),
    text: readFileSync(file, 'utf8'),
  }));

  it('should find the source tree it scans', () => {
    expect(files.length).toBeGreaterThan(50);
  });

  for (const { phrase, why } of WITHDRAWN) {
    it(`should not reintroduce ${phrase} (${why})`, () => {
      const hits = files.filter((f) => phrase.test(f.text)).map((f) => f.name);
      expect(hits).toEqual([]);
    });
  }
});
