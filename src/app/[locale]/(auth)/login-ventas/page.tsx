
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { ShoppingCart } from "lucide-react";

export default function LoginVentasPage() {
    return (
        <SpecializedLoginCard 
            portalName="Facturación y Ventas" 
            portalDescription="Punto de venta inteligente para cobros rápidos y control de inventario."
            redirectPath="/punto-de-venta"
            icon={ShoppingCart}
            demoUsername="cajero.01"
            demoPassword="password123"
            features={[
                "Punto de Venta (TPV) Multimoneda",
                "Validación de RIF en Tiempo Real",
                "Control de Existencias Críticas"
            ]}
            footerLinks={{
              primary: { href: "/login", text: "Cambiar de departamento" }
            }}
        />
    );
}
