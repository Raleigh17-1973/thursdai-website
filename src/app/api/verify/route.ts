import { NextRequest, NextResponse } from 'next/server';
import { verifyFixture } from '@/lib/receipts/verify';

export const runtime = 'nodejs';

const MAX_ID_LENGTH = 64;
const WINDOW_MS = 60_000;
const LIMIT = 60;

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

export function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip, Date.now())) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429, headers: { 'Retry-After': '60' } });
  }

  const id = request.nextUrl.searchParams.get('id');
  if (!id || id.length > MAX_ID_LENGTH) {
    return NextResponse.json({ error: 'invalid_id' }, { status: 400 });
  }

  return NextResponse.json(verifyFixture(id), {
    headers: { 'Cache-Control': 'public, max-age=300' },
  });
}
