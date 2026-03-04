
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
  BadgeCheck,
  Building,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function ModeloZEDUPage() {
    const { toast } = useToast();

    const budgetData = [
      { item: "Contrato Mayorista Operador (Digitel/Movistar)", cost: 5000, cat: "Telecom" },
      { item: "Tarjetas SIM Físicas System Kyron (1.000)", cost: 1000, cat: "Telecom" },
      { item: "Plataforma Gestión eSIM/Billing", cost: 2500, cat: "Telecom" },
      { item: "Lote Teléfonos Homologados (50)", cost: 6000, cat: "Equipos" },
      { item: "Tablets Educativas (20)", cost: 3600, cat: "Equipos" },
      { item: "Equipos Internet Fijo (Routers)", cost: 800, cat: "Telecom" },
      { item: "Desarrollo Frontend/Backend (Firebase)", cost: 4500, cat: "Software" },
      { item: "Integración Gemini IA & Blockchain", cost: 1000, cat: "Software" },
      { item: "Hardware Papelera Inteligente (Prototipos)", cost: 683, cat: "Prototipo" },
      { item: "Moto Bera Carguera DT-200 (Logística)", cost: 2800, cat: "Logística" },
      { item: "Cajas Registradoras Fiscales (HKA)", cost: 1350, cat: "Fiscal" },
      { item: "Capacitación y Lanzamiento", cost: 2450, cat: "Operaciones" },
    ];

    const totalBudget = budgetData.reduce((sum, item) => sum + item.cost, 0);

    const handleDownloadWord = () => {
        const content = `
            <h1 style="text-align: center; font-family: Arial;">MODELO DE ZEDU - SYSTEM KYRON</h1>
            <h2 style="color: #2563eb; text-align: center;">Telecomunicaciones como Eje Central + Automatización Fiscal y Reciclaje</h2>
            
            <h3 style="border-bottom: 2px solid #2563eb; padding-bottom: 5px;">1. INFORMACIÓN DEL EQUIPO</h3>
            <p><b>PROYECTO:</b> System Kyron</p>
            <p><b>INTEGRANTES:</b> Carlos Mattar (Líder Estratégico), Sebastián Garrido, Marcos Sousa</p>
            <p><b>INSTITUCIÓN:</b> Colegio Gabriela Mistral (La Guaira)</p>
            
            <h3 style="border-bottom: 2px solid #2563eb; padding-bottom: 5px;">2. POBLACIÓN A TRABAJAR</h3>
            <p><b>UBICACIÓN:</b> Parroquia La Guaira, zona costera.</p>
            <p><b>COMUNIDAD:</b> Colegio Gabriela Mistral y sector comercial/turístico.</p>
            <p><b>HABITANTES:</b> 3.000 personas.</p>

            <h3 style="border-bottom: 2px solid #2563eb; padding-bottom: 5px;">3. ANÁLISIS DEL PROBLEMA</h3>
            <p>Conectividad deficiente y fragmentación de servicios. El clima costero deteriora archivos físicos por humedad. Desconocimiento de cambios normativos del SENIAT.</p>

            <h3 style="border-bottom: 2px solid #2563eb; padding-bottom: 5px;">4. SOLUCIÓN PROPUESTA: SYSTEM KYRON</h3>
            <p>Ecosistema integral cuya columna vertebral son las telecomunicaciones: Línea 5G/eSIM, internet empresarial, automatización fiscal con IA y reciclaje inteligente magnético.</p>

            <h3 style="border-bottom: 2px solid #2563eb; padding-bottom: 5px;">5. PRESUPUESTO TÉCNICO</h3>
            <p><b>INVERSIÓN TOTAL:</b> $31.683,00 USD</p>
            <p>Incluye contrato mayorista de red, Moto Bera Carguera DT-200 para logística litoral y plataforma billing.</p>
            
            <h3 style="border-bottom: 2px solid #2563eb; padding-bottom: 5px;">7. PLAN DE ACCIÓN JERÁRQUICO</h3>
            <p><b>FASE 0:</b> Constitución empresa Telecom y permisos (Lidera: Carlos Mattar).</p>
            <p><b>FASE 1:</b> Desarrollo plataforma billing y gestión (Lidera: Carlos Mattar).</p>
            <p><b>FASE 2:</b> Prototipo Reciclaje Magnético e IA (Lidera: Sebastián Garrido).</p>
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

        toast({ title: "Word Generado", description: "El Modelo de ZEDU ha sido exportado exitosamente." });
    };

    return (
        <div className="space-y-16 w-full animate-in fade-in duration-700 pb-32">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-8 border-primary pl-10 py-2 w-full">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 shadow-glow">
                        <Signal className="h-3 w-3 animate-pulse" /> Factor Principal: Telecomunicaciones
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic italic-shadow text-white uppercase leading-none">MODELO <span className="text-primary">DE ZEDU</span></h1>
                    <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40 italic leading-none">SYSTEM KYRON • CONECTIVIDAD & GESTIÓN • 2026</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-20 px-16 rounded-2xl shadow-glow text-base font-black" onClick={handleDownloadWord}>
                    <Download className="mr-4 h-8 w-8" /> EXPORTAR .DOC (WORD)
                </Button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 w-full px-4 md:px-0">
                {/* BLOQUES 1 Y 2 */}
                <div className="xl:col-span-5 space-y-12">
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Crown className="h-4 w-4"/> 1. Información del Equipo</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
                            <CardContent className="p-0">
                                <div className="p-8 border-b border-white/5 bg-primary/[0.02]">
                                    <h3 className="font-black text-[9px] uppercase tracking-widest text-primary opacity-60 mb-2">NOMBRE DEL PROYECTO</h3>
                                    <p className="text-2xl font-black italic text-white">System Kyron</p>
                                </div>
                                <div className="p-8 border-b border-white/5">
                                    <h3 className="font-black text-[9px] uppercase tracking-widest text-primary opacity-60 mb-2">INTEGRANTES</h3>
                                    <p className="text-lg font-black text-white/80 italic">Carlos Mattar, Sebastián Garrido, Marcos Sousa</p>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-black text-[9px] uppercase tracking-widest text-primary opacity-60 mb-2">INSTITUCIÓN</h3>
                                    <p className="text-lg font-black text-white/80 italic">Colegio Gabriela Mistral (La Guaira)</p>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Users className="h-4 w-4"/> 2. Población a Trabajar</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
                            <CardContent className="p-0 text-sm font-bold text-white/70 italic space-y-0">
                                <div className="p-8 border-b border-white/5">
                                    <span className="text-[9px] block mb-1 opacity-40 uppercase">Ubicación</span>
                                    Venezuela, Estado La Guaira, Parroquia La Guaira.
                                </div>
                                <div className="p-8 border-b border-white/5">
                                    <span className="text-[9px] block mb-1 opacity-40 uppercase">Comunidad</span>
                                    Comunidad educativa Gabriela Mistral y sector comercial.
                                </div>
                                <div className="p-8 border-b border-white/5">
                                    <span className="text-[9px] block mb-1 opacity-40 uppercase">Habitantes</span>
                                    3.000 personas (800 Estudiantes, 1.500 Empleados Locales).
                                </div>
                                <div className="p-8">
                                    <span className="text-[9px] block mb-1 opacity-40 uppercase">Clima</span>
                                    Tropical costero (Alta humedad), propicia para digitalización.
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>

                {/* BLOQUES 3, 4, 5 */}
                <div className="xl:col-span-7 space-y-12">
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><AlertTriangle className="h-4 w-4" /> 3. Análisis del Problema</h3>
                        <Card className="glass-card border-none p-10 leading-relaxed shadow-2xl rounded-[2.5rem]">
                            <p className="text-lg font-bold text-white/90 italic text-justify leading-relaxed">
                                La comunidad de La Guaira sufre de una conectividad limitada y cara. Además, la humedad extrema deteriora archivos físicos escolares. Las empresas operan con servicios fragmentados (internet por un lado, contabilidad por otro), elevando costos y riesgos fiscales.
                            </p>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Zap className="h-4 w-4" /> 4. Solución: Ecosistema Kyron</h3>
                        <Card className="glass-card border-none p-10 leading-relaxed shadow-2xl relative overflow-hidden rounded-[2.5rem]">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.02]"><BrainCircuit className="h-32 w-32" /></div>
                            <p className="text-lg font-bold text-white/90 italic text-justify leading-relaxed">
                                **System Kyron** es un ecosistema cuya columna vertebral son las telecomunicaciones. Ofrecemos **Líneas 5G (SIM/eSIM)** y equipos homologados. Sobre esta infraestructura, montamos el blindaje fiscal SENIAT y el sistema de reciclaje inteligente magnético.
                            </p>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Calculator className="h-4 w-4" /> 5. Presupuesto Maestro</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white/[0.03] border-none">
                                        <TableHead className="font-black text-[10px] uppercase text-primary pl-10 py-6">Ítem</TableHead>
                                        <TableHead className="text-center font-black text-[10px] uppercase text-primary py-6">Cat.</TableHead>
                                        <TableHead className="text-right font-black text-[10px] uppercase text-primary py-6 pr-10">Monto</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {budgetData.slice(0, 6).map((row, i) => (
                                        <TableRow key={i} className="border-b border-white/5 group hover:bg-primary/[0.02] transition-colors">
                                            <TableCell className="font-bold pl-10 py-6 text-white/80">{row.item}</TableCell>
                                            <TableCell className="text-center"><Badge variant="outline" className="text-[8px] uppercase">{row.cat}</Badge></TableCell>
                                            <TableCell className="text-right pr-10 font-black italic text-primary">{formatCurrency(row.cost, "USD")}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="bg-primary/10 border-none">
                                        <TableCell className="font-black text-xl pl-10 py-10 italic uppercase text-white" colSpan={2}>Inversión Total</TableCell>
                                        <TableCell className="text-right pr-10 font-black text-3xl text-primary italic">{formatCurrency(totalBudget, "USD")}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Card>
                    </section>
                </div>
            </div>

            {/* BLOQUES 6, 7, 8, 9 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="glass-card border-none p-8 rounded-[2rem]">
                    <h4 className="text-[10px] font-black uppercase text-primary tracking-widest mb-4">6. Aliados</h4>
                    <p className="text-xs font-bold text-white/60 italic leading-relaxed">Digitel, Movistar, The Factory HKA, Colegio Gabriela Mistral, CONATEL y SENIAT.</p>
                </Card>
                <Card className="glass-card border-none p-8 rounded-[2rem] border-l-2 border-primary">
                    <h4 className="text-[10px] font-black uppercase text-primary tracking-widest mb-4">7. Plan de Acción</h4>
                    <p className="text-xs font-bold text-white/60 italic leading-relaxed">**Lidera Carlos Mattar:** Constitución Telecom, Negociación Red y Desarrollo de Arquitectura Inteligente.</p>
                </Card>
                <Card className="glass-card border-none p-8 rounded-[2rem]">
                    <h4 className="text-[10px] font-black uppercase text-primary tracking-widest mb-4">8. Indicadores</h4>
                    <p className="text-xs font-bold text-white/60 italic leading-relaxed">800 Líneas activas, 400 equipos vendidos, 3.000kg reciclados y 100% cumplimiento fiscal.</p>
                </Card>
                <Card className="glass-card border-none p-8 rounded-[2rem]">
                    <h4 className="text-[10px] font-black uppercase text-primary tracking-widest mb-4">9. Sostenibilidad</h4>
                    <p className="text-xs font-bold text-white/60 italic leading-relaxed">Ingresos recurrentes por SaaS y recargas telefónicas aseguran la operatividad a largo plazo.</p>
                </Card>
            </div>
        </div>
    );
}
