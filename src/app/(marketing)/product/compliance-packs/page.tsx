import React from 'react';
import type { Metadata } from 'next';
import { ProductPillar, ProductPillarSection } from '@/components/templates/ProductPillar';
import { PackAssemblyDiagram } from '@/components/diagrams/PackAssemblyDiagram';
import { AuditPackSummary } from '@/components/receipt/AuditPackSummary';
import { Body } from '@/components/typography/Body';
import { RECEIPT_TERM } from '@/config/site';

export const metadata: Metadata = {
  title: 'Compliance Packs: Thursdai',
  description:
    'A compliance pack gathers the AI Receipts for a framework, period or system into one signed document, so the evidence an auditor reads is the record itself.',
};

export default function CompliancePacksPage() {
  return (
    <ProductPillar
      crumb="Compliance Packs"
      label="Compliance Packs"
      title="Evidence an auditor can check."
      demoHref="/demo#audit-pack"
      promise={
        <>
          A compliance pack gathers the receipts for a framework, period or system into one signed
          document, so the evidence an auditor reads is the record itself.
        </>
      }
      visual={<AuditPackSummary />}
      facts={{
        label: 'In a pack',
        title: 'What a pack carries.',
        items: [
          {
            label: 'Scope',
            body: <>The framework, the period and the systems it covers, and every receipt that falls inside them.</>,
          },
          {
            label: 'Receipts',
            body: (
              <>
                Each {RECEIPT_TERM} with its policy results, evidence and reviewer, and its sha256 so it can
                be matched to the original.
              </>
            ),
          },
          {
            label: 'Signature',
            body: <>The pack is signed like a receipt, so a pack produced today can still be verified later.</>,
          },
        ],
      }}
      diagram={{
        label: 'From receipts to a pack',
        title: 'Select, bundle, sign.',
        body: (
          <>
            A pack is not written for the audit. It is selected from receipts that already exist, bundled
            into one document and signed.
          </>
        ),
        figure: <PackAssemblyDiagram />,
      }}
      verify={
        <>
          The sample pack carries the full hash of the sample receipt, so you can check one against the
          other, then check the pack&apos;s own signature.
        </>
      }
      close={{
        title: 'Open a signed audit pack.',
        body: (
          <>
            The demo ends with a sample pack that carries the hash of a receipt you can verify on the page.
            Download it as a PDF. No login.
          </>
        ),
      }}
    >
      <ProductPillarSection label="Scope" title="What a pack is, and is not.">
        <Body>
          A pack is the evidence that supports an audit. It is not the audit and it is not a finding of
          compliance: your auditor and your regulators reach the conclusions.
        </Body>
        <Body>
          The sample pack is a PDF. Export formats for GRC systems are settled framework by framework, so
          ask us what is available for yours.
        </Body>
      </ProductPillarSection>
    </ProductPillar>
  );
}
