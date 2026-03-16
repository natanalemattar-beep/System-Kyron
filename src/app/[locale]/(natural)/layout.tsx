
'use client';

import { AppHeader } from "@/components/app-header";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";
import { naturalNavGroups } from "@/components/app-sidebar-nav-items";

export default function NaturalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Usuario", email: "usuario@kyron.com", fallback: "US" };

    return (
      <div className="flex min-h-screen bg-background text-foreground relative overflow-hidden">
          {/* HUD Grid Background */}
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.02] hud-grid" />
            <div className="absolute top-0 right-0 w-full h-full bg-primary/[0.03] rounded-full blur-[300px]" />
          </div>

          <div className="flex-1 flex flex-col min-h-screen relative w-full">
              <AppHeader 
                user={{...user, color: "bg-primary/30 text-primary shadow-glow"}} 
                dashboardHref="/dashboard"
                navGroups={naturalNavGroups}
              />
              
              <motion.main 
                className="flex-1 w-full p-4 md:p-8 pt-24 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                  {children}
              </motion.main>
              
              <footer className="p-10 border-t border-border bg-card/10 text-center backdrop-blur-3xl">
                <p className="text-[10px] font-black uppercase tracking-[1em] text-foreground/10 italic">
                  System Kyron v2.6 • Registro Seguro • 2026
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
