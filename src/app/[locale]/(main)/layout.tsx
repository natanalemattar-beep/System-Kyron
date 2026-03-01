
'use client';

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Operador IT", email: "it@kyron.com", fallback: "IT" };

    return (
      <div className="flex min-h-screen bg-[#020202] text-white relative overflow-hidden">
          {/* Fondo Atmosférico de Misión Crítica */}
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute top-0 right-0 w-[1400px] h-[1400px] bg-primary/5 rounded-full blur-[200px] opacity-50" />
            <div className="absolute bottom-0 left-0 w-[1200px] h-[1200px] bg-emerald-600/5 rounded-full blur-[180px] opacity-40" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
          </div>

          <AppSidebar />
          
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen relative">
              <AppHeader user={{...user, color: "bg-primary"}} dashboardHref="/dashboard-informatica" />
              
              <motion.main 
                className="flex-1 w-full p-10 md:p-12 lg:p-16 pt-28 md:pt-36 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                  {/* Sello de agua sutil */}
                  <div className="absolute top-1/4 right-40 opacity-[0.01] pointer-events-none -z-10">
                    <Cpu className="w-[800px] h-[800px] text-primary" />
                  </div>
                  
                  {/* Contenedor sin restricciones de ancho para pantalla completa real */}
                  <div className="w-full">
                    {children}
                  </div>
              </motion.main>
              
              <footer className="p-12 border-t border-white/5 bg-white/[0.01] text-center backdrop-blur-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/10 italic">
                  System Kyron v2.6 • Engineering & AI Node • 2026
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
