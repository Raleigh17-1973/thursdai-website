'use client';
import React from 'react';
import { motion } from 'framer-motion';

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

export function HowItWorksSteps() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
      {STEPS.map(({ step, title, body }, index) => (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <span
            style={{
              fontSize: '3rem',
              fontWeight: 800,
              color: 'var(--color-accent)',
              lineHeight: 1,
            }}
          >
            {step}
          </span>
          <h2
            style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: 0,
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              margin: 0,
            }}
          >
            {body}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
