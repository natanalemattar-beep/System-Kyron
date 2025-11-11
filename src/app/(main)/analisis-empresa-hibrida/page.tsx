

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Layers, Rocket, ThumbsUp, ThumbsDown, CheckCircle, ArrowRight, Cloud } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

const hybridModelAdvantages = [
    "Ecosistema Cautivo: El hardware y el software se retroalimentan, creando una experiencia integrada que fideliza al cliente.",
    "Múltiples Flujos de Ingreso: Permite monetizar tanto la venta inicial del producto físico como las suscripciones recurrentes del software.",
    "Mayor Valor Percibido: La combinación de un producto tangible con servicios inteligentes aumenta el valor percibido por el cliente.",
    "Barreras de Entrada más Altas: La complejidad de desarrollar hardware y software simultáneamente dificulta la entrada de competidores."
];

const hybridModelChallenges = [
    "Complejidad Operativa: Requiere gestionar ciclos de vida de productos muy diferentes (fabricación vs. desarrollo de software).",
    "Altos Costos Iniciales: La investigación y desarrollo (I+D) tanto para hardware como para software puede requerir una inversión inicial significativa.",
    "Gestión de Inventario y Logística: La parte de hardware implica manejar stock, envíos y cadena de suministro, algo ajeno a las startups de software puro.",
    "Marketing y Ventas Doble: Necesitas estrategias para vender tanto un producto físico como una suscripción digital."
];

const saasAdvantages = [
    { title: "Escalabilidad Global", description: "Un software puede ser distribuido a miles de usuarios en todo el mundo sin un aumento significativo en los costos de producción." },
    { title: "Ingresos Recurrentes", description: "El modelo de suscripción (mensual o anual) genera un flujo de caja predecible y estable." },
    { title: "Márgenes Altos", description: "Una vez desarrollado, el costo de servir a un nuevo cliente es marginal, lo que lleva a márgenes de beneficio muy altos." },
];

const saasIdeas = [
    "Plataforma de Telemedicina: Conecta a médicos venezolanos con pacientes dentro y fuera del país.",
    "Software de Gestión para Condominios: Automatiza el cobro de cuotas, la reserva de áreas comunes y la comunicación con los residentes.",
    "Herramienta de Marketing Automation para Redes Sociales: Ayuda a las PYMES a programar contenido y analizar su rendimiento en Instagram, X, etc.",
];


export default function AnalisisEmpresaHibridaPage() {

  return (
    <div className="p-4 md:p-8 space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Rocket className="h-8 w-8 text-primary"/>
            Análisis de Modelos de Negocio para Startups
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprendiendo el potencial de combinar hardware, software y servicios en un ecosistema integrado.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Rocket className="h-6 w-6"/> ¿Qué es una Startup?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                    Una startup es una organización temporal diseñada para buscar un modelo de negocio repetible y escalable. A diferencia de una empresa tradicional, su objetivo principal no es la rentabilidad inmediata, sino el crecimiento rápido y la validación de una idea innovadora en el mercado.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li><strong>Innovación:</strong> Ofrece un producto o servicio novedoso.</li>
                    <li><strong>Escalabilidad:</strong> Tiene el potencial de crecer exponencialmente sin un aumento proporcional en los costos.</li>
                    <li><strong>Base Tecnológica:</strong> Generalmente, su modelo de negocio se apoya en la tecnología.</li>
                    <li><strong>Incertidumbre:</strong> Opera en un entorno de alta incertidumbre y riesgo.</li>
                </ul>
            </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Layers className="h-6 w-6"/> Modelo Híbrido: Hardware + Software</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Una startup híbrida es aquella que integra productos físicos (hardware) con plataformas digitales (software y servicios) para crear un ecosistema unificado. No se limita a vender un dispositivo, sino que ofrece una solución completa donde el valor reside en la interacción entre el mundo físico y el digital.
                </p>
                 <p className="text-sm mt-4 p-3 bg-secondary/50 rounded-lg">
                    <strong>Ejemplo Clásico:</strong> Apple. Vende un iPhone (hardware) que funciona gracias a iOS (software) y se enriquece con servicios como iCloud y la App Store.
                </p>
            </CardContent>
        </Card>
      </div>
      
      <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Cloud className="h-6 w-6"/> Modelo 100% Online (Software as a Service - SaaS)</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-6">
                    Este es el modelo más común para startups tecnológicas. El producto es enteramente digital y se accede a él a través de internet, generalmente mediante una suscripción.
                </p>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold mb-2">Ventajas Clave:</h4>
                        <ul className="space-y-4">
                            {saasAdvantages.map(item => (
                                <li key={item.title} className="flex items-start gap-3 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0"/>
                                    <div>
                                        <strong>{item.title}:</strong> {item.description}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-2">Ideas de Negocio SaaS para Venezuela:</h4>
                        <ul className="space-y-2">
                           {saasIdeas.map(item => (
                                <li key={item} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>

       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Ventajas y Desafíos del Modelo Híbrido</CardTitle>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/2 text-green-500 flex items-center gap-2"><ThumbsUp/> Ventajas</TableHead>
                        <TableHead className="w-1/2 text-red-500 flex items-center gap-2"><ThumbsDown/> Desafíos</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="align-top">
                        <TableCell>
                            <ul className="space-y-3">
                                {hybridModelAdvantages.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0"/>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </TableCell>
                         <TableCell>
                            <ul className="space-y-3">
                                {hybridModelChallenges.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm">
                                        <ArrowRight className="h-4 w-4 text-red-500 mt-0.5 shrink-0"/>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
       </Card>

        <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
                <CardTitle>Aplicación al Proyecto "System C.M.S"</CardTitle>
                <CardDescription>Cómo tu empresa encarna perfectamente el modelo de startup híbrida.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold mb-2">Pilar de Hardware: La Papelera Inteligente</h4>
                    <p className="text-sm text-muted-foreground">
                        Es el producto físico que interactúa con el mundo real. Su función de clasificar residuos automáticamente es el gancho innovador que atrae a clientes preocupados por la sostenibilidad y la eficiencia.
                    </p>
                </div>
                 <div>
                    <h4 className="font-semibold mb-2">Pilar de Software: El Sistema de Gestión</h4>
                    <p className="text-sm text-muted-foreground">
                        Es el cerebro del ecosistema. No solo gestiona los datos de las papeleras (IoT), sino que también es un producto en sí mismo: un software de automatización contable y administrativa que resuelve un problema clave en Venezuela.
                    </p>
                </div>
            </CardContent>
            <CardContent>
                 <p className="text-center text-sm font-medium p-4 bg-background rounded-lg border">
                    <strong>La Sinergia:</strong> Vendes la papelera (Hardware) y la gestionas con tu sistema (Software), que a su vez vendes como un servicio a otras empresas. Este es un ejemplo claro de un modelo de negocio híbrido, robusto y diversificado.
                </p>
            </CardContent>
            <CardContent>
                 <Button asChild className="w-full">
                    <Link href="/estudio-factibilidad-economica">
                        Ver Estudio de Factibilidad Completo <ArrowRight className="ml-2"/>
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}

    
