import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { POST, GET } from '@/app/api/verify/route';
import { FIXTURE } from '@/lib/receipts/verify';

let n = 0;
// A distinct address per request keeps the per-IP rate limit out of these tests.
function post(body: string, contentType = 'application/json'): NextRequest {
  n += 1;
  return new NextRequest('http://localhost/api/verify', {
    method: 'POST',
    headers: { 'content-type': contentType, 'x-forwarded-for': `10.0.0.${n}` },
    body,
  });
}

const original = () =>
  JSON.parse(JSON.stringify({ receipt: FIXTURE.receipt, signature: FIXTURE.signature, sha256: FIXTURE.sha256 }));

describe('POST /api/verify', () => {
  it('accepts the original receipt with its signature', async () => {
    const res = await POST(post(JSON.stringify(original())));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ sha256: FIXTURE.sha256, valid: true, reason: null });
  });

  it('accepts the downloadable JSON shape and ignores a public key in the body', async () => {
    const body = { ...original(), public_key_pem: 'not a key', verify_url: 'x' };
    const res = await POST(post(JSON.stringify(body)));
    expect((await res.json()).valid).toBe(true);
  });

  it('rejects an altered field as a hash mismatch and returns the new fingerprint', async () => {
    const body = original();
    body.receipt.decision.outcome = 'reject';
    const res = await POST(post(JSON.stringify(body)));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.valid).toBe(false);
    expect(json.reason).toBe('hash_mismatch');
    expect(json.sha256).toMatch(/^[0-9a-f]{64}$/);
    expect(json.sha256).not.toBe(FIXTURE.sha256);
    expect(Object.keys(json).sort()).toEqual(['reason', 'sha256', 'valid']);
  });

  it('rejects an altered field without a stated fingerprint as a signature mismatch', async () => {
    const body = original();
    delete body.sha256;
    body.receipt.recorded_at = '2026-09-16T14:33:07Z';
    const json = await (await POST(post(JSON.stringify(body)))).json();
    expect(json).toMatchObject({ valid: false, reason: 'signature_mismatch' });
  });

  it('rejects an altered signature', async () => {
    const body = original();
    const sig = Buffer.from(body.signature, 'base64');
    sig[0] ^= 0xff;
    body.signature = sig.toString('base64');
    const json = await (await POST(post(JSON.stringify(body)))).json();
    expect(json).toEqual({ sha256: FIXTURE.sha256, valid: false, reason: 'signature_mismatch' });
  });

  it('refuses a body over 8KB', async () => {
    const body = original();
    body.receipt.padding = 'x'.repeat(9000);
    const res = await POST(post(JSON.stringify(body)));
    expect(res.status).toBe(413);
  });

  it('refuses malformed JSON', async () => {
    const res = await POST(post('{"receipt": '));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'invalid_json' });
  });

  it('refuses a body of the wrong shape', async () => {
    const bad = [[], { receipt: [], signature: 'a' }, { receipt: {} }, { receipt: {}, signature: 'a', sha256: 'zz' }];
    for (const b of bad) {
      const res = await POST(post(JSON.stringify(b)));
      expect(res.status).toBe(400);
    }
  });

  it('refuses anything but JSON', async () => {
    const res = await POST(post(JSON.stringify(original()), 'text/plain'));
    expect(res.status).toBe(415);
  });
});

describe('GET /api/verify', () => {
  it('still verifies by id', async () => {
    const res = GET(
      new NextRequest(`http://localhost/api/verify?id=${FIXTURE.receipt.id}`, {
        headers: { 'x-forwarded-for': '10.1.0.1' },
      }),
    );
    expect((await res.json()).valid).toBe(true);
  });
});
