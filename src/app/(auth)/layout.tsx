
'use client';
import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
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
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
