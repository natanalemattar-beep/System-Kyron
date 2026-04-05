"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, UserPlus, Info, CircleCheck, ArrowRight, Download, ShieldCheck, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from '@/navigation';
import { motion } from "framer-motion";

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
        <div className="max-w-5xl mx-auto space-y-8">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" /> Volver al Dashboard
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-primary/[0.04] via-card to-card p-6 sm:p-8"
            >
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
                <div className="relative flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <FileText className="h-7 w-7 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Registro RIF — Carga Familiar</h1>
                        <p className="text-sm text-muted-foreground font-medium">Inscripción SENIAT para menores de edad</p>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/5 border border-emerald-500/15 text-[11px] font-bold uppercase tracking-widest text-emerald-500 mt-1">
                            <ShieldCheck className="h-3 w-3" /> Trámite gratuito
                        </span>
                    </div>
                </div>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card className="rounded-2xl border border-border/30 bg-card h-full">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                                    <Info className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-sm font-semibold">Importancia</CardTitle>
                                    <p className="text-[11px] text-muted-foreground">Beneficios y obligaciones</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-[13px] text-muted-foreground leading-relaxed">
                                La inscripción en el RIF de sus hijos permite la rebaja de impuestos en la declaración de ISLR y es requisito para transacciones bancarias, herencias y títulos de propiedad.
                            </p>
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                                <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <p className="text-[12px] font-medium text-foreground/70">Este trámite es de orden público y gratuito ante el SENIAT.</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    <Card className="rounded-2xl border border-border/30 bg-card h-full">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                                    <UserPlus className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-sm font-semibold">Recaudos Necesarios</CardTitle>
                                    <p className="text-[11px] text-muted-foreground">Documentos para la inscripción</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2.5">
                                {recaudos.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 p-3 rounded-xl bg-muted/20 border border-border/15">
                                        <CircleCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                        <span className="text-[12px] font-medium text-foreground/70">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="pt-0">
                            <Button variant="outline" className="w-full h-10 rounded-xl border-border/30 text-[10px] font-bold uppercase tracking-widest gap-2"
                                onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'natural', subcategoria: 'checklist_generado', descripcion: "Checklist generado" }) }); if (res.ok) toast({ title: "Checklist generado" }); else toast({ title: "Error", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}>
                                <Download className="h-3.5 w-3.5" /> Descargar Checklist
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="rounded-2xl border border-primary/20 bg-primary overflow-hidden">
                    <CardContent className="p-8 text-center space-y-4 relative">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.08]">
                            <ShieldCheck className="h-32 w-32 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-primary-foreground relative z-10">Asistente de Pre-Inscripción</h3>
                        <p className="text-sm text-primary-foreground/70 font-medium relative z-10">Llenado automático de la planilla digital SENIAT</p>
                        <Button variant="secondary" className="w-full h-12 rounded-xl font-bold text-sm gap-2 relative z-10">
                            Iniciar Llenado <ArrowRight className="h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
