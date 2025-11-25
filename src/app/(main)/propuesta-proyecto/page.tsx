
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { FileText, Download, Printer, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";
import { formatDate } from "@/lib/utils";

export default function PropuestaProyectoPage() {
    const { toast } = useToast();

    const handleAction = (action: string) => {
        toast({
            title: `Propuesta ${action}`,
            description: `El documento de propuesta ha sido ${action === 'impresa' ? 'enviado a la impresora' : 'descargado como archivo de texto'}.`,
        });
        if (action === 'impresa') {
            window.print();
        } else {
             const content = `
PROPUESTA DE PROYECTO: INNOVACIÓN SOSTENIBLE Y EFICIENCIA ADMINISTRATIVA

Fecha: ${formatDate(new Date())}
Para: [Nombre del Destinatario / Empresa Cliente]
De: Kyron, C.A.

ASUNTO: PROPUESTA PARA LA IMPLEMENTACIÓN DE UN ECOSISTEMA INTEGRADO DE GESTIÓN DE RESIDUOS Y AUTOMATIZACIÓN EMPRESARIAL

Estimados señores de [Nombre de la Empresa Cliente],

Nos dirigimos a ustedes con gran entusiasmo para presentar una propuesta que consideramos transformadora, tanto desde una perspectiva de sostenibilidad ambiental como de eficiencia operativa. En Kyron, hemos desarrollado una solución integral que combina tecnología de punta para la gestión de residuos con una plataforma de automatización administrativa diseñada para el mercado venezolano.

1. ENTENDIMIENTO DEL PROBLEMA
Reconocemos dos grandes desafíos en el entorno actual:
- La gestión ineficiente de residuos sólidos, que resulta en bajos índices de reciclaje y altos costos operativos para municipios y empresas.
- La complejidad administrativa y fiscal en Venezuela, que consume tiempo y recursos valiosos que podrían dedicarse a la innovación y el crecimiento.

2. SOLUCIÓN PROPUESTA
Nuestro proyecto se basa en dos pilares fundamentales que funcionan de manera sinérgica:
a) Papelera Inteligente para Reciclaje: Un dispositivo innovador equipado con sensores e Inteligencia Artificial que clasifica automáticamente los residuos (papel, plástico, vidrio, etc.), optimizando el proceso de reciclaje desde el origen. Esta tecnología no solo mejora la calidad de los materiales recuperados, sino que también genera datos valiosos para optimizar las rutas de recolección y fomentar una economía circular.
b) Software de Automatización Contable y Administrativa: Una plataforma en la nube que automatiza el 100% de los procesos de su empresa: facturación homologada por el SENIAT, gestión de inventario, cuentas por cobrar/pagar, conciliación bancaria y generación de reportes fiscales. Este sistema es el mismo que utilizamos internamente para gestionar la venta y el soporte de nuestras papeleras, demostrando su robustez y fiabilidad.
c) Ecosistema de Productos y Servicios: Además del hardware y software, ofrecemos una línea completa de productos fiscales (desde factureros manuales hasta impresoras fiscales), una plataforma de e-commerce y un sistema de financiamiento para facilitar la adquisición de nuestras soluciones en Venezuela y otros países.
d) Fundación Kyron: Nuestra fundación se encarga de la logística de recolección del plástico y de gestionar alianzas con empresas para convertir los residuos en valor, cerrando el ciclo de la economía circular.

3. BENEFICIOS CLAVE
- Sostenibilidad y Responsabilidad Social: Mejora radicalmente la gestión de residuos y posiciona a su organización como líder en sostenibilidad.
- Eficiencia Operativa: Reduce los costos de recolección de residuos y automatiza tareas administrativas, liberando a su equipo para que se enfoque en actividades de mayor valor.
- Cumplimiento y Tranquilidad: Garantiza el cumplimiento de las normativas fiscales venezolanas, minimizando el riesgo de sanciones.
- Toma de Decisiones Basada en Datos: Obtenga informes en tiempo real sobre la generación de residuos y el rendimiento financiero de su empresa.

4. PRÓXIMOS PASOS
Nos encantaría tener la oportunidad de presentarles una demostración en vivo de nuestra solución y discutir cómo podemos adaptarla a sus necesidades específicas. Proponemos una reunión la próxima semana para explorar esta colaboración.

Agradecemos de antemano su tiempo y consideración.

Atentamente,
El Equipo de Kyron, C.A.
            `;
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Propuesta_Proyecto_Kyron.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <FileText className="h-8 w-8" />
                Carta de Propuesta de Proyecto
            </h1>
            <p className="text-muted-foreground mt-2">
              Modelo para presentar tu proyecto de Papelera Inteligente y Automatización a clientes o inversores.
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleAction('impresa')}>
                <Printer className="mr-2"/> Imprimir
            </Button>
            <Button onClick={() => handleAction('descargado')}>
                <Download className="mr-2"/> Descargar
            </Button>
        </div>
      </header>

      <Card className="max-w-4xl mx-auto bg-card/90 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center p-8">
            <CardTitle className="text-2xl">PROPUESTA DE PROYECTO: INNOVACIÓN SOSTENIBLE Y EFICIENCIA ADMINISTRATIVA</CardTitle>
        </CardHeader>
        <CardContent className="p-8 prose prose-sm dark:prose-invert max-w-none text-justify">
            <p><strong>Fecha:</strong> {formatDate(new Date())}</p>
            <p><strong>Para:</strong> [Nombre del Destinatario / Empresa Cliente]</p>
            <p><strong>De:</strong> Kyron, C.A.</p>
            
            <Separator className="my-6" />

            <h4>ASUNTO: PROPUESTA PARA LA IMPLEMENTACIÓN DE UN ECOSISTEMA INTEGRADO DE GESTIÓN DE RESIDUOS Y AUTOMATIZACIÓN EMPRESARIAL</h4>

            <p>
                Estimados señores de [Nombre de la Empresa Cliente],
            </p>
            <p>
                Nos dirigimos a ustedes con gran entusiasmo para presentar una propuesta que consideramos transformadora, tanto desde una perspectiva de sostenibilidad ambiental como de eficiencia operativa. En Kyron, hemos desarrollado una solución integral que combina tecnología de punta para la gestión de residuos con una plataforma de automatización administrativa diseñada para el mercado venezolano.
            </p>

            <h4>1. ENTENDIMIENTO DEL PROBLEMA</h4>
            <p>
                Reconocemos dos grandes desafíos en el entorno actual:
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li>La gestión ineficiente de residuos sólidos, que resulta en bajos índices de reciclaje y altos costos operativos para municipios y empresas.</li>
                <li>La complejidad administrativa y fiscal en Venezuela, que consume tiempo y recursos valiosos que podrían dedicarse a la innovación y el crecimiento.</li>
            </ul>

            <h4>2. SOLUCIÓN PROPUESTA</h4>
            <p>
                Nuestro proyecto se basa en un ecosistema de pilares fundamentales que funcionan de manera sinérgica:
            </p>
            <p>
                <strong>a) Papelera Inteligente para Reciclaje:</strong> Un dispositivo innovador equipado con sensores e Inteligencia Artificial que clasifica automáticamente los residuos (papel, plástico, vidrio, etc.), optimizando el proceso de reciclaje desde el origen.
            </p>
            <p>
                <strong>b) Software de Automatización (SaaS):</strong> Una plataforma en la nube que automatiza el 100% de los procesos de su empresa: facturación homologada, gestión de inventario, cuentas por cobrar/pagar, y generación de reportes fiscales.
            </p>
             <p>
                <strong>c) Ecosistema de Productos y Servicios:</strong> Además del hardware y software, ofrecemos una línea completa de productos fiscales (desde factureros manuales hasta impresoras fiscales), una plataforma de e-commerce, y un sistema de financiamiento para facilitar la adquisición de nuestras soluciones en Venezuela y otros países.
            </p>
             <p>
                <strong>d) Fundación Kyron:</strong> Nuestra fundación se encarga de la logística de recolección del plástico y de gestionar alianzas con empresas para convertir los residuos en valor, cerrando el ciclo de la economía circular.
            </p>

            <h4>3. BENEFICIOS CLAVE</h4>
             <ul className="list-disc pl-5 space-y-2">
                <li><strong>Sostenibilidad y Responsabilidad Social:</strong> Mejora radicalmente la gestión de residuos y posiciona a su organización como líder en sostenibilidad.</li>
                <li><strong>Eficiencia Operativa:</strong> Reduce costos y automatiza tareas administrativas, liberando a su equipo para que se enfoque en actividades de mayor valor.</li>
                <li><strong>Cumplimiento y Tranquilidad:</strong> Garantiza el cumplimiento de las normativas fiscales venezolanas, minimizando el riesgo de sanciones.</li>
                <li><strong>Toma de Decisiones Basada en Datos:</strong> Obtenga informes en tiempo real sobre la generación de residuos y el rendimiento financiero de su empresa.</li>
            </ul>

            <h4>4. PRÓXIMOS PASOS</h4>
            <p>
                Nos encantaría tener la oportunidad de presentarles una demostración en vivo de nuestra solución y discutir cómo podemos adaptarla a sus necesidades específicas. Proponemos una reunión la próxima semana para explorar esta colaboración.
            </p>
            <p>
                Agradecemos de antemano su tiempo y consideración.
            </p>

            <div className="pt-24 text-center">
                <p className="border-t-2 border-foreground inline-block px-12 pt-2">Atentamente,</p>
                <p className="font-semibold mt-2">El Equipo de Kyron, C.A.</p>
            </div>

        </CardContent>
        <CardFooter className="p-6 justify-center">
             <Button>
                Agendar Reunión de Seguimiento <ArrowRight className="ml-2"/>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
