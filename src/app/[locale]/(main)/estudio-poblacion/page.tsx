
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
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
  BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const teamData = [
  { label: "NOMBRE DEL PROYECTO", value: "AutoMind AI - System Kyron" },
  { label: "INTEGRANTES DEL EQUIPO", value: "Miguel Uzcategui, Miguel Angel Goites, Joaquin de Barros" },
  { label: "INSTITUCIÓN EDUCATIVA", value: "Colegio Santa Rosa de Lima" },
  { label: "PAÍS/CIUDAD", value: "Venezuela, Caracas" },
];

const zeduData = [
  { 
    label: "PAÍS / CIUDAD/ MUNICIPIO/ LOCALIDAD ESPECÍFICA", 
    value: "Venezuela, Caracas, Municipio Baruta, Sector Santa Rosa de Lima.",
    icon: MapPin 
  },
  { 
    label: "NOMBRE DE LA COMUNIDAD", 
    value: "Comunidad Educativa y Residencial Santa Rosa de Lima.",
    icon: Building 
  },
  { 
    label: "CANTIDAD TOTAL DE HABITANTES", 
    value: "Aprox. 12,500 residentes permanentes y 3,000 transeúntes diarios.",
    icon: Users 
  },
  { 
    label: "CANTIDAD DE HABITANTES POR GÉNERO", 
    value: "Femenino: 54% (6,750) | Masculino: 46% (5,750).",
    icon: Layers 
  },
  { 
    label: "CANTIDAD DE HABITANTES POR EDAD", 
    value: "0-18: 25% | 19-45: 45% | 46-65: 20% | +65: 10%.",
    icon: Info 
  },
  { 
    label: "CARACTERÍSTICAS DE LA POBLACIÓN", 
    value: "Sector de clase media-alta, alta actividad comercial y educativa. Gran interés en tecnologías de reciclaje inteligente y automatización.",
    icon: Recycle 
  },
  { 
    label: "CLIMA", 
    value: "Templado de montaña. Temperatura promedio: 22°C (Mín: 16°C / Máx: 28°C).",
    icon: ThermometerSun 
  }
];

export default function EstudioPoblacionPage() {
    const { toast } = useToast();

    const handleDownloadWord = () => {
        const content = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head><meta charset='utf-8'><title>Modelo Zedu - AutoMind AI</title>
            <style>
                body { font-family: 'Arial', sans-serif; padding: 40px; color: #000; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                th, td { border: 1px solid #000; padding: 12px; text-align: left; }
                th { background-color: #f2f2f2; font-weight: bold; text-transform: uppercase; font-size: 10pt; }
                .main-title { text-align: center; font-size: 22pt; font-weight: bold; margin-bottom: 40px; color: #0A2472; }
                .section-title { font-size: 14pt; font-weight: bold; text-transform: uppercase; margin-top: 20px; margin-bottom: 10px; color: #4CAF50; border-bottom: 2px solid #eee; }
            </style>
            </head>
            <body>
                <div class="main-title">MODELO ZEDU - ESTUDIO DE POBLACIÓN</div>
                
                <div class="section-title">INFORMACIÓN DEL EQUIPO</div>
                <table>
                    ${teamData.map(item => `
                        <tr>
                            <th style="width: 35%;">${item.label}</th>
                            <td>${item.value}</td>
                        </tr>
                    `).join('')}
                </table>

                <div class="section-title">POBLACIÓN A TRABAJAR</div>
                <table>
                    ${zeduData.map(item => `
                        <tr>
                            <th style="width: 35%;">${item.label}</th>
                            <td>${item.value}</td>
                        </tr>
                    `).join('')}
                </table>
                <p style="margin-top: 50px; font-size: 9pt; text-align: center; color: #666;">Documento Maestro • AutoMind AI • Generado por System Kyron v2.6</p>
            </body>
            </html>
        `;

        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(content);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'Modelo_Zedu_AutoMind_Completo.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);

        toast({
            title: "Exportación Exitosa",
            description: "El modelo Zedu completo ha sido descargado para Word.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-l-8 border-primary pl-8 py-2">
                <div className="space-y-2">
                    <h1 className="text-5xl font-black tracking-tighter flex items-center gap-4 italic italic-shadow text-white uppercase">
                        <BookOpen className="h-12 w-12 text-primary" />
                        ESTUDIO DE POBLACIÓN (ZEDU)
                    </h1>
                    <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40">Misión Crítica • AutoMind AI • Santa Rosa de Lima Node</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-16 px-12 rounded-2xl shadow-2xl" onClick={handleDownloadWord}>
                    <Download className="mr-3 h-6 w-6" /> DESCARGAR PARA WORD
                </Button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* BLOQUE EQUIPO */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">Equipo del Proyecto</span>
                        <div className="h-px flex-1 bg-white/5"></div>
                    </div>
                    <Card className="glass-card border-none overflow-hidden shadow-2xl p-2">
                        <CardContent className="p-0">
                            <Table>
                                <TableBody>
                                    {teamData.map((item, index) => (
                                        <TableRow key={index} className="border-white/5 hover:bg-primary/[0.03] transition-all">
                                            <TableCell className="p-0">
                                                <div className="flex flex-col p-8">
                                                    <h3 className="font-black text-[10px] uppercase tracking-widest text-primary mb-3 opacity-60">{item.label}</h3>
                                                    <p className="text-xl font-black text-white/90 italic tracking-tight">{item.value}</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* BLOQUE POBLACIÓN */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">Matriz Demográfica</span>
                        <div className="h-px flex-1 bg-white/5"></div>
                    </div>
                    <Card className="glass-card border-none overflow-hidden shadow-2xl p-2">
                        <CardContent className="p-0">
                            <Table>
                                <TableBody>
                                    {zeduData.map((item, index) => (
                                        <TableRow key={index} className="border-white/5 hover:bg-primary/[0.03] transition-all">
                                            <TableCell className="p-0">
                                                <div className="flex flex-col md:flex-row">
                                                    <div className="md:w-1/3 bg-white/[0.02] p-8 flex items-start gap-4 border-b md:border-b-0 md:border-r border-white/5">
                                                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                                                            <item.icon className="h-5 w-5 text-primary" />
                                                        </div>
                                                        <h3 className="font-black text-[9px] uppercase tracking-widest text-primary/70 mt-2">{item.label}</h3>
                                                    </div>
                                                    <div className="md:w-2/3 p-8 text-lg font-bold text-white/80 italic leading-relaxed text-justify">
                                                        {item.value}
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            <footer className="pt-10 text-center">
                <p className="text-[9px] font-black uppercase tracking-[0.8em] text-white/10 italic">
                    Kyron Intelligence Ledger • Santa Rosa de Lima Node v2.6 • 2026
                </p>
            </footer>
        </div>
    );
}
