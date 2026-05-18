import { ReactNode } from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { DemoBannerProvider } from "@/components/demo-banner";
import { DemoBannerSpacer } from "@/components/demo-banner-spacer";
import { locales } from '@/navigation';
import { notFound } from 'next/navigation';
import { Inter, Outfit, Lora } from 'next/font/google';

import { Providers } from "@/components/providers";


const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#030711',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://system-kyron.vercel.app'),
    title: {
      template: '%s | System Kyron',
      default: 'System Kyron - Ecosistema de Inteligencia Corporativa 2026',
    },
    description: locale === 'es' 
      ? 'Plataforma líder en gestión empresarial, legal y tecnológica en Venezuela. EMPRENDIMIENTO CARLOS MATTAR (RIF: J-50832149-9).'
      : 'Leading corporate, legal, and tech platform in Venezuela. EMPRENDIMIENTO CARLOS MATTAR (RIF: J-50832149-9).',
    manifest: '/manifest.json',
  };
}



export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${outfit.variable} ${lora.variable} dark overflow-x-hidden`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/icon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/icon-16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
      </head>
      <body className="antialiased font-inter bg-[#030711] text-foreground selection:bg-primary/30 selection:text-white overflow-x-hidden w-full" suppressHydrationWarning>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <DynamicBackground />
            <div className="flex flex-col min-h-screen relative">
              <DemoBannerProvider>
                <DemoBannerSpacer />
                <div className="relative flex min-h-screen flex-col">
                  <main className="flex-1">{children}</main>
                </div>
              </DemoBannerProvider>

            </div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>

  );
}

