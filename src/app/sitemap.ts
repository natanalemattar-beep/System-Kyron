import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://systemkyron.replit.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const mainRoutes = [
    { url: `${BASE_URL}/es`, lastModified: now, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${BASE_URL}/en`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/es/register`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/es/login`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/es/ecosistema`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/es/manual-usuario`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/es/identidad-marca`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/es/sector-privado-system-kyron`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/es/terms`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE_URL}/es/politica-privacidad`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const dashboardRoutes = [
    '/es/dashboard-empresa',
    '/es/dashboard-rrhh',
    '/es/analisis-rentabilidad',
    '/es/flota-empresarial',
    '/es/mi-linea',
    '/es/marketing',
    '/es/nominas',
    '/es/reclutamiento',
    '/es/salud-seguridad',
    '/es/clima-organizacional',
    '/es/prestaciones-sociales',
    '/es/desarrollo-personal',
  ].map(path => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...mainRoutes, ...dashboardRoutes]
}
