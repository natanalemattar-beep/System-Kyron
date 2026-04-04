"use client";

import { useState, useEffect } from "react";
import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calculator, Info, Banknote, Percent, ChevronRight, Loader2, Inbox, Plus, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";

const ALICUOTAS = [
    { tipo: "General", tasa: 16, descripcion: "Aplicable a la mayoría de bienes y servicios.", base: "Art. 27 LIVA" },
    { tipo: "Reducida", tasa: 8, descripcion: "Alimentos, medicinas, transporte, bienes esenciales (según listado oficial).", base: "Art. 63 LIVA" },
    { tipo: "Adicional (Bienes de Lujo)", tasa: 15, descripcion: "Se suma a la alícuota general para bienes suntuarios.", base: "Art. 61 LIVA" },
    { tipo: "Exportaciones", tasa: 0, descripcion: "Alícuota 0% para exportaciones de bienes y servicios.", base: "Art. 25 LIVA" },
];

const RETENCIONES_IVA = [
    { concepto: "Contribuyentes Ordinarios", porcentaje: "75%", nota: "Del IVA facturado" },
    { concepto: "Contribuyentes No Domiciliados", porcentaje: "100%", nota: "Del IVA facturado" },
    { concepto: "Sin RIF (no inscrito)", porcentaje: "100%", nota: "Retención total" },
];

const FECHAS_REF = [
    "La declaración y pago del IVA es mensual.",
    "Sujetos Pasivos Especiales (SPE) declaran según calendario SENIAT por último dígito del RIF.",
    "El crédito fiscal tiene un período de 12 meses para ser aprovechado (Art. 33 LIVA).",
    "La factura electrónica es obligatoria desde la Providencia SNAT/2024/000013.",
];

interface DeclaracionIva {
    id: number;
    periodo: string;
    fecha: string;
    base: string;
    iva: string;
    credito: string;
    debito: string;
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

export default function IvaPage() {
    const { toast } = useToast();
    const [base, setBase] = useState("");
    const [alicuota, setAlicuota] = useState(16);
    const [iva, setIva] = useState<number | null>(null);
    const [tasaBcv, setTasaBcv] = useState<number | null>(null);
    const [declaraciones, setDeclaraciones] = useState<DeclaracionIva[]>([]);
    const [retenciones, setRetenciones] = useState<Retencion[]>([]);
    const [loadingDecl, setLoadingDecl] = useState(true);

    useEffect(() => {
        fetch("/api/tasas-bcv")
            .then(r => r.json())
            .then(d => { if (d.tasas?.usd) setTasaBcv(d.tasas.usd); })
            .catch(() => {});

        Promise.all([
            fetch('/api/contabilidad/records?type=declaraciones_iva').then(r => r.ok ? r.json() : { rows: [] }),
            fetch('/api/contabilidad/records?type=retenciones').then(r => r.ok ? r.json() : { rows: [] }),
        ])
            .then(([d, r]) => {
                setDeclaraciones(d.rows ?? []);
                const allRetenciones: Array<Retencion & { tipo?: string }> = r.rows ?? [];
                setRetenciones(allRetenciones.filter(ret => ret.tipo === 'iva'));
            })
            .catch(() => {})
            .finally(() => setLoadingDecl(false));
    }, []);

    const handleCalculate = () => {
        const baseNum = parseFloat(base);
        if (!baseNum || baseNum <= 0) {
            toast({ variant: "destructive", title: "Monto inválido", description: "Introduce los ingresos brutos del periodo." });
            return;
        }
        const result = baseNum * (alicuota / 100);
        setIva(result);
        toast({ title: "Cálculo completado", description: `IVA al ${alicuota}%: ${formatCurrency(result, 'Bs.')}` });
    };

    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
                        <FileText className="h-3.5 w-3.5" /> IVA
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                        Impuesto al <span className="text-primary">Valor Agregado</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Ley de IVA (G.O. 6.507 Extraordinario) · Alícuota general 16%</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-base font-bold">
                                <Calculator className="h-5 w-5 text-primary" />
                                Calculadora de Débito Fiscal
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-muted-foreground">Ingresos Brutos del Periodo (Bs.)</Label>
                                <Input type="number" placeholder="0.00" value={base} onChange={e => { setBase(e.target.value); setIva(null); }} className="h-12 rounded-xl font-bold text-lg" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-muted-foreground">Alícuota</Label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {ALICUOTAS.map(a => (
                                        <button
                                            key={a.tipo}
                                            onClick={() => { setAlicuota(a.tasa); setIva(null); }}
                                            className={`p-3 rounded-xl border text-center transition-all ${alicuota === a.tasa ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-muted/30 hover:bg-muted/50'}`}
                                        >
                                            <span className="text-lg font-black">{a.tasa}%</span>
                                            <span className="block text-[10px] font-bold text-muted-foreground mt-0.5">{a.tipo}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button onClick={handleCalculate} className="w-full h-12 rounded-xl font-bold text-sm">
                                <Calculator className="mr-2 h-4 w-4" />
                                Calcular Débito Fiscal
                            </Button>

                            {iva !== null && (
                                <div className="p-5 bg-primary/5 border border-primary/15 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-xs font-bold text-primary uppercase">IVA por Liquidar ({alicuota}%)</p>
                                            {tasaBcv && (
                                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                                    ≈ ${(iva / tasaBcv).toFixed(2)} USD
                                                </p>
                                            )}
                                        </div>
                                        <span className="text-2xl md:text-3xl font-black text-primary">{formatCurrency(iva, 'Bs.')}</span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Clock className="h-4 w-4 text-primary" />
                                Declaraciones de IVA
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loadingDecl ? (
                                <div className="flex items-center justify-center py-8 gap-2 text-muted-foreground">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="text-xs">Cargando declaraciones...</span>
                                </div>
                            ) : declaraciones.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground gap-2">
                                    <Inbox className="h-8 w-8" />
                                    <p className="text-xs font-bold">No tiene declaraciones de IVA registradas</p>
                                    <p className="text-[10px] text-muted-foreground/70">Las declaraciones aparecerán al registrarlas en el sistema.</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {declaraciones.map(d => (
                                        <div key={d.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                            <div>
                                                <p className="text-xs font-bold">{d.periodo}</p>
                                                <p className="text-[10px] text-muted-foreground">{d.fecha || 'Sin fecha'}</p>
                                            </div>
                                            <div className="text-right flex items-center gap-3">
                                                <div>
                                                    <p className="text-xs font-black">{formatCurrency(parseFloat(d.iva) || 0, 'Bs.')}</p>
                                                    <p className="text-[10px] text-muted-foreground">IVA Neto</p>
                                                </div>
                                                <Badge className={cn("text-[9px] font-bold border-none",
                                                    d.estado === 'pagado' ? 'bg-emerald-500/10 text-emerald-500' :
                                                    d.estado === 'declarado' ? 'bg-blue-500/10 text-blue-500' :
                                                    'bg-amber-500/10 text-amber-500'
                                                )}>{d.estado}</Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Percent className="h-4 w-4 text-primary" />
                                Alícuotas Vigentes (Ley de IVA)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {ALICUOTAS.map(a => (
                                <div key={a.tipo} className="p-3.5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-bold">{a.tipo}</span>
                                        <span className="text-lg font-black text-primary">{a.tasa}%</span>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground">{a.descripcion}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground/60 mt-1">{a.base}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Banknote className="h-4 w-4 text-blue-500" />
                                Retenciones IVA (Prov. 0049)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {RETENCIONES_IVA.map((r, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                                    <div>
                                        <p className="text-xs font-bold">{r.concepto}</p>
                                        <p className="text-[10px] text-muted-foreground">{r.nota}</p>
                                    </div>
                                    <span className="text-lg font-black text-blue-500">{r.porcentaje}</span>
                                </div>
                            ))}

                            {retenciones.length > 0 && (
                                <div className="mt-4 pt-4 border-t space-y-2">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Retenciones Registradas</p>
                                    {retenciones.slice(0, 5).map(r => (
                                        <div key={r.id} className="flex items-center justify-between p-2.5 rounded-lg bg-blue-500/5">
                                            <div>
                                                <p className="text-[11px] font-semibold">{r.proveedor || 'Proveedor'}</p>
                                                <p className="text-[10px] text-muted-foreground">{r.fecha} · {r.comprobante || 'Sin comprobante'}</p>
                                            </div>
                                            <span className="text-xs font-black text-blue-500">{formatCurrency(parseFloat(r.monto) || 0, 'Bs.')}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Button variant="outline" asChild className="w-full h-11 rounded-xl text-xs font-bold mt-2">
                                <Link href="/contabilidad/tributos/retenciones-iva">
                                    Gestionar Retenciones IVA <ChevronRight className="ml-1 h-3.5 w-3.5" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Info className="h-4 w-4 text-amber-500" />
                                Notas Importantes
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                            {FECHAS_REF.map((nota, i) => (
                                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                                    <ChevronRight className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-muted-foreground leading-relaxed">{nota}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {tasaBcv && (
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <div className="flex items-center gap-2">
                                <Banknote className="h-4 w-4 text-emerald-500" />
                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                    Tasa BCV: {tasaBcv.toFixed(2)} Bs/$
                                </span>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-1">
                                Las multas del COT se liquidan al TC oficial vigente al momento del pago.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
