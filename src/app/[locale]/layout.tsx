
import type { ReactNode } from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { VoiceAssistant } from "@/components/voice-assistant";

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
            <VoiceAssistant />
        </div>
    </NextIntlClientProvider>
  );
}
