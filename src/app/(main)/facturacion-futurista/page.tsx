
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Bot, Eye, BarChart, Sparkles, Wand2, Orbit, BrainCircuit } from "lucide-react";
import Image from "next/image";

const futureUIConcepts = [
    {
        icon: Bot,
        title: "Interfaz Conversacional (IA)",
        description: "En lugar de hacer clic en menús, los usuarios simplemente le preguntarán al sistema en lenguaje natural: 'Muéstrame las facturas pendientes de este mes' o 'Proyecta mis ingresos para el próximo trimestre'. La IA entiende y responde con el informe correcto."
    },
    {
        icon: BarChart,
        title: "Dashboards Predictivos y Proactivos",
        description: "El dashboard no solo mostrará datos pasados. Utilizará la IA para anticipar problemas ('Riesgo de flujo de caja negativo en 30 días') o sugerir oportunidades ('Basado en el historial, el cliente X está listo para una renovación')."
    },
    {
        icon: Sparkles,
        title: "Automatización 'Cero-Clic'",
        description: "Las tareas repetitivas se automatizan por completo. La facturación recurrente se genera y envía sola, los recordatorios de pago se activan sin intervención, y el sistema aprende de las correcciones para mejorar con el tiempo."
    },
    {
        icon: Eye,
        title: "Visualización con Realidad Aumentada (AR)",
        description: "Los gerentes podrán usar su teléfono o unas gafas de AR para escanear un producto en el almacén y ver superpuesta en su pantalla toda su información: stock, historial de ventas, margen de beneficio y órdenes de compra pendientes."
    },
    {
        icon: Orbit,
        title: "Diseño Centrado en la Calma (Calm Technology)",
        description: "La interfaz se mantendrá en segundo plano y solo presentará información clave en el momento justo, evitando la sobrecarga de datos. El objetivo es que la tecnología informe sin ser intrusiva."
    }
];

export default function FacturacionFuturistaPage() {
  return (
    <div className="space-y-12">
      <header className="mb-8 text-center">
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
            <Wand2 className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">UI/UX Futurista para Facturación y Gestión</h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          La evolución de las interfaces: de la entrada de datos manual a la interacción inteligente y la asistencia proactiva.
        </p>
      </header>
      
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Los 5 Pilares de la Interfaz del Futuro</CardTitle>
            <CardDescription>La experiencia de usuario (UX) se centrará en la simplicidad, la inteligencia y la automatización invisible.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureUIConcepts.slice(0,3).map(concept => (
                <div key={concept.title} className="p-6 bg-secondary/50 rounded-lg">
                    <concept.icon className="h-8 w-8 text-primary mb-4"/>
                    <h3 className="font-semibold text-lg">{concept.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{concept.description}</p>
                </div>
            ))}
        </CardContent>
      </Card>
      
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
             <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Eye className="h-6 w-6 text-primary"/>Realidad Aumentada en el Almacén</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">
                        Imagina a un gerente de almacén apuntando su tablet a una estantería. La aplicación de Realidad Aumentada superpone digitalmente los datos de inventario sobre la imagen real: niveles de stock, fechas de vencimiento y sugerencias de reorden, todo en tiempo real.
                    </p>
                     <div className="relative aspect-video rounded-lg overflow-hidden border">
                         <Image 
                            src="https://images.unsplash.com/photo-1578575437136-7242e3743537?q=80&w=1920&auto=format&fit=crop"
                            alt="Hombre usando una tablet en un almacén"
                            data-ai-hint="man tablet warehouse"
                            layout="fill"
                            objectFit="cover"
                         />
                         <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <p className="text-white text-2xl font-bold text-center p-4" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
                                Stock: 150 Unidades<br/>
                                <span className="text-base font-normal">Última Venta: Hace 2 horas</span>
                            </p>
                         </div>
                     </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
             <Card className="bg-card/50 backdrop-blur-sm">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Orbit className="h-6 w-6 text-primary"/>Tecnología Centrada en la Calma</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        El sistema del futuro no te bombardeará con notificaciones. Aprenderá tus patrones y solo te alertará sobre lo verdaderamente importante, permitiéndote concentrarte en lo que más importa: dirigir tu negocio.
                    </p>
                </CardContent>
            </Card>
             <Card className="bg-card/50 backdrop-blur-sm">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-3"><BrainCircuit className="h-6 w-6 text-primary"/>El Asistente Definitivo</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                       Al combinar todas estas tecnologías, el sistema de facturación deja de ser una herramienta y se convierte en un asistente proactivo que optimiza, previene y asesora.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
