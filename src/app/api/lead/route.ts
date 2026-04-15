import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  // TODO Week 4: wire to HubSpot via src/lib/hubspot.ts
  const body = await request.json();
  console.warn('[/api/lead] stub — wire to HubSpot:', JSON.stringify(body));
  return Response.json({ ok: true });
}
