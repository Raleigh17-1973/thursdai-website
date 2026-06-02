import React from 'react';
import Link from 'next/link';

function FooterLogo() {
  return (
    <svg
      width="140"
      height="28"
      viewBox="0 0 140 28"
      fill="none"
      aria-label="Thursdai"
      role="img"
    >
      <text
        x="0"
        y="22"
        fontFamily="var(--font-sans)"
        fontSize="22"
        fontWeight="700"
        letterSpacing="-0.03em"
        fill="#ffffff"
      >
        Thursdai
      </text>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const productLinks = [
  { label: 'Moderator', href: '/product/moderator' },
  { label: 'Time-Travel', href: '/product/time-travel' },
  { label: 'Policy-as-Code', href: '/product/policy-as-code' },
  { label: 'Auto-built case files', href: '/product/ambient-cases' },
  { label: 'Your data, kept separate', href: '/product/two-tier-knowledge' },
  { label: 'Role Bench', href: '/resources/role-bench' },
];

const developerLinks = [
  { label: 'Overview', href: '/developers' },
  { label: 'MCP Server', href: '/developers/mcp' },
  { label: 'API Reference', href: '/developers/api' },
  { label: 'SDK', href: '/developers/sdk' },
  { label: 'Documentation', href: '/developers/docs' },
  { label: 'Changelog', href: '/developers/changelog' },
];

const bottomLinks = [
  { label: 'Status', href: 'https://status.thursdai.com', external: true },
  { label: 'Privacy', href: '/privacy', external: false },
  { label: 'Terms', href: '/terms', external: false },
  { label: 'Security', href: '/security', external: false },
];

export function Footer() {
  return (
    <footer className="footer-root" style={{ background: '#0b0f19' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20">
        {/* Four-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Column 1 — Company */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <FooterLogo />
            </div>
            <p className="footer-link text-[14px] leading-relaxed mb-6" style={{ color: '#a1a1aa' }}>
              Your team&apos;s AI: controlled, auditable and safe to use.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/company/thursdai"
                aria-label="Thursdai on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link flex items-center justify-center w-8 h-8 rounded-md"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://github.com/thursdai"
                aria-label="Thursdai on GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link flex items-center justify-center w-8 h-8 rounded-md"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://x.com/thursdai"
                aria-label="Thursdai on X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link flex items-center justify-center w-8 h-8 rounded-md"
              >
                <XIcon />
              </a>
            </div>
          </div>

          {/* Column 2 — Product */}
          <div>
            <h3
              className="text-[12px] font-semibold uppercase tracking-[0.08em] mb-4"
              style={{ color: '#71717a' }}
            >
              Product
            </h3>
            <ul className="space-y-3 list-none p-0 m-0">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link text-[14px]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Developers */}
          <div>
            <h3
              className="text-[12px] font-semibold uppercase tracking-[0.08em] mb-4"
              style={{ color: '#71717a' }}
            >
              Developers
            </h3>
            <ul className="space-y-3 list-none p-0 m-0">
              {developerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link text-[14px]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Stay informed */}
          <div>
            <h3
              className="text-[12px] font-semibold uppercase tracking-[0.08em] mb-4"
              style={{ color: '#71717a' }}
            >
              Stay informed
            </h3>
            <p className="text-[14px] mb-4" style={{ color: '#a1a1aa' }}>
              Product updates, no noise.
            </p>
            {/* Email subscription form — UI only, not wired */}
            <div className="space-y-2">
              <div>
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email address"
                  className="w-full px-3 py-2.5 rounded-lg text-[14px] border"
                  style={{
                    background: '#1a1a1e',
                    borderColor: '#27272a',
                    color: '#e4e4e7',
                  }}
                />
              </div>
              <button
                type="button"
                className="w-full px-4 py-2.5 rounded-lg text-[14px] font-semibold text-white"
                style={{ background: '#3e4fb8', color: '#ffffff', cursor: 'pointer', border: 'none' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid #27272a' }}
        >
          <p className="text-[13px]" style={{ color: '#a1a1aa' }}>
            © 2026 Thursdai, Inc.
          </p>
          <nav aria-label="Legal links">
            <ul className="flex flex-wrap items-center gap-6 list-none p-0 m-0">
              {bottomLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className="footer-link text-[13px]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="footer-link text-[13px]">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
