import type { ReactNode } from "react";
import "./globals.css";

/**
 * @fileOverview Root Layout pass-through.
 * La estructura HTML real se maneja en [locale]/layout.tsx para soportar i18n correctamente.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
