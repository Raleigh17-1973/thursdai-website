// Copy gate: fails if user-facing text in src/ or content/ contains an em dash
// or a banned word (see scripts/lib/copy-rules.mjs). Comments are ignored.
// Oxford commas are reported as warnings only: the heuristic cannot tell a
// list from an appositive, so it never fails the build.
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import {
  extractTsStrings,
  extractMdxLines,
  isDraft,
  findViolations,
  findOxfordCommas,
} from './lib/copy-rules.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIRS = ['src', 'content'];
const TS_EXT = new Set(['.ts', '.tsx']);
const MD_EXT = new Set(['.mdx', '.md']);

// Every entry needs a reason. Paths are POSIX, relative to the repo root.
// `match` narrows the entry to strings containing that text.
const ALLOWLIST = [
  // Example: { file: 'src/app/foo/page.tsx', rule: 'planned', match: 'Planned maintenance', reason: '...' },
];

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function main() {
  const items = [];
  const skippedDrafts = [];
  let scanned = 0;
  for (const dir of DIRS) {
    for (const full of walk(path.join(ROOT, dir))) {
      const file = path.relative(ROOT, full).split(path.sep).join('/');
      const ext = path.extname(file);
      if (file.endsWith('.d.ts')) continue;
      const source = readFileSync(full, 'utf8');
      if (TS_EXT.has(ext)) {
        for (const s of extractTsStrings(source, file)) items.push({ file, ...s });
      } else if (MD_EXT.has(ext)) {
        if (isDraft(source)) {
          skippedDrafts.push(file);
          continue;
        }
        for (const s of extractMdxLines(source)) items.push({ file, ...s });
      } else {
        continue;
      }
      scanned++;
    }
  }

  const warnings = findOxfordCommas(items);
  if (warnings.length) {
    console.warn(`check-copy: ${warnings.length} possible Oxford comma(s) (warning only, review by eye):`);
    for (const w of warnings) console.warn(`  ${w.file}:${w.line}  "${w.match}"`);
  }
  if (skippedDrafts.length) {
    console.log(`check-copy: skipped ${skippedDrafts.length} draft(s) (not built): ${skippedDrafts.join(', ')}`);
  }

  const violations = findViolations(items, ALLOWLIST);
  if (violations.length) {
    console.error(`check-copy: ${violations.length} violation(s) in user-facing text:`);
    for (const v of violations) {
      const excerpt = v.text.trim().replace(/\s+/g, ' ').slice(0, 100);
      console.error(`  ${v.file}:${v.line}  ${v.label}  "${excerpt}"`);
    }
    console.error('Fix the copy, or add an ALLOWLIST entry with a reason in scripts/check-copy.mjs.');
    process.exit(1);
  }
  console.log(`check-copy: OK (${scanned} files, ${items.length} strings)`);
}

main();
