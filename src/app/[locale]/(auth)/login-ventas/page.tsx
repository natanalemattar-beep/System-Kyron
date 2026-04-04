
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { ShoppingCart } from "lucide-react";

export default function LoginVentasPage() {
    return (
        <SpecializedLoginCard 
            portalName="Facturación" 
            portalDescription="Terminal de ventas de alta velocidad con sincronización de inventario."
            redirectPath="/punto-de-venta"
            icon={ShoppingCart}
            accentColor="emerald-600"
            layoutVariant="centered"
            features={[
                "TPV Multimoneda Instantáneo",
                "Validación de RIF SENIAT",
                "Control de Stock Crítico"
            ]}
        />
    );
}
