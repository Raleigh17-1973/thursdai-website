import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  // TODO Week 6: generate and email the security pack ZIP
  const body = await request.json();
  console.warn('[/api/security-pack] stub — wire email delivery:', JSON.stringify(body));
  return Response.json({ ok: true });
}
