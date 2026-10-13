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

  it('puts Railway in EU West and AWS in us-east-1', () => {
    expect(SUBPROCESSORS.find((s) => s.name === 'Railway')?.location).toBe('EU West (Amsterdam)');
    expect(SUBPROCESSORS.find((s) => s.name === 'Amazon Web Services')?.location).toContain('us-east-1');
  });

  it('shows every DPA as not confirmed', () => {
    for (const s of SUBPROCESSORS) expect(s.dpa).toBe('Not confirmed');
  });
});
