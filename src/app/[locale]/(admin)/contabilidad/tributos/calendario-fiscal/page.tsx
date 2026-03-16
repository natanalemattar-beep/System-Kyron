
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Bell, ShieldCheck, Activity, Terminal, ArrowRight, Clock, AlertTriangle } from "lucide-react";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const upcomingEvents = [
    { id: 1, title: "Declaración Mensual IVA", date: "15/04/2026", term: "RIF 0, 1, 2, 3", type: "IVA", urgency: "critical" },
    { id: 2, title: "Estimada de ISLR", date: "31/03/2026", term: "Global", type: "ISLR", urgency: "high" },
    { id: 3, title: "Pago IGTF (Quincena 2)", date: "20/03/2026", term: "Global", type: "IGTF", urgency: "medium" },
    { id: 4, title: "Impuesto a Juegos", date: "05/04/2026", term: "Licencia #045", type: "Especial", urgency: "low" },
];

export default function CalendarioFiscalPage() {
    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-amber-500 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-amber-600 shadow-glow mb-4">
                        <Calendar className="h-3 w-3" /> NODO CRONOLÓGICO
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Calendario <span className="text-amber-500 italic">Fiscal 2026</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Cronograma de Sujetos Pasivos Especiales • SENIAT</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl bg-[#0A2472]">
                    <Bell className="mr-3 h-4 w-4" /> ACTIVAR ALERTAS
                </Button>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-8 space-y-6">
                    {upcomingEvents.map((event, i) => (
                        <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                            <Card className={cn(
                                "glass-card border-none rounded-2xl overflow-hidden shadow-xl flex items-center transition-all hover:scale-[1.01]",
                                event.urgency === 'critical' ? "border-l-4 border-rose-500" : "border-l-4 border-amber-500"
                            )}>
                                <div className="p-8 flex-1 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-6">
                                        <div className="p-4 bg-muted rounded-2xl">
                                            <Calendar className={cn("h-6 w-6", event.urgency === 'critical' ? "text-rose-500" : "text-amber-500")} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-sm uppercase italic text-foreground/80">{event.title}</h3>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Terminal RIF: {event.term}</p>
                                        </div>
                                    </div>
                                    <div className="text-center md:text-right">
                                        <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Fecha Límite</p>
                                        <p className="text-xl font-black italic text-foreground tracking-tighter">{event.date}</p>
                                    </div>
                                    <Badge className={cn(
                                        "text-[8px] font-black uppercase h-6 px-4",
                                        event.urgency === 'critical' ? "bg-rose-500 text-white" : "bg-amber-100 text-amber-700"
                                    )}>{event.type}</Badge>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <Card className="bg-[#050505] text-white rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl border-none">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                            <AlertTriangle className="h-32 w-32" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-amber-500 mb-6">Próximo Cierre</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-5xl font-black italic tracking-tighter">12 DÍAS</p>
                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Para ISLR Definición 2025</p>
                                </div>
                                <Button className="w-full h-12 bg-white text-black hover:bg-white/90 rounded-xl font-black uppercase text-[10px] tracking-widest mt-4">REVISAR BORRADOR</Button>
                            </div>
                        </div>
                    </Card>

                    <Card className="glass-card border-none p-10 rounded-[2.5rem] bg-card/40 shadow-xl">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8 italic">Monitor de RIF</h4>
                        <div className="space-y-6">
                            {[
                                { terminal: "0-3", status: "CRÍTICO", color: "text-rose-500" },
                                { terminal: "4-6", status: "PRÓXIMO", color: "text-amber-500" },
                                { terminal: "7-9", status: "EN ESPERA", color: "text-emerald-500" }
                            ].map(rif => (
                                <div key={rif.terminal} className="flex justify-between items-center border-b border-border pb-4 last:border-0 last:pb-0">
                                    <span className="text-xs font-black uppercase text-foreground/60 italic">TERM. {rif.terminal}</span>
                                    <span className={cn("text-[9px] font-black uppercase", rif.color)}>{rif.status}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
