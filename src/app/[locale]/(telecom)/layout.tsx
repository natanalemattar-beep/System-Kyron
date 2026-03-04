'use client';

import { AppHeader } from "@/components/app-header";
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
      <div className="flex min-h-screen bg-[#080602] text-white relative overflow-hidden hud-grid">
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-amber-500/[0.06] rounded-full blur-[200px] opacity-40" />
            <motion.div 
                className="absolute top-0 left-0 right-0 h-[2px] bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="flex-1 flex flex-col min-h-screen relative">
              <AppHeader user={{...user, color: "bg-amber-600"}} dashboardHref="/dashboard-telecom" />
              <motion.main 
                className="flex-1 w-full p-6 md:p-12 lg:p-16 pt-24 md:pt-32 relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                  <div className="absolute bottom-20 right-20 opacity-[0.03] pointer-events-none -z-10">
                    <Signal className="w-[500px] h-[500px] text-amber-500" />
                  </div>
                  <div className="w-full">
                    {children}
                  </div>
              </motion.main>
              <footer className="p-12 border-t border-white/5 bg-white/[0.01] text-center backdrop-blur-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/10 italic">
                  System Kyron v2.6 • Telecom Operations Center • 2026
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
