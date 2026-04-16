import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Instrument_Serif } from 'next/font/google';
import { TopNav } from '@/components/nav/TopNav';
import { Footer } from '@/components/nav/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Thursdai — The Governed Agent Substrate for Regulated Enterprises',
  description:
    'Thursdai gives regulated enterprises a governed AI agent substrate with role-based moderation, decision replay, and policy-as-code. Published pricing. EU AI Act ready.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thursdai.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thursdai.com',
    siteName: 'Thursdai',
    title: 'Thursdai — The Governed Agent Substrate for Regulated Enterprises',
    description:
      'Thursdai gives regulated enterprises a governed AI agent substrate with role-based moderation, decision replay, and policy-as-code. Published pricing. EU AI Act ready.',
    images: [
      {
        url: '/og-backgrounds/default.png',
        width: 1200,
        height: 630,
        alt: 'Thursdai — The Governed Agent Substrate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@thursdai',
    creator: '@thursdai',
    title: 'Thursdai — The Governed Agent Substrate for Regulated Enterprises',
    description:
      'Thursdai gives regulated enterprises a governed AI agent substrate with role-based moderation, decision replay, and policy-as-code.',
    images: ['/og-backgrounds/default.png'],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Thursdai',
  url: 'https://thursdai.com',
  logo: 'https://thursdai.com/og-backgrounds/logo.png',
  sameAs: [
    'https://linkedin.com/company/thursdai',
    'https://github.com/thursdai',
    'https://x.com/thursdai',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Thursdai',
  url: 'https://thursdai.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://thursdai.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        {/* Dark mode script — runs before React hydrates to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('thursdai-color-mode');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored || (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* RSS feed discovery */}
        <link rel="alternate" type="application/rss+xml" title="Thursdai Blog" href="/feed.xml" />
      </head>
      <body>
        <TopNav />
        <main>{children}</main>
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
