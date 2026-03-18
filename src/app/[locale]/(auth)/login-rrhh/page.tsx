
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Briefcase, Users, Heart, School } from "lucide-react";

export default function LoginRrhhPage() {
    return (
        <SpecializedLoginCard 
            portalName="Talento Humano" 
            portalDescription="Administración estratégica de capital humano y cultura organizacional."
            redirectPath="/dashboard-rrhh"
            icon={Users}
            accentColor="secondary"
            bgPattern={
                <div className="flex flex-wrap gap-16 p-16 opacity-15">
                    <Heart className="h-20 w-20" />
                    <School className="h-20 w-20" />
                    <Briefcase className="h-20 w-20" />
                </div>
            }
            features={[
                "Nómina Inteligente LOTTT",
                "Monitor de Clima y Liderazgo",
                "Pipeline de Reclutamiento IA"
            ]}
        />
    );
}
