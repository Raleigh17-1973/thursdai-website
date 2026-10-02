import React from 'react';

type BodyVariant = 'base' | 'large' | 'small' | 'mono';

interface BodyProps {
  children: React.ReactNode;
  variant?: BodyVariant;
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

// Geist body copy. base 17/1.6 (the body size), large is the lead paragraph under an H1,
// small is UI-size (15px) supporting copy, mono for inline technical text.
const variantStyles: Record<BodyVariant, React.CSSProperties> = {
  base: { fontSize: '17px', lineHeight: 1.6 },
  large: { fontSize: '20px', lineHeight: 1.55 },
  small: { fontSize: '15px', lineHeight: 1.55 },
  mono: { fontSize: '15px', lineHeight: 1.6, fontFamily: 'var(--font-mono)' },
};

export function Body({ children, variant = 'base', className = '', as: Tag = 'p', style }: BodyProps) {
  return (
    <Tag
      className={className}
      style={{ margin: 0, ...variantStyles[variant], color: 'var(--color-text-secondary)', ...style }}
    >
      {children}
    </Tag>
  );
}
