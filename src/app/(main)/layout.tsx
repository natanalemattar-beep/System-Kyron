
'use client';

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";
import dynamic from "next/dynamic";
import { usePathname } from 'next/navigation';

const WelcomeTutorial = dynamic(() => import('@/components/welcome-tutorial').then(mod => mod.WelcomeTutorial), { ssr: false });

export default function MainAppLayout({ children }: { children: ReactNode }) {
  const [showTutorial, setShowTutorial] = useState(false);
  const pathname = usePathname();

  const user = {
      name: "Admin",
      email: "admin@kyron.com",
      fallback: "A"
  };

  // This logic is simplified; in a real app, you'd have a proper user context
  if (pathname.startsWith('/dashboard-empresa')) {
      user.name = "Admin";
      user.email = "admin@kyron.com";
      user.fallback = "A";
  } else if (pathname.startsWith('/dashboard')) {
      user.name = "Usuario Natural";
      user.email = "usuario@email.com";
      user.fallback = "UN";
  }


  useEffect(() => {
    // Only show tutorial on main dashboard pages after login
    if (pathname === '/dashboard-empresa' || pathname === '/dashboard') {
        const hasSeenTutorial = localStorage.getItem("hasSeenKyronTutorial");
        if (!hasSeenTutorial) {
            setTimeout(() => {
                setShowTutorial(true);
                localStorage.setItem("hasSeenKyronTutorial", "true");
            }, 500);
        }
    }
  }, [pathname]);
  
  return (
     <div className="flex flex-col min-h-screen">
        <AppHeader user={user} />
        <main className="flex-1 container mx-auto p-4 md:p-8">
            {children}
        </main>
        <Toaster />
        {showTutorial && <WelcomeTutorial open={showTutorial} onOpenChange={setShowTutorial} />}
    </div>
  );
}

