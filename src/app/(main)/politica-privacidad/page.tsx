
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function PoliticaPrivacidadPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Política de Privacidad
        </h1>
        <p className="text-muted-foreground mt-2">
          Última actualización: 26 de Julio de 2024
        </p>
      </header>

      <Card>
        <CardContent className="p-8 prose prose-sm dark:prose-invert max-w-none text-justify">
            <h4>1. Introducción</h4>
            <p>
                Bienvenido a Kyron, C.A. ("nosotros", "nuestro"). Nos comprometemos a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos su información cuando utiliza nuestra plataforma.
            </p>

            <h4>2. Información que Recopilamos</h4>
            <p>
                Podemos recopilar información personal y fiscal sobre usted y su empresa de diversas maneras. La información que podemos recopilar incluye:
            </p>
             <ul>
                <li><strong>Datos Personales y de Contacto:</strong> Nombre, dirección, dirección de correo electrónico, número de teléfono.</li>
                <li><strong>Datos Fiscales y Corporativos:</strong> RIF, razón social, actas constitutivas, estados financieros y otros documentos necesarios para la prestación de nuestros servicios.</li>
                <li><strong>Datos de Uso:</strong> Información que su navegador envía automáticamente cada vez que visita nuestro sitio, como su dirección IP, tipo de navegador, y las páginas que visita.</li>
            </ul>

            <h4>3. Cómo Usamos su Información</h4>
            <p>
                Usamos la información recopilada para:
            </p>
             <ul>
                <li>Crear y gestionar su cuenta.</li>
                <li>Proveer, operar y mantener nuestros servicios.</li>
                <li>Procesar sus transacciones y gestionar sus pagos.</li>
                <li>Cumplir con las obligaciones legales y fiscales en su nombre.</li>
                <li>Mejorar, personalizar y ampliar nuestros servicios.</li>
                 <li>Enviarle correos electrónicos administrativos, técnicos o de marketing, de los cuales puede optar por no recibirlos.</li>
            </ul>

            <h4>4. Divulgación de su Información</h4>
            <p>
                No compartiremos su información personal con terceros, excepto en las siguientes situaciones:
            </p>
            <ul>
                <li><strong>Con su Consentimiento:</strong> Podemos divulgar su información para cualquier otro propósito con su consentimiento.</li>
                <li><strong>Para Cumplir con la Ley:</strong> Podemos divulgar su información cuando estemos legalmente obligados a hacerlo para cumplir con la ley aplicable, solicitudes gubernamentales, o procesos judiciales.</li>
                <li><strong>Proveedores de Servicios:</strong> Podemos compartir su información con proveedores externos que realizan servicios para nosotros o en nuestro nombre, como procesamiento de pagos y análisis de datos.</li>
            </ul>

            <h4>5. Seguridad de su Información</h4>
            <p>
                Utilizamos medidas de seguridad administrativas, técnicas y físicas para ayudar a proteger su información personal. Si bien hemos tomado medidas razonables para asegurar la información que nos proporciona, tenga en cuenta que ningún sistema de seguridad es impenetrable.
            </p>

             <h4>6. Derechos del Usuario</h4>
            <p>
                Usted tiene derecho a acceder, corregir o eliminar su información personal. Puede revisar y cambiar la información de su cuenta en cualquier momento iniciando sesión en la configuración de su cuenta y actualizándola.
            </p>

            <h4>7. Contacto</h4>
            <p>
                Si tiene preguntas o comentarios sobre esta Política de Privacidad, por favor contáctenos en: <a href="mailto:privacidad@kyron.com">privacidad@kyron.com</a>.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
