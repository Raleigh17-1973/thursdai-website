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

  // Owner ruling, 2026-11-08: only Railway (United States (US East)) and Sentry (US) state a
  // location, and no other text in any row names a region.
  it('states only the approved locations', () => {
    const locations = Object.fromEntries(SUBPROCESSORS.map((s) => [s.name, s.location]));
    expect(locations).toEqual({
      Railway: 'United States (US East)',
      'Amazon Web Services': undefined,
      Anthropic: undefined,
      OpenAI: undefined,
      Sentry: 'US',
      WorkOS: undefined,
    });
    const REGION = /EU West|Amsterdam|us-east|US East|US West|United States|\bUS\b|residency|only in|exclusively/i;
    for (const s of SUBPROCESSORS) {
      for (const key of Object.keys(s)) {
        expect(['name', 'purpose', 'dataCategories', 'location', 'dpa']).toContain(key);
      }
      for (const text of [s.name, s.purpose, ...(s.dataCategories ?? [])]) expect(text).not.toMatch(REGION);
    }
  });

  it('matches the app public list for Sentry', () => {
    const sentry = SUBPROCESSORS.find((s) => s.name === 'Sentry');
    expect(sentry).toEqual({
      name: 'Sentry',
      purpose: 'Error and crash monitoring for the API, background workers and web app',
      dataCategories: [
        'Error events and stack traces',
        'Request and browser context',
        'Customer data that appears in an error message or request URL',
      ],
      location: 'US',
      dpa: 'Not confirmed',
    });
  });

  it('keeps the AWS, Anthropic and OpenAI wording', () => {
    const purpose = (name: string) => SUBPROCESSORS.find((s) => s.name === name)?.purpose;
    expect(purpose('Amazon Web Services')).toBe(
      'KMS signs records and receives the full record bytes to do so. S3 holds encrypted daily backups, anchor hashes and audit pack exports. SES sends notification email and access request form data.',
    );
    expect(purpose('Anthropic')).toBe(
      'Model inference. Receives prompts, which can include record excerpts and the signed-in user’s identity details.',
    );
    expect(purpose('OpenAI')).toBe('Model inference as a fallback provider. Receives the same prompts when it is used.');
  });

  it('shows every DPA as not confirmed', () => {
    for (const s of SUBPROCESSORS) expect(s.dpa).toBe('Not confirmed');
  });
});
