import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ProductPillar } from '@/components/templates/ProductPillar';
import { PolicyFlowDiagram } from '@/components/diagrams/PolicyFlowDiagram';
import { SAMPLE_RECEIPT as R } from '@/lib/receipts/display';

const PolicyEditor = dynamic(() => import('@/components/demos/PolicyEditor').then((m) => m.PolicyEditor));

export const metadata: Metadata = {
  title: 'Policy-as-Code: Thursdai',
  description:
    'Write governance rules as versioned YAML. Thursdai evaluates every decision against them before the answer reaches a user and writes the result onto its AI Receipt.',
};

const SAMPLE_POLICIES = R.policies_evaluated.map((p) => p.id).join(' and ');

export default function PolicyAsCodePage() {
  return (
    <ProductPillar
      crumb="Policy-as-Code"
      label="Policy-as-Code"
      title="Rules as code. Results on the record."
      promise={
        <>
          Your team writes governance rules as versioned YAML, Thursdai evaluates every decision against
          them before the answer reaches a user and the result is written onto the receipt.
        </>
      }
      visualLayout="wide"
      visual={<PolicyEditor />}
      visualNote="Choose a policy to see the YAML and what it does to an answer."
      facts={{
        label: 'Policy',
        title: 'How a policy works.',
        items: [
          {
            label: 'Written',
            body: (
              <>
                Plain YAML, versioned and reviewed like code. Each rule says what it applies to and what
                happens when it fails: redact, block or hold for review.
              </>
            ),
          },
          {
            label: 'Evaluated',
            body: (
              <>
                Before the answer reaches a user, as a check on the output rather than an instruction in a
                prompt that a model can ignore.
              </>
            ),
          },
          {
            label: 'Recorded',
            body: (
              <>
                Every receipt names each policy that ran, its version and its result. The sample receipt
                records two: {SAMPLE_POLICIES}.
              </>
            ),
          },
        ],
      }}
      diagram={{
        label: 'Policy flow',
        title: 'Checked before anyone sees it.',
        body: (
          <>
            The policy sits between the system that proposes an answer and the person who receives it.
            Whatever the result, it goes on the record.
          </>
        ),
        figure: <PolicyFlowDiagram />,
      }}
      verify={
        <>
          Policy results are part of the signed record, so a result cannot be changed after the fact
          without breaking the signature.
        </>
      }
      close={{
        title: 'See a policy check on the record.',
        body: (
          <>
            In the demo, two policies run against a vendor agent&apos;s hiring decision before the receipt is
            signed. Verify it yourself. No login.
          </>
        ),
      }}
    />
  );
}
