
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle, User, ChevronLeft, Fingerprint, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link } from "@/navigation";
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
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
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const DEMO_EMAIL = "usuario@kyron.com";
        const DEMO_PASS = "password123";
        
        setTimeout(() => {
            if (email === DEMO_EMAIL && password === DEMO_PASS) {
                toast({ title: "¡Bienvenido, Carlos!", description: "Acceso concedido a tu cuenta personal." });
                router.push('/dashboard');
            } else {
                setError("Correo o contraseña incorrectos. Utilice las credenciales de demo.");
                setIsLoading(false);
            }
        }, 800);
    };

    const handleBiometric = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            toast({ 
                title: "✅ Identidad Confirmada", 
                description: "Acceso biométrico exitoso. Bienvenido, Carlos." 
            });
            router.push('/dashboard');
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#020202] hud-grid">
            <Button variant="ghost" asChild className="mb-6 self-start md:absolute md:top-8 md:left-8 h-10 rounded-xl text-xs font-black uppercase text-white/40 hover:text-white">
                <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4"/> VOLVER</Link>
            </Button>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg"
            >
                <Card className="bg-white/[0.02] backdrop-blur-3xl border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                    
                    <CardHeader className="text-center p-10 pb-4">
                        <div className="mx-auto bg-primary/10 p-5 rounded-[1.5rem] w-fit mb-6 shadow-glow border border-primary/20">
                            <User className="h-10 w-10 text-primary"/>
                        </div>
                        <CardTitle className="text-3xl font-black tracking-tighter uppercase italic text-white">Mi Cuenta Personal</CardTitle>
                        <CardDescription className="text-sm font-bold text-white/30 uppercase tracking-widest mt-2 leading-snug">
                            Bóveda de Identidad y Trámites Civiles
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-10 pt-4 space-y-8">
                        {/* Demo Alert */}
                        <Alert className="bg-primary/10 border-primary/20 text-primary rounded-2xl">
                            <ShieldCheck className="h-4 w-4" />
                            <AlertTitle className="text-[10px] font-black uppercase tracking-widest">Modo Demostración</AlertTitle>
                            <AlertDescription className="text-[9px] font-bold uppercase mt-1">
                                <p>Email: <span className="text-white">usuario@kyron.com</span></p>
                                <p>Clave: <span className="text-white">password123</span></p>
                            </AlertDescription>
                        </Alert>

                        <form onSubmit={handleLogin} className="space-y-6">
                            {error && (
                                <Alert variant="destructive" className="rounded-2xl bg-rose-500/10 border-rose-500/20">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle className="text-xs font-black uppercase tracking-widest">Error de Acceso</AlertTitle>
                                    <AlertDescription className="text-[10px] uppercase font-bold opacity-70">{error}</AlertDescription>
                                </Alert>
                            )}
                            
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">Correo Electrónico</Label>
                                <Input id="email" name="email" type="email" placeholder="usuario@kyron.com" required className="h-12 text-sm px-5 rounded-xl bg-white/[0.03] border-white/10 text-white focus-visible:ring-primary font-medium" />
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password" className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">Contraseña</Label>
                                    <Button variant="link" className="p-0 h-auto text-[9px] font-black text-primary uppercase">¿La olvidaste?</Button>
                                </div>
                                <Input id="password" name="password" type="password" placeholder="••••••••" required className="h-12 text-sm px-5 rounded-xl bg-white/[0.03] border-white/10 text-white focus-visible:ring-primary font-medium" />
                            </div>

                            <Button type="submit" className="w-full text-xs font-black h-14 rounded-2xl shadow-glow btn-3d-primary uppercase tracking-widest" disabled={isLoading || isScanning}>
                                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'ACCEDER AL PORTAL'}
                            </Button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
                            <div className="relative flex justify-center text-[8px] uppercase font-black tracking-[0.4em] text-white/20">
                                <span className="bg-black px-4">O accede con tu cuerpo</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            <button 
                                onClick={handleBiometric}
                                disabled={isScanning || isLoading}
                                className={cn(
                                    "p-8 rounded-[2rem] border-2 transition-all duration-500 group relative overflow-hidden",
                                    isScanning ? "border-secondary bg-secondary/10 shadow-glow-secondary" : "border-white/5 bg-white/[0.02] hover:border-primary/30 hover:bg-primary/5"
                                )}
                            >
                                <Fingerprint className={cn(
                                    "h-16 w-16 transition-all duration-500",
                                    isScanning ? "text-secondary scale-110" : "text-white/20 group-hover:text-primary"
                                )} />
                                {isScanning && (
                                    <motion.div 
                                        className="absolute inset-0 bg-secondary/20"
                                        initial={{ top: "-100%" }}
                                        animate={{ top: "100%" }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                )}
                            </button>
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest text-center">
                                {isScanning ? "VERIFICANDO BIOMETRÍA..." : "Toca para iniciar escaneo facial/huella"}
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter className="p-10 pt-0 border-t border-white/5 bg-white/[0.01] flex flex-col items-center">
                        <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-4">¿No tienes una cuenta personal?</p>
                        <Button variant="outline" asChild className="w-full h-12 rounded-xl border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-widest hover:bg-white/10">
                            <Link href="/register">REGISTRARSE AHORA</Link>
                        </Button>
                        <p className="mt-8 text-[8px] text-white/10 uppercase font-black tracking-[0.5em]">System Kyron v2.6.5 • SSL Secure Connection</p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
