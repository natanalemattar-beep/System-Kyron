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
      <div className="flex min-h-screen bg-background relative overflow-hidden">
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute top-0 right-0 w-full h-full bg-primary/[0.03] rounded-full blur-[150px] opacity-50" />
            <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-blue-600/[0.02] rounded-full blur-[120px] opacity-40" />
          </div>
          
          <div className="flex-1 flex flex-col min-h-screen relative w-full">
              <AppHeader 
                user={{...user, color: "bg-primary/30 text-primary shadow-glow"}} 
                dashboardHref="/dashboard"
                navGroups={naturalNavGroups}
              />
              
              <motion.main 
                className="flex-1 w-full pt-20 pb-12 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                  {children}
              </motion.main>
              
              <footer className="p-10 border-t border-white/5 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/10 italic">
                  System Kyron v2.6 • Distributed Ledger Node • 2026
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}