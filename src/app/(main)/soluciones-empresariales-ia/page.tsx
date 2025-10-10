
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, CheckCircle, Shield, ArrowRight, Download, Recycle, Cpu, Briefcase, FileText, Network, DollarSign, ShieldAlert, TrendingUp, Search } from "lucide-react";
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

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Network className="h-6 w-6 text-primary"/>Estructura Organizacional y Tecnológica</CardTitle>
                <CardDescription>Una estructura sólida para soportar la operación y el crecimiento.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                     <h4 className="font-semibold">Departamentos Clave</h4>
                     <p className="text-sm text-muted-foreground">
                        El holding o la empresa administradora debe tener departamentos específicos para soportar el riesgo y la operación.
                    </p>
                    <div>
                        <h5 className="font-semibold">Departamento de Tecnología y Seguridad (IT)</h5>
                        <p className="text-sm text-muted-foreground">Encargado de mantener la plataforma, la seguridad de los datos (cifrado) y prevenir ciberataques.</p>
                    </div>
                    <div>
                        <h5 className="font-semibold">Departamento de Cumplimiento (Compliance)</h5>
                        <p className="text-sm text-muted-foreground">Responsable de la auditoría interna, asegurar el cumplimiento del SENIAT y las regulaciones AML/CFT.</p>
                    </div>
                    <div>
                        <h5 className="font-semibold">Departamento de Riesgo y Cobranza</h5>
                        <p className="text-sm text-muted-foreground">Administra el motor de scoring, monitorea las tasas de morosidad y ejecuta las estrategias de cobro.</p>
                    </div>
                </div>
                 <div className="space-y-4">
                     <h4 className="font-semibold">Organigrama Sugerido</h4>
                     <div className="text-sm p-4 border rounded-lg bg-secondary/30">
                        <ul className="space-y-2">
                           <li className="font-bold">CEO / Dirección General</li>
                           <li className="pl-4 font-semibold">|- CTO (Director de Tecnología)</li>
                           <li className="pl-8">|- Equipo de Desarrollo de Software</li>
                           <li className="pl-8">|- Equipo de Hardware e IoT (Papeleras)</li>
                           <li className="pl-8">|- Equipo de Seguridad Informática</li>
                           <li className="pl-4 font-semibold">|- COO (Director de Operaciones)</li>
                           <li className="pl-8">|- Equipo de Logística y Soporte Técnico</li>
                           <li className="pl-8">|- Equipo de Cumplimiento y Legal</li>
                           <li className="pl-4 font-semibold">|- CMO (Director de Marketing)</li>
                        </ul>
                     </div>
                </div>
            </CardContent>
        </Card>

         <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><TrendingUp className="h-6 w-6 text-primary"/>Estrategia de Marketing y Expansión de Productos</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
                <div>
                     <h4 className="font-semibold mb-2">Estrategias de Marketing</h4>
                     <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-green-500 shrink-0"/><span><strong>Marketing Digital:</strong> Campañas en redes (LinkedIn, Instagram) y Google Ads dirigidas a municipios, empresas y administradores de condominios.</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-green-500 shrink-0"/><span><strong>Marketing de Contenidos:</strong> Crear artículos y videos sobre sostenibilidad, gestión de residuos y eficiencia administrativa para posicionarse como líder de opinión.</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-green-500 shrink-0"/><span><strong>Alianzas Estratégicas:</strong> Colaborar con cámaras de comercio, asociaciones de reciclaje y empresas de tecnología.</span></li>
                     </ul>
                </div>
                 <div>
                     <h4 className="font-semibold mb-2">Sugerencias para Expandir la Línea de Productos</h4>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2"><Search className="h-4 w-4 mt-0.5 text-blue-500 shrink-0"/><span><strong>Contenedores Inteligentes para el Hogar:</strong> Una versión más pequeña de la papelera para uso residencial, conectada a una app para gamificar el reciclaje.</span></li>
                        <li className="flex items-start gap-2"><Search className="h-4 w-4 mt-0.5 text-blue-500 shrink-0"/><span><strong>Plataforma de Análisis de Residuos:</strong> Un dashboard avanzado para que los municipios visualicen datos de residuos y optimicen políticas públicas.</span></li>
                     </ul>
                </div>
            </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><DollarSign className="h-6 w-6 text-primary"/>Análisis de Inversión y Riesgo</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
                <div>
                     <h4 className="font-semibold mb-2">Áreas de Inversión Inicial</h4>
                     <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2"><Cpu className="h-4 w-4 mt-0.5 text-green-500 shrink-0"/><span><strong>I+D y Prototipos:</strong> Desarrollo y prueba de la papelera inteligente y su IA.</span></li>
                        <li className="flex items-start gap-2"><FileText className="h-4 w-4 mt-0.5 text-green-500 shrink-0"/><span><strong>Desarrollo de Software:</strong> Creación de la plataforma en la nube y el sistema contable.</span></li>
                        <li className="flex items-start gap-2"><TrendingUp className="h-4 w-4 mt-0.5 text-green-500 shrink-0"/><span><strong>Marketing y Ventas:</strong> Lanzamiento inicial y creación de la fuerza de ventas.</span></li>
                         <li className="flex items-start gap-2"><Briefcase className="h-4 w-4 mt-0.5 text-green-500 shrink-0"/><span><strong>Capital de Trabajo:</strong> Para cubrir operaciones mientras se escala.</span></li>
                     </ul>
                </div>
                 <div>
                     <h4 className="font-semibold mb-2">Riesgos Potenciales y Mitigación</h4>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2"><ShieldAlert className="h-4 w-4 mt-0.5 text-red-500 shrink-0"/><span><strong>Competencia:</strong> Mitigar con una fuerte propuesta de valor (impacto social) y un servicio al cliente superior.</span></li>
                        <li className="flex items-start gap-2"><ShieldAlert className="h-4 w-4 mt-0.5 text-red-500 shrink-0"/><span><strong>Adopción Tecnológica:</strong> Mitigar con demos, planes piloto y una interfaz de usuario muy intuitiva.</span></li>
                        <li className="flex items-start gap-2"><ShieldAlert className="h-4 w-4 mt-0.5 text-red-500 shrink-0"/><span><strong>Costos de Producción:</strong> Mitigar buscando alianzas con fabricantes y optimizando la cadena de suministro.</span></li>
                        <li className="flex items-start gap-2"><ShieldAlert className="h-4 w-4 mt-0.5 text-red-500 shrink-0"/><span><strong>Regulaciones Cambiantes:</strong> Mitigar manteniendo un equipo legal y de cumplimiento proactivo.</span></li>
                     </ul>
                </div>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
