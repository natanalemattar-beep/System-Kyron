import { ReactNode } from "react";

// The root layout is simple and only passes children through.
// All markup is handled by the [locale] layout.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
