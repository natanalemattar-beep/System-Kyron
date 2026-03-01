
'use client';

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { sociosNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export default function SociosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Socio", email: "socio@kyron.com", fallback: "SO" };

    return (
      <div className="flex min-h-screen bg-slate-900/5 dark:bg-slate-950 relative overflow-hidden">
          {/* Identidad Visual: Estrategia y Holding */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.05] rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-800/[0.05] rounded-full blur-[120px]" />
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          </div>

          <AppSidebar />
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
              <AppHeader user={{...user, color: "bg-indigo-900"}} navGroups={sociosNavGroups as any} dashboardHref="/dashboard-socios" />
              <motion.main 
                className="flex-1 container mx-auto p-4 md:p-10 pt-24 md:pt-28 relative"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                  {/* Watermark de Holding */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.01] pointer-events-none">
                    <Globe className="w-[600px] h-[600px] text-primary" />
                  </div>
                  {children}
              </motion.main>
              <footer className="p-10 border-t bg-card/30 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 mb-2">
                  System Kyron v2.0 • Misión Crítica • © Todos los derechos reservados
                </p>
                <div className="h-1.5 w-32 bg-primary/5 mx-auto rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-primary/20 animate-infinite-scroll"></div>
                </div>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
