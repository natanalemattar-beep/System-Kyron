
'use client';

import { CheckCircle, TrendingDown, AlertTriangle, Users, Sparkles, LayoutGrid, Zap, ShieldCheck, FileText, BarChart3, ArrowRight, Lock } from "lucide-react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { SplashScreen } from "@/components/splash-screen";
import { useEffect, useState } from "react";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
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
    <div className="space-y-16 w-full animate-in fade-in duration-1000 px-4 md:px-10">
      
      <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-8 py-2">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.4em] border border-primary/20">
                <LayoutGrid className="h-3 w-3" /> Master Control
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-none italic-shadow text-white">Centro de Mando</h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Operaciones Consolidadas • System Kyron 2.6.5</p>
        </div>
        <div className="flex gap-4">
            <div className="px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                    <Zap className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-left">
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/30 leading-none mb-1">Status</p>
                    <p className="text-[10px] font-black text-white leading-none">OPTIMAL</p>
                </div>
            </div>
        </div>
      </header>

      <div className="space-y-12">
        {/* KPIs compactos semi-minimalistas */}
        <StatsCards />
        
        <div className="grid gap-10 lg:grid-cols-12">
            {/* Private Vault Entry - La idea del usuario */}
            <Card className="lg:col-span-4 bg-primary text-primary-foreground rounded-[2.5rem] overflow-hidden relative group p-1 shadow-[0_0_50px_rgba(37,99,235,0.2)] border-none">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                    <Lock className="h-40 w-40" />
                </div>
                <div className="p-10 space-y-8 relative z-10 bg-primary rounded-[2.4rem] h-full flex flex-col justify-between">
                    <div className="space-y-2">
                        <CardTitle className="text-3xl font-black uppercase italic tracking-tighter">Bóveda Kyron</TableHead>
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Dashboard Privado Estratégico</p>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm font-bold opacity-80 leading-relaxed italic">
                            Acceso restringido a los informes técnicos de factibilidad, modelo ZEDU y propuestas maestras de System Kyron.
                        </p>
                        <Button variant="secondary" asChild className="w-full h-14 text-[11px] font-black bg-white text-primary hover:bg-white/90 rounded-2xl uppercase tracking-widest shadow-2xl transition-all hover:scale-[1.02]">
                            <Link href="/kyron-vault" className="flex justify-between w-full px-4">
                                <span>ENTRAR A LA BÓVEDA</span> 
                                <ArrowRight className="h-5 w-5"/>
                            </Link>
                        </Button>
                    </div>
                    <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest text-center italic">Personal Jerárquico Solamente</p>
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

        <div className="space-y-10">
          <div className="flex items-center gap-6">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">Módulos del Ecosistema</h2>
            <div className="h-px flex-1 bg-white/5"></div>
          </div>
          <QuickAccess navGroups={adminNavGroups} />
        </div>
      </div>
    </div>
  );
}
