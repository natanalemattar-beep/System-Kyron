import { ReactNode } from "react";

// The root layout applies to all routes.
// It's used to configure the <html> and <body> tags.
// Internationalization is handled by the [locale] layout.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
