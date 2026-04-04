"use client";

import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Clock, AlertTriangle, Info, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const obligations = [
    {
        name: "IVA (Declaración y Pago)",
        freq: "Mensual",
        vencimiento: "Según terminal RIF (calendario SENIAT)",
        nota: "Sujetos Pasivos Especiales: días 12 al 27. Contribuyentes Ordinarios: días 1 al 15 del mes siguiente.",
        urgency: "high",
    },
    {
        name: "ISLR (Retenciones)",
        freq: "Mensual",
        vencimiento: "Mismo calendario que IVA (SPE)",
        nota: "Enterar retenciones practicadas en el periodo. Anticipos del 1% para SPE.",
        urgency: "high",
    },
    {
        name: "ISLR (Declaración Definitiva)",
        freq: "Anual",
        vencimiento: "Último día de marzo (cierre fiscal 31/dic)",
        nota: "Aplica a personas naturales y jurídicas con ejercicio fiscal regular.",
        urgency: "medium",
    },
    {
        name: "IGTF (Transacciones en Divisas)",
        freq: "Mensual",
        vencimiento: "Mismo calendario que IVA (SPE)",
        nota: "Alícuota del 3% sobre pagos en divisas y criptoactivos.",
        urgency: "medium",
    },
    {
        name: "DPP (Protección de Pensiones)",
        freq: "Mensual",
        vencimiento: "Según calendario SENIAT por terminal RIF",
        nota: "Aporte del 9% sobre la nómina. Sector privado.",
        urgency: "high",
    },
    {
        name: "IGP (Grandes Patrimonios)",
        freq: "Anual",
        vencimiento: "Octubre – Noviembre (según terminal RIF)",
        nota: "Solo Sujetos Pasivos Especiales. Patrimonio > 150.000 UT.",
        urgency: "low",
    },
    {
        name: "IVSS / Paro Forzoso",
        freq: "Mensual",
        vencimiento: "Primeros 5 días hábiles del mes siguiente",
        nota: "Cotizaciones patronales y del trabajador ante el IVSS.",
        urgency: "high",
    },
    {
        name: "FAOV (Vivienda / BANAVIH)",
        freq: "Mensual",
        vencimiento: "Primeros 5 días hábiles del mes siguiente",
        nota: "Aportes del 2% patronal + 1% trabajador.",
        urgency: "medium",
    },
    {
        name: "INCES",
        freq: "Trimestral",
        vencimiento: "Dentro de los 5 días después de cada trimestre",
        nota: "Empresas con 5+ empleados. 2% patronal sobre nómina.",
        urgency: "low",
    },
];

export default function CalendarioFiscalPage() {
    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 mb-3">
                        <Calendar className="h-3.5 w-3.5" /> Calendario
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                        Calendario <span className="text-amber-600 dark:text-amber-400">Fiscal</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Obligaciones tributarias y parafiscales · Vencimientos según normativa vigente</p>
                </div>
            </header>

            <Card className="rounded-2xl shadow-lg border overflow-hidden">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-bold">
                        <Clock className="h-4 w-4 text-amber-500" />
                        Obligaciones y Vencimientos
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y">
                        {obligations.map((row, i) => (
                            <div key={i} className={cn(
                                "p-5 hover:bg-muted/30 transition-colors",
                                row.urgency === 'high' && "border-l-4 border-l-amber-500"
                            )}>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                    <div className="flex items-start gap-3">
                                        {row.urgency === 'high' && <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />}
                                        {row.urgency === 'medium' && <Clock className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />}
                                        {row.urgency === 'low' && <Calendar className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />}
                                        <div>
                                            <p className="text-sm font-bold">{row.name}</p>
                                            <p className="text-[11px] text-muted-foreground mt-0.5">{row.nota}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 md:text-right">
                                        <div>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase">{row.freq}</p>
                                            <p className="text-xs font-bold">{row.vencimiento}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Calendario SPE</p>
                            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                                Los Sujetos Pasivos Especiales declaran entre los días 12 y 27 de cada mes según el último dígito de su RIF. Consulte el calendario oficial en el portal del SENIAT.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-start gap-3">
                        <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">Nota</p>
                            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                                Las fechas exactas se publican anualmente mediante Providencia del SENIAT. Verifique el calendario oficial vigente para su terminal de RIF.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
