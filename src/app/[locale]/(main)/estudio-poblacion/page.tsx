
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
  Info,
  BookOpen,
  AlertTriangle,
  Target,
  Zap,
  Rocket
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
  desarrollo: "Implementación del Ecosistema de Gestión Digital System Kyron para la digitalización del 100% de los archivos académicos y administrativos de la U.E.P. Gabriela Mistral. Utilizando IA para el reconocimiento de documentos (OCR) y almacenamiento seguro en la nube, permitiendo búsquedas instantáneas por Cédula o Nombre, eliminando el riesgo de pérdida física y reduciendo el tiempo de gestión en un 95%."
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
                ul { margin: 0; padding-left: 20px; }
                .highlight-box { border: 2px solid #0A2472; padding: 15px; background-color: #f9f9f9; }
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
                        <td><ul>${problemAnalysis.causas.map(c => `<li>${c}</li>`).join('')}</ul></td>
                    </tr>
                    <tr>
                        <th>CONSECUENCIAS</th>
                        <td>${problemAnalysis.consecuencias}</td>
                    </tr>
                    <tr>
                        <th>DEFINICIÓN DEL PROBLEMA</th>
                        <td>${problemAnalysis.definicion}</td>
                    </tr>
                    <tr>
                        <th>IMPORTANCIA DE RESOLVER</th>
                        <td>${problemAnalysis.importancia}</td>
                    </tr>
                </table>

                <div class="section-title">4. SOLUCIÓN PROPUESTA</div>
                <div class="highlight-box">
                    <p><strong>PROYECTO:</strong> ${proposedSolution.desarrollo}</p>
                </div>

                <p style="margin-top: 50px; font-size: 9pt; text-align: center; color: #666;">Documento Generado por System Kyron v2.6 • Nodo La Guaira</p>
            </body>
            </html>
        `;

        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(content);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'Informe_Tecnico_SystemKyron_U.E.P_GabrielaMistral.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);

        toast({
            title: "Informe Generado",
            description: "El documento completo ha sido exportado a Word.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-24">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-8 border-primary pl-10 py-2">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">
                        <Rocket className="h-3 w-3" /> Mission Status: Ready
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter flex items-center gap-4 italic italic-shadow text-white uppercase leading-none">
                        <BookOpen className="h-14 w-14 text-primary" />
                        ESTUDIO TÉCNICO
                    </h1>
                    <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40">U.E.P. Gabriela Mistral • Nodo La Guaira</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-20 px-16 rounded-2xl shadow-glow text-base font-black" onClick={handleDownloadWord}>
                    <Download className="mr-4 h-8 w-8" /> EXPORTAR INFORME (.DOC)
                </Button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                
                <div className="xl:col-span-4 space-y-10">
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
                        <Card className="glass-card border-none overflow-hidden shadow-2xl">
                            <CardContent className="p-10 space-y-8">
                                {zeduData.slice(0, 2).map((item, index) => (
                                    <div key={index} className="flex items-start gap-6">
                                        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 shrink-0">
                                            <item.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-1">{item.label}</p>
                                            <p className="text-sm font-bold text-white/80 leading-relaxed italic">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </section>
                </div>

                <div className="xl:col-span-8 space-y-10">
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6">Análisis Situacional</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {zeduData.slice(2).map((item, index) => (
                                <Card key={index} className="glass-card border-none p-8 hover:scale-105 transition-transform">
                                    <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 w-fit mb-6">
                                        <item.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-black text-[10px] uppercase tracking-widest text-primary/70 mb-3">{item.label}</h3>
                                    <p className="text-lg font-black text-white italic leading-tight">{item.value}</p>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <Card className="glass-card border-none p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.02] scale-150 rotate-12">
                                <AlertTriangle className="h-48 w-48 text-primary" />
                            </div>
                            <h3 className="text-2xl font-black uppercase italic flex items-center gap-4 mb-10 text-white">
                                <AlertTriangle className="text-primary h-8 w-8" /> DEFINICIÓN DEL PROBLEMA
                            </h3>
                            <div className="space-y-10">
                                <div>
                                    <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-primary mb-4 opacity-60">Causas Principales</h4>
                                    <ul className="space-y-3">
                                        {problemAnalysis.causas.map((c, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm font-bold text-white/70">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> {c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="pt-8 border-t border-white/5">
                                    <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-primary mb-4 opacity-60">Impacto en la Institución</h4>
                                    <p className="text-base font-bold italic text-white/80 leading-relaxed text-justify">{problemAnalysis.definicion}</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-none bg-primary p-12 text-primary-foreground relative overflow-hidden shadow-glow rounded-[3rem]">
                            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                                <Zap className="h-64 w-64 text-white" />
                            </div>
                            <div className="relative z-10 space-y-10">
                                <div>
                                    <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-white mb-6 border border-white/20">
                                        <CheckCircle className="h-3 w-3" /> Digital Engineering
                                    </div>
                                    <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-6 text-white leading-none">SOLUCIÓN <br/> PROPUESTA</h3>
                                    <p className="text-lg font-black italic leading-tight text-white/90 border-l-4 border-white/30 pl-8">
                                        {proposedSolution.desarrollo}
                                    </p>
                                </div>
                                <div className="pt-10 border-t border-white/10">
                                    <h4 className="font-black text-[10px] uppercase tracking-[0.4em] opacity-60 mb-4 text-white">Próximos Pasos</h4>
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-3xl">
                                        <p className="text-xs font-bold uppercase tracking-widest text-white/80">Estatus: Fase de Implementación IA Activa</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    );
}
