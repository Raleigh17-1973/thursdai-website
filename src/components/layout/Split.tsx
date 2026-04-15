import React from 'react';

type SplitRatio = '50/50' | '60/40' | '40/60';

interface SplitProps {
  left: React.ReactNode;
  right: React.ReactNode;
  ratio?: SplitRatio;
  reverseOnMobile?: boolean;
  gap?: 'md' | 'lg' | 'xl';
  className?: string;
  alignItems?: 'start' | 'center' | 'end';
}

const ratioMap: Record<SplitRatio, string> = {
  '50/50': 'grid-cols-1 md:grid-cols-2',
  '60/40': 'grid-cols-1 md:grid-cols-[3fr_2fr]',
  '40/60': 'grid-cols-1 md:grid-cols-[2fr_3fr]',
};

const gapMap = {
  md: 'gap-8 md:gap-12',
  lg: 'gap-12 md:gap-16',
  xl: 'gap-16 md:gap-24',
} as const;

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
} as const;

export function Split({
  left,
  right,
  ratio = '50/50',
  reverseOnMobile = false,
  gap = 'lg',
  className = '',
  alignItems = 'center',
}: SplitProps) {
  return (
    <div
      className={`grid ${ratioMap[ratio]} ${gapMap[gap]} ${alignMap[alignItems]} ${className}`}
    >
      <div className={reverseOnMobile ? 'order-2 md:order-1' : ''}>{left}</div>
      <div className={reverseOnMobile ? 'order-1 md:order-2' : ''}>{right}</div>
    </div>
  );
}
