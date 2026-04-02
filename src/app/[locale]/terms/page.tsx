import { Link } from "@/navigation";
import { ChevronLeft, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Terminos de Servicio — System Kyron" };

const sections = [
  {
    title: "1. Aceptacion de Terminos",
    body: "Al acceder, registrarse o utilizar cualquier funcionalidad de System Kyron (en adelante, \"la Plataforma\"), usted acepta cumplir integramente estos Terminos de Servicio, asi como la Politica de Privacidad y cualquier normativa complementaria vigente. Si no esta de acuerdo con alguna disposicion, debera abstenerse de utilizar la Plataforma. El uso continuado constituye aceptacion plena e incondicional. Estos terminos se aplican a todas las versiones de la Plataforma, incluyendo aplicaciones web, moviles y cualquier interfaz futura."
  },
  {
    title: "2. Descripcion del Servicio",
    body: "System Kyron es una plataforma de inteligencia corporativa disenada para el mercado venezolano. Integra los siguientes modulos y servicios: (a) Contabilidad VEN-NIF con cumplimiento SENIAT, incluyendo 10 sub-modulos de analisis financiero; (b) Gestion de recursos humanos y nomina bajo normativa LOTTT, con modulos de prestaciones sociales, reclutamiento, bienestar laboral, clima organizacional, salud y seguridad ocupacional; (c) Telecomunicaciones (lineas 5G/eSIM) bajo regulaciones CONATEL; (d) Servicios legales, permisos y escritorio juridico; (e) Facturacion electronica homologada segun Providencia SNAT/2011/0071, incluyendo facturas, proformas, notas de debito y credito, facturacion a credito; (f) Sistema multimoneda con visualizacion en VES, USD y EUR; (g) Sostenibilidad ambiental con Eco-Creditos Ameru; (h) Inteligencia artificial Kyron AI potenciada por Claude de Anthropic, Gemini y OpenAI; (i) Gestion de tributos (IVA 16%, ISLR, IGTF 3%, parafiscales IVSS/FAOV/LPH/INCES); (j) Analitica corporativa con KPIs en tiempo real; (k) Sellado criptografico SHA-256 y anclaje blockchain para auditoria inmutable; (l) Modulo de Informatica/IT con helpdesk, infraestructura y respaldos; (m) Portal de Socios y Directivos; (n) Cuenta Personal del Ciudadano con documentos civiles; (o) Fidelizacion de clientes y estrategias de ventas; (p) Billetera digital y 26+ pasarelas de pago con 29 bancos venezolanos; (q) Motor de automatizacion para tareas programadas."
  },
  {
    title: "3. Registro y Cuentas de Usuario",
    body: "Para acceder a la Plataforma debe crear una cuenta proporcionando informacion veraz y actualizada, incluyendo nombre completo, correo electronico, numero de cedula o RIF y, para personas juridicas, datos de constitucion empresarial (razon social, domicilio fiscal, objeto social). Usted es el unico responsable de mantener la confidencialidad de sus credenciales de acceso, incluyendo contrasena y codigos de autenticacion de dos factores (2FA). Debe notificar de inmediato cualquier uso no autorizado de su cuenta a infosystemkyron@gmail.com. System Kyron se reserva el derecho de suspender o cancelar cuentas que incumplan estos terminos, presenten actividad sospechosa o proporcionen datos falsos."
  },
  {
    title: "4. Tipos de Cuenta y Planes de Suscripcion",
    body: "La Plataforma ofrece cuentas para personas naturales y personas juridicas. Las cuentas de persona natural permiten acceso a modulos personales (documentos civiles, partidas, antecedentes, carnet digital, tarjeta de reciclaje, directorio medico), telecomunicaciones y consultas. Las cuentas de persona juridica habilitan adicionalmente contabilidad empresarial, nomina, facturacion, gestion de tributos, modulos corporativos, portal de socios, gestion multi-sede y modulos de IT. Existen 4 planes de suscripcion progresivos con limites especificos de recursos (usuarios, facturas, almacenamiento, modulos) que escalan con las necesidades de la organizacion. Cada plan puede contratarse en modalidad mensual o anual."
  },
  {
    title: "5. Sistema Multimoneda",
    body: "La Plataforma incorpora un sistema de visualizacion multimoneda que permite ver valores monetarios en Bolivares (VES), Dolares (USD) o Euros (EUR). Es importante destacar que este sistema es exclusivamente de referencia visual: todos los montos se almacenan, procesan y reportan en Bolivares (VES) para cumplir con la normativa del SENIAT y las regulaciones fiscales venezolanas. Las tasas de cambio mostradas son referenciales y se basan en publicaciones del Banco Central de Venezuela (BCV). System Kyron no garantiza la exactitud de las tasas de conversion ni asume responsabilidad por variaciones cambiarias entre el momento de la consulta y la ejecucion de transacciones."
  },
  {
    title: "6. Uso Aceptable",
    body: "Usted se compromete a: (a) utilizar la Plataforma exclusivamente para fines licitos y conforme a la legislacion venezolana vigente; (b) no realizar ingenieria inversa, descompilar ni intentar extraer el codigo fuente; (c) no distribuir malware, scripts automatizados o cualquier elemento que comprometa la seguridad del sistema; (d) no suplantar la identidad de terceros ni proporcionar informacion fiscal o legal falsa; (e) no utilizar la Plataforma para evadir obligaciones tributarias; (f) no intentar acceder a datos de otros usuarios sin autorizacion; (g) no eludir las medidas de seguridad, incluyendo autenticacion 2FA, rate limiting y controles de acceso; (h) no utilizar la Plataforma para actividades de lavado de dinero, financiamiento del terrorismo u otras actividades ilicitas; (i) no exceder deliberadamente los limites de su plan de suscripcion. El incumplimiento de cualquiera de estas disposiciones puede resultar en la terminacion inmediata de su cuenta y la notificacion a las autoridades competentes."
  },
  {
    title: "7. Datos Fiscales y Contables",
    body: "Los modulos de contabilidad, facturacion y tributos de la Plataforma son herramientas de apoyo disenadas conforme a las normas VEN-NIF, la legislacion del SENIAT, la Gaceta Oficial vigente y la Providencia SNAT/2011/0071 para facturacion electronica. Sin embargo, System Kyron no sustituye la asesoria de un contador publico colegiado ni la obligacion del usuario de verificar la exactitud de sus declaraciones fiscales. Los calculos de IVA (16%), IGTF (3%), ISLR, retenciones, parafiscales (IVSS, FAOV, LPH, INCES), prestaciones sociales LOTTT, Reajuste por Inflacion Fiscal (RIPF) y demas obligaciones tributarias son orientativos y deben ser validados profesionalmente. La responsabilidad final ante el SENIAT, alcaldias, IVSS y cualquier organismo regulador recae exclusivamente en el usuario. El sistema de alertas fiscales (30+ obligaciones monitoreadas) es informativo y no garantiza el cumplimiento total de las obligaciones del contribuyente."
  },
  {
    title: "8. Facturacion Electronica y Documentos Fiscales",
    body: "Los documentos fiscales generados por la Plataforma (facturas, proformas, notas de debito, notas de credito, facturacion a credito) incluyen sellado criptografico SHA-256 para garantizar inmutabilidad. Sin embargo, la validez legal de estos documentos ante el SENIAT depende del cumplimiento de requisitos adicionales que pueden requerir homologacion de equipos fiscales y autorizacion del ente regulador. Los correlativos, formatos y contenido de los documentos se generan conforme a la Providencia 0071, pero el usuario es responsable de verificar su conformidad con los requisitos especificos de su actividad economica."
  },
  {
    title: "9. Inteligencia Artificial",
    body: "La Plataforma integra servicios de inteligencia artificial (Kyron AI) potenciados por Claude de Anthropic, Google Gemini y OpenAI para: generacion de contratos y documentos legales, analisis fiscal predictivo, asistencia contable, clasificacion de residuos, atencion automatizada al usuario con 10+ identidades contextuales, y generacion de reportes. Los resultados generados por IA son orientativos y no constituyen asesoramiento legal, fiscal o contable certificado. El usuario debe validar y revisar toda salida de IA antes de su uso formal, especialmente documentos legales, calculos fiscales y recomendaciones financieras. System Kyron no garantiza la exactitud absoluta de los resultados generados por inteligencia artificial ni se responsabiliza por decisiones tomadas con base en dichos resultados."
  },
  {
    title: "10. Telecomunicaciones",
    body: "Los servicios de telecomunicaciones ofrecidos a traves de la Plataforma (lineas 5G, eSIM, recarga, gestion de flota empresarial, consumo, facturacion corporativa, homologacion IMEI, reportes de flota y limites corporativos) estan sujetos a las regulaciones de CONATEL y la normativa venezolana de telecomunicaciones. System Kyron actua como intermediario tecnologico y los servicios de conectividad son provistos por operadores autorizados. La disponibilidad, cobertura y calidad de senal dependen del operador y la ubicacion geografica. Las activaciones de eSIM estan sujetas a verificacion de identidad y disponibilidad del servicio."
  },
  {
    title: "11. Recursos Humanos y Nomina",
    body: "Los modulos de recursos humanos y nomina estan disenados conforme a la Ley Organica del Trabajo, los Trabajadores y las Trabajadoras (LOTTT) y la normativa laboral venezolana vigente. Los calculos de nomina, vacaciones, utilidades, prestaciones sociales, aportes parafiscales (IVSS, FAOV, LPH, INCES) y demas obligaciones laborales son herramientas de apoyo. El usuario empleador es el unico responsable del cumplimiento de sus obligaciones laborales ante SUNAGEL, IVSS, INCES y demas entes reguladores. Los recibos de pago digitales generados y enviados por WhatsApp tienen caracter informativo; su validez legal como comprobante depende de la legislacion aplicable."
  },
  {
    title: "12. Blockchain y Auditoria Inmutable",
    body: "La Plataforma emplea tecnologia de sellado criptografico SHA-256 y anclaje blockchain para garantizar la inmutabilidad de registros de auditoria criticos. Las pruebas de existencia (proof-of-existence) se anclan en redes blockchain publicas (Polygon, Ethereum, BSC) mediante raiz de Merkle, procesadas por el motor de automatizacion del sistema. Estos sellos constituyen una capa adicional de verificabilidad pero no reemplazan las obligaciones legales de archivo y conservacion documental establecidas por la legislacion venezolana. Los costos de gas (transaction fees) en redes blockchain son asumidos por System Kyron dentro de los limites del plan contratado."
  },
  {
    title: "13. Seguridad y Proteccion de Datos",
    body: "System Kyron implementa multiples capas de seguridad: cifrado AES-256, autenticacion de dos factores (2FA) via email, SMS y WhatsApp, tokens JWT con cookies HTTP-only, cabeceras de seguridad (CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Permissions-Policy), rate limiting con bloqueo por fuerza bruta, validacion de complejidad de contrasena, sanitizacion de entradas, consultas SQL parametrizadas e indices compuestos. A pesar de estas medidas, ninguna plataforma puede garantizar seguridad absoluta. El usuario es responsable de mantener la seguridad de sus credenciales y dispositivos. System Kyron notificara cualquier incidente de seguridad significativo de acuerdo con la legislacion aplicable."
  },
  {
    title: "14. Propiedad Intelectual",
    body: "Todo el contenido, diseno, codigo fuente, algoritmos, marcas, logotipos, interfaz de usuario (diseno HUD Titanium), documentacion, animaciones, componentes de interfaz y funcionalidades de la Plataforma son propiedad exclusiva de System Kyron y estan protegidos por las leyes de propiedad intelectual de la Republica Bolivariana de Venezuela, tratados internacionales aplicables y la Ley sobre Derecho de Autor. Queda estrictamente prohibida la reproduccion, distribucion, modificacion o uso no autorizado de cualquier elemento de la Plataforma. El Modelo ZEDU AutoMind AI es propiedad intelectual compartida con el Colegio Santa Rosa de Lima."
  },
  {
    title: "15. Disponibilidad del Servicio",
    body: "System Kyron se esfuerza por mantener la Plataforma disponible las 24 horas del dia, los 7 dias de la semana. Sin embargo, no garantiza disponibilidad ininterrumpida. Pueden producirse interrupciones por mantenimiento programado, actualizaciones del sistema, fuerza mayor, fallas de infraestructura de terceros (incluyendo proveedores de IA, blockchain y telecomunicaciones), situaciones de fuerza mayor o circunstancias fuera de nuestro control. Se realizaran esfuerzos razonables para notificar interrupciones programadas con antelacion mediante el sistema de notificaciones de la Plataforma y correo electronico."
  },
  {
    title: "16. Limitacion de Responsabilidad",
    body: "System Kyron no sera responsable por: (a) danos indirectos, incidentales, especiales, consecuentes o punitivos; (b) perdida de datos, beneficios o reputacion comercial; (c) errores en calculos fiscales, contables o laborales no verificados por un profesional; (d) resultados incorrectos de la inteligencia artificial; (e) interrupciones de servicio por causas de fuerza mayor; (f) acciones de terceros que comprometan la seguridad de su cuenta; (g) variaciones en tasas de cambio entre la visualizacion multimoneda y las tasas reales; (h) fallas en servicios de terceros (blockchain, telecomunicaciones, IA, email, SMS); (i) perdida de Eco-Creditos por mal uso o incumplimiento de terminos. La responsabilidad total acumulada no excedera el monto pagado por usted en los ultimos doce (12) meses."
  },
  {
    title: "17. Planes, Pagos y Facturacion",
    body: "Los servicios se ofrecen bajo 4 planes de suscripcion progresivos (gratuito y de pago). Los planes de pago se facturan mensual o anualmente segun la modalidad contratada, con descuento para facturacion anual. Los precios estan expresados en dolares estadounidenses (USD) y pueden convertirse a bolivares al tipo de cambio oficial BCV vigente al momento del pago. System Kyron se reserva el derecho de modificar los precios con 30 dias de aviso previo. No se realizan reembolsos por periodos parciales de uso. Los limites de recursos de cada plan (usuarios, facturas, almacenamiento, modulos) se aplican de forma estricta; al alcanzar un limite, la funcionalidad afectada se restringe hasta la renovacion o upgrade del plan."
  },
  {
    title: "18. Sostenibilidad y Eco-Creditos Ameru",
    body: "El programa Ameru de Eco-Creditos permite a los usuarios acumular creditos mediante actividades de reciclaje verificadas por IA. Estos creditos son intercambiables dentro del ecosistema System Kyron y no tienen valor monetario fuera de la Plataforma. System Kyron se reserva el derecho de modificar las tasas de acumulacion y canje de Eco-Creditos. Los Eco-Creditos no son transferibles a terceros fuera de la Plataforma, no generan intereses y pueden expirar segun las politicas vigentes. La clasificacion de materiales por IA es orientativa y puede contener errores."
  },
  {
    title: "19. Cuenta Personal del Ciudadano",
    body: "La seccion de Cuenta Personal almacena documentos personales digitalizados (cedula, partidas de nacimiento, actas de matrimonio, antecedentes penales, documentos judiciales, registro de RIF). System Kyron protege estos documentos con cifrado AES-256 pero no se responsabiliza por la autenticidad de los documentos cargados por el usuario. Los calculos de manutencion LOPNNA son referenciales y no sustituyen una determinacion judicial. El directorio medico es informativo y no constituye una recomendacion medica."
  },
  {
    title: "20. Terminacion",
    body: "Cualquiera de las partes puede terminar la relacion en cualquier momento. Usted puede cerrar su cuenta desde la configuracion de la Plataforma. System Kyron puede suspender o terminar su acceso por incumplimiento de estos terminos, actividad fraudulenta, solicitud de autoridad competente o falta de pago por mas de 30 dias. Tras la terminacion, los datos fiscales y contables se conservaran por el periodo legalmente requerido (minimo 6 anos conforme a la legislacion venezolana). Los datos personales se eliminaran conforme a la Politica de Privacidad. Los Eco-Creditos no utilizados se perderan al cierre de la cuenta."
  },
  {
    title: "21. Legislacion Aplicable y Jurisdiccion",
    body: "Estos Terminos se rigen por las leyes de la Republica Bolivariana de Venezuela. Cualquier controversia se sometera a los tribunales competentes de la ciudad de Caracas, Distrito Capital. Antes de acudir a la via jurisdiccional, las partes se comprometen a intentar resolver la controversia mediante negociacion directa por un periodo minimo de treinta (30) dias. Las referencias a leyes, regulaciones y entes gubernamentales (SENIAT, CONATEL, LOTTT, SAREN, SAPI, IVSS, INCES, BCV, entre otros) se basan en la normativa vigente a la fecha de publicacion de estos terminos."
  },
  {
    title: "22. Modificaciones",
    body: "System Kyron se reserva el derecho de modificar estos Terminos en cualquier momento. Los cambios sustanciales seran notificados mediante correo electronico, notificacion en la Plataforma o ambos, con al menos quince (15) dias de anticipacion. El uso continuado de la Plataforma despues de la fecha de entrada en vigor constituye aceptacion de los terminos modificados. Si no esta de acuerdo con los nuevos terminos, debera dejar de utilizar la Plataforma y solicitar el cierre de su cuenta."
  },
  {
    title: "23. Separabilidad",
    body: "Si alguna disposicion de estos Terminos es declarada nula, invalida o inaplicable por un tribunal competente, las demas disposiciones seguiran en pleno vigor y efecto. La disposicion afectada sera modificada en la medida minima necesaria para hacerla valida y aplicable, preservando la intencion original de las partes."
  },
  {
    title: "24. Acuerdo Completo",
    body: "Estos Terminos de Servicio, junto con la Politica de Privacidad y cualquier acuerdo adicional suscrito entre las partes, constituyen el acuerdo completo entre usted y System Kyron. Cualquier acuerdo previo, verbal o escrito, queda sin efecto. Las comunicaciones informales o de soporte tecnico no modifican estos terminos salvo que se formalicen por escrito."
  },
  {
    title: "25. Contacto",
    body: "Para consultas, reclamaciones, ejercicio de derechos o notificaciones relacionadas con estos Terminos de Servicio: Correo electronico: infosystemkyron@gmail.com — Direccion: Caracas, Venezuela, Distrito Capital. Horario de atencion: Lunes a Viernes, 8:00 AM - 6:00 PM (hora de Venezuela, UTC-4). Asistencia automatizada 24/7 mediante Kyron AI."
  }
];

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
              <h1 className="text-3xl font-black uppercase tracking-tight text-foreground">Terminos de Servicio</h1>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">System Kyron v3.0 &bull; Ultima actualizacion: Abril 2026</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-primary/20 bg-primary/5 flex items-start gap-4">
            <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-foreground mb-1">Documento Legal Vigente</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Estos terminos regulan el uso de la plataforma System Kyron, incluyendo todos sus modulos: contabilidad VEN-NIF, facturacion SENIAT, recursos humanos LOTTT, telecomunicaciones CONATEL, inteligencia artificial, blockchain, sistema multimoneda, sostenibilidad Ameru, modulo IT, portal de socios, cuenta personal del ciudadano y todos los demas servicios integrados. Al utilizar la plataforma, usted acepta estos terminos en su totalidad. {sections.length} clausulas vigentes.
              </p>
            </div>
          </div>

          <div className="prose prose-sm max-w-none space-y-4 text-muted-foreground">
            {sections.map((section, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border/50 bg-card/30 space-y-2">
                <h2 className="text-sm font-black uppercase tracking-wide text-foreground">{section.title}</h2>
                <p className="text-sm leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest">
              System Kyron v3.0 &bull; Inteligencia Corporativa &bull; Caracas, Venezuela &bull; &copy; 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
