import { ReactNode } from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { VoiceAssistant } from "@/components/voice-assistant";
import { locales } from '@/navigation';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * @fileOverview Layout i18n para rutas localizadas.
 * Actúa como un wrapper de contexto dentro del RootLayout principal.
 */
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <DynamicBackground />
      <div className="relative flex min-h-screen flex-col">
        {children}
        <VoiceAssistant />
      </div>
    </NextIntlClientProvider>
  );
}