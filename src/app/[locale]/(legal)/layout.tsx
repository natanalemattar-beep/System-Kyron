
'use client';

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { legalNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Abogado", email: "legal@kyron.com", fallback: "AB" };

    return (
      <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/50 relative overflow-hidden">
          {/* Identidad Visual: Legal y Cumplimiento - Fluida */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(30deg,#0f172a_12%,transparent_12.5%,transparent_87%,#0f172a_87.5%,#0f172a),linear-gradient(150deg,#0f172a_12%,transparent_12.5%,transparent_87%,#0f172a_87.5%,#0f172a),linear-gradient(30deg,#0f172a_12%,transparent_12.5%,transparent_87%,#0f172a_87.5%,#0f172a),linear-gradient(150deg,#0f172a_12%,transparent_12.5%,transparent_87%,#0f172a_87.5%,#0f172a),linear-gradient(60deg,#1e293b_25%,transparent_25.5%,transparent_75%,#1e293b_75%,#1e293b),linear-gradient(60deg,#1e293b_25%,transparent_25.5%,transparent_75%,#1e293b_75%,#1e293b)] [background-size:80px_140px]" />
            <div className="absolute top-0 right-0 w-full h-full bg-slate-900/[0.03]" />
          </div>

          <AppSidebar />
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
              <AppHeader user={{...user, color: "bg-slate-800"}} navGroups={legalNavGroups as any} dashboardHref="/escritorio-juridico" />
              <motion.main 
                className="flex-1 w-full p-4 md:p-10 pt-20 md:pt-24 relative"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                  {/* Watermark de Blindaje */}
                  <div className="absolute top-20 right-20 opacity-[0.03] pointer-events-none">
                    <ShieldCheck className="w-96 h-96 text-slate-900" />
                  </div>
                  {children}
              </motion.main>
              <footer className="p-6 border-t bg-card/30 text-center backdrop-blur-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
                  System Kyron v2.0 • 2026 • © Todos los derechos reservados
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
