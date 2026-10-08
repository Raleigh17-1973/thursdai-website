import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ProductPillar, PillarStatus } from '@/components/templates/ProductPillar';
import { PolicyFlowDiagram } from '@/components/diagrams/PolicyFlowDiagram';
import { SAMPLE_RECEIPT as R } from '@/lib/receipts/display';

const PolicyEditor = dynamic(() => import('@/components/demos/PolicyEditor').then((m) => m.PolicyEditor));

export const metadata: Metadata = {
  title: 'Policy-as-Code: Thursdai',
  description:
    'Policies are written as code, evaluated at defined points and recorded on the AI Receipt.',
};

const SAMPLE_POLICIES = R.policies_evaluated.map((p) => p.id).join(' and ');

export default function PolicyAsCodePage() {
  return (
    <ProductPillar
      crumb="Policy-as-Code"
      label="Policy-as-Code"
      title="Rules as code. Results on the record."
      status={
        <PillarStatus>
          Policies are set up with you during onboarding; a self-serve editor is not yet available.
        </PillarStatus>
      }
      promise={
        <>
          Policies are written as code, evaluated at defined points and recorded on the receipt.
        </>
      }
      visualLayout="wide"
      visual={<PolicyEditor />}
      visualNote="Choose an example rule to see it evaluated against two contexts."
      facts={{
        label: 'Policy',
        title: 'How a policy works.',
        items: [
          {
            label: 'Written',
            body: (
              <>
                A rule is a small expression: all, any and not combine tests such as equals, greater than
                and in. It carries a version and an effect: allow, deny, require approval or redact.
              </>
            ),
          },
          {
            label: 'Evaluated',
            body: (
              <>
                At defined points, such as a case moving to a new state. The engine checks the rules that
                apply to the context and returns their effects.
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
        title: 'Checked at defined points, then recorded.',
        body: (
          <>
            The rules that apply are evaluated against the decision&apos;s context. Whatever the result, it
            goes on the record.
          </>
        ),
        figure: <PolicyFlowDiagram />,
      }}
      verify={
        <>
          Policy results are part of the signed record, so a result changed after the fact no longer
          matches its signature.
        </>
      }
      close={{
        title: 'See a policy check on the record.',
        body: (
          <>
            In the demo, the sample receipt records two policy results for a vendor agent&apos;s hiring
            decision. Verify it yourself. No login.
          </>
        ),
      }}
    />
  );
}
