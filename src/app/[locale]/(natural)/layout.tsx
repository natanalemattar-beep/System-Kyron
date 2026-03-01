
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
          {/* Identidad Visual: Ciudadano / Identidad Digital */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px]" />
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
          </div>

          <AppSidebar />
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
              <AppHeader 
                user={{...user, color: "bg-blue-500"}} 
                dashboardHref="/dashboard" 
                navGroups={naturalNavGroups as any}
              />
              <motion.main 
                className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-10 pt-24 md:pt-28 relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                  {/* Watermark sutil de identidad */}
                  <div className="absolute top-10 right-10 opacity-[0.02] pointer-events-none">
                    <Sparkles className="w-64 h-64 text-primary" />
                  </div>
                  {children}
              </motion.main>
              <footer className="p-8 border-t bg-card/30 text-center backdrop-blur-md">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/40">
                  System Kyron v2.0 • Misión Crítica • © Todos los derechos reservados
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
