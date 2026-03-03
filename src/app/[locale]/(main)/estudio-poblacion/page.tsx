
"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableRow, 
  TableHeader, 
  TableHead 
} from "@/components/ui/table";
import { 
  Download, 
  Rocket, 
  FileText, 
  CheckCircle, 
  Crown, 
  Truck, 
  Cpu, 
  BrainCircuit, 
  Zap, 
  Calculator,
  Activity,
  AlertTriangle,
  Smartphone,
  Signal,
  Recycle,
  Globe,
  Radio,
  BadgeCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function ModeloZEDUPage() {
    const { toast } = useToast();

    const teamData = [
      { label: "NOMBRE DEL PROYECTO", value: "System Kyron", important: true },
      { label: "INTEGRANTES DEL EQUIPO", value: "Carlos Mattar, Sebastián Garrido, Marcos Sousa", important: true },
      { label: "INSTITUCIÓN EDUCATIVA", value: "Colegio Gabriela Mistral", important: true },
      { label: "PAÍS / CIUDAD", value: "Venezuela, La Guaira", important: true },
    ];

    const populationData = [
      { label: "LOCALIZACIÓN", value: "Venezuela, estado La Guaira, parroquia La Guaira (zona costera). Referencia: La Atlántida, calle 7 a calle 3, Supermercado Bensica." },
      { label: "COMUNIDAD", value: "Comunidad educativa Colegio Gabriela Mistral y sector comercial/turístico de La Guaira." },
      { label: "HABITANTES TOTALES", value: "3.000 personas (800 estudiantes/representantes, 1.500 empleados, 700 personal)." },
      { label: "GÉNERO", value: "52% Femenino / 48% Masculino" },
      { label: "RANGOS ETARIOS", value: "0-18: 800 | 19-40: 1.200 | 41-60: 700 | 60+: 300" },
      { label: "CARACTERÍSTICAS", value: "Alta necesidad de conectividad confiable. Empresas locales requieren modernizar telecomunicaciones y automatizar procesos fiscales." },
      { label: "CLIMA", value: "Tropical costero (28°C promedio, alta humedad). Crítico para preservación de archivos." }
    ];

    const budgetData = [
      { item: "Contrato Mayorista Operador (1 año)", cost: 5000, cat: "Telecom" },
      { item: "SIM Cards Físicas Personalizadas (1.000)", cost: 1000, cat: "Telecom" },
      { item: "Plataforma Gestión eSIM/Billing", cost: 2500, cat: "Software" },
      { item: "Lote Teléfonos Homologados (50)", cost: 6000, cat: "Equipos" },
      { item: "Tablets Educativas (20)", cost: 3600, cat: "Equipos" },
      { item: "Moto Bera Carguera DT-200 (Logística)", cost: 2800, cat: "Logística" },
      { item: "Desarrollo Web & IA (Gemini)", cost: 5500, cat: "Software" },
      { item: "Hardware Papelera Inteligente (3)", cost: 683, cat: "Prototipo" },
      { item: "Cajas Registradoras Fiscales (3)", cost: 1350, cat: "Fiscal" },
      { item: "Infraestructura Red & Cloud", cost: 1900, cat: "Infra" },
      { item: "Marketing y Lanzamiento", cost: 1350, cat: "Lanzamiento" },
    ];

    const totalBudget = budgetData.reduce((sum, item) => sum + item.cost, 0);

    const handleDownloadWord = () => {
        const content = `
            <h1 style="text-align: center; font-family: Arial;">MODELO ZEDU - SYSTEM KYRON</h1>
            <h2 style="color: #2563eb; text-align: center;">Telecomunicaciones como Eje Central + Automatización Fiscal y Reciclaje</h2>
            
            <h3 style="border-bottom: 2px solid #2563eb; padding-bottom: 5px;">1. INFORMACIÓN DEL EQUIPO</h3>
            <p><b>Proyecto:</b> System Kyron</p>
            <p><b>Integrantes:</b> Carlos Mattar, Sebastián Garrido, Marcos Sousa</p>
            <p><b>Institución:</b> Colegio Gabriela Mistral</p>
            
            <h3 style="border-bottom: 2px solid #2563eb; padding-bottom: 5px;">2. POBLACIÓN A TRABAJAR</h3>
            <p><b>Ubicación:</b> La Atlántida, Catia La Mar, La Guaira (Ref: Supermercado Bensica).</p>
            <p><b>Habitantes:</b> 3.000 personas.</p>
            <p><b>Características:</b> Alta necesidad de conectividad y digitalización por humedad costera.</p>

            <h3 style="border-bottom: 2px solid #2563eb; padding-bottom: 5px;">3. ANÁLISIS DEL PROBLEMA</h3>
            <p>Conectividad deficiente y fragmentación de servicios. El clima costero deteriora archivos físicos escolares.</p>

            <h3 style="border-bottom: 2px solid #2563eb; padding-bottom: 5px;">4. SOLUCIÓN PROPUESTA</h3>
            <p>Ecosistema integral cuya columna vertebral son las telecomunicaciones: Línea 5G/eSIM, venta de equipos homologados, automatización fiscal IA y reciclaje magnético.</p>

            <h3 style="border-bottom: 2px solid #2563eb; padding-bottom: 5px;">5. PRESUPUESTO TÉCNICO</h3>
            <p><b>Inversión Total Estimada:</b> $31.683,00 USD</p>
            <p>Incluye Moto Bera Carguera DT-200 para distribución litoral y contrato mayorista de red.</p>
            
            <h3 style="border-bottom: 2px solid #2563eb; padding-bottom: 5px;">7. PLAN DE ACCIÓN JERÁRQUICO</h3>
            <p><b>Liderazgo Estratégico:</b> Carlos Mattar (IA, Blockchain, Diagnóstico).</p>
            <p><b>Apoyo Operativo:</b> Sebastian Garrido y Marcos Sousa (Logística, Carga de Datos, Campo).</p>
        `;

        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;
        
        const blob = new Blob([sourceHTML], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Modelo_Zedu_System_Kyron.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ title: "Informe Word Generado", description: "El Modelo ZEDU completo ha sido descargado." });
    };

    return (
        <div className="space-y-16 w-full animate-in fade-in duration-1000 pb-32">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-8 border-primary pl-10 py-2">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 shadow-glow">
                        <Radio className="h-3 w-3 animate-pulse" /> Factor Principal: Telecom
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic italic-shadow text-white uppercase leading-none">MODELO <span className="text-primary">DE ZEDU</span></h1>
                    <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40 italic leading-none">SYSTEM KYRON • CONECTIVIDAD TOTAL • 2026</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-20 px-16 rounded-2xl shadow-glow text-base font-black" onClick={handleDownloadWord}>
                    <Download className="mr-4 h-8 w-8" /> EXPORTAR .DOC (WORD)
                </Button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 w-full">
                <div className="xl:col-span-5 space-y-12">
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Crown className="h-4 w-4"/> 1. Información del Equipo</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
                            <CardContent className="p-0">
                                {teamData.map((item, index) => (
                                    <div key={index} className={cn("p-8 border-b border-white/5 last:border-none", item.important ? "bg-primary/[0.02]" : "opacity-50")}>
                                        <h3 className="font-black text-[9px] uppercase tracking-widest text-primary opacity-60 mb-2">{item.label}</h3>
                                        <p className={cn("text-xl font-black italic tracking-tight", item.important ? "text-white" : "text-white/40")}>{item.value}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Users className="h-4 w-4"/> 2. Población a Trabajar</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
                            <CardContent className="p-0">
                                {populationData.map((item, index) => (
                                    <div key={index} className="p-8 border-b border-white/5 last:border-none">
                                        <h3 className="font-black text-[9px] uppercase tracking-widest text-primary mb-2 opacity-60">{item.label}</h3>
                                        <p className="text-sm font-bold text-white/80 italic leading-relaxed">{item.value}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </section>
                </div>

                <div className="xl:col-span-7 space-y-12">
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><AlertTriangle className="h-4 w-4" /> 3. Análisis del Problema</h3>
                        <Card className="glass-card border-none p-10 leading-relaxed shadow-2xl rounded-[2.5rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.02]"><Activity className="h-32 w-32" /></div>
                            <div className="space-y-6">
                                <p className="text-lg font-bold text-white/90 italic text-justify leading-relaxed">
                                    La comunidad de La Guaira carece de un proveedor único que ofrezca **conectividad confiable**, integrando además servicios de automatización fiscal y reciclaje inteligente. El clima deteriora archivos físicos en el Colegio Gabriela Mistral.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <Badge variant="outline" className="text-[9px] border-primary/20 text-primary py-2 px-4 uppercase">☑️ Telecomunicaciones</Badge>
                                    <Badge variant="outline" className="text-[9px] border-primary/20 text-primary py-2 px-4 uppercase">☑️ Automatización</Badge>
                                    <Badge variant="outline" className="text-[9px] border-primary/20 text-primary py-2 px-4 uppercase">☑️ Reciclaje</Badge>
                                    <Badge variant="outline" className="text-[9px] border-primary/20 text-primary py-2 px-4 uppercase">☑️ Digitalización</Badge>
                                </div>
                            </div>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Zap className="h-4 w-4" /> 4. Solución Propuesta: Eje Telecom</h3>
                        <Card className="glass-card border-none p-10 leading-relaxed shadow-2xl relative overflow-hidden rounded-[2.5rem]">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.02]"><BrainCircuit className="h-32 w-32" /></div>
                            <p className="text-lg font-bold text-white/90 italic text-justify leading-relaxed">
                                **System Kyron** es un ecosistema cuya columna vertebral son las telecomunicaciones. Ofrecemos **Líneas 5G (SIM/eSIM)** y venta de equipos. Sobre esta base, integramos módulos de IA para gestión fiscal, digitalización escolar y reciclaje magnético.
                            </p>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Calculator className="h-4 w-4" /> 5. Presupuesto Maestro</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white/[0.03] border-none">
                                        <TableHead className="font-black text-[10px] uppercase text-primary pl-10 py-6">Ítem de Inversión</TableHead>
                                        <TableHead className="text-center font-black text-[10px] uppercase text-primary py-6">Cat.</TableHead>
                                        <TableHead className="text-right font-black text-[10px] uppercase text-primary py-6 pr-10">Monto (USD)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {budgetData.map((row, i) => (
                                        <TableRow key={i} className="border-b border-white/5 group hover:bg-primary/[0.02] transition-colors">
                                            <TableCell className="font-bold pl-10 py-6 flex items-center gap-4 text-white/80">
                                                {row.item.includes("Bera") ? <Truck className="h-5 w-5 text-secondary" /> : <Smartphone className="h-5 w-5 text-primary" />}
                                                {row.item}
                                            </TableCell>
                                            <TableCell className="text-center"><Badge variant="outline" className="text-[8px] uppercase">{row.cat}</Badge></TableCell>
                                            <TableCell className="text-right pr-10 font-black italic text-primary">{formatCurrency(row.cost, "USD")}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="bg-primary/10 border-none">
                                        <TableCell className="font-black text-xl pl-10 py-10 italic uppercase text-white" colSpan={2}>Inversión Total Estimada</TableCell>
                                        <TableCell className="text-right pr-10 font-black text-3xl text-primary italic">{formatCurrency(totalBudget, "USD")}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><BadgeCheck className="h-4 w-4" /> 7. Plan de Acción Jerárquico</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
                            <CardContent className="p-0">
                                <div className="p-8 border-b border-white/5 bg-primary/[0.03]">
                                    <h4 className="font-black text-xs text-primary uppercase tracking-widest mb-2 italic">Liderazgo Estratégico: Carlos Mattar</h4>
                                    <p className="text-xs text-white/60 font-medium">Arquitectura de Red, IA, Blockchain y Diagnóstico de Misión Crítica.</p>
                                </div>
                                <div className="p-8">
                                    <h4 className="font-black text-xs text-white/40 uppercase tracking-widest mb-4">Apoyo Operativo: Sebastian Garrido, Marcos Sousa</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-xs font-bold text-white/70 italic"><CheckCircle className="h-4 w-4 text-primary opacity-40"/> Carga de Datos y Soporte Técnico</li>
                                        <li className="flex items-center gap-3 text-xs font-bold text-white/70 italic"><CheckCircle className="h-4 w-4 text-primary opacity-40"/> Distribución Logística (Moto Bera Carguera)</li>
                                        <li className="flex items-center gap-3 text-xs font-bold text-white/70 italic"><CheckCircle className="h-4 w-4 text-primary opacity-40"/> Instalación de Puntos de Reciclaje</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    );
}
