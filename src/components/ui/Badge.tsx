import React from 'react';

// Mono tag with a hairline frame. Text is always ink-family or indigo so every variant
// passes AA on paper and sunk; amber never carries text (it frames instead).
// 'teal' is kept as an alias for 'indigo' for older call sites.
type BadgeVariant = 'teal' | 'indigo' | 'green' | 'amber' | 'muted' | 'red';

interface BadgeProps {
  variant?: BadgeVariant; // default: 'muted'
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  indigo: { color: 'var(--color-accent)', borderColor: 'currentColor' },
  teal: { color: 'var(--color-accent)', borderColor: 'currentColor' },
  // Status colours are retired outside the receipt: state reads from the frame, not hue.
  green: { color: 'var(--color-text-primary)', borderColor: 'currentColor' },
  amber: { color: 'var(--color-text-secondary)', borderColor: 'var(--color-border-strong)', borderStyle: 'dashed' },
  muted: { color: 'var(--color-text-secondary)', borderColor: 'var(--color-border-strong)' },
  red: { color: 'var(--color-text-primary)', borderColor: 'currentColor' },
};

export function Badge({ variant = 'muted', children, className = '', style }: BadgeProps) {
  return (
    <span
      className={['inline-flex items-center whitespace-nowrap', className].filter(Boolean).join(' ')}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        lineHeight: 1.4,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        padding: '1px 6px',
        borderRadius: '2px',
        borderWidth: '1px',
        borderStyle: 'solid',
        background: 'transparent',
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
