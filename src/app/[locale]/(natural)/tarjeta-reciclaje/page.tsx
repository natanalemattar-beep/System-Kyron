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
        <div className="space-y-10 py-8 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-emerald-500/[0.04] via-card to-card p-6 sm:p-8 text-center"
            >
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
                <div className="relative flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <Recycle className="h-8 w-8 text-emerald-500" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Tarjeta de Reciclaje</h1>
                    <p className="text-sm text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                        Iniciativa ambiental de la <strong className="text-foreground/70">Fundación Kyron</strong>. Transformamos residuos en activos digitales mediante tecnología inteligente.
                    </p>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-6 items-start">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-3">
                    <Card className="rounded-2xl border border-border/30 bg-card overflow-hidden">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                                    <Zap className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle className="text-base font-semibold text-foreground">Proceso de Recolección IA</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="relative ml-5 space-y-6 py-2">
                                <div className="absolute left-0 top-0 bottom-0 w-px bg-border/30" />
                                {howItWorks.map((item) => (
                                    <div key={item.step} className="ml-8 relative">
                                        <span className="absolute flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-lg -left-[2.55rem] top-0 text-sm font-bold shadow-sm">
                                            {item.step}
                                        </span>
                                        <h3 className="font-semibold text-sm text-foreground mb-1">{item.title}</h3>
                                        <p className="text-[12px] text-muted-foreground leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <div className="lg:col-span-2 space-y-4">
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                        <Card className="rounded-2xl border border-primary/15 bg-primary/[0.02] overflow-hidden">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                                        <Magnet className="h-4 w-4 text-primary" />
                                    </div>
                                    <CardTitle className="text-sm font-semibold text-foreground">Innovación Magnética</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3 pt-0 text-[12px] text-muted-foreground">
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                    <span><strong className="text-foreground/70">Sujeción de Alta Precisión:</strong> Asegura el procesamiento correcto antes de la compactación.</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                    <span><strong className="text-foreground/70">Clasificación Automática:</strong> Detecta y separa materiales mediante inducción síncrona.</span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Card className="rounded-2xl border border-border/30 bg-card">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-secondary/10 border border-secondary/15 flex items-center justify-center">
                                        <TrendingUp className="h-4 w-4 text-secondary" />
                                    </div>
                                    <CardTitle className="text-sm font-semibold text-foreground">Impacto Ciudadano</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0 text-[12px] text-muted-foreground">
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                                    <span><strong className="text-foreground/70">Monetización:</strong> Transforma tus hábitos en activos digitales inmutables en tu billetera.</span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <Card className="rounded-2xl border border-border/30 bg-card overflow-hidden">
                    <CardHeader className="text-center pb-4">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                                <Gift className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                        <CardTitle className="text-lg font-bold text-foreground">Eco-Recompensas</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">Canjea tus puntos acumulados por beneficios reales</CardDescription>
                    </CardHeader>
                    <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {rewards.map(reward => (
                            <div key={reward.title} className="p-5 text-center rounded-2xl bg-muted/20 border border-border/20 flex flex-col items-center gap-3 hover:bg-muted/30 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                                    <reward.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h4 className="font-semibold text-sm text-foreground">{reward.title}</h4>
                                <p className="text-[11px] text-muted-foreground">En {reward.partner}</p>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Button variant="outline" className="rounded-xl h-10 px-6 text-[10px] font-bold uppercase tracking-widest gap-2 border-border/30">
                            Ver Alianzas <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
