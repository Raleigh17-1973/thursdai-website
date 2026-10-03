import type { Metadata } from 'next';
import { Geist, Geist_Mono, Instrument_Serif, Newsreader } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SITE_URL } from '@/config/site';
import { BASE_OPEN_GRAPH, SITE_DESCRIPTION, SITE_TITLE } from '@/config/metadata';
import './globals.css';

// Geist for text and UI, Latin subset (a fraction of the full variable files the geist
// package ships: about 54KB together instead of 142KB). Geist Sans is the only preloaded font;
// Geist Mono, Newsreader and the wordmark face are fetched after first paint (below).
const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
});

// Geist Mono is not preloaded (OD-9): its 24KB counted against simulated LCP on every page.
// adjustFontFallback gives the fallback size-adjusted metrics so the swap does not shift labels
// or the hero receipt.
const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
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
  preload: false,
  variable: '--font-newsreader',
});

// Instrument Serif survives only in the wordmark (italic). Deferred like Newsreader (D16): not
// preloaded, and adjustFontFallback is off in favour of 'Thursdai Wordmark Fallback' (globals.css),
// a local serif italic scaled so "thursdai" keeps the same width and baseline. next/font's own
// adjusted fallback is an upright Times face that the browser would slant.
const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  variable: '--font-instrument-serif',
});

// The Newsreader file is 130KB (wght 200-800 x opsz 6-72). Fetched alongside the framework
// JS it pushed simulated mobile LCP past 3s, though first paint never waited for it (swap).
// So on the first page view of a session headings paint in the metric-matched fallback and
// the face is requested after first contentful paint; later views in the session apply it at once
// from cache. The wordmark face goes through the same gate: preload: false alone was not enough,
// because the visible wordmark still requested its file during first layout, inside CI's
// simulated LCP. The classes carry the --font-newsreader and --font-instrument-serif
// declarations from next/font.
const NEWSREADER_FALLBACK = newsreader.style.fontFamily.split(',').slice(1).join(',').trim();
const DISPLAY_FONT_GATE = `(function(){var d=document.documentElement,c=${JSON.stringify([newsreader.variable, instrumentSerif.variable])},k='thursdai-fd';function on(){d.classList.add.apply(d.classList,c);try{sessionStorage.setItem(k,'1')}catch(e){}}try{if(sessionStorage.getItem(k)){on();return}}catch(e){}var P=window.PerformanceObserver;if(P&&P.supportedEntryTypes&&P.supportedEntryTypes.indexOf('paint')>-1){new P(function(l,o){if(l.getEntriesByName('first-contentful-paint').length){o.disconnect();setTimeout(on,0)}}).observe({type:'paint',buffered:true})}else{addEventListener('load',on)}})();`;

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  // og:url and the canonical are set per page by the (marketing) layout (src/config/metadata.ts).
  openGraph: BASE_OPEN_GRAPH,
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Thursdai',
  url: SITE_URL,
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
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ '--font-newsreader-fallback': NEWSREADER_FALLBACK } as React.CSSProperties}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: DISPLAY_FONT_GATE }} />
        <noscript>
          <style>{`html{--font-newsreader:${newsreader.style.fontFamily};--font-instrument-serif:${instrumentSerif.style.fontFamily}}`}</style>
        </noscript>
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
        {children}
        {/* The insights script only exists on Vercel; elsewhere it 404s into the console. */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
