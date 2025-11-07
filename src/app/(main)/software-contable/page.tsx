
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, HelpCircle, Puzzle, ThumbsUp, ShieldCheck, ArrowRight, FileWarning, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const faqItems = [
    {
        question: "¿Qué es un sistema administrativo en Venezuela?",
        answer: "Es un software que gestiona procesos contables y de facturación, adaptado a la normativa del país, especialmente a las exigencias del SENIAT."
    },
    {
        question: "¿Cuál es el mejor software administrativo homologado por el SENIAT?",
        answer: "Depende de cada negocio, pero opciones como Hybrid LiteOS, Galac y Profit Plus destacan por cumplir con la providencia vigente. La elección debe basarse en el tamaño de la empresa y sus necesidades específicas."
    },
    {
        question: "¿Qué beneficios tiene para una PYME?",
        answer: "Ordena la facturación, controla inventarios, reduce errores humanos y, lo más importante, asegura el cumplimiento fiscal, lo que se traduce en tranquilidad."
    },
    {
        question: "¿Cuánto cuesta implementar un sistema administrativo?",
        answer: "Los precios varían según licencias, usuarios y soporte, pero lo importante es ver el costo como una inversión en seguridad y tranquilidad."
    },
    {
        question: "¿Se puede usar a distancia?",
        answer: "Sí, cada vez más soluciones ofrecen acceso remoto o son basadas en la nube, ideal para gerentes que necesitan revisar reportes desde cualquier lugar."
    }
];

const nationalSystems = [
  { 
    name: "Saint", 
    description: "Muy popular por su versatilidad, usado en PYMES. Ofrece módulos administrativos y contables.",
    advantages: ["Muy conocido en el mercado", "Gran cantidad de contadores lo dominan."],
    disadvantages: ["Versiones más populares no homologadas", "Interfaz considerada anticuada", "Rígido para adaptarse."]
  },
  { 
    name: "Gálac Software", 
    description: "Soluciones robustas y completas (Contabilidad, Nómina, Administrativo) con fuerte enfoque en cumplimiento.",
    advantages: ["Ecosistema integrado", "Homologado", "Fuerte enfoque en NIIF."],
    disadvantages: ["Puede ser complejo para PYMES", "Costo de implementación más elevado."]
  },
  { 
    name: "Profit Plus", 
    description: "Muy escalable y adaptable, con fuerte presencia en el país.",
    advantages: ["Altamente personalizable", "Homologado", "Ideal para negocios en crecimiento."],
    disadvantages: ["Curva de aprendizaje pronunciada", "Requiere inversión en personalización."]
  },
   { 
    name: "A2 Softway", 
    description: "Amplia gama de módulos con gran presencia en comercios minoristas (POS).",
    advantages: ["Fuerte en punto de venta", "Modular", "Buena red de distribución."],
    disadvantages: ["La integración entre módulos puede ser compleja."]
  },
];

const internationalSystems = [
    { name: "SAP Business One", description: "ERP de clase mundial para empresas medianas y grandes que buscan una integración total.", advantages: ["Extremadamente potente", "Personalizable", "Reconocimiento global."], disadvantages: ["Costo muy elevado en licencias e implementación", "Excesivo para la mayoría de PYMES."] },
    { name: "Odoo", description: "ERP de código abierto con una gran cantidad de módulos que se adapta a diversas necesidades.", advantages: ["Modular y flexible", "Comunidad activa", "Costo inicial puede ser bajo."], disadvantages: ["Requiere un 'partner' local para la localización fiscal", "La personalización puede volverse costosa."] },
    { name: "QuickBooks Online", description: "Plataforma en la nube popular para la gestión de PYMES a nivel global.", advantages: ["Interfaz muy amigable", "Fácil de usar", "Basado 100% en la nube."], disadvantages: ["No está adaptado a la normativa venezolana", "Requiere herramientas complementarias para reportes fiscales."] },
];

const ourSystem = {
    name: "Hybrid LiteOS (System C.M.S)",
    description: "La solución moderna diseñada para PYMES y comerciantes en Venezuela, que combina facilidad de uso con cumplimiento fiscal garantizado.",
    advantages: ["Diseño moderno e intuitivo", "Enfocado en la facilidad de uso", "Homologado (Providencia 121)", "Asesoría y soporte local incluidos."],
    disadvantages: ["Más nuevo en el mercado en comparación con sistemas tradicionales."]
};


export default function SoftwareContablePage() {
  return (
    <div className="p-4 md:p-8 space-y-12">
       <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            <Puzzle className="h-10 w-10 text-primary"/>
            Guía para Elegir tu Sistema Administrativo en Venezuela
        </h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          En un entorno donde la inflación y los impuestos son retos constantes, contar con un sistema confiable no es un lujo: es un salvavidas que da control y tranquilidad al empresario.
        </p>
      </header>

      <Alert variant="destructive" className="max-w-4xl mx-auto">
          <FileWarning className="h-4 w-4"/>
          <AlertTitle>Advertencia Oficial del SENIAT</AlertTitle>
          <AlertDescription>
            Según la <strong>Providencia Administrativa N° SNAT/2024/000121</strong> (Gaceta Oficial N° 43.032), solo están autorizados los Software Homologados y sus versiones específicas. El uso de software no homologado puede acarrear severas sanciones.
          </AlertDescription>
      </Alert>
      
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Sistemas Contables Populares de Desarrollo Nacional</CardTitle>
                <CardDescription>Sistemas adaptados a la normativa venezolana, multimoneda y reportes SENIAT.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                {nationalSystems.map(system => (
                    <Card key={system.name}>
                        <CardHeader>
                            <CardTitle>{system.name}</CardTitle>
                            <CardDescription>{system.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <h4 className="font-semibold text-green-500 mb-2">Ventajas</h4>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    {system.advantages.map(adv => <li key={adv}>{adv}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-red-500 mb-2">Desventajas</h4>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    {system.disadvantages.map(dis => <li key={dis}>{dis}</li>)}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>

        <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2"><ShieldCheck/> Nuestra Solución Recomendada: {ourSystem.name}</CardTitle>
                <CardDescription>{ourSystem.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-green-500 mb-2">Ventajas Clave</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                        {ourSystem.advantages.map(adv => <li key={adv}>{adv}</li>)}
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-red-500 mb-2">Desventajas</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                        {ourSystem.disadvantages.map(dis => <li key={dis}>{dis}</li>)}
                    </ul>
                </div>
            </CardContent>
             <CardFooter>
                <Button>Solicitar un Demo <ArrowRight className="ml-2"/></Button>
            </CardFooter>
        </Card>

       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Soluciones Internacionales con Presencia en Venezuela</CardTitle>
            <CardDescription>Sistemas ERP que requieren configuración especial para cumplir con la normativa fiscal local.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internationalSystems.map(system => (
                <Card key={system.name}>
                    <CardHeader>
                        <CardTitle>{system.name}</CardTitle>
                        <CardDescription>{system.description}</CardDescription>
                    </CardHeader>
                     <CardContent className="space-y-3">
                        <div>
                            <h4 className="font-semibold text-green-500 mb-2">Ventajas</h4>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                                {system.advantages.map(adv => <li key={adv}>{adv}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-red-500 mb-2">Desventajas</h4>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                                {system.disadvantages.map(dis => <li key={dis}>{dis}</li>)}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </CardContent>
       </Card>

      {/* FAQ */}
      <section>
         <h2 className="text-2xl font-semibold mb-8 text-center">Preguntas Frecuentes</h2>
         <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
                 <AccordionItem key={index} value={`item-${index}`} className="bg-card/50 backdrop-blur-sm border rounded-lg px-4">
                    <AccordionTrigger>
                        <div className="flex items-center gap-3">
                            <HelpCircle className="h-5 w-5 text-primary" />
                            <span>{item.question}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-10 text-muted-foreground">
                        {item.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </section>

    </div>
  );
}
