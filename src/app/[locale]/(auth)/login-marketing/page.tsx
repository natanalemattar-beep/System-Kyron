"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Megaphone } from "lucide-react";

export default function LoginMarketingPage() {
    return (
        <SpecializedLoginCard 
            portalName="Marketing"
            portalDescription="Panel de campañas, analytics y automatización de marketing."
            redirectPath="/dashboard-empresas"
            icon={Megaphone}
            accentColor="blue-900"
            layoutVariant="minimal"
            features={[
                "Campañas Multicanal",
                "Analytics en Tiempo Real",
                "Automatización Inteligente"
            ]}
        />
    );
}
