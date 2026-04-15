import React from 'react';

type BadgeVariant = 'teal' | 'green' | 'amber' | 'muted' | 'red';

interface BadgeProps {
  variant?: BadgeVariant; // default: 'muted'
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  teal: { background: 'color-mix(in srgb, var(--color-accent) 15%, transparent)', color: 'var(--color-accent)' },
  green: { background: 'rgba(34,197,94,0.15)', color: 'rgb(22,163,74)' },
  amber: { background: 'rgba(245,158,11,0.15)', color: 'rgb(217,119,6)' },
  muted: { background: 'var(--color-surface-secondary)', color: 'var(--color-text-secondary)' },
  red: { background: 'rgba(239,68,68,0.15)', color: 'rgb(220,38,38)' },
};

export function Badge({ variant = 'muted', children, className = '' }: BadgeProps) {
  return (
    <span
      className={['inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold', className]
        .filter(Boolean)
        .join(' ')}
      style={variantStyles[variant]}
    >
      {children}
    </span>
  );
}
