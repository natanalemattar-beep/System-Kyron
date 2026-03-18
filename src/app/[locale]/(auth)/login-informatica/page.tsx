
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Cpu, Terminal, Layers, BrainCircuit } from "lucide-react";

export default function LoginInformaticaPage() {
    return (
        <SpecializedLoginCard 
            portalName="Ingeniería e IT" 
            portalDescription="Nodo de desarrollo de infraestructura y planificación técnica IA."
            redirectPath="/dashboard-informatica"
            icon={Cpu}
            accentColor="blue-900"
            bgPattern={
                <div className="grid grid-cols-4 gap-4 p-8 opacity-10">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="h-10 w-10 border border-white/40 rounded-sm" />
                    ))}
                    <Terminal className="h-20 w-20 col-span-2" />
                </div>
            }
            features={[
                "Modelado de Planos IA",
                "Presupuestos de Obra",
                "Soporte de Misión Crítica"
            ]}
        />
    );
}
