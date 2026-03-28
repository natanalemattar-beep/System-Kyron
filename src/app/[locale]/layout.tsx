import { ReactNode } from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { LazyVoiceAssistant } from "@/components/voice-assistant-lazy";
import { locales } from '@/navigation';
import { notFound } from 'next/navigation';

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
      <DynamicBackground />
      <div className="relative flex min-h-screen flex-col">
        {children}
        <LazyVoiceAssistant />
      </div>
    </NextIntlClientProvider>
  );
}
