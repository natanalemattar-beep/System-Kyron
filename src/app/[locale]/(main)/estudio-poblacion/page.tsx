
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
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const teamData = [
  { label: "NOMBRE DEL PROYECTO", value: "AutoMind AI - System Kyron" },
  { label: "INTEGRANTES DEL EQUIPO", value: "Miguel Uzcategui, Miguel Angel Goites, Joaquin de Barros" },
  { label: "INSTITUCIÓN EDUCATIVA", value: "U.E. Colegio Gabriela Mistral" },
  { label: "PAÍS/CIUDAD", value: "Venezuela, La Guaira" },
];

const zeduData = [
  { 
    label: "PAÍS / CIUDAD/ MUNICIPIO/ LOCALIDAD ESPECÍFICA", 
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
    label: "CANTIDAD DE HABITANTES POR GÉNERO", 
    value: "Femenino: 52% (7,800) | Masculino: 48% (7,200).",
    icon: Layers 
  },
  { 
    label: "CANTIDAD DE HABITANTES POR EDAD", 
    value: "0-18: 22% | 19-45: 48% | 46-65: 22% | +65: 8%.",
    icon: Info 
  },
  { 
    label: "CARACTERÍSTICAS DE LA POBLACIÓN", 
    value: "Zona costera con alta densidad de comercios. Elevada generación de residuos físicos, ideal para la digitalización Kyron.",
    icon: Recycle 
  },
  { 
    label: "CLIMA", 
    value: "Tropical costero. Temperatura promedio: 28°C (Mín: 24°C / Máx: 34°C). Brisa marina constante.",
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
  importancia: "Es vital disminuir la carga de trabajo y optimizar los tiempos de respuesta en la búsqueda de archivos mediante la digitalización.",
  origen: "Desactualización e ignorancia en la gestión de nuevas tecnologías y procesos digitales."
};

export default function EstudioPoblacionPage() {
    const { toast } = useToast();

    const handleDownloadWord = () => {
        const content = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head><meta charset='utf-8'><title>Informe Técnico - Gabriela Mistral</title>
            <style>
                body { font-family: 'Arial', sans-serif; padding: 40px; color: #000; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 30px; page-break-inside: avoid; }
                th, td { border: 1px solid #000; padding: 12px; text-align: left; }
                th { background-color: #f2f2f2; font-weight: bold; text-transform: uppercase; font-size: 10pt; }
                .main-title { text-align: center; font-size: 22pt; font-weight: bold; margin-bottom: 40px; color: #0A2472; }
                .section-title { font-size: 14pt; font-weight: bold; text-transform: uppercase; margin-top: 30px; margin-bottom: 10px; color: #4CAF50; border-bottom: 2px solid #eee; }
                ul { margin: 0; padding-left: 20px; }
            </style>
            </head>
            <body>
                <div class="main-title">INFORME TÉCNICO Y ESTUDIO DE POBLACIÓN</div>
                
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
                    <tr>
                        <th>ORIGEN DEL PROBLEMA</th>
                        <td>${problemAnalysis.origen}</td>
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
        fileDownload.download = 'Informe_Completo_Gabriela_Mistral.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);

        toast({
            title: "Exportación Exitosa",
            description: "El informe completo ha sido descargado.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-l-8 border-primary pl-10 py-2">
                <div className="space-y-2">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter flex items-center gap-4 italic italic-shadow text-white uppercase">
                        <BookOpen className="h-12 w-12 text-primary" />
                        ESTUDIO DE POBLACIÓN (ZEDU)
                    </h1>
                    <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40">Misión Crítica • AutoMind AI • Nodo La Guaira - Gabriela Mistral</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-16 px-12 rounded-2xl shadow-2xl" onClick={handleDownloadWord}>
                    <Download className="mr-3 h-6 w-6" /> DESCARGAR PARA WORD
                </Button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* BLOQUE 1: IDENTIFICACIÓN */}
                <div className="xl:col-span-4 space-y-6">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-4">Equipo Gabriela Mistral</h3>
                    <Card className="border-none overflow-hidden shadow-2xl bg-white/[0.02] backdrop-blur-3xl">
                        <CardContent className="p-0">
                            {teamData.map((item, index) => (
                                <div key={index} className="p-8 border-b border-white/5 last:border-none hover:bg-white/[0.02] transition-all">
                                    <h3 className="font-black text-[9px] uppercase tracking-widest text-primary mb-2 opacity-60">{item.label}</h3>
                                    <p className="text-lg font-black text-white/90 italic tracking-tight">{item.value}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* BLOQUE 2: ZEDU POBLACIÓN */}
                <div className="xl:col-span-8 space-y-6">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-4">Estudio Regional (La Guaira)</h3>
                    <Card className="border-none overflow-hidden shadow-2xl bg-white/[0.02] backdrop-blur-3xl">
                        <CardContent className="p-0">
                            <div className="grid md:grid-cols-2">
                                {zeduData.map((item, index) => (
                                    <div key={index} className="p-8 border-b border-white/5 last:border-none flex items-start gap-6 hover:bg-white/[0.02] transition-all">
                                        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 shrink-0">
                                            <item.icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-[9px] uppercase tracking-widest text-primary/70 mb-2">{item.label}</h3>
                                            <p className="text-sm font-bold text-white/80 italic leading-relaxed">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* BLOQUE 3: ANÁLISIS DEL PROBLEMA */}
                <div className="xl:col-span-12 space-y-6">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-4">Análisis del Problema Institucional</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Causas */}
                        <Card className="border-none bg-white/[0.02] backdrop-blur-3xl p-8">
                            <h3 className="text-xl font-black uppercase italic flex items-center gap-3 mb-6">
                                <AlertTriangle className="text-primary h-6 w-6" /> Causas
                            </h3>
                            <ul className="space-y-4">
                                {problemAnalysis.causas.map((causa, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-white/70">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        {causa}
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Consecuencias e Importancia */}
                        <Card className="border-none bg-white/[0.02] backdrop-blur-3xl p-8">
                            <div className="space-y-10">
                                <div>
                                    <h3 className="font-black text-[10px] uppercase tracking-widest text-primary mb-4">Consecuencias</h3>
                                    <p className="text-base font-bold italic text-white/80 leading-relaxed">{problemAnalysis.consecuencias}</p>
                                </div>
                                <div>
                                    <h3 className="font-black text-[10px] uppercase tracking-widest text-primary mb-4">Importancia</h3>
                                    <p className="text-base font-bold italic text-white/80 leading-relaxed">{problemAnalysis.importancia}</p>
                                </div>
                            </div>
                        </Card>

                        {/* Definición y Origen */}
                        <Card className="border-none bg-primary p-10 text-primary-foreground relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 p-10 opacity-10">
                                <Target className="h-40 w-40" />
                            </div>
                            <div className="relative z-10 space-y-8">
                                <div>
                                    <h3 className="font-black text-[10px] uppercase tracking-widest opacity-60 mb-4 text-white">Definición</h3>
                                    <p className="text-lg font-black italic leading-tight text-white">{problemAnalysis.definicion}</p>
                                </div>
                                <div className="pt-6 border-t border-white/10">
                                    <h3 className="font-black text-[10px] uppercase tracking-widest opacity-60 mb-4 text-white">Origen</h3>
                                    <p className="text-sm font-bold italic text-white/90">{problemAnalysis.origen}</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
