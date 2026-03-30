
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { School, CirclePlay as PlayCircle, BookOpen, Award, CircleCheck as CheckCircle, Clock, Star, Zap, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

const courses = [
    { title: "Dominio de Gestión Fiscal", desc: "Aprende a declarar IVA e ISLR con el motor IA de Kyron.", duration: "4h", level: "Intermedio", img: "https://picsum.photos/seed/tax/400/200", progress: 65 },
    { title: "Arquitectura eSIM 5G", desc: "Fundamentos de telecomunicaciones convergentes y provisión remota.", duration: "6h", level: "Avanzado", img: "https://picsum.photos/seed/telecom/400/200", progress: 0 },
    { title: "Seguridad Blockchain", desc: "Protocolos de inmutabilidad y sellado digital de activos.", duration: "3h", level: "Básico", img: "https://picsum.photos/seed/blockchain/400/200", progress: 100 },
];

export default function AcademiaKyronPage() {
    return (
        <div className="space-y-12 w-full px-6 md:px-16 pb-20">
            <header className="border-l-4 border-yellow-500 pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-yellow-500 shadow-glow mb-4">
                    <School className="h-3 w-3" /> NODO EDUCATIVO
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic text-foreground">Kyron <span className="text-yellow-500">Academy</span></h1>
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-40">Centro de Formación Técnica y Profesional • 2026</p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, i) => (
                    <Card key={i} className="glass-card border-none overflow-hidden rounded-[2.5rem] bg-white/[0.02] group flex flex-col">
                        <div className="aspect-video relative overflow-hidden">
                            <Image src={course.img} alt={course.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <PlayCircle className="h-16 w-16 text-white" />
                            </div>
                            <div className="absolute top-4 left-4">
                                <Badge className="bg-black/60 backdrop-blur-md text-[8px] font-black uppercase tracking-widest border-white/10">{course.level}</Badge>
                            </div>
                        </div>
                        <CardHeader className="p-8 pb-4">
                            <CardTitle className="text-xl font-black uppercase italic tracking-tight leading-tight text-white/90">{course.title}</CardTitle>
                            <CardDescription className="text-xs font-bold text-white/30 uppercase mt-2">{course.desc}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 flex-grow">
                            <div className="flex items-center gap-6 mb-6">
                                <span className="flex items-center gap-2 text-[9px] font-black text-white/40 uppercase tracking-widest"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
                                <span className="flex items-center gap-2 text-[9px] font-black text-white/40 uppercase tracking-widest"><BookOpen className="h-3.5 w-3.5" /> 12 Lecciones</span>
                            </div>
                            {course.progress > 0 && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-primary">
                                        <span>Progreso</span>
                                        <span>{course.progress}%</span>
                                    </div>
                                    <Progress value={course.progress} className="h-1.5" />
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="p-8 pt-0 mt-auto">
                            <Button className={cn(
                                "w-full h-12 rounded-xl font-black text-[10px] uppercase tracking-widest",
                                course.progress === 100 ? "bg-secondary text-black" : "btn-3d-primary"
                            )}>
                                {course.progress === 100 ? "VER CERTIFICADO" : course.progress > 0 ? "CONTINUAR CURSO" : "INICIAR APRENDIZAJE"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Card className="bg-gradient-to-br from-yellow-500 to-amber-600 border-none rounded-[3rem] p-12 relative overflow-hidden shadow-glow">
                <div className="absolute top-0 right-0 p-12 opacity-10"><Award className="h-64 w-64" /></div>
                <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="space-y-6">
                        <Badge className="bg-white/20 text-white border-white/30 text-[10px] font-black uppercase tracking-[0.4em]">Certificación Master</Badge>
                        <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tight text-foreground">Conviértete en un Operador Maestro</h2>
                        <p className="text-lg font-medium italic text-white/80 leading-relaxed">Domina el ecosistema completo y obtén una credencial verificable en Blockchain que valida tus competencias en la nueva economía digital.</p>
                        <Button className="h-16 px-12 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-white/90">INSCRIBIRSE AL PROGRAMA</Button>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { label: "VÁLIDO POR SENIAT", icon: CheckCircle },
                            { label: "SOPORTE 5G", icon: Zap },
                            { label: "LEDGER AUTH", icon: BrainCircuit },
                            { label: "AUDITORÍA IA", icon: Star }
                        ].map((feat, i) => (
                            <div key={i} className="p-6 bg-white/10 rounded-[2rem] border border-white/20 flex flex-col items-center text-center gap-4">
                                <feat.icon className="h-8 w-8 text-white" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-white">{feat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
}
