
"use client";

import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Landmark, Wallet } from "lucide-react";

export const CashPosition = () => {
    const kpis = [
        { title: "Efectivo y Equivalentes", value: formatCurrency(12500, 'Bs.'), icon: Banknote },
        { title: "Saldos en Cuentas Bancarias", value: formatCurrency(48500, 'Bs.'), icon: Landmark },
        { title: "Inversiones a Corto Plazo", value: formatCurrency(8000, 'Bs.'), icon: Wallet },
    ];
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kpis.map((kpi, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <kpi.icon className="h-4 w-4 text-muted-foreground" />
                            {kpi.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{kpi.value}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
