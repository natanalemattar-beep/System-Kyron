import { ReactNode } from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { DemoBannerProvider } from "@/components/demo-banner";
import { DemoBannerSpacer } from "@/components/demo-banner-spacer";
import { PerformanceProvider } from "@/components/performance-provider";
import { locales } from '@/navigation';
import { notFound } from 'next/navigation';
import { Inter, Outfit } from 'next/font/google';

import { Metadata } from 'next';
import { Providers } from "@/components/providers";


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

import { KyronAssistantWrapper } from "@/components/ai/kyron-assistant-wrapper";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://system-kyron.com'),
    title: {
      template: '%s | System Kyron',
      default: 'System Kyron - Ecosistema de Inteligencia Corporativa 2026',
    },
    description: locale === 'es' 
      ? 'Plataforma líder en gestión empresarial, legal y tecnológica en Venezuela con inteligencia artificial integrada.'
      : 'Leading corporate, legal, and tech platform in Venezuela with integrated AI.',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    themeColor: '#030711',
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

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${outfit.variable} dark overflow-x-hidden`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/icon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/icon-16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wa.me" />
      </head>
      <body className="antialiased font-inter bg-[#030711] text-foreground selection:bg-primary/30 selection:text-white overflow-x-hidden w-full" suppressHydrationWarning>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <PerformanceProvider>
              <DynamicBackground />
              <DemoBannerProvider>
                <DemoBannerSpacer />
                <div className="relative flex min-h-screen flex-col">
                  <main className="flex-1">{children}</main>
                  <KyronAssistantWrapper />

                </div>
              </DemoBannerProvider>
            </PerformanceProvider>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>

  );
}

