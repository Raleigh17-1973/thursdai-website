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

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config: import('webpack').Configuration) => {
    config.plugins = config.plugins ?? [];
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

export default nextConfig;
