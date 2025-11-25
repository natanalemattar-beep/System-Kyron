
"use client";

import {
  Briefcase
} from "lucide-react";
import { QuickAccess } from "@/components/dashboard/quick-access";


export default function RecursosHumanosPage() {
  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            <Briefcase className="h-10 w-10 text-primary" />
            Dashboard de Recursos Humanos
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Visión general para la gestión estratégica del talento humano.</p>
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

