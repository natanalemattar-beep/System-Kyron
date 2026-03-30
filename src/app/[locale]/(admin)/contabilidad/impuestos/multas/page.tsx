"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, Loader2, Inbox, ShieldCheck } from "lucide-react";
import { Link } from "@/navigation";

export default function MultasPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-2">
                        <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4" /> Volver al Centro Contable</Link>
                    </Button>
                    <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tight flex items-center gap-3">
                        <AlertTriangle className="h-8 w-8 text-amber-500" />
                        Multas y Sanciones
                    </h1>
                    <p className="text-slate-500 font-medium">Registro de multas fiscales, tributarias y administrativas.</p>
                </div>
            </header>

            <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span className="text-sm font-bold uppercase tracking-widest">Verificando sanciones...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                            <ShieldCheck className="h-10 w-10 text-emerald-500" />
                            <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">Sin multas ni sanciones activas</p>
                            <p className="text-xs text-slate-400/70">El sistema monitoreará automáticamente el estatus de cumplimiento fiscal.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
