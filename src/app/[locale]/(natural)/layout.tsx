'use client';

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { naturalNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";

export default function NaturalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Usuario Natural", email: "usuario@kyron.com", fallback: "UN" };

    return (
      <div className="flex min-h-screen bg-background">
          <AppSidebar />
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
              <AppHeader 
                user={user} 
                dashboardHref="/dashboard" 
                navGroups={naturalNavGroups as any}
              />
              <motion.main 
                className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-10 pt-24 md:pt-28"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                  {children}
              </motion.main>
              <footer className="p-8 border-t bg-card/30 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/40">
                  System Kyron v2.0 • Misión Crítica • © Todos los derechos reservados
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}