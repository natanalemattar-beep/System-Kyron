
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { 
  Download, 
  Users, 
  CheckCircle,
  MapPin,
  Building,
  ThermometerSun,
  Recycle,
  Layers,
  BookOpen,
  AlertTriangle,
  Zap,
  Rocket,
  ShieldCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const teamData = [
  { label: "NOMBRE DEL PROYECTO", value: "System Kyron" },
  { label: "INTEGRANTES DEL EQUIPO", value: "Carlos Mattar, Sebastian Garrido, Marcos Sousa" },
  { label: "INSTITUCIÓN EDUCATIVA", value: "U.E.P. Gabriela Mistral" },
  { label: "PAÍS/CIUDAD", value: "Venezuela, La Guaira" },
];

const zeduData = [
  { 
    label: "LOCALIDAD ESPECÍFICA", 
    value: "Venezuela, La Guaira, Municipio Vargas, Catia La Mar, Sector La Atlántida (Calle 7 a Calle 3).",
    icon: MapPin 
  },
  { 
    label: "NOMBRE DE LA COMUNIDAD", 
    value: "Sector Comercial y Educativo La Atlántida - Punto de Referencia: Supermercado Bensica.",
    icon: Building 
  },
  { 
    label: "CANTIDAD TOTAL DE HABITANTES", 
    value: "Aprox. 15,000 residentes y una población flotante de 4,500 personas por actividad comercial.",
    icon: Users 
  },
  { 
    label: "CARACTERÍSTICAS DE LA POBLACIÓN", 
    value: "Zona costera con alta densidad de comercios. Elevada generación de residuos físicos, ideal para la digitalización Kyron.",
    icon: Recycle 
  },
  { 
    label: "CLIMA", 
    value: "Tropical costero. Temperatura promedio: 28°C. Brisa marina constante.",
    icon: ThermometerSun 
  }
];

const problemAnalysis = {
  causas: [
    "Falta de organización administrativa",
    "Poca disposición al cambio de procesos",
    "Escaso presupuesto para infraestructura",
    "Desactualización tecnológica crítica"
  ],
  consecuencias: "Pérdida masiva de tiempo en búsqueda de archivos y documentos físicos.",
  definicion: "En la Institución el sistema de archivado es muy pobre, ya que el método es netamente físico. Esto no permite agilidad a la hora de buscar información respecto a un estudiante de la institución.",
  importancia: "Es vital disminuir la carga de trabajo y optimizar los tiempos de respuesta mediante la digitalización IA.",
  origen: "Desactualización e ignorancia en la gestión de nuevas tecnologías y procesos digitales."
};

const proposedSolution = {
  titulo: "SOLUCIÓN PROPUESTA",
  desarrollo: "System Kyron consiste en el desarrollo de una aplicación que transforma el sistema de archivado tradicional de una institución educativa en un entorno digital eficiente y organizado, permitiendo la digitalización, almacenamiento y búsqueda rápida de documentos que antes se gestionaban de forma física. La plataforma integrará un chatbot con atención automatizada dirigida a los representantes de los estudiantes, facilitando respuestas inmediatas y mejorando la comunicación colegio-familia. Además, incorporará herramientas de inteligencia artificial que apoyarán al personal administrativo en la generación de ideas estratégicas, contribuyendo a una gestión más moderna, ágil y orientada a la mejora continua institucional."
};

const differentiatorsData = {
  nombreProyecto: "System Kyron",
  otrasPropuestas: "Los proyectos más similares son MOBIAN, que se enfoca en la optimización de datos para cualquier negocio, en donde su propósito es la eficiencia operativa y escalabilidad técnica dirigiéndose a equipos técnicos y directivos corporativos con la integración de sistemas y aumento de equipo.",
  diferenciadores: "Integración de blindaje fiscal 0% riesgo, sellado inmutable Blockchain de registros académicos, chatbot especializado para la comunidad educativa venezolana y arquitectura modular escalable para holdings institucionales."
};

export default function EstudioPoblacionPage() {
    const { toast } = useToast();

    const handleDownloadWord = () => {
        const content = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head><meta charset='utf-8'><title>Informe Técnico - System Kyron</title>
            <style>
                body { font-family: 'Arial', sans-serif; padding: 40px; color: #000; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 30px; page-break-inside: avoid; }
                th, td { border: 1px solid #000; padding: 12px; text-align: left; }
                th { background-color: #f2f2f2; font-weight: bold; text-transform: uppercase; font-size: 10pt; }
                .main-title { text-align: center; font-size: 22pt; font-weight: bold; margin-bottom: 40px; color: #0A2472; }
                .section-title { font-size: 14pt; font-weight: bold; text-transform: uppercase; margin-top: 30px; margin-bottom: 10px; color: #2563eb; border-bottom: 2px solid #eee; }
                .description-text { text-align: justify; margin-bottom: 20px; font-size: 11pt; line-height: 1.5; }
                .highlight-box { border: 2px solid #0A2472; padding: 15px; background-color: #f9f9f9; margin-bottom: 20px; }
            </style>
            </head>
            <body>
                <div class="main-title">INFORME TÉCNICO DE MISIÓN CRÍTICA - SYSTEM KYRON</div>
                
                <div class="section-title">1. INFORMACIÓN DEL EQUIPO</div>
                <table>
                    ${teamData.map(item => `
                        <tr>
                            <th style="width: 35%;">${item.label}</th>
                            <td>${item.value}</td>
                        </tr>
                    `).join('')}
                </table>

                <div class="section-title">2. MATRIZ DE POBLACIÓN (ZEDU)</div>
                <table>
                    ${zeduData.map(item => `
                        <tr>
                            <th style="width: 35%;">${item.label}</th>
                            <td>${item.value}</td>
                        </tr>
                    `).join('')}
                </table>

                <div class="section-title">3. ANÁLISIS DEL PROBLEMA</div>
                <table>
                    <tr>
                        <th style="width: 35%;">CAUSAS DEL PROBLEMA</th>
                        <td>${problemAnalysis.causas.join(', ')}</td>
                    </tr>
                    <tr>
                        <th>DEFINICIÓN DEL PROBLEMA</th>
                        <td>${problemAnalysis.definicion}</td>
                    </tr>
                </table>

                <div class="section-title">4. SOLUCIÓN PROPUESTA</div>
                <div class="description-text">${proposedSolution.desarrollo}</div>

                <div class="section-title">5. DIFERENCIADORES Y MERCADO</div>
                <table>
                    <tr>
                        <th style="width: 35%;">NOMBRE DEL PROYECTO</th>
                        <td>${differentiatorsData.nombreProyecto}</td>
                    </tr>
                    <tr>
                        <th>OTRAS PROPUESTAS EXISTENTES</th>
                        <td>${differentiatorsData.otrasPropuestas}</td>
                    </tr>
                    <tr>
                        <th>DIFERENCIADORES DE TU SOLUCIÓN</th>
                        <td>${differentiatorsData.diferenciadores}</td>
                    </tr>
                </table>

                <p style="margin-top: 50px; font-size: 9pt; text-align: center; color: #666;">Documento Generado por System Kyron v2.6 • Nodo La Guaira</p>
            </body>
            </html>
        `;

        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(content);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'Informe_Tecnico_SystemKyron_Final.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);

        toast({
            title: "Informe Técnico Final",
            description: "El documento completo con los 6 bloques ha sido generado.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    return (
        <div className="space-y-16 w-full animate-in fade-in duration-1000 pb-24">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-8 border-primary pl-10 py-2">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 shadow-glow">
                        <Rocket className="h-3 w-3" /> Mission Status: Ready
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter flex items-center gap-4 italic italic-shadow text-white uppercase leading-none">
                        <BookOpen className="h-14 w-14 text-primary" />
                        ESTUDIO TÉCNICO
                    </h1>
                    <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40">U.E.P. Gabriela Mistral • Nodo La Guaira</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-20 px-16 rounded-2xl shadow-glow text-base font-black" onClick={handleDownloadWord}>
                    <Download className="mr-4 h-8 w-8" /> EXPORTAR INFORME FINAL (.DOC)
                </Button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                
                {/* Panel Izquierdo: Ficha y Zedu */}
                <div className="xl:col-span-4 space-y-12">
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Ficha del Proyecto
                        </h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl">
                            <CardContent className="p-0">
                                {teamData.map((item, index) => (
                                    <div key={index} className="p-8 border-b border-white/5 last:border-none hover:bg-white/[0.03] transition-all group">
                                        <h3 className="font-black text-[9px] uppercase tracking-widest text-primary mb-2 opacity-60 group-hover:opacity-100 transition-opacity">{item.label}</h3>
                                        <p className="text-xl font-black text-white/90 italic tracking-tight">{item.value}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Matriz ZEDU
                        </h3>
                        <div className="space-y-4">
                            {zeduData.map((item, index) => (
                                <Card key={index} className="glass-card border-none p-6 hover:bg-white/[0.05] transition-all group">
                                    <div className="flex items-center gap-6">
                                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
                                            <item.icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-primary/60 mb-1">{item.label}</p>
                                            <p className="text-xs font-bold text-white/80 italic">{item.value}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Panel Derecho: Análisis, Solución y Diferenciadores */}
                <div className="xl:col-span-8 space-y-12">
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Análisis del Problema */}
                        <Card className="glass-card border-none p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.02] scale-150 rotate-12">
                                <AlertTriangle className="h-48 w-48 text-primary" />
                            </div>
                            <h3 className="text-2xl font-black uppercase italic flex items-center gap-4 mb-8 text-white">
                                <AlertTriangle className="text-primary h-8 w-8" /> ANÁLISIS DEL PROBLEMA
                            </h3>
                            <div className="space-y-8">
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-inner">
                                    <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-primary mb-4 opacity-60">Definición Técnica</h4>
                                    <p className="text-sm font-bold italic text-white/80 leading-relaxed text-justify">{problemAnalysis.definicion}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                        <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-2">Consecuencia</p>
                                        <p className="text-xs font-bold text-white/70 italic leading-tight">{problemAnalysis.consecuencias}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                                        <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-2">Importancia</p>
                                        <p className="text-xs font-bold text-white/70 italic leading-tight">{problemAnalysis.importancia}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Solución Propuesta */}
                        <Card className="border-none bg-primary p-12 text-primary-foreground relative overflow-hidden shadow-glow rounded-[3rem]">
                            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                                <Zap className="h-64 w-64 text-white" />
                            </div>
                            <div className="relative z-10 space-y-8">
                                <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-white border border-white/20">
                                    <CheckCircle className="h-3 w-3" /> Solución Oficial
                                </div>
                                <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white leading-none">SOLUCIÓN <br/> PROPUESTA</h3>
                                <p className="text-base font-black italic leading-relaxed text-white/90 border-l-4 border-white/30 pl-8 text-justify">
                                    {proposedSolution.desarrollo}
                                </p>
                            </div>
                        </Card>
                    </section>

                    {/* Parte 6: Diferenciadores */}
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6">Diferenciadores y Mercado</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl p-2">
                            <Table>
                                <TableBody>
                                    <TableRow className="border-b border-white/5 hover:bg-white/[0.02]">
                                        <TableCell className="font-black text-[10px] uppercase tracking-widest text-primary py-8 pl-10 w-1/3">Nombre del Proyecto</TableCell>
                                        <TableCell className="py-8 pr-10 text-xl font-black text-white italic">{differentiatorsData.nombreProyecto}</TableCell>
                                    </TableRow>
                                    <TableRow className="border-b border-white/5 hover:bg-white/[0.02]">
                                        <TableCell className="font-black text-[10px] uppercase tracking-widest text-primary py-8 pl-10">Otras Propuestas Existentes</TableCell>
                                        <TableCell className="py-8 pr-10 text-sm font-bold text-white/70 leading-relaxed text-justify">{differentiatorsData.otrasPropuestas}</TableCell>
                                    </TableRow>
                                    <TableRow className="border-none hover:bg-white/[0.02]">
                                        <TableCell className="font-black text-[10px] uppercase tracking-widest text-primary py-8 pl-10">Diferenciadores de tu Solución</TableCell>
                                        <TableCell className="py-8 pr-10">
                                            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                                                <p className="text-base font-black text-primary italic leading-tight">{differentiatorsData.diferenciadores}</p>
                                            </div>
                                        </TableCell>
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
