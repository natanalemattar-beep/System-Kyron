
'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader user={{ name: "Escritorio Jurídico", email: "legal@kyron.com", fallback: "L" }} />
      <main className="flex-1 p-4 md:p-8 container mx-auto">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
