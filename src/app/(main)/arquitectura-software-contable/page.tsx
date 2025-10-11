
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Cpu, Server, Shield, BrainCircuit, Link as LinkIcon, Bot, ArrowRight, Table as TableIcon, FileText, Code, VenetianMask, FlaskConical, Trophy, Repeat, BookOpen, HeartHandshake, Eye, Share2, Database, HelpCircle, BarChart, CheckCircle, Globe, Users, Scale, Ship, Briefcase, Network, DollarSign, ShieldAlert, TrendingUp, Search, User, Check, Coins, Workflow, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const iaFeatures = [
    {
        feature: "Procesamiento Inteligente de Documentos (IDP)",
        description: "Usar Machine Learning (ML) y OCR avanzado para extraer automáticamente, clasificar y conciliar datos de facturas, recibos y extractos bancarios, incluso de documentos con formatos atípicos, eliminando la entrada manual de datos.",
    },
    {
        feature: "Conciliación y Auditoría Autónoma",
        description: "Algoritmos de IA que concilian transacciones bancarias y de tarjetas en tiempo real con los registros contables. La IA debe buscar patrones de anomalías y fraudes de forma continua, generando alertas proactivas.",
    },
    {
        feature: "Contabilidad Predictiva (FinOps)",
        description: "En lugar de solo reportar el pasado, el sistema usa el historial para predecir flujos de caja futuros, modelar escenarios de impacto fiscal y presupuestar con precisión, ayudando a la toma de decisiones estratégicas.",
    },
    {
        feature: "Asistente de Consulta de IA (GPT Personalizado)",
        description: "Un modelo de lenguaje grande (LLM) ajustado a los datos de la empresa que permite a los usuarios preguntar en lenguaje natural sobre el estado financiero ('¿Cuál fue nuestro margen de beneficio el último trimestre?') y recibir resúmenes e informes instantáneos.",
    }
];

export default function ArquitecturaSoftwarePage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
            <Cpu className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Arquitectura del Sistema Contable Avanzado</h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          Un plan de desarrollo para una plataforma contable en la nube que integra tecnologías disruptivas como IA, serverless y blockchain para ofrecer una solución predictiva, segura e inmutable.
        </p>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="flex items-center gap-3"><Server className="h-6 w-6"/>Plataforma en la Nube de Última Generación (FinCloud ☁️)</CardTitle>
            <CardDescription>La base del sistema es una arquitectura nativa de la nube, escalable y segura.</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="multiple" defaultValue={["item-1", "item-2"]} className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>1. Arquitectura "Serverless" y Microservicios</AccordionTrigger>
                    <AccordionContent>
                        <p className="mb-4">Descomponer el sistema en servicios independientes (microservicios para facturación, libro mayor, nóminas) y usar computación sin servidor (serverless) para pagar solo por el cómputo consumido, reduciendo costos y escalando instantáneamente.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>2. Seguridad Avanzada con Enfoque "Zero Trust"</AccordionTrigger>
                    <AccordionContent>
                         <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Cifrado Homomórfico:</strong> Realizar cálculos sobre datos encriptados sin necesidad de descifrarlos, maximizando la confidencialidad.</li>
                            <li><strong>Autenticación Multifactor Adaptativa (AMFA):</strong> El sistema evalúa el riesgo de cada acceso en tiempo real y solicita verificación adicional solo si es necesario.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
      
       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="flex items-center gap-3"><BrainCircuit className="h-6 w-6"/>Sistema Contable Inteligente y Predictivo (SmartLedger)</CardTitle>
            <CardDescription>La innovación clave es dotar al sistema de capacidades de IA y contabilidad inmutable.</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="multiple" defaultValue={["item-ia", "item-blockchain"]} className="w-full">
                <AccordionItem value="item-ia">
                    <AccordionTrigger className="text-lg">1. Contabilidad Impulsada por Inteligencia Artificial (IA)</AccordionTrigger>
                    <AccordionContent>
                        <p className="my-4">Este es el pilar de la innovación, transformando al contador de un registrador a un estratega.</p>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-1/3">Característica Avanzada</TableHead>
                                        <TableHead>Descripción</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {iaFeatures.map(item => (
                                        <TableRow key={item.feature}>
                                            <TableCell className="font-semibold">{item.feature}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-blockchain">
                    <AccordionTrigger className="text-lg">2. Integración de Tecnología Blockchain</AccordionTrigger>
                    <AccordionContent>
                        <p className="my-4">El uso de Blockchain (Contabilidad de Triple Entrada) ofrece una capa de inmutabilidad y transparencia imposible con los sistemas tradicionales.</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Registros Contables Inmutables:</strong> Cada transacción se registra en una cadena de bloques privada, garantizando que no pueda ser alterada.</li>
                            <li><strong>Contratos Inteligentes (Smart Contracts):</strong> Automatizan procesos complejos como el pago de impuestos o la liberación de fondos, asegurando el cumplimiento normativo.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-integration">
                    <AccordionTrigger className="text-lg">3. Integración y Visibilidad Total (ERP Extendido)</AccordionTrigger>
                    <AccordionContent>
                         <p className="my-4">El sistema se integra fluidamente con el resto del ecosistema empresarial.</p>
                        <ul className="list-disc pl-5 space-y-2">
                           <li><strong>API Abierta y Estandarizada:</strong> APIs robustas para una integración bidireccional sencilla con sistemas de terceros (CRMs, eCommerce, etc.).</li>
                           <li><strong>Data Lake y Business Intelligence (BI):</strong> Almacena todos los datos en un Data Lake e incluye un módulo avanzado de BI para dashboards personalizados y reportes en tiempo real.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
      
       <Card className="bg-gradient-to-r from-primary/80 to-cyan-500/80 text-primary-foreground">
         <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
                <h2 className="text-3xl font-bold">Una Herramienta de Inteligencia de Negocio</h2>
                <p className="mt-2 opacity-80 max-w-2xl">
                    Al implementar estas características, la plataforma no solo cumplirá su función contable, sino que se convertirá en una herramienta de inteligencia de negocio predictiva y ultrasegura.
                </p>
            </div>
             <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/80 shrink-0" asChild>
                <Link href="/soluciones-ia">
                    Explorar Soluciones de IA <ArrowRight className="ml-2"/>
                </Link>
            </Button>
         </CardContent>
       </Card>

    </div>
  );
}
    