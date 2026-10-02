import { createHash, createPublicKey, verify } from 'node:crypto';
import fixtureJson from './fixture.json';
import { PUBLIC_KEY_PEM } from './public-key';

export interface SignedFixture {
  receipt: Record<string, unknown> & { id: string };
  sha256: string;
  signature: string;
  signed_at: string;
  key_id: string;
}

export interface VerifyResult {
  id: string;
  sha256: string;
  signed_at: string;
  valid: boolean;
}

/** Deterministic JSON: object keys sorted, no whitespace. */
export function canonicalize(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map(canonicalize).join(',') + ']';
  const obj = value as Record<string, unknown>;
  return (
    '{' +
    Object.keys(obj)
      .sort()
      .map((k) => JSON.stringify(k) + ':' + canonicalize(obj[k]))
      .join(',') +
    '}'
  );
}

export function hashReceipt(receipt: unknown): string {
  return createHash('sha256').update(canonicalize(receipt), 'utf8').digest('hex');
}

/** Checks an arbitrary fixture against an id and public key. Pure and testable. */
export function verifySigned(
  fixture: SignedFixture,
  id: string,
  publicKeyPem: string = PUBLIC_KEY_PEM,
): VerifyResult {
  const invalid: VerifyResult = { id, sha256: '', signed_at: '', valid: false };
  try {
    if (fixture.receipt.id !== id) return invalid;
    const recomputed = hashReceipt(fixture.receipt);
    if (recomputed !== fixture.sha256) return invalid;
    const ok = verify(
      null,
      Buffer.from(canonicalize(fixture.receipt), 'utf8'),
      createPublicKey(publicKeyPem),
      Buffer.from(fixture.signature, 'base64'),
    );
    if (!ok) return invalid;
    return { id, sha256: fixture.sha256, signed_at: fixture.signed_at, valid: true };
  } catch {
    return invalid;
  }
}

/** Unknown or tampered ids return valid:false with no other information. */
export function verifyFixture(id: string): VerifyResult {
  return verifySigned(fixtureJson as unknown as SignedFixture, id);
}

export const FIXTURE = fixtureJson as unknown as SignedFixture;
