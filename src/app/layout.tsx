import { ReactNode } from "react";

// The root layout is simple and just renders its children.
// The internationalization logic is handled in `src/app/[locale]/layout.tsx`.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
