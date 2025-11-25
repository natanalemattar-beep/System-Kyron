
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Download, FileText, DollarSign, ShieldAlert, TrendingUp, Search, Users, Cpu, Recycle, Workflow, ShieldCheck, Scale, Info, Briefcase, Network, Target, CheckCircle, Lightbulb, Activity, FileSignature, Gavel } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const modeloNegocio = [
    "Venta de Papeleras Inteligentes: Comercialización de los dispositivos a municipios, centros comerciales, empresas y condominios.",
    "Licenciamiento de Software Contable: Venta de licencias del sistema de gestión administrativa y contable 100% automatizado.",
    "Soporte Técnico y Mantenimiento: Contratos de soporte para garantizar el funcionamiento óptimo tanto del hardware (papeleras) como del software (sistema contable).",
    "Análisis de Datos como Servicio: Monetización de los datos de residuos para ayudar a otras empresas a mejorar su gestión de desperdicios.",
];

const aspectosTecnicosPapelera = [
    "Sensores y Clasificación por IA: Uso de sensores ópticos, de peso y visión por computadora para identificar y clasificar automáticamente papel, plástico, vidrio, metal y orgánicos.",
    "Automatización de Compartimentos: Una vez clasificado, el residuo es dirigido al compartimento interno correcto de forma automática.",
    "Conectividad IoT: Las papeleras se conectan a la nube para monitorear en tiempo real los niveles de llenado, optimizando las rutas de recolección y reduciendo costos."
];

const aspectosTecnicosSoftware = [
    "Automatización de Procesos (RPA): El sistema automatiza tareas repetitivas como la entrada de datos de facturas, conciliaciones bancarias y generación de reportes.",
    "Inteligencia Artificial para el Cumplimiento: La IA verifica que todas las operaciones cumplan con las normativas del SENIAT y otras regulaciones locales, minimizando el riesgo de sanciones.",
    "Integración Total: Se conecta con bancos, sistemas de facturación de proveedores y plataformas de RR.HH. para centralizar toda la información financiera.",
];

const publicoObjetivoPapelera = [
    { target: "Municipios y Entes Públicos", need: "Optimizar la gestión de residuos urbanos y promover la sostenibilidad." },
    { target: "Centros Comerciales y Grandes Superficies", need: "Mejorar la experiencia del visitante y reducir costos operativos de limpieza." },
    { target: "Empresas con Políticas de Sostenibilidad (RSE)", need: "Cumplir con metas ambientales y mejorar su imagen corporativa." },
];

const publicoObjetivoSoftware = [
    { target: "Pequeñas y Medianas Empresas (PYMES)", need: "Automatizar su contabilidad y asegurar el cumplimiento fiscal sin necesidad de un gran equipo." },
    { target: "Emprendedores y Nuevos Negocios", need: "Una solución todo-en-uno para empezar con el pie derecho, gestionando facturación y finanzas desde el día uno." },
    { target: "Firmas de Contadores", need: "Una herramienta eficiente para gestionar la contabilidad de múltiples clientes desde una única plataforma." },
];

const foda = {
    fortalezas: ["Doble línea de negocio (hardware + software) que crea un ecosistema robusto.", "Solución innovadora con alto impacto social y ambiental.", "Mercado con una necesidad clara y urgente de digitalización y cumplimiento."],
    oportunidades: ["Creciente conciencia sobre la sostenibilidad y la economía circular.", "Digitalización acelerada de las PYMES en Venezuela.", "Altas sanciones del SENIAT que incentivan la adopción de sistemas homologados."],
    debilidades: ["Alta inversión inicial en I+D para hardware y software.", "Dependencia de proveedores de tecnología y componentes.", "Curva de aprendizaje para la adopción de nuevas tecnologías por parte de los clientes."],
    amenazas: ["Competencia de software administrativo tradicional ya establecido.", "Cambios regulatorios imprevistos en materia fiscal o ambiental.", "Inestabilidad económica que puede afectar la inversión en tecnología."],
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
const puntoEquilibrio = Math.abs(proyecciones.costosFijos) / (utilidadBruta / totalIngresos);


export default function EstudioFactibilidadEconomicaPage() {
    const { toast } = useToast();

    const handleDownloadStudy = () => {
        const content = `
ESTUDIO DE FACTIBILIDAD ECONÓMICA: Kyron
==================================================

1. INTRODUCCIÓN
----------------
1.1. Planteamiento del Problema:
Las empresas en Venezuela enfrentan un doble desafío: una creciente presión por adoptar prácticas sostenibles y la abrumadora complejidad del entorno fiscal y administrativo. La gestión ineficiente de residuos y la carga burocrática representan costos y riesgos.

1.2. Justificación:
Este proyecto ofrece una solución dual: la Papelera Inteligente promueve la economía circular y el Software de Gestión garantiza la tranquilidad fiscal y la eficiencia operativa.

1.3. Objetivos del Estudio:
- General: Determinar la factibilidad técnica, económica, legal y operativa del ecosistema "Kyron".
- Específicos: Analizar mercado, evaluar requerimientos técnicos, definir estructura y estimar la rentabilidad.

2. ESTUDIO DE MERCADO
---------------------
Público Objetivo (Papelera Inteligente):
- Municipios: Optimizar gestión de residuos.
- Centros Comerciales: Mejorar experiencia del visitante.
- Empresas con RSE: Cumplir metas ambientales.

Público Objetivo (Software Contable):
- PYMES: Automatizar contabilidad.
- Emprendedores: Solución todo-en-uno.
- Firmas de Contadores: Herramienta eficiente.

Tamaño y Competencia:
Mercado potencial estimado en > $80 millones anuales. La competencia es fragmentada y sin soluciones integradas.

3. ESTUDIO TÉCNICO
-------------------
Producto 1: Papelera Inteligente
- Clasificación por IA con sensores ópticos y de peso.
- Automatización de compartimentos internos.
- Conectividad IoT para monitoreo en tiempo real.

Producto 2: Software de Automatización
- Automatización de Procesos (RPA) para facturas, conciliaciones, etc.
- IA para cumplimiento de normativas SENIAT.
- API para integración con bancos, CRMs, etc.

4. ESTUDIO ORGANIZACIONAL Y LEGAL
---------------------------------
Estructura Organizacional:
- Dirección General (CEO)
- Dpto. de Tecnología (CTO)
- Dpto. de Operaciones (COO)
- Dpto. Comercial
- Dpto. Administrativo y Legal

Marco Legal:
- Constitución como C.A. o S.A.
- Homologación del software ante el SENIAT.
- Registro de marca (SAPI) y patentes.
- Cumplimiento de normativas ambientales (MINEC).

5. ESTUDIO FINANCIERO
---------------------
Modelo de Negocio:
${modeloNegocio.map(item => `- ${item}`).join('\n')}

Proyecciones Financieras Anuales (Estimadas):
- Ingresos por Papeleras: ${formatCurrency(proyecciones.ingresosPapeleras)}
- Ingresos por Software: ${formatCurrency(proyecciones.ingresosSoftware)}
- Ingresos por Soporte: ${formatCurrency(proyecciones.ingresosSoporte)}
- TOTAL INGRESOS: ${formatCurrency(totalIngresos)}
- Costos Variables: ${formatCurrency(proyecciones.costosVariables)}
- UTILIDAD BRUTA: ${formatCurrency(utilidadBruta)}
- Costos Fijos: ${formatCurrency(proyecciones.costosFijos)}
- UTILIDAD NETA (EBITDA): ${formatCurrency(utilidadNeta)}
- PUNTO DE EQUILIBRIO (Ingresos): ${formatCurrency(puntoEquilibrio)}

6. ANÁLISIS DE RIESGOS (FODA)
-----------------------------
- Fortalezas: ${foda.fortalezas.join(', ')}.
- Oportunidades: ${foda.oportunidades.join(', ')}.
- Debilidades: ${foda.debilidades.join(', ')}.
- Amenazas: ${foda.amenazas.join(', ')}.

7. CONCLUSIÓN
---------------
El proyecto "Kyron" se considera altamente factible. La combinación de hardware innovador con un modelo SaaS recurrente crea una propuesta de valor sólida. Se recomienda proceder con la fase de prototipado y búsqueda de capital semilla.
`;

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Estudio_Factibilidad_Kyron.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "Descarga Completa",
            description: "El estudio de factibilidad ha sido guardado como 'Estudio_Factibilidad_Kyron.txt'.",
        });
    };

  return (
    <div className="p-4 md:p-8 space-y-12">
      <header className="mb-8 text-center">
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
            <Bot className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Estudio de Factibilidad Económica</h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          Análisis integral del proyecto "Kyron" bajo la Metodología de Proyectos de Inversión.
        </p>
         <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleDownloadStudy}>
                <Download className="mr-2" />
                Descargar Estudio Completo
            </Button>
        </div>
      </header>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>1. Introducción</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
                <div>
                    <h3 className="font-semibold text-foreground">1.1. Planteamiento del Problema</h3>
                    <p>Las empresas en Venezuela enfrentan un doble desafío: una creciente presión por adoptar prácticas sostenibles y la abrumadora complejidad del entorno fiscal y administrativo. La gestión ineficiente de residuos sólidos urbanos y la carga burocrática para el cumplimiento tributario representan costos operativos significativos y riesgos legales constantes, limitando el potencial de crecimiento e innovación.</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-foreground">1.2. Justificación</h3>
                    <p>Este proyecto se justifica por su capacidad para ofrecer una solución dual a problemas reales y urgentes. Al integrar hardware (Papelera Inteligente) y software (Sistema de Gestión), Kyron no solo promueve un modelo de economía circular, sino que también proporciona una herramienta de automatización que garantiza la tranquilidad fiscal y la eficiencia operativa, generando un impacto positivo tanto ambiental como económico.</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-foreground">1.3. Objetivos del Estudio</h3>
                    <p><strong>Objetivo General:</strong> Determinar la factibilidad técnica, económica, legal y operativa para la implementación del ecosistema integrado "Kyron" en el mercado venezolano.</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>Específicos:</strong></li>
                        <li>Analizar el mercado potencial para ambas líneas de producto.</li>
                        <li>Evaluar los requerimientos técnicos para el desarrollo y producción.</li>
                        <li>Definir la estructura organizacional y legal necesaria.</li>
                        <li>Estimar la inversión requerida, los costos, los ingresos y la rentabilidad del proyecto.</li>
                    </ul>
                </div>
            </CardContent>
        </Card>

         <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>2. Marco Metodológico</CardTitle>
                <CardDescription>La investigación se enmarca en una metodología de proyecto factible, con un enfoque descriptivo y documental.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Tipo y Diseño de la Investigación</AccordionTrigger>
                        <AccordionContent>
                           <p>Se emplea un diseño de investigación descriptivo para caracterizar el mercado y documental para analizar el marco legal y normativo. El enfoque es de tipo "proyecto factible", ya que busca proponer una solución viable a una necesidad de mercado.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Fuentes y Técnicas de Recolección de Datos</AccordionTrigger>
                        <AccordionContent>
                           <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Fuentes Primarias:</strong> Encuestas a PYMES y entrevistas con expertos en gestión de residuos y contabilidad.</li>
                                <li><strong>Fuentes Secundarias:</strong> Análisis de gacetas oficiales, leyes tributarias, códigos de comercio, estudios de mercado existentes y documentación técnica de componentes de hardware y software.</li>
                           </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Search className="h-6 w-6"/>3. Estudio de Mercado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-3">Público Objetivo</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-secondary/50 rounded-lg">
                            <h4 className="font-medium text-foreground mb-2">Papelera Inteligente</h4>
                             <ul className="space-y-2 text-sm">
                                {publicoObjetivoPapelera.map(item => <li key={item.target}><strong>{item.target}:</strong> {item.need}</li>)}
                            </ul>
                        </div>
                        <div className="p-4 bg-secondary/50 rounded-lg">
                            <h4 className="font-medium text-foreground mb-2">Software Contable</h4>
                            <ul className="space-y-2 text-sm">
                                {publicoObjetivoSoftware.map(item => <li key={item.target}><strong>{item.target}:</strong> {item.need}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
                 <div>
                    <h3 className="font-semibold mb-3">Tamaño y Competencia</h3>
                    <p className="text-muted-foreground">Se estima un mercado potencial combinado de más de **$80 millones anuales**. La competencia es fragmentada y, en su mayoría, no ofrece una solución integrada, lo que representa una ventaja competitiva clave para Kyron.</p>
                </div>
            </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Cpu className="h-6 w-6"/>4. Estudio Técnico</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2"><Recycle className="text-green-500"/>Producto 1: Papelera Inteligente</h3>
                    <p className="text-sm text-muted-foreground">Dispositivo de hardware diseñado para revolucionar la recolección y clasificación de residuos.</p>
                     <ul className="list-disc pl-5 space-y-2 text-sm">
                        {aspectosTecnicosPapelera.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </div>
                 <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2"><FileText className="text-blue-500"/>Producto 2: Software de Automatización</h3>
                    <p className="text-sm text-muted-foreground">Plataforma SaaS para la gestión integral de procesos administrativos y contables.</p>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                        {aspectosTecnicosSoftware.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </div>
            </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
             <CardHeader>
                <CardTitle className="flex items-center gap-3"><Briefcase className="h-6 w-6"/>5. Estudio Organizacional y Legal</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-semibold mb-2">Estructura Organizacional Propuesta</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                        <li><strong className="text-foreground">Dirección General:</strong> CEO, responsable de la visión estratégica.</li>
                        <li><strong className="text-foreground">Departamento de Tecnología:</strong> CTO, equipos de Hardware y Software.</li>
                        <li><strong className="text-foreground">Departamento de Operaciones:</strong> COO, logística, producción y soporte.</li>
                        <li><strong className="text-foreground">Departamento Comercial:</strong> Ventas y Marketing.</li>
                        <li><strong className="text-foreground">Departamento Administrativo y Legal:</strong> Finanzas, Contabilidad y Cumplimiento.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Marco Legal</h3>
                     <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                        <li><strong>Constitución de Empresa:</strong> Registro como Compañía Anónima (C.A.) o Sociedad Anónima (S.A.).</li>
                        <li><strong>Cumplimiento Tributario:</strong> Homologación del software ante el SENIAT (Providencia 121).</li>
                        <li><strong>Propiedad Intelectual:</strong> Registro de marca (SAPI) y patentes de diseño de hardware.</li>
                        <li><strong>Normativa Ambiental:</strong> Cumplimiento con leyes de gestión de residuos (MINEC).</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
        
         <Card className="bg-card/50 backdrop-blur-sm">
             <CardHeader>
                <CardTitle className="flex items-center gap-3"><DollarSign className="h-6 w-6"/>6. Estudio Financiero</CardTitle>
            </CardHeader>
            <CardContent>
                <h3 className="font-semibold mb-3">Modelo de Negocio y Proyecciones</h3>
                <p className="text-muted-foreground mb-4">La estrategia de monetización se basa en múltiples flujos de ingreso para garantizar la sostenibilidad y el crecimiento:</p>
                 <ul className="grid md:grid-cols-2 gap-4 mb-6">
                    {modeloNegocio.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-sm">{item}</span>
                        </li>
                    ))}
                </ul>
                 <Table>
                    <TableHeader><TableRow><TableHead colSpan={2}>Proyecciones Financieras Anuales (Estimadas)</TableHead></TableRow></TableHeader>
                    <TableBody>
                        <TableRow><TableCell>Ingresos por Venta de Papeleras</TableCell><TableCell className="text-right">{formatCurrency(proyecciones.ingresosPapeleras)}</TableCell></TableRow>
                        <TableRow><TableCell>Ingresos por Licencias de Software</TableCell><TableCell className="text-right">{formatCurrency(proyecciones.ingresosSoftware)}</TableCell></TableRow>
                        <TableRow><TableCell>Ingresos por Soporte y Mantenimiento</TableCell><TableCell className="text-right">{formatCurrency(proyecciones.ingresosSoporte)}</TableCell></TableRow>
                        <TableRow className="font-bold"><TableCell>Total Ingresos</TableCell><TableCell className="text-right">{formatCurrency(totalIngresos)}</TableCell></TableRow>
                        <TableRow><TableCell>Costos Variables</TableCell><TableCell className="text-right text-red-500">{formatCurrency(proyecciones.costosVariables)}</TableCell></TableRow>
                        <TableRow className="font-bold border-t"><TableCell>Utilidad Bruta</TableCell><TableCell className="text-right">{formatCurrency(utilidadBruta)}</TableCell></TableRow>
                        <TableRow><TableCell>Costos Fijos</TableCell><TableCell className="text-right text-red-500">{formatCurrency(proyecciones.costosFijos)}</TableCell></TableRow>
                        <TableRow className="font-bold text-lg text-primary border-t-2 border-primary"><TableCell>Utilidad Neta (EBITDA)</TableCell><TableCell className="text-right">{formatCurrency(utilidadNeta)}</TableCell></TableRow>
                         <TableRow className="font-bold border-t"><TableCell>Punto de Equilibrio (Ingresos)</TableCell><TableCell className="text-right">{formatCurrency(puntoEquilibrio)}</TableCell></TableRow>
                    </TableBody>
                </Table>
            </CardContent>
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
                <CardTitle>8. Conclusión y Recomendaciones</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg font-semibold">El proyecto "Kyron" se considera **altamente factible y con un potencial de mercado significativo**.</p>
                <p className="text-muted-foreground mt-2">
                    La combinación de un producto de hardware innovador con un modelo de negocio SaaS recurrente crea una propuesta de valor sólida y sostenible. Aunque la inversión inicial es considerable, las proyecciones financieras y las ventajas competitivas justifican el riesgo. El éxito dependerá de una ejecución técnica impecable y una estrategia de comercialización agresiva. Se recomienda proceder con la fase de desarrollo de prototipos y la búsqueda de capital semilla.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
