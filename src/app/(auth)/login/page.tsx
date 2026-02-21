"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { loginOptions } from "@/lib/login-options";
import { User, Building2, ArrowRight, ChevronLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginSelectionPage() {
    const personalOption = loginOptions.find(o => o.href === '/login-personal');
    const enterpriseOptions = loginOptions.filter(o => o.href !== '/login-personal');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-16 min-h-screen flex flex-col items-center">
            <motion.div 
                className="w-full max-w-5xl"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="flex flex-col items-center text-center mb-12">
                    <motion.div variants={itemVariants} className="self-start mb-8">
                        <Button variant="ghost" asChild>
                            <Link href="/"><ChevronLeft className="mr-2 h-4 w-4"/> Volver al inicio</Link>
                        </Button>
                    </motion.div>
                    
                    <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-balance">
                        Acceso al Ecosistema <span className="text-primary">Kyron</span>
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl text-balance">
                        Selecciona el portal correspondiente a tu perfil para gestionar tus operaciones con total seguridad y eficiencia.
                    </motion.p>
                </div>

                <div className="grid gap-12">
                    {/* Sección Personal */}
                    <motion.section variants={itemVariants}>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 opacity-80 uppercase tracking-wider">
                            <User className="text-primary h-5 w-5" /> Portal Ciudadano
                        </h2>
                        {personalOption && (
                            <Card className="group relative overflow-hidden bg-card/40 backdrop-blur-md border-2 hover:border-primary/50 transition-all duration-300">
                                <Link href={personalOption.href} className="flex flex-col md:flex-row items-center p-8 gap-8">
                                    <div className="p-6 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform">
                                        <personalOption.icon className="h-12 w-12 text-primary" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-2xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
                                            {personalOption.label}
                                            <Sparkles className="h-4 w-4 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </h3>
                                        <p className="text-muted-foreground text-lg">{personalOption.description}</p>
                                    </div>
                                    <Button size="lg" className="group-hover:translate-x-2 transition-transform whitespace-nowrap">
                                        Entrar ahora <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </Card>
                        )}
                    </motion.section>

                    {/* Sección Empresarial */}
                    <motion.section variants={itemVariants}>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 opacity-80 uppercase tracking-wider">
                            <Building2 className="text-primary h-5 w-5" /> Portales Corporativos
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enterpriseOptions.map((option) => (
                                <motion.div
                                    key={option.href}
                                    variants={itemVariants}
                                    whileHover={{ y: -5 }}
                                >
                                    <Card className="h-full group hover:border-primary/50 transition-all bg-card/40 backdrop-blur-md flex flex-col border-border/50">
                                        <Link href={option.href} className="flex flex-col h-full">
                                            <CardHeader className="flex-row items-center gap-4">
                                                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                                                    <option.icon className="h-6 w-6 text-primary" />
                                                </div>
                                                <CardTitle className="text-lg group-hover:text-primary transition-colors">{option.label}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex-grow">
                                                <CardDescription className="text-sm leading-relaxed">{option.description}</CardDescription>
                                            </CardContent>
                                            <div className="p-6 pt-0 mt-auto">
                                                <span className="text-xs font-bold uppercase tracking-widest text-primary inline-flex items-center group-hover:gap-2 transition-all">
                                                    Acceder <ArrowRight className="h-3 w-3 ml-1" />
                                                </span>
                                            </div>
                                        </Link>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                </div>
            </motion.div>
        </div>
    );
}