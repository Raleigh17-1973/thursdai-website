import React from 'react';
import Link from 'next/link';
import { ThursdaiWordmark } from './ThursdaiWordmark';
import { CookieSettingsButton } from '@/components/consent/CookieSettingsButton';
import { FOOTER_COLUMNS, type FooterColumn } from '@/config/nav';
import { CONTACT_EMAIL } from '@/config/site';
import { getAllChangelog, getAllPosts } from '@/lib/velite';

// Legal pages sit in the bottom row rather than a column: they are drafts pending legal review
// and noindex, so they stay out of the sitemap and the nav columns that mirror it.
const LEGAL = [
  { href: '/privacy', label: 'Privacy policy' },
  { href: '/terms', label: 'Terms of use' },
];

// The blog and changelog join their columns only while they have published entries, the
// same rule the sitemap follows, so the footer never links an index that would 404.
async function columns(): Promise<FooterColumn[]> {
  const [posts, changelog] = await Promise.all([getAllPosts(), getAllChangelog()]);
  return FOOTER_COLUMNS.map((col) => {
    if (col.heading === 'Developers' && changelog.length) {
      return { ...col, links: [...col.links, { label: 'Changelog', href: '/developers/changelog' }] };
    }
    if (col.heading === 'Company' && posts.length) {
      return { ...col, links: [...col.links, { label: 'Blog', href: '/resources/blog' }] };
    }
    return col;
  });
}

// Paper, a hairline top rule, the wordmark and one column per nav section. No newsletter:
// the old form posted nowhere, and a form that silently drops an address is worse than none.
export async function Footer() {
  const cols = await columns();
  return (
    <footer style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-16 pb-10 md:pt-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" aria-label="Thursdai home" className="inline-block no-underline hover:no-underline">
              <ThursdaiWordmark fontSize={30} />
            </Link>
            <p
              className="m-0"
              style={{
                marginTop: '1rem',
                fontFamily: 'var(--font-display)',
                fontSize: '17px',
                lineHeight: 1.4,
                color: 'var(--ink)',
              }}
            >
              Every AI decision, on the record.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.heading}>
              <h2 className="rec-label mb-4 mt-0">{col.heading}</h2>
              <ul className="space-y-3 list-none p-0 m-0">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link text-[15px]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4 pt-6 mt-14"
          style={{ borderTop: '1px solid var(--rule)' }}
        >
          <p className="m-0" style={{ color: 'var(--ink-2)', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.04em' }}>
            © 2026 Thursdai
            <span aria-hidden="true" style={{ margin: '0 0.75rem', color: 'var(--ink-3)' }}>·</span>
            <a href={`mailto:${CONTACT_EMAIL}`} className="footer-link">
              {CONTACT_EMAIL}
            </a>
          </p>
          <ul className="flex items-center gap-6 list-none p-0 m-0" aria-label="Legal">
            {LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="footer-link text-[14px]">
                  {l.label}
                </Link>
              </li>
            ))}
            {/* Only when Clarity is configured: without it there is nothing to consent to. */}
            {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
              <li>
                <CookieSettingsButton className="text-[14px]" />
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
