import { ReactNode } from "react";

// This is the root layout. It should be minimal.
// The main layout with providers is now in [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
    return children;
}
