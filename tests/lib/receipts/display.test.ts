import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { SAMPLE_DISPLAY, SIGNED_FIXTURE, decisionSentence, formatUtc, policySummary, shortHash, tamperedId } from '@/lib/receipts/display';
import { verifyFixture } from '@/lib/receipts/verify';
import { SAMPLE_HIRING_RECEIPT, SAMPLE_HIRING_RECEIPT_COMPACT } from '@/components/receipt/sample';
import { SAMPLE_LABEL_SIGNED } from '@/config/site';

describe('formatUtc', () => {
  it('formats an ISO timestamp with and without seconds', () => {
    expect(formatUtc('2026-09-16T14:32:07Z')).toBe('2026-09-16 14:32:07 UTC');
    expect(formatUtc('2026-09-16T14:32:07Z', { seconds: false })).toBe('2026-09-16 14:32 UTC');
  });
  it('returns unparseable input unchanged', () => {
    expect(formatUtc('yesterday')).toBe('yesterday');
  });
});

describe('shortHash', () => {
  it('keeps the first 6 and last 4 hex characters', () => {
    expect(shortHash('9c455f3f611903634fd20b85674033671e6d47e5f234c2235055e21a56eb2f30')).toBe('9c455f…2f30');
    expect(shortHash('sha256:abcdef')).toBe('abcdef');
  });
});

describe('tamperedId', () => {
  it('changes exactly one character and never returns the original', () => {
    const id = SIGNED_FIXTURE.receipt.id;
    const t = tamperedId(id);
    expect(t).not.toBe(id);
    expect(t.length).toBe(id.length);
    expect(t.slice(0, -1)).toBe(id.slice(0, -1));
    expect(tamperedId('abcf')).toBe('abce');
  });
  it('fails verification while the real id passes', () => {
    expect(verifyFixture(SIGNED_FIXTURE.receipt.id).valid).toBe(true);
    expect(verifyFixture(tamperedId(SIGNED_FIXTURE.receipt.id)).valid).toBe(false);
  });
});

describe('sample receipt display', () => {
  it('derives every surface value from the signed fixture', () => {
    expect(SAMPLE_DISPLAY.id).toBe('rcpt_7f3a9c21b84e');
    expect(SAMPLE_DISPLAY.fingerprint).toBe('9c455f…2f30');
    expect(SAMPLE_DISPLAY.recordedAt).toBe('2026-09-16 14:32:07 UTC');
    expect(SAMPLE_DISPLAY.decision).toBe(decisionSentence());
    expect(SAMPLE_DISPLAY.decision.endsWith('.')).toBe(true);
    expect(policySummary().allPassed).toBe(true);
  });

  it('feeds the hero and demo receipts with the real id, hash and the signed label', () => {
    for (const r of [SAMPLE_HIRING_RECEIPT, SAMPLE_HIRING_RECEIPT_COMPACT]) {
      expect(r.id).toBe(SIGNED_FIXTURE.receipt.id);
      expect(r.hash).toBe(SIGNED_FIXTURE.sha256);
      expect(r.label).toBe(SAMPLE_LABEL_SIGNED);
      expect(r.source.system).toBe(SIGNED_FIXTURE.receipt.source.system);
    }
    expect(SAMPLE_HIRING_RECEIPT_COMPACT.fields.length).toBeLessThan(SAMPLE_HIRING_RECEIPT.fields.length);
  });

  it('matches the downloadable JSON artifact', () => {
    const artifact = JSON.parse(readFileSync('public/artifacts/northwind-sample-receipt.json', 'utf8'));
    expect(artifact.sha256).toBe(SIGNED_FIXTURE.sha256);
    expect(artifact.receipt.id).toBe(SIGNED_FIXTURE.receipt.id);
  });

  it('writes no em dashes into display strings', () => {
    for (const v of Object.values(SAMPLE_DISPLAY)) {
      expect(JSON.stringify(v)).not.toContain(String.fromCharCode(0x2014));
    }
  });
});
