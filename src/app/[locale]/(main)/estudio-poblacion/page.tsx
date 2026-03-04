
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
  Crown, 
  Zap, 
  Calculator,
  AlertTriangle,
  BadgeCheck,
  BrainCircuit,
  Globe,
  Users,
  Building,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function ModeloZEDUPage() {
    const { toast } = useToast();

    const budgetData = [
      { item: "Infraestructura de Telecomunicaciones (Contrato Mayorista)", cost: 5000, cat: "Telecom" },
      { item: "Tarjetas SIM Físicas System Kyron (1.000 unidades)", cost: 1000, cat: "Telecom" },
      { item: "Plataforma de Gestión eSIM y Facturación Digital", cost: 2500, cat: "Telecom" },
      { item: "Equipos Homologados (Smartphones/Tablets)", cost: 9600, cat: "Equipos" },
      { item: "Desarrollo de Ecosistema Web (Firebase/Cloud)", cost: 4500, cat: "Software" },
      { item: "Módulo de Inteligencia Artificial (IA Fiscal)", cost: 1000, cat: "IA" },
      { item: "Hardware Papeleras Magnéticas (Sensores IA)", cost: 683, cat: "Reciclaje" },
      { item: "Moto Bera Carguera DT-200 (Logística Costera)", cost: 2800, cat: "Logística" },
      { item: "Dispositivos Fiscales Homologados (SENIAT)", cost: 1350, cat: "Fiscal" },
      { item: "Marketing y Despliegue Operativo La Guaira", cost: 3250, cat: "Operaciones" },
    ];

    const totalBudget = 31683;

    const handleDownloadWord = () => {
        const content = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h1 style="text-align: center; color: #2563eb; text-transform: uppercase;">MODELO ZEDU - SYSTEM KYRON</h1>
                <h2 style="text-align: center; color: #666;">Ecosistema Integral: Telecomunicaciones, IA Fiscal y Sostenibilidad</h2>
                
                <hr style="border: 1px solid #eee; margin: 20px 0;" />

                <h3>1. INFORMACIÓN DEL EQUIPO</h3>
                <p><b>PROYECTO:</b> System Kyron</p>
                <p><b>LÍDER ESTRATÉGICO:</b> Carlos Mattar (Arquitectura e Inteligencia)</p>
                <p><b>OPERACIONES Y LOGÍSTICA:</b> Sebastián Garrido, Marcos Sousa</p>
                <p><b>INSTITUCIÓN AVAL:</b> Colegio Gabriela Mistral (La Guaira)</p>

                <h3>2. POBLACIÓN A TRABAJAR</h3>
                <p><b>LOCALIDAD:</b> Venezuela, estado La Guaira, Catia La Mar.</p>
                <p><b>COMUNIDAD PILOTO:</b> Sector comercial de La Atlántida (Supermercado Bensica) y Comunidad Educativa Gabriela Mistral.</p>
                <p><b>ALCANCE:</b> 3.000 ciudadanos impactados por el ecosistema digital.</p>

                <h3>3. ANÁLISIS DEL PROBLEMA (Holístico)</h3>
                <p><b>DESCRIPCIÓN:</b> La región enfrenta una desarticulación tecnológica crítica. Las empresas y ciudadanos gestionan servicios de conectividad, cumplimiento fiscal y residuos de forma manual y fragmentada. Esto genera: 1) Altos costos por servicios independientes. 2) Vulnerabilidad ante multas del SENIAT por falta de IA preventiva. 3) Deterioro de documentos físicos por el clima costero. 4) Ausencia de incentivos para el reciclaje de materiales PET y metálicos.</p>

                <h3>4. SOLUCIÓN PROPUESTA (Ecosistema Unificado)</h3>
                <p><b>DESARROLLO:</b> System Kyron despliega una plataforma 360°. Utilizamos las <b>Telecomunicaciones 5G/eSIM</b> como base para montar un motor de <b>IA Fiscal (Riesgo Cero)</b>, un <b>Ledger Inmutable (Blockchain)</b> para seguridad documental y un sistema de <b>Reciclaje Magnético</b> que monetiza la basura. Resolvemos la fragmentación unificando todo en un único punto de acceso.</p>

                <h3>5. PRESUPUESTO TÉCNICO DE MISIÓN CRÍTICA</h3>
                <p><b>INVERSIÓN TOTAL:</b> $31.683,00 USD</p>
                <p>Incluye desde el despliegue de red 5G hasta la Moto Bera Carguera para la logística de hardware y reciclaje.</p>

                <h3>7. PLAN DE ACCIÓN JERÁRQUICO</h3>
                <p><b>ESTRATEGIA (Carlos Mattar):</b> Diseño de algoritmos, blindaje legal y arquitectura cloud.</p>
                <p><b>EJECUCIÓN:</b> Despliegue de equipos, mantenimiento de red y logística de suministros costeros.</p>
            </div>
        `;

        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;
        
        const blob = new Blob([sourceHTML], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Modelo_ZEDU_System_Kyron_Consolidado.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ title: "Documento Generado", description: "Informe técnico Modelo ZEDU exportado con éxito." });
    };

    return (
        <div className="space-y-16 w-full animate-in fade-in duration-700 pb-32">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-8 border-primary pl-10 py-2 w-full">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 shadow-glow">
                        <BadgeCheck className="h-3 w-3" /> Ecosistema Integral Kyron v2.6.5
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic italic-shadow text-white uppercase leading-none">MODELO <span className="text-primary">ZEDU</span></h1>
                    <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40 italic leading-none">IA • FISCALIDAD • TELECOM • SOSTENIBILIDAD</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-20 px-16 rounded-2xl shadow-glow text-base font-black" onClick={handleDownloadWord}>
                    <Download className="mr-4 h-8 w-8" /> EXPORTAR INFORME (.DOC)
                </Button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 w-full">
                <div className="xl:col-span-5 space-y-12">
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Crown className="h-4 w-4"/> 1. Información del Equipo</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
                            <CardContent className="p-0">
                                <div className="p-8 border-b border-white/5 bg-primary/[0.02]">
                                    <h3 className="font-black text-[9px] uppercase tracking-widest text-primary opacity-60 mb-2">LIDERAZGO E INTELIGENCIA</h3>
                                    <p className="text-3xl font-black italic text-white">Carlos Mattar</p>
                                </div>
                                <div className="p-8 border-b border-white/5">
                                    <h3 className="font-black text-[9px] uppercase tracking-widest text-primary opacity-60 mb-2">APOYO OPERATIVO</h3>
                                    <p className="text-lg font-black text-white/60 italic">Sebastián Garrido, Marcos Sousa</p>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-black text-[9px] uppercase tracking-widest text-primary opacity-60 mb-2">INSTITUCIÓN AVAL</h3>
                                    <p className="text-lg font-black text-white italic">C.E. Gabriela Mistral</p>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Globe className="h-4 w-4"/> 2. Población y Localidad</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
                            <CardContent className="p-0 text-sm font-bold text-white/70 italic">
                                <div className="p-8 border-b border-white/5">
                                    <span className="text-[9px] block mb-1 opacity-40 uppercase tracking-widest">Localidad</span>
                                    La Guaira, Catia La Mar (Eje La Atlántida).
                                </div>
                                <div className="p-8 border-b border-white/5">
                                    <span className="text-[9px] block mb-1 opacity-40 uppercase tracking-widest">Puntos de Impacto</span>
                                    Supermercado Bensica & Red Escolar local.
                                </div>
                                <div className="p-8">
                                    <span className="text-[9px] block mb-1 opacity-40 uppercase tracking-widest">Alcance de Identidad</span>
                                    3.000 IDs Digitales proyectadas.
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>

                <div className="xl:col-span-7 space-y-12">
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><AlertTriangle className="h-4 w-4" /> 3. Análisis del Problema (Holístico)</h3>
                        <Card className="glass-card border-none p-10 leading-relaxed shadow-2xl rounded-[2.5rem]">
                            <p className="text-xl font-bold text-white/90 italic text-justify leading-relaxed">
                                El problema no es solo la falta de internet; es la <b>fragmentación de la gestión</b>. Los comercios en La Guaira operan con sistemas desconectados, lo que duplica costos y eleva el riesgo de multas fiscales del SENIAT. Además, la humedad costera destruye los archivos físicos, y la falta de un sistema de incentivos para el reciclaje contamina la zona sin generar valor para el ciudadano.
                            </p>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Zap className="h-4 w-4" /> 4. Solución Integral: Ecosistema Kyron</h3>
                        <Card className="glass-card border-none p-10 leading-relaxed shadow-2xl relative overflow-hidden rounded-[2.5rem]">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.02]"><BrainCircuit className="h-32 w-32" /></div>
                            <p className="text-xl font-bold text-white/90 italic text-justify leading-relaxed">
                                System Kyron unifica todo. Establecemos la <b>conectividad 5G/eSIM</b> como base, sobre la cual desplegamos <b>IA Predictiva</b> para blindar la contabilidad, <b>Blockchain</b> para inmutabilizar los registros académicos/comerciales y <b>Tecnología Magnética</b> para monetizar el reciclaje. Resolvemos la ineficiencia eliminando la necesidad de múltiples proveedores y procesos manuales.
                            </p>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Calculator className="h-4 w-4" /> 5. Presupuesto Técnico de Inversión</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white/[0.03] border-none">
                                        <TableHead className="font-black text-[10px] uppercase text-primary pl-10 py-6">Ítem del Ecosistema</TableHead>
                                        <TableHead className="text-center font-black text-[10px] uppercase text-primary py-6">Categoría</TableHead>
                                        <TableHead className="text-right font-black text-[10px] uppercase text-primary py-6 pr-10">Monto</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {budgetData.slice(0, 8).map((row, i) => (
                                        <TableRow key={i} className="border-b border-white/5 group hover:bg-primary/[0.02] transition-colors">
                                            <TableCell className="font-bold pl-10 py-6 text-white/80">{row.item}</TableCell>
                                            <TableCell className="text-center"><Badge variant="outline" className="text-[8px] uppercase">{row.cat}</Badge></TableCell>
                                            <TableCell className="text-right pr-10 font-black italic text-primary">{formatCurrency(row.cost, "USD")}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="bg-primary/10 border-none">
                                        <TableCell className="font-black text-xl pl-10 py-10 italic uppercase text-white" colSpan={2}>Inversión Total Maestra</TableCell>
                                        <TableCell className="text-right pr-10 font-black text-3xl text-primary italic">{formatCurrency(totalBudget, "USD")}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Card>
                    </section>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                <Card className="glass-card border-none p-8 rounded-[2rem]">
                    <h4 className="text-[10px] font-black uppercase text-primary tracking-widest mb-4 flex items-center gap-2"><Building className="h-3 w-3"/> 6. Aliados</h4>
                    <p className="text-xs font-bold text-white/60 italic leading-relaxed">Redes 5G, SENIAT, SAPI y Comercio Local Piloto.</p>
                </Card>
                <Card className="glass-card border-none p-8 rounded-[2rem] border-l-2 border-primary">
                    <h4 className="text-[10px] font-black uppercase text-primary tracking-widest mb-4 flex items-center gap-2"><Users className="h-3 w-3"/> 7. Jerarquía</h4>
                    <p className="text-xs font-bold text-white/60 italic leading-relaxed"><b>Carlos Mattar:</b> Estrategia. Sebastián y Marcos: Ejecución y Soporte.</p>
                </Card>
                <Card className="glass-card border-none p-8 rounded-[2rem]">
                    <h4 className="text-[10px] font-black uppercase text-primary tracking-widest mb-4 flex items-center gap-2"><BadgeCheck className="h-3 w-3"/> 8. Metas</h4>
                    <p className="text-xs font-bold text-white/60 italic leading-relaxed">Eliminación del riesgo fiscal y digitalización 100% de la comunidad.</p>
                </Card>
                <Card className="glass-card border-none p-8 rounded-[2rem]">
                    <h4 className="text-[10px] font-black uppercase text-primary tracking-widest mb-4 flex items-center gap-2"><Activity className="h-3 w-3"/> 9. Sostenibilidad</h4>
                    <p className="text-xs font-bold text-white/60 italic leading-relaxed">Monetización de residuos plásticos y metálicos mediante inducción magnética.</p>
                </Card>
            </div>
        </div>
    );
}
