
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Términos y Condiciones de Servicio
        </h1>
        <p className="text-muted-foreground mt-2">
          Última actualización: 26 de Julio de 2024
        </p>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="p-8 prose prose-sm dark:prose-invert max-w-none text-justify">
            <h4>1. Aceptación de los Términos</h4>
            <p>
                Al acceder y utilizar los servicios de System C.M.S, C.A. ("la Plataforma"), usted ("el Usuario") acepta y se compromete a cumplir con los presentes Términos y Condiciones de Servicio. Si no está de acuerdo con alguno de los términos, no debe utilizar la Plataforma.
            </p>

            <h4>2. Descripción del Servicio</h4>
            <p>
                System C.M.S. es una plataforma de software como servicio (SaaS) diseñada para la gestión empresarial, contable, fiscal y de cumplimiento en la República Bolivariana de Venezuela. Los servicios incluyen, pero no se limitan a, facturación, gestión de nómina, control de inventario, y generación de reportes fiscales.
            </p>

            <h4>3. Cuentas de Usuario</h4>
            <p>
                Para acceder a la mayoría de las funciones de la Plataforma, el Usuario debe registrarse y mantener una cuenta. El Usuario es responsable de mantener la confidencialidad de la información de su cuenta, incluyendo su contraseña, y de todas las actividades que ocurran bajo su cuenta.
            </p>

            <h4>4. Uso Aceptable</h4>
            <p>
                El Usuario se compromete a no utilizar la Plataforma para ningún propósito ilegal o prohibido por estos términos. El Usuario no puede utilizar la Plataforma de ninguna manera que pueda dañar, deshabilitar, sobrecargar o perjudicar la Plataforma o interferir con el uso y disfrute de la misma por parte de terceros.
            </p>
            
            <h4>5. Tarifas y Pagos</h4>
            <p>
                Ciertos servicios de la Plataforma pueden estar sujetos al pago de tarifas. Todas las tarifas se detallan en nuestra sección de "Planes y Precios" y están sujetas a cambios con previo aviso. Los pagos no son reembolsables, salvo que se especifique lo contrario.
            </p>

            <h4>6. Propiedad Intelectual</h4>
            <p>
                La Plataforma y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de System C.M.S, C.A. y sus licenciantes. El software está protegido por derechos de autor y otras leyes de propiedad intelectual.
            </p>

            <h4>7. Confidencialidad</h4>
             <p>
                System C.M.S. se compromete a tratar toda la información financiera y empresarial cargada por el Usuario como estrictamente confidencial. No accederemos, compartiremos ni utilizaremos sus datos para ningún propósito que no sea la prestación y mejora del servicio, el soporte técnico o el cumplimiento de obligaciones legales.
            </p>

            <h4>8. Limitación de Responsabilidad</h4>
            <p>
                En ningún caso System C.M.S, C.A., ni sus directores, empleados o afiliados, serán responsables de ningún daño indirecto, incidental, especial, consecuente o punitivo, incluyendo, sin limitación, la pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles, resultantes del uso o la incapacidad de usar el servicio.
            </p>

            <h4>9. Terminación</h4>
            <p>
                Podemos suspender o terminar el acceso del Usuario a la Plataforma inmediatamente, sin previo aviso ni responsabilidad, por cualquier motivo, incluyendo, sin limitación, si el Usuario incumple los Términos.
            </p>

            <h4>10. Ley Aplicable</h4>
            <p>
                Estos Términos se regirán e interpretarán de acuerdo con las leyes de la República Bolivariana de Venezuela, sin tener en cuenta sus disposiciones sobre conflicto de leyes.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
