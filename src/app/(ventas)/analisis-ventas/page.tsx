
"use client";

import {
  TrendingUp,
} from "lucide-react";
import { QuickAccess } from "@/components/dashboard/quick-access";


export default function AnalisisVentasPage() {
  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            <TrendingUp className="h-10 w-10 text-primary" />
            Dashboard de Ventas y Facturación
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Visión general del rendimiento comercial y acceso a los módulos de ventas.</p>
      </div>

      <div className="space-y-8">
        {/* Quick Access Modules */}
        <div className="space-y-2 xl:col-span-3">
            <h2 className="text-2xl font-semibold tracking-tight">Módulos de Acceso Rápido</h2>
            <QuickAccess />
        </div>
      </div>
    </div>
  );
}

