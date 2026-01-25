
'use client';

import { 
    Layers, Briefcase, Gavel, ShoppingCart, 
    User, Users, Megaphone, Cpu, Signal 
} from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { motion } from "framer-motion";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const modules = [
    { title: "Centro de Contabilidad", description: "Gestión financiera, fiscal y contable unificada.", icon: Layers },
    { title: "Gestión de RR.HH.", description: "Nómina, talento humano y cumplimiento laboral.", icon: Briefcase },
    { title: "Escritorio Jurídico", description: "Cumplimiento legal, contratos y trámites corporativos.", icon: Gavel },
    { title: "Ventas y Facturación", description: "Punto de Venta (TPV), facturación e inventario.", icon: ShoppingCart },
    { title: "Portal de Socios", description: "Dashboard de supervisión para la junta directiva.", icon: Users },
    { title: "Ingeniería e IT", description: "Control de infraestructura, seguridad y desarrollo.", icon: Cpu },
    { title: "Gestión de Telecom", description: "Administración de redes y servicios de conectividad.", icon: Signal },
    { title: "Marketing y Crecimiento", description: "Análisis de campañas y estrategias de mercado.", icon: Megaphone },
    { title: "Acceso Personal", description: "Portal para clientes y gestión de trámites personales.", icon: User },
];

export function ServicesSection() {
    const { isHolidayActive } = useHoliday();
    return (
        <section id="servicios" className={cn("py-20 md:py-28", !isHolidayActive && "bg-muted/30", isHolidayActive && "bg-background/80 backdrop-blur-lg")}>
            <div className="container mx-auto px-4 md:px-6">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Un Ecosistema 360° para tu Empresa</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Cada módulo está perfectamente integrado para que la información fluya sin fricciones entre departamentos.</p>
                </motion.div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((item, index) => (
                        <motion.div
                            key={item.title} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.05 * index }}
                        >
                            <Card className={cn(
                                "h-full transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 flex flex-col",
                                isHolidayActive ? "bg-card/50 backdrop-blur-sm" : "bg-card"
                            )}>
                               <CardHeader className="flex-row items-center gap-4">
                                  <div className="p-3 bg-primary/10 text-primary rounded-xl w-fit">
                                      <item.icon className="h-6 w-6" />
                                  </div>
                                  <CardTitle className="text-lg">{item.title}</CardTitle>
                               </CardHeader>
                               <CardContent className="flex-grow">
                                   <p className="text-sm text-muted-foreground">{item.description}</p>
                               </CardContent>
                               <CardContent>
                                    <Button variant="outline" size="sm" className="w-full">
                                        Ver demo específica
                                    </Button>
                               </CardContent>
                           </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
