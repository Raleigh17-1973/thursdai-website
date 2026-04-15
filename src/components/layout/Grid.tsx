import React from 'react';

type GridCols = 2 | 3 | 4;

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols: GridCols;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

const gapMap = {
  sm: 'gap-4',
  md: 'gap-6 md:gap-8',
  lg: 'gap-8 md:gap-12',
} as const;

const colsMap: Record<GridCols, string> = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-4',
};

export function Grid({ children, cols, gap = 'md', className = '', ...rest }: GridProps) {
  return (
    <div className={`grid ${colsMap[cols]} ${gapMap[gap]} ${className}`} {...rest}>
      {children}
    </div>
  );
}
