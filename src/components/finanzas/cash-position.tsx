"use client";

import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Landmark, Wallet, Loader2 } from "lucide-react";

export const CashPosition = () => {
    const [data, setData] = useState<{ efectivo: number; bancos: number; inversiones: number } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/finanzas/posicion-caja')
            .then(r => r.ok ? r.json() : null)
            .then(d => { if (d) setData(d); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const kpis = [
        { title: "Efectivo y Equivalentes", value: data ? formatCurrency(data.efectivo, 'Bs.') : '—', icon: Banknote },
        { title: "Saldos en Cuentas Bancarias", value: data ? formatCurrency(data.bancos, 'Bs.') : '—', icon: Landmark },
        { title: "Inversiones a Corto Plazo", value: data ? formatCurrency(data.inversiones, 'Bs.') : '—', icon: Wallet },
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
                        {loading ? (
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        ) : (
                            <p className="text-3xl font-bold">{kpi.value}</p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
