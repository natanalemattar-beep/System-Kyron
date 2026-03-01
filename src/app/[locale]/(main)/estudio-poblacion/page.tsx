
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { 
  Download, 
  Users, 
  CheckCircle,
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
                <div class="title">POBLACIÓN A TRABAJAR (MODELO ZEDU)</div>
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
                <p style="margin-top: 50px; font-size: 8pt; text-align: center; color: #666;">Documento generado por System Kyron v2.6 - Misión Crítica</p>
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
            description: "El modelo Zedu oficial ha sido exportado exitosamente.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    return (
        <div className="p-10 space-y-12 w-full animate-in fade-in duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-l-8 border-primary pl-10 py-4 bg-primary/5 rounded-r-3xl">
                <div className="space-y-2">
                    <h1 className="text-5xl font-black tracking-tighter flex items-center gap-4 italic italic-shadow text-white">
                        <Users className="h-12 w-12 text-primary" />
                        POBLACIÓN A TRABAJAR
                    </h1>
                    <p className="text-sm font-black text-primary uppercase tracking-[0.6em] opacity-60">Estudio Técnico Modelo Zedu • Catia La Mar</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-16 px-12 rounded-2xl shadow-2xl" onClick={handleDownloadWord}>
                    <Download className="mr-3 h-6 w-6" /> DESCARGAR PARA WORD
                </Button>
            </header>

            <Card className="glass-card border-none overflow-hidden shadow-2xl">
                <CardHeader className="p-12 border-b border-white/5 bg-white/[0.01]">
                    <CardTitle className="text-xs font-black uppercase tracking-[0.8em] text-primary italic">Documento Maestro Inmutable</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="w-full">
                        <Table className="border-collapse">
                            <TableBody>
                                <TableRow className="border-white/5 hover:bg-primary/[0.02] transition-colors">
                                    <TableCell className="p-0">
                                        <div className="bg-white/[0.03] px-12 py-6 font-black text-[11px] uppercase tracking-widest text-primary border-b border-white/5">PAÍS/ CIUDAD/ MUNICIPIO/ LOCALIDAD ESPECÍFICA</div>
                                        <div className="px-12 py-10 text-lg font-black text-white/90 italic leading-relaxed">{zeduData.localizacion}</div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="border-white/5 hover:bg-primary/[0.02] transition-colors">
                                    <TableCell className="p-0">
                                        <div className="bg-white/[0.03] px-12 py-6 font-black text-[11px] uppercase tracking-widest text-primary border-b border-white/5">NOMBRE DE LA COMUNIDAD</div>
                                        <div className="px-12 py-10 text-3xl font-black text-white italic uppercase tracking-tighter">{zeduData.comunidad}</div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="border-white/5 hover:bg-primary/[0.02] transition-colors">
                                    <TableCell className="p-0">
                                        <div className="bg-white/[0.03] px-12 py-6 font-black text-[11px] uppercase tracking-widest text-primary border-b border-white/5">CANTIDAD TOTAL DE HABITANTES</div>
                                        <div className="px-12 py-10 text-2xl font-black text-white/80 tracking-tight">{zeduData.habitantes}</div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="border-white/5 hover:bg-primary/[0.02] transition-colors">
                                    <TableCell className="p-0">
                                        <div className="bg-white/[0.03] px-12 py-6 font-black text-[11px] uppercase tracking-widest text-primary border-b border-white/5">CANTIDAD DE HABITANTES POR GÉNERO</div>
                                        <div className="px-12 py-10 text-lg font-bold text-primary italic uppercase tracking-widest">{zeduData.genero}</div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="border-white/5 hover:bg-primary/[0.02] transition-colors">
                                    <TableCell className="p-0">
                                        <div className="bg-white/[0.03] px-12 py-6 font-black text-[11px] uppercase tracking-widest text-primary border-b border-white/5">CANTIDAD DE HABITANTES POR EDAD</div>
                                        <div className="px-12 py-10 font-mono text-primary font-black text-2xl">{zeduData.edad}</div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="border-white/5 hover:bg-primary/[0.02] transition-colors">
                                    <TableCell className="p-0">
                                        <div className="bg-white/[0.03] px-12 py-6 font-black text-[11px] uppercase tracking-widest text-primary border-b border-white/5">CARACTERISTICAS DE LA POBLACIÓN</div>
                                        <div className="px-12 py-10 text-lg text-muted-foreground leading-relaxed text-justify font-bold uppercase tracking-tight">{zeduData.caracteristicas}</div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="border-none hover:bg-primary/[0.02] transition-colors">
                                    <TableCell className="p-0">
                                        <div className="bg-white/[0.03] px-12 py-6 font-black text-[11px] uppercase tracking-widest text-primary border-b border-white/5">CLIMA</div>
                                        <div className="px-12 py-10 text-lg text-white/60 font-black italic tracking-widest uppercase">{zeduData.clima}</div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-center py-20 opacity-20">
                <p className="text-[11px] font-black uppercase tracking-[1em]">Kyron Technical Report Ledger</p>
            </div>
        </div>
    );
}
