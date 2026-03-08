'use client';

import { CheckCircle, TrendingDown, AlertTriangle, Users, Zap, Lock, ArrowRight, Activity } from "lucide-react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { SplashScreen } from "@/components/splash-screen";
import { useEffect, useState } from "react";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion } from "framer-motion";

const recentActivities = [
  { description: "IVA Julio 2024 despachado.", time: "hace 2h", icon: CheckCircle, iconColor: "text-emerald-500" },
  { description: "Gasto Bs. 1.200 registrado.", time: "hace 5h", icon: TrendingDown, iconColor: "text-rose-500" },
  { description: "Factura INV-005 en mora.", time: "hace 1d", icon: AlertTriangle, iconColor: "text-amber-500" },
  { description: "Nómina Q1 procesada.", time: "hace 2d", icon: Users, iconColor: "text-blue-500" },
];

export default function ResumenNegocioPage() {
   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300); 
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <SplashScreen />;

  return (
    <div className="space-y-8 md:space-y-12 w-full animate-in fade-in duration-700 px-4 md:px-10 pb-20">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-6 md:pl-10 py-2">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-white/5 text-white/40 text-[9px] font-bold uppercase tracking-widest border border-white/5">
                <Activity className="h-3 w-3" /> ÁREA ADMINISTRATIVA
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Resumen <span className="text-white/20">Operativo</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest opacity-40">Gestión Corporativa • 2026</p>
        </div>
        <div className="hidden md:flex gap-3">
            <div className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-xl flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 shadow-glow-secondary">
                    <Zap className="h-3 w-3 text-green-500" />
                </div>
                <div className="text-left">
                    <p className="text-[7px] font-black uppercase tracking-widest text-white/30 leading-none mb-1">Estado</p>
                    <p className="text-[9px] font-bold text-white leading-none uppercase">En Línea</p>
                </div>
            </div>
        </div>
      </header>

      <div className="space-y-8 md:space-y-10">
        <StatsCards />
        
        <div className="grid gap-8 md:gap-10 lg:grid-cols-12">
            <Card className="lg:col-span-4 bg-primary text-primary-foreground rounded-[2rem] overflow-hidden relative group p-1 shadow-2xl border-none">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                    <Lock className="h-32 w-32" />
                </div>
                <div className="p-8 space-y-6 relative z-10 bg-primary rounded-[1.9rem] h-full flex flex-col justify-between min-h-[200px]">
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-black uppercase italic tracking-tighter leading-tight text-white">Archivo Seguro</CardTitle>
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-40 text-white">Protección de Datos 2026</p>
                    </div>
                    <div className="space-y-4">
                        <p className="text-xs font-bold opacity-80 leading-relaxed italic text-white">
                            Acceso seguro a expedientes corporativos y guías de cumplimiento.
                        </p>
                        <Button variant="secondary" asChild className="w-full h-10 text-[9px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-widest transition-all">
                            <Link href="/manual-usuario" className="flex justify-between w-full px-4">
                                <span>GUÍAS TÉCNICAS</span> 
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
            <div className="lg:col-span-12 space-y-6">
                <div className="flex items-center gap-6">
                    <h2 className="text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] text-white/40 italic">Módulos de Gestión</h2>
                    <div className="h-[1px] flex-1 bg-white/5"></div>
                </div>
                <QuickAccess navGroups={adminNavGroups} />
            </div>
        </div>

        <div className="grid gap-8 md:gap-10 lg:grid-cols-12 pb-10">
            <div className="lg:col-span-7">
                <ActivityCard recentActivities={recentActivities} />
            </div>
            <div className="lg:col-span-5">
                 <RecentInvoices />
            </div>
        </div>
      </div>
    </div>
  );
}
