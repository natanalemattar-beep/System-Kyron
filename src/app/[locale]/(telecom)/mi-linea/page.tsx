
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Smartphone, 
    Zap, 
    Activity, 
    Wallet, 
    History, 
    CreditCard, 
    Globe, 
    Signal, 
    Loader2,
    ArrowUpRight,
    Wifi,
    ChevronDown,
    Lock
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MiLineaPage() {
    const { toast } = useToast();
    const [isRecharging, setIsRecharging] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [activeNumber, setActiveNumber] = useState("0414-9377068");

    const dataInfo = {
        total: 30,
        used: 12.4,
        unit: "GB"
    };

    const percentage = (dataInfo.used / dataInfo.total) * 100;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleRecharge = () => {
        setIsRecharging(true);
        setTimeout(() => {
            setIsRecharging(false);
            toast({
                title: "RECARGA EXITOSA",
                description: `Saldo acreditado a la línea ${activeNumber}.`,
                action: <Zap className="text-yellow-400 h-4 w-4" />
            });
        }, 2000);
    };

    if (!isMounted) return null;

    return (
        <div className="space-y-12 pb-20 px-6 md:px-16 animate-in fade-in duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Signal className="h-3 w-3" /> NODO DE CONECTIVIDAD
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Mi Línea <span className="text-primary italic">5G Pro</span></h1>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-12 px-6 rounded-xl border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest shadow-glow group">
                                    {activeNumber}
                                    <ChevronDown className="ml-3 h-4 w-4 opacity-40 group-hover:opacity-100 transition-all" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 bg-black/95 border-white/10 backdrop-blur-xl rounded-2xl p-2">
                                <p className="p-3 text-[8px] font-black uppercase tracking-widest text-white/20">Cambiar línea activa</p>
                                <DropdownMenuItem className="rounded-xl h-12 text-xs font-bold uppercase italic focus:bg-primary/10" onClick={() => setActiveNumber("0414-9377068")}>0414-9377068 (Personal)</DropdownMenuItem>
                                <DropdownMenuItem className="rounded-xl h-12 text-xs font-bold uppercase italic focus:bg-primary/10" onClick={() => setActiveNumber("0412-1234567")}>0412-1234567 (Tablet)</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Asignación Inmediata • Provisión eUICC v2.6.5</p>
                </div>
                
                <div className="flex gap-3">
                    <Badge variant="outline" className="h-12 px-6 rounded-xl border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-black uppercase tracking-widest shadow-glow-secondary">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-3" />
                        ESTADO: ACTIVO
                    </Badge>
                </div>
            </header>

            <div className="grid lg:grid-cols-12 gap-10">
                {/* Consumo de Datos */}
                <Card className="lg:col-span-7 glass-card border-none rounded-[3rem] bg-white/[0.01] overflow-hidden shadow-2xl p-10">
                    <CardHeader className="p-0 mb-10">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Consumo de Datos</CardTitle>
                            <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">Plan Infinite 5G</span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 space-y-10">
                        <div className="relative flex flex-col items-center justify-center p-12 bg-white/[0.02] border border-white/5 rounded-[2.5rem] shadow-inner">
                            <div className="absolute top-6 left-8 text-[9px] font-black uppercase tracking-widest text-primary">Inyección de Red Activa</div>
                            
                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="text-7xl font-black italic text-white tracking-tighter leading-none">{dataInfo.used}</span>
                                <span className="text-2xl font-black text-white/20 uppercase tracking-tighter">{dataInfo.unit}</span>
                            </div>
                            
                            <div className="w-full space-y-4">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                                    <span>Base: 0 GB</span>
                                    <span>Límite: {dataInfo.total} GB</span>
                                </div>
                                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-primary rounded-full shadow-glow" 
                                    />
                                </div>
                                <p className="text-center text-[9px] font-bold text-primary uppercase tracking-[0.3em] italic">Quedan {(dataInfo.total - dataInfo.used).toFixed(1)} GB disponibles</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { label: "Velocidad", val: "1.2 Gbps", icon: Zap, color: "text-yellow-400" },
                                { label: "Latencia", val: "14 ms", icon: Activity, color: "text-emerald-400" },
                                { label: "Red", val: "5G SA", icon: Wifi, color: "text-blue-400" },
                                { label: "Seguridad", val: "AES-512", icon: Lock, color: "text-primary" }
                            ].map(stat => (
                                <div key={stat.label} className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl text-center group hover:bg-white/5 transition-all">
                                    <stat.icon className={cn("h-4 w-4 mx-auto mb-3 opacity-40 group-hover:opacity-100 transition-all", stat.color)} />
                                    <p className="text-[8px] font-black uppercase text-white/20 mb-1">{stat.label}</p>
                                    <p className="text-xs font-black text-white/80">{stat.val}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Saldo y Recargas */}
                <div className="lg:col-span-5 space-y-8">
                    <Card className="glass-card border-none bg-primary text-primary-foreground rounded-[2.5rem] p-10 relative overflow-hidden shadow-glow group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                            <Wallet className="h-32 w-32" />
                        </div>
                        <div className="relative z-10 space-y-8">
                            <div className="space-y-1">
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] opacity-60 text-white">Saldo Disponible</h3>
                                <p className="text-5xl font-black italic tracking-tighter text-white leading-none">$ 15.00</p>
                            </div>
                            
                            <div className="space-y-4">
                                <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed opacity-80 italic">Su plan se renovará automáticamente en 12 días.</p>
                                <Button 
                                    className="w-full h-14 rounded-2xl bg-white text-primary hover:bg-white/90 font-black uppercase text-xs tracking-widest shadow-2xl transition-all"
                                    onClick={handleRecharge}
                                    disabled={isRecharging}
                                >
                                    {isRecharging ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <CreditCard className="mr-3 h-4 w-4" />}
                                    RECARGAR SALDO
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <Card className="glass-card border-none bg-white/[0.02] rounded-[2.5rem] p-10">
                        <CardHeader className="p-0 mb-8">
                            <CardTitle className="text-xs font-black uppercase tracking-[0.4em] text-white/40 italic flex items-center gap-3">
                                <History className="h-4 w-4 text-primary" /> Historial de Tráfico
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            {[
                                { date: "Hoy, 10:45", app: "System Kyron ERP", data: "145 MB" },
                                { date: "Hoy, 08:20", app: "Streaming 4K", data: "2.1 GB" },
                                { date: "Ayer, 22:15", app: "Actualización OS", data: "850 MB" },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-white/[0.01] border border-white/5 rounded-xl group hover:bg-white/5 transition-all">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase italic text-white/80">{item.app}</p>
                                        <p className="text-[8px] font-bold text-white/20 uppercase">{item.date}</p>
                                    </div>
                                    <span className="text-[10px] font-black text-primary italic">{item.data}</span>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="p-0 pt-8 border-t border-white/5 mt-8 justify-center">
                            <Button variant="link" className="text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-primary">Ver Auditoría Completa</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
