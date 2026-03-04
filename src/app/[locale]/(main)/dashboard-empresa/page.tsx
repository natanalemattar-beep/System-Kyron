
'use client';

import { CheckCircle, TrendingDown, AlertTriangle, Users, Sparkles, LayoutGrid, Zap, ShieldCheck, FileText, BarChart3, ArrowRight } from "lucide-react";
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
    <div className="space-y-12 w-full animate-in fade-in duration-1000">
      
      <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-8 py-2">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.4em] border border-primary/20">
                <LayoutGrid className="h-3 w-3" /> Console Root
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
        <StatsCards />
        
        <div className="grid gap-10 lg:grid-cols-12">
            {/* Private Suite Section */}
            <Card className="lg:col-span-4 bg-primary text-primary-foreground rounded-[2.5rem] overflow-hidden relative group p-1 shadow-[0_0_50px_rgba(37,99,235,0.2)] border-none">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                    <ShieldCheck className="h-40 w-40" />
                </div>
                <div className="p-10 space-y-8 relative z-10 bg-primary rounded-[2.4rem]">
                    <div className="space-y-2">
                        <CardTitle className="text-3xl font-black uppercase italic tracking-tighter">Kyron Private Suite</CardTitle>
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Información Sensible de Misión Crítica</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Button variant="secondary" asChild className="w-full h-12 text-[10px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-widest shadow-xl">
                            <Link href="/estudio-poblacion" className="flex justify-between w-full"><span>Modelo ZEDU 2025</span> <ArrowRight className="h-4 w-4"/></Link>
                        </Button>
                        <Button variant="secondary" asChild className="w-full h-12 text-[10px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-widest shadow-xl">
                            <Link href="/estudio-factibilidad-economica" className="flex justify-between w-full"><span>Factibilidad Técnica</span> <ArrowRight className="h-4 w-4"/></Link>
                        </Button>
                        <Button variant="secondary" asChild className="w-full h-12 text-[10px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-widest shadow-xl">
                            <Link href="/propuesta-proyecto" className="flex justify-between w-full"><span>Propuesta Maestra</span> <ArrowRight className="h-4 w-4"/></Link>
                        </Button>
                    </div>
                    <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest text-center">Solo personal autorizado</p>
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
