
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, BrainCircuit, Zap, Users, Star, MessageSquare, Activity, TrendingUp, Terminal, ShieldCheck, CircleCheck as CheckCircle, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const climateMetrics = [
    { label: "Inteligencia Emocional", val: 94, icon: BrainCircuit, color: "text-primary" },
    { label: "Liderazgo Efectivo", val: 88, icon: Star, color: "text-amber-500" },
    { label: "Relaciones Laborales", val: 92, icon: Heart, color: "text-rose-500" },
    { label: "Trabajo en Equipo", val: 96, icon: Users, color: "text-secondary" },
];

export default function ClimaOrganizacionalPage() {
    const { toast } = useToast();
    return (
        <div className="space-y-12 pb-20">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Activity className="h-3 w-3" /> NODO PSICOLÓGICO
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Clima y <span className="text-primary italic">Desarrollo Humano</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Cultura Organizacional • Liderazgo Maestro 2026</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    <PlusCircle className="mr-3 h-4 w-4" /> LANZAR ENCUESTA IA
                </Button>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {climateMetrics.map((m, i) => (
                    <Card key={i} className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl group hover:bg-primary/5 transition-all">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{m.label}</p>
                            <m.icon className={cn("h-4 w-4", m.color)} />
                        </div>
                        <div className="space-y-4">
                            <p className="text-4xl font-black italic text-foreground tracking-tighter leading-none">{m.val}%</p>
                            <Progress value={m.val} className="h-1.5 bg-muted" />
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid gap-10 lg:grid-cols-12">
                <Card className="lg:col-span-7 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 right-0 p-10 opacity-5"><Users className="h-48 w-48 text-primary" /></div>
                    <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                        <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Mapa de Relaciones Interpersonales</CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 space-y-8">
                        <p className="text-lg font-bold italic text-muted-foreground/60 leading-relaxed text-justify">
                            El análisis de sentimiento en las comunicaciones internas indica una cohesión del **96%** en los departamentos de Ingeniería y Finanzas. Se observa una mejora significativa en el liderazgo horizontal tras la implementación del protocolo de escucha activa.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-white/[0.03] border border-border rounded-2xl space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                                    <MessageSquare className="h-3 w-3" /> Canales de Feedback
                                </h4>
                                <ul className="space-y-2 text-[9px] font-bold text-foreground/60 uppercase">
                                    <li className="flex items-center gap-3"><div className="h-1 w-1 rounded-full bg-primary" /> Buzón de Sugerencias IA</li>
                                    <li className="flex items-center gap-3"><div className="h-1 w-1 rounded-full bg-primary" /> One-on-One Semanal</li>
                                    <li className="flex items-center gap-3"><div className="h-1 w-1 rounded-full bg-primary" /> Sesiones de Mentoring</li>
                                </ul>
                            </div>
                            <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex flex-col justify-center text-center">
                                <TrendingUp className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
                                <p className="text-xl font-black text-emerald-500 italic">STABLE GROWTH</p>
                                <p className="text-[8px] font-black uppercase text-muted-foreground/40 mt-1">Tendencia Clima</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-5 space-y-8">
                    <Card className="bg-primary text-primary-foreground rounded-[3rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-glow border-none group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Award className="h-32 w-32" /></div>
                        <div>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 leading-tight">Programa de <br/> Liderazgo Maestro</h3>
                            <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8 text-justify">
                                Inyección de metodologías ágiles y gestión emocional para directivos. El sistema detecta perfiles con alto potencial de liderazgo basado en KPIs de equipo.
                            </p>
                        </div>
                        <Button variant="secondary" className="w-full h-12 bg-white text-primary font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl" onClick={() => toast({ title: "EVALUACIÓN 360° SOLICITADA", description: "Se programará una evaluación completa del clima organizacional." })}>SOLICITAR EVALUACIÓN 360</Button>
                    </Card>

                    <Card className="glass-card border-none rounded-[2.5rem] bg-white/[0.02] p-8 border border-white/5">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-6 flex items-center gap-3 italic">
                            <Terminal className="h-4 w-4" /> Protocolo Ético Kyron
                        </h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40 border-b border-border pb-2">
                                <span>Transparencia</span>
                                <span className="text-emerald-500 font-black">CERTIFIED</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40 border-b border-border pb-2">
                                <span>Igualdad</span>
                                <span className="text-emerald-500 font-black">CERTIFIED</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40">
                                <span>Responsabilidad</span>
                                <span className="text-emerald-500 font-black">CERTIFIED</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function PlusCircle(props: any) {
  return (
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  )
}
