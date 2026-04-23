const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  experimental: {
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
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
  allowedDevOrigins: ['*.replit.dev', '*.picard.replit.dev', '*.kirk.replit.dev', '*.spock.replit.dev', '*.riker.replit.dev', '*.janeway.replit.dev'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'api.qrserver.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/images/:path*',
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
    ];
  },
};

module.exports = withPWA(withNextIntl(nextConfig));
