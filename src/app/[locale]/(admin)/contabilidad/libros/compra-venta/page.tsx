
"use client";

import { useState } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    FileText, 
    PlusCircle, 
    FileDown, 
    ArrowLeft, 
    Landmark, 
    CheckCircle, 
    Activity, 
    ShieldCheck, 
    Terminal, 
    Filter,
    Info,
    AlertTriangle,
    Globe,
    Zap,
    Scale,
    Layers,
    History,
    FileSearch,
    BookOpen
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const mockVentas = [
  { fecha: "15/03/2026", factura: "V-001", cliente: "Tech Solutions LLC", rif: "J-12345678-9", base: 15000, iva: 2400, total: 17400, ret: 1800, status: "Conciliado" },
  { fecha: "14/03/2026", factura: "V-002", cliente: "Innovate Corp", rif: "J-98765432-1", base: 8500, iva: 1360, total: 9860, ret: 1020, status: "Sincronizado" },
];

export default function LibroCompraVentaPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("ventas");

  const handleExport = (format: string) => {
    toast({
        title: `GENERANDO ARCHIVO ${format}`,
        description: `Libro de ${activeTab.toUpperCase()} procesado para el periodo actual.`,
        action: <CheckCircle className="text-primary h-4 w-4" />
    });
  };

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <Landmark className="h-3 w-3" /> NODO FISCAL
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tighter italic leading-none italic-shadow text-white">Libros <span className="text-primary">Fiscales</span></h1>
          <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-[0.6em] opacity-40 mt-2 italic">Control de Compra y Venta • Sincronización SENIAT 2026</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground" onClick={() => handleExport("TXT")}>
            <FileDown className="mr-3 h-4 w-4" /> EXPORTAR TXT
          </Button>
          <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">
            <PlusCircle className="mr-3 h-4 w-4" /> REGISTRAR FACTURA
          </Button>
        </div>
      </header>

      <Tabs defaultValue="ventas" onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex h-16 bg-card/40 border border-border rounded-[2rem] p-2 mb-10 shadow-inner max-w-4xl overflow-x-auto no-scrollbar">
          <TabsTrigger value="ventas" className="flex-1 rounded-2xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Ventas</TabsTrigger>
          <TabsTrigger value="compras" className="flex-1 rounded-2xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Compras</TabsTrigger>
          <TabsTrigger value="guia" className="flex-1 rounded-2xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Guía Técnica</TabsTrigger>
          <TabsTrigger value="resumen" className="flex-1 rounded-2xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Resumen & Modelos</TabsTrigger>
          <TabsTrigger value="sanciones" className="flex-1 rounded-2xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-rose-600 data-[state=active]:text-white transition-all">Sanciones</TabsTrigger>
        </TabsList>

        <div className="mt-0">
          {/* TAB: VENTAS */}
          <TabsContent value="ventas" className="animate-in fade-in duration-500">
            <Card className="glass-card border-none rounded-[3.5rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                        <TableRow className="bg-muted/30 border-none">
                            <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha / Referencia</TableHead>
                            <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Cliente / RIF</TableHead>
                            <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Base Imponible</TableHead>
                            <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">IVA (16%)</TableHead>
                            <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Retención IVA</TableHead>
                            <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Total Neto</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {mockVentas.map((v, i) => (
                            <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all group">
                            <TableCell className="pl-10 py-6">
                                <p className="font-black text-xs text-foreground/80 uppercase italic">{v.fecha}</p>
                                <p className="text-[8px] font-mono text-muted-foreground font-bold">{v.factura}</p>
                            </TableCell>
                            <TableCell className="py-6">
                                <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-primary transition-colors">{v.cliente}</p>
                                <p className="text-[8px] font-mono text-primary font-bold">{v.rif}</p>
                            </TableCell>
                            <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/70">{formatCurrency(v.base, 'Bs.')}</TableCell>
                            <TableCell className="text-right py-6 font-mono text-xs font-bold text-foreground/40">{formatCurrency(v.iva, 'Bs.')}</TableCell>
                            <TableCell className="text-right py-6 font-mono text-xs font-black text-rose-500 italic">({formatCurrency(v.ret, 'Bs.')})</TableCell>
                            <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-primary italic shadow-glow-text">{formatCurrency(v.total, 'Bs.')}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="p-10 bg-primary/5 border-t border-border flex justify-between items-center">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                        <Terminal className="h-4 w-4 text-primary" /> Validado por Kyron Intelligence v2.6.5
                    </div>
                    <div className="flex gap-10">
                        <div className="text-right">
                            <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Base Imponible Total</p>
                            <p className="text-xl font-black italic text-foreground tracking-tighter">{formatCurrency(23500, 'Bs.')}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[8px] font-black uppercase text-primary mb-1">Débito Fiscal Neto</p>
                            <p className="text-xl font-black italic text-primary tracking-tighter shadow-glow-text">{formatCurrency(3760, 'Bs.')}</p>
                        </div>
                    </div>
                </CardFooter>
            </Card>
          </TabsContent>

          {/* TAB: COMPRAS */}
          <TabsContent value="compras" className="animate-in fade-in duration-500">
            <Card className="glass-card border-none rounded-[3.5rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Registro de Compras Nacionales e Importación</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-center py-20 opacity-20 italic">
                    <div className="flex flex-col items-center gap-6">
                        <Globe className="h-16 w-16" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Sincronizando Liquidaciones de Aduana y Compras Nacionales...</p>
                    </div>
                </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: GUÍA TÉCNICA */}
          <TabsContent value="guia" className="animate-in fade-in duration-500">
            <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8 space-y-8">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 p-10 shadow-2xl">
                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-primary mb-8 flex items-center gap-4">
                            <BookOpen className="h-6 w-6" /> Introducción y Base Legal
                        </h3>
                        <div className="space-y-6 text-sm font-medium italic text-muted-foreground/80 leading-relaxed text-justify uppercase">
                            <p>El Libro de Compras y Ventas constituye el registro fundamental del Impuesto al Valor Agregado (IVA). Su mantenimiento es obligatorio para todos los contribuyentes, permitiendo la determinación del Débito y Crédito Fiscal en cada periodo impositivo.</p>
                            <div className="grid md:grid-cols-2 gap-8 pt-4">
                                <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/10">
                                    <h4 className="text-xs font-black text-primary mb-3">Contribuyentes Ordinarios</h4>
                                    <p className="text-[10px] font-bold leading-relaxed">Realizan actividades gravadas y tienen derecho a deducir el crédito fiscal de sus compras.</p>
                                </div>
                                <div className="p-6 rounded-[2rem] bg-secondary/5 border border-secondary/10">
                                    <h4 className="text-xs font-black text-secondary mb-3">Contribuyentes Formales</h4>
                                    <p className="text-[10px] font-bold leading-relaxed">Realizan exclusivamente actividades exentas o exoneradas. No cobran IVA ni deducen créditos.</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 p-10 shadow-2xl">
                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-primary mb-8">Requisitos de los Libros</h3>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="id-libros" className="border-white/5">
                                <AccordionTrigger className="text-[10px] font-black uppercase tracking-widest">Identificación de Libros</AccordionTrigger>
                                <AccordionContent className="text-[10px] font-bold text-muted-foreground/60 uppercase leading-relaxed pt-2">
                                    Debe contener: Nombre del contribuyente, RIF, Periodo de imposición, Folio, y estar debidamente foliado y encuadernado (o en formato digital autorizado).
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="importaciones" className="border-white/5">
                                <AccordionTrigger className="text-[10px] font-black uppercase tracking-widest">Compras Nacionales e Importaciones</AccordionTrigger>
                                <AccordionContent className="text-[10px] font-bold text-muted-foreground/60 uppercase leading-relaxed pt-2">
                                    Se deben separar las compras nacionales de las importaciones de mercancías y servicios. Las importaciones requieren el número de la planilla de liquidación de aduana.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="ajustes" className="border-white/5">
                                <AccordionTrigger className="text-[10px] font-black uppercase tracking-widest">Ajustes: Notas de Débito y Crédito</AccordionTrigger>
                                <AccordionContent className="text-[10px] font-bold text-muted-foreground/60 uppercase leading-relaxed pt-2">
                                    Deben registrarse en el mes en que se emiten, haciendo referencia a la factura original, sea del mismo periodo o anteriores. El sistema automatiza este cruce.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="prorrateo" className="border-white/5">
                                <AccordionTrigger className="text-[10px] font-black uppercase tracking-widest">Prorrateo de Créditos Fiscales</AccordionTrigger>
                                <AccordionContent className="text-[10px] font-bold text-muted-foreground/60 uppercase leading-relaxed pt-2">
                                    Cuando se realizan actividades gravadas y exentas simultáneamente, se debe aplicar el porcentaje de prorrata para deducir solo la porción correspondiente a las ventas gravadas.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <Card className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-glow border-none group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Zap className="h-32 w-32" /></div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6">Importación de Servicios</h3>
                        <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8 text-justify">
                            El sistema detecta automáticamente facturas de proveedores extranjeros para aplicar el protocolo de autoliquidación de IVA según el Reglamento.
                        </p>
                        <Button variant="secondary" className="w-full h-12 bg-white text-primary font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl">CONFIGURAR TASAS</Button>
                    </Card>

                    <Card className="glass-card border-none rounded-[2.5rem] bg-white/[0.02] p-8 border border-white/5">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-6 flex items-center gap-3 italic">
                            <Activity className="h-4 w-4" /> Inteligencia en Compras
                        </h4>
                        <div className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 leading-relaxed">
                            <p className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" /> Detección de compras gravadas sin derecho a crédito.</p>
                            <p className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" /> Validación de facturación en serie para entes públicos.</p>
                        </div>
                    </Card>
                </div>
            </div>
          </TabsContent>

          {/* TAB: RESUMEN & MODELOS */}
          <TabsContent value="resumen" className="animate-in fade-in duration-500">
            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-8 space-y-10">
                    <Card className="glass-card border-none rounded-[3.5rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Resumen del Libro de Ventas</CardTitle>
                        </CardHeader>
                        <CardContent className="p-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground/40">Ventas Gravadas</p>
                                    <div className="p-6 bg-white/[0.02] border border-border rounded-2xl flex justify-between items-end">
                                        <span className="text-[8px] font-bold uppercase">Alícuota General (16%)</span>
                                        <span className="text-xl font-black italic">{formatCurrency(23500, 'Bs.')}</span>
                                    </div>
                                    <div className="p-6 bg-white/[0.02] border border-border rounded-2xl flex justify-between items-end opacity-40">
                                        <span className="text-[8px] font-bold uppercase">Alícuota Reducida (8%)</span>
                                        <span className="text-xl font-black italic">Bs. 0,00</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-[9px] font-black uppercase text-primary/60">Cálculo de Impuesto</p>
                                    <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl flex justify-between items-end">
                                        <span className="text-[8px] font-black uppercase text-primary">Débito Fiscal</span>
                                        <span className="text-2xl font-black italic text-primary">{formatCurrency(3760, 'Bs.')}</span>
                                    </div>
                                    <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex justify-between items-end">
                                        <span className="text-[8px] font-black uppercase text-emerald-500">I.V.A. Retenido por Clientes</span>
                                        <span className="text-xl font-black italic text-emerald-500">{formatCurrency(2820, 'Bs.')}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-none rounded-[3.5rem] bg-card/40 p-10 shadow-2xl border-l-4 border-secondary">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="p-4 bg-secondary/10 rounded-2xl"><Users className="h-8 w-8 text-secondary" /></div>
                            <div>
                                <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground">Relación para Contribuyentes Formales</h3>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Formato simplificado para entes exentos</p>
                            </div>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed uppercase text-justify italic">
                            Los contribuyentes formales deben llevar una relación cronológica de todas sus operaciones de compra y venta. Aunque no generen crédito ni débito fiscal, la omisión de este libro acarrea sanciones pecuniarias graves por parte del SENIAT.
                        </p>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <Card className="glass-card border-none rounded-[2.5rem] bg-white/[0.02] p-8 shadow-xl">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6 flex items-center gap-3 italic">
                            <Layers className="h-4 w-4" /> Modelos según Empresa
                        </h4>
                        <div className="space-y-4">
                            {[
                                { label: "Servicios", icon: Activity },
                                { label: "Comercializadora", icon: ShoppingCart },
                                { label: "Manufactura", icon: Landmark },
                                { label: "Exportadora", icon: Globe }
                            ].map(mod => (
                                <div key={mod.label} className="p-4 rounded-xl bg-white/[0.03] border border-border flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <mod.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-foreground/60 group-hover:text-foreground">{mod.label}</span>
                                    </div>
                                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
          </TabsContent>

          {/* TAB: SANCIONES */}
          <TabsContent value="sanciones" className="animate-in fade-in duration-500">
            <Card className="bg-rose-600/10 border-2 border-rose-600/20 rounded-[3.5rem] p-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><ShieldAlert className="h-48 w-48 text-rose-500" /></div>
                <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <Gavel className="h-10 w-10 text-rose-500 animate-pulse" />
                            <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white leading-none">Régimen de <br/> Sanciones COT</h3>
                        </div>
                        <p className="text-lg font-medium italic text-white/60 leading-relaxed text-justify">
                            El incumplimiento de las formalidades de los libros (retraso, omisión de datos o falta de identificación) se sanciona según el Código Orgánico Tributario. Las multas pueden alcanzar hasta <span className="text-rose-500 font-black">1.000 veces el tipo de cambio oficial</span> de la moneda de mayor valor.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="destructive" className="h-12 px-10 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl">SIMULAR MULTA</Button>
                            <Button variant="outline" className="h-12 px-8 rounded-xl border-white/20 text-white font-black uppercase text-[10px]">VER ARTÍCULOS</Button>
                        </div>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-black/40 border border-white/5 shadow-inner">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-rose-400 mb-10 flex items-center gap-3 italic">
                            <Terminal className="h-4 w-4" /> Alertas Preventivas
                        </h4>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-4">
                                <span>Retraso en Folio</span>
                                <span className="text-emerald-400">0 DÍAS (OK)</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-4">
                                <span>Error de Identificación</span>
                                <span className="text-emerald-400">NINGUNO</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40">
                                <span>Riesgo de Clausura</span>
                                <span className="text-emerald-400 font-black">BAJO</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
