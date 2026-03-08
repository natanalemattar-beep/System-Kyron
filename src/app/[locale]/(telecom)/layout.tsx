'use client';

import { AppHeader } from "@/components/app-header";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";
import { FileText, Radio } from "lucide-react";

export default function TelecomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Telecom Admin", email: "telecom@kyron.com", fallback: "TE" };

    const navItems = [
        { href: "/conatel/licenses", label: "Licencias", icon: FileText },
        { href: "/venta-linea", label: "Venta Línea", icon: Radio },
    ];

    return (
      <div className="flex min-h-screen bg-[#080602] text-white relative overflow-hidden hud-grid">
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-amber-500/[0.06] rounded-full blur-[200px] opacity-40" />
          </div>

          <div className="flex-1 flex flex-col min-h-screen relative w-full">
              <AppHeader 
                user={{...user, color: "bg-amber-600 shadow-glow"}} 
                dashboardHref="/dashboard-telecom" 
                navItems={navItems}
              />
              <motion.main 
                className="flex-1 w-full p-4 md:p-8 pt-20 relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                  {children}
              </motion.main>
              <footer className="p-10 border-t border-white/5 bg-white/[0.01] text-center backdrop-blur-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/10 italic">
                  System Kyron v2.6 • Telecom Node • 2026
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}
