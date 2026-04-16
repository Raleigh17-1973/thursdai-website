import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

// Dawn gradient: indigo → plum → amber (Horizon brand signature)
export function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span className={`dawn-gradient-text ${className}`}>
      {children}
    </span>
  );
}
