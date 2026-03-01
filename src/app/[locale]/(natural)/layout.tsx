
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
      <div className="flex min-h-screen bg-[#030303] relative overflow-hidden">
          {/* Fondo Atmosférico Global: Elimina el vacío negro */}
          <div className="fixed inset-0 pointer-events-none -z-10">
            {/* Luces de profundidad */}
            <div className="absolute top-[-20%] right-[-10%] w-[1400px] h-[1400px] bg-primary/10 rounded-full blur-[200px] opacity-30 animate-pulse" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[1200px] h-[1200px] bg-blue-600/5 rounded-full blur-[180px] opacity-20" />
            
            {/* Textura de ruido y rejilla etérea */}
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-5" />
            
            {/* Rejilla de precisión sutil */}
            <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
          </div>

          <AppSidebar />
          
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen relative">
              <AppHeader 
                user={{...user, color: "bg-primary"}} 
                dashboardHref="/dashboard" 
                navGroups={naturalNavGroups as any}
              />
              
              {/* Main Fluido: Padding amplio para evitar el efecto 'amorochado' */}
              <motion.main 
                className="flex-1 w-full p-8 md:p-12 lg:p-16 pt-28 md:pt-32 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                  {/* Sello de agua dinámico */}
                  <div className="absolute top-1/4 right-10 opacity-[0.01] pointer-events-none -z-10 select-none">
                    <Sparkles className="w-[800px] h-[800px] text-primary" />
                  </div>
                  
                  <div className="w-full h-full">
                    {children}
                  </div>
              </motion.main>
              
              <footer className="p-10 border-t border-white/5 bg-black/20 text-center backdrop-blur-md relative z-10">
                <p className="text-[9px] font-black uppercase tracking-[0.8em] text-muted-foreground/20">
                  System Kyron v2.6 • Distributed Ledger Identity • 2026
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
