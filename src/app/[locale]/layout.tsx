import type { ReactNode } from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { DynamicBackground } from "@/components/ui/dynamic-background";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "System Kyron - Ecosistema Integral de Gestión, Telecomunicaciones y Finanzas",
    template: "%s | System Kyron"
  },
  description: "System Kyron es el ecosistema integral de gestión inteligente, telecomunicaciones y finanzas avanzadas. Unifica automatización contable, cumplimiento fiscal SENIAT, gestión estratégica de RR.HH., servicios de conectividad de misión crítica y soluciones financieras con Blockchain e IA.",
};

/**
 * LocaleLayout maneja la internacionalización.
 * Ya no define html/body porque eso lo hace el RootLayout principal,
 * evitando duplicación de etiquetas y errores de renderizado.
 */
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
    <NextIntlClientProvider locale={locale} messages={messages}>
        <DynamicBackground />
        <div className="relative flex min-h-screen flex-col">
            {children}
        </div>
    </NextIntlClientProvider>
  );
}
