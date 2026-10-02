import React from 'react';
import Link from 'next/link';
import { H2_STYLE, H3_STYLE } from '@/components/typography/scale';

// The Record cards: a hairline-ruled box, 2px radius, 32px padding, paper surface.
// No shadows, no hover motion, no icons in circles. A card is a link only when the
// whole card is the only action.

type HeadingLevel = 2 | 3 | 4;

interface BaseCardProps {
  variant?: 'base';
  children: React.ReactNode;
  className?: string;
  href?: string;
  style?: React.CSSProperties;
}

interface FeatureCardProps {
  variant: 'feature';
  icon?: React.ReactNode;
  title: string;
  body: string;
  href?: string;
  className?: string;
  /** Heading element for the title, so pages keep h1 > h2 > h3. Default 3. */
  headingLevel?: HeadingLevel;
}

interface StatCardProps {
  variant: 'stat';
  number: string;
  label: string;
  sub?: string;
  className?: string;
}

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

const baseClass = 'rounded-[2px] p-6 md:p-8';
const baseStyle: React.CSSProperties = {
  border: '1px solid var(--color-border-default)',
  background: 'var(--color-surface-primary)',
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  flexDirection: 'column',
};

function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}

export function Card(props: CardProps) {
  const variant = props.variant ?? 'base';

  if (variant === 'stat') {
    const { number, label, sub, className = '' } = props as StatCardProps;
    return (
      <div className={cx(baseClass, 'flex flex-col gap-2', className)} style={baseStyle}>
        <span style={{ ...H2_STYLE, display: 'block' }}>{number}</span>
        <span className="text-[15px] font-medium" style={{ color: 'var(--color-text-primary)' }}>
          {label}
        </span>
        {sub && (
          <span className="text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
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
      <figure className={cx(baseClass, 'flex flex-col gap-5 m-0', className)} style={baseStyle}>
        <blockquote
          className="m-0"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            lineHeight: 1.45,
            color: 'var(--color-text-primary)',
          }}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption className="flex items-center gap-3">
          {authorImage && (
            <img
              src={authorImage}
              alt={authorName}
              width={36}
              height={36}
              className="object-cover"
              style={{ borderRadius: '2px' }}
            />
          )}
          <div>
            <p className="text-[15px] font-medium m-0" style={{ color: 'var(--color-text-primary)' }}>
              {authorName}
            </p>
            <p className="text-[14px] m-0" style={{ color: 'var(--color-text-secondary)' }}>
              {authorTitle}
              {authorCompany ? `, ${authorCompany}` : ''}
            </p>
          </div>
        </figcaption>
      </figure>
    );
  }

  if (variant === 'feature') {
    const { icon, title, body, href, className = '', headingLevel = 3 } = props as FeatureCardProps;
    const TitleTag = `h${headingLevel}` as 'h2' | 'h3' | 'h4';
    const cardDiv = (
      <div className={cx(baseClass, 'flex flex-col gap-3 flex-1', className)} style={baseStyle}>
        {icon && (
          <div
            className="flex items-center"
            style={{ color: 'color-mix(in srgb, var(--color-text-primary) 60%, transparent)', height: '24px', marginBottom: '8px' }}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <TitleTag style={H3_STYLE}>{title}</TitleTag>
        <p className="m-0 text-[15px] leading-[1.6]" style={{ color: 'var(--color-text-secondary)' }}>
          {body}
        </p>
      </div>
    );
    if (href) {
      return (
        <Link href={href} style={linkStyle}>
          {cardDiv}
        </Link>
      );
    }
    return cardDiv;
  }

  // base
  const { children, href, className = '', style } = props as BaseCardProps;
  const inner = (
    <div className={cx(baseClass, className)} style={{ ...baseStyle, ...style }}>
      {children}
    </div>
  );
  if (href) {
    return (
      <Link href={href} style={linkStyle}>
        {inner}
      </Link>
    );
  }
  return inner;
}
