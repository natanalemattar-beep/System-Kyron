
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Download, FileText, DollarSign, ShieldAlert, TrendingUp, Search, Users, Cpu, Recycle, Workflow, ShieldCheck, Scale, Info, Briefcase, Network, Target, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

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
        const fullStudyContent = `
ESTUDIO DE FACTIBILIDAD ECONÓMICA - System C.M.S.

1. RESUMEN EJECUTIVO
   - Proyecto: Desarrollo y comercialización de un ecosistema integrado que consiste en una Papelera Inteligente para reciclaje y un Software de Automatización Contable.
   - Misión: Impulsar la sostenibilidad ambiental y la eficiencia empresarial en Venezuela a través de la tecnología.
   - Oportunidad: Existe una doble oportunidad de mercado: la necesidad de una gestión de residuos moderna y la demanda de herramientas administrativas que garanticen el cumplimiento fiscal.
   - Objetivos: 
     1. Posicionarse como líder en tecnología para la sostenibilidad.
     2. Convertirse en la solución SaaS de referencia para la gestión contable de PYMES en Venezuela.
     3. Alcanzar el punto de equilibrio en 24 meses.

2. ANÁLISIS DE MERCADO
   - Público Objetivo (Papelera): Municipios, centros comerciales, grandes empresas.
   - Público Objetivo (Software): PYMES, emprendedores y contadores.
   - Tamaño del Mercado (Estimado):
     - Mercado de Gestión de Residuos (Potencial): $50M Anuales.
     - Mercado de Software Administrativo (PYMES): $30M Anuales.
   - Competencia:
     - Papelera: Competidores indirectos (sistemas de recolección tradicionales). Ventaja: innovación y eficiencia.
     - Software: Sistemas administrativos establecidos (ej. Saint, ProfitPlus). Ventaja: enfoque en la nube, automatización con IA y usabilidad.

3. ESTUDIO TÉCNICO
   3.1. Producto 1: Papelera Inteligente
       - Aspectos Técnicos: ${aspectosTecnicosPapelera.join(', ')}.
   3.2. Producto 2: Software de Automatización Contable
       - Aspectos Técnicos: ${aspectosTecnicosSoftware.join(', ')}.

4. MODELO DE NEGOCIO Y ESTRATEGIA DE MONETIZACIÓN
   - ${modeloNegocio.join('\n   - ')}

5. ESTRUCTURA ORGANIZACIONAL
   - Departamentos Clave: Tecnología y Desarrollo, Operaciones y Logística, Ventas y Marketing, Administración y Finanzas, Cumplimiento Legal.

6. ANÁLISIS FINANCIERO (PROYECCIONES ANUALES)
   - Ingresos por Venta de Papeleras: ${formatCurrency(proyecciones.ingresosPapeleras)}
   - Ingresos por Licencias de Software: ${formatCurrency(proyecciones.ingresosSoftware)}
   - Ingresos por Soporte y Mantenimiento: ${formatCurrency(proyecciones.ingresosSoporte)}
   - TOTAL INGRESOS: ${formatCurrency(totalIngresos)}
   - Costos Variables (Producción, Comisiones): ${formatCurrency(proyecciones.costosVariables)}
   - UTILIDAD BRUTA: ${formatCurrency(utilidadBruta)}
   - Costos Fijos (Nómina, Alquiler, Marketing): ${formatCurrency(proyecciones.costosFijos)}
   - UTILIDAD NETA (EBITDA): ${formatCurrency(utilidadNeta)}
   - Punto de Equilibrio (Ingresos necesarios): ${formatCurrency(puntoEquilibrio)}

7. ANÁLISIS DE RIESGOS (FODA)
   - Fortalezas: ${foda.fortalezas.join('. ')}.
   - Oportunidades: ${foda.oportunidades.join('. ')}.
   - Debilidades: ${foda.debilidades.join('. ')}.
   - Amenazas: ${foda.amenazas.join('. ')}.

8. CONCLUSIÓN
   El proyecto es altamente factible. La sinergia entre ambos productos crea barreras de entrada significativas y múltiples flujos de ingreso. El principal desafío reside en la ejecución y la gestión del capital inicial, pero el potencial de mercado y el impacto positivo justifican la inversión.
        `;

        const blob = new Blob([fullStudyContent.trim()], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'estudio-factibilidad-completo.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({
            title: "Descarga Completa",
            description: "El estudio de factibilidad detallado ha sido descargado.",
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
          Análisis integral del proyecto "System C.M.S.", que combina un ecosistema de hardware sostenible y software de gestión avanzada.
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
                <CardTitle>1. Resumen Ejecutivo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>El presente documento evalúa la factibilidad del proyecto "System C.M.S.", un modelo de negocio de doble impacto diseñado para el mercado venezolano. El proyecto se centra en dos productos sinérgicos: una **Papelera Inteligente** para la gestión de residuos y un **Software de Automatización Contable**.</p>
                <p>La misión es abordar simultáneamente la necesidad de soluciones sostenibles para el medio ambiente y la urgente demanda de eficiencia y cumplimiento fiscal por parte de las empresas en Venezuela. Este estudio concluye que el proyecto es financieramente viable, con un mercado potencial significativo y fuertes barreras de entrada gracias a su modelo de ecosistema integrado.</p>
            </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Search className="h-6 w-6"/>2. Análisis de Mercado</CardTitle>
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
                    <p className="text-muted-foreground">Se estima un mercado potencial combinado de más de **$80 millones anuales**. La competencia es fragmentada y, en su mayoría, no ofrece una solución integrada, lo que representa una ventaja competitiva clave para System C.M.S.</p>
                </div>
            </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Cpu className="h-6 w-6"/>3. Estudio Técnico</CardTitle>
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
                <CardTitle className="flex items-center gap-3"><Briefcase className="h-6 w-6"/>4. Modelo de Negocio y Monetización</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">La estrategia de monetización se basa en múltiples flujos de ingreso para garantizar la sostenibilidad y el crecimiento:</p>
                <ul className="space-y-3">
                    {modeloNegocio.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><DollarSign className="h-6 w-6"/>5. Análisis Financiero</CardTitle>
            </CardHeader>
            <CardContent>
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
                <CardTitle className="flex items-center gap-3"><ShieldAlert className="h-6 w-6"/>6. Análisis de Riesgos (FODA)</CardTitle>
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
                <CardTitle>7. Conclusión del Estudio</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg font-semibold">El proyecto "System C.M.S." se considera **altamente factible y con un potencial de mercado significativo**.</p>
                <p className="text-muted-foreground mt-2">La combinación de un producto de hardware innovador con un modelo de negocio SaaS recurrente crea una propuesta de valor sólida y sostenible. Aunque la inversión inicial es considerable, las proyecciones financieras y las ventajas competitivas justifican el riesgo. El éxito dependerá de una ejecución técnica impecable y una estrategia de comercialización agresiva.</p>
            </CardContent>
        </Card>
    </div>
  );
}
