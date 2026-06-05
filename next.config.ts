import type { NextConfig } from 'next';

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
      "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://app.posthog.com https://js.hs-scripts.com https://www.clarity.ms https://scripts.clarity.ms https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self' https://app.posthog.com https://api.hubapi.com https://c.clarity.ms https://vitals.vercel-insights.com",
      "frame-ancestors 'none'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
    ];
  },
  webpack: (config: import('webpack').Configuration) => {
    config.plugins = config.plugins ?? [];
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

export default nextConfig;
