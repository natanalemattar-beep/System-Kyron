'use client';

import { CheckCircle, TrendingDown, AlertTriangle, Users, LayoutGrid, Zap, Lock, ArrowRight } from "lucide-react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { SplashScreen } from "@/components/splash-screen";
import { useEffect, useState } from "react";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { motion } from "framer-motion";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

const recentActivities = [
  { description: "IVA Junio 2024 despachado.", time: "hace 2h", icon: CheckCircle, iconColor: "text-emerald-500" },
  { description: "Gasto Bs. 1.200 registrado.", time: "hace 5h", icon: TrendingDown, iconColor: "text-rose-500" },
  { description: "Factura INV-005 en mora.", time: "hace 1d", icon: AlertTriangle, iconColor: "text-amber-500" },
  { description: "Nómina Q1 procesada.", time: "hace 2d", icon: Users, iconColor: "text-blue-500" },
];

export default function DashboardPage() {
   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300); 
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <SplashScreen />;

  return (
    <div className="space-y-12 w-full animate-in fade-in duration-700 px-6 md:px-10 pb-20">
      
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-l border-white/10 pl-10 py-2">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-white/5 text-white/40 text-[9px] font-bold uppercase tracking-widest border border-white/5">
                <LayoutGrid className="h-3 w-3" /> Console
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none">Centro de <span className="text-white/20">Mando</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest opacity-40">System Kyron • Distributed Node 2.6</p>
        </div>
        <div className="flex gap-3">
            <Button asChild className="btn-premium h-9 px-6 text-[10px] uppercase tracking-widest">
                <Link href="/kyron-vault">Entrar a Bóveda</Link>
            </Button>
        </div>
      </header>

      <div className="space-y-10">
        <StatsCards />
        
        <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
                <OverviewChart />
            </div>
            <div className="lg:col-span-4">
                <ActivityCard recentActivities={recentActivities} />
            </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-12">
                <div className="flex items-center gap-6 mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/40">Módulos de Ecosistema</h2>
                    <div className="h-[1px] flex-1 bg-white/5"></div>
                </div>
                <QuickAccess navGroups={adminNavGroups} />
            </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 pb-10">
            <div className="lg:col-span-12">
                 <RecentInvoices />
            </div>
        </div>
      </div>
    </div>
  );
}