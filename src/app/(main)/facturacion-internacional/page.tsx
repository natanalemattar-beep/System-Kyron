
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Database, Scale, Code, GitBranch, Shield, Server, CheckCircle } from "lucide-react";
import { countries, countryModules } from "@/lib/countries";

const implementationConsiderations = [
    { title: "Seguridad y Privacidad", description: "Cumplimiento con GDPR para Europa, LOPD para España y leyes de protección de datos específicas de cada país." },
    { title: "Actualizaciones Legales", description: "Sistema de notificaciones automáticas y mecanismo de actualización para cambios tributarios." },
    { title: "Auditoría y Respaldo", description: "Registro inmutable de todas las transacciones, logs de cambios legales y una pista de auditoría completa." },
    { title: "Escalabilidad", description: "Arquitectura de microservicios, bases de datos distribuidas y caché de configuraciones para un rendimiento óptimo." },
];

export default function FacturacionInternacionalPage() {
  const searchParams = useSearchParams();
  const countryParam = searchParams.get('pais');
  
  const [activeTab, setActiveTab] = useState(countryParam || "USA");

  useEffect(() => {
    if (countryParam) {
      setActiveTab(countryParam);
    }
  }, [countryParam]);

  return (
    <div className="space-y-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Globe className="h-8 w-8" />
            Sistema de Facturación Internacional Multijurisdiccional
        </h1>
        <p className="text-muted-foreground mt-2">
            Una arquitectura diseñada para operar en múltiples países, adaptándose a monedas, leyes y códigos tributarios locales.
        </p>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="flex items-center gap-3"><GitBranch className="text-primary"/>Arquitectura Modular por País</CardTitle>
            <CardDescription>El sistema se diseña con un núcleo central y módulos específicos por país para garantizar flexibilidad y cumplimiento.</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold">Componentes Esenciales</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                        <p><strong>Gestor de Configuraciones por País:</strong> Carga dinámicamente la moneda, reglas fiscales, requisitos legales y formatos de factura para cada jurisdicción.</p>
                        <p><strong>Motor de Conversión Monetaria:</strong> Gestiona la conversión entre divisas utilizando tasas de cambio históricas y aplica el formato correcto a cada moneda.</p>
                        <p><strong>Validador Legal:</strong> Asegura que cada factura cumpla con los requisitos específicos del país, como el NIF/CUIT/RFC, campos obligatorios y cálculos de retenciones.</p>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-2">
                    <AccordionTrigger className="font-semibold">Base de Datos Multijurisdiccional</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                        <h4 className="font-medium">Esquema Principal:</h4>
                        <pre className="p-4 rounded-md bg-secondary/50 text-xs overflow-x-auto">
                            <code>
{`CREATE TABLE countries (
  id INT PRIMARY KEY,
  code VARCHAR(3) UNIQUE,
  currency_code VARCHAR(3),
  legal_framework JSON
);

CREATE TABLE invoices (
  id INT PRIMARY KEY,
  country_code VARCHAR(3),
  issue_date DATE,
  currency VARCHAR(3),
  total_amount DECIMAL(15,2)
);`}
                            </code>
                        </pre>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
      
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Implementación por País</CardTitle>
            <CardDescription>Cada módulo contiene las reglas de negocio y fiscales específicas de su jurisdicción.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 h-auto">
                    {Object.keys(countryModules).map(countryCode => {
                        const country = countries.find(c => c.code === countryCode);
                        return (
                            <TabsTrigger key={countryCode} value={countryCode} className="flex items-center gap-2">
                                <Image src={country?.flag || ""} alt={`Flag of ${country?.name}`} width={20} height={15} />
                                {countryCode}
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
                {Object.entries(countryModules).map(([countryCode, data]) => (
                    <TabsContent value={countryCode} key={countryCode}>
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div className="p-4 bg-secondary/50 rounded-lg">
                                <h4 className="font-semibold mb-2">Moneda y Tasas</h4>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    <li><strong>Moneda:</strong> {data.currency}</li>
                                    {Object.entries(data.tax_rates).map(([tax, rate]) => (
                                        <li key={tax}><strong>{tax}:</strong> {typeof rate === 'string' ? rate : (rate as string[]).join(' / ')}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-4 bg-secondary/50 rounded-lg">
                                <h4 className="font-semibold mb-2">Requisitos Legales</h4>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    {Object.entries(data.legal_requirements).map(([key, value]) => (
                                        <li key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {Array.isArray(value) ? value.join(', ') : String(value)}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Server className="text-primary"/>API y UI Adaptativa</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">La API permite crear facturas validadas para cada país, mientras que la interfaz de usuario se adapta dinámicamente, mostrando solo los campos y opciones relevantes para la jurisdicción seleccionada.</p>
            </CardContent>
        </Card>
         <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Scale className="text-primary"/>Cumplimiento Continuo</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Un gestor de cumplimiento monitorea constantemente los cambios en las normativas de cada país y actualiza automáticamente las configuraciones del sistema para garantizar el cumplimiento en todo momento.</p>
            </CardContent>
        </Card>
      </div>

       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Consideraciones Clave de Implementación</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {implementationConsiderations.map(item => (
                <div key={item.title} className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
            ))}
        </CardContent>
       </Card>
    </div>
  );
}
