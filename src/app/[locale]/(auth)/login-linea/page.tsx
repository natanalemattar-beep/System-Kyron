
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle, ChevronLeft, Smartphone, CheckCircle2, ShieldCheck, ArrowRight, Radio, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link } from "@/navigation";
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

const mockLines = [
    { id: "line-1", number: "0414-9377068", label: "Línea Principal", plan: "Infinite 5G", status: "Activa" },
    { id: "line-2", number: "0412-1234567", label: "Tablet / Datos", plan: "Global 40GB", status: "Activa" },
    { id: "line-3", number: "0424-5558899", label: "Corporativa", plan: "Conecta 10GB", status: "Suspendida" },
];

export default function LoginLineaPage() {
    const [step, setStep] = useState(1); // 1: Identification, 2: Selection
    const [isLoading, setIsLoading] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { toast } = useToast();

    const handleIdentify = (e: React.FormEvent) => {
        e.preventDefault();
        if (!identifier.trim()) return;
        
        setIsLoading(true);
        setError(null);

        // Simulación de búsqueda de líneas vinculadas
        setTimeout(() => {
            if (identifier.includes("@") || identifier.length >= 7) {
                setStep(2);
                setIsLoading(false);
            } else {
                setError("No se encontraron servicios asociados a este identificador.");
                setIsLoading(false);
            }
        }, 800);
    };

    const handleSelectLine = (lineId: string) => {
        setIsLoading(true);
        toast({
            title: "ESTABLECIENDO ENLACE",
            description: "Sincronizando telemetría del servicio...",
        });
        
        setTimeout(() => {
            router.push('/mi-linea');
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#050505] hud-grid">
            <Button variant="ghost" asChild className="mb-8 self-start md:absolute md:top-8 md:left-8 h-10 rounded-xl text-xs font-black uppercase text-white/40 hover:text-white">
                <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4"/> VOLVER</Link>
            </Button>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl grid md:grid-cols-2 gap-0 bg-white dark:bg-card border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
                {/* Lateral de Marca */}
                <div className="p-10 bg-primary text-primary-foreground relative overflow-hidden flex flex-col justify-center hidden md:flex">
                    <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                        <Smartphone className="h-64 w-64" />
                    </div>
                    
                    <div className="relative z-10 space-y-8">
                        <div className="p-4 bg-white/10 rounded-3xl w-fit border border-white/10 shadow-inner">
                            <Radio className="h-10 w-10 text-white animate-pulse"/>
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-4xl font-black tracking-tighter uppercase italic">MI LÍNEA 5G</h1>
                            <p className="text-sm font-bold opacity-80 leading-relaxed uppercase tracking-widest">Gestione su conectividad y consumo de datos bajo protocolo de alta fidelidad.</p>
                        </div>

                        <div className="space-y-4 pt-8 border-t border-white/10">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Seguridad Activa</p>
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                <ShieldCheck className="h-6 w-6 text-secondary" />
                                <p className="text-[10px] font-bold uppercase tracking-widest leading-snug">Conexión cifrada de extremo a extremo para todas sus gestiones.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Área de Autenticación */}
                <div className="p-8 md:p-12 flex flex-col justify-center bg-card/80 backdrop-blur-3xl">
                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-black uppercase italic tracking-tight text-white italic-shadow">Identificación</h2>
                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Ingrese su correo o número maestro</p>
                                </div>

                                <form onSubmit={handleIdentify} className="space-y-6">
                                    {error && (
                                        <Alert variant="destructive" className="rounded-2xl bg-rose-500/10 border-rose-500/20">
                                            <AlertTriangle className="h-4 w-4" />
                                            <AlertDescription className="text-[10px] font-black uppercase tracking-widest">{error}</AlertDescription>
                                        </Alert>
                                    )}

                                    <div className="space-y-3">
                                        <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">Identificador de Usuario</Label>
                                        <div className="relative">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                                            <Input 
                                                value={identifier}
                                                onChange={(e) => setIdentifier(e.target.value)}
                                                placeholder="ejemplo@kyron.com" 
                                                required 
                                                className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 text-sm font-bold focus-visible:ring-primary text-white" 
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full h-16 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-2xl" disabled={isLoading}>
                                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'LOCALIZAR SERVICIOS'}
                                    </Button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-black uppercase italic tracking-tight text-white italic-shadow">Elegir Servicio</h2>
                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest italic">Vinculado a: {identifier}</p>
                                </div>

                                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                    {mockLines.map((line) => (
                                        <button
                                            key={line.id}
                                            onClick={() => handleSelectLine(line.id)}
                                            className="w-full group p-5 rounded-[1.5rem] bg-white/[0.03] border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all text-left flex items-center justify-between"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-black italic text-white/90 group-hover:text-primary transition-colors">{line.number}</span>
                                                    <Badge variant="outline" className={cn(
                                                        "text-[7px] font-black uppercase px-2 h-5",
                                                        line.status === "Activa" ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/5" : "border-rose-500/20 text-rose-400 bg-rose-500/5"
                                                    )}>{line.status}</Badge>
                                                </div>
                                                <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{line.label} • {line.plan}</p>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-white/10 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                        </button>
                                    ))}
                                </div>

                                <Button 
                                    variant="ghost" 
                                    onClick={() => setStep(1)} 
                                    className="w-full h-12 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-white"
                                >
                                    CAMBIAR IDENTIFICADOR
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
            <p className="mt-10 text-[8px] font-black text-white/10 uppercase tracking-[0.6em]">System Kyron v2.6.5 • Network Access Node</p>
        </div>
    );
}
