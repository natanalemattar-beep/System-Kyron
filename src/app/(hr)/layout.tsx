'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";

export default function HrLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader user={{ name: "Recursos Humanos", email: "rrhh@kyron.com", fallback: "RH" }} />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
