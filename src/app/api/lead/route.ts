import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  // TODO Week 4: wire to HubSpot via src/lib/hubspot.ts
  const body = await request.json();
  console.log('[/api/lead] received:', body);
  return Response.json({ ok: true });
}
