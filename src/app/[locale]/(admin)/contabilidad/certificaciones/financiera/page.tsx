
"use client";
import { BackButton } from "@/components/back-button";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Download, Printer, Activity, Landmark, CircleCheck as CheckCircle, Terminal, FileText, Loader as Loader2, Search, Scale, Calculator } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function CertificacionFinancieraPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<'form' | 'preview'>('form');
    const [certDate, setCertDate] = useState("");
    const [data, setData] = useState({
        empresa: "System Kyron, C.A.",
        rif: "J-50328471-6",
        liquidez: 2.45,
        patrimonio: 950000,
        solvencia: "ÓPTIMA",
        fecha: "",
    });

    useEffect(() => {
        const now = new Date();
        setData(prev => ({ ...prev, fecha: now.toISOString().substring(0, 10) }));
        setCertDate(now.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }));
    }, []);

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/solicitudes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ categoria: "contabilidad", subcategoria: "certificacion_financiera", descripcion: "Generación de certificación financiera", metadata: data }),
            });
            if (res.ok) {
                setStep('preview');
                toast({ title: "CERTIFICACIÓN GENERADA", description: "Documento sellado bajo protocolo de integridad financiera.", action: <CheckCircle className="text-primary h-4 w-4" /> });
            } else {
                toast({ variant: "destructive", title: "Error", description: "No se pudo generar la certificación." });
            }
        } catch {
            toast({ variant: "destructive", title: "Error de conexión" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                    <ShieldCheck className="h-3 w-3" /> NODO DE SOLVENCIA
                </div>
                <BackButton href="/contabilidad" label="Contabilidad" />
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Certificación <span className="text-primary italic">Financiera</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Atestiguamiento de Capacidad Económica • Kyron Protocol 2026</p>
            </header>

            {step === 'form' ? (
                <Card className="glass-card border-none rounded-[3rem] p-1 shadow-2xl max-w-4xl mx-auto">
                    <CardHeader className="p-10 border-b border-border/50 bg-muted/10 text-center">
                        <CardTitle className="text-xl font-black uppercase italic text-foreground tracking-tight">Parámetros de Certificación</CardTitle>
                        <CardDescription className="text-[10px] font-bold uppercase opacity-40">Defina los valores para el dictamen financiero</CardDescription>
                    </CardHeader>
                    <CardContent className="p-10 space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Razón Social</Label>
                                <Input value={data.empresa} readOnly className="h-12 bg-white/5 border-border font-bold uppercase opacity-60" />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">RIF Institucional</Label>
                                <Input value={data.rif} readOnly className="h-12 bg-white/5 border-border font-bold uppercase opacity-60" />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Ratio de Liquidez</Label>
                                <Input type="number" value={data.liquidez} onChange={e => setData({...data, liquidez: Number(e.target.value)})} className="h-12 bg-white/5 border-border font-black italic text-primary" />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Patrimonio Neto (Bs.)</Label>
                                <Input type="number" value={data.patrimonio} onChange={e => setData({...data, patrimonio: Number(e.target.value)})} className="h-12 bg-white/5 border-border font-black italic text-primary" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="p-10 bg-primary/5 border-t border-border flex justify-center">
                        <Button onClick={handleGenerate} className="h-14 px-12 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-xl" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <ShieldCheck className="mr-3 h-5 w-5" />}
                            SELLAR CERTIFICACIÓN
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <div className="space-y-10 animate-in fade-in duration-1000">
                    <Card className="max-w-4xl mx-auto bg-white p-12 md:p-20 shadow-2xl border border-slate-100 rounded-sm text-slate-950 font-serif relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
                            <Logo className="h-full w-full rotate-12 scale-150 grayscale" />
                        </div>
                        
                        <header className="flex justify-between items-start mb-20 border-b-2 border-slate-900 pb-10 relative z-10">
                            <div className="flex items-center gap-6">
                                <Logo className="h-16 w-16" />
                                <div className="space-y-1">
                                    <h4 className="text-xl font-black italic uppercase tracking-tight leading-none">System Kyron</h4>
                                    <p className="text-[8px] font-bold uppercase tracking-[0.4em] opacity-60">Finance Node • 2026</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <h3 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 leading-none">CERTIFICACIÓN FINANCIERA</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">ID: KYR-FIN-{data.fecha.replace(/-/g, '')}</p>
                            </div>
                        </header>

                        <div className="space-y-12 text-justify leading-loose text-lg relative z-10">
                            <p className="indent-12">
                                Quien suscribe, en su carácter de Contador Público y Auditor del sistema <strong>KYRON INTELLIGENCE</strong>, certifica por medio de la presente la salud financiera y capacidad de respuesta económica de la entidad <strong>{data.empresa}</strong>, portadora del RIF <strong>{data.rif}</strong>.
                            </p>
                            
                            <div className="p-10 border-2 border-slate-900 bg-slate-50/50 rounded-2xl space-y-6">
                                <h4 className="text-center font-black uppercase tracking-widest text-sm border-b border-slate-900 pb-4">Dictamen de Ratios Consolidados</h4>
                                <div className="grid grid-cols-2 gap-10 text-base">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold uppercase text-slate-400">Ratio de Liquidez Corriente</p>
                                        <p className="font-black text-2xl">{data.liquidez}:1</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold uppercase text-slate-400">Patrimonio Neto Certificado</p>
                                        <p className="font-black text-2xl">{formatCurrency(data.patrimonio, 'Bs.')}</p>
                                    </div>
                                    <div className="col-span-2 space-y-1">
                                        <p className="text-[9px] font-bold uppercase text-slate-400">Calificación de Solvencia</p>
                                        <p className="font-black text-2xl text-emerald-600 italic">ÓPTIMA - GRADO CORPORATIVO</p>
                                    </div>
                                </div>
                            </div>

                            <p className="indent-12">
                                Se hace constar que los valores antes descritos han sido auditados de forma síncrona contra el Ledger Maestro de la organización, garantizando que cada registro contable posee un respaldo documental inmutable.
                            </p>

                            <p className="indent-12">
                                Constancia que se expide en la ciudad de Caracas, a los {certDate}.
                            </p>
                        </div>

                        <footer className="mt-32 grid grid-cols-2 gap-20 relative z-10">
                            <div className="flex flex-col items-center">
                                <div className="relative mb-4">
                                    <Image src="https://picsum.photos/seed/signature-kyron/200/100" alt="Firma" width={160} height={80} className="mix-blend-multiply opacity-90 grayscale brightness-75 contrast-125" />
                                </div>
                                <div className="w-full h-px bg-slate-900 mb-2" />
                                <p className="font-black text-xs uppercase tracking-tight">División de Auditoría</p>
                                <p className="text-[10px] uppercase font-bold opacity-40">System Kyron v2.8.5</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="p-4 border-2 border-slate-900 rounded-2xl bg-white">
                                    <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=KYR-FIN-AUTH-${data.rif}&bgcolor=ffffff&color=000000&margin=1`} alt="QR" width={100} height={100} className="grayscale" />
                                </div>
                                <p className="text-[8px] font-black uppercase tracking-[0.3em] mt-4 opacity-40 text-right">Integridad Digital Sellada</p>
                            </div>
                        </footer>
                    </Card>

                    <div className="flex flex-wrap justify-center gap-4 no-print pb-20">
                        <Button variant="outline" className="rounded-xl h-14 px-8 font-black text-[10px] uppercase border-border bg-card text-foreground" onClick={() => setStep('form')}>REVISAR DATOS</Button>
                        <Button variant="outline" className="rounded-xl h-14 px-8 font-black text-[10px] uppercase border-border bg-card text-foreground" onClick={() => window.print()}><Printer className="mr-3 h-4 w-4" /> IMPRIMIR</Button>
                        <Button className="btn-3d-primary h-14 px-12 rounded-xl font-black text-[10px] uppercase shadow-xl" onClick={() => setStep('form')}>NUEVA CERTIFICACIÓN</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
