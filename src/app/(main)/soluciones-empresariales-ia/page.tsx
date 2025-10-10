
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, CheckCircle, Shield, ArrowRight, Download, Recycle, Cpu, Briefcase, FileText } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const modeloNegocio = [
    "Venta de Papeleras Inteligentes: Comercialización de los dispositivos a municipios, centros comerciales, empresas y condominios.",
    "Licenciamiento de Software Contable: Venta de licencias del sistema de gestión administrativa y contable 100% automatizado.",
    "Soporte Técnico y Mantenimiento: Contratos de soporte para garantizar el funcionamiento óptimo tanto del hardware (papeleras) como del software (sistema contable).",
    "Análisis de Datos como Servicio: Monetización de los datos de residuos para ayudar a otras empresas a mejorar su gestión de desperdicios.",
    "Impacto Social: Donación de equipos y software a comunidades u organizaciones sin fines de lucro, reforzando la misión social."
];

const aspectosTecnicosPapelera = [
    "Sensores y Clasificación por IA: Uso de sensores ópticos, de peso y visión artificial para identificar y clasificar automáticamente papel, plástico, vidrio, metal y orgánicos.",
    "Automatización de Compartimentos: Una vez clasificado, el residuo es dirigido al compartimento interno correcto de forma automática.",
    "Conectividad IoT: Las papeleras se conectan a la nube para monitorear en tiempo real los niveles de llenado, optimizando las rutas de recolección y reduciendo costos."
];

const ventajasPapelera = [
    "Mejora radical del reciclaje y la calidad de los materiales recuperados.",
    "Eficiencia en la gestión de residuos, reduciendo costos operativos y consumo de combustible.",
    "Fomento de una economía circular y un futuro más sostenible.",
    "Generación de datos valiosos para la toma de decisiones de municipios y empresas."
];

const aspectosTecnicosSoftware = [
    "Automatización de Procesos (RPA): El sistema automatiza tareas repetitivas como la entrada de datos de facturas, conciliaciones bancarias y generación de reportes.",
    "Inteligencia Artificial para el Cumplimiento: La IA verifica que todas las operaciones cumplan con las normativas del SENIAT y otras regulaciones locales, minimizando el riesgo de sanciones.",
    "Integración Total: Se conecta con bancos, sistemas de facturación de proveedores y plataformas de RR.HH. para centralizar toda la información financiera.",
    "Gestión de Ciclo de Vida de Datos: Una 'papelera inteligente' de datos que archiva y depura la información de forma automática para optimizar el rendimiento y cumplir con las leyes de protección de datos."
];

const ventajasSoftware = [
    "Reducción de costos operativos y errores humanos en más de un 90%.",
    "Garantía de cumplimiento fiscal y administrativo, brindando tranquilidad a los empresarios.",
    "Escalabilidad para crecer sin que los procesos administrativos se conviertan en un cuello de botella.",
    "Informes financieros precisos y en tiempo real para una toma de decisiones basada en datos."
];


export default function SolucionesEmpresarialesIAPage() {

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 text-center">
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
            <Bot className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Análisis de Viabilidad: Startup de Automatización Sostenible</h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          Evaluación de un modelo de negocio que combina tecnología para el impacto ambiental con la automatización total de la gestión empresarial, creando una propuesta de valor única y sostenible.
        </p>
         <Button className="mt-6">
            <Download className="mr-2" />
            Descargar Demo del Proyecto
        </Button>
      </header>

      <div className="space-y-12">
        
         <Card className="bg-card/50 backdrop-blur-sm">
             <CardHeader>
                <CardTitle className="flex items-center gap-3"><Briefcase className="h-6 w-6 text-primary"/>Modelo de Negocio: Doble Impacto</CardTitle>
                <CardDescription>La startup se fundamenta en dos líneas de productos innovadores que comparten una misma filosofía: la automatización como motor de eficiencia y sostenibilidad.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {modeloNegocio.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
            {/* Producto 1: Papelera Inteligente */}
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Recycle className="h-6 w-6 text-green-500"/>Producto 1: Papelera Inteligente</CardTitle>
                    <CardDescription>Tecnología para la sostenibilidad y el impacto social.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="tech-papelera">
                            <AccordionTrigger>Aspectos Técnicos</AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                                    {aspectosTecnicosPapelera.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="ventajas-papelera">
                            <AccordionTrigger>Ventajas y Oportunidades</AccordionTrigger>
                            <AccordionContent>
                               <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                                    {ventajasPapelera.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            {/* Producto 2: Automatización Contable */}
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><FileText className="h-6 w-6 text-blue-500"/>Producto 2: Automatización Contable</CardTitle>
                    <CardDescription>Eficiencia y cumplimiento para la gestión empresarial.</CardDescription>
                </CardHeader>
                 <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="tech-software">
                            <AccordionTrigger>Aspectos Técnicos</AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                                    {aspectosTecnicosSoftware.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="ventajas-software">
                            <AccordionTrigger>Ventajas y Oportunidades</AccordionTrigger>
                            <AccordionContent>
                               <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                                    {ventajasSoftware.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
