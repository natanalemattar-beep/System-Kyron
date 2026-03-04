'use client';

import { AppHeader } from "@/components/app-header";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Abogado", email: "legal@kyron.com", fallback: "AB" };

    return (
      <div className="flex min-h-screen bg-[#05070a] text-white relative overflow-hidden hud-grid">
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(30deg,#1e293b_12%,transparent_12.5%,transparent_87%,#1e293b_87.5%,#1e293b)] [background-size:80px_140px]" />
            <div className="absolute top-0 right-0 w-full h-full bg-slate-900/[0.05] rounded-full blur-[250px]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          </div>

          <div className="flex-1 flex flex-col min-h-screen relative w-full">
              <AppHeader user={{...user, color: "bg-slate-800 shadow-glow"}} dashboardHref="/escritorio-juridico" />
              <motion.main 
                className="flex-1 w-full p-4 md:p-8 pt-20 relative z-10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                  {children}
              </motion.main>
              <footer className="p-10 border-t border-white/5 bg-white/[0.01] text-center backdrop-blur-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/10 italic">
                  System Kyron v2.6 • Legal Guard • 2026
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
