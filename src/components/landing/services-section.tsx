
'use client';

import { Layers, Users, ShieldCheck, Gavel } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";

const services = [
    { title: "Gestión Fiscal y Contable", description: "Automatiza tu contabilidad, desde libros oficiales hasta la declaración de impuestos, todo homologado por el SENIAT.", icon: Layers },
    { title: "Administración de Nómina", description: "Calcula y gestiona la nómina, beneficios y obligaciones parafiscales de tus empleados sin complicaciones.", icon: Users },
    { title: "Permisología y Cumplimiento", description: "Centraliza y mantén al día todas las licencias y permisos necesarios para operar en Venezuela.", icon: ShieldCheck },
    { title: "Asesoría Legal y Estratégica", description: "Accede a herramientas de análisis, modelos de contratos y guías para una toma de decisiones informada.", icon: Gavel },
];

export function ServicesSection() {
    return (
        <section id="servicios" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold">Un Ecosistema para tu Tranquilidad</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Más que un software, somos tu aliado estratégico para navegar el entorno empresarial venezolano.</p>
                </motion.div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((item, index) => (
                        <motion.div
                            key={item.title} 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full bg-card/50 backdrop-blur-sm transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
                               <CardHeader>
                                  <div className="inline-block p-4 bg-primary/10 text-primary rounded-xl mb-4 w-fit">
                                      <item.icon className="h-8 w-8" />
                                  </div>
                                  <CardTitle className="text-xl">{item.title}</CardTitle>
                               </CardHeader>
                               <CardContent>
                                   <p className="text-muted-foreground">{item.description}</p>
                               </CardContent>
                           </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
