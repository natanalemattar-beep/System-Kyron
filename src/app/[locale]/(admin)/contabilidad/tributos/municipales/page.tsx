"use client";

import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Landmark, Info, ChevronRight, AlertTriangle } from "lucide-react";

const ALICUOTAS = [
    { rubro: "Minería y Canteras", tipo: "Especial", ali: "6.50%" },
    { rubro: "Hidrocarburos y Derivados", tipo: "Especial", ali: "6.50%" },
    { rubro: "Publicidad y Propaganda", tipo: "Servicios", ali: "5.00%" },
    { rubro: "Bebidas Alcohólicas y Tabaco", tipo: "Especial", ali: "6.00%" },
    { rubro: "Telecomunicaciones e Informática", tipo: "Tecnología", ali: "3.50%" },
    { rubro: "Comercio al Mayor", tipo: "Comercial", ali: "2.00%" },
    { rubro: "Comercio al Detal", tipo: "Comercial", ali: "1.50%" },
];

const NOTAS = [
    "La Licencia de Actividades Económicas (antes Patente de Industria y Comercio) es emitida por cada alcaldía.",
    "La alícuota general varía según la ordenanza de cada municipio, generalmente entre 0.5% y 3% sobre ingresos brutos.",
    "El mínimo tributario se calcula en base al tipo de cambio oficial de la moneda de mayor valor del BCV.",
    "La licencia tiene vigencia de 3 años y debe renovarse antes de su vencimiento.",
    "La base legal general es la Ley Orgánica del Poder Público Municipal (LOPPM).",
];

export default function ImpuestosMunicipalesPage() {
    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
                        <Landmark className="h-3.5 w-3.5" /> Municipales
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Impuestos <span className="text-primary">Municipales</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">LOPPM · Licencia de Actividades Económicas · Patentes Locales</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <Card className="rounded-2xl shadow-lg border overflow-hidden">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Landmark className="h-4 w-4 text-primary" />
                                Alícuotas por Actividad Económica
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="pl-6 text-xs font-bold">Rubro Económico</TableHead>
                                        <TableHead className="text-xs font-bold text-center">Tipo</TableHead>
                                        <TableHead className="text-right pr-6 text-xs font-bold">Alícuota Máxima</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {ALICUOTAS.map((row, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="pl-6 text-xs font-bold">{row.rubro}</TableCell>
                                            <TableCell className="text-xs text-center text-muted-foreground">{row.tipo}</TableCell>
                                            <TableCell className="text-right pr-6 text-sm font-bold text-primary">{row.ali}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Info className="h-4 w-4 text-amber-500" />
                                Notas Importantes
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
                            <p className="text-[11px] text-muted-foreground leading-relaxed">Las alícuotas varían según la ordenanza de cada municipio. Consulte la ordenanza vigente de su jurisdicción.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
