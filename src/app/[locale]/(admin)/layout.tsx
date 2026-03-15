'use client';

import { AppHeader } from "@/components/app-header";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { 
        name: "Administrador Maestro", 
        email: "master@kyron.com", 
        fallback: "CM",
        color: "bg-primary shadow-glow"
    };

    return (
      <div className="flex min-h-screen bg-background text-foreground relative overflow-hidden">
          {/* Fondo HUD Dinámico */}
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.04] hud-grid" />
            <div className="absolute top-0 right-0 w-full h-full bg-primary/[0.02] rounded-full blur-[300px]" />
            <div className="absolute -bottom-[20%] -left-[10%] w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[200px]" />
          </div>

          <div className="flex-1 flex flex-col min-h-screen relative w-full">
              <AppHeader 
                user={user} 
                dashboardHref="/dashboard-empresa" 
              />
              
              <motion.main 
                className="flex-1 w-full p-4 md:p-10 pt-32 md:pt-36 relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                  <div className="max-w-[1600px] mx-auto">
                    {children}
                  </div>
              </motion.main>
              
              <footer className="p-12 border-t border-white/5 bg-card/40 text-center backdrop-blur-3xl mt-20 relative z-20">
                <p className="text-[10px] font-black uppercase tracking-[1.2em] text-foreground/10 italic">
                  System Kyron v2.6.5 • Control de Mando Consolidado • 2026
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
