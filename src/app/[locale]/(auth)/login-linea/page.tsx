
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Smartphone, Signal, ChevronLeft, CheckCircle2, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link } from "@/navigation";
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function LoginLineaConsolidadoPage() {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const router = useRouter();
    const { toast } = useToast();

    const handleAuth = async (event: React.FormEvent<HTMLFormElement>, type: 'personal' | 'empresa') => {
        event.preventDefault();
        setIsLoading(type);

        const formData = new FormData(event.currentTarget);
        const email = (formData.get('email') as string || "").trim().toLowerCase();
        const password = (formData.get('password') as string || "").trim();

        const creds = {
            personal: { user: "carlos@kyron.com", pass: "password123", path: "/mi-linea" },
            empresa: { user: "telecom.admin@kyron.com", pass: "admin123", path: "/flota-empresarial" }
        };

        const target = creds[type];

        setTimeout(() => {
            if (email === target.user && password === target.pass) {
                toast({
                    title: "ACCESO CONCEDIDO",
                    description: `Enlace establecido con el canal ${type.toUpperCase()}.`,
                    action: <CheckCircle2 className="text-emerald-500 h-4 w-4" />
                });
                router.push(target.path as any);
            } else {
                toast({
                    variant: "destructive",
                    title: "ERROR DE AUTENTICACIÓN",
                    description: "CREDENCIALES NO VÁLIDAS PARA ESTE CANAL."
                });
                setIsLoading(null);
            }
        }, 800);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 py-20 bg-background w-full hud-grid relative">
            <Button variant="ghost" asChild className="mb-12 self-start md:absolute md:top-8 md:left-8 h-10 rounded-xl text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary">
                <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4"/> Volver</Link>
            </Button>

            <motion.div 
                className="w-full max-w-2xl space-y-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="text-center space-y-3">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-foreground italic-shadow">Mi Línea <span className="text-primary">5G</span></h1>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.6em] opacity-40">Portal de Conectividad Ciudadana y Corporativa</p>
                </div>

                {/* --- OPCIÓN PERSONAL (ARRIBITA) --- */}
                <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl relative group">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                        <Smartphone className="h-32 w-32" />
                    </div>
                    <CardHeader className="p-10 border-b border-border/50 flex flex-row items-center justify-between bg-muted/10">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                                <Smartphone className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground">Canal Personal</CardTitle>
                                <CardDescription className="text-[9px] font-bold uppercase text-primary tracking-widest">Gestión Individual de Línea y Datos</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-10">
                        <form onSubmit={(e) => handleAuth(e, 'personal')} className="grid md:grid-cols-2 gap-8 items-end">
                            <div className="space-y-6">
                                <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl">
                                    <p className="text-[8px] font-black text-primary uppercase tracking-widest mb-2 italic">Acceso Común:</p>
                                    <p className="text-[9px] font-bold text-foreground/60 uppercase">User: <span className="text-foreground font-black">carlos@kyron.com</span></p>
                                    <p className="text-[9px] font-bold text-foreground/60 uppercase">Pass: <span className="text-foreground font-black">password123</span></p>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-1">Email</Label>
                                    <Input name="email" placeholder="carlos@kyron.com" required className="h-12 bg-white/5 border-border rounded-xl font-bold uppercase text-xs" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-1">Contraseña</Label>
                                    <Input name="password" type="password" placeholder="••••••••" required className="h-12 bg-white/5 border-border rounded-xl font-bold" />
                                </div>
                                <Button type="submit" className="w-full h-12 rounded-xl btn-3d-primary font-black uppercase text-[10px] tracking-widest shadow-xl" disabled={!!isLoading}>
                                    {isLoading === 'personal' ? <Loader2 className="animate-spin h-4 w-4" /> : "ACCEDER PERSONAL"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* --- OPCIÓN CORPORATIVA (ABAJO) --- */}
                <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl relative group border-l-4 border-secondary">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                        <Signal className="h-32 w-32" />
                    </div>
                    <CardHeader className="p-10 border-b border-border/50 bg-muted/10 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
                                <Signal className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground">Canal Corporativo</CardTitle>
                                <CardDescription className="text-[9px] font-bold uppercase text-secondary tracking-widest">Control Maestro de Flota Empresarial</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-10">
                        <form onSubmit={(e) => handleAuth(e, 'empresa')} className="grid md:grid-cols-2 gap-8 items-end">
                            <div className="space-y-6">
                                <div className="p-4 bg-secondary/5 border border-secondary/10 rounded-2xl">
                                    <p className="text-[8px] font-black text-secondary uppercase tracking-widest mb-2 italic">Acceso Común:</p>
                                    <p className="text-[9px] font-bold text-foreground/60 uppercase">User: <span className="text-foreground font-black">telecom.admin@kyron.com</span></p>
                                    <p className="text-[9px] font-bold text-foreground/60 uppercase">Pass: <span className="text-foreground font-black">admin123</span></p>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-1">Email</Label>
                                    <Input name="email" placeholder="telecom.admin@kyron.com" required className="h-12 bg-white/5 border-border rounded-xl font-bold uppercase text-xs" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-1">Contraseña</Label>
                                    <Input name="password" type="password" placeholder="••••••••" required className="h-12 bg-white/5 border-border rounded-xl font-bold" />
                                </div>
                                <Button type="submit" className="w-full h-12 rounded-xl btn-3d-secondary font-black uppercase text-[10px] tracking-widest shadow-xl" disabled={!!isLoading}>
                                    {isLoading === 'empresa' ? <Loader2 className="animate-spin h-4 w-4" /> : "ACCEDER CORPORATIVO"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
            
            <p className="mt-16 text-[8px] font-black text-muted-foreground/30 uppercase tracking-[0.8em] italic">SYSTEM KYRON TELECOM • PROTOCOLO DE AUTORIDAD V2.6.5</p>
        </div>
    );
}
