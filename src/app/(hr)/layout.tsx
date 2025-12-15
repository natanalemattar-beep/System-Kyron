
'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { rrhhNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";

const user = { name: "Recursos Humanos", email: "rrhh@kyron.com", fallback: "RH" };
const dashboardHref = "/hr/dashboard-rrhh";

export default function HrLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground">
      <AppHeader user={user} navGroups={rrhhNavGroups} dashboardHref={dashboardHref} />
      <main className="flex-1 container mx-auto p-4 md:p-8 pt-12 md:pt-16">
        {children}
      </main>
      <Toaster />
      <ChatDialog />
    </div>
  );
}
