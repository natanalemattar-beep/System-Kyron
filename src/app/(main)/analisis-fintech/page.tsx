
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Banknote, Handshake, Users, ArrowRight, Lightbulb, TrendingUp, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const fintechModels = [
    {
        title: "Pasarelas de Pago y Billeteras Digitales",
        description: "Facilitan los pagos en línea y móviles. Ejemplos en Venezuela incluyen PagoMóvil y billeteras de criptomonedas."
    },
    {
        title: "Préstamos Digitales y Crowdfunding",
        description: "Plataformas que ofrecen créditos a personas o empresas (P2P Lending) o financiamiento colectivo para proyectos."
    },
    {
        title: "InsurTech (Tecnología de Seguros)",
        description: "Startups que innovan en la venta, gestión y reclamación de seguros, haciéndolos más accesibles y personalizados."
    },
    {
        title: "Gestión de Finanzas Personales (PFM)",
        description: "Aplicaciones que ayudan a los usuarios a presupuestar, ahorrar y analizar sus gastos personales."
    },
    {
        title: "RegTech (Tecnología Regulatoria)",
        description: "Soluciones que ayudan a las empresas a cumplir con las complejas regulaciones financieras de forma automatizada."
    }
];

const venezuelanPlayers = [
    { name: "Cashea", focus: "Compra Ahora, Paga Después (BNPL), financiamiento al consumo." },
    { name: "Ubii", focus: "Billetera digital y plataforma de pagos multimoneda." },
    { name: "Reserve", focus: "Plataforma para ahorrar y gastar en dólares, protegiéndose de la devaluación." },
    { name: "El Dorado", focus: "Plataforma P2P para el intercambio de criptomonedas y stablecoins." },
];

export default function AnalisisFintechPage() {

  return (
    <div className="space-y-12">
      <header className="mb-8 text-center">
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
            <Banknote className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Análisis Estratégico del Sector FinTech</h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          Un diagnóstico del ecosistema de tecnología financiera, las oportunidades en Venezuela y el posicionamiento competitivo de Kyron.
        </p>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>¿Qué es una Empresa FinTech?</CardTitle>
            <CardDescription>
                Una FinTech (Tecnología Financiera) es una empresa que utiliza la tecnología y la innovación para diseñar, ofrecer y mejorar servicios financieros de manera más eficiente, accesible y económica que la banca tradicional.
            </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fintechModels.map(model => (
                <div key={model.title} className="p-4 bg-secondary/50 rounded-lg">
                    <h3 className="font-semibold mb-2">{model.title}</h3>
                    <p className="text-sm text-muted-foreground">{model.description}</p>
                </div>
            ))}
        </CardContent>
         <CardFooter>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Kyron como Institución de Tecnología Financiera (ITFB)</AlertTitle>
              <AlertDescription>
                Kyron se posiciona como una ITFB, lo que le permite ofrecer sus servicios tecnológicos directamente a la banca tradicional, ayudándola a modernizarse, y también directamente a los usuarios finales.
              </AlertDescription>
            </Alert>
        </CardFooter>
      </Card>
      
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>El Ecosistema FinTech en Venezuela</CardTitle>
            <CardDescription>
                A pesar de los desafíos económicos, el sector FinTech en Venezuela ha crecido, impulsado por la necesidad de soluciones a la hiperinflación y la dolarización de facto.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <h4 className="font-semibold mb-4">Principales Jugadores y su Enfoque:</h4>
            <div className="grid md:grid-cols-2 gap-4">
                {venezuelanPlayers.map(player => (
                    <div key={player.name} className="p-4 bg-secondary/50 rounded-lg">
                        <h5 className="font-bold text-lg text-primary">{player.name}</h5>
                        <p className="text-sm text-muted-foreground">{player.focus}</p>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/10 border-primary/20">
        <CardHeader>
            <CardTitle className="text-primary flex items-center gap-3">
                <TrendingUp />
                Posicionamiento Estratégico y Ventaja Competitiva de Kyron
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p>
                A diferencia de los competidores que se enfocan en un único nicho (pagos, BNPL), la fortaleza de Kyron reside en su <strong>ecosistema integrado (Hardware + Software + FinTech)</strong>.
            </p>
            <div className="p-6 bg-background rounded-lg space-y-4">
                <div className="flex items-start gap-3">
                    <ShieldCheck className="h-6 w-6 text-green-500 mt-1 shrink-0" />
                    <div>
                        <h4 className="font-semibold">RegTech como Diferenciador Clave</h4>
                        <p className="text-sm text-muted-foreground">Kyron no solo ofrece servicios financieros, sino que los integra con un robusto sistema de cumplimiento fiscal (SENIAT) y administrativo. Esto crea una propuesta de valor única: "Usa nuestras herramientas financieras con la tranquilidad de que tu contabilidad y tus impuestos están en orden automáticamente".</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <Handshake className="h-6 w-6 text-blue-500 mt-1 shrink-0" />
                    <div>
                        <h4 className="font-semibold">Sinergia con el Ecosistema Físico</h4>
                        <p className="text-sm text-muted-foreground">La billetera digital y los servicios de crédito de Kyron pueden usarse para financiar la compra de las propias papeleras inteligentes y otros equipos que la empresa comercializa, creando un ciclo de negocio cerrado y autosostenible.</p>
                    </div>
                </div>
            </div>
        </CardContent>
        <CardFooter>
             <Button asChild>
                <Link href="/planes-crecimiento">
                    Ver Plan de Crecimiento Completo <ArrowRight className="ml-2"/>
                </Link>
            </Button>
        </CardFooter>
      </Card>

    </div>
  );
}

    