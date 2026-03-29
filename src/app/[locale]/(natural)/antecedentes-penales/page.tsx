
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Download, CirclePlus as PlusCircle, CircleCheck as CheckCircle , ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

import { Link } from '@/navigation';
const certificados = [
    { id: "AP-2024-005", fecha: "22/07/2024", motivo: "Trámites Migratorios", estado: "Aprobado", vence: "22/10/2024" },
];

export default function AntecedentesPenalesPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-8">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-4"><ArrowLeft className="h-3.5 w-3.5" /> Volver al Dashboard</Link>
                <header className="flex justify-between items-center border-l-4 border-primary pl-8 py-2">
                <div>
                    <h1 className="text-3xl font-black tracking-tight uppercase italic text-foreground  flex items-center gap-4">
                        <Shield className="h-8 w-8 text-primary" />
                        Antecedentes Penales
                    </h1>
                    <p className="text-muted-foreground mt-2 font-bold text-xs uppercase tracking-widest opacity-60">Certificaciones Internacionales • MPPRIJP</p>
                </div>
                <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest" onClick={() => toast({ title: "Protocolo Iniciado", description: "Iniciando trámite ante el Ministerio." })}>
                    <PlusCircle className="mr-2 h-4 w-4"/> Nueva Solicitud
                </Button>
            </header>

            <div className="grid gap-6">
                {certificados.map(cert => (
                    <Card key={cert.id} className="glass-card border-none rounded-[2rem] overflow-hidden bg-white/[0.02]">
                        <CardHeader className="flex-row items-center justify-between p-10 bg-white/[0.01]">
                            <div>
                                <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Certificado {cert.id}</CardTitle>
                                <CardDescription className="text-[10px] font-bold uppercase text-white/30 tracking-widest">Motivo: {cert.motivo}</CardDescription>
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 h-7 text-[9px] font-black uppercase tracking-widest">{cert.estado}</Badge>
                        </CardHeader>
                        <CardContent className="p-10 space-y-4 text-xs font-bold uppercase tracking-widest text-white/40">
                            <p>Emitido: <span className="text-white/70 ml-2">{cert.fecha}</span></p>
                            <p>Vencimiento: <span className="text-rose-400 ml-2 italic">{cert.vence}</span></p>
                        </CardContent>
                        <CardFooter className="p-8 border-t border-white/5 flex justify-center">
                            <Button variant="outline" className="w-full h-12 rounded-xl border-white/10 hover:bg-white/5 font-black text-[10px] uppercase tracking-widest text-white/60">
                                <Download className="mr-3 h-4 w-4 text-primary"/> Descargar Certificado PDF
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
