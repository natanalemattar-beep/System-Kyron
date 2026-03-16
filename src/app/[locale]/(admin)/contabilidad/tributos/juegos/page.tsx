
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Zap, Download, Calculator, CheckCircle, 
    Activity, Terminal, Landmark, Coins
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function JuegosAzarPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10 bg-[#f5f7fa] min-h-screen">
            <header className="border-l-4 border-purple-600 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-600/10 border border-purple-600/20 text-[9px] font-black uppercase tracking-[0.4em] text-purple-600 shadow-sm mb-4">
                        <Zap className="h-3 w-3" /> NODO AZAR
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Actividades <span className="text-purple-600 italic">de Juegos</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Impuesto a Casinos y Bingos • Liquidación Mensual</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl bg-purple-600 hover:bg-purple-700 border-none">
                    REGISTRAR APUESTA
                </Button>
            </header>

            <div className="grid gap-10 lg:grid-cols-3">
                <Card className="glass-card border-none bg-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Coins className="h-24 w-24" /></div>
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-purple-600">Monto Gravado (Mes)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <p className="text-4xl font-black italic text-foreground tracking-tighter">Bs. 85.000,00</p>
                        <p className="text-[8px] font-bold uppercase text-muted-foreground mt-4 italic">Alícuota según Ley de Impuesto a Juegos</p>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2 glass-card border-none bg-white p-8 rounded-[3rem] shadow-xl overflow-hidden">
                    <CardHeader className="p-0 mb-8 flex flex-row justify-between items-center">
                        <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-purple-600 italic">Obligaciones Mensuales</CardTitle>
                        <Badge variant="outline" className="border-purple-200 text-purple-600">Ejercicio 2026</Badge>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6 text-xs font-bold uppercase tracking-widest text-slate-500 leading-relaxed text-justify">
                        <p>Los operadores de juegos de azar deben declarar y pagar el impuesto correspondiente dentro de los lapsos fijados en el calendario de Sujetos Pasivos Especiales. El sistema calcula la carga basándose en los ingresos brutos de las mesas de juego y apuestas online.</p>
                        <div className="flex items-center gap-3 text-[9px] font-black uppercase text-slate-400">
                            <Terminal className="h-4 w-4 text-purple-600" /> Protocolo de Fiscalización Activo
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
