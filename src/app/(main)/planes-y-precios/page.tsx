
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, HelpCircle, BarChart, ArrowRight, DollarSign, Users, Briefcase } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

const planes = [
    {
        nombre: "Plan Básico",
        precio: "Bs. 1.500",
        periodo: "/mes",
        descripcion: "Ideal para emprendedores y pequeñas empresas que inician.",
        features: [
            "Módulo de Facturación",
            "Gestión de Cuentas por Cobrar/Pagar",
            "Libro de Compras y Ventas",
            "Soporte por correo electrónico",
        ],
        popular: false,
    },
    {
        nombre: "Plan Profesional",
        precio: "Bs. 4.000",
        periodo: "/mes",
        descripcion: "La solución completa para empresas en crecimiento.",
        features: [
            "Todo lo del Plan Básico",
            "Gestión de Nómina Completa",
            "Módulo de Inventario",
            "Declaración de IVA e ISLR",
            "Soporte Prioritario (WhatsApp)",
        ],
        popular: true,
    },
    {
        nombre: "Plan Corporativo",
        precio: "Contáctanos",
        periodo: "",
        descripcion: "Soluciones a medida para grandes empresas con necesidades específicas.",
        features: [
            "Todo lo del Plan Profesional",
            "Integraciones personalizadas (API)",
            "Análisis con IA y Reportes Avanzados",
            "Oficial de Cumplimiento dedicado",
            "Soporte 24/7 y SLA garantizado",
        ],
        popular: false,
    },
];

const costAnalysis = [
    { service: "Servicio de Contabilidad Externa", icon: Briefcase, small: 250, medium: 600, large: 2000 },
    { service: "Gestión de Nómina (Outsourcing)", icon: Users, small: 150, medium: 400, large: 1500 },
    { service: "Asistente Administrativo", icon: DollarSign, small: 500, medium: 800, large: 2500 },
];

const faqItems = [
    {
        question: "¿Puedo cambiar de plan en cualquier momento?",
        answer: "Sí, puedes mejorar o ajustar tu plan en cualquier momento desde el panel de tu cuenta. La facturación se ajustará de forma prorrateada."
    },
    {
        question: "¿El sistema está homologado por el SENIAT?",
        answer: "Absolutamente. Nuestro sistema de facturación cumple con todas las providencias administrativas vigentes del SENIAT, garantizando tu tranquilidad fiscal."
    },
    {
        question: "¿Qué tipo de soporte técnico ofrecen?",
        answer: "Ofrecemos soporte por correo electrónico para el Plan Básico y soporte prioritario vía WhatsApp y teléfono para los planes Profesional y Corporativo."
    },
];

export default function PlanesPreciosPage() {
  const totalCostosTradicionales = {
      small: costAnalysis.reduce((acc, item) => acc + item.small, 0),
      medium: costAnalysis.reduce((acc, item) => acc + item.medium, 0),
      large: costAnalysis.reduce((acc, item) => acc + item.large, 0),
  }
  
  return (
    <div className="p-4 md:p-8">
       <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            <BarChart className="h-10 w-10 text-primary"/>
            Planes y Precios
        </h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Elige el plan que se adapta al tamaño y las necesidades de tu negocio. Sin contratos a largo plazo, cancela cuando quieras.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {planes.map(plan => (
            <Card key={plan.nombre} className={`flex flex-col bg-card/50 backdrop-blur-sm ${plan.popular ? 'border-primary shadow-lg shadow-primary/10' : ''}`}>
                {plan.popular && <div className="bg-primary text-primary-foreground text-xs font-bold text-center py-1 rounded-t-xl">MÁS POPULAR</div>}
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.nombre}</CardTitle>
                    <CardDescription>{plan.descripcion}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <div className="text-center mb-6">
                        <span className="text-4xl font-bold">{plan.precio}</span>
                        <span className="text-muted-foreground">{plan.periodo}</span>
                    </div>
                    <ul className="space-y-3">
                        {plan.features.map(feature => (
                             <li key={feature} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button className={`w-full text-lg h-12 ${plan.popular ? '' : 'btn-secondary'}`}>
                        {plan.precio === "Contáctanos" ? "Contactar Ventas" : "Seleccionar Plan"}
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>

      <section className="mt-20 max-w-6xl mx-auto">
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
                <CardTitle>Análisis de Costos: Software vs. Servicios Tradicionales</CardTitle>
                <CardDescription>Compara el costo mensual de nuestro software con la contratación de servicios por separado.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/3">Servicio</TableHead>
                            <TableHead className="text-center">Pequeña Empresa</TableHead>
                            <TableHead className="text-center">Mediana Empresa</TableHead>
                            <TableHead className="text-center">Gran Empresa</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {costAnalysis.map(item => (
                            <TableRow key={item.service}>
                                <TableCell className="font-medium flex items-center gap-2"><item.icon className="h-4 w-4 text-muted-foreground"/> {item.service}</TableCell>
                                <TableCell className="text-center">{formatCurrency(item.small, 'USD')}</TableCell>
                                <TableCell className="text-center">{formatCurrency(item.medium, 'USD')}</TableCell>
                                <TableCell className="text-center">{formatCurrency(item.large, 'USD')}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow className="bg-secondary font-bold">
                            <TableCell>Costo Mensual Tradicional Estimado</TableCell>
                            <TableCell className="text-center text-red-500">{formatCurrency(totalCostosTradicionales.small, 'USD')}</TableCell>
                            <TableCell className="text-center text-red-500">{formatCurrency(totalCostosTradicionales.medium, 'USD')}</TableCell>
                            <TableCell className="text-center text-red-500">{formatCurrency(totalCostosTradicionales.large, 'USD')}</TableCell>
                        </TableRow>
                        <TableRow className="bg-primary/10 font-bold text-primary">
                            <TableCell>Costo Mensual con Kyron</TableCell>
                            <TableCell className="text-center">{formatCurrency(37.5, 'USD')}</TableCell>
                            <TableCell className="text-center">{formatCurrency(100, 'USD')}</TableCell>
                            <TableCell className="text-center">Personalizado</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                 <p className="text-xs text-muted-foreground mt-4 text-center">Nota: Los costos tradicionales son estimaciones basadas en el mercado y pueden variar. Los precios de los planes se basan en una tasa de cambio de 40 Bs/USD.</p>
            </CardContent>
        </Card>
      </section>

       <section className="mt-20 max-w-4xl mx-auto">
         <h2 className="text-2xl font-semibold mb-8 text-center">Preguntas Frecuentes</h2>
         <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
                 <AccordionItem key={index} value={`item-${index}`} className="bg-card/50 backdrop-blur-sm border rounded-lg mb-2 px-4">
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
