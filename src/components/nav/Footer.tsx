import React from 'react';
import Link from 'next/link';
import { ThursdaiWordmark } from './ThursdaiWordmark';
import { FOOTER_COLUMNS, type FooterColumn } from '@/config/nav';
import { CONTACT_EMAIL } from '@/config/site';
import { getAllChangelog, getAllPosts } from '@/lib/velite';

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL = [
  { href: 'https://linkedin.com/company/thursdai', label: 'Thursdai on LinkedIn', icon: <LinkedInIcon /> },
  { href: 'https://github.com/thursdai', label: 'Thursdai on GitHub', icon: <GitHubIcon /> },
  { href: 'https://x.com/thursdai', label: 'Thursdai on X', icon: <XIcon /> },
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
            © 2026 Thursdai, Inc.
            <span aria-hidden="true" style={{ margin: '0 0.75rem', color: 'var(--ink-3)' }}>·</span>
            <a href={`mailto:${CONTACT_EMAIL}`} className="footer-link">
              {CONTACT_EMAIL}
            </a>
          </p>
          <ul className="flex items-center gap-1 list-none p-0 m-0 -ml-2 md:ml-0 md:-mr-2">
            {SOCIAL.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link flex items-center justify-center w-10 h-10 rounded-[2px]"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
