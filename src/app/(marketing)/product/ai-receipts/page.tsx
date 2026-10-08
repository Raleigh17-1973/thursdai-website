import React from 'react';
import type { Metadata } from 'next';
import { ProductPillar, ProductPillarSection } from '@/components/templates/ProductPillar';
import { ThreeStepsDiagram } from '@/components/diagrams/ThreeStepsDiagram';
import { ReceiptFrame } from '@/components/receipt/ReceiptFrame';
import { SAMPLE_HIRING_RECEIPT } from '@/components/receipt/sample';
import { LABEL_STYLE } from '@/components/typography/scale';
import { Body } from '@/components/typography/Body';
import { Heading2 } from '@/components/typography/Heading';
import { Label } from '@/components/typography/Label';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { ProductCapture, CAPTURE_SIZES } from '@/components/media/ProductCapture';
import { RECORD_VIEW_APP, RECORD_VIEW_PROVENANCE } from '@/components/media/captures';
import { RECEIPT_TERM, RECEIPT_TERM_PLURAL } from '@/config/site';
import { sampleArtifacts } from '@/lib/artifacts';

export const metadata: Metadata = {
  title: `${RECEIPT_TERM_PLURAL}: Thursdai`,
  description: `Thursdai writes an ${RECEIPT_TERM} for each decision an AI system makes: what it decided, which policies ran, the evidence it used and who reviewed it, signed so any change is detectable.`,
};

const DOWNLOADS = sampleArtifacts().filter((d) => d.href.includes('receipt'));

export default function AiReceiptsPage() {
  return (
    <ProductPillar
      crumb={RECEIPT_TERM_PLURAL}
      label={RECEIPT_TERM_PLURAL}
      title="A signed record of every AI decision."
      demoHref="/demo#receipt"
      promise={
        <>
          Thursdai writes an {RECEIPT_TERM} for each decision an AI system makes: what it decided, which
          policies ran, the evidence it used and who reviewed it, signed so that any later change shows.
        </>
      }
      visual={<ReceiptFrame {...SAMPLE_HIRING_RECEIPT} style={{ marginLeft: 'auto' }} />}
      facts={{
        label: 'On the receipt',
        title: 'What a receipt holds.',
        items: [
          {
            label: 'Source',
            body: (
              <>
                The system that made the decision, with its model, host and version. Thursdai records
                decisions made by other systems, so the source is named on every receipt.
              </>
            ),
          },
          {
            label: 'Policy',
            body: <>Every policy that ran against the decision, the version that ran and its result.</>,
          },
          {
            label: 'Evidence',
            body: (
              <>
                The documents and data the decision drew on, what the human reviewer did and the time to the second.
              </>
            ),
          },
        ],
      }}
      diagram={{
        label: 'How a receipt is made',
        title: 'Capture, check, sign.',
        body: (
          <>
            The decision arrives from the system that made it. Thursdai captures it with its context,
            checks it against your policies and signs the result. Nothing is reconstructed after the fact.
          </>
        ),
        figure: <ThreeStepsDiagram />,
      }}
      verify={
        <>
          The receipt on this page is the sample from the demo: a fictional tenant with a genuine
          signature. Its id, hash and fields are read from the same signed file the verifier checks.
        </>
      }
      close={{
        title: 'Verify a signed receipt.',
        body: (
          <>
            The demo holds a signed {RECEIPT_TERM} from a fictional tenant. Check its signature, then change
            one field and watch the check fail. No login.
          </>
        ),
      }}
    >
      {/* The real record view in the app, from staging (unsigned there). The signed sample stays in the hero. */}
      <Section>
        <Container>
          <Label as="p">In the app</Label>
          <Heading2 style={{ marginTop: '1rem' }}>A decision record, in the app.</Heading2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12" style={{ marginTop: '3rem' }}>
            <ProductCapture capture={RECORD_VIEW_APP} sizes={CAPTURE_SIZES.full} className="lg:col-span-12" />
            <ProductCapture
              capture={RECORD_VIEW_PROVENANCE}
              sizes={CAPTURE_SIZES.eight}
              className="lg:col-start-5 lg:col-span-8"
            />
          </div>
        </Container>
      </Section>
      <ProductPillarSection label="Take it with you" title="The sample, as files.">
        <Body>
          Download the sample receipt and check it without us. The JSON carries the record, its signature
          and the public key.
        </Body>
        <ul className="list-none m-0 p-0" style={{ borderTop: '1px solid var(--ink)' }}>
          {DOWNLOADS.map((d) => (
            <li key={d.href} style={{ borderBottom: '1px solid var(--rule)', padding: '0.875rem 0' }}>
              <a href={d.href} download style={{ fontSize: '17px', fontWeight: 500 }}>
                {d.title}
              </a>
              <span style={{ ...LABEL_STYLE, display: 'block', marginTop: '0.25rem', color: 'var(--ink-3)' }}>
                {d.meta.join(' · ')}
              </span>
            </li>
          ))}
        </ul>
      </ProductPillarSection>
    </ProductPillar>
  );
}
