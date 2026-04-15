import React from 'react';

interface LabelProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Label({ children, className = '', style }: LabelProps) {
  return (
    <span
      className={`text-[11px] font-semibold uppercase tracking-[0.08em] ${className}`}
      style={{ color: 'var(--color-accent)', ...style }}
    >
      {children}
    </span>
  );
}
