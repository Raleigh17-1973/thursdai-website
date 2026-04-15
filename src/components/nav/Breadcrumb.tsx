import Link from 'next/link';
import { Body } from '@/components/typography';

interface BreadcrumbItem {
  label: string;
  href?: string; // omit for current page (last item)
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://thursdai.com${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className={className}>
        <ol style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {items.map((item, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {index > 0 && (
                <span aria-hidden="true" style={{ color: 'var(--color-text-tertiary)' }}>/</span>
              )}
              {item.href ? (
                <Link href={item.href}>
                  <Body variant="small" as="span" style={{ color: 'var(--color-accent)' }}>{item.label}</Body>
                </Link>
              ) : (
                <span aria-current="page">
                  <Body variant="small" as="span">{item.label}</Body>
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
