import type { NextRequest } from 'next/server';
import { submitDemoRequest } from '@/lib/hubspot';

const CTA_LOCATIONS = new Set(['hero', 'closing', 'nav']);

function str(value: unknown, max = 2000): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const name = str(body.name, 200);
  const company = str(body.company, 200);
  const email = str(body.email, 320);
  if (!name || !company || !email.includes('@')) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  const source = str(body.source, 32);
  const ctaLocation = CTA_LOCATIONS.has(source) ? source : undefined;

  if (!process.env.HUBSPOT_PORTAL_ID || !process.env.HUBSPOT_FORM_ID) {
    // Not configured (local, preview): keep the visitor flow working, log without PII.
    console.warn(`[/api/lead] HubSpot not configured; lead dropped (cta_location=${ctaLocation ?? 'none'})`);
    return Response.json({ ok: true });
  }

  try {
    await submitDemoRequest({ name, company, email, decision: str(body.decision), ctaLocation });
  } catch (err) {
    console.error('[/api/lead] HubSpot submission failed:', err instanceof Error ? err.message : err);
    return Response.json({ ok: false, error: 'upstream' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
