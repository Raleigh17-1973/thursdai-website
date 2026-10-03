// Validation for /api/lead. Every form on the site posts here with a `type`, and every type goes
// to the same HubSpot form, which has six fields: firstname, lastname, company, email,
// decision_to_replay and cta_location. Each type maps onto those and nothing else.

export const LEAD_TYPES = ['pilot', 'design-partner', 'role-bench-submission', 'role-bench-notify'] as const;
export type LeadType = (typeof LEAD_TYPES)[number];

/** Values allowed in cta_location: the pilot CTA placements, then one per non-pilot form. */
export const CTA_LOCATIONS = ['hero', 'closing', 'nav', 'design-partner', 'role-bench-submission', 'role-bench-notify'] as const;

/** What is sent to HubSpot. Optional fields are omitted when empty. */
export interface Lead {
  email: string;
  name?: string;
  company?: string;
  /** Labelled free text for decision_to_replay. */
  details?: string;
  ctaLocation?: string;
}

export type LeadResult = { ok: true; type: LeadType; lead: Lead } | { ok: false; error: string };

export const DETAILS_MAX = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value: unknown, max = 2000): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

/** Joins labelled parts, skipping empty ones, and caps the result. */
export function labelled(parts: [label: string, value: string][]): string {
  return parts
    .filter(([, v]) => v)
    .map(([l, v]) => `${l}: ${v}`)
    .join('\n')
    .slice(0, DETAILS_MAX);
}

function resolveType(raw: unknown): LeadType | null {
  if (raw === undefined || raw === null || raw === '') return 'pilot';
  // The /customers form posted this before the types were named; keep accepting it.
  if (raw === 'case-study-application') return 'design-partner';
  return (LEAD_TYPES as readonly unknown[]).includes(raw) ? (raw as LeadType) : null;
}

export function parseLead(body: Record<string, unknown>): LeadResult {
  const type = resolveType(body.type);
  if (!type) return { ok: false, error: 'unknown_type' };

  const email = str(body.email, 320);
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'invalid_email' };

  switch (type) {
    case 'pilot': {
      const name = str(body.name, 200);
      const company = str(body.company, 200);
      if (!name || !company) return { ok: false, error: 'missing_fields' };
      const source = str(body.source, 32);
      const ctaLocation = ['hero', 'closing', 'nav'].includes(source) ? source : undefined;
      const details = str(body.decision, DETAILS_MAX);
      return { ok: true, type, lead: { email, name, company, ...(details ? { details } : {}), ...(ctaLocation ? { ctaLocation } : {}) } };
    }
    case 'design-partner': {
      const company = str(body.companyName, 200) || str(body.company, 200);
      if (!company) return { ok: false, error: 'missing_fields' };
      const details = labelled([
        ['Design partner application. Role', str(body.role, 200)],
        ['First decision to record', str(body.outcome, 1000)],
      ]);
      return { ok: true, type, lead: { email, company, ...(details ? { details } : {}), ctaLocation: type } };
    }
    case 'role-bench-submission': {
      const roleName = str(body.roleName, 200);
      const yaml = str(body.yaml, DETAILS_MAX);
      if (!roleName || !yaml) return { ok: false, error: 'missing_fields' };
      const details = labelled([
        ['Role Bench submission. Role', roleName],
        ['Configuration', yaml],
      ]);
      return { ok: true, type, lead: { email, details, ctaLocation: type } };
    }
    case 'role-bench-notify':
      return { ok: true, type, lead: { email, details: 'Role Bench: notify me when results are published', ctaLocation: type } };
  }
}
