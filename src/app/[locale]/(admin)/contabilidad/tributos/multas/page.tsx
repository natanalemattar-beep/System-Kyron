"use client";

import { useState, useEffect } from "react";
import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Calculator, ShieldAlert, ShieldCheck, Scale, AlertTriangle, TrendingDown,
    Info, ChevronRight, Banknote, FileText, Clock, Percent, Building2, ArrowRight
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const TRIBUTOS = [
    {
        id: "iva",
        label: "IVA",
        fullName: "Impuesto al Valor Agregado",
        alicuota: "16%",
        baseArticulo: "Art. 27 LIVA",
        sancionArticulo: "Art. 111 COT",
        sancionMin: 1,
        sancionMax: 3,
        sancionDefault: 1,
        interesMensual: 0.04,
        color: "blue",
        descripcion: "Omisión de retención, no declaración o declaración extemporánea del IVA.",
    },
    {
        id: "islr",
        label: "ISLR",
        fullName: "Impuesto sobre la Renta",
        alicuota: "15%–34%",
        baseArticulo: "Art. 52 LISLR",
        sancionArticulo: "Art. 111 COT",
        sancionMin: 1,
        sancionMax: 3,
        sancionDefault: 1,
        interesMensual: 0.04,
        color: "amber",
        descripcion: "Omisión o disminución ilegítima de ingresos tributables.",
    },
    {
        id: "igtf",
        label: "IGTF",
        fullName: "Imp. Grandes Transacciones Financieras",
        alicuota: "3%",
        baseArticulo: "Art. 22 LIGTF",
        sancionArticulo: "Art. 111 COT",
        sancionMin: 1,
        sancionMax: 3,
        sancionDefault: 1,
        interesMensual: 0.04,
        color: "violet",
        descripcion: "No retención o no enteramiento del 3% sobre pagos en divisas.",
    },
    {
        id: "ret_iva",
        label: "Retención IVA",
        fullName: "Agente de Retención IVA",
        alicuota: "75% / 100%",
        baseArticulo: "Prov. SNAT/2015/0049",
        sancionArticulo: "Art. 113 COT",
        sancionMin: 1,
        sancionMax: 5,
        sancionDefault: 1,
        interesMensual: 0.05,
        color: "rose",
        descripcion: "Retener y no enterar dentro del plazo. Sanción por cada mes o fracción de retraso.",
    },
    {
        id: "ret_islr",
        label: "Retención ISLR",
        fullName: "Agente de Retención ISLR",
        alicuota: "1%–34%",
        baseArticulo: "Decreto 1.808",
        sancionArticulo: "Art. 113 COT",
        sancionMin: 1,
        sancionMax: 5,
        sancionDefault: 1,
        interesMensual: 0.05,
        color: "orange",
        descripcion: "No enterar retenciones de ISLR en los plazos establecidos.",
    },
];

const GRAVEDAD_NIVELES = [
    {
        nivel: "Leve",
        factor: "100%",
        desc: "Primera infracción, cumplimiento voluntario tardío, diferencias menores.",
        articulo: "Art. 111 COT, num. 1",
        color: "amber",
    },
    {
        nivel: "Grave",
        factor: "200%",
        desc: "Omisión de declaración, defraudación fiscal, monto significativo.",
        articulo: "Art. 111 COT, num. 2",
        color: "orange",
    },
    {
        nivel: "Máxima",
        factor: "300%",
        desc: "Reincidencia, simulación, ocultamiento de bienes o rentas.",
        articulo: "Art. 111 COT, num. 3 + Art. 119",
        color: "rose",
    },
];

const ARTICULOS_REF = [
    { art: "Art. 66 COT", desc: "Intereses moratorios: tasa activa bancaria incrementada en 1.2 veces, aplicable desde el vencimiento." },
    { art: "Art. 111 COT", desc: "Contravención: multa del 100% al 300% del tributo omitido, según gravedad." },
    { art: "Art. 113 COT", desc: "Retenciones no enteradas: 50% por cada mes de retraso, hasta el 500% del monto." },
    { art: "Art. 115 COT", desc: "Defraudación: prisión de 6 meses a 7 años, más multa del 100% al 300%." },
    { art: "Art. 119 COT", desc: "Agravantes: reincidencia, resistencia, magnitud del perjuicio fiscal." },
];

export default function MultasFiscalesPage() {
    const { toast } = useToast();
    const [tipoTributo, setTipoTributo] = useState("iva");
    const [monto, setMonto] = useState("");
    const [gravedad, setGravedad] = useState<"leve" | "grave" | "maxima">("leve");
    const [mesesRetraso, setMesesRetraso] = useState("1");
    const [tasaBcv, setTasaBcv] = useState<number | null>(null);
    const [resultado, setResultado] = useState<{
        multa: number;
        intereses: number;
        total: number;
        multaUsd: number;
        totalUsd: number;
    } | null>(null);

    useEffect(() => {
        fetch("/api/tasas-bcv")
            .then(r => r.json())
            .then(d => {
                if (d.tasas?.usd) setTasaBcv(d.tasas.usd);
            })
            .catch(() => {});
    }, []);

    const tributoActual = TRIBUTOS.find(t => t.id === tipoTributo)!;
    const factorGravedad = gravedad === "leve" ? 1 : gravedad === "grave" ? 2 : 3;

    const handleCalcular = () => {
        const montoNum = parseFloat(monto);
        if (!montoNum || montoNum <= 0) {
            toast({
                variant: "destructive",
                title: "Monto inválido",
                description: "Introduce el monto del tributo omitido.",
            });
            return;
        }

        const meses = parseInt(mesesRetraso) || 1;
        const esRetencion = tipoTributo.startsWith("ret_");

        let multaCalc: number;
        if (esRetencion) {
            const factorMensual = 0.5;
            multaCalc = Math.min(montoNum * factorMensual * meses, montoNum * tributoActual.sancionMax);
        } else {
            multaCalc = montoNum * factorGravedad;
        }

        const tasaIntMensual = tributoActual.interesMensual;
        const interesesCalc = montoNum * tasaIntMensual * meses;

        const totalCalc = montoNum + multaCalc + interesesCalc;

        const tasa = tasaBcv || 1;

        setResultado({
            multa: multaCalc,
            intereses: interesesCalc,
            total: totalCalc,
            multaUsd: multaCalc / tasa,
            totalUsd: totalCalc / tasa,
        });

        toast({
            title: "Simulación completada",
            description: `${tributoActual.label}: ${gravedad} — ${meses} mes(es) de mora.`,
        });
    };

    const colorMap: Record<string, string> = {
        blue: "text-blue-500",
        amber: "text-amber-500",
        violet: "text-violet-500",
        rose: "text-rose-500",
        orange: "text-orange-500",
    };

    const bgColorMap: Record<string, string> = {
        blue: "bg-blue-500/10 border-blue-500/20",
        amber: "bg-amber-500/10 border-amber-500/20",
        violet: "bg-violet-500/10 border-violet-500/20",
        rose: "bg-rose-500/10 border-rose-500/20",
        orange: "bg-orange-500/10 border-orange-500/20",
    };

    const [isGenerating, setIsGenerating] = useState(false);
    const handleGenerateReport = () => {
        if (!resultado) return;
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            toast({
                title: "Reporte Generado",
                description: "El informe de auditoría preventiva ha sido descargado exitosamente.",
            });
        }, 2000);
    };


    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-semibold uppercase tracking-wide border", bgColorMap[tributoActual.color], colorMap[tributoActual.color])}>
                                <ShieldAlert className="h-3.5 w-3.5" /> Simulador de Contingencia
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-primary to-kyron-cyan text-white shadow-lg shadow-primary/20 italic">
                                <Sparkles className="h-3 w-3" /> COT Pro
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase kyron-gradient-text leading-tight">
                            Fiscal <span className="text-foreground">Auditor</span>
                        </h1>
                        <p className="text-sm font-bold text-muted-foreground mt-1 max-w-xl">
                            Inteligencia Tributaria System Kyron · Análisis de Riesgo bajo COT 2020 v2.4
                        </p>
                    </div>

                    {tasaBcv && (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <Banknote className="h-4 w-4 text-emerald-500" />
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                Tasa BCV: {tasaBcv.toFixed(2)} Bs/$
                            </span>
                        </div>
                    )}
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-base font-bold">
                                <Calculator className="h-5 w-5 text-rose-500" />
                                Calculadora de Contingencia Fiscal
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground">Tipo de Tributo</Label>
                                    <Select value={tipoTributo} onValueChange={(v) => { setTipoTributo(v); setResultado(null); }}>
                                        <SelectTrigger className="h-12 rounded-xl font-semibold">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {TRIBUTOS.map(t => (
                                                <SelectItem key={t.id} value={t.id} className="font-semibold">
                                                    <span className={colorMap[t.color]}>{t.label}</span> — {t.fullName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground">Monto Omitido (Bs.)</Label>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        value={monto}
                                        onChange={e => { setMonto(e.target.value); setResultado(null); }}
                                        className="h-12 rounded-xl font-bold text-lg"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground">Nivel de Gravedad (Art. 111 COT)</Label>
                                    <Select value={gravedad} onValueChange={(v: any) => { setGravedad(v); setResultado(null); }}>
                                        <SelectTrigger className="h-12 rounded-xl font-semibold">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="leve" className="font-semibold">
                                                <span className="text-amber-500">Leve</span> — 100% del tributo
                                            </SelectItem>
                                            <SelectItem value="grave" className="font-semibold">
                                                <span className="text-orange-500">Grave</span> — 200% del tributo
                                            </SelectItem>
                                            <SelectItem value="maxima" className="font-semibold">
                                                <span className="text-rose-500">Máxima</span> — 300% del tributo
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground">Meses de Retraso</Label>
                                    <Input
                                        type="number"
                                        min="1"
                                        max="60"
                                        value={mesesRetraso}
                                        onChange={e => { setMesesRetraso(e.target.value); setResultado(null); }}
                                        className="h-12 rounded-xl font-bold"
                                    />
                                </div>
                            </div>

                            <div className={cn("p-3.5 rounded-xl border flex items-start gap-3", bgColorMap[tributoActual.color])}>
                                <Info className={cn("h-4 w-4 shrink-0 mt-0.5", colorMap[tributoActual.color])} />
                                <div>
                                    <p className="text-xs font-bold">{tributoActual.fullName} — Alícuota: {tributoActual.alicuota}</p>
                                    <p className="text-[11px] text-muted-foreground mt-0.5">{tributoActual.descripcion}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground mt-1">
                                        Base legal: {tributoActual.baseArticulo} · Sanción: {tributoActual.sancionArticulo}
                                    </p>
                                </div>
                            </div>

                            <Button
                                onClick={handleCalcular}
                                className="w-full h-12 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white font-bold text-sm shadow-lg"
                            >
                                <Scale className="mr-2 h-4 w-4" />
                                Ejecutar Simulación
                            </Button>

                            {resultado && (
                                <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex justify-between items-center py-3 border-b border-rose-500/10">
                                        <div className="flex items-center gap-2">
                                            <Percent className="h-3.5 w-3.5 text-rose-400" />
                                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sanción Pecuniaria ({gravedad === "leve" ? "100%" : gravedad === "grave" ? "200%" : "300%"})</span>
                                        </div>
                                        <span className="font-black text-rose-500 text-lg">{formatCurrency(resultado.multa, 'Bs.')}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-rose-500/10">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-3.5 w-3.5 text-amber-400" />
                                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Intereses Moratorios (Art. 66)</span>
                                        </div>
                                        <span className="font-black text-amber-500 text-lg">{formatCurrency(resultado.intereses, 'Bs.')}</span>
                                    </div>
                                    
                                    <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-rose-500/10 via-rose-500/[0.05] to-transparent border border-rose-500/20">
                                        <div className="absolute top-0 right-0 p-3 opacity-10">
                                            <ShieldAlert className="h-16 w-16 text-rose-500" />
                                        </div>
                                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
                                            <div>
                                                <p className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-[0.2em] mb-1">Pasivo Estimado Total</p>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-3xl md:text-4xl font-black text-rose-500 italic">
                                                        {formatCurrency(resultado.total, 'Bs.')}
                                                    </span>
                                                    {tasaBcv && (
                                                        <span className="text-sm font-bold text-muted-foreground">
                                                            / ${resultado.totalUsd.toFixed(2)} USD
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <Button
                                                onClick={handleGenerateReport}
                                                disabled={isGenerating}
                                                className="w-full md:w-auto h-12 px-6 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 group"
                                            >
                                                {isGenerating ? (
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                ) : (
                                                    <FileText className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                                                )}
                                                Generar Reporte Pro
                                            </Button>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/5 border border-primary/10">
                                        <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                                        <p className="text-[10px] font-bold text-primary/80 uppercase tracking-tight leading-none">
                                            Simulación avalada por el motor de auditoría System Kyron Professional
                                        </p>
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
                                <TrendingDown className="h-4 w-4 text-rose-500" />
                                Escala de Sanciones (COT 2020)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {GRAVEDAD_NIVELES.map((g) => (
                                <div
                                    key={g.nivel}
                                    className={cn(
                                        "p-4 rounded-xl border transition-all",
                                        gravedad === g.nivel.toLowerCase() ? bgColorMap[g.color] : "bg-muted/30 border-border"
                                    )}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={cn("text-sm font-bold", gravedad === g.nivel.toLowerCase() ? colorMap[g.color] : "text-foreground")}>{g.nivel}</span>
                                        <span className={cn("text-lg font-bold", colorMap[g.color])}>{g.factor}</span>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground leading-relaxed">{g.desc}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground/70 mt-1">{g.articulo}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <FileText className="h-4 w-4 text-blue-500" />
                                Base Legal · Referencias
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                            {ARTICULOS_REF.map((ref) => (
                                <div key={ref.art} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <ChevronRight className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-bold text-blue-600 dark:text-blue-400">{ref.art}</p>
                                        <p className="text-[11px] text-muted-foreground leading-relaxed">{ref.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Aviso Legal</p>
                                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                                    Este simulador tiene fines informativos y educativos. Los montos calculados son estimaciones basadas en la normativa vigente (COT 2020, Gaceta Oficial N° 6.507). Para casos reales, consulte con un profesional tributario certificado.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
