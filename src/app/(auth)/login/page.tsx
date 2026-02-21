
"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { loginOptions } from "@/lib/login-options";
import { User, Building2, ArrowRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginSelectionPage() {
    const personalOption = loginOptions.find(o => o.href === '/login-personal');
    const enterpriseOptions = loginOptions.filter(o => o.href !== '/login-personal');

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen flex flex-col items-center">
            <motion.div 
                className="w-full max-w-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col items-center text-center mb-12">
                    <Button variant="ghost" asChild className="mb-8 self-start">
                        <Link href="/"><ChevronLeft className="mr-2 h-4 w-4"/> Volver al inicio</Link>
                    </Button>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Bienvenido al Ecosistema Kyron</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Selecciona el portal al que deseas acceder para comenzar a gestionar tus operaciones.
                    </p>
                </div>

                <div className="grid gap-12">
                    {/* Sección Personal */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <User className="text-primary h-6 w-6" /> Portal de Ciudadano
                        </h2>
                        {personalOption && (
                            <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-2 hover:border-primary transition-all">
                                <Link href={personalOption.href} className="flex flex-col md:flex-row items-center p-8 gap-8">
                                    <div className="p-6 bg-primary/10 rounded-2xl">
                                        <personalOption.icon className="h-12 w-12 text-primary" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-2xl font-bold mb-2">{personalOption.label}</h3>
                                        <p className="text-muted-foreground text-lg">{personalOption.description}</p>
                                    </div>
                                    <Button size="lg" className="group-hover:translate-x-2 transition-transform">
                                        Entrar al Portal <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </Card>
                        )}
                    </section>

                    {/* Sección Empresarial */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Building2 className="text-primary h-6 w-6" /> Portales Empresariales y Corporativos
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enterpriseOptions.map((option, index) => (
                                <motion.div
                                    key={option.href}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <Card className="h-full group hover:border-primary transition-all bg-card/50 backdrop-blur-sm flex flex-col">
                                        <Link href={option.href} className="flex flex-col h-full">
                                            <CardHeader className="flex-row items-center gap-4">
                                                <div className="p-3 bg-primary/10 rounded-xl">
                                                    <option.icon className="h-6 w-6 text-primary" />
                                                </div>
                                                <CardTitle className="text-lg group-hover:text-primary transition-colors">{option.label}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex-grow">
                                                <CardDescription className="text-sm">{option.description}</CardDescription>
                                            </CardContent>
                                            <div className="p-6 pt-0 mt-auto">
                                                <span className="text-xs font-bold uppercase tracking-wider text-primary inline-flex items-center group-hover:gap-2 transition-all">
                                                    Acceder <ArrowRight className="h-3 w-3" />
                                                </span>
                                            </div>
                                        </Link>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>
            </motion.div>
        </div>
    );
}
