
'use client';

import { AppHeader } from "@/components/app-header";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Operador Maestro", email: "master@kyron.com", fallback: "KY" };

    return (
      <div className="flex min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid">
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute top-0 right-0 w-full h-[1400px] bg-primary/15 rounded-full blur-[250px] opacity-60 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[1200px] h-[1200px] bg-emerald-600/10 rounded-full blur-[200px] opacity-50" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
          </div>

          <div className="flex-1 flex flex-col min-h-screen relative w-full">
              <AppHeader user={{...user, color: "bg-primary shadow-glow"}} dashboardHref="/dashboard-empresa" />
              
              <motion.main 
                className="flex-1 w-full p-6 md:p-12 pt-24 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                  {children}
              </motion.main>
              
              <footer className="p-12 border-t border-white/5 bg-black/80 text-center backdrop-blur-3xl relative z-20">
                <p className="text-[10px] font-black uppercase tracking-[1.2em] text-white/10 italic">
                  SYSTEM KYRON v2.6.5 • COMMAND HUB • 2026
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
