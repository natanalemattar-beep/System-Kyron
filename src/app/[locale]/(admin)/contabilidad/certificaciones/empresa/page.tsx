
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Download, Printer, Activity, Building2, CheckCircle, Terminal } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const certifications = [
    { id: "CERT-FIS-001", name: "Solvencia de Impuestos Nacionales", issuer: "SENIAT", status: "Vigente", date: "15/01/2024", expiry: "15/01/2025" },
    { id: "CERT-LAB-002", name: "Solvencia Laboral IVSS", issuer: "Ministerio del Trabajo", status: "Vigente", date: "10/02/2024", expiry: "10/08/2024" },
    { id: "CERT-MUN-003", name: "Licencia de Actividad Económica", issuer: "Alcaldía de Vargas", status: "Vigente", date: "01/01/2024", expiry: "31/12/2024" },
];

export default function CertificacionesEmpresaPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <ShieldCheck className="h-3 w-3" /> NODO DE CUMPLIMIENTO
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Certificaciones <span className="text-primary italic">de Empresa</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Expediente Maestro • Validación de Entidad 2026</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    SOLICITAR NUEVA
                </Button>
            </header>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {certifications.map(cert => (
                    <Card key={cert.id} className="glass-card border-none bg-card/40 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between group hover:border-primary/30 transition-all">
                        <div className="space-y-8">
                            <div className="flex justify-between items-start">
                                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Building2 className="h-6 w-6 text-primary" />
                                </div>
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-none h-6 px-3 text-[8px] font-black uppercase tracking-widest">{cert.status}</Badge>
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-2">{cert.issuer}</CardTitle>
                                <p className="text-xs font-bold text-muted-foreground/60 uppercase leading-relaxed">{cert.name}</p>
                            </div>
                            <div className="space-y-4 pt-6 border-t border-border/50">
                                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
                                    <span>Emitido:</span>
                                    <span className="text-foreground/60">{cert.date}</span>
                                </div>
                                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
                                    <span>Vence:</span>
                                    <span className="text-rose-500">{cert.expiry}</span>
                                </div>
                            </div>
                        </div>
                        <CardFooter className="p-0 pt-10 flex flex-col items-center gap-6">
                            <div className="p-4 bg-white rounded-2xl shadow-inner border border-border">
                                <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=cert-${cert.id}`} alt="QR Code" width={80} height={80} className="grayscale group-hover:grayscale-0 transition-all" />
                            </div>
                            <Button variant="outline" className="w-full h-10 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest" onClick={() => toast({ title: "DESCARGA INICIADA" })}>DESCARGAR PDF</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Card className="glass-card border-none bg-primary/5 p-12 rounded-[4rem] mt-10 relative overflow-hidden shadow-2xl">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <ShieldCheck className="h-8 w-8 text-primary animate-pulse" />
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Bóveda de Solvencias</h3>
                        </div>
                        <p className="text-lg font-medium italic text-white/60 leading-relaxed text-justify">
                            System Kyron mantiene un registro inmutable de todas las solvencias corporativas. El sistema alerta automáticamente al departamento legal 30 días antes del vencimiento de cualquier certificación oficial para garantizar la continuidad operativa.
                        </p>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-black/40 border border-white/5 shadow-inner">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-10 flex items-center gap-3 italic">
                            <Terminal className="h-4 w-4" /> Telemetría de Auditoría
                        </h4>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40">
                                <span>Verificación Blockchain</span>
                                <span className="text-emerald-400">Activa</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40">
                                <span>Sellado de Tiempo</span>
                                <span className="text-emerald-400">RFC 3161</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40">
                                <span>Integridad de Archivo</span>
                                <span className="text-primary font-black shadow-glow-text">100%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
