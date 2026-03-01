
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
      <div className="flex min-h-screen bg-background relative overflow-hidden">
          {/* Identidad Visual: Ciudadano / Identidad Digital - Fluida e Inmersiva */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px]" />
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
            <div className="absolute inset-0 opacity-[0.1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          </div>

          <AppSidebar />
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen relative">
              <AppHeader 
                user={{...user, color: "bg-blue-600"}} 
                dashboardHref="/dashboard" 
                navGroups={naturalNavGroups as any}
              />
              {/* Contenedor Fluido: Sin mx-auto ni max-w para rellenar toda la pantalla */}
              <motion.main 
                className="flex-1 w-full p-4 md:p-10 pt-24 md:pt-28 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                  <div className="absolute top-20 right-20 opacity-[0.02] pointer-events-none -z-10">
                    <Sparkles className="w-64 h-64 text-primary" />
                  </div>
                  {children}
              </motion.main>
              
              <footer className="p-6 border-t bg-card/30 text-center backdrop-blur-md relative z-10">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
                  System Kyron v2.0 • Identidad Segura • © 2025
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
