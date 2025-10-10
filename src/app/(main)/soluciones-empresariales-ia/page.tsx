
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, CheckCircle, Shield, ArrowRight, Download, Recycle, Cpu, Briefcase, FileText, Network, DollarSign, ShieldAlert, TrendingUp, Search, User, Check, Coins, Workflow } from "lucide-react";
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

const desafiosPapelera = [
    "Alto costo inicial: La inversión en tecnología (sensores, IA, conectividad) puede ser alta, pero se justifica con los beneficios a largo plazo.",
    "Precisión y mantenimiento: Es crucial que la tecnología de clasificación sea precisa y reciba mantenimiento regular.",
    "Adopción por el público: Puede ser necesario educar a los usuarios, aunque la simplicidad del sistema es un gran incentivo."
];

const integracionPlanNegocio = [
    "Venta del Producto: Comercialización de las papeleras a empresas, escuelas, centros comerciales y municipios.",
    "Soporte Técnico: Clave para mantener las papeleras en óptimas condiciones, gestionar la conectividad y las actualizaciones del sistema.",
    "Impacto Social: Venta a bajo costo o donación a ONGs y comunidades, junto con programas de incentivos por reciclaje.",
    "Modelo de Datos: Monetización del análisis de los datos de residuos para ayudar a otras empresas a optimizar su gestión."
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
        <h1 className="text-4xl font-bold tracking-tight">Anteproyecto de Inversión</h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          Evaluación de un modelo de negocio que combina tecnología para el impacto ambiental con la automatización total de la gestión empresarial, creando una propuesta de valor única y sostenible.
        </p>
         <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
                <FileText className="mr-2" />
                Descargar Anteproyecto de Inversión
            </Button>
            <Button size="lg" variant="outline">
                <Cpu className="mr-2" />
                Probar Demo Funcional
            </Button>
        </div>
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
                            <AccordionTrigger>Ventajas del Producto</AccordionTrigger>
                            <AccordionContent>
                               <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                                    {ventajasPapelera.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="desafios-papelera">
                            <AccordionTrigger>Desafíos a Considerar</AccordionTrigger>
                            <AccordionContent>
                               <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                                    {desafiosPapelera.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="plan-negocio-papelera">
                            <AccordionTrigger>Integración con el Plan de Negocio</AccordionTrigger>
                            <AccordionContent>
                               <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                                    {integracionPlanNegocio.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            {/* Producto 2: Automatización Contable */}
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><FileText className="h-6 w-6 text-blue-500"/>Producto 2: Software de Automatización Contable</CardTitle>
                    <CardDescription>Eficiencia y cumplimiento para la gestión empresarial interna y para la venta a clientes.</CardDescription>
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
                <CardTitle className="flex items-center gap-3"><Workflow className="h-6 w-6 text-primary"/>Procedimientos Administrativos Automatizados</CardTitle>
                <CardDescription>El software de automatización será el sistema nervioso central de la startup, gestionando todos los procedimientos internos.</CardDescription>
            </CardHeader>
            <CardContent>
                 <p className="text-muted-foreground mb-4">
                    La empresa utilizará su propio software para demostrar su eficacia (dogfooding) y optimizar su gestión. El flujo de trabajo será el siguiente:
                </p>
                <ol className="relative border-l border-border ml-6 space-y-8">
                    <li className="ml-8">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/20 rounded-full -left-4 ring-8 ring-background"><FileText className="h-4 w-4 text-primary"/></span>
                        <h3 className="font-semibold">1. Venta y Facturación</h3>
                        <p className="text-sm text-muted-foreground">Cuando se vende una papelera o una licencia de software, el sistema genera la factura automáticamente, cumpliendo con la normativa SENIAT y la envía al cliente.</p>
                    </li>
                    <li className="ml-8">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/20 rounded-full -left-4 ring-8 ring-background"><DollarSign className="h-4 w-4 text-primary"/></span>
                        <h3 className="font-semibold">2. Cuentas por Cobrar</h3>
                        <p className="text-sm text-muted-foreground">La IA monitorea los vencimientos, envía recordatorios de pago automáticos y alerta al equipo de cobranza sobre facturas en mora.</p>
                    </li>
                    <li className="ml-8">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/20 rounded-full -left-4 ring-8 ring-background"><Cpu className="h-4 w-4 text-primary"/></span>
                        <h3 className="font-semibold">3. Conciliación Bancaria</h3>
                        <p className="text-sm text-muted-foreground">El sistema se conecta con los bancos para conciliar los pagos recibidos con las facturas pendientes de forma automática, reduciendo el trabajo manual.</p>
                    </li>
                    <li className="ml-8">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/20 rounded-full -left-4 ring-8 ring-background"><ShieldCheck className="h-4 w-4 text-primary"/></span>
                        <h3 className="font-semibold">4. Contabilidad y Cumplimiento Fiscal</h3>
                        <p className="text-sm text-muted-foreground">Cada transacción (ingreso o gasto) genera los asientos contables correspondientes en tiempo real. Al final del mes, el sistema prepara los borradores para la declaración de IVA, ISLR y otras obligaciones fiscales.</p>
                    </li>
                </ol>
            </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Coins className="h-6 w-6 text-yellow-500"/>Modelo de Recompensas por Reciclaje</CardTitle>
                <CardDescription>Incentivando la participación ciudadana y corporativa en la economía circular.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h4 className="font-semibold text-lg mb-2">Funcionamiento del Sistema de Recompensas</h4>
                    <p className="text-muted-foreground mb-4">El acuerdo consiste en crear un ecosistema donde los usuarios son recompensados por reciclar, fomentando una cultura de sostenibilidad. Este sistema se apoya en una alianza estratégica entre System C.M.S. y una aplicación de pagos o lealtad.</p>
                    <div className="flex flex-col md:flex-row items-center justify-around gap-4 text-center p-4 bg-secondary/50 rounded-lg">
                        <div className="flex flex-col items-center gap-2">
                            <div className="p-3 bg-primary/10 rounded-full"><User className="h-6 w-6 text-primary"/></div>
                            <p className="font-semibold">1. Usuario Recicla</p>
                        </div>
                         <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block"/>
                        <div className="flex flex-col items-center gap-2">
                            <div className="p-3 bg-green-500/10 rounded-full"><Recycle className="h-6 w-6 text-green-500"/></div>
                            <p className="font-semibold">2. Papelera Identifica</p>
                        </div>
                        <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block"/>
                        <div className="flex flex-col items-center gap-2">
                            <div className="p-3 bg-yellow-500/10 rounded-full"><Check className="h-6 w-6 text-yellow-500"/></div>
                            <p className="font-semibold">3. App Aliada Recompensa</p>
                        </div>
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold text-lg mb-2">Beneficios del Modelo</h4>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li><strong>Fomenta la Cultura del Reciclaje:</strong> Incentiva directamente al usuario, aumentando las tasas de reciclaje.</li>
                        <li><strong>Crea un Ecosistema de Economía Circular:</strong> Conecta a los productores de residuos (usuarios) con el sistema de recolección y las empresas recicladoras.</li>
                        <li><strong>Fortalece el Impacto Social:</strong> Genera un beneficio tangible para la comunidad, reforzando la imagen de marca de la startup y sus aliados.</li>
                        <li><strong>Nuevas Oportunidades de Negocio:</strong> Abre la puerta a alianzas con programas de lealtad, supermercados y otras empresas que quieran participar en el ecosistema.</li>
                    </ul>
                </div>
            </CardContent>
        </Card>

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

    