'use client';

import { CheckCircle, TrendingDown, AlertTriangle, Users, LayoutGrid, Zap, Lock, ArrowRight, Activity } from "lucide-react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { SplashScreen } from "@/components/splash-screen";
import { useEffect, useState } from "react";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

const recentActivities = [
  { description: "Declaración de IVA Junio 2024 enviada.", time: "hace 2 horas", icon: CheckCircle, iconColor: "text-green-500" },
  { description: "Nuevo gasto Bs. 1.200 registrado.", time: "hace 5 horas", icon: TrendingDown, iconColor: "text-red-500" },
  { description: "Factura INV-005 próxima a vencer.", time: "hace 1 día", icon: AlertTriangle, iconColor: "text-orange-500" },
  { description: "Nómina 1ra quincena procesada.", time: "hace 2 días", icon: Users, iconColor: "text-blue-500" },
];

export default function DashboardPage() {
   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500); 
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <SplashScreen />;

  return (
    <div className="space-y-12 w-full animate-in fade-in duration-1000 px-4 md:px-10 pb-20">
      
      <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-8 py-2">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.4em] border border-primary/20">
                <LayoutGrid className="h-3 w-3" /> Master Control
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none text-white italic-shadow">Centro de Mando</h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Operaciones Consolidadas • System Kyron 2.6.5</p>
        </div>
        <div className="flex gap-4">
            <div className="px-5 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-xl flex items-center gap-4">
                <div className="h-7 w-7 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                    <Zap className="h-3.5 w-3.5 text-green-500" />
                </div>
                <div className="text-left">
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/30 leading-none mb-1">Status</p>
                    <p className="text-[10px] font-bold text-white leading-none uppercase">Optimal</p>
                </div>
            </div>
        </div>
      </header>

      <div className="space-y-10">
        <StatsCards />
        
        <div className="grid gap-10 lg:grid-cols-12">
            {/* Private Vault Entry */}
            <Card className="lg:col-span-4 bg-primary text-primary-foreground rounded-[2rem] overflow-hidden relative group p-1 shadow-[0_0_40px_rgba(37,99,235,0.15)] border-none">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                    <Lock className="h-32 w-32" />
                </div>
                <div className="p-8 space-y-6 relative z-10 bg-primary rounded-[1.9rem] h-full flex flex-col justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-black uppercase italic tracking-tighter">Bóveda Kyron</CardTitle>
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-40 text-white">Nodo Privado Estratégico</p>
                    </div>
                    <div className="space-y-4">
                        <p className="text-xs font-bold opacity-80 leading-relaxed italic">
                            Acceso restringido a los informes técnicos de factibilidad y modelo ZEDU maestro.
                        </p>
                        <Button variant="secondary" asChild className="w-full h-11 text-[9px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-widest transition-all">
                            <Link href="/kyron-vault" className="flex justify-between w-full px-4">
                                <span>ENTRAR A LA BÓVEDA</span> 
                                <ArrowRight className="h-4 w-4"/>
                            </Link>
                        </Button>
                    </div>
                </div>
            </Card>

            <div className="lg:col-span-8">
                <OverviewChart />
            </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
                <ActivityCard recentActivities={recentActivities} />
            </div>
            <div className="lg:col-span-5">
                <RecentInvoices />
            </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white/90">Módulos del Ecosistema</h2>
            <div className="h-px flex-1 bg-white/5"></div>
          </div>
          <QuickAccess navGroups={adminNavGroups} />
        </div>
      </div>
    </div>
  );
}