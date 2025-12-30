
'use client';

import { Layers, Briefcase, Gavel, Network } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";

const services = [
    { title: "Holding y Finanzas", description: "Consolida la contabilidad de múltiples empresas, gestiona la tesorería de forma centralizada y accede a reportes financieros a nivel de grupo.", icon: Network },
    { title: "Operaciones y Ventas", description: "Desde el Punto de Venta (TPV) hasta el control de inventario y la facturación a crédito, optimiza todo tu ciclo comercial.", icon: Layers },
    { title: "Talento y Cultura", description: "Automatiza la gestión de nóminas, cálculo de prestaciones, contratos y el ciclo de vida completo del empleado.", icon: Briefcase },
    { title: "Legal y Cumplimiento Fiscal", description: "Garantiza el cumplimiento con SENIAT e IVSS, gestiona contratos, poderes y trámites corporativos con un módulo legal integrado.", icon: Gavel },
];

export function ServicesSection() {
    return (
        <section id="servicios" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div 
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Un Ecosistema para Gobernar tu Negocio</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Más que un software, somos el sistema operativo para tu grupo empresarial. Orquestamos cada área de tu compañía para una sinfonía de eficiencia.</p>
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
