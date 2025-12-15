
'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { telecomNavGroups } from "@/components/app-sidebar-nav-items";

const user = { name: "Telecom", email: "telecom@kyron.com", fallback: "T" };
const dashboardHref = "/telecom/dashboard-telecom";


export default function TelecomLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground">
      <AppHeader user={user} navGroups={telecomNavGroups} dashboardHref={dashboardHref} />
      <main className="flex-1 container mx-auto p-4 md:p-8 pt-12 md:pt-16">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
