import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

// The Record buttons. Primary: indigo fill, paper text. Secondary: 1px ink rule, ink text,
// sunk fill on hover. Ghost: text only. Inside the ink band (.surface-ink) the same
// variables flip, so primary becomes paper fill with ink text. Colours come from CSS
// variables in globals.css; hover only darkens, nothing moves.
const variantStyle: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'var(--btn-bg)',
    color: 'var(--button-primary-fg)',
    border: '1px solid transparent',
  },
  secondary: {
    background: 'var(--btn-bg)',
    color: 'var(--button-secondary-fg)',
    border: '1px solid var(--button-secondary-border)',
  },
  ghost: {
    background: 'var(--btn-bg)',
    color: 'var(--color-accent)',
    border: '1px solid transparent',
  },
};

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'hover:no-underline [--btn-bg:var(--button-primary-bg)] hover:[--btn-bg:var(--button-primary-bg-hover)]',
  secondary:
    'hover:no-underline [--btn-bg:transparent] hover:[--btn-bg:var(--button-secondary-bg-hover)]',
  ghost: '[--btn-bg:transparent] hover:underline underline-offset-4',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-2 text-[14px] gap-1.5',
  md: 'px-5 py-3 text-[15px] gap-2',
  lg: 'px-6 py-3.5 text-[15px] gap-2',
};

function classes(variant: ButtonVariant, size: ButtonSize, className: string) {
  return [
    'inline-flex items-center justify-center rounded-[2px] font-medium leading-none whitespace-nowrap',
    'no-underline transition-colors duration-100 cursor-pointer',
    'disabled:opacity-60 disabled:cursor-not-allowed',
    variantClass[variant],
    sizeClass[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  style,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      style={{ ...variantStyle[variant], ...style }}
      className={classes(variant, size, className)}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

// A link that looks like a button. Use instead of wrapping <Button> in <Link>, which
// nests two interactive elements and creates a double tab stop.
export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  style,
  ...props
}: ButtonLinkProps) {
  const isExternal = /^(mailto:|https?:)/.test(href);
  const shared = {
    ...props,
    style: { ...variantStyle[variant], ...style },
    className: classes(variant, size, className),
  };
  if (isExternal) {
    return (
      <a href={href} {...shared}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...shared}>
      {children}
    </Link>
  );
}
