import { ReactNode } from "react";

// El layout raíz debe ser minimalista en una configuración con next-intl.
// Todo el marcado HTML real se maneja en [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
