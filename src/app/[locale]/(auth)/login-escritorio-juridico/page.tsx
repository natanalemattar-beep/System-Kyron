
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Gavel, Scale, ShieldCheck, Signature as FileSignature } from "lucide-react";

export default function LoginEscritorioJuridicoPage() {
    return (
        <SpecializedLoginCard 
            portalName="Asesoría Legal" 
            portalDescription="Blindaje jurídico y gestión de instrumentos notariales inmutables."
            redirectPath="/escritorio-juridico"
            icon={Gavel}
            accentColor="slate-800"
            bgPattern={
                <div className="grid grid-cols-3 gap-12 p-12 opacity-10">
                    <Scale className="h-24 w-24" />
                    <ShieldCheck className="h-24 w-24" />
                    <FileSignature className="h-24 w-24" />
                </div>
            }
            features={[
                "Generador de Contratos IA",
                "Monitor de Poderes SAREN",
                "Bóveda Legal Zero-Knowledge"
            ]}
        />
    );
}
