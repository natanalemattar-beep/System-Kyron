
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { Download, Crown, Zap, Calculator, AlertTriangle, BadgeCheck, BrainCircuit, Globe, Users, Building, Activity, ShieldAlert, Cpu } from "lucide-react";
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
                <h1 style="text-align: center; color: #2563eb; text-transform: uppercase;">MODELO ZEDU - SYSTEM KYRON (OFFICIAL)</h1>
                <h2 style="text-align: center; color: #666;">Ecosistema Integral: IA, Fiscalidad, Reciclaje y Telecomunicaciones</h2>
                <hr/>
                <h3>1. EQUIPO DE COMANDO</h3>
                <p><b>LÍDER ESTRATÉGICO:</b> Carlos Mattar (Inteligencia, IA y Arquitectura Cloud)</p>
                <p><b>APOYO OPERATIVO:</b> Sebastián Garrido, Marcos Sousa (Logística y Carga)</p>
                <p><b>INSTITUCIÓN AVAL:</b> Colegio Gabriela Mistral (La Guaira)</p>
                <h3>2. LOCALIDAD PILOTO</h3>
                <p><b>ESTADO:</b> La Guaira, Catia La Mar (Eje La Atlántida).</p>
                <p><b>PUNTO DE IMPACTO:</b> Supermercado Bensica & Comunidad Gabriela Mistral.</p>
                <h3>3. ANÁLISIS DEL PROBLEMA (GLOBAL)</h3>
                <p>La región enfrenta una fragmentación tecnológica crítica. La falta de conectividad 5G accesible impide la automatización de procesos escolares y comerciales. El sector retail (Bensica) sufre de un alto riesgo fiscal por falta de IA preventiva, mientras que el manejo de residuos carece de incentivos económicos, degradando el ecosistema costero.</p>
                <h3>4. SOLUCIÓN INTEGRAL</h3>
                <p>System Kyron despliega las Telecomunicaciones como factor principal, instalando red 5G y eSIMs. Sobre esta base, se monta el motor de IA Fiscal para blindar a los comercios, el Blockchain para inmutabilizar registros académicos y la Tecnología Magnética para monetizar el reciclaje.</p>
                <h3>5. INVERSIÓN TOTAL</h3>
                <p><b>TOTAL: $31.683,00 USD</b> (Incluye Moto Bera Carguera DT-200 para logística).</p>
            </div>
        `;
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body>";
        const footer = "</body></html>";
        const blob = new Blob([header + content + footer], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "ZEDU_System_Kyron_Master.doc";
        link.click();
        toast({ title: "Bóveda Abierta", description: "Informe técnico exportado con éxito." });
    };

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-32">
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-8 border-primary pl-10 py-2 w-full">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">
                        <ShieldAlert className="h-3 w-3" /> System Kyron Proprietary • Classified
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic italic-shadow text-white uppercase leading-none">MODELO <span className="text-primary">ZEDU</span></h1>
                    <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40 italic leading-none">Ecosistema Integral de Misión Crítica</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-20 px-16 rounded-2xl shadow-glow text-base font-black" onClick={handleDownloadWord}>
                    <Download className="mr-4 h-8 w-8" /> EXPORTAR VAULT (.DOC)
                </Button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 w-full">
                <div className="xl:col-span-4 space-y-10">
                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Crown className="h-4 w-4"/> 1. Jerarquía de Mando</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2rem]">
                            <CardContent className="p-0">
                                <div className="p-8 border-b border-white/5 bg-primary/[0.03]">
                                    <h3 className="font-black text-[8px] uppercase tracking-widest text-primary opacity-60 mb-2">INTELIGENCIA Y ESTRATEGIA</h3>
                                    <p className="text-3xl font-black italic text-white leading-none">Carlos Mattar</p>
                                </div>
                                <div className="p-8 border-b border-white/5">
                                    <h3 className="font-black text-[8px] uppercase tracking-widest text-primary opacity-60 mb-2">EJECUCIÓN Y SOPORTE</h3>
                                    <p className="text-lg font-black text-white/50 italic">Sebastián Garrido, Marcos Sousa</p>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-black text-[8px] uppercase tracking-widest text-primary opacity-60 mb-2">INSTITUCIÓN AVAL</h3>
                                    <p className="text-lg font-black text-white italic">C.E. Gabriela Mistral</p>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Globe className="h-4 w-4"/> 2. Población Piloto</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2rem] p-8 text-sm font-bold text-white/70 italic space-y-6">
                            <div className="flex justify-between items-center"><span className="opacity-40 uppercase tracking-widest text-[9px]">Estado</span> <span>La Guaira</span></div>
                            <div className="flex justify-between items-center"><span className="opacity-40 uppercase tracking-widest text-[9px]">Sector</span> <span>Catia La Mar</span></div>
                            <div className="flex justify-between items-center"><span className="opacity-40 uppercase tracking-widest text-[9px]">Aliado</span> <span>Supermercado Bensica</span></div>
                        </Card>
                    </section>
                </div>

                <div className="xl:col-span-8 space-y-12">
                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Activity className="h-4 w-4" /> 3. Análisis Holístico del Problema</h3>
                        <Card className="glass-card border-none p-10 leading-relaxed shadow-2xl rounded-[2.5rem] bg-red-500/[0.02]">
                            <p className="text-xl font-bold text-white/90 italic text-justify leading-relaxed">
                                El problema central es la <b>fragmentación operativa</b>. Los comercios en La Guaira operan con sistemas desconectados que elevan el riesgo de multas del SENIAT en un 40%. La falta de conectividad 5G impide el reciclaje eficiente, resultando en pérdidas económicas masivas y degradación ambiental costera. System Kyron resuelve esto unificando la IA, el Blockchain y la Red en un solo nodo.
                            </p>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Zap className="h-4 w-4" /> 4. Solución Integral: Ecosistema Kyron</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="glass-card border-none p-8 rounded-[2rem]">
                                <Cpu className="h-8 w-8 text-primary mb-4" />
                                <h4 className="font-black text-xs uppercase mb-2">Telecomunicaciones</h4>
                                <p className="text-[11px] text-white/50 leading-relaxed font-medium">Factor principal: Red 5G y eSIM para garantizar el flujo de datos ininterrumpido.</p>
                            </Card>
                            <Card className="glass-card border-none p-8 rounded-[2rem]">
                                <BrainCircuit className="h-8 w-8 text-primary mb-4" />
                                <h4 className="font-black text-xs uppercase mb-2">Inteligencia Fiscal</h4>
                                <p className="text-[11px] text-white/50 leading-relaxed font-medium">Blindaje total ante el SENIAT mediante algoritmos de auditoría predictiva.</p>
                            </Card>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Calculator className="h-4 w-4" /> 5. Presupuesto Técnico Maquetado</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white/[0.03] border-none">
                                        <TableHead className="font-black text-[10px] uppercase text-primary pl-10 py-6">Ítem del Ecosistema</TableHead>
                                        <TableHead className="text-right font-black text-[10px] uppercase text-primary py-6 pr-10">Monto</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {budgetData.map((row, i) => (
                                        <TableRow key={i} className="border-b border-white/5 hover:bg-primary/[0.02]">
                                            <TableCell className="font-bold pl-10 py-5 text-white/80">{row.item}</TableCell>
                                            <TableCell className="text-right pr-10 font-black italic text-primary">{formatCurrency(row.cost, "USD")}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="bg-primary/10 border-none">
                                        <TableCell className="font-black text-xl pl-10 py-10 italic uppercase text-white">Inversión Total Maestra</TableCell>
                                        <TableCell className="text-right pr-10 font-black text-3xl text-primary italic">{formatCurrency(totalBudget, "USD")}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    );
}
