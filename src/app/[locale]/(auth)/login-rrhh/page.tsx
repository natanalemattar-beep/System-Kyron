"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Calculator } from "lucide-react";

export default function LoginRrhhPage() {
    return (
        <SpecializedLoginCard 
            portalName="Asesoría Contable" 
            portalDescription="Suite completa: contabilidad, facturación, nómina y recursos humanos integrados."
            redirectPath="/dashboard-empresa"
            icon={Calculator}
            accentColor="emerald-600"
            layoutVariant="minimal"
            features={[
                "Contabilidad y Auditoría",
                "Facturación y TPV",
                "Nómina y RRHH"
            ]}
        />
    );
}
