import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React Server Components (default in Next 15)
  // Strict mode for better debugging
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
