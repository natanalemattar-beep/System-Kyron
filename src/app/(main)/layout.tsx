
'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function MainAppLayout({ children }: { children: ReactNode }) {
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <SidebarInset>
            {children}
        </SidebarInset>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
