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
  // App truth pass (2026-10-13) and owner rulings: no hosting region claim until the planned move
  // is verified; decision records are stored in clear; there is no deletion at exit; no SDK is
  // published. The US East rule is case-sensitive, so a lowercase AWS region id is not caught.
  { id: 'us-east', re: /\bUS[- ]East\b/, label: '"US East" (no hosting region claim until the move is verified)' },
  { id: 'eu-west', re: /\bEU[- ]West\b/i, label: '"EU West" (no hosting region claim until the move is verified)' },
  { id: 'amsterdam', re: /\bAmsterdam\b/i, label: '"Amsterdam" (no hosting region claim until the move is verified)' },
  { id: 'pseudonymised', re: /pseudonymi[sz]/i, label: '"pseudonymised" (decision records are not pseudonymised)' },
  { id: 'de-identified', re: /de-identif/i, label: '"de-identified" (hashing a subject id is not de-identification)' },
  { id: 'deletion-certificate', re: /deletion certificates?/i, label: '"deletion certificate" (not implemented)' },
  { id: 'encrypted-ledger', re: /encrypted (?:decision )?ledger/i, label: '"encrypted ledger" (the ledger has no application-level encryption)' },
  { id: 'install-sdk', re: /install (?:our|the Thursdai) SDK/i, label: '"install our SDK" (no SDK is published)' },
  // Ledger claims (2026-10-13): the chain link is covered by neither the row hash nor the signature
  // and no anchors exist, so the ledger is tamper-evident for content changes only. It cannot yet
  // show that a record was removed. Lift these when chain v2 ships and anchors are live. Each rule
  // targets a claim phrase, so honest copy ("does not yet prove that no record has been removed",
  // "blocks updates and deletes") passes.
  { id: 'tamper-proof', re: /\btamper[- ]?proof/i, label: '"tamper-proof" (say "tamper-evident for content changes")' },
  {
    id: 'detects-deletion',
    re: /\bdetect(?:s|ed|ing|able)?\s+(?:any\s+|a\s+|every\s+)?(?:deletions?|removals?|deleted|removed|missing\s+records?)\b|\b(?:deletions?|removals?)\s+(?:is|are|would\s+be|becomes?)\s+(?:detectable|detected|evident|visible)\b|\bmissing\s+records?\s+(?:shows?\s+up|is\s+detected|would\s+show|stands?\s+out)\b/i,
    label: 'deletion detection claim (the chain cannot yet show a removed record)',
  },
  {
    id: 'removal-breaks-chain',
    re: /\b(?:remov|delet)\w*\b[^.]{0,80}\b(?:breaks?\s+the\s+chain|chain\s+(?:breaks|is\s+broken|would\s+break))\b/i,
    label: 'removal breaks the chain (it does not until chain v2)',
  },
  {
    id: 'completeness',
    re: /\bprov(?:e|es|en|ing)\s+(?:its\s+|the\s+)?completeness\b|\bprov(?:e|es|en|ing)\s+(?:that\s+)?(?:the\s+|a\s+|your\s+)?(?:history|ledger|record|trail|audit\s+trail)\s+is\s+complete\b|\bgap-?free\b|\bno\s+gaps\s+in\s+(?:the\s+|your\s+)?(?:ledger|chain|history|record|audit\s+trail)\b/i,
    label: 'completeness claim (the ledger cannot yet prove no record is missing)',
  },
  {
    id: 'cannot-be-deleted',
    re: /\b(?:cannot|can['’]?t|can\s+not)\s+be\s+(?:deleted|removed|erased)\b|\bimpossible\s+to\s+(?:delete|remove|erase)\b|\b(?:deleted|removed|erased)\s+(?:undetected|without\s+(?:detection|a\s+trace|anyone\s+knowing))\b/i,
    label: 'records cannot be deleted or removed undetected (only the application blocks deletes)',
  },
  // Owner rulings (2026-10-13): no claims about deletion at exit or contract end, data deleted after
  // a set period, or insurance cover. "Insurance" as a customer industry ("hiring, credit or
  // insurance", "insurance pricing") is legitimate copy, so the insurance rule only targets
  // Thursdai's own cover.
  {
    id: 'deletion-at-exit',
    re: /\bdelet(?:e|ed|es|ion|ing)\b[^.]{0,60}\b(?:at|on|after)\s+(?:the\s+)?(?:contract\s+end|end\s+of\s+(?:the\s+|your\s+)?(?:contract|pilot|term)|exit)\b/i,
    label: 'deletion at contract end or exit (no exit terms are published)',
  },
  {
    id: 'deleted-after-days',
    re: /\bdeleted\s+(?:after|within)\s+\d+\s+days\b/i,
    label: '"deleted after N days" (no retention period is published)',
  },
  {
    id: 'insurance',
    re: /\b(?:is|are|be|being|fully|we['’]re|we\s+are|Thursdai\s+is)\s+insured\b|\binsurance\s+(?:cover(?:age)?|polic(?:y|ies))\b|\b(?:cyber|liability|indemnity|professional|E&O|errors\s+and\s+omissions)\s+insurance\b|\b(?:we|Thursdai)\s+(?:carry|carries|hold|holds|have|has|maintain|maintains)\b[^.]{0,40}\binsurance\b/i,
    label: 'insurance claim (make no claim about Thursdai insurance)',
  },
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
