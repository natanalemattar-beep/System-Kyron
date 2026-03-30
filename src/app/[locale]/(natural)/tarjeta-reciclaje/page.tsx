
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gift, Zap, Coffee, Ticket, Recycle, TrendingUp, Handshake, CircleCheck as CheckCircle, Magnet } from "lucide-react";
import { motion } from "framer-motion";

const howItWorks = [
    { step: 1, title: "Ubica una Papelera Inteligente", description: "Encuentra uno de nuestros puntos de recolección afiliados en centros comerciales o plazas públicas." },
    { step: 2, title: "Identifícate con tu Tarjeta", description: "Acerca tu Tarjeta de Reciclaje o escanea el código QR desde tu app para sincronizar tu cuenta." },
    { step: 3, title: "Tecnología de Magnetismo", description: "Nuestras papeleras utilizan un sistema de magnetismo avanzado para la sujeción y clasificación de envases metálicos y plásticos." },
    { step: 4, title: "Acumula Eco-Créditos", description: "Por cada envase validado por los sensores de IA, recibirás puntos directamente en tu billetera digital." },
    { step: 5, title: "Canjea Recompensas", description: "Usa tus puntos en la red de comercios aliados para obtener descuentos, productos y beneficios exclusivos." },
];

const rewards = [
    { icon: Coffee, title: "Bebida de Cortesía", partner: "Cafetería La Esquina" },
    { icon: Ticket, title: "50% Dto. en Cines", partner: "Cines de la Ciudad" },
    { icon: Gift, title: "Cupón de Regalo", partner: "Tienda Kyron" },
];

export default function TarjetaReciclajePage() {
    return (
        <div className="space-y-16 py-8 px-6 max-w-7xl mx-auto">
            <header className="text-center space-y-6">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-block p-6 bg-primary/10 text-primary rounded-full mb-4 shadow-inner"
                >
                    <Recycle className="h-16 w-16 animate-spin-slow" />
                </motion.div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic italic-shadow">Tarjeta de Reciclaje</h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed uppercase tracking-wide">
                    Nuestra iniciativa ambiental impulsada por la <strong>Fundación Kyron</strong>. Transformamos residuos en activos digitales inmutables.
                </p>
            </header>

            <div className="grid lg:grid-cols-5 gap-12 items-start">
                <Card className="lg:col-span-3 glass-card border-none rounded-[3rem] shadow-xl overflow-hidden bg-white/[0.01]">
                    <CardHeader className="p-10 pb-6">
                        <CardTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-4 text-white">
                            <Zap className="h-8 w-8 text-primary"/>
                            Proceso de Recolección IA
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 pt-0">
                         <div className="relative border-l-4 border-primary/10 ml-6 space-y-12 py-4">
                            {howItWorks.map((item) => (
                                <div key={item.step} className="ml-10 relative">
                                    <span className="absolute flex items-center justify-center w-10 h-10 bg-primary text-white rounded-xl -left-[3.25rem] top-0 font-black shadow-lg">
                                        {item.step}
                                    </span>
                                    <h3 className="font-black text-lg uppercase tracking-tight mb-2 italic text-foreground">{item.title}</h3>
                                    <p className="text-sm text-white/40 font-medium leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                
                <div className="lg:col-span-2 space-y-8">
                     <Card className="bg-primary/5 border-primary/10 rounded-[2.5rem] p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all">
                            <Magnet className="h-32 w-32 rotate-12" />
                        </div>
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-3 italic text-white">
                                <Magnet className="text-primary h-6 w-6"/>
                                Innovación Magnética
                            </CardTitle>
                        </CardHeader>
                         <CardContent className="p-0 space-y-4 font-medium text-sm text-white/40">
                            <p className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5"/> 
                                <span><strong>Sujeción de Alta Precisión:</strong> Asegura el procesamiento correcto antes de la compactación.</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5"/> 
                                <span><strong>Clasificación Automática:</strong> Detecta y separa materiales mediante inducción síncrona.</span>
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-secondary/5 border-secondary/10 rounded-[2.5rem] p-8">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-3 italic text-white">
                                <TrendingUp className="text-secondary h-6 w-6"/>
                                Impacto Ciudadano
                            </CardTitle>
                        </CardHeader>
                         <CardContent className="p-0 space-y-4 font-medium text-sm text-white/40">
                            <p className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5"/> 
                                <span><strong>Monetización:</strong> Transforma tus hábitos en activos digitales inmutables en tu billetera.</span>
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="glass-card border-none rounded-[3rem] shadow-2xl p-12 bg-white/[0.01]">
                <CardHeader className="text-center mb-12">
                    <CardTitle className="text-3xl font-black uppercase tracking-tight italic flex items-center justify-center gap-4 text-white">
                        <Gift className="h-10 w-10 text-primary"/>
                        Eco-Recompensas
                    </CardTitle>
                    <CardDescription className="text-base font-bold text-white/20 mt-2 uppercase tracking-widest">Canjea tus puntos acumulados por beneficios reales</CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rewards.map(reward => (
                        <div key={reward.title} className="p-8 text-center rounded-[2rem] bg-white/[0.02] border border-primary/5 flex flex-col items-center group hover:bg-primary/5 transition-all">
                            <div className="p-4 bg-black rounded-2xl shadow-inner mb-6 group-hover:scale-110 transition-transform">
                                <reward.icon className="h-12 w-12 text-primary"/>
                            </div>
                            <h4 className="font-black text-lg uppercase tracking-tight mb-1 text-white">{reward.title}</h4>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20">En {reward.partner}</p>
                        </div>
                    ))}
                </CardContent>
                 <CardFooter className="justify-center mt-8">
                     <Button variant="outline" className="rounded-xl h-12 px-10 font-bold uppercase text-[10px] tracking-widest border-primary/20 hover:bg-primary/5 text-white/60">Ver Alianzas <ArrowRight className="ml-2 h-4 w-4"/></Button>
                </CardFooter>
            </Card>
        </div>
    );
}
