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
              <h1 className="text-3xl font-black uppercase tracking-tight text-foreground">Política de Privacidad</h1>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">System Kyron • Última actualización: Marzo 2026</p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            {[
              {
                title: "1. Responsable del Tratamiento",
                body: "System Kyron, con domicilio en Caracas, Distrito Capital, República Bolivariana de Venezuela, es el responsable del tratamiento de los datos personales recopilados a través de la Plataforma. Para cualquier consulta relacionada con la protección de sus datos, puede contactarnos en infosystemkyron@gmail.com."
              },
              {
                title: "2. Datos que Recopilamos",
                body: "Recopilamos las siguientes categorías de datos: (a) Datos de identificación: nombre completo, cédula de identidad, RIF, correo electrónico, número telefónico, estado de residencia y, para personas jurídicas, razón social, datos de constitución y registro mercantil. (b) Datos fiscales y contables: información de facturas, declaraciones tributarias, libros contables, transacciones financieras y documentos legales procesados en la Plataforma. (c) Datos de uso: dirección IP, tipo de dispositivo, navegador, páginas visitadas, acciones realizadas, marca temporal de accesos y preferencias de configuración. (d) Datos de telecomunicaciones: información de líneas asociadas, consumo de datos/minutos y transacciones de recarga (cuando aplique). (e) Datos biométricos de verificación: códigos OTP enviados por SMS, correo electrónico o WhatsApp para autenticación de dos factores."
              },
              {
                title: "3. Finalidad del Tratamiento",
                body: "Utilizamos sus datos para: (a) proveer, mantener y mejorar los servicios de la Plataforma; (b) procesar transacciones y generar documentos fiscales; (c) enviar notificaciones de seguridad, alertas fiscales y comunicaciones operativas; (d) cumplir con obligaciones legales ante el SENIAT, CONATEL y demás organismos reguladores; (e) generar análisis internos anonimizados para mejorar el servicio; (f) prevenir fraude y actividad no autorizada; (g) alimentar los modelos de inteligencia artificial para ofrecer recomendaciones personalizadas (sin compartir datos individuales con terceros)."
              },
              {
                title: "4. Base Legal del Tratamiento",
                body: "El tratamiento de sus datos se fundamenta en: (a) su consentimiento expreso al registrarse y aceptar estos términos; (b) la ejecución del contrato de servicio entre usted y System Kyron; (c) el cumplimiento de obligaciones legales, especialmente en materia fiscal (Código Orgánico Tributario) y de telecomunicaciones (Ley Orgánica de Telecomunicaciones); (d) el interés legítimo de System Kyron en mejorar y proteger la Plataforma."
              },
              {
                title: "5. Medidas de Seguridad",
                body: "Implementamos medidas de seguridad de nivel bancario para proteger sus datos: (a) cifrado AES-256 para datos en reposo; (b) protocolo TLS/SSL para todas las transmisiones; (c) autenticación JWT con cookies HTTP-only y SameSite strict; (d) hashing bcrypt con salt para contraseñas; (e) autenticación de dos factores (2FA) vía SMS, correo electrónico o WhatsApp; (f) sellado criptográfico SHA-256 con anclaje blockchain para registros de auditoría; (g) registro inmutable de todas las acciones del sistema; (h) monitoreo activo de amenazas y accesos sospechosos; (i) copias de seguridad cifradas con retención configurada."
              },
              {
                title: "6. Compartición de Datos con Terceros",
                body: "No vendemos, alquilamos ni intercambiamos sus datos personales con terceros para fines comerciales. Solo compartimos información en los siguientes casos: (a) con proveedores de servicios esenciales (infraestructura cloud, servicios de correo electrónico, SMS) bajo acuerdos de confidencialidad estrictos; (b) con operadores de telecomunicaciones autorizados para la provisión de líneas y servicios contratados; (c) con proveedores de inteligencia artificial (Anthropic/Claude) en formato anonimizado para procesamiento de consultas; (d) cuando sea requerido por ley, orden judicial o solicitud formal de autoridades venezolanas competentes (SENIAT, CONATEL, Ministerio Público)."
              },
              {
                title: "7. Cookies y Tecnologías de Seguimiento",
                body: "Utilizamos cookies estrictamente necesarias para: (a) mantener su sesión de usuario activa y segura; (b) recordar sus preferencias de idioma (español/inglés) y tema (claro/oscuro); (c) verificar el rendimiento del dispositivo para optimizar la experiencia visual. No utilizamos cookies de publicidad ni rastreadores de terceros. Puede gestionar las cookies desde la configuración de su navegador, sin embargo, la desactivación de cookies esenciales puede afectar el funcionamiento de la Plataforma."
              },
              {
                title: "8. Retención de Datos",
                body: "Conservamos sus datos durante el tiempo necesario para cumplir las finalidades descritas: (a) datos de cuenta: mientras su cuenta permanezca activa y hasta 12 meses después de su cierre; (b) datos fiscales y contables: por un mínimo de seis (6) años conforme al Código Orgánico Tributario venezolano; (c) registros de auditoría: de forma indefinida dado su carácter inmutable y sellado criptográfico; (d) datos de uso y analítica: anonimizados después de 24 meses; (e) datos de telecomunicaciones: conforme a los plazos establecidos por CONATEL."
              },
              {
                title: "9. Sus Derechos",
                body: "Conforme a la legislación venezolana y las mejores prácticas internacionales, usted tiene derecho a: (a) Acceso: solicitar una copia de todos los datos personales que poseemos sobre usted; (b) Rectificación: corregir datos inexactos o desactualizados; (c) Supresión: solicitar la eliminación de sus datos, salvo aquellos que debamos conservar por obligación legal; (d) Portabilidad: recibir sus datos en formato estructurado y legible por máquina; (e) Oposición: oponerse al tratamiento de sus datos para fines específicos; (f) Limitación: solicitar la restricción temporal del tratamiento en casos específicos; (g) Revocación del consentimiento: retirar su consentimiento en cualquier momento sin efecto retroactivo. Para ejercer cualquiera de estos derechos, envíe una solicitud a infosystemkyron@gmail.com con asunto \"Ejercicio de Derechos\". Responderemos en un plazo máximo de quince (15) días hábiles."
              },
              {
                title: "10. Protección de Datos de Menores",
                body: "System Kyron no está dirigido a personas menores de dieciocho (18) años. No recopilamos conscientemente datos personales de menores de edad. Los módulos de telecomunicaciones para líneas infantiles requieren autorización expresa de un representante legal mayor de edad. Si detectamos que un menor ha proporcionado datos sin autorización parental, procederemos a su eliminación inmediata."
              },
              {
                title: "11. Transferencias Internacionales",
                body: "Algunos de nuestros servicios de infraestructura (servidores, procesamiento de IA) pueden estar alojados fuera de Venezuela. En estos casos, garantizamos que los proveedores cumplen estándares de protección de datos equivalentes o superiores a los exigidos por la legislación venezolana, mediante cláusulas contractuales tipo y certificaciones de seguridad reconocidas internacionalmente."
              },
              {
                title: "12. Notificación de Brechas de Seguridad",
                body: "En caso de una brecha de seguridad que comprometa datos personales, System Kyron se compromete a: (a) notificar a los usuarios afectados en un plazo máximo de setenta y dos (72) horas; (b) informar a las autoridades competentes cuando sea requerido por ley; (c) implementar medidas correctivas inmediatas para contener y mitigar el incidente; (d) documentar las acciones tomadas en el registro de auditoría inmutable."
              },
              {
                title: "13. Cambios a esta Política",
                body: "System Kyron puede actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas, tecnología o legislación aplicable. Los cambios sustanciales serán notificados mediante correo electrónico o aviso en la Plataforma con al menos quince (15) días de anticipación. La fecha de última actualización siempre estará indicada al inicio de este documento."
              },
              {
                title: "14. Contacto del Responsable de Protección de Datos",
                body: "Para preguntas, consultas o reclamaciones sobre privacidad y protección de datos personales: infosystemkyron@gmail.com — System Kyron, Caracas, Venezuela, Distrito Capital."
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
