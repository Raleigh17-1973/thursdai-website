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
