"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { 
  Download, 
  Users, 
  MapPin, 
  ThermometerSun, 
  CheckCircle,
  Briefcase,
  FileText,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";

const zeduData = {
  pais: "Venezuela",
  ciudad: "Catia La Mar",
  municipio: "Vargas",
  localidad: "La Atlántida entre calle 7 a calle 3, Catia La Mar, Pinta Catia, Supermercado Bensica",
  comunidad: "La Atlántida - Catia La Mar",
  habitantesTotales: "Aproximadamente 500 empresas (5.000 empleados aprox.)",
  genero: "52% femenino, 48% masculino (en cargos administrativos)",
  edad: "25-40 años: 60% / 41-55 años: 30% / mayores de 55: 10%",
  caracteristicas: "Empresas que buscan automatizar sus procesos fiscales y contables, interesadas en adoptar prácticas sostenibles. Generan grandes volúmenes de residuos de papel y otros materiales reciclables.",
  clima: "Cálido tropical con influencia costera. Temperaturas promedio entre 26°C y 32°C. Alta salinidad ambiental."
};

export default function EstudioPoblacionPage() {
    const { toast } = useToast();

    const handleDownloadWord = () => {
        const content = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head><meta charset='utf-8'><title>Estudio de Población - Modelo Zedu</title>
            <style>
                body { font-family: 'Arial', sans-serif; padding: 40px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #000; padding: 12px; text-align: left; }
                th { background-color: #f2f2f2; font-weight: bold; text-transform: uppercase; font-size: 10pt; }
                .title { text-align: center; font-size: 18pt; font-weight: bold; text-transform: uppercase; margin-bottom: 30px; border-bottom: 2px solid #0A2472; padding-bottom: 10px; color: #0A2472; }
                .label { font-weight: bold; background-color: #f9f9f9; width: 30%; }
            </style>
            </head>
            <body>
                <div class="title">POBLACIÓN A TRABAJAR - MODELO ZEDU</div>
                <table>
                    <tr><th colspan="2">LOCALIZACIÓN GEOGRÁFICA</th></tr>
                    <tr><td class="label">PAÍS / CIUDAD / MUNICIPIO</td><td>${zeduData.pais}, ${zeduData.ciudad}, ${zeduData.municipio}</td></tr>
                    <tr><td class="label">LOCALIDAD ESPECÍFICA</td><td>${zeduData.localidad}</td></tr>
                    <tr><td class="label">NOMBRE DE LA COMUNIDAD</td><td>${zeduData.comunidad}</td></tr>
                    
                    <tr><th colspan="2">DATOS DEMOGRÁFICOS</th></tr>
                    <tr><td class="label">CANTIDAD DE HABITANTES</td><td>${zeduData.habitantesTotales}</td></tr>
                    <tr><td class="label">DISTRIBUCIÓN POR GÉNERO</td><td>${zeduData.genero}</td></tr>
                    <tr><td class="label">DISTRIBUCIÓN POR EDAD</td><td>${zeduData.edad}</td></tr>
                    
                    <tr><th colspan="2">ANÁLISIS PSICOGRÁFICO Y AMBIENTAL</th></tr>
                    <tr><td class="label">CARACTERÍSTICAS</td><td>${zeduData.caracteristicas}</td></tr>
                    <tr><td class="label">FACTOR CLIMÁTICO</td><td>${zeduData.clima}</td></tr>
                </table>
                <p style="margin-top: 50px; font-size: 8pt; text-align: center; color: #666;">Documento generado por System Kyron v2.6 - Inteligencia de Mercado</p>
            </body>
            </html>
        `;

        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(content);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'Modelo_Zedu_Poblacion_Kyron.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);

        toast({
            title: "Generación Completada",
            description: "El modelo Zedu ha sido exportado exitosamente.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    return (
        <div className="p-4 md:p-10 space-y-10 w-full animate-in fade-in duration-700">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-l-4 border-primary pl-8 py-2">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                        <Users className="h-8 w-8 text-primary" />
                        POBLACIÓN A TRABAJAR (MODELO ZEDU)
                    </h1>
                    <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-widest italic">Análisis de Segmentación • Catia La Mar</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-14 px-10 rounded-2xl shadow-2xl" onClick={handleDownloadWord}>
                    <Download className="mr-3 h-5 w-5" /> DESCARGAR PARA WORD
                </Button>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <Card className="lg:col-span-8 glass-card border-none overflow-hidden">
                    <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                        <CardTitle className="text-[11px] font-black uppercase tracking-[0.6em] text-primary italic">Matriz de Datos Maestro</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableBody>
                                <TableRow className="hover:bg-primary/[0.02] border-white/5 transition-all">
                                    <TableCell className="w-1/3 font-black text-[10px] uppercase tracking-widest text-white/40 pl-10 py-8">Localización Específica</TableCell>
                                    <TableCell className="py-8 pr-10">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                                            <p className="font-bold text-white/90 leading-relaxed italic">{zeduData.localidad}</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-primary/[0.02] border-white/5 transition-all">
                                    <TableCell className="font-black text-[10px] uppercase tracking-widest text-white/40 pl-10 py-8">Nombre Comunidad</TableCell>
                                    <TableCell className="py-8 pr-10 font-black text-xl italic text-primary uppercase">{zeduData.comunidad}</TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-primary/[0.02] border-white/5 transition-all">
                                    <TableCell className="font-black text-[10px] uppercase tracking-widest text-white/40 pl-10 py-8">Cantidad Habitantes</TableCell>
                                    <TableCell className="py-8 pr-10">
                                        <div className="flex items-center gap-3">
                                            <Briefcase className="h-5 w-5 text-secondary" />
                                            <p className="font-bold text-white/90">{zeduData.habitantesTotales}</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-primary/[0.02] border-white/5 transition-all">
                                    <TableCell className="font-black text-[10px] uppercase tracking-widest text-white/40 pl-10 py-8">Segmentación Género</TableCell>
                                    <TableCell className="py-8 pr-10 font-bold text-white/80 italic">{zeduData.genero}</TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-primary/[0.02] border-white/5 transition-all">
                                    <TableCell className="font-black text-[10px] uppercase tracking-widest text-white/40 pl-10 py-8">Distribución Edad</TableCell>
                                    <TableCell className="py-8 pr-10 font-mono text-primary font-black">{zeduData.edad}</TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-primary/[0.02] border-white/5 transition-all">
                                    <TableCell className="font-black text-[10px] uppercase tracking-widest text-white/40 pl-10 py-8">Características</TableCell>
                                    <TableCell className="py-8 pr-10 text-sm text-muted-foreground leading-relaxed text-justify font-medium">{zeduData.caracteristicas}</TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-primary/[0.02] border-none transition-all">
                                    <TableCell className="font-black text-[10px] uppercase tracking-widest text-white/40 pl-10 py-8">Factor Climático</TableCell>
                                    <TableCell className="py-8 pr-10">
                                        <div className="flex items-start gap-3">
                                            <ThermometerSun className="h-5 w-5 text-orange-400 shrink-0 mt-1" />
                                            <p className="text-sm text-white/70 font-medium italic">{zeduData.clima}</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="lg:col-span-4 space-y-10">
                    <Card className="bg-primary text-primary-foreground rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-all duration-700">
                            <FileText className="h-40 w-40" />
                        </div>
                        <CardHeader className="p-0 mb-6 relative z-10">
                            <CardTitle className="text-3xl font-black uppercase italic tracking-tighter">Uso del Modelo</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 relative z-10 space-y-6">
                            <p className="text-lg leading-relaxed font-bold opacity-80 italic">
                                Este modelo Zedu fundamenta la viabilidad técnica ante entes gubernamentales y socios.
                            </p>
                            <ul className="space-y-4 text-xs font-black uppercase tracking-widest">
                                <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4" /> Justificación Fiscal</li>
                                <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4" /> Diseño de Logística</li>
                                <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4" /> Impacto Ambiental</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-none">
                        <CardContent className="p-10 text-center space-y-6">
                            <Logo className="h-16 w-16 mx-auto opacity-20" />
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 italic">
                                Data Intelligence v2.6.8<br/>System Kyron Master Control
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}