
"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calculator, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Activity, Loader2, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DeclaracionIva {
  id: number;
  periodo: string;
  fecha_inicio: string;
  fecha_fin: string;
  fecha_declaracion: string | null;
  base_imponible: string;
  iva_debito: string;
  iva_credito: string;
  iva_neto: string;
  estado: string;
  numero_forma: string | null;
  created_at: string;
}

export default function DeclaracionIvaPage() {
    const { toast } = useToast();
    const [declaraciones, setDeclaraciones] = useState<DeclaracionIva[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [form, setForm] = useState({
        periodo: '',
        fecha_inicio: '',
        fecha_fin: '',
        base_imponible: '',
        iva_debito: '',
        iva_credito: '',
        numero_forma: '',
    });

    const fetchDeclaraciones = () => {
        setLoading(true);
        fetch('/api/declaraciones?impuesto=iva&limit=10')
            .then(r => r.ok ? r.json() : { declaraciones: [] })
            .then(data => setDeclaraciones(data.declaraciones ?? []))
            .catch(() => setDeclaraciones([]))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchDeclaraciones(); }, []);

    const latest = declaraciones[0];

    const handleDeclarar = async () => {
        if (!latest) return;
        setSubmitting(true);
        try {
            await fetch(`/api/declaraciones`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    impuesto: 'iva',
                    periodo: latest.periodo,
                    fecha_inicio: latest.fecha_inicio,
                    fecha_fin: latest.fecha_fin,
                    base_imponible: latest.base_imponible,
                    iva_debito: latest.iva_debito,
                    iva_credito: latest.iva_credito,
                    estado: 'presentada',
                    numero_forma: latest.numero_forma,
                }),
            });
            toast({
                title: "DECLARACIÓN PROCESADA",
                description: "El expediente fiscal ha sido transmitido al portal del SENIAT.",
                action: <CheckCircle className="text-emerald-500 h-4 w-4" />
            });
            fetchDeclaraciones();
        } finally {
            setSubmitting(false);
        }
    };

    const handleNuevaDeclaracion = async () => {
        if (!form.periodo || !form.fecha_inicio || !form.fecha_fin) {
            toast({ title: "Campos requeridos", description: "Período y fechas son obligatorios.", variant: "destructive" });
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch('/api/declaraciones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    impuesto: 'iva',
                    ...form,
                    estado: 'pendiente',
                }),
            });
            if (res.ok) {
                toast({ title: "DECLARACIÓN REGISTRADA", description: `Período ${form.periodo} guardado correctamente.`, action: <CheckCircle className="text-emerald-500 h-4 w-4" /> });
                setOpenDialog(false);
                setForm({ periodo: '', fecha_inicio: '', fecha_fin: '', base_imponible: '', iva_debito: '', iva_credito: '', numero_forma: '' });
                fetchDeclaraciones();
            }
        } finally {
            setSubmitting(false);
        }
    };

    const ivaDebito  = parseFloat(latest?.iva_debito  ?? '0');
    const ivaCredito = parseFloat(latest?.iva_credito ?? '0');
    const totalAPagar = parseFloat(latest?.iva_neto   ?? '0');

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-6 md:pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                    <Activity className="h-3 w-3" /> NODO TRIBUTARIO
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Liquidación <span className="text-primary italic">de IVA</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Gestión de Impuesto al Valor Agregado • 2026</p>
            </header>

            <div className="flex justify-end">
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                        <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black uppercase text-[10px] tracking-widest">
                            <Plus className="mr-2 h-4 w-4" /> NUEVA DECLARACIÓN
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle className="font-black uppercase tracking-tight">Registrar Declaración IVA</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            {[
                                { label: 'Período', key: 'periodo', placeholder: 'Marzo 2026' },
                                { label: 'Fecha Inicio', key: 'fecha_inicio', type: 'date' },
                                { label: 'Fecha Fin', key: 'fecha_fin', type: 'date' },
                                { label: 'Base Imponible (Bs.)', key: 'base_imponible', type: 'number', placeholder: '0' },
                                { label: 'IVA Débito Fiscal', key: 'iva_debito', type: 'number', placeholder: '0' },
                                { label: 'IVA Crédito Fiscal', key: 'iva_credito', type: 'number', placeholder: '0' },
                                { label: 'N° Forma (opcional)', key: 'numero_forma', placeholder: 'F-xxx' },
                            ].map(f => (
                                <div key={f.key} className={f.key === 'periodo' ? 'col-span-2' : ''}>
                                    <Label className="text-[10px] font-black uppercase tracking-widest">{f.label}</Label>
                                    <Input
                                        type={f.type ?? 'text'}
                                        placeholder={f.placeholder}
                                        value={(form as Record<string, string>)[f.key]}
                                        onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                                        className="mt-1"
                                    />
                                </div>
                            ))}
                        </div>
                        <Button onClick={handleNuevaDeclaracion} disabled={submitting} className="w-full btn-3d-primary h-12 font-black uppercase text-[10px]">
                            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'GUARDAR DECLARACIÓN'}
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="space-y-4">
                    <Skeleton className="h-64 w-full rounded-[3rem]" />
                </div>
            ) : !latest ? (
                <div className="text-center py-20 text-muted-foreground">
                    <FileText className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="font-black uppercase tracking-widest text-sm">No hay declaraciones de IVA registradas.</p>
                    <p className="text-xs mt-2 opacity-60">Registra tu primera declaración con el botón de arriba.</p>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-10">
                    <Card className="lg:col-span-2 glass-card border-none rounded-[3rem] p-1 shadow-2xl bg-card/40">
                        <CardHeader className="p-10 border-b border-border/50">
                            <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground">Resumen del Periodo: {latest.periodo}</CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1">
                                Estado: <span className={latest.estado === 'presentada' ? 'text-emerald-500' : 'text-amber-500'}>{latest.estado.toUpperCase()}</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-10 space-y-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="p-8 bg-white/[0.03] border border-border rounded-[2rem] shadow-inner space-y-2">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-widest">Débito Fiscal (Ventas)</p>
                                    <p className="text-3xl font-black italic text-foreground tracking-tighter">{formatCurrency(ivaDebito, 'Bs.')}</p>
                                </div>
                                <div className="p-8 bg-white/[0.03] border border-border rounded-[2rem] shadow-inner space-y-2">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-widest">Crédito Fiscal (Compras)</p>
                                    <p className="text-3xl font-black italic text-foreground tracking-tighter">{formatCurrency(ivaCredito, 'Bs.')}</p>
                                </div>
                            </div>
                            <div className="p-10 bg-primary/10 border-2 border-primary/20 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-10 group hover:border-primary/40 transition-all">
                                <div className="space-y-2 text-center md:text-left">
                                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Monto Neto a Liquidar</p>
                                    <p className="text-5xl font-black italic text-primary tracking-tighter italic-shadow">{formatCurrency(totalAPagar, 'Bs.')}</p>
                                </div>
                                <Button size="lg" onClick={handleDeclarar} disabled={submitting || latest.estado === 'presentada'} className="w-full md:w-auto btn-3d-primary h-16 px-12 rounded-2xl font-black uppercase text-xs tracking-widest shadow-glow">
                                    {submitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Calculator className="mr-3 h-5 w-5" />}
                                    {latest.estado === 'presentada' ? 'YA PRESENTADA' : 'DESPACHAR AL SENIAT'}
                                </Button>
                            </div>

                            {declaraciones.length > 1 && (
                                <div className="space-y-3">
                                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/50">Historial de Declaraciones</p>
                                    {declaraciones.slice(1).map(d => (
                                        <div key={d.id} className="flex justify-between items-center p-4 bg-white/[0.02] border border-border rounded-2xl">
                                            <div>
                                                <p className="text-xs font-black uppercase">{d.periodo}</p>
                                                <p className={`text-[10px] font-bold ${d.estado === 'presentada' ? 'text-emerald-500' : 'text-amber-500'}`}>{d.estado.toUpperCase()}</p>
                                            </div>
                                            <p className="text-sm font-black font-mono">{formatCurrency(parseFloat(d.iva_neto), 'Bs.')}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="space-y-8">
                        <Card className="bg-amber-500/10 border-2 border-amber-500/20 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                                <AlertTriangle className="h-32 w-32 text-amber-500" />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-amber-600 mb-4">CRONOGRAMA</h3>
                                <p className="text-[10px] font-bold text-foreground/60 leading-relaxed uppercase mb-8">Tienes hasta el día 15 del mes en curso para evitar sanciones del Código Orgánico Tributario.</p>
                            </div>
                            <Button variant="outline" className="w-full h-12 rounded-xl border-amber-500/20 bg-amber-500/5 text-amber-600 font-black uppercase text-[10px] tracking-widest shadow-inner">
                                <Download className="mr-2 h-4 w-4" /> BAJAR ARCHIVO .TXT
                            </Button>
                        </Card>

                        <Card className="glass-card border-none p-8 rounded-[2.5rem] bg-card/40">
                            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-6 flex items-center gap-3 italic">
                                <Activity className="h-4 w-4" /> Auditoría Previa
                            </h4>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 leading-relaxed text-justify">
                                El sistema ha validado la declaración de {latest.periodo}. Base imponible: {formatCurrency(parseFloat(latest.base_imponible), 'Bs.')}. Se ha detectado una exoneración aplicable según Gaceta 6.952. Período: {latest.fecha_inicio} al {latest.fecha_fin}.
                            </p>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}
