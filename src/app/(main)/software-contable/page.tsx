
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, SlidersHorizontal, Users, Zap, Puzzle, ArrowRight } from "lucide-react";
import Image from "next/image";

const factores = [
    { icon: Shield, title: "Homologación del SENIAT", description: "Esencial para que la facturación y los reportes sean válidos fiscalmente." },
    { icon: SlidersHorizontal, title: "Funcionalidades Específicas", description: "Debe cubrir facturación, inventario, cuentas por cobrar/pagar y reportes financieros." },
    { icon: Users, title: "Soporte Técnico Local", description: "Un soporte eficiente en Venezuela es clave para resolver problemas rápidamente." },
];

const opciones = [
    { title: "ERPs Consolidados (Galac, Profit Plus)", description: "Sistemas robustos con un ecosistema completo, ideales para medianas y grandes empresas con operaciones complejas." },
    { title: "Sistemas Modernos (Hybrid LitePRO)", description: "Soluciones flexibles para empresas con alto volumen de transacciones y múltiples sucursales, ofreciendo contabilidad centralizada." },
    { title: "Software en la Nube (Zoho Books)", description: "Permiten el acceso desde cualquier lugar, perfectos para una gestión ágil y remota de los datos financieros." },
];

export default function SoftwareContablePage() {
  return (
    <div className="p-4 md:p-8 space-y-12">
       <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            <Puzzle className="h-10 w-10 text-primary"/>
            Guía para Elegir tu Sistema Contable en Venezuela
        </h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          Encuentra el software administrativo o ERP que mejor se adapte a tu empresa, asegurando el cumplimiento con la normativa del SENIAT.
        </p>
      </header>

      {/* Factores Clave */}
      <section>
         <h2 className="text-2xl font-semibold mb-8 text-center">Factores Clave a Considerar</h2>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {factores.map(factor => (
                <Card key={factor.title} className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="items-center text-center">
                        <div className="p-4 bg-primary/10 rounded-full mb-2">
                             <factor.icon className="h-8 w-8 text-primary"/>
                        </div>
                        <CardTitle>{factor.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-sm text-muted-foreground">
                        {factor.description}
                    </CardContent>
                </Card>
            ))}
         </div>
      </section>

       {/* Opciones de Software */}
      <section>
         <h2 className="text-2xl font-semibold mb-8 text-center">Opciones de Software en el Mercado</h2>
          <div className="space-y-4">
            {opciones.map(opt => (
                <div key={opt.title} className="p-4 rounded-lg bg-secondary/30 flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 shrink-0" />
                    <div>
                        <h3 className="font-semibold">{opt.title}</h3>
                        <p className="text-sm text-muted-foreground">{opt.description}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>
      
      {/* Integración con System C.R.S */}
       <Card className="bg-gradient-to-r from-primary/80 to-secondary/80 text-primary-foreground">
        <div className="grid md:grid-cols-5 items-center">
            <div className="md:col-span-3 p-8">
                 <CardHeader className="p-0">
                    <CardTitle className="text-3xl flex items-center gap-3"><Zap/>System C.R.S: Tu Centro de Integración</CardTitle>
                    <CardDescription className="text-primary-foreground/80 pt-2">
                        System C.R.S no es solo un sistema contable, es un ecosistema que se integra con tu software administrativo (Galac, Profit Plus, etc.) para centralizar y automatizar todos tus flujos de trabajo.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-6 space-y-3">
                    <p>✓ Conecta tu facturación para generar y timbrar documentos fiscales automáticamente.</p>
                    <p>✓ Sincroniza tus libros contables para facilitar las declaraciones de IVA e ISLR.</p>
                    <p>✓ Automatiza la gestión de permisos y notificaciones de vencimiento.</p>
                </CardContent>
            </div>
             <div className="md:col-span-2 p-8 text-center bg-black/20 h-full flex flex-col justify-center rounded-r-lg">
                <h3 className="text-xl font-bold">¿Necesitas Ayuda?</h3>
                <p className="mt-2 mb-4 text-sm opacity-80">Nuestro equipo de expertos puede asesorarte para encontrar la combinación de software perfecta para tu negocio.</p>
                <Button variant="secondary" className="bg-background text-foreground hover:bg-background/80 w-full">
                    Solicitar Asesoría de Integración <ArrowRight className="ml-2"/>
                </Button>
            </div>
        </div>
       </Card>

    </div>
  );
}
