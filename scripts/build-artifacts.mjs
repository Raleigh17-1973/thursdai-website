// Builds the downloadable sample artifacts in public/artifacts from the signed fixture.
// Run with: npm run build:artifacts
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'artifacts');
mkdirSync(outDir, { recursive: true });

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://getthursdai.com').replace(/\/+$/, '');
const fixture = JSON.parse(readFileSync(join(root, 'src/lib/receipts/fixture.json'), 'utf8'));
const publicPem = readFileSync(join(root, 'src/lib/receipts/public-key.pem'), 'utf8');
const { receipt } = fixture;
const verifyUrl = `${SITE_URL}/api/verify?id=${receipt.id}`;
const FOOTER = 'Sample tenant: Northwind Financial (fictional). For illustration of the format only.';

// JSON artifact
writeFileSync(
  join(outDir, 'northwind-sample-receipt.json'),
  JSON.stringify({ ...fixture, public_key_pem: publicPem, verify_url: verifyUrl }, null, 2) + '\n',
);

// PDF styling
const PAPER = rgb(0xf7 / 255, 0xf5 / 255, 0xf0 / 255);
const INK = rgb(0x14 / 255, 0x12 / 255, 0x0f / 255);
const SECOND = rgb(0x4e / 255, 0x4a / 255, 0x44 / 255);
const AMBER = rgb(0xe8 / 255, 0xa3 / 255, 0x4a / 255);
const HAIR = rgb(0xd9 / 255, 0xd5 / 255, 0xcc / 255);
const W = 612, H = 792, M = 64, CW = W - 2 * M;

const fontDir = join(root, 'node_modules/geist/dist/fonts');

async function load(pdf) {
  pdf.registerFontkit(fontkit);
  return {
    reg: await pdf.embedFont(readFileSync(join(fontDir, 'geist-sans/Geist-Regular.ttf')), { subset: true }),
    med: await pdf.embedFont(readFileSync(join(fontDir, 'geist-sans/Geist-Medium.ttf')), { subset: true }),
    mono: await pdf.embedFont(readFileSync(join(fontDir, 'geist-mono/GeistMono-Regular.ttf')), { subset: true }),
  };
}

function wrap(text, font, size, width) {
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    const t = line ? line + ' ' + word : word;
    if (font.widthOfTextAtSize(t, size) > width && line) { lines.push(line); line = word; } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

class Doc {
  constructor(pdf, f) { this.pdf = pdf; this.f = f; this.pages = []; }
  newPage() {
    const page = this.pdf.addPage([W, H]);
    page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: PAPER });
    this.pages.push(page);
    this.page = page; this.y = H - M;
    return page;
  }
  label(text, y = this.y) {
    this.page.drawText(text.toUpperCase(), { x: M, y, size: 7.5, font: this.f.mono, color: SECOND });
  }
  rule(y = this.y, color = HAIR, x = M, width = CW) {
    this.page.drawLine({ start: { x, y }, end: { x: x + width, y }, thickness: 0.5, color });
  }
  heading(text, size = 20) {
    this.page.drawText(text, { x: M, y: this.y - size, size, font: this.f.med, color: INK });
    this.y -= size + 14;
  }
  para(text, { size = 10, font = this.f.reg, color = SECOND, gap = 6, x = M, width = CW } = {}) {
    for (const l of wrap(text, font, size, width)) {
      this.page.drawText(l, { x, y: this.y - size, size, font, color });
      this.y -= size * 1.55;
    }
    this.y -= gap;
  }
  // Two-column label/value row separated by a hairline.
  row(label, value, { mono = false } = {}) {
    const size = 9.5, lw = 150;
    const font = mono ? this.f.mono : this.f.reg;
    const lines = wrap(value, font, mono ? 8.5 : size, CW - lw);
    // Wrap long labels within the label column, measured with the embedded font.
    const labelLines = wrap(label.toUpperCase(), this.f.mono, 7.5, lw - 14);
    const count = Math.max(lines.length, labelLines.length);
    this.rule(this.y);
    const top = this.y - 14;
    labelLines.forEach((l, i) =>
      this.page.drawText(l, { x: M, y: top - i * 11, size: 7.5, font: this.f.mono, color: SECOND }));
    lines.forEach((l, i) =>
      this.page.drawText(l, { x: M + lw, y: top - i * 13, size: mono ? 8.5 : size, font, color: INK }));
    this.y -= 12 + count * 13 + 4;
  }
  seal(y) {
    // The only amber element in the document.
    this.page.drawRectangle({ x: M, y: y, width: 120, height: 3, color: AMBER });
    this.page.drawText('SIGNED', { x: M, y: y - 16, size: 11, font: this.f.med, color: INK });
    this.page.drawText(`Ed25519  ${fixture.key_id}  ${fixture.signed_at}`, {
      x: M + 60, y: y - 15.5, size: 8, font: this.f.mono, color: SECOND,
    });
  }
  footers() {
    const n = this.pages.length;
    this.pages.forEach((p, i) => {
      p.drawLine({ start: { x: M, y: 52 }, end: { x: W - M, y: 52 }, thickness: 0.5, color: HAIR });
      p.drawText(FOOTER, { x: M, y: 38, size: 7.5, font: this.f.reg, color: SECOND });
      const t = `Page ${i + 1} of ${n}`;
      p.drawText(t, { x: W - M - this.f.reg.widthOfTextAtSize(t, 7.5), y: 38, size: 7.5, font: this.f.reg, color: SECOND });
    });
  }
}

const labelize = (s) => s.replace(/_/g, ' ');
const shortHash = `${fixture.sha256.slice(0, 16)}...${fixture.sha256.slice(-8)}`;

function receiptBody(d, { withSeal }) {
  d.label('AI Receipt');
  d.y -= 10;
  d.heading(receipt.decision.summary, 18);
  d.para(receipt.tenant, { size: 9 });
  d.row('Receipt id', receipt.id, { mono: true });
  d.row('Recorded at', receipt.recorded_at, { mono: true });
  d.row('Decision type', labelize(receipt.decision.type));
  d.row('Outcome', labelize(receipt.decision.outcome));
  d.row('Reported confidence', `${Math.round(receipt.decision.confidence * 100)} percent, as reported by the source system`);
  d.row('Decision source', `${receipt.source.system} (${labelize(receipt.source.role)})`);
  d.row('Model', `${receipt.source.model} on ${receipt.source.model_host}, version ${receipt.source.version}`);
  d.row('Operated by', receipt.source.operator);
  d.row('Policies evaluated', receipt.policies_evaluated.map((p) => `${p.name}: ${p.result}`).join('; '));
  d.row('Evidence consulted', receipt.evidence.map((e) => e.ref).join('; '));
  d.row('Risk tier', `${receipt.risk.tier} (${receipt.risk.framework})`);
  d.row('Human oversight', `${receipt.human_oversight.reviewer_role}: ${labelize(receipt.human_oversight.action)}`);
  d.row('SHA-256', fixture.sha256, { mono: true });
  d.rule(d.y);
  d.y -= 14;
  d.para(receipt.scope_note, { size: 9 });
  if (withSeal) { d.y -= 14; d.seal(d.y); }
}

async function singleReceipt() {
  const pdf = await PDFDocument.create();
  pdf.setTitle('Northwind sample AI Receipt');
  const d = new Doc(pdf, await load(pdf));
  d.newPage();
  receiptBody(d, { withSeal: true });
  d.footers();
  writeFileSync(join(outDir, 'northwind-sample-receipt.pdf'), await pdf.save());
}

async function auditPack() {
  const pdf = await PDFDocument.create();
  pdf.setTitle('Northwind sample audit pack');
  const d = new Doc(pdf, await load(pdf));

  // 1 cover
  d.newPage();
  d.y = H - 200;
  d.label('Thursdai / Sample audit pack');
  d.y -= 18;
  d.heading('Audit pack', 34);
  d.para('One AI decision, recorded and signed, with the policy checks and evidence behind it.', { size: 12, gap: 24 });
  d.row('Tenant', 'Northwind Financial (fictional)');
  d.row('Scope', 'One hiring screening decision made by an external AI system');
  d.row('Period', '2026-09-01 to 2026-09-30');
  d.row('Receipts included', '1');
  d.row('Prepared', fixture.signed_at, { mono: true });
  d.y -= 20;
  d.para('This pack shows the format only. It records what an AI system decided and what was checked at the time. It makes no claim that any decision was correct or fair.', { size: 9.5 });

  // 2 receipt
  d.newPage();
  receiptBody(d, { withSeal: false });

  // 3 policy + evidence
  d.newPage();
  d.label('Policy evaluation and evidence');
  d.y -= 10;
  d.heading('What was checked', 18);
  d.para('Thursdai evaluated the decision against the policies below before recording it. Thursdai does not make the decision. The decision came from the source system named on the receipt.');
  d.y -= 6;
  for (const p of receipt.policies_evaluated) {
    d.row(p.name, `${p.result.toUpperCase()}. ${p.detail}`);
  }
  d.y -= 18;
  d.label('Evidence consulted');
  d.y -= 8;
  for (const e of receipt.evidence) d.row(labelize(e.kind), e.ref);
  d.y -= 18;
  d.row('Risk classification', `${receipt.risk.tier} risk under ${receipt.risk.framework}`);
  d.row('Human oversight', `${receipt.human_oversight.reviewer_role} followed the recommendation`);

  // 4 signature + verification
  d.newPage();
  d.label('Signature and verification');
  d.y -= 10;
  d.heading('How to verify this receipt', 18);
  d.row('Hash (SHA-256)', fixture.sha256, { mono: true });
  d.row('Algorithm', 'Ed25519 over the canonical JSON of the receipt');
  d.row('Key id', fixture.key_id, { mono: true });
  d.row('Signed at', fixture.signed_at, { mono: true });
  d.row('Verify URL', verifyUrl, { mono: true });
  d.y -= 16;
  d.para('1. Open the verify URL. A valid receipt returns its id, hash and signing time with valid set to true.', { size: 9.5, gap: 2 });
  d.para('2. To check independently, take the receipt object from the accompanying JSON file, serialise it with keys sorted and no whitespace, and compute its SHA-256. It must equal the hash above.', { size: 9.5, gap: 2 });
  d.para('3. Verify the base64 signature over those same bytes using the public key in the JSON file (public_key_pem).', { size: 9.5, gap: 2 });
  d.para('Any change to any field of the receipt changes the hash and invalidates the signature. A valid result proves what was recorded and when. It does not prove the decision was right.', { size: 9.5 });
  d.y -= 20;
  d.seal(d.y);
  d.footers();

  writeFileSync(join(outDir, 'northwind-sample-audit-pack.pdf'), await pdf.save());
}

await singleReceipt();
await auditPack();
console.log(`Built artifacts for ${receipt.id} (${shortHash}) in public/artifacts`);
