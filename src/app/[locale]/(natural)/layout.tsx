'use client';

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { naturalNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function NaturalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Usuario Natural", email: "usuario@kyron.com", fallback: "UN" };

    return (
      <div className="flex min-h-screen bg-[#020202] text-white relative overflow-hidden">
          {/* Fondo Atmosférico Estelar Global envolvente */}
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute top-[-5%] right-[-5%] w-[1400px] h-[1400px] bg-primary/10 rounded-full blur-[200px] opacity-50 animate-pulse" />
            <div className="absolute bottom-[-5%] left-[-5%] w-[1200px] h-[1200px] bg-blue-600/5 rounded-full blur-[180px] opacity-40" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          </div>

          <AppSidebar />
          
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen relative">
              <AppHeader 
                user={{...user, color: "bg-primary"}} 
                dashboardHref="/dashboard" 
                navGroups={naturalNavGroups as any}
              />
              
              <motion.main 
                className="flex-1 w-full p-10 md:p-16 pt-32 md:pt-40 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                  {/* Sello de agua sutil de gran formato */}
                  <div className="absolute top-1/4 right-40 opacity-[0.02] pointer-events-none -z-10 select-none">
                    <Sparkles className="w-[800px] h-[800px] text-primary" />
                  </div>
                  
                  <div className="w-full h-full">
                    {children}
                  </div>
              </motion.main>
              
              <footer className="p-12 border-t border-white/5 bg-white/[0.01] text-center backdrop-blur-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/10 italic">
                  System Kyron v2.6 • Distributed Ledger Identity • 2026
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}