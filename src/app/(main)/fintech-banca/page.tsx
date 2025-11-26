
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Banknote, Rocket, CheckCircle, Smartphone, Globe, Cpu, ShieldCheck, GitBranch } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const fintechServices = [
    { title: "Apertura de Cuentas Digital", description: "Permite a los usuarios abrir cuentas bancarias sin visitar una agencia física, utilizando nuevas tecnologías de verificación.", icon: Smartphone },
    { title: "Soluciones Bancarias Multiplataforma", description: "Distribución de productos y servicios bancarios a través de canales digitales como banca por Internet, apps móviles y redes sociales.", icon: Globe },
    { title: "Software de Cumplimiento (Compliance)", description: "Herramientas para controlar el cumplimiento de regulaciones financieras, especialmente en la prevención de legitimación de capitales.", icon: ShieldCheck },
    { title: "Banca como Servicio (BaaS)", description: "Modelo donde un banco abre sus servicios a otros proveedores, generalmente no bancarios, para crear nuevas ofertas financieras.", icon: GitBranch }
];

export default function FintechBancaPage() {

  return (
    <div className="p-4 md:p-8 space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Banknote className="h-8 w-8 text-primary"/>
            Modelo FinTech y Banca Digital
        </h1>
        <p className="text-muted-foreground mt-2">
          Análisis del posicionamiento de Kyron como una Institución de Tecnología Financiera del Sector Bancario (ITFB).
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Rocket className="h-6 w-6"/> ¿Qué es una FinTech?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                    "FinTech" es la contracción de "Financial Technology" (Tecnología Financiera). Se refiere a cualquier innovación tecnológica en el diseño y la prestación de servicios financieros. Las FinTech buscan mejorar y automatizar el uso y el acceso a los servicios financieros, haciéndolos más eficientes, accesibles y económicos.
                </p>
            </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Cpu className="h-6 w-6"/> Kyron como ITFB en Venezuela</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                   Kyron se constituye como una **Institución de Tecnología Financiera del Sector Bancario (ITFB)**, un modelo de negocio que le permite ofrecer servicios tecnológicos directamente a las instituciones bancarias para modernizar y expandir sus operaciones.
                </p>
            </CardContent>
        </Card>
      </div>
      
      <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Servicios FinTech Ofrecidos por Kyron a la Banca</CardTitle>
                <CardDescription>Estos son algunos de los servicios que Kyron, como ITFB, puede proveer al sector bancario:</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                {fintechServices.map(item => (
                    <div key={item.title} className="p-4 bg-secondary/50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <item.icon className="h-6 w-6 text-primary"/>
                            <h4 className="font-semibold">{item.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                ))}
            </CardContent>
       </Card>

        <Alert>
            <CheckCircle className="h-4 w-4"/>
            <AlertTitle>Sinergia Única: El Ecosistema Kyron</AlertTitle>
            <AlertDescription>
              La verdadera ventaja competitiva de Kyron no reside solo en su software, sino en la **integración de su modelo FinTech con su modelo de hardware (Papelera Inteligente)**. Esta sinergia crea un ecosistema donde los datos de reciclaje pueden generar beneficios financieros (ej. créditos de carbono), y los servicios financieros pueden usarse para financiar proyectos de sostenibilidad, creando un ciclo virtuoso único en el mercado.
            </AlertDescription>
        </Alert>
    </div>
  );
}
