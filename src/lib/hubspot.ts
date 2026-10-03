// HubSpot form submission for every lead form on the site (src/lib/lead.ts validates them).
// The HubSpot form has six fields: firstname, lastname, company, email, decision_to_replay and
// cta_location. Only those names are ever sent; empty ones are left out.

import type { Lead } from './lead';

export function hubspotFields(lead: Lead): { name: string; value: string }[] {
  const fields: { name: string; value: string }[] = [];
  if (lead.name) {
    const [first, ...rest] = lead.name.split(/\s+/);
    fields.push({ name: 'firstname', value: first });
    if (rest.length) fields.push({ name: 'lastname', value: rest.join(' ') });
  }
  if (lead.company) fields.push({ name: 'company', value: lead.company });
  fields.push({ name: 'email', value: lead.email });
  if (lead.details) fields.push({ name: 'decision_to_replay', value: lead.details });
  if (lead.ctaLocation) fields.push({ name: 'cta_location', value: lead.ctaLocation });
  return fields;
}

export async function submitLead(lead: Lead): Promise<void> {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_FORM_ID;

  if (!portalId || !formId) {
    throw new Error('HubSpot credentials not configured');
  }

  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: hubspotFields(lead) }),
  });

  if (!res.ok) {
    throw new Error(`HubSpot submission failed: ${res.status}`);
  }
}
