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
      <div className="flex min-h-screen bg-[#050505] text-white relative overflow-hidden">
          {/* Textura HUD de Fondo */}
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:60px_60px]" />
            <div className="absolute top-0 right-0 w-full h-full bg-primary/[0.05] rounded-full blur-[300px]" />
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
              
              <footer className="p-10 border-t border-white/5 bg-black/60 text-center backdrop-blur-3xl">
                <p className="text-[10px] font-black uppercase tracking-[1em] text-white/10 italic">
                  System Kyron v2.6 • Registro Seguro • 2026
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
