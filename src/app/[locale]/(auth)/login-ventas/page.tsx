
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { ShoppingCart, Zap, Tag, TabletSmartphone } from "lucide-react";

export default function LoginVentasPage() {
    return (
        <SpecializedLoginCard 
            portalName="Facturación" 
            portalDescription="Terminal de ventas de alta velocidad con sincronización de inventario."
            redirectPath="/punto-de-venta"
            icon={ShoppingCart}
            accentColor="emerald-600"
            demoUsername="cajero.01"
            demoPassword="kyron2026"
            bgPattern={
                <div className="grid grid-cols-2 gap-20 p-10 opacity-10">
                    <Zap className="h-32 w-32" />
                    <Tag className="h-32 w-32" />
                    <TabletSmartphone className="h-32 w-32" />
                </div>
            }
            features={[
                "TPV Multimoneda Instantáneo",
                "Validación de RIF SENIAT",
                "Control de Stock Crítico"
            ]}
        />
    );
}
