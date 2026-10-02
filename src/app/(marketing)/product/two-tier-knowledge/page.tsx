import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductPillar } from '@/components/templates/ProductPillar';
import { TwoTierKnowledgeDiagram } from '@/components/diagrams/TwoTierKnowledgeDiagram';
import { ReceiptFrame } from '@/components/receipt/ReceiptFrame';
import { SAMPLE_HIRING_RECEIPT } from '@/components/receipt/sample';

export const metadata: Metadata = {
  title: 'Two-Tier Knowledge: Thursdai',
  description:
    'A shared standard corpus of regulations and standards, kept apart from your isolated tenant layer. Every answer cites which tier each source came from, and tenant content never trains a model.',
};

const UNDERLINED: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };

export default function TwoTierKnowledgePage() {
  return (
    <ProductPillar
      crumb="Two-Tier Knowledge"
      label="Two-Tier Knowledge"
      title="Standard and tenant. Never mixed."
      promise={
        <>
          Thursdai keeps a shared standard corpus of regulations and standards apart from your isolated
          tenant layer, and every answer cites which tier each source came from.
        </>
      }
      visual={<ReceiptFrame {...SAMPLE_HIRING_RECEIPT} style={{ marginLeft: 'auto' }} />}
      visualNote="Evidence on the sample receipt: the requisition, the rubric version and the application snapshot, all from the tenant layer."
      facts={{
        label: 'Two tiers',
        title: 'What lives where.',
        items: [
          {
            label: 'Standard',
            body: (
              <>
                Regulations and standards such as the EU AI Act, ISO 42001 and GDPR, maintained by Thursdai
                and shared by every tenant.
              </>
            ),
          },
          {
            label: 'Tenant',
            body: (
              <>
                Your policies, rubrics, templates and precedents, isolated to your tenant and encrypted with a
                tenant-specific key.
              </>
            ),
          },
          {
            label: 'Training',
            body: (
              <>
                Tenant content is never used to train models or to improve the standard corpus.{' '}
                <Link href="/trust/data" style={UNDERLINED}>
                  How we handle your data
                </Link>
                .
              </>
            ),
          },
        ],
      }}
      diagram={{
        label: 'Knowledge',
        title: 'Two layers, one attributed answer.',
        body: (
          <>
            An answer can draw on both tiers. Each source keeps its tier on the receipt, and no path runs
            from one tenant to another.
          </>
        ),
        figure: <TwoTierKnowledgeDiagram />,
      }}
      verify={
        <>
          Sources are recorded on the signed receipt with their versions, so you can show which tier an
          answer relied on at the time it was given.
        </>
      }
      close={{
        title: 'See what a receipt records.',
        body: (
          <>
            The demo shows the evidence behind one signed decision and replays it at the versions that were
            live. No login.
          </>
        ),
      }}
    />
  );
}
