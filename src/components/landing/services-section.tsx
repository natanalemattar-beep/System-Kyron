
'use client';

import { Layers, Briefcase, Gavel, Network } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { motion } from "framer-motion";

const services = [
    { title: "Holding y Finanzas", description: "Desde la facturación homologada por el SENIAT hasta la consolidación de estados financieros para holdings. Control total de tu flujo de caja, cuentas por cobrar y pagar.", icon: Layers },
    { title: "Operaciones y Ventas", description: "Un Punto de Venta (TPV) inteligente, gestión de inventario en tiempo real y análisis de ventas con IA para identificar oportunidades y optimizar tu rendimiento comercial.", icon: Network },
    { title: "Talento y Cultura", description: "Automatiza la nómina, el cálculo de prestaciones sociales, la gestión de contratos y el ciclo de vida completo del empleado, asegurando el cumplimiento con el IVSS y la LOPNNA.", icon: Briefcase },
    { title: "Legal y Cumplimiento", description: "Navega con seguridad el marco legal venezolano. Gestiona contratos, actas de asamblea, poderes y trámites corporativos con un módulo legal que te mantiene siempre un paso adelante.", icon: Gavel },
];

export function ServicesSection() {
    return (
        <section id="servicios" className="py-20 md:py-28 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Un Ecosistema para Gobernar tu Negocio</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Más que un software, somos el sistema operativo para tu grupo empresarial. Orquestamos cada área de tu compañía para una sinfonía de eficiencia.</p>
                </motion.div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((item, index) => (
                        <motion.div
                            key={item.title} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
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
