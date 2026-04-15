import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  narrow?: boolean;
  className?: string;
}

export function Container({ children, narrow = false, className = '' }: ContainerProps) {
  const widthClass = narrow
    ? 'max-w-[800px]'
    : 'max-w-[1200px]';

  return (
    <div className={`${widthClass} mx-auto px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}
