import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Space_Grotesk, Outfit } from 'next/font/google';
import { JetBrains_Mono } from 'next/font/google';
import { Providers } from "@/components/providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 
                (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://system-kyron.vercel.app');

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "System Kyron | Ecosistema Corporativo de Misión Crítica",
    template: "%s — System Kyron",
  },
  description:
    "System Kyron es el ecosistema corporativo de misión crítica líder en Venezuela. Soluciones integrales en Contabilidad VEN-NIF, Telecomunicaciones 5G, IA Legal y Gestión Empresarial.",
  keywords: [
    "contabilidad venezuela", "VEN-NIF", "SENIAT", "ISLR", "IVA Venezuela",
    "nómina Venezuela", "LOTTT", "Mi Línea 5G", "eSIM Venezuela",
    "software empresarial Venezuela", "ERP Venezuela", "System Kyron",
    "Ameru eco-creditos", "inteligencia corporativa", "gestión empresarial",
    "transformación digital Venezuela", "IA corporativa"
  ],
  alternates: {
    canonical: '/',
    languages: {
      'es-VE': '/es',
      'en-US': '/en',
    },
  },
  authors: [{ name: "System Kyron", url: BASE_URL }],
  creator: "System Kyron",
  publisher: "System Kyron",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: BASE_URL,
    siteName: "System Kyron Elite",
    title: "System Kyron | Ecosistema Corporativo de Misión Crítica",
    description: "Líder en infraestructura móvil 5G, gestión fiscal VEN-NIF y consultoría estratégica con Inteligencia Artificial para el sector privado venezolano.",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "System Kyron Elite Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "System Kyron | Misión Crítica",
    description: "Infraestructura móvil 5G y gestión fiscal inteligente para Venezuela.",
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
    <html lang="es" className={`${spaceGrotesk.variable} ${outfit.variable} ${jetbrainsMono.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/icon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/icon-16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://api.qrserver.com" />
      </head>
      <body className="min-h-screen font-sans antialiased selection:bg-primary/10 bg-background text-foreground" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
