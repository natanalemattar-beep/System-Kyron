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
  description: "System Kyron es un ecosistema integral de gestión inteligente, telecomunicaciones y finanzas avanzadas. Unifica en una sola plataforma la automatización contable y administrativa, el cumplimiento legal corporativo, la gestión estratégica de talento humano, servicios de conectividad de misión crítica, un avanzado sistema de alertas predictivas y soluciones financieras impulsadas por Blockchain e IA. Diseñado como un Centro de Mando omnicanal para empresas y holdings, garantiza seguridad inmutable, eficiencia operativa total y crecimiento estratégico.",
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
