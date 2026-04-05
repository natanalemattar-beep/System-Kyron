"use client";

import { useState } from "react";
import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Calculator, Info, ChevronRight, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ALICUOTAS_IGP = [
    { rango: "150.000 – 300.000 UT", tasa: "0.25%", factor: 0.0025 },
    { rango: "300.001 – 500.000 UT", tasa: "0.50%", factor: 0.005 },
    { rango: "500.001 – 1.000.000 UT", tasa: "0.75%", factor: 0.0075 },
    { rango: "Más de 1.000.000 UT", tasa: "1.50%", factor: 0.015 },
];

const NOTAS = [
    "El IGP grava el patrimonio neto que supere las 150.000 Unidades Tributarias (Art. 4 LIGP).",
    "Solo aplica a Sujetos Pasivos Especiales designados por el SENIAT.",
    "La declaración es anual, durante los meses de octubre y noviembre, según el último dígito del RIF.",
    "El patrimonio neto se calcula como: total activos menos total pasivos al cierre del ejercicio fiscal.",
    "Los bienes ubicados fuera del país también se incluyen en la base imponible.",
];

export default function IgpPage() {
    const { toast } = useToast();
    const [patrimonio, setPatrimonio] = useState("");
    const [cuota, setCuota] = useState<number | null>(null);
    const [alicuotaUsada, setAlicuotaUsada] = useState("");

    const handleCalculate = () => {
        const patrimonioNum = parseFloat(patrimonio);
        if (!patrimonioNum || patrimonioNum <= 0) {
            toast({ variant: "destructive", title: "Monto inválido", description: "Introduce el patrimonio neto fiscal." });
            return;
        }
        const alicuota = 0.0025;
        const result = patrimonioNum * alicuota;
        setCuota(result);
        setAlicuotaUsada("0.25%");
        toast({ title: "Cálculo completado", description: `IGP estimado al 0.25% (alícuota mínima): ${formatCurrency(result, 'Bs.')}` });
    };

    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400 mb-3">
                        <Coins className="h-3.5 w-3.5" /> IGP
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Impuesto a Grandes <span className="text-amber-600 dark:text-amber-400">Patrimonios</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Ley del IGP (G.O. 41.667) · Declaración Anual</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-base font-bold">
                                <Calculator className="h-5 w-5 text-amber-500" />
                                Estimador de Cuota Tributaria
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-muted-foreground">Patrimonio Neto Fiscal (Bs.)</Label>
                                <Input type="number" placeholder="0.00" value={patrimonio} onChange={e => { setPatrimonio(e.target.value); setCuota(null); }} className="h-12 rounded-xl font-bold text-lg" />
                                <p className="text-[10px] text-muted-foreground">Total activos menos total pasivos al cierre fiscal.</p>
                            </div>

                            <Button onClick={handleCalculate} className="w-full h-12 rounded-xl font-bold text-sm bg-amber-600 hover:bg-amber-700 text-white">
                                <Calculator className="mr-2 h-4 w-4" />
                                Calcular IGP
                            </Button>

                            {cuota !== null && (
                                <div className="p-5 bg-amber-500/5 border border-amber-500/15 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">Cuota Tributaria Estimada ({alicuotaUsada})</p>
                                            <p className="text-[11px] text-muted-foreground mt-0.5">
                                                Alícuota mínima aplicada. Ajuste según tabla progresiva.
                                            </p>
                                        </div>
                                        <span className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">{formatCurrency(cuota, 'Bs.')}</span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Coins className="h-4 w-4 text-amber-500" />
                                Tabla de Alícuotas (Art. 11 LIGP)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                            {ALICUOTAS_IGP.map((a, i) => (
                                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-muted/30">
                                    <span className="text-xs font-bold">{a.rango}</span>
                                    <span className="text-lg font-bold text-amber-600 dark:text-amber-400">{a.tasa}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Info className="h-4 w-4 text-amber-500" />
                                Información Legal
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                            {NOTAS.map((nota, i) => (
                                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                                    <ChevronRight className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-muted-foreground leading-relaxed">{nota}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Aviso</p>
                                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                                    Este estimador aplica la alícuota mínima (0.25%). Para un cálculo exacto con la tabla progresiva completa, consulte con un profesional tributario.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
