
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Scale, Book, AlertTriangle, Link as LinkIcon } from "lucide-react";

export default function SistemaLegalContablePage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Scale className="h-8 w-8" />
            Sistema Contable y Tributario en Venezuela
        </h1>
        <p className="text-muted-foreground mt-2">
          Una guía sobre el marco legal que rige las operaciones comerciales y fiscales en el país.
        </p>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Interconexión de Normativas</CardTitle>
          <CardDescription>
            Un sistema contable y tributario se rige por el Código Orgánico Tributario (COT) de Venezuela, que establece las obligaciones y procedimientos para la recaudación de impuestos, mientras que el Código de Comercio regula la organización y las operaciones comerciales de las empresas.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">
                El sistema se integra con la ley del impuesto sobre la renta y la normativa de la administración tributaria, y en caso de incumplimiento, puede derivar en un procedimiento penal que aborda infracciones tributarias.
            </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Book className="text-primary"/> Código Orgánico Tributario (COT)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-semibold">Propósito</h4>
                    <p className="text-sm text-muted-foreground">Es la ley principal que rige el sistema tributario venezolano, detallando los derechos, obligaciones y procedimientos para los contribuyentes.</p>
                </div>
                 <div>
                    <h4 className="font-semibold">Regula</h4>
                    <p className="text-sm text-muted-foreground">Los tributos (impuestos, tasas, contribuciones) y la actuación de la Administración Tributaria.</p>
                </div>
                 <div>
                    <h4 className="font-semibold">Aspectos Clave</h4>
                    <p className="text-sm text-muted-foreground">Establece deberes formales de los contribuyentes, como la presentación de información y la colaboración en fiscalizaciones, según el artículo 145 del COT.</p>
                </div>
            </CardContent>
        </Card>
         <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Book className="text-primary"/> Código de Comercio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div>
                    <h4 className="font-semibold">Función</h4>
                    <p className="text-sm text-muted-foreground">Determina la estructura de las empresas, los tipos de actos de comercio y cómo se deben llevar a cabo, incluyendo la contabilidad y la elaboración de estados financieros.</p>
                </div>
                <div>
                    <h4 className="font-semibold">Contabilidad</h4>
                    <p className="text-sm text-muted-foreground">Regula los libros de comercio y los principios generales para registrar las operaciones mercantiles, lo cual es la base para el cálculo de los impuestos.</p>
                </div>
            </CardContent>
        </Card>
      </div>

       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3"><LinkIcon className="text-primary"/> Interconexión y Procedimiento Penal</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-semibold mb-2">Integración</h4>
                <p className="text-sm text-muted-foreground">Los sistemas contable y tributario se conectan porque la información financiera generada bajo el Código de Comercio es el fundamento para el cálculo de los impuestos regulados por el COT.</p>
            </div>
             <div className="p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-semibold mb-2">Fiscalización</h4>
                <p className="text-sm text-muted-foreground">La Administración Tributaria, a través del COT, puede investigar y fiscalizar a los contribuyentes.</p>
            </div>
             <div className="p-4 bg-secondary/50 rounded-lg lg:col-span-1 md:col-span-2">
                <h4 className="font-semibold mb-2 flex items-center gap-2"><AlertTriangle className="text-destructive"/> Infracciones y Sanciones</h4>
                <p className="text-sm text-muted-foreground">El incumplimiento de las obligaciones tributarias puede acarrear sanciones, que son competencia del ámbito penal, según lo establece el Código Orgánico Tributario y otras leyes relacionadas.</p>
            </div>
        </CardContent>
        <CardContent>
            <p className="text-sm text-center text-muted-foreground p-4 border rounded-lg bg-background">
                <strong>En resumen:</strong> El sistema contable se ajusta al <strong>Código de Comercio</strong> para la organización y al <strong>Código Orgánico Tributario</strong> para la recaudación. El incumplimiento puede llevar a procedimientos penales, según el artículo 226 del COT sobre competencia penal en materia tributaria.
            </p>
        </CardContent>
       </Card>

    </div>
  );
}
