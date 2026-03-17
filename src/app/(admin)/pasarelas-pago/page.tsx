
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleCheck as CheckCircle, CreditCard, Banknote, Smartphone, Globe, Shield } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

const paymentGateways = [
    {
        name: "Stripe",
        description: "Plataforma líder para pagos con tarjeta de crédito y débito a nivel mundial. Ideal para ventas internacionales.",
        logoId: "stripe-logo",
        fees: "2.9% + 30¢ por transacción",
        currencies: ["USD", "EUR", "GBP", "y 130+ más"],
        advantages: ["Fácil integración", "Alta seguridad (PCI DSS Nivel 1)", "Soporte para suscripciones"],
        bestFor: "E-commerce, SaaS, Mercados Internacionales"
    },
    {
        name: "PayPal",
        description: "Una de las billeteras digitales más reconocidas del mundo, permitiendo pagos rápidos y seguros.",
        logoId: "paypal-logo",
        fees: "Variable (aprox. 3.49% + 49¢ para USA)",
        currencies: ["USD", "EUR", "y 20+ más"],
        advantages: ["Confianza del consumidor", "Protección al comprador y vendedor", "Pagos con un solo clic"],
        bestFor: "Ventas minoristas, Freelancers, Pagos rápidos"
    },
    {
        name: "Criptomonedas",
        description: "Acepta pagos en criptoactivos como Bitcoin (BTC) o Ethereum (ETH) a través de tu propia billetera o un procesador.",
        logoId: "crypto-logo",
        fees: "Bajas (costo de la red o 'gas')",
        currencies: ["BTC", "ETH", "USDT", "etc."],
        advantages: ["Transacciones sin fronteras", "Bajas comisiones", "No hay contracargos (chargebacks)"],
        bestFor: "Negocios innovadores, Mercados globales, Privacidad"
    },
    {
        name: "Pago Móvil y Transferencias (Bs.)",
        description: "Métodos de pago directo para el mercado venezolano, ideales para transacciones locales rápidas.",
        logoId: "pago-movil-logo",
        fees: "Bajas o nulas (según el banco)",
        currencies: ["VES (Bolívares)"],
        advantages: ["Inmediato (Pago Móvil)", "Ampliamente adoptado en Venezuela", "Sin comisiones de intermediarios"],
        bestFor: "Ventas locales, Pagos de servicios, Transacciones diarias"
    }
];

export default function PasarelasDePagoPage() {
    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <CreditCard className="h-8 w-8" />
                    Gestión de Pasarelas de Pago
                </h1>
                <p className="text-muted-foreground mt-2">
                    Visualiza, compara y gestiona las opciones de pago para tu negocio.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {paymentGateways.map((gateway) => {
                    const logo = PlaceHolderImages.find(img => img.id === gateway.logoId);
                    return (
                        <Card key={gateway.name} className="flex flex-col bg-card/50 backdrop-blur-sm">
                            <CardHeader className="flex-row items-start gap-4">
                                {logo && (
                                    <Image src={logo.imageUrl} alt={`${gateway.name} logo`} width={64} height={64} className="rounded-md" data-ai-hint={logo.imageHint} />
                                )}
                                <div>
                                    <CardTitle className="text-2xl">{gateway.name}</CardTitle>
                                    <CardDescription>{gateway.description}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-4">
                                <div>
                                    <h4 className="font-semibold text-sm mb-2">Ideal para:</h4>
                                    <Badge variant="secondary">{gateway.bestFor}</Badge>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm mb-2">Comisiones (Aprox.):</h4>
                                    <p className="text-sm font-mono">{gateway.fees}</p>
                                </div>
                                 <div>
                                    <h4 className="font-semibold text-sm mb-2">Ventajas Clave:</h4>
                                    <ul className="space-y-1">
                                        {gateway.advantages.map(adv => (
                                            <li key={adv} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                {adv}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">
                                    {gateway.name === "Pago Móvil y Transferencias (Bs.)" ? "Ver Cuentas Bancarias" : "Configurar Integración"}
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
