'use client';

import dynamic from "next/dynamic";
import { AppHeader } from "@/components/app-header";
import { LazyChatDialog } from "@/components/chat-dialog-lazy";
import { PageTransition } from "@/components/ui/motion";
import { PageTracker } from "@/components/page-tracker";

const WelcomeTutorial = dynamic(() => import('@/components/welcome-tutorial').then(m => ({ default: m.WelcomeTutorial })), { ssr: false });

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Operador Maestro", email: "master@kyron.com", fallback: "KY" };

    return (
      <div className="flex min-h-screen bg-background text-foreground relative">
          <PageTracker />
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute top-0 right-0 w-full h-[1400px] bg-primary/[0.05] rounded-full blur-[250px] opacity-40 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[1200px] h-[1200px] bg-secondary/5 rounded-full blur-[200px] opacity-30" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
          </div>

          <div className="flex-1 flex flex-col min-h-screen relative w-full">
              <AppHeader user={{...user, color: "bg-primary shadow-glow"}} dashboardHref="/resumen-negocio" />
              
              <main className="flex-1 w-full pt-20 relative z-10">
                  <PageTransition>
                    {children}
                  </PageTransition>
              </main>
              
              <footer className="p-8 border-t border-border bg-card/80 text-center backdrop-blur-3xl relative z-20">
                <p className="text-[9px] font-black uppercase tracking-[1.2em] text-foreground/10 italic">
                  System Kyron • 2026
                </p>
              </footer>
          </div>
          <WelcomeTutorial />
          <LazyChatDialog />
      </div>
    );
}