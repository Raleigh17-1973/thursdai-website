// The certification roadmap shown on /trust#certifications and /security.
// Honesty rules this file encodes: Thursdai holds no certifications today; a standard is "not
// started" until an auditor is engaged; a target quarter appears only once it is real. There is
// no "ready" status on purpose: it would read as a certificate held. Add a status for that the day
// a certificate exists. When an auditor is engaged, set auditorEngaged and targetQuarter (e.g.
// "Q3 2027") here and the page and badges update together.

export type CertStatus = 'in-audit' | 'not-started';

export interface RoadmapRow {
  /** Control or standard, as a buyer would search for it. */
  name: string;
  /** Short name for the compact badge row. */
  shortName: string;
  status: CertStatus;
  /** null when an auditor engagement does not apply (self-published documentation). */
  auditorEngaged: boolean | null;
  /** A real target quarter such as "Q3 2027", or null while none is confirmed. */
  targetQuarter: string | null;
  /** One plain sentence on what the row does and does not mean. */
  note: string;
  href: string;
}

export const STATUS_LABEL: Record<CertStatus, string> = {
  'in-audit': 'In audit',
  'not-started': 'Not started',
};

export const TARGET_UNCONFIRMED = 'No date';

export function statusText(status: CertStatus, quarter?: string | null): string {
  return quarter ? `${STATUS_LABEL[status]}, ${quarter}` : STATUS_LABEL[status];
}

export function auditorText(engaged: boolean | null): string {
  if (engaged === null) return 'Not applicable';
  return engaged ? 'Yes' : 'No';
}

export function targetText(row: Pick<RoadmapRow, 'targetQuarter'>): string {
  return row.targetQuarter ?? TARGET_UNCONFIRMED;
}

export const CERT_ROADMAP: readonly RoadmapRow[] = [
  {
    name: 'SOC 2 Type II',
    shortName: 'SOC 2 Type II',
    status: 'not-started',
    auditorEngaged: false,
    targetQuarter: null,
    note: 'Not held. No engagement has started. The observation period begins once an auditor is engaged.',
    href: '/trust#certifications',
  },
  {
    name: 'ISO/IEC 27001',
    shortName: 'ISO/IEC 27001',
    status: 'not-started',
    auditorEngaged: false,
    targetQuarter: null,
    note: 'Not held. Not started. Information security management system certification.',
    href: '/trust#certifications',
  },
  {
    name: 'ISO/IEC 42001',
    shortName: 'ISO/IEC 42001',
    status: 'not-started',
    auditorEngaged: false,
    targetQuarter: null,
    note: 'Not held. Not started. AI management system certification; our approach is on the ISO/IEC 42001 page.',
    href: '/trust/iso-42001',
  },
];
