'use client';
import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { LandingHeader } from "@/components/landing/landing-header";
import { ChatDialog } from "@/components/chat-dialog";
import { motion } from "framer-motion";
import { SplashScreen } from "@/components/splash-screen";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 1500); // Simulate data fetching
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative">
      <LandingHeader />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto pt-20">
        <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            {children}
        </motion.div>
      </main>
      <ChatDialog />
    </div>
  );
}
