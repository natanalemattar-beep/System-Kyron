import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 
                (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://system-kyron.com');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/es/', '/en/', '/api/stats', '/sitemap.xml', '/es/sector-privado-system-kyron'],
        disallow: [
          '/api/',
          '/es/dashboard-',
          '/en/dashboard-',
          '/es/contabilidad/',
          '/en/contabilidad/',
          '/es/nominas',
          '/en/nominas',
          '/es/reclutamiento',
          '/en/reclutamiento'
        ],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Claude-Web', 'ClaudeBot', 'Google-Extended'],
        allow: ['/es/', '/en/', '/es/sector-privado-system-kyron', '/es/faq'],
      }
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
