
'use client';

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { telecomNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";
import { Signal } from "lucide-react";

export default function TelecomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Telecom Admin", email: "telecom@kyron.com", fallback: "TE" };

    return (
      <div className="flex min-h-screen bg-background relative overflow-hidden">
          {/* Identidad Visual: Operaciones Telecom */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]" />
            <motion.div 
                className="absolute top-0 left-0 right-0 h-1 bg-amber-500/20"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <AppSidebar />
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
              <AppHeader user={{...user, color: "bg-amber-600"}} navGroups={telecomNavGroups as any} dashboardHref="/dashboard-telecom" />
              <motion.main 
                className="flex-1 container mx-auto p-4 md:p-8 pt-20 md:pt-24 relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                  {/* Watermark de Telecom */}
                  <div className="absolute bottom-10 right-10 opacity-[0.03] pointer-events-none">
                    <Signal className="w-72 h-72 text-amber-500" />
                  </div>
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
