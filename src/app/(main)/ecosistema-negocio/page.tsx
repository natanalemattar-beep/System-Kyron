"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recycle, Briefcase, Printer, Cloud, Signal, Wallet, ArrowRight, GitBranch } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const businessPillars = [
    {
        title: "Hardware y Suministros",
        icon: Recycle,
        description: "Venta de productos físicos que forman la base de la eficiencia operativa de nuestros clientes.",
        items: [
            { name: "Papeleras Inteligentes", icon: Recycle, detail: "Clasificación automática de residuos con IA." },
            { name: "Artículos de Oficina", icon: Briefcase, detail: "Suministros esenciales para el día a día." },
            { name: "Equipos Fiscales y de Computación", icon: Printer, detail: "Hardware homologado y de última generación." },
        ]
    },
    {
        title: "Software como Servicio (SaaS)",
        icon: Cloud,
        description: "El cerebro de nuestro ecosistema. Una plataforma de gestión que centraliza y automatiza la operación de la empresa.",
        items: [
            { name: "Sistema Administrativo y Contable", icon: Cloud, detail: "Facturación, inventario, nómina y cumplimiento fiscal en un solo lugar." },
        ]
    },
    {
        title: "Telecomunicaciones del Futuro",
        icon: Signal,
        description: "Servicios de conectividad avanzados para mantener a las empresas comunicadas y operativas.",
        items: [
            { name: "Líneas Telefónicas y Conectividad", icon: Signal, detail: "Soluciones de comunicación de punta." },
        ]
    },
    {
        title: "Servicios Financieros (FinTech)",
        icon: Wallet,
        description: "Herramientas financieras seguras y transparentes para la nueva economía digital.",
        items: [
            { name: "Billetera Blockchain", icon: Wallet, detail: "Gestión de activos y transacciones con seguridad inmutable." },
            { name: "Sistema de Crédito", icon: Wallet, detail: "Financiamiento para emprendimientos y proyectos." },
        ]
    }
];

export default function EcosistemaNegocioPage() {
    return (
        <div className="space-y-12">
            <header className="text-center mb-12">
                 <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
                    <GitBranch className="h-12 w-12" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Ecosistema Kyron: Nuestro Modelo de Negocio</h1>
                <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
                   No solo vendemos productos; ofrecemos un ecosistema integrado donde el hardware, el software y los servicios financieros convergen para crear valor único.
                </p>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
                {businessPillars.map((pillar, index) => (
                    <motion.div
                        key={pillar.title}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 30 } }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                    >
                        <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-2xl">
                                    <div className="p-3 bg-primary/10 rounded-xl">
                                        <pillar.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    {pillar.title}
                                </CardTitle>
                                <CardDescription className="pt-2">{pillar.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="space-y-3">
                                {pillar.items.map(item => (
                                    <div key={item.name} className="p-3 bg-secondary/50 rounded-lg flex items-center gap-3">
                                        <item.icon className="h-5 w-5 text-muted-foreground"/>
                                        <div>
                                            <h4 className="font-semibold text-sm">{item.name}</h4>
                                            <p className="text-xs text-muted-foreground">{item.detail}</p>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
            
            <Card className="bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle>La Sinergia es Nuestra Fortaleza</CardTitle>
                    <CardDescription>
                        Nuestro poder no reside en cada pilar individual, sino en cómo se conectan. El software gestiona las ventas del hardware, los datos de las papeleras generan oportunidades y la billetera blockchain financia todo el ecosistema.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button asChild>
                        <Link href="/estudio-factibilidad-economica">
                            Ver Estudio de Factibilidad Completo <ArrowRight className="ml-2"/>
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

        </div>
    );
}
