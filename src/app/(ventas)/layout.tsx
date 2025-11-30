
'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";

export default function VentasLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader user={{ name: "Equipo de Ventas", email: "ventas@kyron.com", fallback: "V" }} />
      <main className="flex-1 p-4 md:p-8 container mx-auto">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
