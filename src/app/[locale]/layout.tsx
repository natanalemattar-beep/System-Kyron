
import type { ReactNode } from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { VoiceAssistant } from "@/components/voice-assistant";
import { locales } from "@/navigation";

/**
 * @fileOverview Layout Principal localizado.
 * Manejo asíncrono de params para compatibilidad con Next.js 15.
 */

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params in Next.js 15 to ensure stable locale access
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  // Fetch messages for the provider
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
