'use client';

import { CheckCircle, TrendingDown, AlertTriangle, Users, Sparkles, LayoutGrid, Zap } from "lucide-react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { SplashScreen } from "@/components/splash-screen";
import { useEffect, useState } from "react";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { motion } from "framer-motion";

const recentActivities = [
  {
    description: "La declaración de IVA para Junio 2024 fue enviada.",
    time: "hace 2 horas",
    icon: CheckCircle,
    iconColor: "text-green-500",
  },
  {
    description: "Se ha registrado un nuevo gasto de Bs. 1.200 en suministros de oficina.",
    time: "hace 5 horas",
    icon: TrendingDown,
    iconColor: "text-red-500",
  },
  {
    description: "La factura INV-005 para Epsilon Services está próxima a vencer.",
    time: "hace 1 día",
    icon: AlertTriangle,
    iconColor: "text-orange-500",
  },
  {
    description: "Nómina de la 1ra quincena de Julio procesada.",
    time: "hace 2 días",
    icon: Users,
    iconColor: "text-blue-500",
  },
];

export default function DashboardPage() {
   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 500); 
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <div className="space-y-20 w-full animate-in fade-in duration-1000">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.4em] border border-primary/20 shadow-glow">
                <LayoutGrid className="h-3 w-3" /> Master Control
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none italic-shadow">Centro de Mando</h1>
            <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40">Operaciones Consolidadas y Gestión de Activos</p>
        </div>
        <div className="flex gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-xl flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                    <Zap className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Status</p>
                    <p className="text-xs font-black text-white">SYSTEM OPTIMAL</p>
                </div>
            </div>
        </div>
      </header>

      <div className="space-y-12">
        <StatsCards />
        
        <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
                <OverviewChart />
            </div>
            <div className="lg:col-span-2">
                <ActivityCard recentActivities={recentActivities} />
            </div>
        </div>

        <div className="space-y-10">
          <div className="flex items-center gap-6">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">Módulos Maestro</h2>
            <div className="h-px flex-1 bg-white/5"></div>
          </div>
          <QuickAccess navGroups={adminNavGroups} />
        </div>

        <div className="grid gap-12 lg:grid-cols-5 pb-10">
            <div className="lg:col-span-3">
                 <RecentInvoices />
            </div>
        </div>
      </div>
    </div>
  );
}