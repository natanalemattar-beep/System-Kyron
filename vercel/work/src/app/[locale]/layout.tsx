import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { DynamicBackground } from "@/components/ui/dynamic-background";
import "../globals.css";

export default async function LocaleLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  
  const messages = await getMessages();

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
