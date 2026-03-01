
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
  ShieldCheck,
  DollarSign,
  ShoppingCart
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
    "Falta de organización administrativa crónica",
    "Poca disposición al cambio de procesos obsoletos",
    "Escaso presupuesto para infraestructura física",
    "Desactualización tecnológica de nivel crítico"
  ],
  consecuencias: "Pérdida masiva de tiempo productivo en búsqueda de archivos y documentos físicos vulnerables.",
  definicion: "En la U.E.P. Gabriela Mistral el sistema de archivado es netamente físico y pobre. Esto impide la agilidad en la gestión de expedientes de estudiantes y representantes.",
  importancia: "Es vital disminuir la carga administrativa mediante la digitalización IA para garantizar la continuidad operativa.",
  origen: "Desactualización sistémica en la gestión de nuevas tecnologías y procesos digitales educativos."
};

const proposedSolution = {
  titulo: "SOLUCIÓN PROPUESTA",
  desarrollo: "System Kyron digitaliza integralmente el sistema de archivado de la U.E.P. Gabriela Mistral. Transformamos el papel en un entorno digital eficiente con búsqueda instantánea. La plataforma integra un chatbot de atención automatizada para padres y representantes, facilitando respuestas inmediatas 24/7. Además, incorporamos herramientas de inteligencia artificial para apoyar al personal directivo en la generación de ideas estratégicas y toma de decisiones basadas en datos reales."
};

const differentiatorText = {
  especializacion: "Mientras otras plataformas ofrecen servicios genéricos, System Kyron resuelve problemas específicos del sector educativo (archivo físico y comunicación escolar). Nuestra arquitectura es escalable a otros sectores como empresas y almacenes.",
  alcance: "No solo optimizamos procesos técnicos internos; impactamos directamente en la experiencia del cliente final (padres/representantes) mediante nuestro ecosistema de comunicación inteligente.",
  estrategia: "System Kyron trasciende la 'gestión eficiente' al utilizar IA para la generación de planes estratégicos, apoyando activamente a la directiva en el crecimiento institucional."
};

const budgetData = [
  { item: "Suscripción Cloud Enterprise (Anual)", cantidad: 1, costo: 450, lugar: "Kyron Digital Store" },
  { item: "Scanner de Alta Velocidad (OCR Ready)", cantidad: 2, costo: 800, lugar: "City Market Caracas" },
  { item: "API IA & Procesamiento Natural (Tokens)", cantidad: 1, costo: 300, lugar: "Google Cloud Platform" },
  { item: "Workstation de Gestión Administrativa", cantidad: 3, costo: 2400, lugar: "Sambil La Candelaria" },
  { item: "Licencia de Seguridad & Blockchain", cantidad: 1, costo: 150, lugar: "Ecosistema Kyron" },
];

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
            </style>
            </head>
            <body>
                <div class="main-title">INFORME TÉCNICO DE MISIÓN CRÍTICA - SYSTEM KYRON</div>
                
                <div class="section-title">1. INFORMACIÓN DEL EQUIPO</div>
                <table>
                    ${teamData.map(item => `<tr><th>${item.label}</th><td>${item.value}</td></tr>`).join('')}
                </table>

                <div class="section-title">2. MATRIZ DE POBLACIÓN (ZEDU)</div>
                <table>
                    ${zeduData.map(item => `<tr><th>${item.label}</th><td>${item.value}</td></tr>`).join('')}
                </table>

                <div class="section-title">3. ANÁLISIS DEL PROBLEMA</div>
                <table>
                    <tr><th>CAUSAS DEL PROBLEMA</th><td>${problemAnalysis.causas.join(', ')}</td></tr>
                    <tr><th>DEFINICIÓN DEL PROBLEMA</th><td>${problemAnalysis.definicion}</td></tr>
                </table>

                <div class="section-title">4. SOLUCIÓN PROPUESTA</div>
                <div class="description-text">${proposedSolution.desarrollo}</div>

                <div class="section-title">5. DIFERENCIADORES CLAVE</div>
                <div class="description-text"><strong>Especialización:</strong> ${differentiatorText.especializacion}</div>
                <div class="description-text"><strong>Alcance:</strong> ${differentiatorText.alcance}</div>
                <div class="description-text"><strong>Estrategia:</strong> ${differentiatorText.estrategia}</div>

                <div class="section-title">6. PRESUPUESTO</div>
                <table>
                    <tr><th>ITEM</th><th>CANTIDAD</th><th>COSTO (USD)</th><th>LUGAR DE COMPRA</th></tr>
                    ${budgetData.map(row => `<tr><td>${row.item}</td><td>${row.cantidad}</td><td>$${row.costo}</td><td>${row.lugar}</td></tr>`).join('')}
                </table>

                <p style="margin-top: 50px; font-size: 9pt; text-align: center; color: #666;">Documento Generado por System Kyron v2.6 • Nodo La Guaira • 2025</p>
            </body>
            </html>
        `;

        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(content);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'Estudio_Tecnico_SystemKyron_Full.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);

        toast({
            title: "Informe Final Generado",
            description: "Los 7 bloques técnicos han sido compilados en un documento profesional.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    return (
        <div className="space-y-16 w-full animate-in fade-in duration-1000 pb-32">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-8 border-primary pl-10 py-2">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 shadow-glow">
                        <Rocket className="h-3 w-3" /> System v2.6.4 Online
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter flex items-center gap-4 italic italic-shadow text-white uppercase leading-none">
                        <BookOpen className="h-14 w-14 text-primary" />
                        ESTUDIO TÉCNICO
                    </h1>
                    <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40">U.E.P. Gabriela Mistral • Nodo La Guaira</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-20 px-16 rounded-2xl shadow-glow text-base font-black" onClick={handleDownloadWord}>
                    <Download className="mr-4 h-8 w-8" /> EXPORTAR INFORME TOTAL (.DOC)
                </Button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                
                {/* Lateral: Info y Población */}
                <div className="xl:col-span-4 space-y-12">
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3">Ficha de Equipo</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl">
                            <CardContent className="p-0">
                                {teamData.map((item, index) => (
                                    <div key={index} className="p-8 border-b border-white/5 last:border-none hover:bg-white/[0.03] transition-all group">
                                        <h3 className="font-black text-[9px] uppercase tracking-widest text-primary mb-2 opacity-60">{item.label}</h3>
                                        <p className="text-xl font-black text-white/90 italic tracking-tight">{item.value}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3">Matriz ZEDU</h3>
                        <div className="space-y-4">
                            {zeduData.map((item, index) => (
                                <Card key={index} className="glass-card border-none p-6 hover:bg-white/[0.05] transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
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

                {/* Central: Análisis, Solución y Diferenciadores */}
                <div className="xl:col-span-8 space-y-12">
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <Card className="glass-card border-none p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.02] scale-150 rotate-12">
                                <AlertTriangle className="h-48 w-48 text-primary" />
                            </div>
                            <h3 className="text-2xl font-black uppercase italic flex items-center gap-4 mb-8 text-white">ANÁLISIS DEL PROBLEMA</h3>
                            <div className="space-y-8">
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-inner">
                                    <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-primary mb-4 opacity-60">Definición Técnica</h4>
                                    <p className="text-sm font-bold italic text-white/80 leading-relaxed text-justify">{problemAnalysis.definicion}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10"><p className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-2">Consecuencia</p><p className="text-xs font-bold text-white/70 italic">{problemAnalysis.consecuencias}</p></div>
                                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10"><p className="text-[9px] font-black text-primary uppercase tracking-widest mb-2">Importancia</p><p className="text-xs font-bold text-white/70 italic">{problemAnalysis.importancia}</p></div>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-none bg-primary p-12 text-primary-foreground relative overflow-hidden shadow-glow rounded-[3rem]">
                            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12"><Zap className="h-64 w-64 text-white" /></div>
                            <div className="relative z-10 space-y-8">
                                <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-white">SOLUCIÓN OFICIAL</div>
                                <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white">SOLUCIÓN <br/> PROPUESTA</h3>
                                <p className="text-base font-black italic leading-relaxed text-white/90 border-l-4 border-white/30 pl-8 text-justify">{proposedSolution.desarrollo}</p>
                            </div>
                        </Card>
                    </section>

                    {/* Diferenciadores Clave */}
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6">Diferenciadores Clave</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: "Especialización", text: differentiatorText.especializacion, icon: ShieldCheck },
                                { title: "Alcance de Usuario", text: differentiatorText.alcance, icon: Users },
                                { title: "De Datos a Estrategia", text: differentiatorText.estrategia, icon: Zap }
                            ].map((diff, i) => (
                                <Card key={i} className="glass-card border-none p-8 hover:bg-primary/5 transition-all">
                                    <diff.icon className="h-8 w-8 text-primary mb-6" />
                                    <h4 className="font-black text-sm uppercase italic mb-4 text-white">{diff.title}</h4>
                                    <p className="text-xs font-bold text-white/60 leading-relaxed text-justify">{diff.text}</p>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Presupuesto */}
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6">Presupuesto del Proyecto</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl p-2">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white/[0.03] border-none">
                                        <TableHead className="font-black text-[10px] uppercase tracking-widest text-primary pl-10 py-6">Item</TableHead>
                                        <TableHead className="text-center font-black text-[10px] uppercase tracking-widest text-primary py-6">Cantidad</TableHead>
                                        <TableHead className="text-center font-black text-[10px] uppercase tracking-widest text-primary py-6">Costo (USD)</TableHead>
                                        <TableHead className="text-right font-black text-[10px] uppercase tracking-widest text-primary pr-10 py-6">Lugar de Compra</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {budgetData.map((row, i) => (
                                        <TableRow key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                            <TableCell className="font-bold text-white pl-10 py-6">{row.item}</TableCell>
                                            <TableCell className="text-center font-black text-primary italic">{row.cantidad}</TableCell>
                                            <TableCell className="text-center font-black text-white italic">${row.costo}</TableCell>
                                            <TableCell className="text-right pr-10">
                                                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest opacity-60 border-primary/20">{row.lugar}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="border-none bg-primary/10">
                                        <TableCell className="font-black text-lg text-white pl-10 py-8 italic uppercase" colSpan={2}>Inversión Total Estimada</TableCell>
                                        <TableCell className="text-center font-black text-2xl text-primary italic py-8" colSpan={2}>$4,100.00</TableCell>
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
