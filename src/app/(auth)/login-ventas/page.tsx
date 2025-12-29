
"use client";

import { LoginCard } from "@/components/auth/login-card";

export default function LoginVentasPage() {
    return (
        <LoginCard 
            portalName="Ventas y Facturación" 
            portalDescription="Punto de Venta (TPV) para cajeros y personal de ventas."
            redirectPath="/punto-de-venta"
        />
    );
}
