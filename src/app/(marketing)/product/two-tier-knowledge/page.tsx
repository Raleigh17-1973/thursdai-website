import React from 'react';
import type { Metadata } from 'next';
import { ProductPillar } from '@/components/templates/ProductPillar';
import { TwoTierKnowledgeDiagram } from '@/components/diagrams/TwoTierKnowledgeDiagram';
import { ReceiptFrame } from '@/components/receipt/ReceiptFrame';
import { SAMPLE_HIRING_RECEIPT } from '@/components/receipt/sample';

export const metadata: Metadata = {
  title: 'Two-Tier Knowledge: Thursdai',
  description:
    'A shared standard knowledge base kept apart from your own tenant layer, which is separated from other tenants by row-level security. An answer cites the sources it used.',
};

export default function TwoTierKnowledgePage() {
  return (
    <ProductPillar
      crumb="Two-Tier Knowledge"
      label="Two-Tier Knowledge"
      title="Standard and tenant, kept apart."
      promise={
        <>
          Thursdai keeps a shared standard knowledge base apart from your own tenant layer. Your
          documents are separated from other tenants by row-level security, and an answer cites the
          sources it used.
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
                Reference material maintained by Thursdai and shared by every tenant. Framework control
                catalogs exist as data; the statute library is not yet populated.
              </>
            ),
          },
          {
            label: 'Tenant',
            body: (
              <>
                The documents you provide. They are separated from other tenants by Postgres row-level
                security enforced in the database.
              </>
            ),
          },
          {
            label: 'Training',
            body: (
              <>
                Our policy: we do not train on customer data. The contractual commitment will be in the
                DPA, which is in preparation.
              </>
            ),
          },
        ],
      }}
      diagram={{
        label: 'Knowledge',
        title: 'Two layers, one cited answer.',
        body: (
          <>
            An answer can draw on both tiers and cites the sources it used. The evidence is listed on the
            receipt.
          </>
        ),
        figure: <TwoTierKnowledgeDiagram />,
      }}
      verify={
        <>
          The evidence an answer relied on is listed on the signed receipt with its version, so you can show
          what it drew on when it was given.
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
