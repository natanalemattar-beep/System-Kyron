
'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";
import { AlertTriangle } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader user={{ name: "Admin", email: "admin@kyron.com", fallback: "A" }} />
      <div className="bg-yellow-400/10 border-y border-yellow-400/20 py-2 sticky top-16 z-40">
          <div className="container mx-auto text-center text-xs text-yellow-500 flex items-center justify-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <p>
                  <strong>Atención:</strong> Esta es una versión de prueba. La información y las funcionalidades están sujetas a cambios.
              </p>
          </div>
      </div>
      <main className="flex-1 container mx-auto p-4 md:p-8">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
