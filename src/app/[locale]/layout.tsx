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
  description: "System Kyron es el ecosistema integral definitivo para empresas modernas. Unificamos automatización contable, cumplimiento fiscal SENIAT, gestión estratégica de RR.HH., telecomunicaciones de misión crítica y finanzas avanzadas con IA y Blockchain en un solo Centro de Mando omnicanal.",
  keywords: ["ERP Venezuela", "Contabilidad Automatizada", "SENIAT", "Blockchain", "IA Empresarial", "Telecomunicaciones", "Gestión de Holding", "Finanzas Digitales"],
  authors: [{ name: "System Kyron" }],
  openGraph: {
    title: "System Kyron - El Futuro de la Gestión Empresarial",
    description: "Automatización total, cumplimiento garantizado y seguridad inmutable para el empresario global.",
    url: "https://systemkyron.com",
    siteName: "System Kyron",
    locale: "es_VE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "System Kyron - Ecosistema de Gestión Inteligente",
    description: "Unificamos todos tus departamentos en una sola plataforma impulsada por IA y Blockchain.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <body className="min-h-screen font-sans selection:bg-primary/10">
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