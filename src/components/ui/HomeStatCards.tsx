'use client';
import React from 'react';
import { CountUp } from '@/components/ui/CountUp';

/**
 * Animated stat cards for the home page "Customers" section (Section 7).
 * Wraps the three stat blocks with CountUp animations.
 * Rendered as a client component so CountUp's IntersectionObserver works.
 */
export function HomeStatCards() {
  const stats = [
    {
      countUp: { to: 4, suffix: '×' },
      label: 'Faster compliance review',
      sub: 'A Financial Services Company',
      description:
        "A financial services company uses Thursdai\u2019s Moderator to route every AI output through Legal, Compliance and Risk before it reaches a relationship manager.",
    },
    {
      countUp: { to: 91, suffix: '%' },
      label: 'Policy violation catch rate',
      sub: 'A Healthcare Organisation',
      description:
        'A healthcare organisation enforces HIPAA policy rules at the model layer. No PII leaves the system without explicit approval.',
    },
    {
      countUp: { to: 2.1, suffix: 'M', prefix: '$', decimals: 1 },
      label: 'Avoided in contract risk',
      sub: 'A Legal Services Firm',
      description:
        'A legal services firm replays every AI-assisted contract review to audit what knowledge was active when a recommendation was made.',
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
      }}
    >
      {stats.map((s) => (
        <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Stat card */}
          <div
            className="border border-[var(--color-border-default)] rounded-xl bg-[var(--color-surface-primary)] hover:shadow-md transition-shadow p-6 flex flex-col gap-1"
          >
            <span className="text-4xl font-bold" style={{ color: 'var(--color-accent)' }}>
              <CountUp
                to={s.countUp.to}
                suffix={s.countUp.suffix}
                prefix={s.countUp.prefix ?? ''}
                decimals={s.countUp.decimals ?? 0}
              />
            </span>
            <span className="text-[15px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {s.label}
            </span>
            <span className="text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>
              {s.sub}
            </span>
          </div>
          {/* Description */}
          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              padding: '0 0.25rem',
            }}
          >
            {s.description}
          </p>
        </div>
      ))}
    </div>
  );
}
