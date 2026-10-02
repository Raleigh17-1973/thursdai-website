import React from 'react';

type CalloutVariant = 'info' | 'warning' | 'danger';

interface CalloutProps {
  variant?: CalloutVariant; // default: 'info'
  title?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// A ruled note: a 2px rule on the left, no tint. info rules in indigo, warning and
// danger in ink (status colours are retired outside the receipt). Reads like an
// annotation in the margin of a document.
const ruleColor: Record<CalloutVariant, string> = {
  info: 'var(--color-accent)',
  warning: 'var(--color-text-primary)',
  danger: 'var(--color-text-primary)',
};

export function Callout({ variant = 'info', title, children, className = '', style }: CalloutProps) {
  return (
    <div
      className={['py-1 pl-5', className].filter(Boolean).join(' ')}
      style={{
        borderLeft: `2px solid ${ruleColor[variant]}`,
        ...style,
      }}
      role={variant === 'danger' ? 'alert' : undefined}
    >
      {title && (
        <p
          className="m-0 mb-2"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}
        >
          {title}
        </p>
      )}
      <div className="text-[15px] leading-[1.6]" style={{ color: 'var(--color-text-secondary)' }}>
        {children}
      </div>
    </div>
  );
}
