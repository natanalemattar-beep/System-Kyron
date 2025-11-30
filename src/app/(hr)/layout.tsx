

'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AlertTriangle } from "lucide-react";


export default function HrLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
          <AppSidebar />
          <SidebarInset>
             <div className="bg-yellow-600/10 border-b border-yellow-500/20 py-2">
                <div className="container mx-auto text-center text-xs text-yellow-300 flex items-center justify-center gap-2">
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
