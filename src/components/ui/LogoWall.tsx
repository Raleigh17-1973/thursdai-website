import React from 'react';
import Image from 'next/image';

interface LogoWallProps {
  logos: Array<{
    name: string;
    src: string;
    href?: string;
    width?: number;
    height?: number;
  }>;
  variant?: 'grid' | 'scroll'; // default: 'grid'
  className?: string;
}

function LogoItem({
  name,
  src,
  href,
  width = 120,
  height = 40,
}: LogoWallProps['logos'][number]) {
  const img = src ? (
    <Image
      src={src}
      alt={name}
      width={width}
      height={height}
      className="object-contain max-h-10 w-auto"
      style={{ filter: 'grayscale(1)', opacity: 0.6 }}
    />
  ) : (
    // Placeholder when no image src is available
    <span
      className="text-[13px] font-semibold px-3"
      style={{ color: 'var(--color-text-secondary)' }}
    >
      {name}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={name}
        className="flex items-center justify-center p-4 rounded-lg transition-opacity hover:opacity-100"
        target="_blank"
        rel="noopener noreferrer"
        style={{ opacity: 0.7 }}
      >
        {img}
      </a>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 rounded-lg" aria-label={name}>
      {img}
    </div>
  );
}

export function LogoWall({ logos, variant = 'grid', className = '' }: LogoWallProps) {
  if (variant === 'scroll') {
    return (
      <div className={['overflow-x-auto', className].filter(Boolean).join(' ')}>
        <div className="flex items-center gap-2 min-w-max px-2">
          {logos.map((logo) => (
            <LogoItem key={logo.name} {...logo} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {logos.map((logo) => (
        <LogoItem key={logo.name} {...logo} />
      ))}
    </div>
  );
}
