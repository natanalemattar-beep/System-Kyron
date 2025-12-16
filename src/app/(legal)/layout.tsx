
'use client';

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";
import { legalNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";
import { Loader2 } from "lucide-react";

const user = { name: "Escritorio Jurídico", email: "legal@kyron.com", fallback: "L" };
const dashboardHref = "/dashboard-juridico";

// Simulate authentication state
const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Changed to true for now
    const [isLoading, setIsLoading] = useState(false); // Changed to false for now

    // In a real app, you would use Firebase's onAuthStateChanged here.
    // For this simulation, we'll assume the user is logged in.
    
    return { isAuthenticated, isLoading };
};

export default function LegalLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login-escritorio-juridico');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Verificando credenciales...</p>
      </div>
    );
  }
  
  if (!isAuthenticated && !isLoading) {
    // This will be rendered briefly before the redirect happens.
    return (
       <div className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Redirigiendo al login...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader user={user} navGroups={legalNavGroups} dashboardHref={dashboardHref} />
      <main className="flex-1 container mx-auto p-4 md:p-8 pt-20 md:pt-24">
        {children}
      </main>
      <Toaster />
      <ChatDialog />
    </div>
  );
}
