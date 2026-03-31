import { Link } from "@/navigation";
import { ChevronLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Términos de Servicio — System Kyron" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" asChild className="rounded-xl h-9 px-4 text-xs">
            <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> Volver al inicio</Link>
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight text-foreground">Términos de Servicio</h1>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">System Kyron • Última actualización: Marzo 2026</p>
            </div>
          </div>

          <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
            {[
              {
                title: "1. Aceptación de Términos",
                body: "Al acceder, registrarse o utilizar cualquier funcionalidad de System Kyron (en adelante, \"la Plataforma\"), usted acepta cumplir íntegramente estos Términos de Servicio, así como la Política de Privacidad y cualquier normativa complementaria vigente. Si no está de acuerdo con alguna disposición, deberá abstenerse de utilizar la Plataforma. El uso continuado constituye aceptación plena e incondicional."
              },
              {
                title: "2. Descripción del Servicio",
                body: "System Kyron es una plataforma de inteligencia corporativa diseñada para el mercado venezolano. Integra módulos de contabilidad VEN-NIF con cumplimiento SENIAT, gestión de recursos humanos y nómina bajo normativa LOTTT, telecomunicaciones (líneas 5G/eSIM), servicios legales y permisos, sostenibilidad ambiental (Ameru Eco-Créditos), inteligencia artificial potenciada por Claude de Anthropic, facturación electrónica, gestión de tributos (IVA, ISLR, IGTF, parafiscales), analítica corporativa con KPIs en tiempo real, y sellado criptográfico blockchain para auditoría inmutable."
              },
              {
                title: "3. Registro y Cuentas de Usuario",
                body: "Para acceder a la Plataforma debe crear una cuenta proporcionando información veraz y actualizada, incluyendo nombre, correo electrónico, número de cédula o RIF y, para personas jurídicas, datos de constitución empresarial. Usted es el único responsable de mantener la confidencialidad de sus credenciales de acceso. Debe notificar de inmediato cualquier uso no autorizado de su cuenta a infosystemkyron@gmail.com. System Kyron se reserva el derecho de suspender o cancelar cuentas que incumplan estos términos o presenten actividad sospechosa."
              },
              {
                title: "4. Tipos de Cuenta",
                body: "La Plataforma ofrece cuentas para personas naturales y personas jurídicas. Las cuentas de persona natural permiten acceso a módulos personales, telecomunicaciones y consultas. Las cuentas de persona jurídica habilitan adicionalmente contabilidad empresarial, nómina, facturación, gestión de tributos y módulos corporativos. Cada tipo de cuenta tiene funcionalidades, límites y obligaciones específicas según el plan contratado."
              },
              {
                title: "5. Uso Aceptable",
                body: "Usted se compromete a: (a) utilizar la Plataforma exclusivamente para fines lícitos y conforme a la legislación venezolana vigente; (b) no realizar ingeniería inversa, descompilar ni intentar extraer el código fuente; (c) no distribuir malware, scripts automatizados o cualquier elemento que comprometa la seguridad del sistema; (d) no suplantar la identidad de terceros ni proporcionar información fiscal o legal falsa; (e) no utilizar la Plataforma para evadir obligaciones tributarias; (f) no intentar acceder a datos de otros usuarios sin autorización. El incumplimiento de cualquiera de estas disposiciones puede resultar en la terminación inmediata de su cuenta."
              },
              {
                title: "6. Datos Fiscales y Contables",
                body: "Los módulos de contabilidad, facturación y tributos de la Plataforma son herramientas de apoyo diseñadas conforme a las normas VEN-NIF, la legislación del SENIAT y la Gaceta Oficial vigente. Sin embargo, System Kyron no sustituye la asesoría de un contador público colegiado ni la obligación del usuario de verificar la exactitud de sus declaraciones fiscales. La responsabilidad final ante el SENIAT, alcaldías, y cualquier organismo regulador recae exclusivamente en el usuario. Se recomienda encarecidamente la validación profesional de toda declaración antes de su presentación oficial."
              },
              {
                title: "7. Inteligencia Artificial",
                body: "La Plataforma integra servicios de inteligencia artificial (Kyron AI, potenciado por Claude de Anthropic) para generación de contratos, análisis fiscal predictivo, asistencia contable, clasificación de residuos y otras funcionalidades. Los resultados generados por IA son orientativos y no constituyen asesoramiento legal, fiscal o contable certificado. El usuario debe validar y revisar toda salida de IA antes de su uso formal. System Kyron no garantiza la exactitud absoluta de los resultados generados por inteligencia artificial."
              },
              {
                title: "8. Telecomunicaciones",
                body: "Los servicios de telecomunicaciones ofrecidos a través de la Plataforma (líneas 5G, eSIM, recarga, gestión de flota) están sujetos a las regulaciones de CONATEL y la normativa venezolana de telecomunicaciones. System Kyron actúa como intermediario tecnológico y los servicios de conectividad son provistos por operadores autorizados. La disponibilidad, cobertura y calidad de señal dependen del operador y la ubicación geográfica."
              },
              {
                title: "9. Blockchain y Auditoría Inmutable",
                body: "La Plataforma emplea tecnología de sellado criptográfico SHA-256 y anclaje blockchain para garantizar la inmutabilidad de registros de auditoría críticos. Las pruebas de existencia (proof-of-existence) se anclan en redes blockchain públicas (Polygon, Ethereum, BSC) mediante raíz de Merkle. Estos sellos constituyen una capa adicional de verificabilidad pero no reemplazan las obligaciones legales de archivo y conservación documental establecidas por la legislación venezolana."
              },
              {
                title: "10. Propiedad Intelectual",
                body: "Todo el contenido, diseño, código fuente, algoritmos, marcas, logotipos, interfaz de usuario, documentación y funcionalidades de la Plataforma son propiedad exclusiva de System Kyron y están protegidos por las leyes de propiedad intelectual de la República Bolivariana de Venezuela, tratados internacionales aplicables y la Ley sobre Derecho de Autor. Queda estrictamente prohibida la reproducción, distribución, modificación o uso no autorizado de cualquier elemento de la Plataforma."
              },
              {
                title: "11. Disponibilidad del Servicio",
                body: "System Kyron se esfuerza por mantener la Plataforma disponible las 24 horas del día, los 7 días de la semana. Sin embargo, no garantiza disponibilidad ininterrumpida. Pueden producirse interrupciones por mantenimiento programado, actualizaciones del sistema, fuerza mayor, fallas de infraestructura de terceros o circunstancias fuera de nuestro control. Se realizarán esfuerzos razonables para notificar interrupciones programadas con antelación."
              },
              {
                title: "12. Limitación de Responsabilidad",
                body: "System Kyron no será responsable por: (a) daños indirectos, incidentales, especiales, consecuentes o punitivos; (b) pérdida de datos, beneficios o reputación comercial; (c) errores en cálculos fiscales no verificados por un profesional; (d) interrupciones de servicio por causas de fuerza mayor; (e) acciones de terceros que comprometan la seguridad de su cuenta. La responsabilidad total acumulada no excederá el monto pagado por usted en los últimos doce (12) meses."
              },
              {
                title: "13. Planes, Pagos y Facturación",
                body: "Los servicios pueden ofrecerse bajo planes gratuitos y de pago. Los planes de pago se facturan mensual o anualmente según la modalidad contratada. Los precios están expresados en dólares estadounidenses (USD) y pueden convertirse a bolívares al tipo de cambio oficial BCV vigente al momento del pago. System Kyron se reserva el derecho de modificar los precios con 30 días de aviso previo. No se realizan reembolsos por períodos parciales de uso."
              },
              {
                title: "14. Terminación",
                body: "Cualquiera de las partes puede terminar la relación en cualquier momento. Usted puede cerrar su cuenta desde la configuración de la Plataforma. System Kyron puede suspender o terminar su acceso por incumplimiento de estos términos, actividad fraudulenta o solicitud de autoridad competente. Tras la terminación, los datos fiscales y contables se conservarán por el período legalmente requerido (mínimo 6 años conforme a la legislación venezolana)."
              },
              {
                title: "15. Legislación Aplicable y Jurisdicción",
                body: "Estos Términos se rigen por las leyes de la República Bolivariana de Venezuela. Cualquier controversia se someterá a los tribunales competentes de la ciudad de Caracas, Distrito Capital. Antes de acudir a la vía jurisdiccional, las partes se comprometen a intentar resolver la controversia mediante negociación directa por un período mínimo de treinta (30) días."
              },
              {
                title: "16. Modificaciones",
                body: "System Kyron se reserva el derecho de modificar estos Términos en cualquier momento. Los cambios sustanciales serán notificados mediante correo electrónico o aviso en la Plataforma con al menos quince (15) días de anticipación. El uso continuado de la Plataforma después de la fecha de entrada en vigor constituye aceptación de los términos modificados."
              },
              {
                title: "17. Contacto",
                body: "Para consultas, reclamaciones o ejercicio de derechos relacionados con estos Términos de Servicio: infosystemkyron@gmail.com — Caracas, Venezuela, Distrito Capital."
              },
            ].map((section, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border/50 bg-card/30 space-y-2">
                <h2 className="text-sm font-black uppercase tracking-wide text-foreground">{section.title}</h2>
                <p className="text-sm leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
