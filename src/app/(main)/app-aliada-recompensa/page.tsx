
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Gift, ScanLine, ShoppingBag, Zap, Award, Coffee, Ticket, Recycling, Users, TrendingUp, Handshake, CheckCircle, Smartphone } from "lucide-react";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const howItWorks = [
    { step: 1, title: "Descarga y Regístrate", description: "Baja la App Aliada desde tu tienda de aplicaciones y crea tu cuenta en segundos." },
    { step: 2, title: "Encuentra y Escanea", description: "Ubica una de nuestras Papeleras Inteligentes y escanea el código QR para identificarte." },
    { step: 3, title: "Recicla y Gana Puntos", description: "Deposita tus residuos. Nuestra IA los clasifica y pesa (plástico, vidrio, aluminio), asignando puntos según el tipo y peso del material, reflejando su valor de reciclaje." },
    { step: 4, title: "Canjea tus Recompensas", description: "Usa tus puntos acumulados para obtener descuentos, productos y experiencias en nuestra red de comercios afiliados." },
];

const rewards = [
    { icon: Coffee, title: "Café Gratis", partner: "Cafetería El Buen Sabor" },
    { icon: Ticket, title: "2x1 en Entradas de Cine", partner: "Cines Unidos" },
    { icon: ShoppingBag, title: "15% de Descuento en tu Compra", partner: "Tiendas Traki" },
];


export default function AppAliadaRecompensaPage() {

    return (
        <div className="space-y-12">
            <header className="text-center">
                <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
                    <Award className="h-12 w-12" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">App Aliada: Puntos que Valen</h1>
                <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
                    Recicla, gana y disfruta. Convierte tus acciones sostenibles en recompensas reales gracias a nuestra alianza con Kyron.
                </p>
            </header>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Zap className="h-6 w-6 text-primary"/>¿Cómo Funciona?</CardTitle>
                </CardHeader>
                <CardContent>
                     <ol className="relative border-l border-border ml-6 space-y-10">
                        {howItWorks.map((item) => (
                            <li key={item.step} className="ml-8">
                                <span className="absolute flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full -left-4 ring-8 ring-background font-bold">
                                    {item.step}
                                </span>
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </li>
                        ))}
                    </ol>
                </CardContent>
            </Card>
            
            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users/>Beneficios para el Usuario</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="flex items-start gap-2 text-sm"><CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5"/> <strong>Recompensas Tangibles:</strong> Obtén productos y descuentos reales por tus buenas acciones.</p>
                        <p className="flex items-start gap-2 text-sm"><CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5"/> <strong>Impacto Medible:</strong> Visualiza cuánto has reciclado y tu contribución al medio ambiente.</p>
                        <p className="flex items-start gap-2 text-sm"><CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5"/> <strong>Participación Comunitaria:</strong> Sé parte de un movimiento que mejora tu ciudad.</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><TrendingUp/>Beneficios para Comercios</CardTitle>
                    </CardHeader>
                     <CardContent className="space-y-3">
                        <p className="flex items-start gap-2 text-sm"><CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5"/> <strong>Aumento de Tráfico:</strong> Atrae a clientes comprometidos con la sostenibilidad.</p>
                        <p className="flex items-start gap-2 text-sm"><CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5"/> <strong>Fidelización:</strong> Crea un vínculo más fuerte con tus clientes a través de un propósito compartido.</p>
                        <p className="flex items-start gap-2 text-sm"><CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5"/> <strong>Imagen de Marca:</strong> Posiciona tu negocio como una empresa socialmente responsable.</p>
                    </CardContent>
                </Card>
                 <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Recycling/>Beneficios para el Ambiente</CardTitle>
                    </CardHeader>
                     <CardContent className="space-y-3">
                        <p className="flex items-start gap-2 text-sm"><CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5"/> <strong>Aumento del Reciclaje:</strong> Incentiva la correcta separación de residuos desde el origen.</p>
                        <p className="flex items-start gap-2 text-sm"><CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5"/> <strong>Reducción de Contaminación:</strong> Menos residuos en vertederos y océanos.</p>
                        <p className="flex items-start gap-2 text-sm"><CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5"/> <strong>Economía Circular:</strong> Fomenta un modelo donde los materiales se reutilizan y se les da una nueva vida.</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-3"><Gift className="h-8 w-8 text-primary"/>Catálogo de Recompensas</CardTitle>
                    <CardDescription>Estos son algunos de los premios que puedes canjear con tus puntos.</CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rewards.map(reward => (
                        <div key={reward.title} className="p-6 text-center rounded-lg bg-secondary/50 border flex flex-col items-center">
                            <reward.icon className="h-12 w-12 text-primary mb-4"/>
                            <h4 className="font-semibold text-lg">{reward.title}</h4>
                            <p className="text-sm text-muted-foreground">en {reward.partner}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Únete como Comercio Aliado y Crece con Nosotros</CardTitle>
                    <CardDescription>
                        Ofrece tus productos o servicios en nuestro catálogo de recompensas y conecta con miles de usuarios comprometidos con un futuro sostenible.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Al unirte a nuestra red, ganas visibilidad, atraes nuevos clientes y posicionas tu marca como líder en responsabilidad social. Nosotros nos encargamos de la tecnología, tú te encargas de ofrecer las mejores recompensas.</p>
                </CardContent>
                <CardFooter>
                    <Button><Handshake className="mr-2"/> Quiero ser Aliado</Button>
                </CardFooter>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Modelos de Inspiración: Casos de Éxito Global</CardTitle>
                    <CardDescription>Nuestro sistema se inspira en modelos probados de economía circular y programas de lealtad.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <div className="flex items-center gap-3 font-semibold">
                                    <Recycling className="h-5 w-5 text-green-500"/>
                                    <span>Canje de Envases (Sistema Pfand en Alemania)</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pl-8">
                                <p className="text-sm text-muted-foreground">
                                    Es un sistema de depósito para envases de bebidas. Al comprar una botella o lata, pagas un pequeño depósito (entre €0.08 y €0.25) que te devuelven al regresar el envase a las máquinas de reciclaje en los supermercados, incentivando altas tasas de retorno.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                <div className="flex items-center gap-3 font-semibold">
                                    <Award className="h-5 w-5 text-yellow-500"/>
                                    <span>Millas de Programas de Fidelización</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pl-8">
                               <p className="text-sm text-muted-foreground">
                                   Al igual que programas como Miles & More, donde acumulas millas por volar, nuestro sistema te permite acumular puntos por reciclar. Estos puntos pueden ser canjeados por productos, descuentos o servicios en una red de comercios asociados.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                <div className="flex items-center gap-3 font-semibold">
                                    <Smartphone className="h-5 w-5 text-blue-500"/>
                                    <span>Intercambio de Dispositivos (Trade-in)</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pl-8">
                               <p className="text-sm text-muted-foreground">
                                   Similar a cómo Microsoft o Apple ofrecen crédito por entregar un dispositivo usado, nuestro sistema asigna un valor a tus residuos. Al "entregarlos" en nuestras papeleras, recibes puntos que funcionan como un crédito para canjear por recompensas.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

             <div className="grid sm:grid-cols-2 gap-8">
                 <Card className="bg-primary/10 border-primary/20 text-center">
                    <CardHeader>
                        <CardTitle>¿Eres un Usuario?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Descarga la aplicación y empieza a ganar hoy mismo.</p>
                        <Button size="lg"><Download className="mr-2"/>Descargar App</Button>
                    </CardContent>
                </Card>
                 <Card className="bg-secondary/50 text-center">
                    <CardHeader>
                        <CardTitle>¿Eres un Comercio?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Únete a nuestra red de aliados y atrae a más clientes.</p>
                        <Button size="lg" variant="outline"><Handshake className="mr-2"/>Unirse al Programa</Button>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
