
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Gavel } from "lucide-react";

export default function LoginEscritorioJuridicoPage() {
    return (
        <SpecializedLoginCard 
            portalName="Asesoría Legal" 
            portalDescription="Blindaje jurídico y gestión de instrumentos notariales inmutables."
            redirectPath="/escritorio-juridico"
            icon={Gavel}
            accentColor="slate-800"
            layoutVariant="split-right"
            features={[
                "Generador de Contratos IA",
                "Monitor de Poderes SAREN",
                "Bóveda Legal Zero-Knowledge"
            ]}
        />
    );
}
