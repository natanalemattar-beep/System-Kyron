
/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  experimental: {
  },
  devIndicators: true,
  allowedDevOrigins: ["https://6000-firebase-fintrack-automation2-1759388821350.cluster-f73ibkkuije66wssuontdtbx6q.cloudworkstations.dev", "https://9000-firebase-fintrack-automation2-1759388821350.cluster-f73ibkkuije66wssuontdtbx6q.cloudworkstations.dev"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
       {
        protocol: 'https',
        hostname: 'api.qrserver.com',
      },
       {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
};

module.exports = nextConfig;
