import { ReactNode } from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { DemoBannerProvider } from "@/components/demo-banner";
import { DemoBannerSpacer } from "@/components/demo-banner-spacer";
import { PerformanceProvider } from "@/components/performance-provider";
import { locales } from '@/navigation';
import { notFound } from 'next/navigation';
import { OfflineIndicator } from "@/components/landing/offline-indicator";

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
    <NextIntlClientProvider locale={locale} messages={messages}>
      <PerformanceProvider>
        <DynamicBackground />
        <DemoBannerProvider>
          <DemoBannerSpacer />
          <div className="relative flex min-h-screen flex-col">
            {children}
            <OfflineIndicator />
          </div>
        </DemoBannerProvider>
      </PerformanceProvider>
    </NextIntlClientProvider>
  );
}
