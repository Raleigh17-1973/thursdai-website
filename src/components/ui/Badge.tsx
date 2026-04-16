import React from 'react';

// 'teal' kept as alias for 'indigo' — backward compat; colors are now brand-correct.
type BadgeVariant = 'teal' | 'indigo' | 'green' | 'amber' | 'muted' | 'red';

interface BadgeProps {
  variant?: BadgeVariant; // default: 'muted'
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  indigo: { background: 'color-mix(in srgb, var(--color-accent) 15%, transparent)', color: 'var(--color-accent)' },
  teal:   { background: 'color-mix(in srgb, var(--color-accent) 15%, transparent)', color: 'var(--color-accent)' },
  green:  { background: 'rgba(34,197,94,0.15)', color: 'rgb(22,163,74)' },
  amber:  { background: 'rgba(232,163,74,0.18)', color: 'rgb(180,120,30)' },
  muted:  { background: 'var(--color-surface-secondary)', color: 'var(--color-text-secondary)' },
  red:    { background: 'rgba(239,68,68,0.15)', color: 'rgb(220,38,38)' },
};

export function Badge({ variant = 'muted', children, className = '', style }: BadgeProps) {
  return (
    <span
      className={['inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold', className]
        .filter(Boolean)
        .join(' ')}
      style={{ ...variantStyles[variant], ...style }}
    >
      {children}
    </span>
  );
}
