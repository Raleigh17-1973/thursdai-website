import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span
      className={`bg-gradient-to-r from-teal-700 to-emerald-500 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}
