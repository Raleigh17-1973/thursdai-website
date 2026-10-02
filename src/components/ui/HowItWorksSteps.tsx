import React from 'react';
import { H3_STYLE, LABEL_STYLE } from '@/components/typography/scale';

const STEPS = [
  {
    step: '01',
    title: 'An AI system makes a decision',
    body: 'Any AI tool in your business, whether your own or a vendor\'s, makes a decision. Thursdai captures it: what was decided, which system made it, which model ran and when.',
  },
  {
    step: '02',
    title: 'Thursdai documents and checks it',
    body: 'Thursdai records the decision and runs it against the regulatory and legal standards that apply to your industry. Which checks ran, what they found and the original decision are all signed into the AI Receipt at the moment it occurs.',
  },
  {
    step: '03',
    title: 'You review, report and prove it',
    body: 'Browse every receipt in the app, surface live compliance metrics on your dashboard or bundle decisions into audit packs for regulators and internal teams.',
  },
];

// Three columns under one rule: a mono step number, a Newsreader title, Geist body.
export function HowItWorksSteps() {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 list-none m-0 p-0">
      {STEPS.map(({ step, title, body }) => (
        <li
          key={step}
          className="flex flex-col gap-4 pt-5"
          style={{ borderTop: '1px solid var(--color-text-primary)' }}
        >
          <span style={LABEL_STYLE}>{step}</span>
          <h3 style={H3_STYLE}>{title}</h3>
          <p className="m-0" style={{ fontSize: '17px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
            {body}
          </p>
        </li>
      ))}
    </ol>
  );
}
