'use client';

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { rrhhNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function HRLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "RR.HH.", email: "rrhh@kyron.com", fallback: "RH" };

    return (
      <div className="flex min-h-screen bg-[#020502] text-white relative overflow-hidden hud-grid">
          {/* Fondo Atmosférico Cultura */}
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full h-[800px] bg-secondary/[0.08] rounded-full blur-[200px] opacity-40 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-secondary/[0.04] rounded-full blur-[180px] opacity-30" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
          </div>

          <AppSidebar />
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen relative">
              <AppHeader user={{...user, color: "bg-secondary"}} navGroups={rrhhNavGroups as any} dashboardHref="/dashboard-rrhh" />
              <motion.main 
                className="flex-1 w-full p-10 md:p-16 lg:p-20 pt-28 md:pt-36 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                  {/* Sello de agua cultura */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] pointer-events-none -z-10">
                    <Heart className="w-[700px] h-[700px] text-secondary" />
                  </div>
                  <div className="w-full">
                    {children}
                  </div>
              </motion.main>
              <footer className="p-12 border-t border-white/5 bg-white/[0.01] text-center backdrop-blur-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/10 italic">
                  System Kyron v2.6 • Culture & Talent Node • 2026
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}