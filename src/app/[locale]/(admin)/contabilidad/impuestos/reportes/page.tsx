"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft, Loader2, Download, BarChart3 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Link } from "@/navigation";

interface DashboardData {
    ingresos: number;
    gastos: number;
    utilidadNeta: number;
    liquidezTotal: number;
    facturas: { emitidas: number; cobradas: number; vencidas: number };
}

export default function ReportesPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/dashboard')
            .then(r => r.ok ? r.json() : null)
            .then(d => setData(d))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-2">
                        <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4" /> Volver al Centro Contable</Link>
                    </Button>
                    <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tight flex items-center gap-3">
                        <FileText className="h-8 w-8 text-[#00A86B]" />
                        Reportes Tributarios
                    </h1>
                    <p className="text-slate-500 font-medium">Resumen ejecutivo de la situación fiscal del período actual.</p>
                </div>
                <Button variant="outline" className="rounded-xl"><Download className="mr-2 h-4 w-4" />Exportar Reporte</Button>
            </header>

            {loading ? (
                <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-sm font-bold uppercase tracking-widest">Generando reporte...</span>
                </div>
            ) : !data ? (
                <Card className="border-none shadow-sm rounded-2xl bg-white p-12 text-center">
                    <BarChart3 className="h-10 w-10 mx-auto text-slate-300 mb-4" />
                    <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Sin datos fiscales disponibles</p>
                    <p className="text-xs text-slate-400/70 mt-2">Inicie sesión y registre operaciones para generar reportes.</p>
                </Card>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Ingresos del Período</p>
                        <p className="text-3xl font-black text-[#0A2472]">{formatCurrency(data.ingresos, 'Bs.')}</p>
                    </Card>
                    <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Gastos del Período</p>
                        <p className="text-3xl font-black text-rose-600">{formatCurrency(data.gastos, 'Bs.')}</p>
                    </Card>
                    <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Utilidad Neta</p>
                        <p className="text-3xl font-black text-[#00A86B]">{formatCurrency(data.utilidadNeta, 'Bs.')}</p>
                    </Card>
                    <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Liquidez Total</p>
                        <p className="text-3xl font-black text-[#0A2472]">{formatCurrency(data.liquidezTotal, 'Bs.')}</p>
                    </Card>
                    <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Facturas Emitidas</p>
                        <p className="text-3xl font-black text-amber-600">{data.facturas.emitidas}</p>
                    </Card>
                    <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Facturas Vencidas</p>
                        <p className="text-3xl font-black text-rose-600">{data.facturas.vencidas}</p>
                    </Card>
                </div>
            )}
        </div>
    );
}
