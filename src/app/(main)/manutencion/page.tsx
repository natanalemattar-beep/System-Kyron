
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Recycle, HeartHandshake, ArrowRight, Bot, Wifi } from "lucide-react";
import Image from "next/image";

const maquinasFiscales = [
    {
        modelo: "Epson Fiscal FX-890II",
        descripcion: "Impresora fiscal de matriz de puntos de alta velocidad, ideal para grandes volúmenes de facturación y condiciones exigentes.",
        imagen: "https://picsum.photos/seed/fiscal1/400/300",
        dataAiHint: "fiscal printer"
    },
    {
        modelo: "Bixolon SRP-350plusIII",
        descripcion: "Impresora térmica rápida y fiable, perfecta para puntos de venta (POS) con alto tráfico de clientes.",
        imagen: "https://picsum.photos/seed/fiscal2/400/300",
        dataAiHint: "receipt printer"
    }
];

export default function GestionIntegralPage() {
  return (
    <div className="space-y-12">
        <header className="text-center">
            <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
                <Recycle className="h-10 w-10 text-green-500" />
                Sistema C.R.S - Gestión Integral
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                Una plataforma que fusiona la eficiencia contable y fiscal con la innovación sostenible y el compromiso social.
            </p>
        </header>

        {/* Sección de Soluciones Fiscales */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                    <Calculator className="h-7 w-7 text-primary"/>
                    Soluciones Fiscales y Contables
                </CardTitle>
                <CardDescription>Equipa tu negocio con tecnología de punta homologada por el SENIAT y optimiza tu contabilidad.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {maquinasFiscales.map(maquina => (
                    <Card key={maquina.modelo} className="flex flex-col">
                        <CardHeader>
                           <Image src={maquina.imagen} alt={maquina.modelo} data-ai-hint={maquina.dataAiHint} width={400} height={300} className="rounded-lg aspect-[4/3] object-cover" />
                        </CardHeader>
                        <CardContent className="flex-grow">
                             <h3 className="font-semibold text-lg">{maquina.modelo}</h3>
                             <p className="text-sm text-muted-foreground mt-1">{maquina.descripcion}</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Cotizar Máquina Fiscal <ArrowRight className="ml-2"/></Button>
                        </CardFooter>
                    </Card>
                ))}
                 <Card className="lg:col-span-1 md:col-span-2 bg-primary/10 border-primary/20 flex flex-col justify-center items-center text-center p-6">
                    <Bot className="h-12 w-12 text-primary mb-4"/>
                    <h3 className="font-semibold text-lg">Software Contable Automatizado</h3>
                    <p className="text-sm text-muted-foreground mt-2">Nuestro sistema se integra con tus máquinas fiscales para una contabilidad sin errores y en tiempo real.</p>
                     <Button variant="outline" className="mt-4 w-full">Solicitar Demo</Button>
                </Card>
            </CardContent>
        </Card>
        
        {/* Sección de Sostenibilidad y Reciclaje */}
        <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-2">
                 <Image src="https://picsum.photos/seed/recycling/600/500" alt="Papelera Inteligente" data-ai-hint="smart bin" width={600} height={500} className="rounded-xl shadow-lg object-cover"/>
            </div>
            <div className="lg:col-span-3">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Recycle className="h-7 w-7 text-green-500"/>
                            Innovación y Sostenibilidad: Papeleras Inteligentes
                        </CardTitle>
                         <CardDescription>Revolucionamos la recolección de papel y vidrio con tecnología.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-4 p-3 bg-secondary rounded-lg">
                           <Wifi className="h-6 w-6 text-green-400 mt-1"/>
                           <div>
                                <h4 className="font-semibold">Sensores de Llenado</h4>
                                <p className="text-sm text-muted-foreground">Cada papelera notifica automáticamente cuando está llena, optimizando las rutas de recolección y ahorrando combustible.</p>
                           </div>
                        </div>
                        <div className="flex items-start gap-4 p-3 bg-secondary rounded-lg">
                           <Bot className="h-6 w-6 text-green-400 mt-1"/>
                           <div>
                                <h4 className="font-semibold">Plataforma de Gestión</h4>
                                <p className="text-sm text-muted-foreground">Un dashboard centralizado muestra el estado de todas las papeleras, generando rutas eficientes para el equipo de recolección.</p>
                           </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button variant="secondary" className="w-full">Únete a la Red de Reciclaje Inteligente</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>

        {/* Sección de Impacto Social */}
         <Card className="text-center">
            <CardHeader>
                <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                    <HeartHandshake className="h-7 w-7 text-red-400"/>
                    Nuestro Impacto Social
                </CardTitle>
                <CardDescription>Convertimos el reciclaje en ayuda directa para los más necesitados.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="max-w-3xl mx-auto">
                    Los ingresos generados por la venta de papel y vidrio recolectados se destinan íntegramente a programas de ayuda social. Colaboramos con fundaciones locales para proporcionar alimentos, medicinas y recursos a comunidades vulnerables. Al usar nuestras papeleras, tu empresa no solo es más sostenible, sino que también se convierte en un agente de cambio social.
                </p>
            </CardContent>
            <CardFooter className="justify-center">
                 <Button variant="outline" className="text-red-600 border-red-500 hover:bg-red-500/10 hover:text-red-600">
                    Ver Reporte de Impacto Social
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
}
