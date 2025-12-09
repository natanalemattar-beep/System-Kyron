
        
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Download, FileText, DollarSign, ShieldAlert, TrendingUp, Search, Users, Cpu, Recycle, Workflow, ShieldCheck, Scale, Info, Briefcase, Network, Target, CheckCircle, Lightbulb, Activity, FileSignature, Gavel } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/logo";


const foda = {
    fortalezas: ["Doble línea de negocio (ecosistema robusto)", "Solución innovadora con alto impacto social y ambiental", "Mercado con necesidad urgente de cumplimiento"],
    oportunidades: ["Creciente conciencia sobre la sostenibilidad", "Digitalización acelerada de PYMES", "Altas sanciones del SENIAT que incentivan la adopción"],
    debilidades: ["Alta inversión inicial en I+D", "Dependencia de proveedores de tecnología", "Curva de aprendizaje para el cliente"],
    amenazas: ["Competencia de software tradicional", "Cambios regulatorios imprevistos", "Inestabilidad económica"],
};

const proyecciones = {
    ingresosPapeleras: 450000,
    ingresosSoftware: 280000,
    ingresosSoporte: 120000,
    costosVariables: -350000,
    costosFijos: -250000,
};
const totalIngresos = proyecciones.ingresosPapeleras + proyecciones.ingresosSoftware + proyecciones.ingresosSoporte;
const utilidadBruta = totalIngresos + proyecciones.costosVariables;
const utilidadNeta = utilidadBruta + proyecciones.costosFijos;
const puntoEquilibrio = Math.abs(proyecciones.costosFijos) / ((totalIngresos + proyecciones.costosVariables) / totalIngresos);


export default function EstudioFactibilidadEconomicaPage() {
    const { toast } = useToast();
    const smartBinImage = PlaceHolderImages.find(img => img.id === 'smart-bin');
    const accountingSoftwareImage = PlaceHolderImages.find(img => img.id === 'accounting-software');
    
    const getWordDocumentContent = () => {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 10px; margin-bottom: 20px;">
                <h1 style="font-size: 24px; margin: 0; color: #333;">Kyron, C.A.</h1>
                <h2 style="font-size: 20px; margin: 5px 0; color: #555;">Estudio de Factibilidad Económica</h2>
                <p style="font-size: 12px; color: #777;">Fecha: ${formatDate(new Date())}</p>
            </div>
            
            <h3>Resumen Exhaustivo del Estudio de Factibilidad Económica: Ecosistema Kyron</h3>
            <p>El presente documento resume en detalle el Estudio de Factibilidad Económica, Técnica, Legal y Operativa del proyecto Kyron, concluyendo su viabilidad con un alto grado de certeza...</p>

            <h3>1. Introducción: El Doble Desafío y la Justificación de Kyron</h3>
            <h4>1.1. Planteamiento del Problema: La Dualidad de la Ineficiencia</h4>
            <p>Las empresas venezolanas operan en un entorno caracterizado por la volatilidad económica y, crucialmente, por una densa y a menudo cambiante carga fiscal y administrativa...</p>
            <h4>1.2. Justificación: La Solución Dual y Sostenible</h4>
            <p>Kyron justifica su existencia al ofrecer una solución dual que ataca ambos frentes con tecnología de vanguardia...</p>
            <h4>1.3. Objetivos del Estudio de Factibilidad</h4>
            <p><strong>Objetivo General:</strong> Determinar con precisión la factibilidad técnica, económica, legal y operativa del ecosistema "Kyron".</p>
            <p><strong>Específicos:</strong> analizar rigurosamente el mercado potencial y la competencia, evaluar los requerimientos tecnológicos para ambos productos (hardware y software), definir una estructura organizacional funcional y, crucialmente, estimar la rentabilidad y el retorno de la inversión.</p>

            <h3>2. Estudio de Mercado: Oportunidad y Segmentación</h3>
            <p>El análisis de mercado revela una oportunidad significativa impulsada por la necesidad urgente de digitalización en el sector empresarial venezolano y la tendencia global hacia la sostenibilidad...</p>
            
            <h3>3. Estudio Técnico: Innovación y Tecnología</h3>
            <h4>3.1. Producto 1: Papelera Inteligente (Hardware)</h4>
            <p>Clasificación por IA... Conectividad IoT...</p>
            <h4>3.2. Producto 2: Software de Automatización (SaaS)</h4>
            <p>Automatización de Procesos (RPA)... IA para Cumplimiento SENIAT... APIs Robustas...</p>
            
            <h3>4. Estudio Organizacional y Legal: Estructura y Cumplimiento</h3>
            <h4>4.1. Estructura Organizacional</h4>
            <p>Dirección General (CEO)... Departamento de Tecnología (CTO)...</p>
            <h4>4.2. Marco Legal y Regulatorio</h4>
            <p>Estructura Corporativa... Homologación Fiscal... Propiedad Intelectual... Normativa Ambiental...</p>

            <h3>5. Estudio Financiero: Modelo de Negocio y Rentabilidad</h3>
            <h4>5.1. Modelo de Negocio Detallado</h4>
            <p>Venta de Papeleras Inteligentes... Licenciamiento de Software Contable (SaaS)...</p>
            <h4>5.2. Proyecciones Financieras y Métrica de Éxito</h4>
            <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
              <tr><td colspan="2"><strong>Proyecciones Financieras Anuales (Estimadas)</strong></td></tr>
              <tr><td>TOTAL INGRESOS:</td><td>${formatCurrency(totalIngresos)}</td></tr>
              <tr><td>UTILIDAD NETA (EBITDA):</td><td>${formatCurrency(utilidadNeta)}</td></tr>
              <tr><td>PUNTO DE EQUILIBRIO (Ingresos):</td><td>${formatCurrency(puntoEquilibrio)}</td></tr>
            </table>

            <h3>6. Análisis de Riesgos y Estrategia (FODA)</h3>
            <p><strong>Fortalezas:</strong> ${foda.fortalezas.join(', ')}</p>
            <p><strong>Oportunidades:</strong> ${foda.oportunidades.join(', ')}</p>
            <p><strong>Debilidades:</strong> ${foda.debilidades.join(', ')}</p>
            <p><strong>Amenazas:</strong> ${foda.amenazas.join(', ')}</p>
            
            <h3>7. Conclusión y Recomendación Final</h3>
            <p>El proyecto Kyron se considera altamente factible. Se recomienda proceder sin dilación con la fase de prototipado de alta fidelidad y la búsqueda de capital semilla...</p>
        </div>
    `;
    };

    const handleDownloadStudy = () => {
        const content = getWordDocumentContent();
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;

        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'Estudio_Factibilidad_Kyron.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);

        toast({
            title: "Descarga Completa",
            description: "El estudio de factibilidad ha sido guardado como 'Estudio_Factibilidad_Kyron.doc'.",
        });
    };
    
    const handleExportCSV = () => {
        const headers = ["Indicador", "Monto Estimado (Bs.)", "Métrica de Riesgo"];
        const rows = [
            ["TOTAL INGRESOS", totalIngresos.toFixed(2), "Fuerte tracción inicial."],
            ["UTILIDAD NETA (EBITDA)", utilidadNeta.toFixed(2), "Margen robusto (~29.4%)."],
            ["PUNTO DE EQUILIBRIO (Ingresos)", puntoEquilibrio.toFixed(2), "Se alcanza con solo el 50% de los ingresos."]
        ];

        let csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n" 
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "proyecciones_financieras_kyron.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
            title: "Exportación Completa",
            description: "Las proyecciones financieras se han descargado como un archivo CSV.",
        });
    };

  return (
    <div className="p-4 md:p-8 space-y-12">
      <header className="mb-8 text-center">
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
            <Bot className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Estudio de Factibilidad Económica</h1>
        <p className="text-muted-foreground mt-3 max-w-4xl mx-auto">
          Ecosistema Integral Kyron: Solución Híbrida para la Economía Circular y el Cumplimiento Fiscal.
          <br/>
          <strong>Visión:</strong> Simplificar la burocracia y promover la sostenibilidad corporativa.
        </p>
         <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleDownloadStudy}>
                <Download className="mr-2" />
                Descargar Informe en Word
            </Button>
        </div>
      </header>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>1. Introducción</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold text-foreground">1.1. Planteamiento del Problema: La Dualidad de la Ineficiencia</AccordionTrigger>
                        <AccordionContent>
                            <p>Las empresas venezolanas operan en un entorno caracterizado por la volatilidad económica y, crucialmente, por una densa y a menudo cambiante carga fiscal y administrativa. La gestión ineficiente de trámites (desde la constitución legal hasta la declaración de impuestos ante el SENIAT) genera costos indirectos significativos y expone a las organizaciones a graves riesgos de sanciones. Paralelamente, la presión global y local, en parte impulsada por la conciencia sobre la Responsabilidad Social Empresarial (RSE), exige una gestión de residuos más efectiva y transparente. La ineficiencia en estos dos frentes —el escritorio administrativo y el manejo físico de desechos— limita la productividad y el crecimiento.</p>
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-2">
                        <AccordionTrigger className="font-semibold text-foreground">1.2. Justificación: La Solución Dual y Sostenible</AccordionTrigger>
                        <AccordionContent>
                            <p>Kyron justifica su existencia al ofrecer una solución dual que ataca ambos frentes con tecnología de vanguardia. La Papelera Inteligente (Hardware) transforma un pasivo ambiental en un activo de datos, promoviendo la economía circular desde el punto de origen. Complementariamente, el Software de Gestión (SaaS) funge como el cerebro del ecosistema, garantizando la tranquilidad fiscal y la eficiencia operativa al automatizar el cumplimiento y la simplificación de la eficiencia operativa. Esta combinación mitiga los riesgos de sanciones fiscales y reduce la huella ambiental de los clientes, posicionando a Kyron como un socio estratégico para la sostenibilidad y el cumplimiento.</p>
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger className="font-semibold text-foreground">1.3. Objetivos del Estudio de Factibilidad</AccordionTrigger>
                        <AccordionContent>
                             <p><strong>Objetivo General:</strong> Determinar con precisión la factibilidad técnica, económica, legal y operativa del ecosistema "Kyron".</p>
                            <p><strong>Específicos:</strong> analizar rigurosamente el mercado potencial y la competencia, evaluar los requerimientos tecnológicos para ambos productos (hardware y software), definir una estructura organizacional funcional y, crucialmente, estimar la rentabilidad y el retorno de la inversión.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Search className="h-6 w-6"/>2. Estudio de Mercado</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">El análisis de mercado revela una oportunidad significativa impulsada por la necesidad urgente de digitalización en el sector empresarial venezolano y la tendencia global hacia la sostenibilidad. El mercado potencial estimado supera los $80 millones anuales, una cifra que subraya la escala de la demanda insatisfecha.</p>
            </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Cpu className="h-6 w-6"/>3. Estudio Técnico</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2"><Recycle className="text-green-500"/>Producto 1: Papelera Inteligente</h3>
                    {smartBinImage && <Image src={smartBinImage.imageUrl} alt={smartBinImage.description} data-ai-hint={smartBinImage.imageHint} width={500} height={300} className="rounded-lg object-cover" />}
                     <p className="text-sm text-muted-foreground">Clasificación por IA, Sensores, Conectividad IoT para monitoreo en tiempo real.</p>
                </div>
                 <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2"><FileText className="text-blue-500"/>Producto 2: Software de Automatización</h3>
                    {accountingSoftwareImage && <Image src={accountingSoftwareImage.imageUrl} alt={accountingSoftwareImage.description} data-ai-hint={accountingSoftwareImage.imageHint} width={500} height={300} className="rounded-lg object-cover" />}
                    <p className="text-sm text-muted-foreground">Automatización Robótica de Procesos (RPA), IA para cumplimiento SENIAT, APIs para integración bancaria.</p>
                </div>
            </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><FileSignature className="h-6 w-6"/>4. Propuesta de Valor: El Ecosistema Kyron</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Pilar 1: Software de Automatización y Suministros</h4>
                    <p className="text-sm text-muted-foreground">Plataforma en la nube para automatizar procesos, integrada con una oferta comercial que incluye: equipos fiscales, impresoras, material de oficina y servicios de telecomunicaciones.</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Pilar 2: Implementación Financiera con Billetera Blockchain</h4>
                    <p className="text-sm text-muted-foreground">Solución de tercera generación para la gestión de activos y transacciones seguras, transparentes e inmutables, ideal para el comercio y las finanzas del futuro.</p>
                </div>
            </CardContent>
        </Card>

         <Card className="bg-card/50 backdrop-blur-sm">
             <CardHeader>
                <CardTitle className="flex items-center gap-3"><Briefcase className="h-6 w-6"/>5. Estudio Organizacional y Legal</CardTitle>
            </CardHeader>
            <CardContent>
                <p>La factibilidad operativa se basa en una estructura organizacional ágil y un estricto cumplimiento del marco regulatorio venezolano. Se recomienda la constitución como C.A. o S.A. y es mandatorio que el Software de Gestión sea homologado ante el SENIAT.</p>
            </CardContent>
        </Card>
        
         <Card className="bg-card/50 backdrop-blur-sm">
             <CardHeader>
                <CardTitle className="flex items-center gap-3"><DollarSign className="h-6 w-6"/>6. Estudio Financiero</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader><TableRow><TableHead>Indicador</TableHead><TableHead>Monto Estimado (Bs.)</TableHead><TableHead>Métrica de Riesgo</TableHead></TableRow></TableHeader>
                    <TableBody>
                        <TableRow><TableCell>TOTAL INGRESOS</TableCell><TableCell>{formatCurrency(totalIngresos)}</TableCell><TableCell>Fuerte tracción inicial.</TableCell></TableRow>
                        <TableRow><TableCell>UTILIDAD NETA (EBITDA)</TableCell><TableCell>{formatCurrency(utilidadNeta)}</TableCell><TableCell>Margen robusto (~29.4%).</TableCell></TableRow>
                        <TableRow><TableCell>PUNTO DE EQUILIBRIO (Ingresos)</TableCell><TableCell>{formatCurrency(puntoEquilibrio)}</TableCell><TableCell>Se alcanza con solo el 50% de los ingresos.</TableCell></TableRow>
                    </TableBody>
                </Table>
            </CardContent>
             <CardFooter>
                <Button size="sm" variant="outline" onClick={handleExportCSV}>
                    <Download className="mr-2 h-4 w-4"/>
                    Exportar Proyecciones a Hojas de cálculo
                </Button>
            </CardFooter>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><ShieldAlert className="h-6 w-6"/>7. Análisis de Riesgos (FODA)</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <h3 className="font-semibold text-green-500">Fortalezas</h3>
                    <ul className="list-disc pl-5 text-sm">{foda.fortalezas.map(item => <li key={item}>{item}</li>)}</ul>
                </div>
                 <div className="space-y-2">
                    <h3 className="font-semibold text-blue-500">Oportunidades</h3>
                    <ul className="list-disc pl-5 text-sm">{foda.oportunidades.map(item => <li key={item}>{item}</li>)}</ul>
                </div>
                 <div className="space-y-2">
                    <h3 className="font-semibold text-yellow-500">Debilidades</h3>
                    <ul className="list-disc pl-5 text-sm">{foda.debilidades.map(item => <li key={item}>{item}</li>)}</ul>
                </div>
                 <div className="space-y-2">
                    <h3 className="font-semibold text-red-500">Amenazas</h3>
                    <ul className="list-disc pl-5 text-sm">{foda.amenazas.map(item => <li key={item}>{item}</li>)}</ul>
                </div>
            </CardContent>
        </Card>
        
         <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
                <CardTitle>8. Conclusión y Recomendación Final</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg font-semibold">El proyecto Kyron se considera ALTAMENTE FACTIBLE. La combinación de hardware innovador con un modelo SaaS recurrente crea una propuesta de valor única, sólida y sostenible que resuelve problemas críticos de mercado.</p>
                <p className="text-muted-foreground mt-2">
                    Se recomienda proceder inmediatamente con la Fase de Prototipado y la Búsqueda de Capital Semilla para financiar la I+D y la escala operativa. Kyron no es solo viable, sino una inversión estratégica en el futuro digital y sostenible de las empresas en Venezuela.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
        
    
