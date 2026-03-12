
"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { 
  BookOpen, 
  ShieldCheck, 
  Zap, 
  Calculator, 
  Users, 
  Lock,
  Smartphone,
  School,
  Download,
  Printer,
  ChevronLeft,
  Loader2,
  CheckCircle,
  Target,
  LayoutDashboard,
  ShoppingCart
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const chapters = [
  {
    id: "bienvenida",
    title: "01. Bienvenida y Acceso al Ecosistema",
    icon: Target,
    content: `¡Te damos la bienvenida oficial a System Kyron! Has dado el paso más importante para modernizar y proteger tu futuro financiero y empresarial. Esta plataforma no es un software común; es un ecosistema de inteligencia corporativa diseñado para que tengas el control total de tus activos en un entorno seguro y profesional. Para comenzar tu experiencia, el proceso de entrada es fundamental. Solo necesitas tu correo electrónico registrado y una contraseña que sea difícil de adivinar para otros. 

Para garantizar que nadie más que tú pueda entrar a tu información, hemos implementado el 'Protocolo de Seguridad Nivel 5'. Esto significa que, después de poner tu clave, el sistema te pedirá un código único que llegará directamente a tu teléfono celular. Este paso adicional se conoce como Verificación en Dos Pasos (2FA) y es tu mejor escudo contra accesos no autorizados. Si tu dispositivo lo permite, también puedes configurar el acceso por huella dactilar o reconocimiento facial, lo que hace que entrar sea tan rápido como mirar tu pantalla o tocar un sensor. Una vez dentro, podrás elegir el 'Portal' que necesites: Personal para tus trámites civiles, o Empresarial para manejar tu negocio.`,
    details: [
      "Elección de Portal: Elige entre el área personal o los módulos de empresa según tu necesidad del momento.",
      "Seguridad Biométrica: Configura tu rostro o huella para entrar sin necesidad de escribir contraseñas largas.",
      "Protección de Datos: Toda la información que subas se guarda bajo un cifrado militar llamado AES-512.",
      "Perfil de Usuario: Mantén tus datos actualizados para que el sistema pueda generar documentos por ti automáticamente."
    ]
  },
  {
    id: "centro-mando",
    title: "02. El Centro de Mando: Tu Oficina Virtual",
    icon: LayoutDashboard,
    content: `El 'Tablero Principal' o 'Centro de Mando' es la pantalla que verás apenas entres al sistema. Ha sido diseñada para ser tu asistente visual personal. En la parte superior, verás tarjetas brillantes que te indican tus ingresos totales, tus gastos y tu utilidad neta en tiempo real. No tienes que esperar al final del mes para saber cuánto dinero tienes; Kyron te lo dice al segundo. El uso de colores es intuitivo: el verde significa éxito y estabilidad, mientras que el rojo o el naranja son avisos preventivos para cosas que requieren tu revisión inmediata.

A la izquierda de la pantalla, siempre tendrás a mano el menú de navegación. Desde allí puedes saltar rápidamente entre Ventas, Contabilidad, Personal o Bóveda Legal. Lo más potente de este tablero es su capacidad de 'Auditoría Preventiva'. Si el sistema detecta que una ley ha cambiado en la Gaceta Oficial, o que tienes una factura que vence mañana, verás una notificación clara en tu panel de alertas. De esta forma, ya no tienes que memorizar fechas de vencimiento; Kyron lo hace por ti, permitiéndote enfocarte en lo que realmente importa: hacer crecer tu negocio.`,
    details: [
      "Gráficos de Pulso: Mira cómo suben tus ventas mediante líneas de tiempo fáciles de comprender.",
      "Alertas de Cumplimiento: Recibe avisos directos sobre pagos de impuestos o trámites por vencer.",
      "Acceso Rápido: Botones configurables para las tareas que realizas con más frecuencia cada día.",
      "Modo Multipantalla: El tablero se adapta perfectamente si lo usas en una computadora, tablet o celular."
    ]
  },
  {
    id: "finanzas",
    title: "03. Finanzas, Impuestos y Blindaje Fiscal",
    icon: Calculator,
    content: `Manejar la contabilidad en Venezuela puede ser un reto, pero con Kyron se convierte en un proceso automático y seguro. Nuestro motor financiero está diseñado bajo las normas VEN-NIF y se mantiene conectado permanentemente con las tasas oficiales del Banco Central de Venezuela. Esto significa que cada factura que emites o recibes se ajusta automáticamente para reflejar el valor real de tu dinero, protegiéndote contra los efectos de la inflación. El sistema saca todas las cuentas difíciles por ti, incluyendo el IVA y el IGTF, asegurando que cada centavo esté en su lugar.

El 'Blindaje Fiscal' es una de nuestras herramientas estrella. Antes de que guardes una factura, Kyron revisa que el RIF del cliente sea válido y que el formato cumpla con lo que exige el SENIAT (Providencia 0071). Si falta algo, el sistema te avisará para corregirlo al instante, evitando que acumules errores que luego podrían convertirse en multas. Al final del periodo, puedes generar tus Libros de Compra y Venta con un solo clic, obteniendo archivos listos para ser subidos al portal fiscal. Es como tener a un equipo de contadores expertos trabajando para ti las 24 horas del día, garantizando el cumplimiento total.`,
    details: [
      "Ajuste por Inflación: Tus cuentas se actualizan solas usando los datos oficiales del BCV.",
      "Libros Fiscales: Genera tus reportes de IVA e ISLR en segundos, sin errores manuales.",
      "Validación de RIF: El sistema verifica automáticamente la identidad fiscal de tus proveedores y clientes.",
      "Conciliación Bancaria: Empareja tus estados de cuenta con tus facturas registradas para evitar fugas de dinero."
    ]
  },
  {
    id: "personal",
    title: "04. Nómina y Gestión de Talento Humano",
    icon: Users,
    content: `Tu equipo es el motor de tu empresa, y cuidarlos es fundamental. El módulo de Gestión de Personal te permite manejar todo el ciclo de vida de tus trabajadores de forma profesional y transparente. Calcular la nómina ahora es una tarea de segundos: el sistema toma el sueldo base y añade automáticamente bonos, cestatickets y retenciones de ley como el IVSS, FAOV e INCES. Al terminar el cálculo, puedes enviar los recibos de pago de forma masiva directamente a los correos electrónicos de tus empleados o a sus números de WhatsApp con un diseño impecable.

Además del pago quincenal o mensual, Kyron lleva el control exacto de la antigüedad de cada trabajador. Puedes consultar en cualquier momento cuánto ha acumulado una persona en prestaciones sociales o generar el cálculo de una liquidación (finiquito) siguiendo estrictamente la LOTTT. Si necesitas emitir una carta de trabajo o una constancia, no tienes que redactarla desde cero; el sistema usa los datos guardados para generar el documento oficial con el sello de tu empresa y un código QR de verificación, lo que le da una validez y un nivel de profesionalismo superior a cualquier documento manual.`,
    details: [
      "Cálculo Automático: Olvídate de las hojas de Excel; Kyron aplica todas las fórmulas de ley por ti.",
      "Recibos Digitales: Envía comprobantes de pago seguros que tus empleados pueden guardar en sus teléfonos.",
      "Control de Vacaciones: El sistema te avisa cuándo le toca descanso a cada integrante de tu equipo.",
      "Archivo de Expedientes: Guarda copias de cédulas, contratos y títulos de tu personal de forma organizada."
    ]
  },
  {
    id: "ventas",
    title: "05. Punto de Venta y Facturación Inteligente",
    icon: ShoppingCart,
    content: `Vender debe ser un proceso rápido y sin complicaciones. El Punto de Venta (TPV) de Kyron ha sido creado para ser táctil, visual y sumamente veloz. Puedes buscar tus productos por nombre, categoría o simplemente usando un escáner de códigos de barras. El sistema maneja múltiples divisas al mismo tiempo: puedes cobrar una parte en bolívares por Pago Móvil y otra parte en dólares en efectivo, y Kyron hará la conversión exacta al instante. Al finalizar cada venta, se genera una factura fiscal con todos los requisitos legales, lista para ser impresa en impresoras térmicas o fiscales homologadas.

El control de tus productos es total. Cada vez que vendes algo, el sistema lo descuenta automáticamente de tu inventario. Si un producto está por agotarse, verás una alerta para que puedas reponerlo a tiempo y nunca pierdas una venta por falta de stock. Al final de la jornada, el proceso de 'Arqueo de Caja' te guía para que cuentes tu efectivo y cheques tus pagos digitales, dándote un reporte detallado de cualquier diferencia. Este nivel de control elimina las pérdidas desconocidas y te da la tranquilidad de que cada centavo que entra a tu negocio está debidamente registrado y justificado.`,
    details: [
      "Cobro Multimoneda: Acepta pagos combinados en Bs. y divisas con cálculo de tasa automático.",
      "Inventario en Tiempo Real: Tus existencias se actualizan con cada clic en el punto de venta.",
      "Facturación Rápida: Registra a tus clientes solo con su cédula y el sistema cargará sus datos fiscales.",
      "Cierres de Caja Seguros: Reportes detallados por turno y cajero para un control administrativo total."
    ]
  },
  {
    id: "boveda",
    title: "06. Bóveda Digital y Documentos Legales",
    icon: Lock,
    content: `En el mundo actual, tus documentos son tus activos más valiosos. La 'Bóveda Digital' de Kyron es un espacio de máxima seguridad donde puedes resguardar tus archivos más sensibles. Aquí puedes subir versiones digitales de tu cédula, RIF, títulos de propiedad, actas constitutivas y contratos. Lo que hace especial a esta bóveda es que utiliza tecnología de 'Sellado Inmutable', lo que garantiza que tus documentos no puedan ser alterados y que siempre tengas una copia fiel disponible, incluso si pierdes los papeles originales. 

Pero no solo sirve para guardar; también es una herramienta de creación. Nuestra Inteligencia Artificial Legal te ayuda a redactar borradores de contratos en cuestión de segundos. Ya sea que necesites un contrato de alquiler, un acuerdo de confidencialidad o un acta de asamblea, solo tienes que ingresar los datos básicos y la IA generará un documento con lenguaje jurídico profesional ajustado a las leyes venezolanas. Además, desde este módulo puedes hacer seguimiento a trámites como la solicitud de antecedentes penales o partidas de nacimiento, recibiendo notificaciones apenas el documento oficial esté listo para descargar.`,
    details: [
      "Cifrado AES-512: Tu información está protegida con el mismo nivel de seguridad que usan los bancos.",
      "Redacción con IA: Genera contratos legales profesionales sin necesidad de plantillas complicadas.",
      "Alertas de Vencimiento: Te avisamos con antelación antes de que caduque tu RIF o tu pasaporte.",
      "Trámites Digitales: Gestiona y recibe documentos oficiales directamente en tu cuenta de Kyron."
    ]
  },
  {
    id: "tecnologia",
    title: "07. Tecnología 5G, eSIM y Sostenibilidad",
    icon: Smartphone,
    content: `System Kyron te conecta con el futuro de las telecomunicaciones y la ecología. A través de nuestro nodo de conectividad, puedes activar líneas telefónicas 5G de alta velocidad en cuestión de minutos. Somos pioneros en el uso de eSIM (chips digitales), lo que significa que puedes activar un número nuevo escaneando un simple código QR, sin necesidad de insertar una tarjeta física en tu teléfono. Esto es ideal para flotas corporativas o para usuarios que necesitan estar conectados de forma inmediata con la red de datos más estable y rápida del ecosistema.

Nuestra visión también incluye el cuidado del planeta a través de la Iniciativa de Sostenibilidad Kyron. Hemos desplegado 'Papeleras Inteligentes' equipadas con tecnología de inducción magnética. Estas estaciones pueden detectar y clasificar materiales como metal y plástico mediante sensores avanzados. Por cada envase que recicles en estas estaciones, el sistema validará la acción y te otorgará 'Eco-Créditos' directamente en tu billetera digital de Kyron. Estos puntos no son solo números; son activos que puedes canjear por descuentos reales, productos de cortesía y beneficios exclusivos en nuestra amplia red de comercios aliados.`,
    details: [
      "Activación Instantánea: Obtén tu número telefónico y plan de datos 5G al momento.",
      "Tecnología eSIM: Activa servicios de comunicación digital sin salir de tu oficina.",
      "Eco-Créditos: Gana recompensas tangibles por tus hábitos de reciclaje responsable.",
      "Impacto Ambiental: Mira en tu tablero cuánto CO2 has ayudado a evitar con tus acciones."
    ]
  },
  {
    id: "soporte",
    title: "08. Academia Kyron y Soporte Técnico",
    icon: School,
    content: `Tu crecimiento es nuestra prioridad, y por eso hemos creado la 'Academia Kyron'. Es un centro de formación dentro de la plataforma donde tú y tu equipo pueden acceder a cursos cortos y prácticos sobre cómo dominar cada herramienta del sistema. Aprenderás desde cómo hacer una declaración de IVA perfecta hasta cómo optimizar tus ventas usando los reportes de IA. Al completar cada curso, el sistema te otorgará un certificado digital que valida tus conocimientos, ayudándote a profesionalizar aún más tu gestión empresarial.

Si en algún momento tienes una duda o surge un inconveniente técnico, nuestro equipo de soporte está siempre a tu disposición. Puedes interactuar con nuestro 'Asistente de Voz IA' para obtener respuestas rápidas sobre funciones del sistema o contactar directamente a nuestros expertos humanos a través del chat prioritario de WhatsApp. No importa si es un problema con una factura o una duda sobre cómo configurar una nueva línea 5G; estamos aquí para asegurar que tu operación nunca se detenga y que siempre sientas el respaldo de una ingeniería de clase mundial a tu lado.`,
    details: [
      "Formación Continua: Cursos nuevos cada mes sobre leyes, finanzas y tecnología avanzada.",
      "Certificados Blockchain: Obtén diplomas digitales inalterables que demuestran tu pericia técnica.",
      "Asistencia IA: Habla con el sistema para resolver dudas de forma natural y rápida.",
      "Soporte Humano: Acceso directo a especialistas para resolver casos complejos de inmediato."
    ]
  }
];

export default function ManualUsuarioPage() {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  const handleDownloadWord = async () => {
    setIsExporting(true);
    
    let logoBase64 = "";
    if (logoRef.current) {
        const svgElement = logoRef.current.querySelector("svg");
        if (svgElement) {
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            
            canvas.width = 400;
            canvas.height = 400;
            
            const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);
            
            await new Promise((resolve) => {
                img.onload = () => {
                    if (ctx) {
                        ctx.fillStyle = "white";
                        ctx.fillRect(0, 0, 400, 400);
                        ctx.drawImage(img, 0, 0, 400, 400);
                    }
                    URL.revokeObjectURL(url);
                    resolve(true);
                };
                img.src = url;
            });
            logoBase64 = canvas.toDataURL("image/png");
        }
    }

    const docContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Manual de Usuario - System Kyron</title>
        <style>
          @page { size: 8.5in 11in; margin: 1in; }
          body { font-family: 'Arial', sans-serif; color: #1e293b; line-height: 1.6; width: 100%; }
          .header { text-align: center; margin-bottom: 50pt; border-bottom: 2pt solid #2563eb; padding-bottom: 20pt; width: 100%; }
          .logo { width: 120pt; margin-bottom: 15pt; }
          h1 { color: #2563eb; font-size: 32pt; margin-bottom: 5pt; font-weight: bold; text-transform: uppercase; }
          .subtitle { color: #64748b; font-size: 14pt; text-transform: uppercase; letter-spacing: 3pt; font-weight: bold; }
          
          h2 { color: #1e40af; border-bottom: 1pt solid #cbd5e1; margin-top: 45pt; padding-bottom: 10pt; font-size: 22pt; font-weight: bold; page-break-before: always; text-transform: uppercase; width: 100%; }
          h3 { color: #2563eb; font-size: 14pt; margin-top: 25pt; font-weight: bold; text-transform: uppercase; border-left: 4pt solid #2563eb; padding-left: 10pt; }
          
          p { margin-bottom: 18pt; text-align: justify; font-size: 12pt; color: #334155; width: 100%; }
          .intro { font-size: 14pt; font-style: italic; color: #475569; margin-bottom: 40pt; padding: 25pt; background: #f1f5f9; border-left: 5pt solid #2563eb; }
          
          ul { margin-bottom: 25pt; padding-left: 30pt; width: 100%; }
          li { margin-bottom: 12pt; font-size: 11.5pt; color: #1e293b; text-align: justify; }
          
          .footer { margin-top: 80pt; text-align: center; font-size: 10pt; color: #94a3b8; border-top: 1pt solid #e2e8f0; padding-top: 25pt; width: 100%; }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${logoBase64}" class="logo" />
          <h1>SYSTEM KYRON</h1>
          <p class="subtitle">Manual de Usuario Consolidado v2.6.5</p>
        </div>

        <div class="intro">
          Esta guía exhaustiva ha sido diseñada para proporcionarte una comprensión total del Ecosistema Kyron. A través de estos 8 capítulos, aprenderás a operar cada módulo con la precisión de un experto, garantizando que tu empresa o tus gestiones personales alcancen un nivel superior de eficiencia y seguridad legal. Bienvenido al estándar de oro de la gestión inteligente.
        </div>

        ${chapters.map((ch) => `
          <div class="section">
            <h2>${ch.title}</h2>
            <p>${ch.content}</p>
            <h3>Capacidades y Puntos Clave:</h3>
            <ul>
              ${ch.details.map(d => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        `).join('')}

        <div class="footer">
          <p>System Kyron • Corporate Intelligence Node • Caracas, Venezuela</p>
          <p>&copy; 2026 Todos los derechos reservados bajo Protocolo de Integridad.</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', docContent], { type: 'application/vnd.ms-word' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Manual_Usuario_System_Kyron_Pro.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsExporting(false);
    toast({
        title: "PROTOCOLO DE DESCARGA FINALIZADO",
        description: "El manual de alta densidad ha sido generado con éxito.",
        action: <CheckCircle className="text-primary h-4 w-4" />
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 px-4 md:px-16 relative overflow-hidden hud-grid">
      
      {/* Logo oculto para la captura en exportación */}
      <div className="hidden" ref={logoRef} aria-hidden="true">
        <Logo className="h-40 w-40" />
      </div>

      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-full h-full bg-primary/[0.03] rounded-full blur-[300px]" />
      </div>

      <header className="max-w-6xl mx-auto mb-20 border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-3">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <BookOpen className="h-3 w-3" /> DOCUMENTACIÓN MAESTRA
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">
            Manual de <span className="text-primary not-italic">Usuario</span>
            </h1>
            <p className="text-muted-foreground text-[10px] md:text-[12px] font-bold uppercase tracking-[0.6em] opacity-40 mt-4 max-w-2xl leading-relaxed">
            Consolidado de 8 Capítulos • Guía de Operaciones de Misión Crítica • Versión 2.6.5
            </p>
        </div>
        <div className="flex gap-3 no-print">
            <Button variant="outline" onClick={() => window.print()} className="h-12 px-6 rounded-xl border-white/10 bg-white/5 text-white text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
            </Button>
            <Button 
                onClick={handleDownloadWord} 
                disabled={isExporting}
                className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-2xl"
            >
                {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                DESCARGAR WORD
            </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto space-y-16 pb-32">
        {chapters.map((chapter, idx) => (
          <motion.section 
            id={chapter.id}
            key={chapter.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="scroll-mt-32"
          >
            <Card className="glass-card border-none rounded-[2.5rem] bg-white/[0.02] overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-all pointer-events-none">
                <chapter.icon className="h-48 w-48 rotate-12" />
              </div>
              
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-20 bg-white/[0.03] border-r border-white/5 flex items-center justify-center p-6 lg:p-0">
                    <span className="text-3xl font-black text-white/5 uppercase lg:vertical-text tracking-tighter">
                        CAP 0{idx + 1}
                    </span>
                </div>

                <div className="flex-1 p-8 md:p-12 space-y-8">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-inner">
                            <chapter.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-white">{chapter.title}</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <p className="text-base md:text-lg font-medium italic text-white/70 leading-relaxed text-justify">
                            {chapter.content}
                        </p>

                        <div className="p-8 rounded-[2rem] bg-black/40 border border-white/5 shadow-inner">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 mb-6 flex items-center gap-3">
                                <CheckCircle className="h-4 w-4 text-emerald-500" /> Puntos clave de gestión
                            </h4>
                            <ul className="space-y-4 text-xs font-bold text-white/60 uppercase tracking-widest leading-relaxed">
                                {chapter.details.map((detail, dIdx) => (
                                    <li key={dIdx} className="flex gap-4 items-start">
                                        <span className="text-primary font-black">»</span>
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
              </div>
            </Card>
          </motion.section>
        ))}
      </div>

      <footer className="max-w-6xl mx-auto border-t border-white/5 pt-20 pb-10 text-center space-y-12">
        <Logo className="h-12 w-12 mx-auto opacity-20" />
        <p className="text-[10px] font-black text-white/5 uppercase tracking-[1.5em] italic">
            SYSTEM KYRON • CORPORATE INTELLIGENCE • 2026
        </p>
      </footer>
    </div>
  );
}
