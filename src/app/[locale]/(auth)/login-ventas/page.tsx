
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { ShoppingCart } from "lucide-react";

export default function LoginVentasPage() {
    return (
        <SpecializedLoginCard 
            portalName="Ventas y Facturación" 
            portalDescription="Punto de Venta (TPV) para cajeros y personal de ventas."
            redirectPath="/punto-de-venta"
            icon={ShoppingCart}
            demoUsername="cajero.1"
            demoPassword="password123"
        />
    );
}
