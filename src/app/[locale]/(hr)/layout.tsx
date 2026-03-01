
'use client';

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { rrhhNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function HRLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "RR.HH.", email: "rrhh@kyron.com", fallback: "RH" };

    return (
      <div className="flex min-h-screen bg-background relative overflow-hidden">
          {/* Identidad Visual: Talento y Cultura - Fluida */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-secondary/[0.08] rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-secondary/[0.04] rounded-full blur-[120px]" />
          </div>

          <AppSidebar />
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
              <AppHeader user={{...user, color: "bg-secondary"}} navGroups={rrhhNavGroups as any} dashboardHref="/dashboard-rrhh" />
              <motion.main 
                className="flex-1 w-full p-4 md:p-10 pt-20 md:pt-24 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                  {/* Watermark de Cultura */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
                    <Heart className="w-[600px] h-[600px] text-secondary" />
                  </div>
                  {children}
              </motion.main>
              <footer className="p-6 border-t bg-card/30 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
                  System Kyron v2.0 • 2026 • © Todos los derechos reservados
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
