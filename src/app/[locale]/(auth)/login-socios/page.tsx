
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Users, BarChart3, ShieldCheck, Building2 } from "lucide-react";

export default function LoginSociosPage() {
    return (
        <SpecializedLoginCard 
            portalName="Socios" 
            portalDescription="Consola ejecutiva para la supervisión de resultados y rentabilidad del holding."
            redirectPath="/dashboard-socios"
            icon={Users}
            accentColor="indigo-950"
            demoUsername="socio.maestro"
            demoPassword="kyron2026"
            bgPattern={
                <div className="grid grid-cols-3 gap-16 p-16 opacity-5">
                    <BarChart3 className="h-32 w-32" />
                    <Building2 className="h-32 w-32" />
                    <ShieldCheck className="h-32 w-32" />
                </div>
            }
            features={[
                "Simulador Gemelo Digital",
                "Reparto de Dividendos",
                "Consolidación Multi-Sede"
            ]}
        />
    );
}
