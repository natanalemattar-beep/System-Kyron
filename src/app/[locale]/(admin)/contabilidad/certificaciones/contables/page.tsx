"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Signature as FileSignature, Banknote, Scale, Coins, ShieldCheck, ArrowRight, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BackButton } from "@/components/back-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2, X, ChevronRight, TriangleAlert } from "lucide-react";

const certProtocols = [
    {
        id: "ingresos",
        title: "Certificación de Ingresos",
        desc: "Avala los ingresos de la entidad o persona ante terceros para créditos bancarios o alquileres.",
        icon: Banknote,
        color: "text-primary",
        bg: "bg-primary/10 border-primary/20",
    },
    {
        id: "estados_financieros",
        title: "Estados Financieros",
        desc: "Dictamen sobre la integridad y correcta medición de activos, pasivos y patrimonio corporativo.",
        icon: Scale,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
        id: "origen_fondos",
        title: "Origen de Fondos",
        desc: "Acredita la lícita procedencia de capitales para la adquisición de activos de alto valor.",
        icon: Coins,
        color: "text-amber-500",
        bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
        id: "especiales",
        title: "Certificaciones Especiales",
        desc: "Informes técnicos sobre cumplimiento tributario, saldos específicos u obligaciones laborales.",
        icon: ShieldCheck,
        color: "text-primary",
        bg: "bg-primary/10 border-primary/20",
    }
];

export default function CertificacionesContablesPage() {
    const { toast } = useToast();
    const [step, setStep] = useState<'hub' | 'form'>('hub');
    const [selectedType, setSelectedType] = useState<any>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [formData, setFormData] = useState({
        titular: "",
        rif: "",
        monto: 0,
        motivo: "",
    });

    const handleSelectProtocol = (protocol: any) => {
        setSelectedType(protocol);
        setStep('form');
    };

    const handleGenerate = async () => {
        if (!formData.titular || !formData.rif) {
            toast({ variant: "destructive", title: "Datos incompletos", description: "Complete el titular y el RIF." });
            return;
        }
        setIsGenerating(true);
        try {
            const res = await fetch("/api/solicitudes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    categoria: "contabilidad",
                    subcategoria: "certificacion_contable",
                    descripcion: `Certificación contable: ${selectedType?.title || 'general'}`,
                    metadata: { tipo: selectedType?.id, titular: formData.titular, rif: formData.rif, monto: formData.monto, motivo: formData.motivo }
                }),
            });
            if (res.ok) {
                toast({ title: "Solicitud registrada", description: "La certificación ha sido solicitada exitosamente." });
                setStep('hub');
                setFormData({ titular: "", rif: "", monto: 0, motivo: "" });
            } else {
                toast({ variant: "destructive", title: "Error", description: "No se pudo generar la certificación." });
            }
        } catch {
            toast({ variant: "destructive", title: "Error de conexión" });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad" label="Contabilidad" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
                        <FileSignature className="h-3.5 w-3.5" /> Centro de Fe Pública
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Certificaciones <span className="text-primary">Contables</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Atestiguamiento técnico · Validación institucional · VEN-NIF</p>
                </div>
            </header>

            {step === 'hub' && (
                <div className="grid gap-6 md:grid-cols-2">
                    {certProtocols.map((protocol) => (
                        <Card
                            key={protocol.id}
                            onClick={() => handleSelectProtocol(protocol)}
                            className="rounded-2xl border cursor-pointer group hover:bg-muted/30 transition-colors"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className={cn("p-3 rounded-xl border", protocol.bg)}>
                                        <protocol.icon className={cn("h-6 w-6", protocol.color)} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-bold group-hover:text-primary transition-colors">{protocol.title}</h3>
                                        <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{protocol.desc}</p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0 mt-1" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {step === 'form' && (
                <Card className="rounded-2xl border shadow-lg max-w-2xl mx-auto">
                    <CardHeader className="p-6 border-b flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-base font-bold">Solicitar Certificación</CardTitle>
                            <CardDescription className="text-xs text-muted-foreground mt-0.5">{selectedType?.title}</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setStep('hub')} className="h-8 w-8 rounded-full">
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground">Titular del Certificado</Label>
                                <Input
                                    value={formData.titular}
                                    onChange={e => setFormData({...formData, titular: e.target.value})}
                                    placeholder="Razón social o nombre completo"
                                    className="h-11 rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground">Identificación / RIF</Label>
                                <Input
                                    value={formData.rif}
                                    onChange={e => setFormData({...formData, rif: e.target.value})}
                                    placeholder="J-00000000-0"
                                    className="h-11 rounded-xl font-mono"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground">Monto de Validación (Bs.)</Label>
                                <Input
                                    type="number"
                                    value={formData.monto || ''}
                                    onChange={e => setFormData({...formData, monto: Number(e.target.value)})}
                                    placeholder="0.00"
                                    className="h-11 rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground">Destino / Motivo</Label>
                                <Input
                                    value={formData.motivo}
                                    onChange={e => setFormData({...formData, motivo: e.target.value})}
                                    placeholder="Ej: Solicitud de crédito bancario"
                                    className="h-11 rounded-xl"
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="p-6 border-t flex justify-center">
                        <Button onClick={handleGenerate} className="rounded-xl px-8" disabled={isGenerating}>
                            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
                            Solicitar Certificación
                        </Button>
                    </CardFooter>
                </Card>
            )}

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-start gap-3">
                    <TriangleAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Aviso Legal</p>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                            Las certificaciones contables deben ser emitidas por un Contador Público Colegiado (CPC) conforme a las Normas VEN-NIF y las Normas Internacionales de Contabilidad (NIC). Este módulo facilita la solicitud y registro del proceso.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
