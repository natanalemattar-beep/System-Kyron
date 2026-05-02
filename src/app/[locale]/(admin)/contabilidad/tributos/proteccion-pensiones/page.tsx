"use client";

import { useState } from "react";
import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, ShieldCheck, TriangleAlert, Info, ChevronRight, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const NOTAS_LEGALES = [
    "El aporte es del 9% sobre la nómina mensual del sector privado (Gaceta Oficial N° 6.806).",
    "Es 100% deducible del ISLR como gasto del ejercicio fiscal.",
    "Se declara y paga mensualmente ante el SENIAT según el calendario por terminal de RIF.",
    "El incumplimiento acarrea multas de hasta 1.000 veces el tipo de cambio oficial del BCV.",
    "El monto mínimo de base imponible no podrá ser inferior al salario mínimo por cada trabajador.",
];

const REQUISITOS = [
    "RIF de la empresa actualizado",
    "Nómina mensual detallada (nombre, cédula, salario)",
    "Planilla de declaración generada desde el portal SENIAT",
    "Comprobante de pago del periodo anterior (si aplica)",
];

export default function ProteccionPensionesPage() {
    const { toast } = useToast();
    const [nomina, setNomina] = useState("");
    const [empleados, setEmpleados] = useState("");
    const [total, setTotal] = useState<number | null>(null);

    const handleCalculate = () => {
        const nominaNum = parseFloat(nomina);
        const empNum = parseInt(empleados);
        if (!nominaNum || nominaNum <= 0) {
            toast({ variant: "destructive", title: "Monto inválido", description: "Introduce el total de la nómina mensual." });
            return;
        }
        if (!empNum || empNum <= 0) {
            toast({ variant: "destructive", title: "Dato inválido", description: "Introduce el número de empleados." });
            return;
        }
        const aporte = nominaNum * 0.09;
        setTotal(aporte);
        toast({ title: "Cálculo completado", description: `Aporte DPP (9%): ${formatCurrency(aporte, 'Bs.')}` });
    };

    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 mb-3">
                        <ShieldCheck className="h-3.5 w-3.5" /> DPP
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Protección de <span className="text-emerald-500">Pensiones</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Ley de Protección de Pensiones (G.O. N° 6.806) · Aporte del 9%</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-base font-bold">
                                <Calculator className="h-5 w-5 text-emerald-500" />
                                Calculadora de Contribución DPP
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground">Total Nómina del Mes (Bs.)</Label>
                                    <Input type="number" placeholder="0.00" value={nomina} onChange={e => { setNomina(e.target.value); setTotal(null); }} className="h-12 rounded-xl font-bold text-lg" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground">Número de Empleados</Label>
                                    <Input type="number" placeholder="0" value={empleados} onChange={e => { setEmpleados(e.target.value); setTotal(null); }} className="h-12 rounded-xl font-bold text-lg" />
                                </div>
                            </div>

                            <Button onClick={handleCalculate} className="w-full h-12 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700">
                                <Calculator className="mr-2 h-4 w-4" />
                                Calcular Aporte Mensual
                            </Button>

                            {total !== null && (
                                <div className="p-5 bg-emerald-500/5 border border-emerald-500/15 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Aporte DPP Mensual (9%)</p>
                                            <p className="text-[11px] text-muted-foreground mt-0.5">
                                                100% deducible del ISLR
                                            </p>
                                        </div>
                                        <span className="text-2xl md:text-3xl font-bold text-emerald-500">{formatCurrency(total, 'Bs.')}</span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Info className="h-4 w-4 text-emerald-500" />
                                Información Legal
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                            {NOTAS_LEGALES.map((nota, i) => (
                                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                                    <ChevronRight className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-muted-foreground leading-relaxed">{nota}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <FileText className="h-4 w-4 text-blue-500" />
                                Requisitos para Declarar
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                            {REQUISITOS.map((req, i) => (
                                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                                    <ChevronRight className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-muted-foreground leading-relaxed">{req}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                        <div className="flex items-start gap-3">
                            <TriangleAlert className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-rose-600 dark:text-rose-400">Sanción por Incumplimiento</p>
                                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                                    El retraso o no pago del DPP puede acarrear multas de hasta 1.000 veces el tipo de cambio oficial de la moneda de mayor valor publicado por el BCV.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <div className="flex items-start gap-3">
                            <Info className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Aviso</p>
                                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                                    Este simulador calcula el aporte con fines informativos. Los montos finales dependen de la nómina real registrada ante el SENIAT y el calendario oficial vigente.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
