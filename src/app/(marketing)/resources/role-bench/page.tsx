import React from 'react';
import type { Metadata } from 'next';
import { Body } from '@/components/typography/Body';
import { LABEL_STYLE } from '@/components/typography/scale';
import { LongForm, LongFormSection } from '@/components/templates/LongForm';
import { RoleBenchSubmitForm, RoleBenchNotifyForm } from '@/components/content/RoleBenchTable';

export const metadata: Metadata = {
  title: 'Role Bench: Thursdai',
  description:
    'Role Bench is the evaluation Thursdai is building to compare role-panel answers with single-model answers across domains. No results are published yet.',
};

const MEASURES = [
  {
    label: 'Accuracy',
    body: 'Whether the answer is right for its domain, scored by domain experts against a reference answer set.',
  },
  {
    label: 'Citation precision',
    body: 'Whether each cited source exists in the knowledge base and supports the claim it is cited for.',
  },
  {
    label: 'Policy compliance',
    body: 'Whether the answer meets the active policy set, recorded as pass or fail for each rule.',
  },
];

export default function RoleBenchPage() {
  return (
    <LongForm
      meta={['Research', 'Role Bench', 'No results published']}
      title="A benchmark for role-based answers."
      lead={
        <>
          Role Bench is the evaluation we are building to compare answers from Thursdai&apos;s role panel
          with single-model answers in domains such as Legal, Finance, Engineering and HR. It has no results
          yet, and this page shows none until the evaluation is complete.
        </>
      }
    >
      <LongFormSection title="What it measures">
        <Body>
          The design is simple. Each question is answered twice: once by the role panel with its policies and tenant knowledge,
          once by a single model with the same question and no panel. Both answers are scored the same way.
        </Body>
        <dl className="m-0" style={{ borderTop: '1px solid var(--rule)' }}>
          {MEASURES.map((m) => (
            <div
              key={m.label}
              className="grid grid-cols-1 sm:grid-cols-[176px_1fr] gap-x-6 gap-y-1"
              style={{ padding: '1.25rem 0', borderBottom: '1px solid var(--rule)' }}
            >
              <dt style={{ ...LABEL_STYLE, color: 'var(--ink)', paddingTop: '0.3rem' }}>{m.label}</dt>
              <dd className="m-0" style={{ fontSize: '17px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                {m.body}
              </dd>
            </div>
          ))}
        </dl>
        <Body>
          When there are results we intend to publish the method and the scores by domain, including the
          domains where the panel does worse.
        </Body>
      </LongFormSection>

      <LongFormSection title="Submit a role">
        <Body>
          If you have a role configuration you would like evaluated, send it here. We will be in touch if it
          is selected.
        </Body>
        <RoleBenchSubmitForm />
      </LongFormSection>

      <LongFormSection title="Hear when there are results">
        <Body>We will email you once, when the first results are published, and for nothing else.</Body>
        <div>
          <RoleBenchNotifyForm />
        </div>
      </LongFormSection>
    </LongForm>
  );
}
