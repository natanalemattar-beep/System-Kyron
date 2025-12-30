
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from "next/navigation";
import { i18n } from "@/i18n";
import { DynamicBackground } from "@/components/ui/dynamic-background";

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  
  if (!i18n.locales.includes(locale)) {
    notFound();
  }

  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head />
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
              <DynamicBackground />
              {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
