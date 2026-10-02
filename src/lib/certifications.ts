// The certification roadmap shown on /trust#certifications and summarised on the home page.
// Honesty rules this file encodes: Thursdai holds no certifications today; a standard is only
// "scheduled" until an auditor is engaged; a target quarter appears only once it is real.
// When an auditor is engaged, set auditorEngaged and targetQuarter (e.g. "Q3 2027") here and
// the page and badges update together.

export type CertStatus = 'ready' | 'in-audit' | 'scheduled';

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
  ready: 'Ready',
  'in-audit': 'In audit',
  scheduled: 'Scheduled',
};

export const TARGET_UNCONFIRMED = 'Quarter to be confirmed';

export function statusText(status: CertStatus, quarter?: string | null): string {
  return quarter ? `${STATUS_LABEL[status]}, ${quarter}` : STATUS_LABEL[status];
}

export function auditorText(engaged: boolean | null): string {
  if (engaged === null) return 'Not applicable';
  return engaged ? 'Yes' : 'No';
}

export function targetText(row: Pick<RoadmapRow, 'status' | 'targetQuarter'>): string {
  if (row.targetQuarter) return row.targetQuarter;
  return row.status === 'ready' ? 'Available now' : TARGET_UNCONFIRMED;
}

export const CERT_ROADMAP: readonly RoadmapRow[] = [
  {
    name: 'SOC 2 Type II',
    shortName: 'SOC 2 Type II',
    status: 'scheduled',
    auditorEngaged: false,
    targetQuarter: null,
    note: 'Not held. The observation period starts once an auditor is engaged.',
    href: '/trust#certifications',
  },
  {
    name: 'ISO/IEC 27001',
    shortName: 'ISO/IEC 27001',
    status: 'scheduled',
    auditorEngaged: false,
    targetQuarter: null,
    note: 'Not held. Information security management system certification.',
    href: '/trust#certifications',
  },
  {
    name: 'ISO/IEC 42001',
    shortName: 'ISO/IEC 42001',
    status: 'scheduled',
    auditorEngaged: false,
    targetQuarter: null,
    note: 'Not held. AI management system certification; our approach is on the ISO/IEC 42001 page.',
    href: '/trust/iso-42001',
  },
  {
    name: 'EU AI Act mapping for Annex III systems',
    shortName: 'EU AI Act mapping',
    status: 'ready',
    auditorEngaged: null,
    targetQuarter: null,
    note: 'A published article-by-article mapping of what receipts record against the obligations for high-risk systems. It supports your own compliance work; it is not a conformity assessment.',
    href: '/trust/annex-iii',
  },
  {
    name: 'Architecture designed for HIPAA workloads',
    shortName: 'Architecture for HIPAA workloads',
    status: 'ready',
    auditorEngaged: null,
    targetQuarter: null,
    note: 'Encryption, tenant isolation and retention controls built with HIPAA workloads in mind. No HIPAA attestation is held.',
    href: '/trust/data',
  },
];
