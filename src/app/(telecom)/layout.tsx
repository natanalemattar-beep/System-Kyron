'use client';

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { telecomNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";

export default function TelecomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Telecom Admin", email: "telecom@kyron.com", fallback: "TE" };

    return (
      <div className="flex min-h-screen bg-muted/5">
          <AppSidebar />
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
              <AppHeader user={user} navGroups={telecomNavGroups} dashboardHref="/dashboard-telecom" />
              <motion.main 
                className="flex-1 container mx-auto p-4 md:p-8 pt-20 md:pt-24"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                  {children}
              </motion.main>
              <footer className="p-8 border-t bg-card text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/50">
                  System Kyron v2.0 • 2025 • © Todos los derechos reservados
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}