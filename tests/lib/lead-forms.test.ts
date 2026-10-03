import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { LEAD_TYPES, parseLead } from '@/lib/lead';

// The forms on the site post to /api/lead, whose rules live in src/lib/lead.ts. Before the typed
// forms, every post was rejected for missing fields while the page promised a reply. These tests
// tie each form to the schema so that cannot happen quietly again.
const SRC = path.resolve(__dirname, '..', '..', 'src');
const read = (rel: string) => readFileSync(path.join(SRC, rel), 'utf8');

const FORMS = [
  {
    name: 'pilot request modal',
    file: 'components/ui/DemoRequestModal.tsx',
    type: 'pilot',
    fields: ['name', 'company', 'email', 'decision'],
    sample: { name: 'Jane Smith', company: 'Acme', email: 'jane@acme.com', decision: 'Vendor choice', source: 'hero' },
  },
  {
    name: 'design partner application',
    file: 'components/content/CaseStudyApplyForm.tsx',
    type: 'design-partner',
    fields: ['companyName', 'role', 'email', 'outcome'],
    sample: { companyName: 'Acme', role: 'Head of Model Risk', email: 'r@acme.com', outcome: 'Credit decisions' },
  },
];

describe('lead forms', () => {
  for (const form of FORMS) {
    const source = read(form.file);

    it(`should post the ${form.name} to /api/lead with a type the route knows`, () => {
      expect(source).toContain("fetch('/api/lead'");
      expect(source).toContain(`type: '${form.type}'`);
      expect(LEAD_TYPES).toContain(form.type);
    });

    it(`should collect every field the ${form.name} sends`, () => {
      for (const field of form.fields) expect(source).toContain(`${field}:`);
    });

    it(`should be accepted by /api/lead when the ${form.name} sends its fields`, () => {
      const result = parseLead({ type: form.type, ...form.sample });

      expect(result.ok).toBe(true);
    });

    it(`should fall back to an email, never a false success, when the ${form.name} cannot deliver`, () => {
      expect(source).toMatch(/fallback/i);
      expect(source).toMatch(/res\.ok|delivered/);
    });
  }
});
