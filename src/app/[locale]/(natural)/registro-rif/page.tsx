
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File as FileEdit, UserPlus, Info, CircleCheck as CheckCircle, ArrowRight, Download, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const recaudos = [
    "Copia de la Cédula de Identidad del menor.",
    "Partida de Nacimiento Original.",
    "Cédula de Identidad del Representante.",
    "RIF vigente del Representante Legal.",
    "Comprobante de domicilio (Servicio Público).",
];

export default function RegistroRifPage() {
    const { toast } = useToast();

    return (
        <div className="max-w-5xl mx-auto space-y-12">
            <header className="text-center space-y-6">
                <div className="inline-block p-6 bg-primary/10 text-primary rounded-[2rem] border border-primary/20 shadow-glow-sm">
                    <FileEdit className="h-12 w-12" />
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow">Registro RIF <br/> <span className="text-primary tracking-normal">Carga Familiar</span></h1>
                <p className="text-muted-foreground text-sm font-bold uppercase tracking-[0.4em] opacity-40">Protocolo de Inscripción SENIAT para Menores</p>
            </header>

            <div className="grid gap-10 md:grid-cols-2">
                <Card className="glass-card border-none rounded-[3rem] bg-white/[0.02] p-4">
                    <CardHeader className="p-8">
                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                            <Info className="h-6 w-6 text-primary"/> Importancia
                        </CardTitle>
                        <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-white/30 mt-2">Beneficios y Obligaciones</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-0 text-sm font-medium italic text-white/60 leading-relaxed text-justify space-y-6">
                        <p>La inscripción en el RIF de sus hijos permite la rebaja de impuestos en la declaración de ISLR y es requisito para transacciones bancarias, herencias y títulos de propiedad.</p>
                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                            <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                            <p className="text-[10px] font-black uppercase tracking-widest leading-snug">Este trámite es de orden público y gratuito ante el SENIAT.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-none rounded-[3rem] bg-white/[0.02] p-4">
                    <CardHeader className="p-8">
                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                            <UserPlus className="h-6 w-6 text-primary"/> Recaudos
                        </CardTitle>
                        <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-white/30 mt-2">Dossier de Inscripción</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                        <ul className="space-y-4">
                            {recaudos.map((item, index) => (
                                <li key={index} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/40">
                                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter className="p-8 pt-0">
                        <Button variant="outline" className="w-full h-12 rounded-xl border-white/10 bg-white/5 font-black text-[10px] uppercase tracking-widest" onClick={() => toast({ title: "Checklist Generado" })}>
                            <Download className="mr-3 h-4 w-4"/> BAJAR CHECKLIST
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <Card className="bg-primary text-primary-foreground rounded-[3rem] p-12 text-center shadow-glow border-none relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
                    <ShieldCheck className="h-48 w-48" />
                </div>
                <CardHeader className="p-0 mb-8 relative z-10">
                    <CardTitle className="text-3xl font-black uppercase italic tracking-tighter">Asistente de Pre-Inscripción</CardTitle>
                    <p className="text-sm font-bold opacity-80 uppercase tracking-widest mt-2">Llenado automático de planilla digital SENIAT.</p>
                </CardHeader>
                <CardFooter className="p-0 relative z-10">
                    <Button variant="secondary" className="w-full h-16 rounded-2xl bg-white text-primary font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-white/90">
                        INICIAR PROTOCOLO DE LLENADO <ArrowRight className="ml-3 h-5 w-5"/>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
