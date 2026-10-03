import type { Metadata } from 'next';

export const SITE_TITLE = 'Thursdai: a signed record for every AI decision';
export const SITE_DESCRIPTION =
  'Thursdai writes a signed AI Receipt for every decision you route to it, and gives you the record to answer for it.';

/** Open Graph fields every page shares. A segment that sets `openGraph` replaces its parent's, so spread this. */
export const BASE_OPEN_GRAPH = {
  type: 'website',
  locale: 'en_US',
  siteName: 'Thursdai',
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
} satisfies NonNullable<Metadata['openGraph']>;

/**
 * Per-page share URL and canonical for the marketing pages. './' resolves against the root
 * metadataBase and each page's own pathname at build time, so every page shares and
 * canonicalizes as itself and stays static. Kept off the root layout so the built-in 404
 * does not get a canonical pointing at /_not-found.
 */
export const PAGE_URL_METADATA = {
  alternates: { canonical: './' },
  openGraph: { ...BASE_OPEN_GRAPH, url: './' },
} satisfies Metadata;