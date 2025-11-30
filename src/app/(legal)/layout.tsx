
'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AlertTriangle } from "lucide-react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <SidebarInset>
            <div className="bg-yellow-100 border-b border-yellow-300 py-2">
                <div className="container mx-auto text-center text-xs text-yellow-800 flex items-center justify-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <p>
                        <strong>Atención:</strong> Esta es una versión de prueba. La información y las funcionalidades están sujetas a cambios.
                    </p>
                </div>
            </div>
            <main className="flex-1 p-4 md:p-8">
                {children}
            </main>
        </SidebarInset>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
