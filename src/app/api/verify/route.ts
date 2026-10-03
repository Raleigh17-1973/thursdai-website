import { NextRequest, NextResponse } from 'next/server';
import { verifyFixture, verifyReceiptObject } from '@/lib/receipts/verify';

export const runtime = 'nodejs';

const MAX_ID_LENGTH = 64;
const WINDOW_MS = 60_000;
const LIMIT = 60;
/** Largest POST body accepted, in bytes. The sample receipt is about 1.5KB. */
const MAX_BODY_BYTES = 8 * 1024;
const MAX_SIGNATURE_LENGTH = 256;
const SHA256_HEX = /^[0-9a-f]{64}$/i;

// Best-effort, per-instance sliding window. Serverless instances do not share
// memory, so a Vercel Firewall rate-limit rule is the durable control.
const hits = new Map<string, number[]>();

function limited(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > LIMIT;
}

function clientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

const rateLimited = () =>
  NextResponse.json({ error: 'rate_limited' }, { status: 429, headers: { 'Retry-After': '60' } });

const NO_STORE = { 'Cache-Control': 'no-store' };

export function GET(request: NextRequest) {
  if (limited(clientIp(request), Date.now())) return rateLimited();

  const id = request.nextUrl.searchParams.get('id');
  if (!id || id.length > MAX_ID_LENGTH) {
    return NextResponse.json({ error: 'invalid_id' }, { status: 400 });
  }

  return NextResponse.json(verifyFixture(id), {
    headers: { 'Cache-Control': 'public, max-age=300' },
  });
}

/** Reads at most `limit` bytes; returns null as soon as the body is larger. */
async function readCapped(request: NextRequest, limit: number): Promise<string | null> {
  const declared = Number(request.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > limit) return null;
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > limit) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString('utf8');
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

/**
 * Verifies a receipt sent in the body: `{ receipt, signature, sha256? }`. Extra fields (such
 * as those in the downloadable JSON) are ignored, and so is any public key in the body: the
 * check always uses the key committed with the site. Returns `{ sha256, valid, reason }`.
 */
export async function POST(request: NextRequest) {
  if (limited(clientIp(request), Date.now())) return rateLimited();

  const type = request.headers.get('content-type') ?? '';
  if (!/^application\/json\s*(;|$)/i.test(type)) {
    return NextResponse.json({ error: 'unsupported_media_type' }, { status: 415, headers: NO_STORE });
  }

  const text = await readCapped(request, MAX_BODY_BYTES);
  if (text === null) {
    return NextResponse.json({ error: 'too_large' }, { status: 413, headers: NO_STORE });
  }

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400, headers: NO_STORE });
  }

  if (
    !isPlainObject(body) ||
    !isPlainObject(body.receipt) ||
    typeof body.signature !== 'string' ||
    body.signature.length === 0 ||
    body.signature.length > MAX_SIGNATURE_LENGTH ||
    (body.sha256 !== undefined && (typeof body.sha256 !== 'string' || !SHA256_HEX.test(body.sha256)))
  ) {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400, headers: NO_STORE });
  }

  const result = verifyReceiptObject({
    receipt: body.receipt,
    signature: body.signature,
    sha256: body.sha256 as string | undefined,
  });
  return NextResponse.json(result, { headers: NO_STORE });
}