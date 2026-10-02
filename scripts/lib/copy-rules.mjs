// Pure rules behind scripts/check-copy.mjs, kept separate so they can be unit
// tested without walking the repo.
import ts from 'typescript';

// House style and the October 2026 plan: no em dashes, and none of the words
// the benchmark called out as apology or retired positioning.
export const BANNED = [
  { id: 'em-dash', re: /—|&mdash;|&#8212;|&#x2014;/i, label: 'em dash' },
  { id: 'substrate', re: /\bsubstrate\b/i, label: '"substrate" (retired positioning)' },
  { id: 'aidr', re: /\bAIDR\b/i, label: '"AIDR" (retired term)' },
  { id: 'illustrative', re: /\billustrative\b/i, label: '"Illustrative" (apology label)' },
  // Case-sensitive on purpose: the status label is the problem, not the verb
  // ("as planned" in prose is fine).
  { id: 'planned', re: /\bPlanned\b|\bPLANNED\b/, label: '"Planned" (status label)' },
  { id: 'will-live-here', re: /will live here/i, label: '"will live here" (placeholder copy)' },
];

// Warning only. Three or more comma-separated items (each up to four words)
// with a comma before the final "and" / "or".
const OXFORD_RE = /\b[\w'’-]+(?: [\w'’-]+){0,3}, [\w'’-]+(?: [\w'’-]+){0,3}, (?:and|or) [\w'’-]+/g;

/**
 * Text a visitor can read in a TS/TSX file: string literals, template text and
 * JSX text. Comments are trivia and never reach the walk; import specifiers
 * are skipped.
 * @returns {{ line: number, text: string }[]}
 */
export function extractTsStrings(source, fileName = 'file.tsx') {
  const kind = fileName.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sf = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, kind);
  const out = [];
  const push = (node, text) => {
    if (!text.trim()) return;
    const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
    out.push({ line: line + 1, text });
  };
  const visit = (node) => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) return;
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      ts.forEachChild(node, visit);
      return;
    }
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      push(node, node.text);
    } else if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      push(node, node.text);
    } else if (ts.isJsxText(node)) {
      // Raw text keeps entities such as &mdash; visible to the rules.
      push(node, node.getText(sf));
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}

/**
 * Text in an MDX/MD file with comments removed. Frontmatter and code blocks
 * stay: titles, summaries and code samples are all rendered.
 * @returns {{ line: number, text: string }[]}
 */
export function extractMdxLines(source) {
  const blanked = source
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));
  return blanked
    .split('\n')
    .map((text, i) => ({ line: i + 1, text }))
    .filter((l) => l.text.trim());
}

/** Draft MDX is never built into a page (src/lib/velite.ts filters it). */
export function isDraft(source) {
  const fm = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return Boolean(fm && /^draft:\s*true\s*$/m.test(fm[1]));
}

/**
 * @param {{ file: string, line: number, text: string }[]} items
 * @param {{ file: string, rule: string, match?: string, reason: string }[]} allowlist
 */
export function findViolations(items, allowlist = []) {
  const violations = [];
  for (const item of items) {
    for (const rule of BANNED) {
      if (!rule.re.test(item.text)) continue;
      const allowed = allowlist.some(
        (a) => a.file === item.file && a.rule === rule.id && (!a.match || item.text.includes(a.match)),
      );
      if (!allowed) violations.push({ ...item, rule: rule.id, label: rule.label });
    }
  }
  return violations;
}

export function findOxfordCommas(items) {
  const warnings = [];
  for (const item of items) {
    for (const m of item.text.matchAll(OXFORD_RE)) warnings.push({ ...item, match: m[0] });
  }
  return warnings;
}
