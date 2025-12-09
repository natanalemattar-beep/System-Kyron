
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

    const getProposalContent = () => `
        <h1>PROPUESTA DE PROYECTO: INNOVACIÓN SOSTENIBLE Y EFICIENCIA ADMINISTRATIVA</h1>
        <p><strong>Fecha:</strong> ${formatDate(new Date())}</p>
        <p><strong>Para:</strong> [Nombre del Destinatario / Empresa Cliente]</p>
        <p><strong>De:</strong> Kyron, C.A.</p>
        <br/>
        <h2>ASUNTO: PROPUESTA PARA LA IMPLEMENTACIÓN DE UN ECOSISTEMA INTEGRADO DE GESTIÓN DE RESIDUOS Y AUTOMATIZACIÓN EMPRESARIAL</h2>
        <p>Estimados señores de [Nombre de la Empresa Cliente],</p>
        <p>Nos dirigimos a ustedes con gran entusiasmo para presentar una propuesta que consideramos transformadora, tanto desde una perspectiva de sostenibilidad ambiental como de eficiencia operativa. En Kyron, hemos desarrollado una solución integral que combina tecnología de punta para la gestión de residuos con una plataforma de automatización administrativa diseñada para el mercado venezolano.</p>
        <br/>
        <h3>1. ENTENDIMIENTO DEL PROBLEMA</h3>
        <p>Reconocemos dos grandes desafíos en el entorno actual:</p>
        <ul>
            <li>La gestión ineficiente de residuos sólidos, que resulta en bajos índices de reciclaje y altos costos operativos.</li>
            <li>La complejidad administrativa y fiscal en Venezuela, que consume tiempo y recursos valiosos.</li>
        </ul>
        <br/>
        <h3>2. SOLUCIÓN PROPUESTA</h3>
        <p>Nuestro proyecto se basa en un ecosistema de pilares que funcionan de manera sinérgica:</p>
        <p><strong>a) Papelera Inteligente para Reciclaje:</strong> Dispositivo con IA que clasifica automáticamente los residuos, optimizando el reciclaje.</p>
        <p><strong>b) Software de Automatización (SaaS):</strong> Plataforma en la nube para automatizar facturación, inventario, y contabilidad, cumpliendo con normativas del SENIAT.</p>
        <p><strong>c) Ecosistema de Productos y Servicios:</strong> Línea completa de productos fiscales, e-commerce y sistema de financiamiento.</p>
        <p><strong>d) Fundación Kyron:</strong> Logística para la recolección de plástico y alianzas para convertir residuos en valor.</p>
        <br/>
        <h3>3. BENEFICIOS CLAVE</h3>
        <ul>
            <li><strong>Sostenibilidad y Responsabilidad Social:</strong> Mejora la gestión de residuos y la imagen corporativa.</li>
            <li><strong>Eficiencia Operativa:</strong> Reduce costos y automatiza tareas administrativas.</li>
            <li><strong>Cumplimiento y Tranquilidad:</strong> Garantiza el cumplimiento fiscal, minimizando el riesgo de sanciones.</li>
            <li><strong>Toma de Decisiones Basada en Datos:</strong> Informes en tiempo real sobre residuos y rendimiento financiero.</li>
        </ul>
        <br/>
        <h3>4. PRÓXIMOS PASOS</h3>
        <p>Nos encantaría presentarles una demostración en vivo y discutir cómo podemos adaptar nuestra solución a sus necesidades. Proponemos una reunión la próxima semana.</p>
        <p>Agradecemos su tiempo y consideración.</p>
        <br/><br/>
        <p>Atentamente,</p>
        <p>El Equipo de Kyron, C.A.</p>
    `;
    
    const handleAction = (action: string) => {
        const content = getProposalContent();
        const filename = 'Propuesta_Proyecto_Kyron.doc';
        const sourceHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='utf-8'>
                <title>Export HTML to Word</title>
            </head>
            <body>${content}</body>
            </html>`;
        
        if (action === 'impresa') {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(sourceHTML);
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            }
             toast({
                title: "Iniciando Impresión",
                description: `El modelo de propuesta ha sido enviado a la impresora.`,
            });
        } else if (action === 'descargado') {
            const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
            const fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = filename;
            fileDownload.click();
            document.body.removeChild(fileDownload);
            toast({
                title: `Propuesta Descargada`,
                description: `El documento ha sido descargado como ${filename}.`,
            });
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
                <Download className="mr-2"/> Descargar (.doc)
            </Button>
        </div>
      </header>

      <Card className="max-w-4xl mx-auto bg-card/90 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center p-8">
            <CardTitle className="text-2xl">PROPUESTA DE PROYECTO: INNOVACIÓN SOSTENIBLE Y EFICIENCIA ADMINISTRATIVA</CardTitle>
        </CardHeader>
        <CardContent className="p-8 prose prose-sm dark:prose-invert max-w-none text-justify">
            <p><strong>Fecha:</strong> ${formatDate(new Date())}</p>
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
