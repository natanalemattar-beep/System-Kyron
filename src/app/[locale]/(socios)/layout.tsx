'use client';

import { AppHeader } from "@/components/app-header";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export default function SociosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Socio", email: "socio@kyron.com", fallback: "SO" };

    return (
      <div className="flex min-h-screen bg-[#03040a] text-white relative overflow-hidden hud-grid">
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute top-0 right-0 w-full h-full bg-primary/[0.08] rounded-full blur-[200px] opacity-40 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-slate-800/[0.08] rounded-full blur-[180px] opacity-30" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
          </div>

          <div className="flex-1 flex flex-col min-h-screen relative w-full">
              <AppHeader user={{...user, color: "bg-indigo-900"}} dashboardHref="/dashboard-socios" />
              <motion.main 
                className="flex-1 w-full p-6 md:p-12 pt-24 relative z-10"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] pointer-events-none -z-10">
                    <Globe className="w-[800px] h-[800px] text-primary" />
                  </div>
                  {children}
              </motion.main>
              <footer className="p-12 border-t border-white/5 bg-white/[0.01] text-center backdrop-blur-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/10 italic">
                  System Kyron v2.6 • Strategy & Holding Node • 2026
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
