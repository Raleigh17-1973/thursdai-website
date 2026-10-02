import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { generateKeyPairSync, sign } from 'node:crypto';
import { canonicalize, hashReceipt, verifyFixture, verifySigned, FIXTURE, type SignedFixture } from '@/lib/receipts/verify';
import { PUBLIC_KEY_PEM } from '@/lib/receipts/public-key';

const clone = (): SignedFixture => JSON.parse(JSON.stringify(FIXTURE));

describe('canonicalize', () => {
  it('is stable regardless of key order and has no whitespace', () => {
    expect(canonicalize({ b: 1, a: { d: [2, { z: 1, y: 2 }], c: 'x' } })).toBe(
      '{"a":{"c":"x","d":[2,{"y":2,"z":1}]},"b":1}',
    );
    expect(canonicalize({ a: 1, b: 2 })).toBe(canonicalize({ b: 2, a: 1 }));
  });
});

describe('hashReceipt', () => {
  it('matches the stored hash and is hex sha256', () => {
    expect(hashReceipt(FIXTURE.receipt)).toBe(FIXTURE.sha256);
    expect(FIXTURE.sha256).toMatch(/^[0-9a-f]{64}$/);
  });
});

describe('verifyFixture', () => {
  it('accepts the real fixture', () => {
    const r = verifyFixture(FIXTURE.receipt.id);
    expect(r.valid).toBe(true);
    expect(r.sha256).toBe(FIXTURE.sha256);
  });

  it('rejects an unknown id without leaking details', () => {
    expect(verifyFixture('rcpt_000000000000')).toEqual({ id: 'rcpt_000000000000', sha256: '', signed_at: '', valid: false });
  });

  it('rejects a tampered receipt field', () => {
    const f = clone();
    (f.receipt.decision as { outcome: string }).outcome = 'reject';
    expect(verifySigned(f, f.receipt.id).valid).toBe(false);
  });

  it('rejects a tampered receipt even if the hash is recomputed', () => {
    const f = clone();
    (f.receipt.decision as { outcome: string }).outcome = 'reject';
    f.sha256 = hashReceipt(f.receipt);
    expect(verifySigned(f, f.receipt.id).valid).toBe(false);
  });

  it('rejects a signature made by a different key', () => {
    const f = clone();
    const other = generateKeyPairSync('ed25519');
    f.signature = sign(null, Buffer.from(canonicalize(f.receipt)), other.privateKey).toString('base64');
    expect(verifySigned(f, f.receipt.id).valid).toBe(false);
  });
});

describe('committed public key', () => {
  it('matches public-key.pem', () => {
    const pem = readFileSync(new URL('../../../src/lib/receipts/public-key.pem', import.meta.url), 'utf8');
    expect(PUBLIC_KEY_PEM).toBe(pem);
  });
});
