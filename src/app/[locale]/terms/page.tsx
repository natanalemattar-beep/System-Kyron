import { Link } from "@/navigation";
import { ChevronLeft, Shield, FileText } from "lucide-react";
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
              <h1 className="text-3xl font-black uppercase tracking-tighter text-foreground">Términos de Servicio</h1>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">System Kyron v2.8.5 • Última actualización: Enero 2026</p>
            </div>
          </div>

          <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
            {[
              {
                title: "1. Aceptación de Términos",
                body: "Al acceder y usar System Kyron, usted acepta cumplir y estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al servicio."
              },
              {
                title: "2. Descripción del Servicio",
                body: "System Kyron es una plataforma de inteligencia corporativa que ofrece herramientas de contabilidad VEN-NIF, gestión de RRHH, cumplimiento fiscal SENIAT, telecomunicaciones, servicios legales y sostenibilidad ambiental para empresas venezolanas."
              },
              {
                title: "3. Cuentas de Usuario",
                body: "Usted es responsable de mantener la confidencialidad de su cuenta y contraseña. Acepta notificar inmediatamente cualquier uso no autorizado de su cuenta. System Kyron no se responsabiliza por pérdidas derivadas del uso no autorizado de su cuenta."
              },
              {
                title: "4. Uso Aceptable",
                body: "Usted acepta no usar el servicio para actividades ilegales, fraudulentas o que violen los derechos de terceros. Está prohibido el acceso no autorizado, la distribución de malware, o cualquier actividad que interfiera con el funcionamiento del sistema."
              },
              {
                title: "5. Propiedad Intelectual",
                body: "El servicio y su contenido original, características y funcionalidades son propiedad exclusiva de System Kyron y están protegidos por leyes de propiedad intelectual venezolanas e internacionales."
              },
              {
                title: "6. Limitación de Responsabilidad",
                body: "System Kyron no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos. La responsabilidad total del servicio no excederá el monto pagado por usted en los últimos doce meses."
              },
              {
                title: "7. Cumplimiento Fiscal",
                body: "System Kyron proporciona herramientas para el cumplimiento fiscal, sin embargo, la responsabilidad final ante el SENIAT y otros organismos recae exclusivamente en el usuario. Recomendamos siempre consultar con un contador certificado."
              },
              {
                title: "8. Modificaciones",
                body: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación. El uso continuo del servicio implica la aceptación de los términos modificados."
              },
              {
                title: "9. Contacto",
                body: "Para consultas sobre estos Términos, contáctenos en: infosystemkyron@gmail.com"
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
