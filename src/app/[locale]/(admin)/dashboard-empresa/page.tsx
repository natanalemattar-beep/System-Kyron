
'use client';

import { CheckCircle, TrendingDown, AlertTriangle, Users } from "lucide-react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { SplashScreen } from "@/components/splash-screen";
import { useEffect, useState } from "react";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";

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
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Centro de Mando</h1>
        <p className="text-muted-foreground text-sm">
          Vista consolidada de las operaciones y finanzas de la empresa.
        </p>
      </div>

      <div className="space-y-8">
        <StatsCards />
        <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
                <OverviewChart />
            </div>
            <div className="lg:col-span-2">
                <ActivityCard recentActivities={recentActivities} />
            </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Acceso Rápido a Módulos</h2>
          <QuickAccess navGroups={adminNavGroups} />
        </div>
        <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
                 <RecentInvoices />
            </div>
        </div>
      </div>
    </div>
  );
}
