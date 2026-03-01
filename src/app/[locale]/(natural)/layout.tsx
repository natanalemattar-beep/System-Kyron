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
      <div className="flex min-h-screen bg-[#020202] relative overflow-hidden">
          {/* Fondo Global: Cubre sidebar y main para una integración total */}
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute top-[-10%] right-[-5%] w-[1200px] h-[1200px] bg-primary/10 rounded-full blur-[180px] animate-pulse opacity-40" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[150px] opacity-20" />
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-10" />
          </div>

          <AppSidebar />
          
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen relative">
              <AppHeader 
                user={{...user, color: "bg-primary"}} 
                dashboardHref="/dashboard" 
                navGroups={naturalNavGroups as any}
              />
              
              {/* Main Fluido: Padding optimizado para Laptop para evitar el "hueco" */}
              <motion.main 
                className="flex-1 w-full p-6 md:p-8 lg:p-12 pt-24 md:pt-28 lg:pt-32 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                  {/* Watermark de Identidad Dinámica */}
                  <div className="absolute top-40 right-20 opacity-[0.02] pointer-events-none -z-10 select-none">
                    <Sparkles className="w-[600px] h-[600px] text-primary" />
                  </div>
                  
                  <div className="max-w-full mx-auto">
                    {children}
                  </div>
              </motion.main>
              
              <footer className="p-8 border-t border-white/5 bg-black/40 text-center backdrop-blur-md relative z-10">
                <p className="text-[9px] font-black uppercase tracking-[0.6em] text-muted-foreground/30">
                  System Kyron v2.0 • Identidad Digital Certificada • 2026
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}