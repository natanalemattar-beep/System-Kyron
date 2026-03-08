import type { ReactNode } from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { VoiceAssistant } from "@/components/voice-assistant";
import { locales } from "@/navigation";
import { Providers } from "@/components/providers";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/app/globals.css";

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
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen font-sans antialiased selection:bg-primary/10 bg-background text-foreground overflow-x-hidden">
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
              <DynamicBackground />
              <div className="relative flex min-h-screen flex-col">
                  {children}
                  <VoiceAssistant />
              </div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
