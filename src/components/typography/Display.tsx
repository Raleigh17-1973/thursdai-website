import React from 'react';

interface DisplayProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2';
  style?: React.CSSProperties;
}

export function Display({ children, className = '', as: Tag = 'h1', style }: DisplayProps) {
  return (
    <Tag
      className={`text-[36px] md:text-[56px] font-bold leading-[1.05] tracking-[-0.02em] ${className}`}
      style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)', ...style }}
    >
      {children}
    </Tag>
  );
}
