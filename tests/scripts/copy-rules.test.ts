import { describe, expect, it } from 'vitest';
import {
  extractTsStrings,
  extractMdxLines,
  isDraft,
  findViolations,
  findOxfordCommas,
} from '../../scripts/lib/copy-rules.mjs';

const ts = (src: string) => extractTsStrings(src, 'x.tsx').map((s) => ({ file: 'x.tsx', ...s }));

describe('extractTsStrings', () => {
  it('ignores line, block and JSX comments', () => {
    const src = [
      '// a comment — with an em dash',
      '/* Illustrative note */',
      'export const A = () => <div>{/* Planned */}ok</div>;',
    ].join('\n');
    expect(findViolations(ts(src))).toEqual([]);
  });

  it('catches string literals, templates and JSX text', () => {
    const src = [
      "const a = 'one — two';",
      'const b = `Illustrative ${a} data`;',
      'export const C = () => <p>The governed substrate</p>;',
      'export const D = () => <p title="Planned">x &mdash; y</p>;',
    ].join('\n');
    const rules = findViolations(ts(src)).map((v) => `${v.line}:${v.rule}`);
    expect(rules).toEqual(['1:em-dash', '2:illustrative', '3:substrate', '4:planned', '4:em-dash']);
  });

  it('skips import specifiers', () => {
    expect(ts("import x from './substrate';")).toEqual([]);
  });
});

describe('banned words', () => {
  it('treats Planned as a label, not the verb', () => {
    const items = [{ file: 'f', line: 1, text: 'It went as planned.' }];
    expect(findViolations(items)).toEqual([]);
  });

  it('bans the claims the 2026-10-13 app truth pass withdrew', () => {
    const items = [
      'Hosted in one US East region.',
      'Hosted in US-East.',
      'Records are pseudonymised before storage.',
      'Subjects are pseudonymized.',
      'Data is de-identified.',
      'You receive a deletion certificate at exit.',
      'An encrypted ledger of every decision.',
      'Install our SDK to get started.',
      'Hosted in EU West.',
      'Data stays in Amsterdam.',
    ].map((text, i) => ({ file: 'f', line: i + 1, text }));
    expect(findViolations(items).map((v) => v.rule)).toEqual([
      'us-east',
      'us-east',
      'pseudonymised',
      'pseudonymised',
      'de-identified',
      'deletion-certificate',
      'deletion-at-exit',
      'encrypted-ledger',
      'install-sdk',
      'eu-west',
      'amsterdam',
    ]);
  });

  it('bans ledger deletion, completeness and tamper-proof claims', () => {
    const items = [
      'A tamper-proof ledger.',
      'Records are tamperproof.',
      'The chain detects any deletion.',
      'Thursdai detects removed records.',
      'A missing record shows up at once.',
      'Deletions are detectable.',
      'If anyone removes a record, the chain breaks.',
      'Deleting one row breaks the chain.',
      'The ledger proves completeness.',
      'It proves the history is complete.',
      'A gap-free audit trail.',
      'There are no gaps in the ledger.',
      'A record cannot be deleted.',
      "Records can't be removed.",
      'It is impossible to delete a receipt.',
      'Nothing can be removed undetected.',
    ].map((text, i) => ({ file: 'f', line: i + 1, text }));
    expect(findViolations(items).map((v) => v.rule)).toEqual([
      'tamper-proof',
      'tamper-proof',
      'detects-deletion',
      'detects-deletion',
      'detects-deletion',
      'detects-deletion',
      'removal-breaks-chain',
      'removal-breaks-chain',
      'completeness',
      'completeness',
      'completeness',
      'completeness',
      'cannot-be-deleted',
      'cannot-be-deleted',
      'cannot-be-deleted',
      'cannot-be-deleted',
    ]);
  });

  it('catches a ledger claim that wraps across JSX lines', () => {
    const src = 'export const A = () => <p>If someone removes a record\n      the chain breaks.</p>;';
    expect(findViolations(ts(src)).map((v) => v.rule)).toEqual(['removal-breaks-chain']);
  });

  it('lets the true ledger copy through', () => {
    const items = [
      'Tamper-evident for content changes.',
      'Changing a record’s content breaks its hash and its signature.',
      'The decision ledger is append-only in the application: an immutability trigger blocks updates and deletes made through it.',
      'The chain does not yet prove that no record has been removed.',
      'This tests a change to one receipt’s content, not whether a record was removed.',
      'Each record’s signature can be checked against Thursdai’s published keys. Chain completeness and anchoring are Thursdai-attested today; an upgraded chain format is planned.',
      'Retention terms are not yet published.',
      'Encrypted daily backups held in AWS.',
      'Have it corrected or deleted.',
      'The cookie it used to set has been removed.',
      'The share of decisions with complete evidence.',
      'The EU AI Act puts a price on that gap.',
      'Every field is signed, so an edit after the fact is detectable.',
    ].map((text, i) => ({ file: 'f', line: i + 1, text }));
    expect(findViolations(items)).toEqual([]);
  });

  it('bans exit deletion, deletion periods and insurance claims', () => {
    const items = [
      'Tenant export and deletion at contract end are in development.',
      'Your data is deleted at exit.',
      'We delete tenant data at the end of the contract.',
      'Backups are deleted after 30 days.',
      'Form data is deleted within 90 days.',
      'You receive a deletion certificate.',
      'Thursdai is insured.',
      'We are fully insured.',
      'We carry cyber liability insurance.',
      'Insurance coverage details are available on request.',
      'Thursdai holds professional indemnity insurance.',
    ].map((text, i) => ({ file: 'f', line: i + 1, text }));
    expect(findViolations(items).map((v) => v.rule)).toEqual([
      'deletion-at-exit',
      'deletion-at-exit',
      'deletion-at-exit',
      'deleted-after-days',
      'deleted-after-days',
      'deletion-certificate',
      'insurance',
      'insurance',
      'insurance',
      'insurance',
      'insurance',
    ]);
  });

  it('lets insurance as a customer industry through', () => {
    const items = [
      'For teams that use AI in hiring, credit or insurance.',
      'Essential private and public services: credit scoring, insurance risk assessment.',
      'AI used in hiring, credit scoring and life and health insurance pricing is high-risk.',
      'Regulated teams putting AI into hiring, lending, insurance or similar decisions.',
    ].map((text, i) => ({ file: 'f', line: i + 1, text }));
    expect(findViolations(items)).toEqual([]);
  });

  it('keeps the US East rule case-sensitive', () => {
    const items = [{ file: 'f', line: 1, text: 'arn:aws:kms:us-east-1' }];
    expect(findViolations(items)).toEqual([]);
  });

  it('honours an allowlist entry scoped by file, rule and match', () => {
    const items = [{ file: 'f', line: 1, text: 'AIDR spec' }];
    expect(findViolations(items, [{ file: 'f', rule: 'aidr', match: 'AIDR spec', reason: 'test' }])).toEqual([]);
    expect(findViolations(items, [{ file: 'g', rule: 'aidr', reason: 'test' }])).toHaveLength(1);
  });
});

describe('mdx', () => {
  it('drops MDX and HTML comments but keeps frontmatter', () => {
    const src = '---\ntitle: "A — B"\n---\n{/* will live here */}\n<!-- Illustrative -->\nBody';
    const items = extractMdxLines(src).map((s) => ({ file: 'p.mdx', ...s }));
    expect(findViolations(items).map((v) => v.rule)).toEqual(['em-dash']);
  });

  it('detects drafts from frontmatter only', () => {
    expect(isDraft('---\ndraft: true\ntitle: x\n---\nbody')).toBe(true);
    expect(isDraft('---\ntitle: x\n---\ndraft: true')).toBe(false);
  });
});

describe('findOxfordCommas', () => {
  it('flags a serial comma after three items and not a two-item list', () => {
    const items = [
      { file: 'f', line: 1, text: 'Legal, finance, and engineering.' },
      { file: 'f', line: 2, text: 'Legal, finance and engineering.' },
    ];
    expect(findOxfordCommas(items).map((w) => w.line)).toEqual([1]);
  });
});
