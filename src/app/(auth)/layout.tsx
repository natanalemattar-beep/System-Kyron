
'use client';
import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { User, AlertTriangle } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative">
      <motion.header 
        className="sticky top-0 z-50 w-full"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
      >
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex h-16 items-center justify-between px-4 md:px-6 rounded-none md:rounded-full mt-0 md:mt-4 border-b md:border bg-background/80 backdrop-blur-sm">
              <Link href="/" className="flex items-center gap-3">
                <Logo />
                <span className="text-lg font-bold">System Kyron</span>
              </Link>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
                <Button asChild>
                  <Link href="/">Acceder</Link>
                </Button>
              </div>
            </div>
        </div>
      </motion.header>
      
       <motion.div 
        className="bg-yellow-400/10 border-y border-yellow-400/20 py-2 sticky top-[4.5rem] md:top-[5.5rem] z-40"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 80 }}
      >
          <div className="container mx-auto text-center text-xs text-yellow-500 flex items-center justify-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <p>
                  <strong>Atención:</strong> Esta es una versión de prueba. La información y las funcionalidades están sujetas a cambios.
              </p>
          </div>
      </motion.div>

      <main className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
