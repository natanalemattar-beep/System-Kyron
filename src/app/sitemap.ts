import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 
                (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://system-kyron.com');

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    { url: `${BASE_URL}/es`, lastModified: now, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${BASE_URL}/en`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/es/register`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/es/login`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/es/ecosistema`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/es/manual-usuario`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/es/terms`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE_URL}/es/politica-privacidad`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]
}
