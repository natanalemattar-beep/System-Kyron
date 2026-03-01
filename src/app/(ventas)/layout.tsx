
'use client';

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { ventasNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";

export default function VentasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Vendedor", email: "ventas@kyron.com", fallback: "VE" };

    return (
      <div className="flex min-h-screen">
          <AppSidebar />
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
              <AppHeader user={user} navGroups={ventasNavGroups} dashboardHref="/analisis-ventas" />
              <main className="flex-1 container mx-auto p-4 md:p-8 pt-20 md:pt-24">
                  {children}
              </main>
              <footer className="p-6 border-t bg-card/30 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
                  System Kyron v2.0 • 2026 • © Todos los derechos reservados
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
