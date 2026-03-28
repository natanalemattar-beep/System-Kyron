
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Bot, ShieldCheck, Activity, CirclePlus as PlusCircle, ArrowRight, CircleCheck as CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const automatedTasks = [
    { id: 1, name: "Reajuste por Inflación", trigger: "Cierre de Mes", action: "Cálculo automático RIPF", status: "Activa", complexity: "Alta" },
    { id: 2, name: "Sincronización BCV", trigger: "Diario 9:00 AM", action: "Actualización de tasas VES/USD", status: "Activa", complexity: "Baja" },
    { id: 3, name: "Auditoría de RIF", trigger: "Al registrar factura", action: "Validación síncrona SENIAT", status: "Activa", complexity: "Media" },
];

export default function AutomatizacionesPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <Zap className="h-3 w-3" /> NODO DE EFICIENCIA
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Automatizaciones <span className="text-primary italic">IA</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Flujos de Trabajo Autónomos • System Kyron 2026</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-10">
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Bot className="h-24 w-24" /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Tareas Automatizadas</p>
                    <p className="text-4xl font-black italic text-primary tracking-tighter">12 PROCESOS</p>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Activity className="h-24 w-24" /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Tiempo Ahorrado (Mes)</p>
                    <p className="text-4xl font-black italic text-foreground tracking-tighter">45 HORAS</p>
                </Card>
            </div>

            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10 flex flex-row justify-between items-center">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Reglas de Negocio Activas</CardTitle>
                    <Button variant="ghost" className="text-[10px] font-black uppercase border border-border" onClick={() => toast({ title: "HISTORIAL DE EJECUCIONES", description: "Sin ejecuciones registradas aún." })}>HISTORIAL</Button>
                </CardHeader>
                <div className="p-10 space-y-6">
                    {automatedTasks.map(task => (
                        <div key={task.id} className="p-6 rounded-[2rem] bg-white/5 border border-border flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-primary/30 transition-all">
                            <div className="flex items-center gap-6 text-center md:text-left">
                                <div className="p-4 bg-primary/10 rounded-2xl"><Zap className="h-6 w-6 text-primary" /></div>
                                <div>
                                    <h3 className="font-black text-sm uppercase italic text-foreground/80">{task.name}</h3>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-40">Acción: {task.action}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-10">
                                <div className="text-center md:text-right">
                                    <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Disparador</p>
                                    <p className="text-[10px] font-bold uppercase">{task.trigger}</p>
                                </div>
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black px-4">{task.status}</Badge>
                            </div>
                        </div>
                    ))}
                </div>
                <CardFooter className="p-10 bg-primary/5 flex justify-center">
                    <Button className="btn-3d-primary h-14 px-12 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl" onClick={() => toast({ title: "NUEVO FLUJO", description: "Configure su automatización desde el panel de configuración." })}>
                        <PlusCircle className="mr-3 h-5 w-5" /> CREAR NUEVO FLUJO
                    </Button>
                </CardFooter>
            </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
            <Card className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-glow border-none group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><ShieldCheck className="h-32 w-32" /></div>
                <div>
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6">Integridad Maestra</h3>
                    <p className="text-sm font-bold opacity-80 leading-relaxed uppercase mb-8">Nuestras automatizaciones están auditadas para garantizar el 100% de cumplimiento legal ante fiscalizaciones.</p>
                </div>
                <Button variant="secondary" className="w-full h-12 bg-white text-primary font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl" onClick={() => toast({ title: "SOLICITUD ENVIADA", description: "Su solicitud de auditoría de automatizaciones ha sido registrada." })}>SOLICITAR AUDITORÍA</Button>
            </Card>
        </div>
      </div>
    </div>
  );
}
