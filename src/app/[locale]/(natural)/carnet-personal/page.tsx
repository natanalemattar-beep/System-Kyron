"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Heart, Download, QrCode, Activity, Stethoscope, Phone, AlertTriangle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth/context";
import { Link } from '@/navigation';

export default function CarnetPersonalPage() {
    const { toast } = useToast();
    const { user } = useAuth();
    const nombre = user?.nombre ?? "Usuario";

    const alergias = ["Penicilina", "Mariscos"];
    const medicamentos = ["Metformina 500mg", "Losartán 50mg"];
    const contactos = [
        { nombre: "Contacto de Emergencia", tel: "0412-XXX-XXXX", relacion: "Familiar" },
    ];

    return (
        <div className="space-y-8 pb-20 max-w-4xl mx-auto">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" /> Volver al Dashboard
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-rose-500/[0.04] via-card to-card p-6 sm:p-8"
            >
                <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
                <div className="relative flex flex-col sm:flex-row items-start justify-between gap-5">
                    <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                            <Heart className="h-7 w-7 text-rose-500" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Carnet de Salud</h1>
                            <p className="text-sm text-muted-foreground font-medium">Información médica, alergias y contactos de emergencia</p>
                        </div>
                    </div>
                    <Button variant="outline" className="h-10 px-5 rounded-xl text-[10px] font-bold uppercase tracking-widest gap-2 border-border/30 shrink-0"
                        onClick={() => toast({ title: "Carnet generado", description: "PDF listo para imprimir." })}>
                        <Download className="h-3.5 w-3.5" /> Descargar
                    </Button>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                className="max-w-md mx-auto"
            >
                <div className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-rose-500/15 via-card to-card border border-rose-500/15 p-6 space-y-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-rose-400/70">República Bolivariana de Venezuela</p>
                            <p className="text-[10px] font-medium text-muted-foreground/50 mt-0.5">Carnet de Salud Digital</p>
                        </div>
                        <Heart className="h-7 w-7 text-rose-500/40" />
                    </div>
                    <div>
                        <p className="text-xl font-bold tracking-tight text-foreground/90">{nombre}</p>
                        <p className="text-[10px] text-muted-foreground/50 font-medium mt-0.5">System Kyron — Portal Ciudadano</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-xl bg-muted/20 border border-border/20">
                            <p className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest">Tipo Sanguíneo</p>
                            <p className="text-xl font-bold text-rose-400 mt-1">O+</p>
                        </div>
                        <div className="p-3 rounded-xl bg-muted/20 border border-border/20">
                            <p className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest">Estado</p>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[11px] font-bold uppercase mt-1.5">Activo</Badge>
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-border/20 pt-4">
                        <p className="text-[11px] font-medium text-muted-foreground/30 uppercase tracking-widest">Válido 2026</p>
                        <QrCode className="h-7 w-7 text-muted-foreground/20" />
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                    <Card className="rounded-2xl border border-rose-500/15 bg-rose-500/[0.02] h-full">
                        <CardContent className="p-5 space-y-3">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/15 flex items-center justify-center">
                                    <AlertTriangle className="h-4 w-4 text-rose-400" />
                                </div>
                                <span className="text-[11px] font-semibold text-rose-400">Alergias</span>
                            </div>
                            {alergias.map(a => (
                                <div key={a} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/20 border border-border/15">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                    <span className="text-sm font-medium text-foreground/80">{a}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Card className="rounded-2xl border border-blue-500/15 bg-blue-500/[0.02] h-full">
                        <CardContent className="p-5 space-y-3">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center">
                                    <Activity className="h-4 w-4 text-blue-400" />
                                </div>
                                <span className="text-[11px] font-semibold text-blue-400">Medicamentos</span>
                            </div>
                            {medicamentos.map(m => (
                                <div key={m} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/20 border border-border/15">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                    <span className="text-sm font-medium text-foreground/80">{m}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                    <Card className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.02] h-full">
                        <CardContent className="p-5 space-y-3">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center">
                                    <Phone className="h-4 w-4 text-emerald-400" />
                                </div>
                                <span className="text-[11px] font-semibold text-emerald-400">Emergencias</span>
                            </div>
                            {contactos.map(c => (
                                <div key={c.nombre} className="p-3 rounded-lg bg-muted/20 border border-border/15 space-y-1">
                                    <p className="text-sm font-medium text-foreground/90">{c.nombre}</p>
                                    <p className="text-[11px] text-muted-foreground">{c.tel}</p>
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">{c.relacion}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <div className="text-center max-w-md mx-auto">
                <Button className="h-11 px-8 rounded-xl text-[10px] font-bold uppercase tracking-widest gap-2 w-full"
                    onClick={() => toast({ title: "Actualizar datos", description: "Formulario de actualización médica abierto." })}>
                    <Stethoscope className="h-3.5 w-3.5" /> Actualizar Información Médica
                </Button>
            </div>
        </div>
    );
}
