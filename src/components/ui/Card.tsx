import React from 'react';
import Link from 'next/link';

// Base card
interface BaseCardProps {
  variant?: 'base';
  children: React.ReactNode;
  className?: string;
  href?: string;
}

// Feature card (icon + title + body)
interface FeatureCardProps {
  variant: 'feature';
  icon?: React.ReactNode;
  title: string;
  body: string;
  href?: string;
  className?: string;
}

// Stat card (big number + label + sub)
interface StatCardProps {
  variant: 'stat';
  number: string;
  label: string;
  sub?: string;
  className?: string;
}

// Quote card
interface QuoteCardProps {
  variant: 'quote';
  quote: string;
  authorName: string;
  authorTitle: string;
  authorCompany?: string;
  authorImage?: string;
  className?: string;
}

type CardProps = BaseCardProps | FeatureCardProps | StatCardProps | QuoteCardProps;

const baseClass =
  'border border-[var(--color-border-default)] rounded-xl bg-[var(--color-surface-primary)] hover:shadow-md transition-shadow';

export function Card(props: CardProps) {
  const variant = props.variant ?? 'base';

  if (variant === 'stat') {
    const { number, label, sub, className = '' } = props as StatCardProps;
    return (
      <div className={[baseClass, 'p-6 flex flex-col gap-1', className].filter(Boolean).join(' ')}>
        <span
          className="text-4xl font-bold"
          style={{ color: 'var(--color-accent)' }}
        >
          {number}
        </span>
        <span className="text-[15px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          {label}
        </span>
        {sub && (
          <span className="text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>
            {sub}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'quote') {
    const { quote, authorName, authorTitle, authorCompany, authorImage, className = '' } =
      props as QuoteCardProps;
    return (
      <figure
        className={[baseClass, 'p-6 flex flex-col gap-4', className].filter(Boolean).join(' ')}
      >
        <blockquote className="text-[15px] italic leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption className="flex items-center gap-3">
          {authorImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={authorImage}
              alt={authorName}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          )}
          <div>
            <p className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {authorName}
            </p>
            <p className="text-[12px]" style={{ color: 'var(--color-text-secondary)' }}>
              {authorTitle}
              {authorCompany ? `, ${authorCompany}` : ''}
            </p>
          </div>
        </figcaption>
      </figure>
    );
  }

  if (variant === 'feature') {
    const { icon, title, body, href, className = '' } = props as FeatureCardProps;
    const inner = (
      <div className={[baseClass, 'p-6 flex flex-col gap-3', className].filter(Boolean).join(' ')}>
        {icon && (
          <div
            className="w-10 h-10 flex items-center justify-center rounded-lg"
            style={{ background: 'color-mix(in srgb, var(--color-accent) 12%, transparent)', color: 'var(--color-accent)' }}
          >
            {icon}
          </div>
        )}
        <h3 className="text-[16px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          {title}
        </h3>
        <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {body}
        </p>
      </div>
    );
    if (href) {
      return (
        <Link href={href} style={{ textDecoration: 'none' }}>
          {inner}
        </Link>
      );
    }
    return inner;
  }

  // base
  const { children, href, className = '' } = props as BaseCardProps;
  const inner = (
    <div className={[baseClass, 'p-6', className].filter(Boolean).join(' ')}>{children}</div>
  );
  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none' }}>
        {inner}
      </Link>
    );
  }
  return inner;
}
