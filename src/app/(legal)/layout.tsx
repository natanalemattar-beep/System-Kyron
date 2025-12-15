
'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { legalNavGroups } from "@/components/app-sidebar-nav-items";

const user = { name: "Escritorio Jurídico", email: "legal@kyron.com", fallback: "L" };
const dashboardHref = "/legal/escritorio-juridico";


export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground">
      <AppHeader user={user} navGroups={legalNavGroups} dashboardHref={dashboardHref} />
       <motion.div 
        className="bg-yellow-400/10 border-y border-yellow-400/20 py-2 sticky top-[4.5rem] md:top-[5.5rem] z-40"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 80 }}
      >
          <div className="container mx-auto text-center text-xs text-yellow-500 flex items-center justify-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <p>
                  La página es un prototipo, puede tener errores.
              </p>
          </div>
      </motion.div>
      <main className="flex-1 container mx-auto p-4 md:p-8">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
