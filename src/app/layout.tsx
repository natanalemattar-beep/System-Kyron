import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

/**
 * RootLayout es el layout absoluto de la aplicación.
 * Aquí se definen las etiquetas HTML base, se cargan los estilos globales
 * y se configuran las fuentes para que estén disponibles en todo el ecosistema,
 * incluyendo rutas fuera de [locale] como /login.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen font-sans antialiased selection:bg-primary/10 transition-colors duration-300 bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
