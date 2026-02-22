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
  title: {
    default: "System Kyron - Ecosistema Integral de Gestión, Telecomunicaciones y Finanzas",
    template: "%s | System Kyron"
  },
  description: "System Kyron es el ecosistema integral de gestión inteligente, telecomunicaciones y finanzas avanzadas. Unifica automatización contable, cumplimiento fiscal SENIAT, gestión estratégica de RR.HH., servicios de conectividad de misión crítica, un avanzado sistema de alertas predictivas y soluciones financieras con Blockchain e IA.",
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
      <body className="min-h-screen font-sans selection:bg-primary/10 transition-colors duration-300">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
              <DynamicBackground />
              <div className="relative flex min-h-screen flex-col">
                {children}
              </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}