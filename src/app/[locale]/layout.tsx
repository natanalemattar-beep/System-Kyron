import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { DynamicBackground } from "@/components/ui/dynamic-background";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "System Kyron - Ecosistema Integral de Gestión, Telecomunicaciones y Finanzas",
  description: "System Kyron es la plataforma definitiva de gestión empresarial 360°. Unifica automatización contable, cumplimiento legal, RR.HH., TPV, telecomunicaciones y finanzas Blockchain. Impulsado por IA para garantizar eficiencia y seguridad inmutable.",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
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
