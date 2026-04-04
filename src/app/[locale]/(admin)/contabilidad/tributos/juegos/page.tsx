"use client";

import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap, Info, ChevronRight, AlertTriangle } from "lucide-react";

const ALICUOTAS = [
    { actividad: "Mesas de Juego (Casino)", tasa: "36%", base: "Ingresos brutos mensuales" },
    { actividad: "Máquinas Tragamonedas", tasa: "36%", base: "Ingresos brutos mensuales" },
    { actividad: "Bingos y Loterías", tasa: "36%", base: "Ingresos brutos mensuales" },
    { actividad: "Apuestas Hípicas", tasa: "34%", base: "Ingresos brutos mensuales" },
    { actividad: "Apuestas Online", tasa: "36%", base: "Ingresos brutos mensuales" },
];

const NOTAS = [
    "La Ley de Impuesto a las Actividades de Juego grava los ingresos brutos de los operadores de juegos de azar.",
    "La declaración y pago es mensual, según el calendario de Sujetos Pasivos Especiales del SENIAT.",
    "Los operadores requieren una licencia expedida por la Comisión Nacional de Casinos, Salas de Bingo y Máquinas Traganíqueles.",
    "El incumplimiento puede acarrear la revocatoria de la licencia de operación y clausura del establecimiento.",
];

export default function JuegosAzarPage() {
    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 mb-3">
                        <Zap className="h-3.5 w-3.5" /> Juegos de Azar
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                        Actividades de <span className="text-purple-600 dark:text-purple-400">Juegos</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Ley de Impuesto a las Actividades de Juego · Liquidación Mensual</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Zap className="h-4 w-4 text-purple-500" />
                                Alícuotas por Actividad
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {ALICUOTAS.map((a, i) => (
                                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div>
                                        <p className="text-xs font-bold">{a.actividad}</p>
                                        <p className="text-[10px] text-muted-foreground">{a.base}</p>
                                    </div>
                                    <span className="text-lg font-black text-purple-600 dark:text-purple-400">{a.tasa}</span>
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
                                Notas Legales
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
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-muted-foreground leading-relaxed">Este módulo aplica exclusivamente a operadores de juegos de azar con licencia vigente. La operación sin licencia es sancionada penalmente.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
