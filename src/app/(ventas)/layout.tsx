
'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";
import { ventasNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";

const user = { name: "Equipo de Ventas", email: "ventas@kyron.com", fallback: "V" };
const dashboardHref = "/ventas/analisis-ventas";


export default function VentasLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader user={user} navGroups={ventasNavGroups} dashboardHref={dashboardHref} />
      <main className="flex-1 container mx-auto p-4 md:p-8 pt-24 md:pt-28">
        {children}
      </main>
      <Toaster />
      <ChatDialog />
    </div>
  );
}
