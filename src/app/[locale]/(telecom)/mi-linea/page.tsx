
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
    Lock,
    RefreshCw,
    CheckCircle
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const associatedLines = [
    { id: "line-1", number: "0414-9377068", label: "Principal", plan: "Infinite 5G", used: 12.4, total: 30, balance: 15.00, status: "Activa" },
    { id: "line-2", number: "0412-1234567", label: "Tablet / Datos", plan: "Global 40GB", used: 28.1, total: 40, balance: 5.50, status: "Activa" },
    { id: "line-3", number: "0424-5558899", label: "Emergencia", plan: "Conecta 10GB", used: 0.5, total: 10, balance: 0.00, status: "Suspendida" },
];

export default function MiLineaPage() {
    const { toast } = useToast();
    const [isRecharging, setIsRecharging] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [activeLine, setActiveLine] = useState(associatedLines[0]);
    const [isSwitching, setIsSwitching] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSwitchLine = (lineId: string) => {
        const newLine = associatedLines.find(l => l.id === lineId);
        if (!newLine || newLine.id === activeLine.id) return;

        setIsSwitching(true);
        toast({
            title: "SINCRONIZANDO LÍNEA",
            description: `Conectando al servicio ${newLine.number}...`,
        });

        setTimeout(() => {
            setActiveLine(newLine);
            setIsSwitching(false);
            toast({
                title: "CONEXIÓN ESTABLECIDA",
                description: `Ahora gestionando: ${newLine.label}`,
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
        }, 800);
    };

    const handleRecharge = () => {
        setIsRecharging(true);
        setTimeout(() => {
            setIsRecharging(false);
            toast({
                title: "RECARGA EXITOSA",
                description: `Saldo acreditado a la línea ${activeLine.number}.`,
                action: <Zap className="text-yellow-400 h-4 w-4" />
            });
        }, 1500);
    };

    if (!isMounted) return null;

    const percentage = (activeLine.used / activeLine.total) * 100;

    return (
        <div className="space-y-10 pb-20 px-4 md:px-16 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-l-4 border-primary pl-6 md:pl-8 py-2 mt-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Signal className="h-3 w-3" /> SERVICIO DE CONECTIVIDAD
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 md:gap-6">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Mi Línea <span className="text-primary italic">5G</span></h1>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-12 px-6 rounded-xl border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest shadow-glow group">
                                    {activeLine.number}
                                    <ChevronDown className="ml-3 h-4 w-4 opacity-40 group-hover:opacity-100 transition-all" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 bg-black/95 border-white/10 backdrop-blur-xl rounded-2xl p-2">
                                <p className="p-3 text-[8px] font-black uppercase tracking-widest text-white/20 border-b border-white/5 mb-1">Cambiar línea de gestión</p>
                                {associatedLines.map(line => (
                                    <DropdownMenuItem 
                                        key={line.id} 
                                        className={cn(
                                            "rounded-xl h-12 text-[10px] font-bold uppercase italic focus:bg-primary/10 flex justify-between items-center",
                                            line.id === activeLine.id && "text-primary bg-primary/5"
                                        )}
                                        onClick={() => handleSwitchLine(line.id)}
                                    >
                                        <span>{line.number} ({line.label})</span>
                                        {line.id === activeLine.id && <CheckCircle className="h-3 w-3" />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Gestión de Consumo en Tiempo Real • 2026</p>
                </div>
                
                <div className="flex gap-3">
                    <Badge variant="outline" className={cn(
                        "h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-glow-secondary",
                        activeLine.status === "Activa" ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400" : "border-rose-500/20 bg-rose-500/5 text-rose-400"
                    )}>
                        <div className={cn("h-2 w-2 rounded-full mr-3", activeLine.status === "Activa" ? "bg-emerald-500 animate-pulse" : "bg-rose-500")} />
                        ESTADO: {activeLine.status.toUpperCase()}
                    </Badge>
                </div>
            </header>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Monitor de Consumo */}
                <Card className="lg:col-span-8 glass-card border-none rounded-[2.5rem] bg-white/[0.01] overflow-hidden shadow-2xl relative">
                    <AnimatePresence mode="wait">
                        {isSwitching && (
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center gap-4"
                            >
                                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Actualizando Telemetría...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <CardHeader className="p-8 md:p-10 border-b border-white/5 bg-white/[0.01]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                                    <Activity className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Monitor de Datos</CardTitle>
                                    <CardDescription className="text-[9px] font-bold uppercase opacity-30 tracking-widest">{activeLine.plan}</CardDescription>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/5 opacity-40 hover:opacity-100 transition-all">
                                <RefreshCw className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    
                    <CardContent className="p-8 md:p-10 space-y-10">
                        <div className="relative flex flex-col items-center justify-center py-16 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-inner overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all">
                                <Wifi className="h-48 w-48 rotate-12" />
                            </div>
                            
                            <div className="flex items-baseline gap-4 mb-8 relative z-10">
                                <motion.span 
                                    key={activeLine.used}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-7xl md:text-8xl font-black italic text-white tracking-tighter leading-none"
                                >
                                    {activeLine.used}
                                </motion.span>
                                <span className="text-2xl font-black text-white/20 uppercase tracking-tighter">GB</span>
                            </div>
                            
                            <div className="w-full max-w-lg space-y-4 px-6 relative z-10">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                                    <span>Plan: 0 GB</span>
                                    <span>Límite: {activeLine.total} GB</span>
                                </div>
                                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
                                    <motion.div 
                                        key={activeLine.id}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(activeLine.used / activeLine.total) * 100}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className={cn(
                                            "h-full rounded-full shadow-glow transition-colors duration-1000",
                                            (activeLine.used / activeLine.total) > 0.9 ? "bg-rose-500" : "bg-primary"
                                        )}
                                    />
                                </div>
                                <p className="text-center text-[9px] font-bold text-primary uppercase tracking-[0.3em] italic">Quedan {(activeLine.total - activeLine.used).toFixed(1)} GB de alta velocidad</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { label: "Velocidad", val: "1.2 Gbps", icon: Zap, color: "text-yellow-400" },
                                { label: "Latencia", val: "14 ms", icon: Activity, color: "text-emerald-400" },
                                { label: "Protocolo", val: "5G SA", icon: Wifi, color: "text-blue-400" },
                                { label: "Cifrado", val: "AES-512", icon: Lock, color: "text-primary" }
                            ].map(stat => (
                                <div key={stat.label} className="p-5 bg-white/[0.01] border border-white/5 rounded-[1.5rem] text-center group hover:bg-white/[0.03] hover:border-primary/20 transition-all">
                                    <stat.icon className={cn("h-4 w-4 mx-auto mb-3 opacity-30 group-hover:opacity-100 transition-all", stat.color)} />
                                    <p className="text-[8px] font-black uppercase text-white/20 mb-1 tracking-widest">{stat.label}</p>
                                    <p className="text-xs font-black text-white/80 italic">{stat.val}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Acceso Rápido y Saldo */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Tarjeta de Saldo */}
                    <Card className="glass-card border-none bg-primary text-primary-foreground rounded-[2.5rem] p-10 relative overflow-hidden shadow-glow group border-none">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                            <Wallet className="h-32 w-32" />
                        </div>
                        <div className="relative z-10 space-y-8">
                            <div className="space-y-1">
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] opacity-60 text-white">Saldo de Línea</h3>
                                <motion.p 
                                    key={activeLine.balance}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-5xl font-black italic tracking-tighter text-white leading-none"
                                >
                                    {formatCurrency(activeLine.balance, 'USD')}
                                </motion.p>
                            </div>
                            
                            <div className="space-y-4">
                                <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed opacity-80 italic">Renovación automática: 12 días.</p>
                                <Button 
                                    className="w-full h-14 rounded-2xl bg-white text-primary hover:bg-white/90 font-black uppercase text-xs tracking-widest shadow-2xl transition-all"
                                    onClick={handleRecharge}
                                    disabled={isRecharging}
                                >
                                    {isRecharging ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <CreditCard className="mr-3 h-4 w-4" />}
                                    RECARGAR AHORA
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Acceso Rápido Multi-Línea */}
                    <Card className="glass-card border-none bg-white/[0.02] rounded-[2.5rem] p-8 shadow-2xl">
                        <CardHeader className="p-0 mb-8">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic">Mis Otras Líneas</CardTitle>
                                <Badge variant="outline" className="text-[8px] font-black opacity-40">{associatedLines.length}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 space-y-3">
                            {associatedLines.map((line) => (
                                <button
                                    key={line.id}
                                    onClick={() => handleSwitchLine(line.id)}
                                    disabled={line.id === activeLine.id || isSwitching}
                                    className={cn(
                                        "w-full group p-4 rounded-2xl border transition-all text-left flex items-center justify-between relative overflow-hidden",
                                        line.id === activeLine.id 
                                            ? "bg-primary/10 border-primary/40 cursor-default" 
                                            : "bg-white/[0.03] border-white/5 hover:border-primary/30 hover:bg-primary/5 cursor-pointer"
                                    )}
                                >
                                    <div className="space-y-1 relative z-10">
                                        <p className="text-xs font-black italic text-white/90 group-hover:text-primary transition-colors">{line.number}</p>
                                        <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">{line.label} • {line.plan}</p>
                                    </div>
                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className={cn(
                                            "h-1.5 w-1.5 rounded-full",
                                            line.status === "Activa" ? "bg-emerald-500" : "bg-rose-500"
                                        )} />
                                        {line.id !== activeLine.id && <ArrowUpRight className="h-3 w-3 text-white/10 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />}
                                    </div>
                                    {line.id === activeLine.id && (
                                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary shadow-glow" />
                                    )}
                                </button>
                            ))}
                        </CardContent>
                        <CardFooter className="p-0 pt-6 mt-6 border-t border-white/5">
                            <Button variant="link" className="w-full text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-primary">
                                Gestionar Perfiles eSIM
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Historial Rápido */}
                    <Card className="glass-card border-none bg-white/[0.01] rounded-[2.5rem] p-8">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic flex items-center gap-3">
                                <History className="h-4 w-4 opacity-40" /> Últimas Recargas
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            {[
                                { date: "01 Mar", amount: 15.00, method: "Pago Móvil" },
                                { date: "15 Feb", amount: 10.00, method: "Tarjeta" },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/40">
                                    <span>{item.date} • {item.method}</span>
                                    <span className="text-white/70 italic font-black">{formatCurrency(item.amount, 'USD')}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
