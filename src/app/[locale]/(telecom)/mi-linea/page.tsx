'use client';

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Wallet, History, CreditCard, Signal, Loader as Loader2, Wifi, ChevronDown, Lock, CircleCheck as CheckCircle, Zap, Cpu, Network, ShieldCheck, Globe, Download } from "lucide-react";
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
import { Logo } from "@/components/logo";

const associatedLines = [
    { id: "line-1", number: "0414-9377068", label: "Principal", plan: "Infinite 5G Master", used: 12.4, total: 30, balance: 15.00, status: "Activa", iccid: "895804...4567", ip: "10.42.0.1" },
    { id: "line-2", number: "0412-1234567", label: "Área Datos / TPV", plan: "Enterprise 100GB", used: 28.1, total: 100, balance: 45.50, status: "Activa", iccid: "895804...1122", ip: "10.42.0.8" },
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
            title: "SINCRONIZANDO CANAL",
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
        <div className="space-y-8 pb-20 px-4 md:px-10 lg:px-12 animate-in fade-in duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-6 py-2 mt-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-[0.4em] text-primary shadow-glow">
                        <Signal className="h-3 w-3" /> ÁREA DE TELECOMUNICACIONES
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                        <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Mi Línea <span className="text-primary italic">5G</span></h1>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-10 px-4 rounded-xl border-border bg-card/5 text-foreground text-[9px] font-black uppercase tracking-widest shadow-2xl group hover:border-primary/40">
                                    {activeLine.number}
                                    <ChevronDown className="ml-2 h-3 w-3 opacity-40 group-hover:opacity-100 group-hover:rotate-180 transition-all" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 bg-card/95 backdrop-blur-2xl rounded-2xl p-2 shadow-glow border-border">
                                <p className="p-3 text-[7px] font-black uppercase tracking-[0.3em] text-muted-foreground border-b border-border mb-2">Selector de Línea Activa</p>
                                {associatedLines.map(line => (
                                    <DropdownMenuItem 
                                        key={line.id} 
                                        className={cn(
                                            "rounded-xl h-10 text-[9px] font-bold uppercase italic focus:bg-primary/10 flex justify-between items-center px-3",
                                            line.id === activeLine.id && "text-primary bg-primary/5"
                                        )}
                                        onClick={() => handleSwitchLine(line.id)}
                                    >
                                        <div className="flex flex-col">
                                            <span>{line.number}</span>
                                            <span className="text-[6px] opacity-40 not-italic">{line.label}</span>
                                        </div>
                                        {line.id === activeLine.id && <CheckCircle className="h-3 w-3" />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    
                    <p className="text-muted-foreground text-[9px] font-bold uppercase tracking-[0.5em] opacity-40 mt-2 italic">Aprovisionamiento eUICC v2.6.5</p>
                </div>
                
                <Badge variant="outline" className={cn(
                    "h-10 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                    activeLine.status === "Activa" ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-600" : "border-rose-500/20 bg-rose-500/5 text-rose-600"
                )}>
                    <div className={cn("h-1.5 w-1.5 rounded-full mr-2 shadow-glow", activeLine.status === "Activa" ? "bg-emerald-500 animate-pulse" : "bg-rose-500")} />
                    {activeLine.status.toUpperCase()}
                </Badge>
            </header>

            <div className="grid lg:grid-cols-12 gap-8">
                <Card className="lg:col-span-8 glass-card border-none rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                    <AnimatePresence mode="wait">
                        {isSwitching && (
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-50 bg-background/80 backdrop-blur-xl flex flex-col items-center justify-center gap-4"
                            >
                                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                                <div className="text-center space-y-1">
                                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground animate-pulse">Sincronizando Sistema</p>
                                    <p className="text-[7px] font-bold text-primary uppercase tracking-widest">Protocolo OTA Activo</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <CardHeader className="p-8 border-b border-border bg-muted/10 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 shadow-inner">
                                <Activity className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground">Telemetría de Datos</CardTitle>
                                <CardDescription className="text-[9px] font-bold uppercase opacity-40 tracking-widest italic">{activeLine.plan}</CardDescription>
                            </div>
                        </div>
                        <Badge className="bg-muted border-border text-muted-foreground text-[8px] font-black uppercase px-3 h-7 flex items-center gap-2">
                            <Lock className="h-3 w-3 opacity-40" /> SECURE TUNNEL
                        </Badge>
                    </CardHeader>
                    
                    <CardContent className="p-8 space-y-10">
                        <div className="relative flex flex-col items-center justify-center py-12 md:py-16 bg-muted/20 border border-border rounded-[2.5rem] shadow-inner overflow-hidden group/gauge">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/gauge:opacity-10 transition-all duration-1000">
                                <Wifi className="h-48 w-48 rotate-12" />
                            </div>
                            
                            <div className="flex items-baseline gap-4 mb-8 relative z-10">
                                <motion.span 
                                    key={activeLine.used}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-6xl md:text-8xl font-black italic text-foreground tracking-tighter leading-none italic-shadow"
                                >
                                    {activeLine.used}
                                </motion.span>
                                <span className="text-xl font-black text-muted-foreground opacity-20 uppercase tracking-tighter">GB</span>
                            </div>
                            
                            <div className="w-full max-w-lg space-y-4 px-8 relative z-10">
                                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
                                    <span className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> CONSUMIDO</span>
                                    <span>LIMITE: {activeLine.total} GB</span>
                                </div>
                                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden p-0.5 border border-border shadow-inner">
                                    <motion.div 
                                        key={activeLine.id}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(activeLine.used / activeLine.total) * 100}%` }}
                                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                                        className={cn(
                                            "h-full rounded-full shadow-glow transition-colors duration-500",
                                            (activeLine.used / activeLine.total) > 0.9 ? "bg-rose-500" : "bg-primary"
                                        )}
                                    />
                                </div>
                                <div className="flex justify-center gap-8 pt-2">
                                    <div className="text-center">
                                        <p className="text-[7px] font-black text-muted-foreground/40 uppercase mb-1">Restante</p>
                                        <p className="text-lg font-black italic text-primary">{(activeLine.total - activeLine.used).toFixed(1)} GB</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[7px] font-black text-muted-foreground/40 uppercase mb-1">Renovación</p>
                                        <p className="text-lg font-black italic text-foreground">12 DÍAS</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Velocidad Peak", val: "1.4 Gbps", icon: Zap, color: "text-yellow-500" },
                                { label: "Network Slice", val: "ACTIVE", icon: Cpu, color: "text-emerald-500" },
                                { label: "IPv6 Central", val: activeLine.ip, icon: Globe, color: "text-blue-500" },
                                { label: "Cifrado Red", val: "AES-512", icon: Lock, color: "text-primary" }
                            ].map(stat => (
                                <div key={stat.label} className="p-4 bg-muted/10 border border-border rounded-2xl text-center group hover:bg-muted/20 transition-all">
                                    <stat.icon className={cn("h-4 w-4 mx-auto mb-3 opacity-40 group-hover:opacity-100 transition-all", stat.color)} />
                                    <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1 tracking-widest">{stat.label}</p>
                                    <p className="text-[10px] font-black text-foreground italic tracking-tight uppercase">{stat.val}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-4 space-y-8">
                    <Card className="bg-primary text-primary-foreground rounded-[2.5rem] p-8 relative overflow-hidden shadow-glow group border-none">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                            <Wallet className="h-32 w-32" />
                        </div>
                        <div className="relative z-10 space-y-8">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-3.5 w-3.5 opacity-60" />
                                    <h3 className="text-[9px] font-black uppercase tracking-[0.4em] opacity-60">Saldo Certificado</h3>
                                </div>
                                <motion.p 
                                    key={activeLine.balance}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-5xl font-black italic tracking-tighter leading-none shadow-glow-text"
                                >
                                    {formatCurrency(activeLine.balance, 'USD')}
                                </motion.p>
                            </div>
                            
                            <button 
                                className="w-full h-12 rounded-xl bg-white text-primary hover:bg-slate-100 font-black uppercase text-[10px] tracking-widest shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3"
                                onClick={handleRecharge}
                                disabled={isRecharging}
                            >
                                {isRecharging ? <Loader2 className="animate-spin h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
                                RECARGAR SALDO
                            </button>
                        </div>
                    </Card>

                    <Card className="glass-card border-none bg-card/40 rounded-[2.5rem] p-8 shadow-2xl">
                        <CardHeader className="p-0 mb-6 border-b border-border pb-4">
                            <CardTitle className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground/40 italic flex items-center gap-3">
                                <Network className="h-4 w-4 text-primary" /> Líneas Vinculadas
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-3">
                            {associatedLines.map((line) => (
                                <button
                                    key={line.id}
                                    onClick={() => handleSwitchLine(line.id)}
                                    disabled={line.id === activeLine.id || isSwitching}
                                    className={cn(
                                        "w-full group p-4 rounded-xl border transition-all text-left flex items-center justify-between relative overflow-hidden",
                                        line.id === activeLine.id 
                                            ? "bg-primary/10 border-primary/40 cursor-default shadow-inner" 
                                            : "bg-muted/20 border-border hover:border-primary/30 hover:bg-primary/5 cursor-pointer"
                                    )}
                                >
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-black italic text-foreground group-hover:text-primary transition-colors">{line.number}</p>
                                        <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">{line.label}</p>
                                    </div>
                                    <div className={cn(
                                        "h-1.5 w-1.5 rounded-full shadow-glow-sm",
                                        line.status === "Activa" ? "bg-emerald-500" : "bg-rose-500"
                                    )} />
                                </button>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-none bg-card/40 rounded-[2.5rem] p-8">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 italic flex items-center gap-3">
                                <History className="h-4 w-4 opacity-40" /> Actividad Reciente
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            {[
                                { date: "15 MAR", desc: "Recarga Portal", amount: 15.00, type: "plus" },
                                { date: "14 MAR", desc: "Plan Mensual", amount: -25.00, type: "minus" },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest group">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("h-1 w-1 rounded-full", item.type === 'plus' ? "bg-emerald-500" : "bg-rose-500")} />
                                        <span className="text-muted-foreground/60 group-hover:text-foreground transition-colors">{item.date} • {item.desc}</span>
                                    </div>
                                    <span className={cn(
                                        "italic font-black text-[10px]",
                                        item.type === 'plus' ? "text-emerald-600" : "text-foreground/60"
                                    )}>{item.type === 'plus' ? '+' : ''}{formatCurrency(item.amount, 'USD')}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <footer className="mt-16 pt-8 border-t border-border flex flex-col items-center gap-4 opacity-40 text-center">
                <Logo className="h-10 w-10 grayscale" />
                <p className="text-[9px] font-black uppercase tracking-[0.8em] text-foreground italic">KYRON TELECOM INFRASTRUCTURE • 2026</p>
            </footer>
        </div>
    );
}