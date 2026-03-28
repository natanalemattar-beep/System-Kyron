
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Signature as FileSignature, Banknote, Scale, Coins, ShieldCheck, ArrowRight, Activity, Terminal, Printer, Download, CircleCheck as CheckCircle, Loader as Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Logo } from "@/components/logo";
import Image from "next/image";
import { formatCurrency, formatDate, cn } from "@/lib/utils";

const certProtocols = [
    {
        id: "ingresos",
        title: "Certificación de Ingresos",
        desc: "Avala los ingresos de la entidad o persona ante terceros para créditos bancarios o alquileres.",
        icon: Banknote,
        color: "text-primary",
        bg: "bg-primary/10"
    },
    {
        id: "estados_financieros",
        title: "Estados Financieros",
        desc: "Dictamen sobre la integridad y correcta medición de activos, pasivos y patrimonio corporativo.",
        icon: Scale,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
    },
    {
        id: "origen_fondos",
        title: "Origen de Fondos",
        desc: "Acredita la lícita procedencia de capitales para la adquisición de activos de alto valor.",
        icon: Coins,
        color: "text-amber-500",
        bg: "bg-amber-500/10"
    },
    {
        id: "especiales",
        title: "Certificaciones Especiales",
        desc: "Informes técnicos sobre cumplimiento tributario, saldos específicos u obligaciones laborales.",
        icon: ShieldCheck,
        color: "text-primary",
        bg: "bg-primary/10"
    }
];

export default function CertificacionesContablesPage() {
    const { toast } = useToast();
    const [step, setStep] = useState<'hub' | 'form' | 'preview'>('hub');
    const [selectedType, setSelectedType] = useState<any>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [formData, setFormData] = useState({
        titular: "SYSTEM KYRON, C.A.",
        rif: "J-12345678-9",
        monto: 125000,
        motivo: "SOLICITUD DE CRÉDITO CORPORATIVO",
        fecha: new Date().toISOString().substring(0, 10),
    });

    const handleSelectProtocol = (protocol: any) => {
        setSelectedType(protocol);
        setStep('form');
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setStep('preview');
            toast({
                title: "DOCUMENTO CERTIFICADO",
                description: "Sello digital inmutable aplicado con éxito.",
                action: <CheckCircle className="text-emerald-500 h-4 w-4" />
            });
        }, 1500);
    };

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                    <FileSignature className="h-3 w-3" /> NODO DE FE PÚBLICA
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Certificaciones <span className="text-primary italic">Contables</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Atestiguamiento Técnico • Validación Institucional 2026</p>
            </header>

            <AnimatePresence mode="wait">
                {step === 'hub' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -20 }}
                        className="grid gap-8 md:grid-cols-2"
                    >
                        {certProtocols.map((protocol) => (
                            <Card 
                                key={protocol.id} 
                                onClick={() => handleSelectProtocol(protocol)}
                                className="glass-card border-none bg-card/40 p-8 rounded-[3rem] cursor-pointer group hover:bg-primary/5 transition-all shadow-xl flex flex-col justify-between min-h-[220px]"
                            >
                                <div className="flex items-start gap-6">
                                    <div className={cn("p-5 rounded-2xl border border-border shadow-inner transition-transform group-hover:scale-110", protocol.bg, protocol.color)}>
                                        <protocol.icon className="h-8 w-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-white group-hover:text-primary transition-colors">{protocol.title}</h3>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed tracking-widest">{protocol.desc}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-6">
                                    <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-primary/20 text-primary opacity-0 group-hover:opacity-100 transition-all">INICIAR PROTOCOLO <ArrowRight className="ml-2 h-3 w-3" /></Badge>
                                </div>
                            </Card>
                        ))}
                    </motion.div>
                )}

                {step === 'form' && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto">
                        <Card className="glass-card border-none rounded-[3rem] p-1 shadow-2xl bg-card/40 overflow-hidden">
                            <CardHeader className="p-10 border-b border-border/50 bg-muted/10 flex flex-row items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-xl font-black uppercase italic text-foreground tracking-tighter">Parámetros del Dictamen</CardTitle>
                                    <CardDescription className="text-[10px] font-bold uppercase text-primary tracking-widest">{selectedType?.title}</CardDescription>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setStep('hub')} className="h-10 w-10 rounded-full bg-white/5"><X className="h-4 w-4" /></Button>
                            </CardHeader>
                            <CardContent className="p-10 space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Titular del Certificado</Label>
                                        <Input value={formData.titular} onChange={e => setFormData({...formData, titular: e.target.value.toUpperCase()})} className="h-12 bg-white/5 border-border font-bold text-white uppercase" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Identificación / RIF</Label>
                                        <Input value={formData.rif} onChange={e => setFormData({...formData, rif: e.target.value.toUpperCase()})} className="h-12 bg-white/5 border-border font-mono text-white uppercase" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Monto de Validación (Bs.)</Label>
                                        <Input type="number" value={formData.monto} onChange={e => setFormData({...formData, monto: Number(e.target.value)})} className="h-12 bg-white/5 border-border font-black italic text-primary" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Destino / Motivo</Label>
                                        <Input value={formData.motivo} onChange={e => setFormData({...formData, motivo: e.target.value.toUpperCase()})} className="h-12 bg-white/5 border-border font-bold text-white uppercase" />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-10 bg-primary/5 border-t border-border flex justify-center">
                                <Button onClick={handleGenerate} className="h-14 px-12 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-xl" disabled={isGenerating}>
                                    {isGenerating ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <ShieldCheck className="mr-3 h-5 w-5" />}
                                    GENERAR Y SELLAR
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}

                {step === 'preview' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10 animate-in fade-in duration-1000">
                        <Card className="max-w-4xl mx-auto bg-white p-12 md:p-20 shadow-2xl border border-slate-100 rounded-sm text-slate-950 font-serif relative overflow-hidden">
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
                                <Logo className="h-full w-full rotate-12 scale-150 grayscale" />
                            </div>
                            
                            <header className="flex justify-between items-start mb-20 border-b-2 border-slate-900 pb-10 relative z-10">
                                <div className="flex items-center gap-6">
                                    <Logo className="h-16 w-16" />
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-black italic uppercase tracking-tighter leading-none">System Kyron</h4>
                                        <p className="text-[8px] font-bold uppercase tracking-[0.4em] opacity-60">Finance Node • 2026</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">{selectedType?.title}</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Protocolo: CC-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                                </div>
                            </header>

                            <div className="space-y-12 text-justify leading-loose text-lg relative z-10">
                                <p className="indent-12">
                                    Quien suscribe, actuando en representación de la <strong>UNIDAD DE CONTROL INTEGRAL SYSTEM KYRON</strong>, certifica formalmente la existencia, integridad y veracidad de la data financiera de <strong>{formData.titular}</strong>, identificada bajo el número <strong>{formData.rif}</strong>.
                                </p>
                                
                                <div className="p-10 border-2 border-slate-900 bg-slate-50/50 rounded-2xl space-y-6">
                                    <h4 className="text-center font-black uppercase tracking-widest text-sm border-b border-slate-900 pb-4">Dictamen de Atestiguamiento</h4>
                                    <div className="grid grid-cols-2 gap-10 text-base">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-bold uppercase text-slate-400">Concepto Certificado</p>
                                            <p className="font-black text-xl uppercase italic">{selectedType?.title}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-bold uppercase text-slate-400">Valor Auditado</p>
                                            <p className="font-black text-xl">{formatCurrency(formData.monto, 'Bs.')}</p>
                                        </div>
                                        <div className="col-span-2 space-y-1">
                                            <p className="text-[9px] font-bold uppercase text-slate-400">Finalidad del Documento</p>
                                            <p className="font-black text-xl uppercase text-slate-700">{formData.motivo}</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="indent-12">
                                    Se hace constar que los registros que sustentan esta certificación han sido procesados bajo la metodología <strong>VEN-NIF</strong> y sellados en el Ledger Inmutable del ecosistema Kyron, garantizando su inalterabilidad ante auditorías externas.
                                </p>

                                <p className="indent-12">
                                    Certificación que se expide en Caracas, a los {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}.
                                </p>
                            </div>

                            <footer className="mt-32 grid grid-cols-2 gap-20 relative z-10">
                                <div className="flex flex-col items-center">
                                    <div className="relative mb-4">
                                        <Image src="https://picsum.photos/seed/sign-kyron/200/100" alt="Firma" width={160} height={80} className="mix-blend-multiply opacity-90 grayscale brightness-75 contrast-125" />
                                    </div>
                                    <div className="w-full h-px bg-slate-900 mb-2" />
                                    <p className="font-black text-xs uppercase tracking-tight">División de Fe Pública</p>
                                    <p className="text-[10px] uppercase font-bold opacity-40">System Kyron v2.6.5</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="p-4 border-2 border-slate-900 rounded-2xl bg-white">
                                        <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=CERT-CONT-${formData.rif}&bgcolor=ffffff&color=000000&margin=1`} alt="QR" width={100} height={100} className="grayscale" />
                                    </div>
                                    <p className="text-[8px] font-black uppercase tracking-[0.3em] mt-4 opacity-40 text-right">Integridad Digital Certificada</p>
                                </div>
                            </footer>
                        </Card>

                        <div className="flex flex-wrap justify-center gap-4 no-print pb-20">
                            <Button variant="outline" className="rounded-xl h-14 px-8 font-black text-[10px] uppercase border-border bg-card text-foreground" onClick={() => setStep('form')}>REVISAR DATOS</Button>
                            <Button variant="outline" className="rounded-xl h-14 px-8 font-black text-[10px] uppercase border-border bg-card text-foreground" onClick={() => window.print()}><Printer className="mr-3 h-4 w-4" /> IMPRIMIR</Button>
                            <Button className="btn-3d-primary h-14 px-12 rounded-xl font-black text-[10px] uppercase shadow-xl" onClick={() => setStep('hub')}>NUEVO DICTAMEN</Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Card className="glass-card border-none bg-white/[0.02] p-12 rounded-[4rem] mt-10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-5"><Activity className="h-48 w-48 text-primary" /></div>
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 relative z-10">
                        <div className="flex items-center gap-4">
                            <ShieldCheck className="h-8 w-8 text-primary animate-pulse" />
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Blindaje Técnico</h3>
                        </div>
                        <p className="text-lg font-medium italic text-white/60 leading-relaxed text-justify">
                            Nuestras certificaciones contables no son simples cartas; son informes técnicos basados en la trazabilidad total del sistema. Cada dictamen es respaldado por el motor de auditoría forense de Kyron para garantizar transparencia absoluta.
                        </p>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-black/40 border border-white/5 shadow-inner relative z-10">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-10 flex items-center gap-3 italic">
                            <Terminal className="h-4 w-4" /> Protocolo de Certificación v2.6
                        </h4>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40">
                                <span>Normas Técnicas</span>
                                <span className="text-emerald-400">VEN-NIF / NIIF</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40">
                                <span>Verificación</span>
                                <span className="text-emerald-400">Blockchain Sync</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40">
                                <span>Validez Fiscal</span>
                                <span className="text-primary font-black shadow-glow-text">CERTIFIED</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
