
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Signal, Radio, Cpu, Network } from "lucide-react";

export default function LoginTelecomPage() {
    return (
        <SpecializedLoginCard 
            portalName="Telecomunicaciones" 
            portalDescription="Administración de infraestructura de red y aprovisionamiento 5G."
            redirectPath="/dashboard-telecom"
            icon={Signal}
            accentColor="amber-600"
            demoUsername="noc.admin"
            demoPassword="kyron2026"
            bgPattern={
                <div className="grid grid-cols-2 gap-8 p-12 opacity-10">
                    <Radio className="h-24 w-24 animate-pulse" />
                    <Cpu className="h-24 w-24" />
                    <Network className="h-24 w-24" />
                </div>
            }
            features={[
                "Gestión eSIM Over-the-Air",
                "Network Slicing Corporativo",
                "Monitor de Radiobases v2.6"
            ]}
        />
    );
}
