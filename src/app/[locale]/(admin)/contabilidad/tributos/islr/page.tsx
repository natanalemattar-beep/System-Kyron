"use client";

import { useState, useEffect } from "react";
import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Banknote, Calculator, Info, ChevronRight, FileText, Loader2, Inbox, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";

const CONCEPTOS_RETENCION = [
    { id: "honorarios", label: "Honorarios Profesionales", tasa: 3, base: "Art. 9, Decreto 1.808", sustraendo: true },
    { id: "arrendamiento", label: "Arrendamiento de Inmuebles", tasa: 3, base: "Art. 12, Decreto 1.808", sustraendo: false },
    { id: "comision", label: "Comisiones Mercantiles", tasa: 3, base: "Art. 9, Decreto 1.808", sustraendo: false },
    { id: "publicidad", label: "Publicidad y Propaganda", tasa: 3, base: "Art. 12, Decreto 1.808", sustraendo: false },
    { id: "servicios", label: "Servicios Profesionales (PJ)", tasa: 2, base: "Art. 9, Decreto 1.808", sustraendo: false },
    { id: "transporte", label: "Transporte de Carga", tasa: 1, base: "Art. 12, Decreto 1.808", sustraendo: false },
];

const TARIFAS_ISLR = [
    { rango: "Hasta 1.000 UT", tarifa: "6%", sustraendo: "0 UT", tipo: "Persona Natural" },
    { rango: "1.000 – 1.500 UT", tarifa: "9%", sustraendo: "30 UT", tipo: "Persona Natural" },
    { rango: "1.500 – 2.000 UT", tarifa: "12%", sustraendo: "75 UT", tipo: "Persona Natural" },
    { rango: "2.000 – 3.000 UT", tarifa: "16%", sustraendo: "155 UT", tipo: "Persona Natural" },
    { rango: "3.000 – 4.000 UT", tarifa: "20%", sustraendo: "275 UT", tipo: "Persona Natural" },
    { rango: "4.000 – 6.000 UT", tarifa: "24%", sustraendo: "435 UT", tipo: "Persona Natural" },
    { rango: "Más de 6.000 UT", tarifa: "34%", sustraendo: "1.035 UT", tipo: "Persona Natural" },
    { rango: "Hasta 2.000 UT", tarifa: "15%", sustraendo: "0 UT", tipo: "Persona Jurídica" },
    { rango: "2.000 – 3.000 UT", tarifa: "22%", sustraendo: "140 UT", tipo: "Persona Jurídica" },
    { rango: "Más de 3.000 UT", tarifa: "34%", sustraendo: "500 UT", tipo: "Persona Jurídica" },
];

const NOTAS = [
    "La declaración definitiva de ISLR vence el último día de marzo de cada año (personas naturales y jurídicas con cierre 31/dic).",
    "Los SPE enteras retenciones según el calendario SENIAT por terminal de RIF.",
    "El sustraendo se aplica solo a personas naturales residentes, según la tarifa progresiva del Art. 50 LISLR.",
    "Personas jurídicas aplican tarifa del Art. 52 LISLR: 15%, 22% o 34%.",
];

interface DeclaracionIslr {
    id: number;
    periodo: string;
    fecha: string;
    enriquecimiento: string;
    impuesto: string;
    anticipo: string;
    a_pagar: string;
    estado: string;
}

interface Retencion {
    id: number;
    fecha: string;
    proveedor: string;
    rif: string;
    base: string;
    pct: string;
    monto: string;
    comprobante: string;
}

export default function IslrPage() {
    const { toast } = useToast();
    const [base, setBase] = useState("");
    const [concepto, setConcepto] = useState("honorarios");
    const [retencion, setRetencion] = useState<number | null>(null);
    const [declaraciones, setDeclaraciones] = useState<DeclaracionIslr[]>([]);
    const [retenciones, setRetenciones] = useState<Retencion[]>([]);
    const [loadingDecl, setLoadingDecl] = useState(true);

    const conceptoActual = CONCEPTOS_RETENCION.find(c => c.id === concepto)!;

    useEffect(() => {
        Promise.all([
            fetch('/api/contabilidad/records?type=declaraciones_islr').then(r => r.ok ? r.json() : { rows: [] }),
            fetch('/api/contabilidad/records?type=retenciones').then(r => r.ok ? r.json() : { rows: [] }),
        ])
            .then(([d, r]) => {
                setDeclaraciones(d.rows ?? []);
                const allRetenciones: Array<Retencion & { tipo?: string }> = r.rows ?? [];
                setRetenciones(allRetenciones.filter(ret => ret.tipo === 'islr'));
            })
            .catch(() => {})
            .finally(() => setLoadingDecl(false));
    }, []);

    const handleCalculate = () => {
        const baseNum = parseFloat(base);
        if (!baseNum || baseNum <= 0) {
            toast({ variant: "destructive", title: "Monto inválido", description: "Introduce el monto de la factura." });
            return;
        }
        const result = baseNum * (conceptoActual.tasa / 100);
        setRetencion(result);
        toast({ title: "Cálculo completado", description: `Retención ${conceptoActual.tasa}%: ${formatCurrency(result, 'Bs.')}` });
    };

    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-3">
                        <Banknote className="h-3.5 w-3.5" /> ISLR
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                        Impuesto sobre la <span className="text-indigo-500">Renta</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Ley de ISLR (Decreto 2.163) · Retenciones (Decreto 1.808)</p>
                </div>
            </header>

            <Tabs defaultValue="calculadora" className="w-full">
                <TabsList className="flex h-12 bg-muted/50 border rounded-xl p-1 mb-8 max-w-lg">
                    <TabsTrigger value="calculadora" className="flex-1 rounded-lg font-bold text-xs data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Calculadora</TabsTrigger>
                    <TabsTrigger value="declaraciones" className="flex-1 rounded-lg font-bold text-xs data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Declaraciones</TabsTrigger>
                    <TabsTrigger value="tarifas" className="flex-1 rounded-lg font-bold text-xs data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Tarifas</TabsTrigger>
                </TabsList>

                <TabsContent value="calculadora" className="animate-in fade-in duration-500">
                    <div className="grid gap-6 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <Card className="rounded-2xl shadow-lg border">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                                        <Calculator className="h-5 w-5 text-indigo-500" />
                                        Simulador de Retención ISLR
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold text-muted-foreground">Monto de la Factura (Bs.)</Label>
                                        <Input type="number" placeholder="0.00" value={base} onChange={e => { setBase(e.target.value); setRetencion(null); }} className="h-12 rounded-xl font-bold text-lg" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold text-muted-foreground">Concepto de Retención</Label>
                                        <Select value={concepto} onValueChange={(v) => { setConcepto(v); setRetencion(null); }}>
                                            <SelectTrigger className="h-12 rounded-xl font-semibold"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                {CONCEPTOS_RETENCION.map(c => (
                                                    <SelectItem key={c.id} value={c.id} className="font-semibold">
                                                        {c.label} ({c.tasa}%)
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3">
                                        <Info className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold">{conceptoActual.label} — Tasa: {conceptoActual.tasa}%</p>
                                            <p className="text-[10px] text-muted-foreground mt-0.5">{conceptoActual.base}</p>
                                        </div>
                                    </div>

                                    <Button onClick={handleCalculate} className="w-full h-12 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700">
                                        <Calculator className="mr-2 h-4 w-4" />
                                        Simular Retención
                                    </Button>

                                    {retencion !== null && (
                                        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <div className="flex justify-between items-center py-3 border-b">
                                                <span className="text-xs font-bold text-muted-foreground">Monto a Retener ({conceptoActual.tasa}%)</span>
                                                <span className="font-black text-indigo-500">{formatCurrency(retencion, 'Bs.')}</span>
                                            </div>
                                            <div className="p-5 rounded-xl bg-indigo-500/5 border border-indigo-500/15">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">Neto a Pagar al Proveedor</p>
                                                    </div>
                                                    <span className="text-2xl font-black text-indigo-500">{formatCurrency(parseFloat(base) - retencion, 'Bs.')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div className="lg:col-span-5 space-y-6">
                            <Card className="rounded-2xl shadow-lg border">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                        <FileText className="h-4 w-4 text-indigo-500" />
                                        Conceptos de Retención
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2.5">
                                    {CONCEPTOS_RETENCION.map(c => (
                                        <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                            <div>
                                                <p className="text-xs font-bold">{c.label}</p>
                                                <p className="text-[10px] text-muted-foreground">{c.base}</p>
                                            </div>
                                            <span className="text-sm font-black text-indigo-500">{c.tasa}%</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {retenciones.length > 0 && (
                                <Card className="rounded-2xl shadow-lg border">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                            <Banknote className="h-4 w-4 text-indigo-500" />
                                            Retenciones ISLR Registradas
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {retenciones.slice(0, 5).map(r => (
                                            <div key={r.id} className="flex items-center justify-between p-2.5 rounded-lg bg-indigo-500/5">
                                                <div>
                                                    <p className="text-[11px] font-semibold">{r.proveedor || 'Proveedor'}</p>
                                                    <p className="text-[10px] text-muted-foreground">{r.fecha} · {r.comprobante || 'Sin comprobante'}</p>
                                                </div>
                                                <span className="text-xs font-black text-indigo-500">{formatCurrency(parseFloat(r.monto) || 0, 'Bs.')}</span>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            )}

                            <Card className="rounded-2xl shadow-lg border">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                        <Info className="h-4 w-4 text-amber-500" />
                                        Notas Importantes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2.5">
                                    {NOTAS.map((nota, i) => (
                                        <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                                            <ChevronRight className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                                            <p className="text-[11px] text-muted-foreground leading-relaxed">{nota}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Button variant="outline" asChild className="w-full h-11 rounded-xl text-xs font-bold">
                                <Link href="/contabilidad/tributos/retenciones-islr">
                                    Gestionar Retenciones ISLR <ChevronRight className="ml-1 h-3.5 w-3.5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="declaraciones" className="animate-in fade-in duration-500">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Clock className="h-4 w-4 text-indigo-500" />
                                Declaraciones de ISLR
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loadingDecl ? (
                                <div className="flex items-center justify-center py-12 gap-2 text-muted-foreground">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="text-xs">Cargando declaraciones...</span>
                                </div>
                            ) : declaraciones.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2">
                                    <Inbox className="h-8 w-8" />
                                    <p className="text-xs font-bold">No tiene declaraciones de ISLR registradas</p>
                                    <p className="text-[10px] text-muted-foreground/70">Las declaraciones aparecerán al registrarlas en el sistema.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {declaraciones.map(d => (
                                        <div key={d.id} className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <p className="text-sm font-bold">Ejercicio Fiscal: {d.periodo}</p>
                                                    <p className="text-[10px] text-muted-foreground">{d.fecha || 'Sin fecha de declaración'}</p>
                                                </div>
                                                <Badge className={cn("text-[9px] font-bold border-none",
                                                    d.estado === 'pagado' ? 'bg-emerald-500/10 text-emerald-500' :
                                                    d.estado === 'declarado' ? 'bg-blue-500/10 text-blue-500' :
                                                    'bg-amber-500/10 text-amber-500'
                                                )}>{d.estado}</Badge>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                                                <div>
                                                    <p className="text-[10px] text-muted-foreground">Enriquecimiento</p>
                                                    <p className="text-xs font-bold">{formatCurrency(parseFloat(d.enriquecimiento) || 0, 'Bs.')}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-muted-foreground">Impuesto</p>
                                                    <p className="text-xs font-bold">{formatCurrency(parseFloat(d.impuesto) || 0, 'Bs.')}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-muted-foreground">Anticipo</p>
                                                    <p className="text-xs font-bold">{formatCurrency(parseFloat(d.anticipo) || 0, 'Bs.')}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-muted-foreground">A Pagar</p>
                                                    <p className="text-xs font-black text-indigo-500">{formatCurrency(parseFloat(d.a_pagar) || 0, 'Bs.')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="tarifas" className="animate-in fade-in duration-500">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card className="rounded-2xl shadow-lg border">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-bold">Tarifa N° 1 — Personas Naturales (Art. 50 LISLR)</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {TARIFAS_ISLR.filter(t => t.tipo === "Persona Natural").map((t, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                                        <div>
                                            <p className="text-xs font-bold">{t.rango}</p>
                                            <p className="text-[10px] text-muted-foreground">Sustraendo: {t.sustraendo}</p>
                                        </div>
                                        <span className="text-lg font-black text-indigo-500">{t.tarifa}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl shadow-lg border">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-bold">Tarifa N° 2 — Personas Jurídicas (Art. 52 LISLR)</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {TARIFAS_ISLR.filter(t => t.tipo === "Persona Jurídica").map((t, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                                        <div>
                                            <p className="text-xs font-bold">{t.rango}</p>
                                            <p className="text-[10px] text-muted-foreground">Sustraendo: {t.sustraendo}</p>
                                        </div>
                                        <span className="text-lg font-black text-indigo-500">{t.tarifa}</span>
                                    </div>
                                ))}
                                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 mt-4">
                                    <div className="flex items-start gap-2.5">
                                        <Info className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                                        <p className="text-[11px] text-muted-foreground">Los valores están expresados en Unidades Tributarias (UT). El valor de la UT es fijado por el SENIAT anualmente.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
