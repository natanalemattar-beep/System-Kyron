
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Archive, CirclePlus as PlusCircle, Download, MoveHorizontal as MoreHorizontal, Activity, Zap, Terminal, CalendarClock, ShieldAlert, TrendingDown, Wand as Wand2, CircleCheck as CheckCircle, ArrowRight } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const initialInventory = [
    { sku: "AMERU-IA-PRO-01", nombre: "Ameru IA - Papelera Magnética", categoria: "Tecnología", stock: 15, costo: 95, valor: 1425, vencimiento: "2026-12-31", riesgo: "Bajo" },
    { sku: "SIM-CARD-5G", nombre: "SIM Card 5G Pro", categoria: "Telecom", stock: 100, costo: 2, valor: 200, vencimiento: "2026-04-15", riesgo: "Crítico" },
    { sku: "TONER-K-20", nombre: "Tóner Kyron Black", categoria: "Consumibles", stock: 45, costo: 40, valor: 1800, vencimiento: "2026-04-20", riesgo: "Crítico" },
    { sku: "PROD-002", nombre: "Impresora Fiscal", categoria: "Fiscal", stock: 30, costo: 80, valor: 2400, vencimiento: "N/A", riesgo: "Bajo" },
];

export default function InventarioPage() {
    const [inventory] = useState(initialInventory);
    const { toast } = useToast();
    const [activeAlert, setActiveAlert] = useState<any>(initialInventory[1]); // SIM-CARD por defecto para la demo

    const handleApplyStrategy = () => {
        toast({
            title: "ESTRATEGIA APLICADA",
            description: "Flash Sale del 30% activado en el Punto de Venta para mitigar pérdida.",
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
    };

    return (
        <div className="space-y-12 pb-20">
            <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Archive className="h-3 w-3" /> NODO DE EXISTENCIAS
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow text-white">Kardex <span className="text-primary italic">de Inventario</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Gestión de Riesgo • Liquidación Preventiva 2026</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50">
                        <Download className="mr-2 h-4 w-4" /> EXPORTAR CSV
                    </Button>
                    <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                        <PlusCircle className="mr-2 h-4 w-4" /> NUEVO PRODUCTO
                    </Button>
                </div>
            </header>

            {/* --- PANEL DE MITIGACIÓN DE PÉRDIDAS --- */}
            <AnimatePresence>
                {activeAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid lg:grid-cols-3 gap-8"
                    >
                        <Card className="lg:col-span-2 glass-card border-none bg-rose-500/5 p-8 rounded-[3rem] shadow-2xl border-l-4 border-rose-500 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                                <ShieldAlert className="h-32 w-32 text-rose-500" />
                            </div>
                            <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
                                <div className="space-y-6 flex-1">
                                    <div className="space-y-2">
                                        <Badge className="bg-rose-500/20 text-rose-500 border-none text-[8px] font-black uppercase tracking-widest">Alerta de Vencimiento Crítica</Badge>
                                        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-foreground">Riesgo en SKU: {activeAlert.sku}</h3>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">{activeAlert.nombre}</p>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <TrendingDown className="h-5 w-5 text-rose-500" />
                                            <h4 className="text-xs font-black uppercase text-rose-500">Análisis Predictivo</h4>
                                        </div>
                                        <p className="text-xs font-medium italic text-muted-foreground/80 leading-relaxed text-justify uppercase">
                                            El lote vence el <span className="text-rose-500 font-black">{activeAlert.vencimiento}</span>. Se recomienda liquidar mediante estrategia de volumen para proteger la inversión de capital.
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full md:w-64 space-y-4">
                                    <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl text-center">
                                        <p className="text-[8px] font-black uppercase text-primary mb-2">Estrategia Recomendada</p>
                                        <p className="text-sm font-black italic text-white leading-tight uppercase">FLASH SALE 30% + COMBO AMERU IA</p>
                                    </div>
                                    <Button className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-[10px] tracking-widest shadow-xl" onClick={handleApplyStrategy}>
                                        <Wand2 className="mr-2 h-4 w-4" /> Aplicar Estrategia
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <Card className="glass-card border-none bg-card/40 p-8 rounded-[3rem] shadow-2xl flex flex-col justify-center text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Zap className="h-24 w-24" /></div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-6">Valor en Riesgo Total</p>
                            <p className="text-5xl font-black italic text-rose-500 tracking-tighter shadow-glow-sm">{formatCurrency(2000, 'Bs.')}</p>
                            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40">
                                <Terminal className="h-4 w-4" /> Protocolo de Contingencia Activo
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid gap-6 md:grid-cols-2">
                 <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Zap className="h-24 w-24" /></div>
                    <CardHeader className="p-0 mb-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Valor Total Almacén</p>
                    </CardHeader>
                    <CardContent className="p-0">
                        <p className="text-4xl font-black italic text-primary tracking-tighter shadow-glow-text">{formatCurrency(inventory.reduce((acc, i) => acc + i.valor, 0), 'Bs.')}</p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Activity className="h-24 w-24" /></div>
                    <CardHeader className="p-0 mb-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Índice de Rotación</p>
                    </CardHeader>
                    <CardContent className="p-0">
                        <p className="text-4xl font-black italic text-foreground tracking-tighter">4.2 Ciclos</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 flex flex-row justify-between items-center bg-muted/10">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Kardex de Existencias Auditado</CardTitle>
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40">
                        <Terminal className="h-4 w-4" /> Ledger Sincronizado
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 border-none">
                                <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">SKU / Ref</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Producto</TableHead>
                                <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Stock</TableHead>
                                <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Vencimiento</TableHead>
                                <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Costo Unit.</TableHead>
                                <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Riesgo</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inventory.map((item) => (
                                <TableRow key={item.sku} className={cn(
                                    "border-border/50 hover:bg-muted/20 transition-all group cursor-pointer",
                                    item.riesgo === "Crítico" && "bg-rose-500/5"
                                )} onClick={() => item.riesgo === "Crítico" ? setActiveAlert(item) : null}>
                                    <TableCell className="pl-10 py-6 font-mono text-[10px] font-black text-primary italic">{item.sku}</TableCell>
                                    <TableCell className="py-6">
                                        <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-primary transition-colors">{item.nombre}</p>
                                        <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">{item.categoria}</p>
                                    </TableCell>
                                    <TableCell className="text-center py-6 font-black text-sm text-foreground/70">{item.stock}</TableCell>
                                    <TableCell className="text-center py-6">
                                        <div className="flex items-center justify-center gap-2">
                                            <CalendarClock className={cn("h-3.5 w-3.5", item.riesgo === 'Crítico' ? "text-rose-500" : "text-muted-foreground/40")} />
                                            <span className={cn("text-[10px] font-bold uppercase", item.riesgo === 'Crítico' ? "text-rose-500" : "text-muted-foreground")}>{item.vencimiento}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/60">{formatCurrency(item.costo, 'Bs.')}</TableCell>
                                    <TableCell className="text-right pr-10 py-6">
                                        <Badge variant={item.riesgo === 'Crítico' ? 'destructive' : 'outline'} className="text-[8px] font-black uppercase tracking-widest h-6 px-3 rounded-lg">
                                            {item.riesgo}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="p-10 bg-primary/5 border-t border-border flex justify-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 italic">Haga clic en un producto con riesgo crítico para activar el protocolo de liquidación IA.</p>
                </CardFooter>
            </Card>
        </div>
    );
}
