
'use client';

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";
import { Landmark } from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Administrador", email: "admin@kyron.com", fallback: "AD" };

    return (
      <div className="flex min-h-screen bg-muted/5 relative overflow-hidden">
          {/* Identidad Visual: Contabilidad / Finanzas - Fluida */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:40px_40px]" />
            <div className="absolute top-1/4 left-1/4 w-full h-full bg-primary/[0.03] rounded-full blur-[150px]" />
          </div>

          <AppSidebar />
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
              <AppHeader user={{...user, color: "bg-primary"}} dashboardHref="/dashboard-empresa" />
              {/* Main Fluido: Sin contenedores restrictivos para laptops */}
              <motion.main 
                className="flex-1 w-full p-4 md:p-10 pt-20 md:pt-24 relative"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                  <div className="absolute bottom-20 left-10 opacity-[0.02] pointer-events-none">
                    <Landmark className="w-96 h-96 text-primary" />
                  </div>
                  {children}
              </motion.main>
              <footer className="p-8 border-t bg-card text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/50">
                  System Kyron v2.0 • Plataforma de Grado Corporativo • © Todos los derechos reservados
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
