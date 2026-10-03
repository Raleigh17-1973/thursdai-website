import type { NextConfig } from 'next';
import { posthogApiHost } from './src/lib/posthog-host';

// Browser PostHog sends events here and nowhere else (no scripts from PostHog: posthog-js is
// bundled and external loading is off), so it appears in connect-src only.
const POSTHOG_HOST = posthogApiHost(process.env.NEXT_PUBLIC_POSTHOG_HOST);

class VeliteWebpackPlugin {
  static started = false;
  apply(compiler: import('webpack').Compiler) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === 'development';
      const { build } = await import('velite');
      await build({ watch: dev, clean: !dev });
    });
  }
}

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://js.hs-scripts.com https://www.clarity.ms https://scripts.clarity.ms https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      `connect-src 'self' ${POSTHOG_HOST} https://api.hubapi.com https://c.clarity.ms https://f.clarity.ms https://vitals.vercel-insights.com`,
      "frame-ancestors 'none'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Always inline the PostHog vars, as empty strings when unset, so the client never falls back
  // to process.env at runtime (which pulls a process polyfill into the bundle).
  env: {
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '',
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? '',
  },
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Pricing is not published yet; park the page so it is unreachable.
      { source: '/pricing', destination: '/', permanent: false },
      // Empty placeholder pages retired; send old links to the nearest real page (308).
      { source: '/developers/api', destination: '/developers', permanent: true },
      { source: '/developers/docs', destination: '/developers', permanent: true },
      { source: '/trust/certifications', destination: '/trust', permanent: true },
      // Pages withdrawn on 2026-10-02 because their copy claimed things Thursdai does not do or
      // hold. Their source was deleted in the same change; git history has it. These are 307s, not
      // 308s, so a browser never caches the move and a page can come back once its copy is
      // rebuilt from sources.
      { source: '/trust/deployment', destination: '/trust', permanent: false },
      { source: '/trust/subprocessors', destination: '/security#subprocessors', permanent: false },
      { source: '/trust/annex-iii', destination: '/trust', permanent: false },
      { source: '/trust/data', destination: '/trust', permanent: false },
      { source: '/developers/mcp', destination: '/developers', permanent: false },
      { source: '/developers/sdk', destination: '/developers', permanent: false },
      { source: '/resources/role-bench', destination: '/product', permanent: false },
      { source: '/resources/research', destination: '/product', permanent: false },
      { source: '/product/ambient-cases', destination: '/product', permanent: false },
      { source: '/company', destination: '/company/team', permanent: false },
      { source: '/compare/:path*', destination: '/product', permanent: false },
    ];
  },
  // Production builds use webpack (`next build`), dev keeps Turbopack. Turbopack's production
  // build shipped 125KB of shared JS with about 20KB of its React DOM chunk unused on every
  // page (Lighthouse unused-javascript); webpack ships 102KB and clears that audit.
  // Known Next 15.5 quirk: webpack builds on Windows omit next/font preload links (the font
  // manifest matches a POSIX path). CI and Vercel build on Linux, so they are unaffected.
  webpack: (config: import('webpack').Configuration) => {
    config.plugins = config.plugins ?? [];
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

export default nextConfig;
