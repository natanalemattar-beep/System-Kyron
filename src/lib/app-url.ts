export function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL
    || process.env.NEXT_PUBLIC_SITE_URL
    || process.env.APP_URL
    || process.env.VERCEL_URL
    || process.env.NEXT_PUBLIC_VERCEL_URL
    || '';
}

export const APP_DOMAIN = 'system-kyron.vercel.app';
