import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://systemkyron.replit.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/es/', '/en/', '/api/stats', '/sitemap.xml'],
        disallow: [
          '/api/',
          '/es/dashboard-',
          '/en/dashboard-',
          '/es/contabilidad/',
          '/en/contabilidad/',
          '/es/nominas',
          '/en/nominas',
          '/es/reclutamiento',
          '/en/reclutamiento',
          '/es/sector-privado-system-kyron',
          '/en/sector-privado-system-kyron',
          '/es/identidad-marca',
          '/en/identidad-marca',
          '/es/salud-seguridad',
          '/es/clima-organizacional',
          '/es/prestaciones-sociales',
          '/es/desarrollo-personal',
          '/es/flota-empresarial',
          '/es/mi-linea',
          '/es/analisis-rentabilidad',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
