import React from 'react';
import type { Metadata } from 'next';
import { ProductPillar } from '@/components/templates/ProductPillar';
import { AmbientCaseDiagram } from '@/components/diagrams/AmbientCaseDiagram';
import { ReceiptFrame } from '@/components/receipt/ReceiptFrame';
import { SAMPLE_HIRING_RECEIPT_COMPACT } from '@/components/receipt/sample';
import { LABEL_STYLE } from '@/components/typography/scale';

export const metadata: Metadata = {
  title: 'Ambient Cases: Thursdai',
  description:
    'Thursdai watches your event streams and assembles a case file in the background, with the facts, the policies in scope and the related AI Receipts in place before anyone opens it. Early access through the design partner program.',
};

function EarlyAccess() {
  return (
    <p className="m-0" style={{ borderLeft: '2px solid var(--ink)', paddingLeft: '1rem', fontSize: '15px', lineHeight: 1.55, color: 'var(--ink)' }}>
      <span style={{ ...LABEL_STYLE, display: 'block', marginBottom: '0.25rem' }}>Early access</span>
      Ambient Cases is offered in early access through the design partner program, one regulated workflow at a time. To try it on yours,
      request a pilot.
    </p>
  );
}

export default function AmbientCasesPage() {
  return (
    <ProductPillar
      crumb="Ambient Cases"
      label="Ambient Cases"
      title="Cases that assemble themselves."
      promise={
        <>
          Thursdai watches your event streams and assembles a case file in the background, so the facts, the
          policies in scope and the related receipts are in place before anyone opens it.
        </>
      }
      status={<EarlyAccess />}
      visual={<ReceiptFrame {...SAMPLE_HIRING_RECEIPT_COMPACT} style={{ marginLeft: 'auto' }} />}
      visualNote="A case file links the receipts for the AI decisions it touches, like this sample."
      facts={{
        label: 'A case file',
        title: 'What a case starts with.',
        items: [
          {
            label: 'Triggers',
            body: <>Contract events, policy changes, regulatory deadlines and incident signals from connected systems.</>,
          },
          {
            label: 'Contents',
            body: (
              <>
                The facts from the triggering events, the policies in scope and the receipts for related AI
                decisions, in the order they happened.
              </>
            ),
          },
          {
            label: 'Record',
            body: <>Who opened the case, what they saw and what was recommended at each stage, kept like any other record.</>,
          },
        ],
      }}
      diagram={{
        label: 'Case assembly',
        title: 'Events in, a case file out.',
        body: (
          <>
            Most events pass by. The ones that match a case rule are gathered into one file with the policies
            and receipts that bear on them.
          </>
        ),
        figure: <AmbientCaseDiagram />,
      }}
      verify={
        <>
          The receipts inside a case file are the same signed receipts, so each one can be verified on its
          own, outside the case.
        </>
      }
      close={{
        title: 'See the record a case is built from.',
        body: (
          <>
            Cases are assembled from receipts like the one in the demo. Verify a signed sample, replay it and
            download its audit pack. No login.
          </>
        ),
      }}
    />
  );
}
