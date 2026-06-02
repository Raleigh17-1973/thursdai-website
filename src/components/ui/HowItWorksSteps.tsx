'use client';
import React from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    step: '01',
    title: 'You ask a question',
    body: 'Type your question, or connect Thursdai to your existing tools and let it surface decisions automatically.',
  },
  {
    step: '02',
    title: 'Your whole team weighs in',
    body: 'Thursdai consults your Legal, Finance and Operations knowledge simultaneously: each role applies its own rules.',
  },
  {
    step: '03',
    title: 'One sourced, policy-checked answer',
    body: 'You get one clear answer, with citations, a full audit trail and the confidence that it followed every rule you set.',
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
