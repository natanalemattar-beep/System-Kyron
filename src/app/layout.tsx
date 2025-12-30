
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "./globals.css";

// This is the ROOT layout. It should only contain elements that are truly global,
// like providers and global styles. Specific headers/footers belong in nested layouts.

export default async function RootLayout({
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
        <NextIntlClientProvider messages={messages}>
          <Providers>
              {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
