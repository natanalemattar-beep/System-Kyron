
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Smartphone, Signal, ChevronLeft, CheckCircle2, ShieldCheck, ArrowRight, Lock, User, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link } from "@/navigation";
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginLineaConsolidadoPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<string>("personal");
    const router = useRouter();
    const { toast } = useToast();

    const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const email = (formData.get('email') as string || "").trim().toLowerCase();
        const password = (formData.get('password') as string || "").trim();

        const creds = {
            personal: { user: "carlos@kyron.com", pass: "password123", path: "/mi-linea" },
            corporativo: { user: "telecom.admin@kyron.com", pass: "admin123", path: "/flota-empresarial" }
        };

        const target = creds[activeTab as keyof typeof creds];

        setTimeout(() => {
            if (email === target.user && password === target.pass) {
                toast({
                    title: "ACCESO CONCEDIDO",
                    description: `Enlace establecido con el canal ${activeTab.toUpperCase()}.`,
                    action: <CheckCircle2 className="text-emerald-500 h-4 w-4" />
                });
                router.push(target.path as any);
            } else {
                toast({
                    variant: "destructive",
                    title: "ERROR DE AUTENTICACIÓN",
                    description: "CREDENCIALES NO VÁLIDAS PARA ESTE CANAL."
                });
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 py-20 bg-background w-full hud-grid relative">
            <Button variant="ghost" asChild className="mb-12 self-start md:absolute md:top-8 md:left-8 h-10 rounded-xl text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary">
                <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4"/> Volver</Link>
            </Button>

            <motion.div 
                className="w-full max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="text-center space-y-3 mb-10">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-foreground italic-shadow leading-none">Mi Línea <span className="text-primary">5G</span></h1>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.6em] opacity-40">Portal de Conectividad Ciudadana y Corporativa</p>
                </div>

                <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl relative group">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                        {activeTab === 'personal' ? <Smartphone className="h-32 w-32" /> : <Signal className="h-32 w-32" />}
                    </div>
                    
                    <CardHeader className="p-0 border-b border-border/50 bg-muted/10">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="flex h-20 bg-transparent rounded-none p-0 border-none">
                                <TabsTrigger 
                                    value="personal" 
                                    className="flex-1 rounded-none h-full font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all gap-3"
                                >
                                    <User className="h-4 w-4" /> Personal
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="corporativo" 
                                    className="flex-1 rounded-none h-full font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-secondary data-[state=active]:text-white transition-all gap-3"
                                >
                                    <Building2 className="h-4 w-4" /> Corporativo
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </CardHeader>

                    <CardContent className="p-8 md:p-12 space-y-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: activeTab === 'personal' ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: activeTab === 'personal' ? 20 : -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                <Alert className={cn(
                                    "border-none rounded-2xl p-6",
                                    activeTab === 'personal' ? "bg-primary/5 text-primary" : "bg-secondary/5 text-secondary"
                                )}>
                                    <ShieldCheck className="h-5 w-5" />
                                    <AlertTitle className="text-[10px] font-black uppercase tracking-widest mb-2">Acceso Común: Canal {activeTab.toUpperCase()}</AlertTitle>
                                    <AlertDescription className="text-[9px] font-bold uppercase tracking-widest opacity-80">
                                        <div className="flex flex-col gap-1">
                                            <p>User: <span className="font-black text-foreground">{activeTab === 'personal' ? 'carlos@kyron.com' : 'telecom.admin@kyron.com'}</span></p>
                                            <p>Pass: <span className="font-black text-foreground">{activeTab === 'personal' ? 'password123' : 'admin123'}</span></p>
                                        </div>
                                    </AlertDescription>
                                </Alert>

                                <form onSubmit={handleAuth} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 ml-1">Correo Electrónico</Label>
                                        <Input name="email" placeholder="usuario@kyron.com" required className="h-12 bg-white/5 border-border rounded-xl font-bold uppercase text-xs text-foreground" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 ml-1">Contraseña</Label>
                                        <Input name="password" type="password" placeholder="••••••••" required className="h-12 bg-white/5 border-border rounded-xl font-bold text-foreground" />
                                    </div>

                                    <Button 
                                        type="submit" 
                                        className={cn(
                                            "w-full h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl transition-all",
                                            activeTab === 'personal' ? "btn-3d-primary" : "btn-3d-secondary"
                                        )} 
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : `ACCEDER COMO ${activeTab.toUpperCase()}`}
                                    </Button>
                                </form>
                            </motion.div>
                        </AnimatePresence>
                    </CardContent>
                    
                    <CardFooter className="p-8 pt-0 flex justify-center opacity-20">
                        <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-[0.4em]">
                            <Lock className="h-3 w-3" /> Secure Gateway Active
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
            
            <p className="mt-12 text-[8px] font-black text-muted-foreground/20 uppercase tracking-[0.8em] italic">SYSTEM KYRON TELECOM • PROTOCOLO DE AUTORIDAD V2.6.5</p>
        </div>
    );
}
