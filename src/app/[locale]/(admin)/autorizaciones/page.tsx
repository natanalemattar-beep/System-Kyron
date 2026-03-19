
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, CirclePlus as PlusCircle, CircleCheck as CheckCircle, Clock, QrCode, Activity, Terminal, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const autorizaciones = [
    { id: "AUT-SEN-001", ente: "SENIAT", tipo: "Emisión de Facturas", estado: "Aprobada", fecha: "10/01/2024" },
    { id: "AUT-INS-002", ente: "INPSASEL", tipo: "Programa de Seguridad", estado: "Aprobada", fecha: "05/03/2024" },
    { id: "AUT-MIN-003", ente: "MINEC", tipo: "Impacto Ambiental", estado: "En Revisión", fecha: "20/06/2024" },
];

export default function AutorizacionesPage() {
    const { toast } = useToast();

  return (
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <ShieldCheck className="h-3 w-3" /> NODO REGULATORIO
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Autorizaciones <span className="text-primary italic">Oficiales</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Certificaciones de Entes Públicos • Cumplimiento 2026</p>
        </div>
        <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
            <PlusCircle className="mr-3 h-4 w-4" /> NUEVA SOLICITUD
        </Button>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {autorizaciones.map(auth => (
            <Card key={auth.id} className="glass-card border-none bg-card/40 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between group hover:border-primary/30 transition-all">
                <div className="space-y-8">
                    <div className="flex justify-between items-start">
                        <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant={auth.estado === 'Aprobada' ? 'default' : 'secondary'} className="text-[8px] font-black uppercase tracking-widest h-6 px-3">{auth.estado}</Badge>
                    </div>
                    <div>
                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-2">{auth.ente}</CardTitle>
                        <CardDescription className="text-xs font-bold text-muted-foreground/60 uppercase leading-relaxed">{auth.tipo}</CardDescription>
                    </div>
                    <div className="space-y-4 pt-6 border-t border-border/50">
                        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
                            <span>Referencia:</span>
                            <span className="text-foreground/60">{auth.id}</span>
                        </div>
                        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
                            <span>Emisión:</span>
                            <span className="text-foreground/60">{auth.fecha}</span>
                        </div>
                    </div>
                </div>
                <CardFooter className="p-0 pt-10 flex flex-col items-center gap-6">
                    <div className="p-4 bg-white rounded-2xl shadow-inner border border-border">
                        <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=auth-${auth.id}`} alt="QR Code" width={80} height={80} className="grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <Button variant="outline" className="w-full h-10 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest">Ver Expediente</Button>
                </CardFooter>
            </Card>
        ))}
      </div>

      <Card className="glass-card border-none bg-amber-500/5 p-12 rounded-[4rem] mt-10 relative overflow-hidden shadow-2xl border-l-4 border-amber-500">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <ShieldAlert className="h-8 w-8 text-amber-500 animate-pulse" />
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Próximos Vencimientos</h3>
                </div>
                <p className="text-lg font-medium italic text-white/60 leading-relaxed text-justify">
                    El supervisor IA ha detectado que la autorización del **MINEC (Impacto Ambiental)** requiere actualización de recaudos técnicos antes del 15 de agosto para evitar la paralización de la Unidad 04.
                </p>
            </div>
            <div className="p-10 rounded-[3rem] bg-black/40 border border-white/5 shadow-inner">
                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-amber-500 mb-10 flex items-center gap-3 italic">
                    <Terminal className="h-4 w-4" /> Estatus de Trámite: EN REVISIÓN
                </h4>
                <div className="space-y-6">
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40">
                        <span>Análisis Técnico</span>
                        <span className="text-emerald-400">Completado</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40">
                        <span>Inspección de Campo</span>
                        <span className="text-amber-400">Pendiente</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40">
                        <span>Emisión de Firma</span>
                        <span className="text-white/20">En Espera</span>
                    </div>
                </div>
            </div>
        </div>
      </Card>
    </div>
  );
}
