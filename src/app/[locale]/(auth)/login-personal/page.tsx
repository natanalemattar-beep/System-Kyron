
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle, User, ChevronLeft, Fingerprint, ShieldCheck, KeyRound, UserPlus, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link } from "@/navigation";
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

export default function LoginPersonalPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const email = (formData.get('email') as string || "").trim().toLowerCase();
        const password = (formData.get('password') as string || "").trim();

        const DEMO_EMAIL = "usuario@kyron.com";
        const DEMO_PASS = "password123";
        
        setTimeout(() => {
            if (email === DEMO_EMAIL && password === DEMO_PASS) {
                toast({ title: "ACCESO CONCEDIDO", description: "Bienvenido a su terminal personal, Carlos." });
                router.push('/dashboard');
            } else {
                setError("Correo o contraseña incorrectos. Utilice las credenciales del panel.");
                setIsLoading(false);
            }
        }, 800);
    };

    const handleBiometric = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            toast({ 
                title: "ID CONFIRMADA", 
                description: "Acceso biométrico exitoso. Sincronizando Bóveda Civil." 
            });
            router.push('/dashboard');
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background w-full hud-grid relative overflow-hidden">
            <Button variant="ghost" asChild className="mb-8 self-start md:absolute md:top-8 md:left-8 h-10 rounded-xl text-[10px] font-black uppercase text-muted-foreground hover:text-primary transition-all">
                <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4"/> Volver</Link>
            </Button>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl grid md:grid-cols-2 gap-0 bg-card border border-border/50 rounded-[3rem] shadow-glow overflow-hidden relative z-10"
            >
                {/* Lado Visual: Identidad Ciudadana */}
                <div className="p-10 md:p-16 relative overflow-hidden flex flex-col justify-center bg-primary text-white">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="grid grid-cols-3 gap-10 p-10">
                            {Array.from({ length: 9 }).map((_, i) => (
                                <User key={i} className="h-20 w-20" />
                            ))}
                        </div>
                    </div>
                    
                    <div className="relative z-10 space-y-10">
                        <div className="p-5 bg-white/10 rounded-[2rem] w-fit border border-white/20 shadow-2xl backdrop-blur-sm">
                            <Fingerprint className="h-12 w-12 text-white animate-pulse"/>
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic italic-shadow leading-none">Mi Cuenta <br/> Personal</h1>
                            <p className="text-sm font-bold opacity-80 leading-relaxed uppercase tracking-widest">Bóveda de Identidad y Trámites Civiles</p>
                        </div>
                        <div className="space-y-4 pt-6 border-t border-white/10">
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-60">Protocolos Ciudadanos</p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-[10px] font-black uppercase tracking-tight"><ShieldCheck className="h-4 w-4 text-emerald-400" /> ID Digital Unificada</li>
                                <li className="flex items-center gap-3 text-[10px] font-black uppercase tracking-tight"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Resguardo Inmutable</li>
                                <li className="flex items-center gap-3 text-[10px] font-black uppercase tracking-tight"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Acceso Biométrico 3D</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Lado Formulario */}
                <div className="p-10 md:p-16 flex flex-col justify-center bg-card">
                    <div className="mb-10 space-y-2">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-foreground/90">Iniciar Sesión</h2>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Acceso Común Ciudadano</p>
                    </div>

                    <div className="p-5 rounded-[1.5rem] bg-primary/5 border border-primary/10 mb-8">
                        <p className="text-[8px] font-black text-primary uppercase tracking-[0.3em] mb-3 italic">Credenciales Registradas:</p>
                        <div className="flex flex-col gap-1.5">
                            <p className="text-[9px] font-bold text-muted-foreground uppercase">Email: <span className="text-foreground font-black">usuario@kyron.com</span></p>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase">Clave: <span className="text-foreground font-black">password123</span></p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <Alert variant="destructive" className="rounded-2xl border-none bg-rose-500/10 text-rose-600">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle className="text-xs font-black uppercase">Fallo de Acceso</AlertTitle>
                                <AlertDescription className="text-[10px] uppercase font-bold opacity-70">{error}</AlertDescription>
                            </Alert>
                        )}
                        
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 ml-1">Correo Electrónico</Label>
                            <Input name="email" type="email" placeholder="usuario@kyron.com" required className="h-12 bg-white/5 border-border rounded-xl font-bold uppercase text-xs" />
                        </div>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Contraseña</Label>
                                <Button variant="link" asChild className="p-0 h-auto text-[8px] font-black text-primary uppercase hover:no-underline">
                                    <Link href="#">¿Olvidó su clave?</Link>
                                </Button>
                            </div>
                            <Input name="password" type="password" placeholder="••••••••" required className="h-12 bg-white/5 border-border rounded-xl font-bold" />
                        </div>

                        <Button type="submit" className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-2xl" disabled={isLoading || isScanning}>
                            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'ENTRAR AL PORTAL'}
                        </Button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-border flex flex-col items-center gap-6">
                        <button 
                            onClick={handleBiometric}
                            disabled={isScanning || isLoading}
                            className={cn(
                                "flex items-center gap-4 px-6 py-3 rounded-xl border-2 transition-all duration-500 group relative overflow-hidden w-full justify-center",
                                isScanning ? "border-emerald-500 bg-emerald-500/10 shadow-glow-secondary" : "border-border bg-white/5 hover:border-primary/30"
                            )}
                        >
                            {isScanning ? <Loader2 className="h-4 w-4 animate-spin text-emerald-500" /> : <Fingerprint className="h-4 w-4 text-primary" />}
                            <span className="text-[9px] font-black uppercase tracking-widest">
                                {isScanning ? "Escaneando..." : "Acceder con Biometría"}
                            </span>
                        </button>
                        
                        <p className="text-[10px] text-muted-foreground/40 uppercase font-bold tracking-widest">¿No posee cuenta personal?</p>
                        <Button variant="outline" asChild className="w-full h-12 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest hover:bg-primary/5 hover:text-primary transition-all">
                            <Link href="/register" className="flex items-center gap-2">
                                <UserPlus className="h-3.5 w-3.5" /> REGISTRARSE AHORA
                            </Link>
                        </Button>
                    </div>
                </div>
            </motion.div>
            <p className="mt-12 text-[8px] font-black text-muted-foreground/20 uppercase tracking-[1em] italic">SYSTEM KYRON • CIUDADANÍA DIGITAL 2026</p>
        </div>
    );
}
