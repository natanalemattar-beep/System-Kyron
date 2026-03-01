
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { 
  Download, 
  Users, 
  MapPin, 
  CheckCircle,
  FileText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const zeduData = {
  localizacion: "Venezuela, La Atlántida entre calle 7 a calle 3, Catia La Mar Pinta Catia, Supermercado Bensica.",
  comunidad: "La Atlántida catia La Mar",
  habitantes: "Aproximadamente 500 empresas (unos 5.000 empleados)",
  genero: "52% femenino, 48% masculino (en cargos administrativos)",
  edad: "25-40 años: 60% / 41-55 años: 30% / mayores de 55: 10%",
  caracteristicas: "Empresas que buscan automatizar sus procesos fiscales y contables, y que además están interesadas en adoptar prácticas sostenibles. Generan grandes volúmenes de residuos de papel y otros materiales reciclables",
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
            </style>
            </head>
            <body>
                <div class="title">POBLACIÓN A TRABAJAR</div>
                <table>
                    <tr><th>PAÍS/ CIUDAD/ MUNICIPIO/ LOCALIDAD ESPECÍFICA</th></tr>
                    <tr><td>${zeduData.localizacion}</td></tr>
                    <tr><th>NOMBRE DE LA COMUNIDAD</th></tr>
                    <tr><td>${zeduData.comunidad}</td></tr>
                    <tr><th>CANTIDAD TOTAL DE HABITANTES</th></tr>
                    <tr><td>${zeduData.habitantes}</td></tr>
                    <tr><th>CANTIDAD DE HABITANTES POR GÉNERO</th></tr>
                    <tr><td>${zeduData.genero}</td></tr>
                    <tr><th>CANTIDAD DE HABITANTES POR EDAD</th></tr>
                    <tr><td>${zeduData.edad}</td></tr>
                    <tr><th>CARACTERISTICAS DE LA POBLACIÓN</th></tr>
                    <tr><td>${zeduData.caracteristicas}</td></tr>
                    <tr><th>CLIMA</th></tr>
                    <tr><td>${zeduData.clima}</td></tr>
                </table>
                <p style="margin-top: 50px; font-size: 8pt; text-align: center; color: #666;">Documento generado por System Kyron v2.6 - Modelo Zedu Oficial</p>
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
                    <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-widest italic">Estudio Técnico de Segmentación • Catia La Mar</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-14 px-10 rounded-2xl shadow-2xl" onClick={handleDownloadWord}>
                    <Download className="mr-3 h-5 w-5" /> DESCARGAR PARA WORD
                </Button>
            </header>

            <Card className="glass-card border-none overflow-hidden max-w-5xl mx-auto shadow-[0_0_50px_rgba(0,0,0,0.3)]">
                <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                    <CardTitle className="text-[11px] font-black uppercase tracking-[0.6em] text-primary italic">Documento Maestro Zedu</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="w-full">
                        <Table className="border-collapse">
                            <TableBody>
                                {/* País / Localidad */}
                                <TableRow className="border-white/5">
                                    <TableCell className="p-0">
                                        <div className="bg-white/[0.03] px-8 py-4 font-black text-[10px] uppercase tracking-widest text-primary border-b border-white/5">PAÍS/ CIUDAD/ MUNICIPIO/ LOCALIDAD ESPECÍFICA</div>
                                        <div className="px-8 py-6 text-sm font-bold text-white/90 italic">{zeduData.localizacion}</div>
                                    </TableCell>
                                </TableRow>
                                {/* Comunidad */}
                                <TableRow className="border-white/5">
                                    <TableCell className="p-0">
                                        <div className="bg-white/[0.03] px-8 py-4 font-black text-[10px] uppercase tracking-widest text-primary border-b border-white/5">NOMBRE DE LA COMUNIDAD</div>
                                        <div className="px-8 py-6 text-xl font-black text-white italic uppercase tracking-tight">{zeduData.comunidad}</div>
                                    </TableCell>
                                </TableRow>
                                {/* Habitantes Totales */}
                                <TableRow className="border-white/5">
                                    <TableCell className="p-0">
                                        <div className="bg-white/[0.03] px-8 py-4 font-black text-[10px] uppercase tracking-widest text-primary border-b border-white/5">CANTIDAD TOTAL DE HABITANTES</div>
                                        <div className="px-8 py-6 text-base font-bold text-white/80">{zeduData.habitantes}</div>
                                    </TableCell>
                                </TableRow>
                                {/* Género */}
                                <TableRow className="border-white/5">
                                    <TableCell className="p-0">
                                        <div className="bg-white/[0.03] px-8 py-4 font-black text-[10px] uppercase tracking-widest text-primary border-b border-white/5">CANTIDAD DE HABITANTES POR GÉNERO</div>
                                        <div className="px-8 py-6 text-sm font-bold text-white/70 italic">{zeduData.genero}</div>
                                    </TableCell>
                                </TableRow>
                                {/* Edad */}
                                <TableRow className="border-white/5">
                                    <TableCell className="p-0">
                                        <div className="bg-white/[0.03] px-8 py-4 font-black text-[10px] uppercase tracking-widest text-primary border-b border-white/5">CANTIDAD DE HABITANTES POR EDAD</div>
                                        <div className="px-8 py-6 font-mono text-primary font-black text-lg">{zeduData.edad}</div>
                                    </TableCell>
                                </TableRow>
                                {/* Características */}
                                <TableRow className="border-white/5">
                                    <TableCell className="p-0">
                                        <div className="bg-white/[0.03] px-8 py-4 font-black text-[10px] uppercase tracking-widest text-primary border-b border-white/5">CARACTERISTICAS DE LA POBLACIÓN</div>
                                        <div className="px-8 py-6 text-sm text-muted-foreground leading-relaxed text-justify font-medium">{zeduData.caracteristicas}</div>
                                    </TableCell>
                                </TableRow>
                                {/* Clima */}
                                <TableRow className="border-none">
                                    <TableCell className="p-0">
                                        <div className="bg-white/[0.03] px-8 py-4 font-black text-[10px] uppercase tracking-widest text-primary border-b border-white/5">CLIMA</div>
                                        <div className="px-8 py-6 text-sm text-white/60 font-medium italic">{zeduData.clima}</div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <div className="max-w-5xl mx-auto flex justify-center py-10">
                <div className="flex items-center gap-6 opacity-20">
                    <div className="h-px w-24 bg-white"></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em]">Fin del Informe Técnico</p>
                    <div className="h-px w-24 bg-white"></div>
                </div>
            </div>
        </div>
    );
}
