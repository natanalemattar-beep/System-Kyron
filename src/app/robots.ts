import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://systemkyron.replit.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/es/', '/en/', '/api/stats', '/sitemap.xml'],
        disallow: ['/api/', '/es/dashboard-', '/es/contabilidad/', '/es/nominas', '/es/reclutamiento'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
