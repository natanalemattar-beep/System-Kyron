
"use client";

import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { BookOpen } from "lucide-react";

export default function ContabilidadPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Centro de Contabilidad
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Dashboard contable para la gestión integral de la empresa.</p>
      </header>

      <div className="space-y-8">
        <StatsCards />
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <OverviewChart />
            </div>
            <div className="lg:col-span-1">
                 <RecentInvoices />
            </div>
        </div>
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Acceso Rápido a Módulos</h2>
            <QuickAccess />
        </div>
      </div>
    </div>
  );
}
