import type { Metadata } from 'next';
import { Geist, Geist_Mono, Instrument_Serif, Newsreader } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SITE_URL } from '@/config/site';
import './globals.css';

// Geist for text and UI, Latin subset (a fraction of the full variable files the geist
// package ships: about 54KB together instead of 142KB). Geist Mono stays preloaded because
// the hero receipt is set in it and a late swap shifts the hero (CLS).
const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});

// Display face (The Record). Variable with the optical-size axis so H1 can sit at
// opsz 72 and H2 at opsz 36. next/font self-hosts the files at build, so the CSP's
// font-src 'self' holds. The design uses weights 400 and 500 only.
const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal'],
  axes: ['opsz'],
  display: 'swap',
  adjustFontFallback: true,
  variable: '--font-newsreader',
});

// Instrument Serif survives only in the wordmark (italic).
const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

const SITE_TITLE = 'Thursdai: a signed record for every AI decision';
const SITE_DESCRIPTION =
  'Thursdai writes a signed AI Receipt for every decision your AI makes and bundles them into audit-ready packs for the EU AI Act, NYC Local Law 144 and ISO 42001.';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Thursdai',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@thursdai',
    creator: '@thursdai',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Thursdai',
  url: SITE_URL,
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
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${instrumentSerif.variable}`}
    >
      <head>
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
        {/* Microsoft Clarity — loads only when NEXT_PUBLIC_CLARITY_PROJECT_ID is set */}
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");`,
            }}
          />
        )}
      </head>
      <body>
        {children}
        {/* The insights script only exists on Vercel; elsewhere it 404s into the console. */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
