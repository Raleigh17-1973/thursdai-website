import { describe, expect, it } from 'vitest';
import {
  CERT_ROADMAP,
  STATUS_LABEL,
  TARGET_UNCONFIRMED,
  auditorText,
  statusText,
  targetText,
} from '@/lib/certifications';

describe('certification roadmap honesty', () => {
  it('never says "Planned" and never lists FedRAMP', () => {
    const text = JSON.stringify(CERT_ROADMAP) + JSON.stringify(STATUS_LABEL);
    expect(text).not.toMatch(/planned/i);
    expect(text).not.toMatch(/fedramp/i);
  });

  it('lists SOC 2, ISO/IEC 27001 and ISO/IEC 42001 as scheduled with no auditor and no date', () => {
    for (const name of ['SOC 2 Type II', 'ISO/IEC 27001', 'ISO/IEC 42001']) {
      const row = CERT_ROADMAP.find((r) => r.name === name);
      expect(row, name).toBeDefined();
      expect(row!.status).toBe('scheduled');
      expect(auditorText(row!.auditorEngaged)).toBe('No');
      expect(targetText(row!)).toBe(TARGET_UNCONFIRMED);
    }
  });

  it('only shows a target quarter on a row whose auditor is engaged', () => {
    for (const row of CERT_ROADMAP) {
      if (row.targetQuarter) expect(row.auditorEngaged, row.name).toBe(true);
      if (row.status === 'in-audit') expect(row.auditorEngaged, row.name).toBe(true);
    }
  });

  it('says plainly in every scheduled note that the certificate is not held', () => {
    for (const row of CERT_ROADMAP.filter((r) => r.status === 'scheduled')) {
      expect(row.note, row.name).toMatch(/^Not held\./);
    }
  });
});

describe('status text', () => {
  it('appends a quarter only when one is given', () => {
    expect(statusText('scheduled')).toBe('Scheduled');
    expect(statusText('scheduled', null)).toBe('Scheduled');
    expect(statusText('in-audit', 'Q3 2027')).toBe('In audit, Q3 2027');
  });

  it('reads ready rows as available now and n/a auditors as not applicable', () => {
    expect(targetText({ status: 'ready', targetQuarter: null })).toBe('Available now');
    expect(auditorText(null)).toBe('Not applicable');
    expect(auditorText(true)).toBe('Yes');
  });
});
