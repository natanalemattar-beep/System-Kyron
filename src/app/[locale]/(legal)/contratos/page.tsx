"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { FileSignature, Search, Download, Plus, Eye, Clock, CheckCircle, AlertCircle, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "@/navigation";
import { formatDate } from "@/lib/utils";

const contratos = [
    { id: "CONT-2026-001", titulo: "Contrato de Prestación de Servicios", parte: "TechSolutions C.A.", tipo: "Servicios", estado: "Vigente", fecha: "2026-01-15", vencimiento: "2026-12-31" },
    { id: "CONT-2026-002", titulo: "Contrato de Arrendamiento Comercial", parte: "Inmuebles Caracas S.R.L.", tipo: "Arrendamiento", estado: "Vigente", fecha: "2026-02-01", vencimiento: "2027-01-31" },
    { id: "CONT-2025-018", titulo: "Acuerdo de Confidencialidad NDA", parte: "Proveedor Externo", tipo: "NDA", estado: "Vencido", fecha: "2025-06-01", vencimiento: "2025-12-01" },
    { id: "CONT-2026-003", titulo: "Contrato de Suministro de Materiales", parte: "Distribuidora Nacional", tipo: "Suministro", estado: "En revisión", fecha: "2026-03-01", vencimiento: "2026-09-30" },
];

const estadoColor: Record<string, string> = {
    "Vigente": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "Vencido": "bg-rose-500/20 text-rose-400 border-rose-500/30",
    "En revisión": "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

const estadoIcon: Record<string, typeof CheckCircle> = {
    "Vigente": CheckCircle,
    "Vencido": AlertCircle,
    "En revisión": Clock,
};

export default function ContratosPage() {
    const { toast } = useToast();
    const [search, setSearch] = useState("");

    const filtered = contratos.filter(c =>
        c.titulo.toLowerCase().includes(search.toLowerCase()) ||
        c.parte.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-10 pb-20 px-4 md:px-10">
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
            >
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
                        <FileSignature className="h-3 w-3" /> ARCHIVO JURÍDICO
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">
                        Archivo de <span className="text-primary italic">Contratos</span>
                    </h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">
                        Gestión Documental • Escritorio Jurídico 2026
                    </p>
                </div>
                <Button
                    asChild
                    className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[9px] uppercase tracking-widest"
                >
                    <Link href="/generador-documentos">
                        <Plus className="mr-2 h-4 w-4" /> NUEVO CONTRATO
                    </Link>
                </Button>
            </motion.header>

            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Contratos", value: contratos.length, color: "text-primary" },
                    { label: "Vigentes", value: contratos.filter(c => c.estado === "Vigente").length, color: "text-emerald-400" },
                    { label: "En Revisión", value: contratos.filter(c => c.estado === "En revisión").length, color: "text-amber-400" },
                    { label: "Vencidos", value: contratos.filter(c => c.estado === "Vencido").length, color: "text-rose-400" },
                ].map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                        <Card className="glass-card border-none bg-card/40 p-5 rounded-2xl text-center">
                            <p className={`text-3xl font-black italic ${s.color}`}>{s.value}</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 mt-1">{s.label}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                <Input
                    placeholder="Buscar por título, contraparte o código..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-11 h-12 rounded-xl bg-card/50 border-border/40 text-sm"
                />
            </div>

            {/* Contracts list */}
            <div className="space-y-4">
                {filtered.map((contrato, i) => {
                    const Icon = estadoIcon[contrato.estado] ?? CheckCircle;
                    return (
                        <motion.div
                            key={contrato.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * i }}
                        >
                            <Card className="glass-card border-none bg-card/40 rounded-2xl overflow-hidden hover:bg-card/60 transition-all group">
                                <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-start gap-5">
                                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 mt-0.5 shrink-0">
                                            <FileSignature className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-black uppercase tracking-tight text-foreground/90">{contrato.titulo}</p>
                                            <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{contrato.id} • {contrato.parte}</p>
                                            <div className="flex items-center gap-2 flex-wrap mt-1">
                                                <Badge className={`text-[8px] font-black uppercase tracking-widest border h-6 ${estadoColor[contrato.estado] ?? ""}`}>
                                                    <Icon className="mr-1 h-2.5 w-2.5" /> {contrato.estado}
                                                </Badge>
                                                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest h-6 border-border/40">
                                                    {contrato.tipo}
                                                </Badge>
                                                <span className="text-[8px] text-muted-foreground/40 font-bold uppercase tracking-widest">
                                                    Vence: {contrato.vencimiento}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-9 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest"
                                            onClick={() => toast({ title: "CONTRATO DESCARGADO", description: `${contrato.id} — PDF generado.` })}
                                        >
                                            <Download className="mr-1.5 h-3 w-3" /> PDF
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="h-9 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest btn-3d-primary"
                                            onClick={() => toast({ title: "VISTA PREVIA", description: `Abriendo ${contrato.titulo}` })}
                                        >
                                            <Eye className="mr-1.5 h-3 w-3" /> VER
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
                {filtered.length === 0 && (
                    <div className="text-center py-16">
                        <FileSignature className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                        <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/40">No se encontraron contratos</p>
                    </div>
                )}
            </div>
        </div>
    );
}
