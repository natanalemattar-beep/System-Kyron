
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NextIntlClientProvider } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from "next/navigation";
import { i18n } from "@/i18n";

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  
  if (!i18n.locales.includes(locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head />
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
              {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
