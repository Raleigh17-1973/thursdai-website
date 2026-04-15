import React from 'react';

type BodyVariant = 'base' | 'large' | 'small' | 'mono';

interface BodyProps {
  children: React.ReactNode;
  variant?: BodyVariant;
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

const variantStyles: Record<BodyVariant, React.CSSProperties> = {
  base: { fontSize: '17px', lineHeight: 1.6 },
  large: { fontSize: '20px', lineHeight: 1.6 },
  small: { fontSize: '14px', lineHeight: 1.5 },
  mono: { fontSize: '15px', lineHeight: 1.6, fontFamily: 'var(--font-mono)' },
};

export function Body({ children, variant = 'base', className = '', as: Tag = 'p', style }: BodyProps) {
  return (
    <Tag
      className={className}
      style={{ ...variantStyles[variant], color: 'var(--color-text-secondary)', ...style }}
    >
      {children}
    </Tag>
  );
}
