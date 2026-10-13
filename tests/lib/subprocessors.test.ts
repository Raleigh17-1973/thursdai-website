import { describe, expect, it } from 'vitest';
import { SUBPROCESSORS } from '@/lib/subprocessors';

// Pins the 2026-10-13 app truth pass: what production actually sends to third parties.
describe('subprocessors', () => {
  const names = SUBPROCESSORS.map((s) => s.name);

  it('lists the providers production actually uses', () => {
    expect(names).toEqual(['Railway', 'Amazon Web Services', 'Anthropic', 'OpenAI', 'Sentry', 'WorkOS']);
  });

  it('does not list providers production does not send data to, or ones awaiting an owner decision', () => {
    for (const absent of ['Grafana Labs', 'PagerDuty', 'Vercel', 'GitHub', 'Discord', 'Stripe']) {
      expect(names).not.toContain(absent);
    }
  });

  it('makes no region or location claim (owner ruling, 2026-10-13)', () => {
    for (const s of SUBPROCESSORS) {
      expect(Object.keys(s)).toEqual(['name', 'purpose', 'dpa']);
      expect(s.purpose).not.toMatch(/EU West|Amsterdam|us-east|US East|US West|United States/i);
    }
  });

  it('shows every DPA as not confirmed', () => {
    for (const s of SUBPROCESSORS) expect(s.dpa).toBe('Not confirmed');
  });
});
