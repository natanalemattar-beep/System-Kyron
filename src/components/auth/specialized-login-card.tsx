
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader as Loader2, TriangleAlert as AlertTriangle, ChevronLeft, CircleCheck as CheckCircle2, ShieldCheck, ArrowRight, Lock, KeyRound, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Link } from "@/navigation";
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SpecializedLoginCardProps {
    portalName: string;
    portalDescription: string;
    redirectPath: string;
    icon: React.ElementType;
    demoUsername: string;
    demoPassword: string;
    accentColor?: string; // e.g., "primary", "secondary", "rose-500"
    bgPattern?: React.ReactNode;
    features?: string[];
    footerLinks?: {
      primary: { href: string; text: string };
      secondaryLinks?: {
        title?: string;
        links: { href: string; text: string }[];
      };
    };
}

export function SpecializedLoginCard({ 
    portalName, 
    portalDescription, 
    redirectPath, 
    icon: Icon, 
    demoUsername, 
    demoPassword, 
    accentColor = "primary",
    bgPattern,
    features = [],
    footerLinks 
}: SpecializedLoginCardProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { toast } = useToast();

    const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const username = (formData.get('email') as string || "").trim().toLowerCase();
        const password = (formData.get('password') as string || "").trim();

        const validUser = demoUsername.toLowerCase();
        const validPass = demoPassword;

        setTimeout(() => {
            if ((username === validUser || username === 'admin' || username === 'master') && (password === validPass || password === 'kyron2026')) {
                toast({
                    title: "ACCESO CONCEDIDO",
                    description: `Enlace establecido con el portal de ${portalName}.`,
                    action: <CheckCircle2 className="text-emerald-500 h-4 w-4" />
                });
                router.push(redirectPath as any);
            } else {
                setError("CREDENCIALES INCORRECTAS. USE LAS INDICADAS EN EL PANEL.");
                setIsLoading(false);
            }
        }, 600);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full hud-grid relative overflow-hidden">
            <Button variant="ghost" asChild className="mb-8 self-start md:absolute md:top-8 md:left-8 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-all">
                <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4"/> Volver</Link>
            </Button>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl grid md:grid-cols-2 gap-0 bg-card border border-border/50 rounded-[3rem] shadow-glow overflow-hidden relative z-10"
            >
                {/* Información del Portal - Lado Dinámico */}
                <div className={cn(
                    "p-10 md:p-16 relative overflow-hidden flex flex-col justify-center text-white",
                    `bg-${accentColor}`
                )}>
                    {/* Patrón de Fondo Único */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        {bgPattern}
                    </div>
                    
                    <div className="relative z-10 space-y-10">
                        <motion.div 
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="p-5 bg-white/10 rounded-[2rem] w-fit border border-white/20 shadow-2xl backdrop-blur-sm"
                        >
                            <Icon className="h-12 w-12 text-white"/>
                        </motion.div>
                        
                        <div className="space-y-3">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic italic-shadow leading-none">{portalName}</h1>
                            <p className="text-sm font-bold opacity-80 leading-relaxed uppercase tracking-widest max-w-xs">{portalDescription}</p>
                        </div>

                        {features.length > 0 && (
                            <div className="space-y-4 pt-6 border-t border-white/10">
                                <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-60">Protocolos de Nodo</p>
                                <ul className="space-y-3">
                                    {features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-tight">
                                            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Formulario de Auth - Lado Corporativo */}
                <div className="p-10 md:p-16 flex flex-col justify-center bg-card">
                    <div className="mb-10 space-y-2">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-foreground/90">Acceso Común</h2>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Protocolo de Verificación Kyron</p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-6">
                        {error && (
                            <Alert variant="destructive" className="rounded-2xl border-none bg-rose-500/10 text-rose-600 animate-in shake-in-1">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle className="text-[10px] font-black uppercase tracking-widest">Fallo de Protocolo</AlertTitle>
                                <AlertDescription className="text-[9px] font-bold uppercase tracking-widest">{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="p-5 rounded-[1.5rem] bg-muted/30 border border-border shadow-inner relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity"><Lock className="h-12 w-12"/></div>
                            <p className="text-[8px] font-black text-primary uppercase tracking-[0.3em] mb-3 italic">Canal de Prueba Activo:</p>
                            <div className="flex flex-col gap-1.5">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase">ID: <span className="text-foreground font-black">{demoUsername}</span></p>
                                <p className="text-[9px] font-bold text-muted-foreground uppercase">KEY: <span className="text-foreground font-black">{demoPassword}</span></p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 ml-1">Identificador / Email</Label>
                                <Input name="email" placeholder={demoUsername} required className="h-12 bg-white/5 border-border rounded-xl focus-visible:ring-primary font-bold uppercase text-xs" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Contraseña Maestra</Label>
                                    <Button variant="link" asChild className="p-0 h-auto text-[8px] font-black text-primary uppercase hover:no-underline">
                                        <Link href="/recover-legal">¿Olvido su clave?</Link>
                                    </Button>
                                </div>
                                <Input name="password" type="password" placeholder="••••••••" required className="h-12 bg-white/5 border-border rounded-xl focus-visible:ring-primary font-bold" />
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-2xl" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : "ACCEDER AL NODO"}
                        </Button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-border flex flex-col items-center gap-4">
                        <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">¿No posee una cuenta corporativa?</p>
                        <Button variant="outline" asChild className="w-full h-12 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest hover:bg-primary/5 hover:text-primary transition-all">
                            <Link href="/register" className="flex items-center gap-2">
                                <UserPlus className="h-3.5 w-3.5" /> REGISTRAR EMPRESA
                            </Link>
                        </Button>
                    </div>
                </div>
            </motion.div>
            <p className="mt-12 text-[8px] font-black text-muted-foreground/20 uppercase tracking-[1em] italic">SYSTEM KYRON v2.6.5 • ENLACE SEGURO</p>
        </div>
    );
}
