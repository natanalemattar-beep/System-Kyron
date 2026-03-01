'use client';

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Administrador", email: "admin@kyron.com", fallback: "AD" };

    return (
      <div className="flex min-h-screen bg-background">
          <AppSidebar />
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
              <AppHeader user={user} dashboardHref="/dashboard-empresa" />
              <motion.main 
                className="flex-1 container mx-auto p-4 md:p-10 pt-24 md:pt-28"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                  {children}
              </motion.main>
              <footer className="p-10 border-t bg-card/30 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 mb-2">
                  System Kyron v2.0 • Misión Crítica • © Todos los derechos reservados
                </p>
                <div className="h-1.5 w-32 bg-primary/5 mx-auto rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-primary/20 animate-infinite-scroll"></div>
                </div>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}