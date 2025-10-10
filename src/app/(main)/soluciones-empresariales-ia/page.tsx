
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, CheckCircle, Shield, MessageCircle, Phone, FileText, ArrowRight, Download } from "lucide-react";

const aiFeatures = [
    "Conciliación bancaria automatizada",
    "Gestión y extracción de datos de facturas",
    "Generación de reportes financieros en tiempo real",
    "Detección de anomalías y predicción de tendencias",
];

const securityFeatures = [
    "Acceso seguro con autenticación de dos factores (2FA)",
    "Cifrado de datos en reposo y en tránsito",
    "Auditoría completa de la actividad del sistema",
    "Controles de acceso basados en roles (RBAC)",
];

const communicationFeatures = [
    "Notificaciones y recordatorios de pago automáticos a clientes vía WhatsApp, SMS y correo electrónico (Gmail).",
    "Canal de soporte y consultas para clientes integrado directamente en la plataforma de comunicación.",
    "Generación de reportes de entrega y lectura de notificaciones para un seguimiento efectivo.",
];

export default function SolucionesEmpresarialesIAPage() {

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Bot className="h-8 w-8 text-primary" />
                Análisis de Viabilidad de Startup
            </h1>
            <p className="text-muted-foreground mt-2">
              Evaluación de un modelo de negocio basado en tecnología sostenible.
            </p>
        </div>
        <Button>
            <Download className="mr-2" />
            Descargar Demo
        </Button>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Contabilidad IA */}
        <Card className="lg:col-span-1 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <span>Contabilidad Automatizada con IA</span>
            </CardTitle>
            <CardDescription>
                Nuestro software utiliza IA para automatizar tareas repetitivas, minimizar errores y ofrecerte una visión clara de tus finanzas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {aiFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
           <CardFooter>
            <Button variant="outline" className="w-full">
                Solicitar una Demo <ArrowRight className="ml-2"/>
            </Button>
           </CardFooter>
        </Card>

        {/* Columna Derecha: Seguridad y Comunicaciones */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-destructive" />
                <span>Ciberseguridad Integrada</span>
              </CardTitle>
              <CardDescription>
                La protección de tus datos es nuestra prioridad. Implementamos medidas de seguridad de nivel empresarial.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {securityFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-primary" />
                <span>Alianza Estratégica de Comunicación</span>
              </CardTitle>
              <CardDescription>
                Automatiza tu cobranza y comunicación. Integramos tu sistema con WhatsApp, SMS y correo electrónico.
              </CardDescription>
            </CardHeader>
             <CardContent>
              <ul className="space-y-3">
                {communicationFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
