"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Heart, Download, QrCode, Shield, Activity, Stethoscope, Phone, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth/context";

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
        <div className="space-y-8 pb-20 px-4 md:px-10">
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-l-4 border-primary pl-8 py-2 mt-10 flex justify-between items-start gap-6"
            >
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-rose-400 mb-3">
                        <Heart className="h-3 w-3" /> CARNET DE SALUD DIGITAL
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">
                        Carnet <span className="text-rose-400 italic">de Salud</span>
                    </h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">
                        Información Médica • Emergencias • IVSS
                    </p>
                </div>
                <Button
                    variant="outline"
                    className="h-12 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest"
                    onClick={() => toast({ title: "CARNET GENERADO", description: "PDF listo para imprimir." })}
                >
                    <Download className="mr-2 h-4 w-4" /> DESCARGAR
                </Button>
            </motion.header>

            {/* Digital Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-md mx-auto"
            >
                <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-br from-rose-500/20 via-card to-card/80 border border-rose-500/20 p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-rose-400 mb-1">REPÚBLICA BOLIVARIANA DE VENEZUELA</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Carnet de Salud Digital</p>
                        </div>
                        <Heart className="h-8 w-8 text-rose-500/50" />
                    </div>
                    <div>
                        <p className="text-2xl font-black uppercase tracking-tight text-foreground/90">{nombre}</p>
                        <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest mt-1">Sistema Kyron • Portal Ciudadano</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest">Tipo Sanguíneo</p>
                            <p className="text-2xl font-black text-rose-400">O+</p>
                        </div>
                        <div>
                            <p className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest">Estado</p>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[8px] font-black uppercase">Activo</Badge>
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                        <p className="text-[8px] font-bold text-muted-foreground/30 uppercase tracking-widest">Válido 2026</p>
                        <QrCode className="h-8 w-8 text-muted-foreground/20" />
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {/* Alergias */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Card className="glass-card border-none bg-rose-500/5 border border-rose-500/10 rounded-2xl h-full">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-rose-400" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-rose-400">Alergias</p>
                            </div>
                            {alergias.map(a => (
                                <p key={a} className="text-sm font-bold text-foreground/80 pl-2 border-l-2 border-rose-500/30">{a}</p>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Medicamentos */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <Card className="glass-card border-none bg-blue-500/5 border border-blue-500/10 rounded-2xl h-full">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-blue-400" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Medicamentos</p>
                            </div>
                            {medicamentos.map(m => (
                                <p key={m} className="text-sm font-bold text-foreground/80 pl-2 border-l-2 border-blue-500/30">{m}</p>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Emergencias */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <Card className="glass-card border-none bg-emerald-500/5 border border-emerald-500/10 rounded-2xl h-full">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-2">
                                <Phone className="h-5 w-5 text-emerald-400" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Emergencias</p>
                            </div>
                            {contactos.map(c => (
                                <div key={c.nombre}>
                                    <p className="text-sm font-black text-foreground/90">{c.nombre}</p>
                                    <p className="text-[10px] text-muted-foreground/60 font-bold">{c.tel}</p>
                                    <p className="text-[9px] text-emerald-400 font-black uppercase tracking-widest">{c.relacion}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <div className="text-center max-w-md mx-auto">
                <Button
                    className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[9px] uppercase tracking-widest w-full"
                    onClick={() => toast({ title: "ACTUALIZAR DATOS", description: "Formulario de actualización médica abierto." })}
                >
                    <Stethoscope className="mr-2 h-4 w-4" /> ACTUALIZAR INFORMACIÓN MÉDICA
                </Button>
            </div>
        </div>
    );
}
