'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  asChild?: boolean; // for rendering as <a> etc — stub only
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] focus-visible:outline-[var(--color-border-focus)]',
  secondary:
    'border border-[var(--color-accent)] text-[var(--color-accent)] bg-transparent hover:bg-[var(--color-accent-subtle)] focus-visible:outline-[var(--color-border-focus)]',
  ghost:
    'text-[var(--color-text-secondary)] bg-transparent hover:bg-[var(--color-surface-secondary)] focus-visible:outline-[var(--color-border-focus)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-[13px] gap-1.5',
  md: 'px-4 py-2 text-[15px] gap-2',
  lg: 'px-6 py-3 text-[17px] gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  asChild: _asChild,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={[
        'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  );
}
