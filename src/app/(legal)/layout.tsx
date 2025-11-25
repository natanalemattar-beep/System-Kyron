
'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset>
            <main className="flex-1 p-4 md:p-8">
                {children}
            </main>
        </SidebarInset>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
