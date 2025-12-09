
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
        <h2>ASUNTO: PROPUESTA PARA LA IMPLEMENTACIÓN DE UN ECOSISTEMA INTEGRADO DE GESTIÓN, TELECOMUNICACIONES Y FINANZAS BLOCKCHAIN</h2>
        <p>Estimados señores de [Nombre de la Empresa Cliente],</p>
        <p>Nos dirigimos a ustedes con gran entusiasmo para presentar una propuesta que consideramos transformadora. En Kyron, hemos desarrollado una solución integral que combina tecnología de punta para la gestión de residuos, una plataforma de automatización administrativa, servicios de telecomunicaciones y una innovadora billetera financiera basada en Blockchain.</p>
        <br/>
        <h3>1. ENTENDIMIENTO DEL PROBLEMA</h3>
        <p>Reconocemos los desafíos del entorno actual:</p>
        <ul>
            <li>La gestión ineficiente de residuos sólidos.</li>
            <li>La complejidad administrativa y fiscal en Venezuela.</li>
            <li>La necesidad de soluciones de comunicación y transacciones financieras seguras y modernas.</li>
        </ul>
        <br/>
        <h3>2. SOLUCIÓN PROPUESTA: UN ECOSISTEMA DE TRES PILARES</h3>
        <p>Nuestro proyecto se basa en tres pilares que funcionan de manera sinérgica:</p>
        <p><strong>a) Pilar 1: Sostenibilidad y Hardware Inteligente (Papelera Inteligente):</strong> Dispositivo con IA que clasifica automáticamente los residuos, optimizando el reciclaje y generando datos valiosos para la economía circular.</p>
        <p><strong>b) Pilar 2: Software de Automatización y Telecomunicaciones (SaaS + TaaS):</strong> Plataforma en la nube para automatizar facturación, inventario y contabilidad (cumpliendo con normativas SENIAT), integrada con una oferta de servicios de telecomunicaciones que incluye línea telefónica y venta de equipos (teléfonos, televisores).</p>
        <p><strong>c) Pilar 3: Implementación Contable y Financiera con Billetera Blockchain:</strong> Una solución de tercera generación para la gestión de activos y transacciones seguras, transparentes e inmutables, ideal para el comercio y las finanzas del futuro.</p>
        <br/>
        <h3>3. BENEFICIOS CLAVE</h3>
        <ul>
            <li><strong>Sostenibilidad y Responsabilidad Social:</strong> Mejora la gestión de residuos y la imagen corporativa.</li>
            <li><strong>Eficiencia Operativa Integral:</strong> Automatiza tareas administrativas y unifica las comunicaciones.</li>
            <li><strong>Cumplimiento y Seguridad Financiera:</strong> Garantiza el cumplimiento fiscal y ofrece transacciones seguras con tecnología Blockchain.</li>
            <li><strong>Toma de Decisiones Basada en Datos:</strong> Informes en tiempo real sobre residuos, finanzas y operaciones.</li>
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

            <h4>ASUNTO: PROPUESTA PARA LA IMPLEMENTACIÓN DE UN ECOSISTEMA INTEGRADO DE GESTIÓN, TELECOMUNICACIONES Y FINANZAS BLOCKCHAIN</h4>

            <p>
                Estimados señores de [Nombre de la Empresa Cliente],
            </p>
            <p>
                Nos dirigimos a ustedes con gran entusiasmo para presentar una propuesta que consideramos transformadora. En Kyron, hemos desarrollado una solución integral que combina tecnología de punta para la gestión de residuos, una plataforma de automatización administrativa, servicios de telecomunicaciones y una innovadora billetera financiera basada en Blockchain.
            </p>

            <h4>1. ENTENDIMIENTO DEL PROBLEMA</h4>
            <p>
                Reconocemos los desafíos del entorno actual:
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li>La gestión ineficiente de residuos sólidos, que resulta en bajos índices de reciclaje y altos costos operativos.</li>
                <li>La complejidad administrativa y fiscal en Venezuela, que consume tiempo y recursos valiosos.</li>
                <li>La necesidad de soluciones de comunicación y transacciones financieras seguras y modernas.</li>
            </ul>

            <h4>2. SOLUCIÓN PROPUESTA: UN ECOSISTEMA DE TRES PILARES</h4>
            <p>
                Nuestro proyecto se basa en tres pilares fundamentales que funcionan de manera sinérgica:
            </p>
            <p>
                <strong>a) Pilar 1: Sostenibilidad y Hardware Inteligente (Papelera Inteligente):</strong> Un dispositivo innovador equipado con sensores e Inteligencia Artificial que clasifica automáticamente los residuos (papel, plástico, vidrio, etc.), optimizando el proceso de reciclaje desde el origen.
            </p>
            <p>
                <strong>b) Pilar 2: Software de Automatización y Telecomunicaciones (SaaS + TaaS):</strong> Una plataforma en la nube que automatiza el 100% de los procesos de su empresa (facturación, inventario, contabilidad), integrada con una oferta de servicios que incluye <strong>línea telefónica y venta de equipos (teléfonos, televisores)</strong>.
            </p>
             <p>
                <strong>c) Pilar 3: Implementación Contable y Financiera con Billetera Blockchain:</strong> Una solución de tercera generación para la gestión de activos y transacciones seguras, transparentes e inmutables, ideal para el comercio y las finanzas del futuro.
            </p>

            <h4>3. BENEFICIOS CLAVE</h4>
             <ul className="list-disc pl-5 space-y-2">
                <li><strong>Sostenibilidad y Responsabilidad Social:</strong> Mejora radicalmente la gestión de residuos y posiciona a su organización como líder en sostenibilidad.</li>
                <li><strong>Eficiencia Operativa Integral:</strong> Automatiza tareas administrativas y unifica las comunicaciones y servicios tecnológicos.</li>
                <li><strong>Cumplimiento y Seguridad Financiera:</strong> Garantiza el cumplimiento fiscal y ofrece transacciones seguras con tecnología Blockchain.</li>
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
