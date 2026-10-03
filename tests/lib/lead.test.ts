import { describe, expect, it } from 'vitest';
import { DETAILS_MAX, parseLead } from '@/lib/lead';
import { hubspotFields } from '@/lib/hubspot';

const HUBSPOT_FIELDS = new Set(['firstname', 'lastname', 'company', 'email', 'decision_to_replay', 'cta_location']);

function ok(body: Record<string, unknown>) {
  const r = parseLead(body);
  if (!r.ok) throw new Error(`expected ok, got ${r.error}`);
  return r;
}

describe('parseLead: pilot', () => {
  const pilot = { name: 'Jane Smith', company: 'Acme', email: 'jane@acme.com', decision: 'Vendor choice', source: 'hero' };

  it('is the default type and keeps the current rules', () => {
    const r = ok(pilot);
    expect(r.type).toBe('pilot');
    expect(r.lead).toEqual({ email: 'jane@acme.com', name: 'Jane Smith', company: 'Acme', details: 'Vendor choice', ctaLocation: 'hero' });
    expect(ok({ ...pilot, type: 'pilot' }).type).toBe('pilot');
  });

  it('requires name and company', () => {
    expect(parseLead({ ...pilot, name: '' })).toEqual({ ok: false, error: 'missing_fields' });
    expect(parseLead({ ...pilot, company: '  ' })).toEqual({ ok: false, error: 'missing_fields' });
  });

  it('only accepts known CTA placements', () => {
    expect(ok({ ...pilot, source: 'footer' }).lead.ctaLocation).toBeUndefined();
  });
});

describe('parseLead: design-partner', () => {
  const app = { type: 'design-partner', companyName: 'Acme', role: 'Head of Model Risk', email: 'r@acme.com', outcome: 'Credit decisions' };

  it('maps company and labels the details', () => {
    const r = ok(app);
    expect(r.lead.company).toBe('Acme');
    expect(r.lead.name).toBeUndefined();
    expect(r.lead.details).toBe('Design partner application. Role: Head of Model Risk\nFirst decision to record: Credit decisions');
    expect(r.lead.ctaLocation).toBe('design-partner');
  });

  it('accepts the legacy case-study-application type', () => {
    expect(ok({ ...app, type: 'case-study-application' }).type).toBe('design-partner');
  });

  it('requires a company', () => {
    expect(parseLead({ ...app, companyName: '' })).toEqual({ ok: false, error: 'missing_fields' });
  });
});

describe('parseLead: role bench', () => {
  it('submission needs a role name and configuration, capped in length', () => {
    const r = ok({ type: 'role-bench-submission', roleName: 'HC Compliance', yaml: 'x'.repeat(5000), email: 'a@b.co' });
    expect(r.lead.ctaLocation).toBe('role-bench-submission');
    expect(r.lead.details!.startsWith('Role Bench submission. Role: HC Compliance\nConfiguration: x')).toBe(true);
    expect(r.lead.details!.length).toBeLessThanOrEqual(DETAILS_MAX);
    expect(parseLead({ type: 'role-bench-submission', roleName: '', yaml: 'a', email: 'a@b.co' })).toEqual({ ok: false, error: 'missing_fields' });
  });

  it('notify needs only an email', () => {
    const r = ok({ type: 'role-bench-notify', email: 'a@b.co' });
    expect(r.lead).toMatchObject({ email: 'a@b.co', ctaLocation: 'role-bench-notify' });
  });
});

describe('parseLead: shared rules', () => {
  it('rejects a missing or malformed email for every type', () => {
    for (const type of ['pilot', 'design-partner', 'role-bench-submission', 'role-bench-notify']) {
      expect(parseLead({ type, email: 'not-an-email', name: 'a', company: 'b', companyName: 'b', roleName: 'r', yaml: 'y' })).toEqual({ ok: false, error: 'invalid_email' });
      expect(parseLead({ type })).toEqual({ ok: false, error: 'invalid_email' });
    }
  });

  it('rejects unknown types', () => {
    expect(parseLead({ type: 'newsletter', email: 'a@b.co' })).toEqual({ ok: false, error: 'unknown_type' });
  });
});

describe('hubspotFields', () => {
  it('sends only the six HubSpot form fields, omitting empty ones', () => {
    const pilot = hubspotFields({ email: 'j@a.co', name: 'Jane van Dyke', company: 'Acme', details: 'd', ctaLocation: 'nav' });
    expect(pilot).toEqual([
      { name: 'firstname', value: 'Jane' },
      { name: 'lastname', value: 'van Dyke' },
      { name: 'company', value: 'Acme' },
      { name: 'email', value: 'j@a.co' },
      { name: 'decision_to_replay', value: 'd' },
      { name: 'cta_location', value: 'nav' },
    ]);
    const notify = hubspotFields(ok({ type: 'role-bench-notify', email: 'a@b.co' }).lead);
    expect(notify.map((f) => f.name)).toEqual(['email', 'decision_to_replay', 'cta_location']);
    for (const f of [...pilot, ...notify]) expect(HUBSPOT_FIELDS.has(f.name)).toBe(true);
  });
});
