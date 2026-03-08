import type { ReactNode } from "react";
import "./globals.css";

/**
 * @fileOverview Root Layout pass-through.
 * La estructura HTML real se maneja en [locale]/layout.tsx para soportar i18n correctamente.
 * En Next.js 15, el layout raíz debe ser lo más minimalista posible si se usa i18n en [locale].
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
