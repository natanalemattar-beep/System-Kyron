
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Gift, Zap, Award, Coffee, Ticket, Recycling, TrendingUp, Handshake, CheckCircle, Smartphone, Cpu, Package, Coins, Magnet, BarChart3, Clock } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const howItWorks = [
    { step: 1, title: "Ubica una Papelera Inteligente", description: "Encuentra uno de nuestros puntos de recolección afiliados en centros comerciales o plazas públicas." },
    { step: 2, title: "Identifícate con tu Tarjeta", description: "Acerca tu Tarjeta de Reciclaje o escanea el código QR desde tu app para sincronizar tu cuenta." },
    { step: 3, title: "Tecnología de Magnetismo", description: "Nuestra papeleras utilizan un sistema de magnetismo avanzado para la sujeción y clasificación de envases metálicos y plásticos, garantizando una recolección eficiente." },
    { step: 4, title: "Acumula Eco-Créditos", description: "Por cada envase validado por los sensores de IA, recibirás puntos directamente en tu billetera digital." },
    { step: 5, title: "Canjea Recompensas", description: "Usa tus puntos en la red de comercios aliados para obtener descuentos, productos y beneficios exclusivos." },
];

const rewards = [
    { icon: Coffee, title: "Bebida de Cortesía", partner: "Cafetería La Esquina" },
    { icon: Ticket, title: "50% Dto. en Cines", partner: "Cines de la Ciudad" },
    { icon: ShoppingBag, title: "10% de Descuento", partner: "Supermercado El Ahorro" },
];

const ShoppingBag = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);


export default function TarjetaReciclajePage() {

    return (
        <div className="space-y-16 py-8">
            <header className="text-center space-y-6">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-block p-6 bg-primary/10 text-primary rounded-full mb-4 shadow-inner"
                >
                    <Recycling className="h-16 w-16 animate-spin-slow" />
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic italic-shadow">Tarjeta de Reciclaje Pro</h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
                    Nuestra iniciativa ambiental impulsada por la <strong>Fundación Kyron</strong>. Implementamos papeleras inteligentes con **tecnología de magnetismo** para transformar residuos en activos digitales.
                </p>
            </header>

            {/* Nueva Funcionalidad: Análisis Predictivo de Residuos */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="glass-card border-secondary/20 p-8 rounded-[3rem] bg-secondary/5">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <CardTitle className="flex items-center gap-3 text-2xl font-black uppercase italic tracking-tighter">
                      <BarChart3 className="h-8 w-8 text-secondary" />
                      Análisis Predictivo de Residuos
                    </CardTitle>
                    <p className="text-muted-foreground text-sm leading-relaxed">Anticipa la generación de activos verdes basándote en la telemetría de tus nodos de recolección.</p>
                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Predicción: Próximos 7 días</p>
                          <Badge variant="outline" className="border-secondary/20 text-secondary">Alta confianza</Badge>
                        </div>
                        <p className="text-2xl font-black italic">145.8 kg <span className="text-xs opacity-40 tracking-normal">Proyectados</span></p>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/60 mb-1">Mejor momento para venta</p>
                          <p className="text-xs font-bold flex items-center gap-2"><Clock className="h-3 w-3" /> Martes, 10:00 AM</p>
                        </div>
                        <div className="flex-1 p-4 bg-secondary/5 rounded-2xl border border-secondary/10">
                          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-secondary/60 mb-1">Valor E-CR estimado</p>
                          <p className="text-xs font-bold text-secondary flex items-center gap-2"><TrendingUp className="h-3 w-3" /> +12.4% vs promedio</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between p-8 bg-black/40 rounded-[2rem] border border-white/5">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-6">Inyectar Liquidez Ambiental</h4>
                    <p className="text-sm italic font-medium text-white/70 mb-8 leading-relaxed">"Sugerencia de la IA: Los precios de los créditos de carbono en el mercado nacional están en su pico mensual. Se recomienda vender el 40% de los Eco-Créditos acumulados."</p>
                    <Button asChild className="w-full h-12 btn-3d-secondary rounded-xl font-black text-[10px] uppercase tracking-widest">
                      <Link href="/mercado-ecocreditos">Conectar con Mercado de Compensación <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.section>

            <div className="grid lg:grid-cols-5 gap-12 items-start">
                <Card className="lg:col-span-3 bg-card/50 backdrop-blur-sm border-primary/5 rounded-[3rem] shadow-xl overflow-hidden">
                    <CardHeader className="p-10 pb-6">
                        <CardTitle className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
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
                                    <h3 className="font-black text-lg uppercase tracking-tight mb-2 italic">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{item.description}</p>
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
                            <CardTitle className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 italic">
                                <Magnet className="text-primary h-6 w-6"/>
                                Innovación Magnética
                            </CardTitle>
                        </CardHeader>
                         <CardContent className="p-0 space-y-4 font-medium text-sm text-muted-foreground">
                            <p className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5"/> 
                                <span><strong>Sujeción de Alta Precisión:</strong> El sistema de magnetismo asegura que los envases se procesen correctamente antes de la compactación.</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5"/> 
                                <span><strong>Clasificación Automática:</strong> Detecta y separa materiales metálicos de plásticos PET mediante inducción magnética síncrona.</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5"/> 
                                <span><strong>Eficiencia Energética:</strong> Los sensores solo se activan al detectar proximidad, optimizando el consumo de la red urbana.</span>
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-secondary/5 border-secondary/10 rounded-[2.5rem] p-8">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 italic">
                                <TrendingUp className="text-secondary h-6 w-6"/>
                                Impacto del Ecosistema
                            </CardTitle>
                        </CardHeader>
                         <CardContent className="p-0 space-y-4 font-medium text-sm text-muted-foreground">
                            <p className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5"/> 
                                <span><strong>Para el Ciudadano:</strong> Monetización directa de sus hábitos responsables en una billetera digital inmutable.</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5"/> 
                                <span><strong>Para la Ciudad:</strong> Reducción masiva de la huella de carbono y optimización de los servicios de limpieza pública.</span>
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/5 rounded-[3rem] shadow-2xl p-12">
                <CardHeader className="text-center mb-12">
                    <CardTitle className="text-3xl font-black uppercase tracking-tighter italic flex items-center justify-center gap-4 text-white">
                        <Gift className="h-10 w-10 text-primary"/>
                        Catálogo de Eco-Recompensas
                    </CardTitle>
                    <CardDescription className="text-base font-bold text-muted-foreground mt-2 uppercase tracking-widest">Canjea tus puntos acumulados por beneficios reales</CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rewards.map(reward => (
                        <div key={reward.title} className="p-8 text-center rounded-[2rem] bg-secondary/5 border border-primary/5 flex flex-col items-center group hover:bg-primary/5 transition-all">
                            <div className="p-4 bg-background rounded-2xl shadow-inner mb-6 group-hover:scale-110 transition-transform">
                                <reward.icon className="h-12 w-12 text-primary"/>
                            </div>
                            <h4 className="font-black text-lg uppercase tracking-tight mb-1">{reward.title}</h4>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">En {reward.partner}</p>
                        </div>
                    ))}
                </CardContent>
                 <CardFooter className="justify-center mt-8">
                     <Button variant="outline" className="rounded-xl h-12 px-10 font-bold uppercase text-[10px] tracking-widest border-primary/20 hover:bg-primary/5">Ver Todas las Alianzas <ArrowRight className="ml-2 h-4 w-4"/></Button>
                </CardFooter>
            </Card>
            
             <div className="grid sm:grid-cols-2 gap-12">
                 <Card className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 text-center shadow-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity" />
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-2xl font-black uppercase italic tracking-tighter">Obtén tu ID Digital</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <p className="font-medium opacity-80 mb-8">Descarga la plataforma Kyron, activa tu ID biométrica y empieza a inyectar sostenibilidad al ecosistema.</p>
                        <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-2xl h-16 px-12 font-black text-sm uppercase shadow-2xl">DESCARGAR APP KYRON</Button>
                    </CardContent>
                </Card>
                 <Card className="bg-secondary/10 border-2 border-secondary/20 rounded-[2.5rem] p-10 text-center group">
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-2xl font-black uppercase italic tracking-tighter text-secondary">¿Eres un Comercio Aliado?</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <p className="font-medium text-muted-foreground mb-8">Únete a nuestra red de comercios sostenibles y atrae a una audiencia consciente impulsando tus ventas.</p>
                        <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 rounded-2xl h-16 px-12 font-black text-sm uppercase shadow-lg"><Handshake className="mr-3 h-6 w-6"/>REGISTRAR NEGOCIO</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
