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
    'bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] focus-visible:outline-[var(--color-border-focus)]',
  secondary:
    'border border-[var(--color-accent)] bg-transparent hover:bg-[var(--color-accent-subtle)] focus-visible:outline-[var(--color-border-focus)]',
  ghost:
    'bg-transparent hover:bg-[var(--color-surface-secondary)] focus-visible:outline-[var(--color-border-focus)]',
};

// Text colour is set inline so it always wins over the global
// `button { color: inherit }` base rule. Without this, a Button nested inside a
// <Link> inherits the anchor's accent colour, so primary buttons render with
// invisible (accent-on-accent) text.
const variantColor: Record<ButtonVariant, string> = {
  primary: '#ffffff',
  secondary: 'var(--color-accent)',
  ghost: 'var(--color-text-secondary)',
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
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      style={{ color: variantColor[variant], ...style }}
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
