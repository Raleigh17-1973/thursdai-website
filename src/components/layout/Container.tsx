import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  /** Long-form column (760px). The column is the measure; prose inside it fills it. */
  narrow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Container({ children, narrow = false, className = '', style }: ContainerProps) {
  // Narrow: 840px outer = a 760px text column inside the 40px desktop gutters.
  const widthClass = narrow ? 'max-w-[840px]' : 'max-w-[1200px]';

  return (
    <div className={`${widthClass} mx-auto px-6 md:px-10 ${className}`} style={style}>
      {children}
    </div>
  );
}
