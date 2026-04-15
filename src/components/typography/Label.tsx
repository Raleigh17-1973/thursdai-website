import React from 'react';

interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

export function Label({ children, className = '' }: LabelProps) {
  return (
    <span
      className={`text-[11px] font-semibold uppercase tracking-[0.08em] ${className}`}
      style={{ color: 'var(--color-accent)' }}
    >
      {children}
    </span>
  );
}
