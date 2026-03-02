
'use client';

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Operador IT", email: "it@kyron.com", fallback: "IT" };

    return (
      <div className="flex min-h-screen bg-[#050505] text-white relative overflow-hidden">
          {/* Fondo Atmosférico de Misión Crítica */}
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute top-0 right-0 w-[1400px] h-[1400px] bg-primary/10 rounded-full blur-[250px] opacity-60" />
            <div className="absolute bottom-0 left-0 w-[1200px] h-[1200px] bg-emerald-600/10 rounded-full blur-[200px] opacity-50" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          </div>

          <AppSidebar />
          
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen relative">
              <AppHeader user={{...user, color: "bg-primary"}} dashboardHref="/dashboard-informatica" />
              
              <motion.main 
                className="flex-1 w-full p-8 md:p-12 lg:p-16 pt-28 md:pt-36 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                  {/* Contenedor de Pantalla Completa Real sin restricciones max-w */}
                  <div className="w-full">
                    {children}
                  </div>
              </motion.main>
              
              <footer className="p-12 border-t border-white/10 bg-black/60 text-center backdrop-blur-3xl relative z-20">
                <p className="text-[10px] font-black uppercase tracking-[1em] text-white/20 italic">
                  System Kyron v2.6 • Final Project Node • 2026
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
