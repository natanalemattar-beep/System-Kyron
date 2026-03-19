import { Link } from "@/navigation";
import { ChevronLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Política de Privacidad — System Kyron" };

export default function PrivacyPage() {
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
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter text-foreground">Política de Privacidad</h1>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">System Kyron v2.6.5 • Última actualización: Enero 2026</p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            {[
              {
                title: "1. Información que Recopilamos",
                body: "Recopilamos información que usted nos proporciona directamente, como nombre, correo electrónico, número de cédula o RIF, y datos de empresa al crear una cuenta. También recopilamos datos de uso del sistema para mejorar nuestros servicios."
              },
              {
                title: "2. Uso de la Información",
                body: "Usamos la información para proveer, mantener y mejorar nuestros servicios; procesar transacciones; enviar notificaciones relacionadas con su cuenta; cumplir con obligaciones legales; y para análisis internos para mejorar la plataforma."
              },
              {
                title: "3. Protección de Datos",
                body: "Implementamos medidas de seguridad de nivel empresarial incluyendo cifrado AES-256, tokens JWT con caducidad, hashing bcrypt para contraseñas, y SSL/TLS para todas las transmisiones. Sus datos fiscales y financieros son tratados con la máxima confidencialidad."
              },
              {
                title: "4. Compartición de Información",
                body: "No vendemos, intercambiamos ni transferimos a terceros su información de identificación personal, excepto cuando sea necesario para proveer los servicios solicitados o cuando sea requerido por ley venezolana, incluyendo solicitudes del SENIAT u otras autoridades competentes."
              },
              {
                title: "5. Cookies y Tecnologías Similares",
                body: "Utilizamos cookies para mantener sesiones de usuario seguras, recordar preferencias de idioma y tema, y analizar el tráfico del sitio de forma anónima. Puede controlar el uso de cookies a través de la configuración de su navegador."
              },
              {
                title: "6. Retención de Datos",
                body: "Conservamos sus datos mientras su cuenta esté activa o según sea necesario para proveer servicios. Los datos fiscales y contables se conservan por el período mínimo requerido por la legislación venezolana (generalmente 6 años)."
              },
              {
                title: "7. Sus Derechos",
                body: "Tiene derecho a acceder, corregir o eliminar sus datos personales. Puede solicitar una exportación de sus datos, oponerse al procesamiento de sus datos, y retirar el consentimiento en cualquier momento. Para ejercer estos derechos, contáctenos."
              },
              {
                title: "8. Datos de Menores",
                body: "System Kyron no está dirigido a personas menores de 18 años. No recopilamos conscientemente datos personales de menores. Si detecta que un menor ha proporcionado datos, contáctenos de inmediato."
              },
              {
                title: "9. Cambios a esta Política",
                body: "Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios significativos mediante un aviso en el servicio o por correo electrónico. La fecha de la última actualización siempre estará indicada en esta página."
              },
              {
                title: "10. Contacto DPO",
                body: "Para preguntas sobre privacidad y protección de datos: infosystemkyron@gmail.com — Caracas, Venezuela, Distrito Capital."
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
