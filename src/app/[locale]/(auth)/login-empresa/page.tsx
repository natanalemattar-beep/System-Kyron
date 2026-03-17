
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Banknote, Calculator, TrendingUp, Landmark } from "lucide-react";

export default function LoginEmpresaPage() {
    return (
        <SpecializedLoginCard 
            portalName="Contabilidad" 
            portalDescription="Gestión financiera de alto nivel con automatización de tributos y balances corporativos."
            redirectPath="/resumen-negocio"
            icon={Calculator}
            accentColor="primary"
            demoUsername="admin.fiscal"
            demoPassword="kyron2026"
            bgPattern={
                <div className="grid grid-cols-4 gap-10 p-10 opacity-20">
                    <Banknote className="h-20 w-20" />
                    <TrendingUp className="h-20 w-20" />
                    <Landmark className="h-20 w-20" />
                    <Calculator className="h-20 w-20" />
                </div>
            }
            features={[
                "Auditoría Forense con IA",
                "Conciliación Bancaria T+0",
                "Protocolo RIPF Automatizado"
            ]}
        />
    );
}
