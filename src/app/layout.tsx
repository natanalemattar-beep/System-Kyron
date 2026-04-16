import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Inter } from 'next/font/google';
import { JetBrains_Mono } from 'next/font/google';
import { Providers } from "@/components/providers";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://systemkyron.replit.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "System Kyron — Inteligencia Corporativa Venezuela",
    template: "%s — System Kyron",
  },
  description:
    "Ecosistema corporativo de misión crítica para Venezuela. Asesoría Contable, Mi Línea 5G, IA Legal, Eco-Créditos y cumplimiento SENIAT en tiempo real.",
  keywords: [
    "contabilidad venezuela", "VEN-NIF", "SENIAT", "ISLR", "IVA Venezuela",
    "nómina Venezuela", "LOTTT", "Mi Línea 5G", "eSIM Venezuela",
    "software empresarial Venezuela", "ERP Venezuela", "System Kyron",
    "Ameru eco-creditos", "inteligencia corporativa", "gestión empresarial"
  ],
  authors: [{ name: "System Kyron", url: BASE_URL }],
  creator: "System Kyron",
  publisher: "System Kyron",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: BASE_URL,
    siteName: "System Kyron",
    title: "System Kyron — Inteligencia Corporativa Venezuela",
    description: "Ecosistema corporativo de misión crítica. Asesoría Contable, Mi Línea 5G, IA Legal y cumplimiento SENIAT.",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "System Kyron" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "System Kyron — Inteligencia Corporativa Venezuela",
    description: "Ecosistema corporativo de misión crítica para Venezuela.",
    images: [`${BASE_URL}/og-image.png`],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/icon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/icon-16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="dns-prefetch" href="https://wa.me" />
      </head>
      <body className="min-h-screen font-sans antialiased selection:bg-primary/10 bg-background text-foreground" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
