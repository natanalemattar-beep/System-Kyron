
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Gift, ScanLine, ShoppingBag, Zap, Award, Coffee, Ticket, Recycling, Users, TrendingUp, Handshake, CheckCircle, Smartphone, Cpu, Package, Coins } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const howItWorks = [
    { step: 1, title: "Ubica una Papelera Inteligente", description: "Encuentra uno de nuestros puntos de recolección afiliados en centros comerciales, plazas o condominios." },
    { step: 2, title: "Identifícate con tu Tarjeta", description: "Acerca tu Tarjeta de Reciclaje o escanea el código QR desde tu app para que el sistema te reconozca." },
    { step: 3, title: "Deposita tus Envases Plásticos", description: "Nuestra IA utiliza sensores y visión por computadora para verificar que el material es plástico, lo pesa y lo clasifica, previniendo la contaminación cruzada." },
    { step: 4, title: "Acumula Puntos al Instante", description: "Por cada envase válido, recibirás 5 puntos directamente en tu cuenta. ¡Mientras más reciclas, más ganas!" },
    { step: 5, title: "Canjea tus Recompensas", description: "Usa tus puntos para obtener descuentos, productos y experiencias en nuestra creciente red de comercios aliados." },
];

const rewards = [
    { icon: Coffee, title: "Bebida Gratis", partner: "Cafetería La Esquina" },
    { icon: Ticket, title: "50% Dto. en Cines", partner: "Cines de la Ciudad" },
    { icon: ShoppingBag, title: "10% de Descuento", partner: "Supermercado El Ahorro" },
];


export default function TarjetaReciclajePage() {

    return (
        <div className="space-y-12">
            <header className="text-center">
                <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
                    <Recycling className="h-12 w-12" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Tarjeta de Reciclaje: Transforma Plástico en Recompensas</h1>
                <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
                    Nuestra iniciativa para incentivar el reciclaje de envases plásticos, reducir la contaminación y promover una economía circular. Por cada envase, acumulas puntos para canjear por beneficios.
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
            
            <div className="grid lg:grid-cols-2 gap-8">
                 <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Cpu/>La Tecnología Detrás del Reciclaje</CardTitle>
                    </CardHeader>
                     <CardContent className="space-y-3">
                        <p className="flex items-start gap-2 text-sm"><CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5"/> <strong>Sensores Inteligentes:</strong> Las papeleras usan visión por computadora y sensores de peso para identificar y validar cada envase.</p>
                        <p className="flex items-start gap-2 text-sm"><CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5"/> <strong>Clasificación Automática:</strong> Al validar el plástico, el sistema lo compacta y almacena en un compartimento separado para evitar que se contamine con otros residuos.</p>
                        <p className="flex items-start gap-2 text-sm"><CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5"/> <strong>Conectividad en Tiempo Real:</strong> Cada transacción se registra en la nube, acreditando los puntos a tu cuenta de forma instantánea y segura.</p>
                    </CardContent>
                </Card>
                 <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><TrendingUp/>Beneficios del Programa</CardTitle>
                    </CardHeader>
                     <CardContent className="space-y-3">
                        <p className="flex items-start gap-2 text-sm"><CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5"/> <strong>Para el Usuario:</strong> Ganas recompensas tangibles por una acción positiva y mides tu impacto ambiental.</p>
                        <p className="flex items-start gap-2 text-sm"><CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5"/> <strong>Para el Ambiente:</strong> Se reduce drásticamente la contaminación por plástico y se fomenta una economía circular donde los desechos se convierten en recursos.</p>
                        <p className="flex items-start gap-2 text-sm"><CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5"/> <strong>Para Comercios Aliados:</strong> Atraes a un público consciente y socialmente responsable, aumentando el tráfico y la lealtad de tus clientes.</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-3"><Gift className="h-8 w-8 text-primary"/>Catálogo de Recompensas</CardTitle>
                    <CardDescription>Estos son algunos de los premios que puedes canjear con tus puntos de reciclaje.</CardDescription>
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
                 <CardFooter className="justify-center">
                     <Button variant="outline">Ver todas las recompensas</Button>
                </CardFooter>
            </Card>
            
             <div className="grid sm:grid-cols-2 gap-8">
                 <Card className="bg-primary/10 border-primary/20 text-center">
                    <CardHeader>
                        <CardTitle>Obtén tu Tarjeta</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Descarga la app y regístrate para obtener tu tarjeta de reciclaje digital y empezar a ganar.</p>
                        <Button size="lg"><Download className="mr-2"/>Descargar App</Button>
                    </CardContent>
                </Card>
                 <Card className="bg-secondary/50 text-center">
                    <CardHeader>
                        <CardTitle>¿Eres un Comercio?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Únete a nuestra red de aliados y conecta con clientes comprometidos con el planeta.</p>
                        <Button size="lg" variant="outline"><Handshake className="mr-2"/>Quiero ser Aliado</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
