import React from 'react';

type SectionVariant = 'default' | 'compact' | 'flush';

interface SectionProps {
  children: React.ReactNode;
  variant?: SectionVariant;
  className?: string;
  as?: React.ElementType;
  id?: string;
  style?: React.CSSProperties;
}

const paddingMap: Record<SectionVariant, string> = {
  default: 'py-16 md:py-[7.5rem]',
  compact: 'py-10 md:py-16',
  flush: '',
};

export function Section({
  children,
  variant = 'default',
  className = '',
  as: Tag = 'section',
  id,
  style,
}: SectionProps) {
  return (
    <Tag id={id} className={`${paddingMap[variant]} ${className}`} style={style}>
      {children}
    </Tag>
  );
}
