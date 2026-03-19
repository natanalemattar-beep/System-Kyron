"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Signal, Download, Plus, Clock, CheckCircle, AlertCircle, RefreshCw, Shield, Wifi, Radio } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const licencias = [
    {
        id: "LIC-CONATEL-2024-0892",
        tipo: "Permiso de Operación ISP",
        descripcion: "Habilitación para prestación de servicios de acceso a internet de banda ancha.",
        estado: "Vigente",
        emision: "2024-01-15",
        vencimiento: "2026-01-15",
        categoria: "ISP",
        autoridad: "CONATEL",
        icon: Wifi,
    },
    {
        id: "LIC-CONATEL-2025-0120",
        tipo: "Licencia de Radiodifusión",
        descripcion: "Autorización para operar estación de radiodifusión sonora FM en frecuencia 98.3 MHz.",
        estado: "En Renovación",
        emision: "2022-03-01",
        vencimiento: "2025-03-01",
        categoria: "Radio",
        autoridad: "CONATEL",
        icon: Radio,
    },
    {
        id: "LIC-MPPTT-2025-0445",
        tipo: "Permiso VoIP Corporativo",
        descripcion: "Habilitación para operación de servicios de voz sobre protocolo de internet en entorno corporativo.",
        estado: "Vigente",
        emision: "2025-06-01",
        vencimiento: "2027-06-01",
        categoria: "VoIP",
        autoridad: "MPPTT",
        icon: Signal,
    },
];

const estadoStyle: Record<string, string> = {
    "Vigente": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "En Renovación": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "Vencida": "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

const tramites = [
    { label: "Nueva Habilitación ISP", icon: Wifi, desc: "Solicitar permiso de operación como proveedor de internet.", plazo: "60-90 días hábiles" },
    { label: "Renovación de Licencia", icon: RefreshCw, desc: "Renovar permisos próximos a vencer ante CONATEL.", plazo: "30-45 días hábiles" },
    { label: "Permiso Espectro RF", icon: Radio, desc: "Solicitud de frecuencias radioeléctricas asignadas.", plazo: "90-120 días hábiles" },
    { label: "Habilitación Corporativa", icon: Shield, desc: "Permiso de telecomunicaciones para red privada corporativa.", plazo: "20-30 días hábiles" },
];

export default function ConatelLicensesPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-10 pb-20 px-4 md:px-10">
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
            >
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
                        <Signal className="h-3 w-3" /> PORTAL CONATEL
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">
                        Permisos <span className="text-primary italic">CONATEL</span>
                    </h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">
                        Comisión Nacional de Telecomunicaciones • Habilitaciones 2026
                    </p>
                </div>
                <Button
                    className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[9px] uppercase tracking-widest"
                    onClick={() => toast({ title: "NUEVA SOLICITUD", description: "Formulario de solicitud CONATEL abierto. Complete los requisitos." })}
                >
                    <Plus className="mr-2 h-4 w-4" /> NUEVA SOLICITUD
                </Button>
            </motion.header>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Licencias Vigentes", value: licencias.filter(l => l.estado === "Vigente").length, color: "text-emerald-400" },
                    { label: "En Renovación", value: licencias.filter(l => l.estado === "En Renovación").length, color: "text-amber-400" },
                    { label: "Total Registros", value: licencias.length, color: "text-primary" },
                ].map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                        <Card className="glass-card border-none bg-card/40 p-5 rounded-2xl text-center">
                            <p className={`text-3xl font-black italic ${s.color}`}>{s.value}</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 mt-1">{s.label}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Licenses */}
            <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 ml-2">Licencias Activas</h3>
                {licencias.map((lic, i) => (
                    <motion.div
                        key={lic.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                    >
                        <Card className="glass-card border-none bg-card/40 rounded-2xl overflow-hidden hover:bg-card/60 transition-all">
                            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                                        <lic.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Badge className={`text-[8px] font-black uppercase tracking-widest border h-6 ${estadoStyle[lic.estado] ?? ""}`}>
                                                {lic.estado === "Vigente" ? <CheckCircle className="mr-1 h-2.5 w-2.5" /> : <Clock className="mr-1 h-2.5 w-2.5" />}
                                                {lic.estado}
                                            </Badge>
                                            <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest h-6 border-border/40">{lic.categoria}</Badge>
                                            <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest h-6 border-border/40">{lic.autoridad}</Badge>
                                        </div>
                                        <p className="text-sm font-black uppercase tracking-tight text-foreground/90">{lic.tipo}</p>
                                        <p className="text-[10px] text-muted-foreground/50 font-mono">{lic.id}</p>
                                        <p className="text-[10px] text-muted-foreground/60 font-medium">{lic.descripcion}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                                            Emisión: {lic.emision} • Vence: {lic.vencimiento}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-9 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest"
                                        onClick={() => toast({ title: "DESCARGA INICIADA", description: `Certificado ${lic.id} generado en PDF.` })}
                                    >
                                        <Download className="mr-1.5 h-3 w-3" /> PDF
                                    </Button>
                                    {lic.estado === "En Renovación" && (
                                        <Button
                                            size="sm"
                                            className="h-9 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest btn-3d-primary"
                                            onClick={() => toast({ title: "RENOVACIÓN INICIADA", description: "Expediente de renovación enviado a CONATEL." })}
                                        >
                                            <RefreshCw className="mr-1.5 h-3 w-3" /> RENOVAR
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* New Tramites */}
            <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 ml-2">Nuevos Trámites Disponibles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tramites.map((t, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
                            <Card className="glass-card border-none bg-card/40 rounded-2xl hover:bg-card/60 transition-all group cursor-pointer" onClick={() => toast({ title: t.label, description: `Plazo estimado: ${t.plazo}. Iniciando trámite...` })}>
                                <CardContent className="p-5 flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-105 transition-transform">
                                        <t.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[11px] font-black uppercase tracking-tight text-foreground/90">{t.label}</p>
                                        <p className="text-[10px] text-muted-foreground/60 font-medium mt-0.5">{t.desc}</p>
                                        <p className="text-[9px] font-bold text-primary/60 uppercase tracking-widest mt-1">Plazo: {t.plazo}</p>
                                    </div>
                                    <Signal className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary transition-colors" />
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
