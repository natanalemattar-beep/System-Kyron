
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { countries } from "@/lib/countries";

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
                                <Link href={`/facturacion-internacional?pais=${country.code}`}>
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
