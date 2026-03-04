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
  Signal,
  BadgeCheck,
  BrainCircuit,
  Globe,
  Users,
  ShieldCheck,
  Recycle,
  Building
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function ModeloZEDUPage() {
    const { toast } = useToast();

    const budgetData = [
      { item: "Contrato Mayorista Operador (Factor Principal)", cost: 5000, cat: "Telecom" },
      { item: "Tarjetas SIM Físicas System Kyron (1.000)", cost: 1000, cat: "Telecom" },
      { item: "Plataforma Gestión eSIM/Billing", cost: 2500, cat: "Telecom" },
      { item: "Lote Smartphones Homologados (Samsung/Xiaomi)", cost: 6000, cat: "Equipos" },
      { item: "Tablets Educativas (Piloto Gabriela Mistral)", cost: 3600, cat: "Equipos" },
      { item: "Infraestructura Internet Fijo Empresarial", cost: 800, cat: "Telecom" },
      { item: "Desarrollo Ecosistema Firebase/Cloud", cost: 4500, cat: "Software" },
      { item: "Módulo Inteligencia Artificial (Gemini)", cost: 1000, cat: "Software" },
      { item: "Hardware Papelera Magnética Prototipo", cost: 683, cat: "Ingeniería" },
      { item: "Moto Bera Carguera DT-200 (Logística Litoral)", cost: 2800, cat: "Logística" },
      { item: "Máquinas Fiscales Homologadas (The Factory)", cost: 1350, cat: "Fiscal" },
      { item: "Marketing y Despliegue en La Guaira", cost: 2450, cat: "Operaciones" },
    ];

    const totalBudget = budgetData.reduce((acc, curr) => acc + curr.cost, 0);

    const handleDownloadWord = () => {
        const content = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h1 style="text-align: center; color: #2563eb; text-transform: uppercase;">MODELO ZEDU - SYSTEM KYRON</h1>
                <h2 style="text-align: center; color: #666;">Telecomunicaciones como Eje Central + Automatización Fiscal y Reciclaje</h2>
                
                <hr style="border: 1px solid #eee; margin: 20px 0;" />

                <h3>1. INFORMACIÓN DEL EQUIPO</h3>
                <p><b>PROYECTO:</b> System Kyron</p>
                <p><b>INTEGRANTES:</b> Carlos Mattar (Líder Inteligencia), Sebastián Garrido (Apoyo), Marcos Sousa (Apoyo)</p>
                <p><b>INSTITUCIÓN AVAL:</b> Colegio Gabriela Mistral (La Guaira)</p>

                <h3>2. POBLACIÓN A TRABAJAR</h3>
                <p><b>LOCALIDAD:</b> Venezuela, estado La Guaira, parroquia La Guaira (Catia La Mar).</p>
                <p><b>NOMBRE DE LA COMUNIDAD:</b> Sector comercial de La Atlántida (Supermercado Bensica) y Comunidad Educativa Gabriela Mistral.</p>
                <p><b>HABITANTES:</b> 3.000 personas impactadas.</p>

                <h3>3. ANÁLISIS DEL PROBLEMA (General)</h3>
                <p><b>DESCRIPCIÓN:</b> El principal obstáculo para el desarrollo en La Guaira es la <b>conectividad deficiente y costosa</b>. Las empresas y ciudadanos contratan servicios fragmentados (telefonía por un lado, software por otro), lo que eleva los costos. A esto se suma el alto <b>riesgo fiscal</b> por leyes cambiantes y la falta de infraestructura para el reciclaje en una zona costera donde la salinidad deteriora rápidamente los activos físicos.</p>

                <h3>4. SOLUCIÓN PROPUESTA (Eje Telecom)</h3>
                <p><b>DESARROLLO:</b> System Kyron ataca la raíz: provee la <b>columna vertebral de telecomunicaciones</b> (Línea 5G, eSIM, Venta de Equipos). Sobre esta red propietaria, se montan servicios de valor: automatización fiscal para comercios y digitalización escolar. El ecosistema se completa con papeleras inteligentes que monetizan el reciclaje en activos digitales.</p>

                <h3>5. PRESUPUESTO TÉCNICO MAESTRO</h3>
                <p><b>INVERSIÓN TOTAL:</b> $${totalBudget.toLocaleString()},00 USD</p>
                <p>Incluye contrato mayorista de red, desarrollo de software, logística con Moto Bera y equipos fiscales.</p>

                <h3>7. PLAN DE ACCIÓN JERÁRQUICO</h3>
                <p><b>LIDERAZGO INTELIGENTE:</b> Carlos Mattar (Arquitectura técnica, IA, Estrategia).</p>
                <p><b>SOPORTE OPERATIVO:</b> Sebastián y Marcos (Logística, carga de datos, mantenimiento).</p>
            </div>
        `;

        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;
        
        const blob = new Blob([sourceHTML], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Modelo_ZEDU_System_Kyron_General.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ title: "Documento Generado", description: "Informe Modelo ZEDU descargado exitosamente." });
    };

    return (
        <div className="space-y-16 w-full animate-in fade-in duration-700 pb-32">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-8 border-primary pl-10 py-2 w-full">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 shadow-glow">
                        <Signal className="h-3 w-3 animate-pulse" /> Eje Principal: Telecomunicaciones
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic italic-shadow text-white uppercase leading-none">MODELO <span className="text-primary">ZEDU</span></h1>
                    <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40 italic leading-none">SYSTEM KYRON • INFRAESTRUCTURA INTEGRAL • 2026</p>
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
                                    <h3 className="font-black text-[9px] uppercase tracking-widest text-primary opacity-60 mb-2">NOMBRE DEL PROYECTO</h3>
                                    <p className="text-3xl font-black italic text-white">System Kyron</p>
                                </div>
                                <div className="p-8 border-b border-white/5">
                                    <h3 className="font-black text-[9px] uppercase tracking-widest text-primary opacity-60 mb-2">INTEGRANTES DEL EQUIPO</h3>
                                    <p className="text-lg font-black text-white italic">Carlos Mattar (Líder), Sebastián Garrido, Marcos Sousa</p>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-black text-[9px] uppercase tracking-widest text-primary opacity-60 mb-2">INSTITUCIÓN AVAL</h3>
                                    <p className="text-lg font-black text-white/60 italic">Colegio Gabriela Mistral</p>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Globe className="h-4 w-4"/> 2. Población a Trabajar</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
                            <CardContent className="p-0 text-sm font-bold text-white/70 italic">
                                <div className="p-8 border-b border-white/5">
                                    <span className="text-[9px] block mb-1 opacity-40 uppercase tracking-widest">Localidad</span>
                                    La Guaira, Catia La Mar (Sector Costero).
                                </div>
                                <div className="p-8 border-b border-white/5">
                                    <span className="text-[9px] block mb-1 opacity-40 uppercase tracking-widest">Comunidad Impactada</span>
                                    Supermercado Bensica (La Atlántida) y Colegio Gabriela Mistral.
                                </div>
                                <div className="p-8">
                                    <span className="text-[9px] block mb-1 opacity-40 uppercase tracking-widest">Población</span>
                                    3.000 personas (Eje comercial y educativo).
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>

                <div className="xl:col-span-7 space-y-12">
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><AlertTriangle className="h-4 w-4" /> 3. Análisis del Problema (General)</h3>
                        <Card className="glass-card border-none p-10 leading-relaxed shadow-2xl rounded-[2.5rem]">
                            <p className="text-xl font-bold text-white/90 italic text-justify leading-relaxed">
                                El sector comercial y educativo de Catia La Mar opera con una <b>infraestructura de conectividad obsoleta y costosa</b>. La falta de un ecosistema que unifique la telefonía con la gestión fiscal genera ineficiencias críticas. Además, el clima costero acelera el deterioro de archivos físicos y la ausencia de incentivos digitales frena la cultura del reciclaje en la zona.
                            </p>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Zap className="h-4 w-4" /> 4. Solución: Factor Telecom</h3>
                        <Card className="glass-card border-none p-10 leading-relaxed shadow-2xl relative overflow-hidden rounded-[2.5rem]">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.02]"><BrainCircuit className="h-32 w-32" /></div>
                            <p className="text-xl font-bold text-white/90 italic text-justify leading-relaxed">
                                System Kyron despliega una <b>red de telecomunicaciones propia (Línea 5G/eSIM)</b> como base del ecosistema. Sobre esta infraestructura, el comerciante y la institución educativa acceden a IA para cumplimiento fiscal y gestión de datos, monetizando sus residuos mediante tecnología de reciclaje magnético.
                            </p>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Calculator className="h-4 w-4" /> 5. Presupuesto Técnico</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white/[0.03] border-none">
                                        <TableHead className="font-black text-[10px] uppercase text-primary pl-10 py-6">Ítem Técnico</TableHead>
                                        <TableHead className="text-center font-black text-[10px] uppercase text-primary py-6">Cat.</TableHead>
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
                                        <TableCell className="font-black text-xl pl-10 py-10 italic uppercase text-white" colSpan={2}>Inversión Total Estimada</TableCell>
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
                    <p className="text-xs font-bold text-white/60 italic leading-relaxed">Operadores de red (Digitel/Movistar), The Factory HKA y Supermercado Bensica.</p>
                </Card>
                <Card className="glass-card border-none p-8 rounded-[2rem] border-l-2 border-primary">
                    <h4 className="text-[10px] font-black uppercase text-primary tracking-widest mb-4 flex items-center gap-2"><Users className="h-3 w-3"/> 7. Plan Jerárquico</h4>
                    <p className="text-xs font-bold text-white/60 italic leading-relaxed"><b>Carlos Mattar (Líder):</b> Inteligencia y Estrategia. Sebastián y Marcos: Ejecución y Logística.</p>
                </Card>
                <Card className="glass-card border-none p-8 rounded-[2rem]">
                    <h4 className="text-[10px] font-black uppercase text-primary tracking-widest mb-4 flex items-center gap-2"><BadgeCheck className="h-3 w-3"/> 8. Metas</h4>
                    <p className="text-xs font-bold text-white/60 italic leading-relaxed">1.000 Líneas Kyron activas y 100% de automatización fiscal en los comercios aliados.</p>
                </Card>
                <Card className="glass-card border-none p-8 rounded-[2rem]">
                    <h4 className="text-[10px] font-black uppercase text-primary tracking-widest mb-4 flex items-center gap-2"><Recycle className="h-3 w-3"/> 9. Sostenibilidad</h4>
                    <p className="text-xs font-bold text-white/60 italic leading-relaxed">Transformación de residuos sólidos en créditos digitales para servicios de telefonía.</p>
                </Card>
            </div>
        </div>
    );
}
