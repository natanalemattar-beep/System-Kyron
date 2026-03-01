
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
  Layers
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const zeduData = [
  { 
    label: "PAÍS / CIUDAD / MUNICIPIO / LOCALIDAD ESPECÍFICA", 
    value: "Venezuela, La Atlántida entre calle 7 a calle 3, Catia La Mar Pinta Catia, Supermercado Bensica.",
    icon: MapPin 
  },
  { 
    label: "NOMBRE DE LA COMUNIDAD", 
    value: "La Atlántida Catia La Mar",
    icon: Building 
  },
  { 
    label: "CANTIDAD TOTAL DE HABITANTES", 
    value: "Aproximadamente 500 empresas (unos 5.000 empleados del sector administrativo)",
    icon: Users 
  },
  { 
    label: "CANTIDAD DE HABITANTES POR GÉNERO", 
    value: "52% femenino, 48% masculino (en cargos administrativos)",
    icon: Layers 
  },
  { 
    label: "CANTIDAD DE HABITANTES POR EDAD", 
    value: "25-40 años: 60% / 41-55 años: 30% / mayores de 55: 10%",
    icon: Activity 
  },
  { 
    label: "CARACTERÍSTICAS DE LA POBLACIÓN", 
    value: "Empresas que buscan automatizar sus procesos fiscales y contables, y que además están interesadas en adoptar prácticas sostenibles. Generan grandes volúmenes de residuos de papel y otros materiales reciclables.",
    icon: Recycle 
  },
  { 
    label: "CLIMA", 
    value: "Cálido tropical con influencia costera. Temperaturas promedio entre 26°C y 32°C. Alta salinidad ambiental.",
    icon: ThermometerSun 
  }
];

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
                th { background-color: #f2f2f2; font-weight: bold; text-transform: uppercase; font-size: 10pt; color: #0A2472; }
                .title { text-align: center; font-size: 18pt; font-weight: bold; text-transform: uppercase; margin-bottom: 30px; border-bottom: 2px solid #0A2472; padding-bottom: 10px; color: #0A2472; }
            </style>
            </head>
            <body>
                <div class="title">POBLACIÓN A TRABAJAR (MODELO ZEDU)</div>
                <table>
                    ${zeduData.map(item => `
                        <tr><th>${item.label}</th></tr>
                        <tr><td>${item.value}</td></tr>
                    `).join('')}
                </table>
                <p style="margin-top: 50px; font-size: 8pt; text-align: center; color: #666;">Documento Maestro Generado por System Kyron v2.6 • Misión Crítica</p>
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
            description: "El modelo Zedu oficial ha sido exportado exitosamente para Word.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-l-4 border-primary pl-8 py-2">
                <div className="space-y-2">
                    <h1 className="text-5xl font-black tracking-tighter flex items-center gap-4 italic italic-shadow text-white uppercase">
                        <Users className="h-12 w-12 text-primary" />
                        POBLACIÓN A TRABAJAR
                    </h1>
                    <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40">Estudio de Campo • Modelo Zedu • Catia La Mar</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-16 px-12 rounded-2xl shadow-2xl" onClick={handleDownloadWord}>
                    <Download className="mr-3 h-6 w-6" /> DESCARGAR PARA WORD
                </Button>
            </header>

            <Card className="glass-card border-none overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                    <Table>
                        <TableBody>
                            {zeduData.map((item, index) => (
                                <TableRow key={index} className="border-white/5 hover:bg-primary/[0.03] transition-all">
                                    <TableCell className="p-0">
                                        <div className="flex flex-col lg:flex-row">
                                            <div className="lg:w-1/3 bg-white/[0.02] p-10 flex items-start gap-6 border-b lg:border-b-0 lg:border-r border-white/5">
                                                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                                                    <item.icon className="h-6 w-6 text-primary" />
                                                </div>
                                                <h3 className="font-black text-[11px] uppercase tracking-widest text-primary mt-2">{item.label}</h3>
                                            </div>
                                            <div className="lg:w-2/3 p-10 text-xl font-black text-white/90 italic leading-relaxed text-justify">
                                                {item.value}
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="p-8 justify-center bg-white/[0.01] border-t border-white/5 opacity-30 text-[9px] font-black uppercase tracking-[0.5em]">
                    Kyron Technical Ledger • Inmutable Record
                </CardFooter>
            </Card>
        </div>
    );
}
