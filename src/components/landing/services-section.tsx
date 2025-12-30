
'use client';

import { Layers, Users, ShieldCheck, Gavel, ShoppingCart, Briefcase } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";

const services = [
    { title: "Contabilidad y Finanzas", description: "Automatiza tu contabilidad, desde libros oficiales hasta reportes financieros y análisis de rentabilidad.", icon: Layers },
    { title: "Ventas y Facturación", description: "Gestiona todo tu ciclo de ventas con un Punto de Venta (TPV) integrado, facturación a crédito y notas fiscales.", icon: ShoppingCart },
    { title: "Gestión de Talento Humano", description: "Administra nóminas, cálculo de prestaciones, contratos y el ciclo de vida completo de tus empleados.", icon: Briefcase },
    { title: "Cumplimiento y Asesoría Legal", description: "Garantiza el cumplimiento fiscal (SENIAT, IVSS) y gestiona contratos, poderes y trámites corporativos con seguridad.", icon: Gavel },
];

export function ServicesSection() {
    return (
        <section id="servicios" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div 
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Un Ecosistema para tu Tranquilidad</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Más que un software, somos tu aliado estratégico para navegar el entorno empresarial venezolano.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((item, index) => (
                        <div
                            key={item.title} 
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
