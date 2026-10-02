import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Body } from '@/components/typography/Body';
import { ButtonLink } from '@/components/ui/Button';
import { TrustDocument } from '@/components/templates/TrustDocument';
import { RecordTable } from '@/components/templates/RecordTable';
import { SUBPROCESSORS } from '@/lib/subprocessors';
import { CONTACT_EMAIL } from '@/config/site';

export const metadata: Metadata = {
  title: 'Subprocessors: Thursdai',
  description: 'The third parties that process customer data for Thursdai, what each one does and the DPA status.',
};

const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

export default function SubprocessorsPage() {
  return (
    <TrustDocument
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Trust', href: '/trust' },
        { label: 'Subprocessors' },
      ]}
      label="Subprocessors"
      title="Who processes your data."
      lead="Every third party that processes customer data for Thursdai, what it does and whether a data processing agreement is in place."
      meta={[{ label: 'Status as of', value: 'October 2026' }]}
      heroActions={
        <ButtonLink href={`mailto:${CONTACT_EMAIL}?subject=Subprocessor%20notifications`} variant="primary" size="lg">
          Ask for change notices
        </ButtonLink>
      }
      sections={[
        {
          id: 'list',
          title: 'Current subprocessors',
          body: (
            <RecordTable
              caption="Subprocessors, their purpose and DPA status"
              columns={[
                { key: 'name', label: 'Subprocessor', width: '28%' },
                { key: 'purpose', label: 'Purpose' },
                { key: 'dpa', label: 'DPA', width: '24%' },
              ]}
              rows={SUBPROCESSORS.map((s) => ({ id: s.name, ...s }))}
            />
          ),
        },
        {
          id: 'changes',
          title: 'Changes',
          body: (
            <Body>
              Customers who have signed a DPA are told of material changes at least 30 days before a
              new subprocessor is added. To be notified, email{' '}
              <a href={`mailto:${CONTACT_EMAIL}?subject=Subprocessor%20notifications`} style={UNDERLINED}>
                {CONTACT_EMAIL}
              </a>
              . How each category of data is handled is on the{' '}
              <Link href="/trust/data" style={UNDERLINED}>
                data handling
              </Link>{' '}
              page.
            </Body>
          ),
        },
      ]}
    />
  );
}
