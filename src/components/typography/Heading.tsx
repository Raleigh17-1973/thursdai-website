import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Heading1({ children, className = '', id }: HeadingProps) {
  return (
    <h1
      id={id}
      className={`text-[32px] md:text-[40px] font-bold leading-tight tracking-tight ${className}`}
      style={{ color: 'var(--color-text-primary)' }}
    >
      {children}
    </h1>
  );
}

export function Heading2({ children, className = '', id }: HeadingProps) {
  return (
    <h2
      id={id}
      className={`text-[24px] md:text-[32px] font-bold leading-tight tracking-tight ${className}`}
      style={{ color: 'var(--color-text-primary)' }}
    >
      {children}
    </h2>
  );
}

export function Heading3({ children, className = '', id }: HeadingProps) {
  return (
    <h3
      id={id}
      className={`text-[20px] md:text-[24px] font-semibold leading-snug ${className}`}
      style={{ color: 'var(--color-text-primary)' }}
    >
      {children}
    </h3>
  );
}

export function Heading4({ children, className = '', id }: HeadingProps) {
  return (
    <h4
      id={id}
      className={`text-[17px] md:text-[20px] font-semibold leading-snug ${className}`}
      style={{ color: 'var(--color-text-primary)' }}
    >
      {children}
    </h4>
  );
}
