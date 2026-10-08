import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import {
  CAPTION_PREFIX,
  CAPTURES,
  DECISION_LEDGER,
  RECORD_VIEW_APP,
  RECORD_VIEW_PROVENANCE,
  RECORD_VIEW_SUMMARY,
} from '@/components/media/captures';

// The captures are staging screens from a fictional tenant. These tests hold the captions and
// alt text to what the images can honestly support (outputs/product-captures/captures.md).

function pngSize(file: string): { width: number; height: number } {
  const buf = readFileSync(file);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

describe('product captures', () => {
  it.each(CAPTURES.map((c) => [c.src, c]))('%s exists with the declared size', (_src, c) => {
    const file = path.join(process.cwd(), 'public', c.src);
    expect(existsSync(file)).toBe(true);
    expect(pngSize(file)).toEqual({ width: c.width, height: c.height });
  });

  it('every caption names the fictional tenant and staging first', () => {
    for (const c of CAPTURES) expect(c.caption.startsWith(CAPTION_PREFIX)).toBe(true);
  });

  it('record views say they are not signed and never call themselves signed receipts', () => {
    for (const c of [RECORD_VIEW_SUMMARY, RECORD_VIEW_APP, RECORD_VIEW_PROVENANCE]) {
      expect(c.caption).toContain('Staging does not sign records');
      expect(c.caption).toContain('not signed');
      expect(`${c.caption} ${c.alt}`).not.toMatch(/signed receipt/i);
    }
  });

  it('the dashboard caption says the EU AI Act panel is not a compliance report', () => {
    expect(DECISION_LEDGER.caption).toContain('it is not a compliance report');
  });

  it('no caption or alt text claims signing, compliance reporting or Local Law 144 reporting', () => {
    for (const c of CAPTURES) {
      const text = `${c.caption} ${c.alt}`;
      expect(text).not.toMatch(/audit pack/i);
      expect(text).not.toMatch(/ll144|local law 144/i);
      expect(c.alt).not.toMatch(/compliance/i);
      // "signed" may appear only as "not signed", "sign records" or "signature".
      expect(c.alt.replace(/not signed/gi, '')).not.toMatch(/\bsigned\b/i);
    }
  });
});
