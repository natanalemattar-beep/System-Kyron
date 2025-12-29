
import { ReactNode } from "react";

// This layout is for the main public-facing pages
export default function MainLayout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
