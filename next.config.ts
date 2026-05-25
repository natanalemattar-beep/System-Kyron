import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import withPWAInit from '@ducanh2912/next-pwa';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  outputFileTracingRoot: __dirname,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    optimizePackageImports: [
      'lucide-react', 'recharts', 'date-fns', 'framer-motion',
      '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select', '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip', '@radix-ui/react-popover',
      '@radix-ui/react-accordion', '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox', '@radix-ui/react-switch',
      '@radix-ui/react-alert-dialog', '@radix-ui/react-collapsible',
      '@radix-ui/react-label', '@radix-ui/react-menubar',
      '@radix-ui/react-progress', '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area', '@radix-ui/react-separator',
      '@radix-ui/react-slider', '@radix-ui/react-toast',
      'zod', 'jose', 'class-variance-authority', 'clsx',
      'tailwind-merge', 'ethers', 'googleapis', 'react-hook-form',
      '@hookform/resolvers', 'embla-carousel-react', 'react-day-picker',
      'react-intersection-observer', 'input-otp',
    ],
  },
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        child_process: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        url: false,
        os: false,
      };
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:/, (resource: { request: string }) => {
          resource.request = resource.request.replace(/^node:/, '');
        })
      );
    }
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'api.qrserver.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          { key: 'Content-Type', value: 'application/manifest+json' },
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
      {
        source: '/((?!(?:api|_next|images|manifest\\.json)).*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};

export default withPWA(withNextIntl(nextConfig));
