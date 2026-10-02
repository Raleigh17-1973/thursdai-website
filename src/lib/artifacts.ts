import { statSync } from 'node:fs';
import path from 'node:path';
import { RECEIPT_TERM } from '@/config/site';

// The downloadable sample artifacts (public/artifacts), signed from the same fixture that
// /api/verify checks. Server-only: sizes are read from the files actually served at build,
// so the labels on /demo and the home proof band cannot drift when the files are rebuilt.

export function artifactSize(file: string): string {
  try {
    const bytes = statSync(path.join(process.cwd(), 'public', 'artifacts', file)).size;
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  } catch {
    return '';
  }
}

export interface SampleArtifact {
  href: string;
  title: string;
  meta: string[];
  note: string;
}

export function sampleArtifacts(): SampleArtifact[] {
  return [
    {
      href: '/artifacts/northwind-sample-receipt.pdf',
      title: `${RECEIPT_TERM}, PDF`,
      meta: ['PDF', '1 page', artifactSize('northwind-sample-receipt.pdf')].filter(Boolean),
      note: 'The receipt as a printable record, with the signature line.',
    },
    {
      href: '/artifacts/northwind-sample-receipt.json',
      title: `${RECEIPT_TERM}, JSON`,
      meta: ['JSON', artifactSize('northwind-sample-receipt.json')].filter(Boolean),
      note: 'The signed record, its signature and the public key, so you can check it without us.',
    },
    {
      href: '/artifacts/northwind-sample-audit-pack.pdf',
      title: 'Audit pack, PDF',
      meta: ['PDF', '4 pages', artifactSize('northwind-sample-audit-pack.pdf')].filter(Boolean),
      note: 'Cover, receipt, policy evaluation and evidence, signature and verification steps.',
    },
  ];
}
