
'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AlertTriangle } from "lucide-react";

export default function VentasLayout({ children }: { children: ReactNode }) {

  return (
    <SidebarProvider>
        <div className="flex min-h-screen">
            <div className="absolute inset-0 -z-10 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_1%,transparent_50%)] dark:bg-grid-slate-700/30"></div>
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(var(--primary-rgb),0.1),rgba(255,255,255,0))]"></div>

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
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </SidebarInset>
            <Toaster />
        </div>
    </SidebarProvider>
  );
}

