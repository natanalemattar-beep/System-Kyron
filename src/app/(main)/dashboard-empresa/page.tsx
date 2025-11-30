
"use client";

import {
  Building,
} from "lucide-react";
import { QuickAccess } from "@/components/dashboard/quick-access";


export default function DashboardEmpresaPage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Building className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Dashboard de Administración y Finanzas
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Visión general de las operaciones, finanzas y cumplimiento de la empresa.</p>
      </header>

      {/* Quick Access Modules */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Acceso Rápido a Módulos</h2>
        <QuickAccess />
      </div>
      
    </div>
  );
}
