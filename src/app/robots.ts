import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 
                (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://system-kyron.vercel.app');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/es/', '/en/', '/api/stats', '/sitemap.xml', '/es/triptico'],
        disallow: [
          '/api/',
          '/es/dashboard-',
          '/en/dashboard-',
          '/es/nominas',
          '/en/nominas',
          '/es/reclutamiento',
          '/en/reclutamiento'
        ],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Claude-Web', 'ClaudeBot', 'Google-Extended'],
        allow: ['/es/', '/en/', '/es/triptico', '/es/faq'],
      }
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
