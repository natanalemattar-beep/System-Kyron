
'use client';

import type { ReactNode } from "react";
import { AppHeader } from "@/components/app-header";
import { ventasNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";

export default function VentasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Vendedor", email: "ventas@kyron.com", fallback: "VE" };

    return (
      <div className="flex flex-col min-h-screen">
          <AppHeader user={user} navGroups={ventasNavGroups} dashboardHref="/analisis-ventas" />
          <main className="flex-1 container mx-auto p-4 md:p-8 pt-20 md:pt-24">
              {children}
          </main>
          <ChatDialog />
      </div>
    );
}
