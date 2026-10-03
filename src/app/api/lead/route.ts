import type { NextRequest } from 'next/server';
import { submitLead } from '@/lib/hubspot';
import { parseLead } from '@/lib/lead';

// Every lead form posts here with a `type` (pilot, design-partner, role-bench-submission,
// role-bench-notify); src/lib/lead.ts holds the per-type rules.
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    const json = await request.json();
    if (!json || typeof json !== 'object' || Array.isArray(json)) throw new Error('not an object');
    body = json as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = parseLead(body);
  if (!parsed.ok) {
    return Response.json({ ok: false, error: parsed.error }, { status: 400 });
  }
  const { type, lead } = parsed;

  if (!process.env.HUBSPOT_PORTAL_ID || !process.env.HUBSPOT_FORM_ID) {
    // No lead destination yet. Say so, so the form can hand the visitor an email fallback
    // instead of promising a reply nobody will send. Log without PII.
    console.warn(`[/api/lead] HubSpot not configured; asked visitor to email (type=${type}, cta_location=${lead.ctaLocation ?? 'none'})`);
    return Response.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  try {
    await submitLead(lead);
  } catch (err) {
    console.error(`[/api/lead] HubSpot submission failed (type=${type}):`, err instanceof Error ? err.message : err);
    return Response.json({ ok: false, error: 'upstream' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
