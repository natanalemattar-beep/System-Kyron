
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Activity, 
    Wallet, 
    History, 
    CreditCard, 
    Signal, 
    Loader2,
    ArrowUpRight,
    Wifi,
    ChevronDown,
    Lock,
    RefreshCw,
    CheckCircle,
    Zap,
    Cpu,
    Network,
    ShieldCheck
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
import { Progress } from "@/components/ui/progress";

const associatedLines = [
    { id: "line-1", number: "0414-9377068", label: "Principal", plan: "Infinite 5G Master", used: 12.4, total: 30, balance: 15.00, status: "Activa", iccid: "895804...4567", ip: "10.42.0.1" },
    { id: "line-2", number: "0412-1234567", label: "Nodo Datos / TPV", plan: "Enterprise 100GB", used: 28.1, total: 100, balance: 45.50, status: "Activa", iccid: "895804...1122", ip: "10.42.0.8" },
    { id: "line-3", number: "0424-5558899", label: "Backup / Seguridad", plan: "Emergency 5GB", used: 0.5, total: 5, balance: 0.00, status: "Suspendida", iccid: "895804...9900", ip: "N/A" },
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
            title: "SINCRONIZANDO NODO",
            description: `Aprovisionando perfil eSIM para ${newLine.number}...`,
        });

        setTimeout(() => {
            setActiveLine(newLine);
            setIsSwitching(false);
            toast({
                title: "ENLACE ESTABLECIDO",
                description: `Gestionando: ${newLine.label.toUpperCase()}`,
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
        }, 800);
    };

    const handleRecharge = () => {
        setIsRecharging(true);
        setTimeout(() => {
            setIsRecharging(false);
            toast({
                title: "RECARGA CERTIFICADA",
                description: `Saldo acreditado mediante protocolo de pago seguro.`,
                action: <Zap className="text-yellow-400 h-4 w-4" />
            });
        }, 1500);
    };

    if (!isMounted) return null;

    return (
        <div className="space-y-10 pb-20 px-4 md:px-10 lg:px-16 animate-in fade-in duration-1000">
            {/* Header UHD */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow">
                        <Signal className="h-3 w-3" /> NODO DE TELECOMUNICACIONES
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Mi Línea <span className="text-primary italic">5G Pro</span></h1>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-12 px-6 rounded-xl border-white/10 bg-white/5 text-white text-[10px] font-black uppercase tracking-widest shadow-2xl group hover:border-primary/40">
                                    {activeLine.number}
                                    <ChevronDown className="ml-3 h-4 w-4 opacity-40 group-hover:opacity-100 group-hover:rotate-180 transition-all" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-72 bg-black/95 border-white/10 backdrop-blur-2xl rounded-2xl p-2 shadow-glow">
                                <p className="p-4 text-[8px] font-black uppercase tracking-[0.3em] text-white/20 border-b border-white/5 mb-2">Selector de Nodo Activo</p>
                                {associatedLines.map(line => (
                                    <DropdownMenuItem 
                                        key={line.id} 
                                        className={cn(
                                            "rounded-xl h-12 text-[10px] font-bold uppercase italic focus:bg-primary/10 flex justify-between items-center px-4",
                                            line.id === activeLine.id && "text-primary bg-primary/5"
                                        )}
                                        onClick={() => handleSwitchLine(line.id)}
                                    >
                                        <div className="flex flex-col">
                                            <span>{line.number}</span>
                                            <span className="text-[7px] opacity-40 not-italic">{line.label}</span>
                                        </div>
                                        {line.id === activeLine.id && <CheckCircle className="h-3.5 w-3.5" />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-4 italic">Aprovisionamiento eUICC v2.6.5 • Low Latency Mode</p>
                </div>
                
                <div className="flex gap-3">
                    <Badge variant="outline" className={cn(
                        "h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-glow-secondary",
                        activeLine.status === "Activa" ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400" : "border-rose-500/20 bg-rose-500/5 text-rose-400"
                    )}>
                        <div className={cn("h-2 w-2 rounded-full mr-3 shadow-glow", activeLine.status === "Activa" ? "bg-emerald-500 animate-pulse" : "bg-rose-500")} />
                        {activeLine.status.toUpperCase()}
                    </Badge>
                </div>
            </header>

            <div className="grid lg:grid-cols-12 gap-10">
                {/* Consumo y Telemetría */}
                <Card className="lg:col-span-8 glass-card border-none rounded-[3rem] bg-white/[0.01] overflow-hidden shadow-2xl relative">
                    <AnimatePresence mode="wait">
                        {isSwitching && (
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
                            >
                                <Loader2 className="h-16 w-16 text-primary animate-spin" />
                                <div className="text-center space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 animate-pulse">Sincronizando con Torre de Control</p>
                                    <p className="text-[8px] font-bold text-primary uppercase tracking-widest">Protocolo de Enlace OTA Activo</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01] flex flex-row items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-inner">
                                <Activity className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black uppercase italic tracking-tighter text-white">Telemetría de Datos</CardTitle>
                                <CardDescription className="text-[10px] font-bold uppercase opacity-30 tracking-widest italic">{activeLine.plan}</CardDescription>
                            </div>
                        </div>
                        <Badge className="bg-white/5 border-white/10 text-white/40 text-[9px] font-black uppercase px-4 h-8 flex items-center gap-2">
                            <Lock className="h-3 w-3" /> SECURE TUNNEL
                        </Badge>
                    </CardHeader>
                    
                    <CardContent className="p-10 space-y-12">
                        <div className="relative flex flex-col items-center justify-center py-16 md:py-24 bg-white/[0.02] border border-white/5 rounded-[3rem] shadow-inner overflow-hidden group/gauge">
                            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover/gauge:opacity-10 transition-all duration-1000">
                                <Wifi className="h-64 w-64 rotate-12" />
                            </div>
                            
                            <div className="flex items-baseline gap-6 mb-10 relative z-10">
                                <motion.span 
                                    key={activeLine.used}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-8xl md:text-[10rem] font-black italic text-white tracking-tighter leading-none shadow-glow-text"
                                >
                                    {activeLine.used}
                                </motion.span>
                                <span className="text-3xl font-black text-white/20 uppercase tracking-tighter">GB</span>
                            </div>
                            
                            <div className="w-full max-w-xl space-y-6 px-10 relative z-10">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                                    <span className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> CONSUMIDO</span>
                                    <span>LIMITE: {activeLine.total} GB</span>
                                </div>
                                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-1 border border-white/10 shadow-inner">
                                    <motion.div 
                                        key={activeLine.id}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(activeLine.used / activeLine.total) * 100}%` }}
                                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                                        className={cn(
                                            "h-full rounded-full shadow-glow transition-colors duration-500",
                                            (activeLine.used / activeLine.total) > 0.9 ? "bg-rose-500 shadow-rose-500/50" : "bg-primary shadow-primary/50"
                                        )}
                                    />
                                </div>
                                <div className="flex justify-center gap-10 pt-4">
                                    <div className="text-center">
                                        <p className="text-[8px] font-black text-white/20 uppercase mb-1">Restante</p>
                                        <p className="text-xl font-black italic text-primary">{(activeLine.total - activeLine.used).toFixed(1)} GB</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[8px] font-black text-white/20 uppercase mb-1">Renovación</p>
                                        <p className="text-xl font-black italic text-white">12 DÍAS</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { label: "Velocidad Peak", val: "1.4 Gbps", icon: Zap, color: "text-yellow-400" },
                                { label: "Network Slice", val: "ACTIVE", icon: Cpu, color: "text-emerald-400" },
                                { label: "IPv6 Node", val: activeLine.ip, icon: Globe, color: "text-blue-400" },
                                { label: "Cifrado Red", val: "AES-512", icon: Lock, color: "text-primary" }
                            ].map(stat => (
                                <div key={stat.label} className="p-6 bg-white/[0.01] border border-white/5 rounded-3xl text-center group hover:bg-white/[0.03] transition-all border-b-2 hover:border-b-primary">
                                    <stat.icon className={cn("h-5 w-5 mx-auto mb-4 opacity-20 group-hover:opacity-100 transition-all", stat.color)} />
                                    <p className="text-[9px] font-black uppercase text-white/20 mb-1 tracking-widest">{stat.label}</p>
                                    <p className="text-xs font-black text-white italic tracking-tight uppercase">{stat.val}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Sidebar de Acciones */}
                <div className="lg:col-span-4 space-y-10">
                    <Card className="bg-primary text-primary-foreground rounded-[3rem] p-10 relative overflow-hidden shadow-glow group border-none">
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                            <Wallet className="h-40 w-40" />
                        </div>
                        <div className="relative z-10 space-y-10">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="h-4 w-4 opacity-60" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 text-white">Saldo de Nodo</h3>
                                </div>
                                <motion.p 
                                    key={activeLine.balance}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-6xl font-black italic tracking-tighter text-white leading-none shadow-glow-text"
                                >
                                    {formatCurrency(activeLine.balance, 'USD')}
                                </motion.p>
                            </div>
                            
                            <Button 
                                className="w-full h-16 rounded-2xl bg-white text-primary hover:bg-slate-100 font-black uppercase text-xs tracking-widest shadow-2xl transition-all active:scale-95"
                                onClick={handleRecharge}
                                disabled={isRecharging}
                            >
                                {isRecharging ? <Loader2 className="animate-spin mr-3 h-5 w-5" /> : <CreditCard className="mr-3 h-5 w-5" />}
                                RECARGAR SALDO
                            </Button>
                        </div>
                    </Card>

                    <Card className="glass-card border-none bg-white/[0.02] rounded-[3rem] p-10 shadow-2xl">
                        <CardHeader className="p-0 mb-8 border-b border-white/5 pb-6">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-white/40 italic flex items-center gap-4">
                                <Network className="h-5 w-5 text-primary" /> Líneas Vinculadas
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            {associatedLines.map((line) => (
                                <button
                                    key={line.id}
                                    onClick={() => handleSwitchLine(line.id)}
                                    disabled={line.id === activeLine.id || isSwitching}
                                    className={cn(
                                        "w-full group p-5 rounded-[1.5rem] border transition-all text-left flex items-center justify-between relative overflow-hidden",
                                        line.id === activeLine.id 
                                            ? "bg-primary/10 border-primary/40 cursor-default shadow-inner" 
                                            : "bg-white/[0.03] border-white/5 hover:border-primary/30 hover:bg-primary/5 cursor-pointer"
                                    )}
                                >
                                    <div className="space-y-1">
                                        <p className="text-sm font-black italic text-white/90 group-hover:text-primary transition-colors">{line.number}</p>
                                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{line.label}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className={cn(
                                            "h-2 w-2 rounded-full",
                                            line.status === "Activa" ? "bg-emerald-500 shadow-glow-secondary" : "bg-rose-500 shadow-rose-500/50"
                                        )} />
                                        <span className="text-[8px] font-black text-white/10 group-hover:text-primary transition-colors">ID: {line.id.toUpperCase()}</span>
                                    </div>
                                </button>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-none bg-white/[0.01] rounded-[2.5rem] p-10">
                        <CardHeader className="p-0 mb-8">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic flex items-center gap-4">
                                <History className="h-5 w-5 opacity-40" /> Últimos Movimientos
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-6">
                            {[
                                { date: "15 MAR", desc: "Recarga Portal", amount: 15.00, type: "plus" },
                                { date: "14 MAR", desc: "Pago Plan Infinite", amount: -25.00, type: "minus" },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest group">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("h-1.5 w-1.5 rounded-full", item.type === 'plus' ? "bg-emerald-500" : "bg-rose-500")} />
                                        <span className="text-white/30 group-hover:text-white/60 transition-colors">{item.date} • {item.desc}</span>
                                    </div>
                                    <span className={cn(
                                        "italic font-black text-xs",
                                        item.type === 'plus' ? "text-emerald-400" : "text-white/60"
                                    )}>{item.type === 'plus' ? '+' : ''}{formatCurrency(item.amount, 'USD')}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center gap-6 opacity-30 text-center">
                <Logo className="h-12 w-12 grayscale" />
                <p className="text-[10px] font-black uppercase tracking-[1em] text-white italic">KYRON TELECOM INFRASTRUCTURE • 2026</p>
            </footer>
        </div>
    );
}
