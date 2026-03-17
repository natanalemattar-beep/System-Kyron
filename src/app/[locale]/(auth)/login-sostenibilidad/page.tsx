
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Recycle, Leaf, Coins, Globe } from "lucide-react";

export default function LoginSostenibilidadPage() {
    return (
        <SpecializedLoginCard 
            portalName="Sostenibilidad" 
            portalDescription="Gestión de activos verdes y mercado de compensación ambiental."
            redirectPath="/sostenibilidad"
            icon={Recycle}
            accentColor="emerald-800"
            demoUsername="eco.operador"
            demoPassword="kyron2026"
            bgPattern={
                <div className="flex flex-col gap-12 p-12 opacity-10">
                    <Leaf className="h-20 w-20 ml-20" />
                    <Coins className="h-20 w-20" />
                    <Globe className="h-20 w-20 ml-10" />
                </div>
            }
            features={[
                "Telemetría Ameru IA",
                "Exchange de Eco-Créditos",
                "Certificación Carbono Neutral"
            ]}
        />
    );
}
