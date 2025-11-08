
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const countries = [
    // North America
    { name: "United States", flag: "https://flagcdn.com/w320/us.png", taxInfo: "Sales Tax (Variable)", href: "/facturacion-internacional" },
    { name: "Canada", flag: "https://flagcdn.com/w320/ca.png", taxInfo: "GST/HST/PST", href: "/facturacion-internacional" },
    // Latin America
    { name: "Mexico", flag: "https://flagcdn.com/w320/mx.png", taxInfo: "IVA, ISR", href: "/facturacion-internacional" },
    { name: "Brazil", flag: "https://flagcdn.com/w320/br.png", taxInfo: "ICMS, IPI, PIS/COFINS", href: "/facturacion-internacional" },
    { name: "Argentina", flag: "https://flagcdn.com/w320/ar.png", taxInfo: "IVA, IIBB, Ganancias", href: "/facturacion-internacional" },
    { name: "Colombia", flag: "https://flagcdn.com/w320/co.png", taxInfo: "IVA, Retefuente", href: "/facturacion-internacional" },
    { name: "Chile", flag: "https://flagcdn.com/w320/cl.png", taxInfo: "IVA (DTE)", href: "/facturacion-internacional" },
    // Europe
    { name: "Spain", flag: "https://flagcdn.com/w320/es.png", taxInfo: "IVA, IRPF", href: "/facturacion-internacional" },
    { name: "Germany", flag: "https://flagcdn.com/w320/de.png", taxInfo: "Umsatzsteuer (VAT)", href: "/facturacion-internacional" },
    { name: "France", flag: "https://flagcdn.com/w320/fr.png", taxInfo: "TVA", href: "/facturacion-internacional" },
    { name: "Italy", flag: "https://flagcdn.com/w320/it.png", taxInfo: "IVA (Fattura Elettronica)", href: "/facturacion-internacional" },
    { name: "Netherlands", flag: "https://flagcdn.com/w320/nl.png", taxInfo: "BTW", href: "/facturacion-internacional" },
    // Asia & Middle East
    { name: "China", flag: "https://flagcdn.com/w320/cn.png", taxInfo: "VAT (Fapiao System)", href: "/facturacion-internacional" },
    { name: "UAE", flag: "https://flagcdn.com/w320/ae.png", taxInfo: "VAT (e-Invoicing)", href: "/facturacion-internacional" },
];

export default function GestionGlobalPage() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Globe className="h-8 w-8" />
                    Centro de Gestión Global
                </h1>
                <p className="text-muted-foreground mt-2">
                    Selecciona un país para acceder a su módulo de gestión contable y fiscal.
                </p>
            </header>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {countries.map((country) => (
                    <Card key={country.name} className="flex flex-col bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                        <CardHeader className="flex-row items-center gap-4">
                            <Image src={country.flag} alt={`Flag of ${country.name}`} width={60} height={40} className="rounded-md shadow-md" />
                            <div>
                                <CardTitle>{country.name}</CardTitle>
                                <CardDescription>{country.taxInfo}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardFooter className="mt-auto">
                            <Button asChild className="w-full">
                                <Link href={country.href}>
                                    Acceder al Módulo <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
