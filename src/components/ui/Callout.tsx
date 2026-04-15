import React from 'react';

type CalloutVariant = 'info' | 'warning' | 'danger';

interface CalloutProps {
  variant?: CalloutVariant; // default: 'info'
  title?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles: Record<
  CalloutVariant,
  { borderColor: string; background: string; titleColor: string }
> = {
  info: {
    borderColor: 'var(--color-accent)',
    background: 'color-mix(in srgb, var(--color-accent) 8%, transparent)',
    titleColor: 'var(--color-accent)',
  },
  warning: {
    borderColor: 'rgb(245,158,11)',
    background: 'rgba(245,158,11,0.08)',
    titleColor: 'rgb(217,119,6)',
  },
  danger: {
    borderColor: 'rgb(239,68,68)',
    background: 'rgba(239,68,68,0.08)',
    titleColor: 'rgb(220,38,38)',
  },
};

export function Callout({ variant = 'info', title, children, className = '', style }: CalloutProps) {
  const { borderColor, background, titleColor } = variantStyles[variant];

  return (
    <div
      className={['rounded-r-lg px-4 py-3', className].filter(Boolean).join(' ')}
      style={{
        borderLeft: `4px solid ${borderColor}`,
        background,
        ...style,
      }}
      role={variant === 'danger' ? 'alert' : undefined}
    >
      {title && (
        <p className="text-[13px] font-semibold mb-1" style={{ color: titleColor }}>
          {title}
        </p>
      )}
      <div className="text-[14px] leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
        {children}
      </div>
    </div>
  );
}
