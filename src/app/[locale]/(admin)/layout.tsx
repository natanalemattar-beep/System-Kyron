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
      <div className="flex min-h-screen bg-[#050505] text-white relative overflow-hidden hud-grid">
          {/* Fondo Atmosférico Financiero */}
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
            <div className="absolute top-0 right-0 w-full h-full bg-primary/[0.03] rounded-full blur-[200px]" />
          </div>

          <AppSidebar />
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
              <AppHeader user={{...user, color: "bg-primary"}} dashboardHref="/dashboard-empresa" />
              <motion.main 
                className="flex-1 w-full p-10 md:p-16 lg:p-20 pt-28 md:pt-36 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                  <div className="absolute bottom-20 left-20 opacity-[0.015] pointer-events-none -z-10">
                    <Landmark className="w-[600px] h-[600px] text-primary" />
                  </div>
                  <div className="w-full">
                    {children}
                  </div>
              </motion.main>
              <footer className="p-12 border-t border-white/5 bg-white/[0.01] text-center backdrop-blur-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/10 italic">
                  System Kyron v2.6 • Corporate Intelligence • 2026
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}