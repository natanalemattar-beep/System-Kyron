
'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";

export default function VentasLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-secondary text-foreground">
      <AppHeader user={{ name: "Equipo de Ventas", email: "ventas@kyron.com", fallback: "V" }} />
      <main className="flex-1 container mx-auto p-4 md:p-8">
            {children}
      </main>
      <Toaster />
    </div>
  );
}
