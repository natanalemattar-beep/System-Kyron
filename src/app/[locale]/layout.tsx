import { ReactNode } from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Providers } from "@/components/providers";
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { VoiceAssistant } from "@/components/voice-assistant";
import { locales } from '@/navigation';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * @fileOverview Layout principal por idioma.
 * Proporciona el contexto de i18n, los proveedores globales y la estructura HTML base.
 */
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Verificar que el locale sea válido
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Obtener mensajes para el proveedor
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
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
