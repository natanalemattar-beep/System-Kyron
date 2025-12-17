

'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";

const user = { name: "Administrador", email: "admin@kyron.com", fallback: "AD" };
const dashboardHref = "/dashboard-empresa";


export default function VentasLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader user={user} navGroups={adminNavGroups} dashboardHref={dashboardHref} />
      <main className="flex-1 container mx-auto p-4 md:p-8 pt-20 md:pt-24">
        {children}
      </main>
      <Toaster />
      <ChatDialog />
    </div>
  );
}
