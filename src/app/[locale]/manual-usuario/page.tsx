
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
  ShoppingCart,
  Clock,
  Settings2,
  ShieldAlert,
  History
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
    content: `Manejar la contabilidad en Venezuela puede ser un reto, pero con Kyron se convierte en un proceso automático y seguro. Nuestro motor financiero está diseñado bajo las normas VEN-NIF e incluye la capacidad de manejar múltiples divisas al mismo tiempo. El sistema saca todas las cuentas difíciles por ti, incluyendo el IVA y el IGTF, asegurando que cada centavo esté en su lugar y refleje el valor real de tu dinero.

El 'Blindaje Fiscal' es una de nuestras herramientas estrella. Antes de que guardes una factura, Kyron revisa que el RIF del cliente sea válido y que el formato cumpla con lo que exige el SENIAT. Si falta algo, el sistema te avisará para corregirlo al instante, evitando errores que luego podrían convertirse en multas. Al final del periodo, puedes generar tus reportes contables con un solo clic, obteniendo archivos listos para cumplir con tus obligaciones. Es como tener a un equipo de expertos trabajando para ti las 24 horas del día.`,
    details: [
      "Ajuste de Divisas: Tus cuentas se actualizan automáticamente según las tasas oficiales.",
      "Libros Fiscales: Genera tus reportes de compra y venta en segundos, sin errores manuales.",
      "Validación de RIF: El sistema verifica automáticamente la identidad fiscal de tus clientes.",
      "Control de Gastos: Registra y categoriza cada egreso para saber exactamente a dónde va tu dinero."
    ]
  },
  {
    id: "personal",
    title: "04. Nómina y Gestión de Personal",
    icon: Users,
    content: `Tu equipo es el corazón de tu empresa, y cuidarlos es fundamental. El módulo de Gestión de Personal te permite manejar todo el ciclo de vida de tus trabajadores de forma profesional. Calcular la nómina ahora es una tarea de segundos: el sistema toma el sueldo base y añade automáticamente bonos, cestatickets y las deducciones de ley requeridas. Al terminar, puedes enviar los recibos de pago de forma masiva directamente a los correos de tus empleados con un diseño impecable.

Además del pago quincenal, Kyron lleva el control exacto de la antigüedad y los beneficios de cada trabajador. Puedes consultar cuánto ha acumulado una persona en prestaciones sociales o generar el cálculo de una liquidación siguiendo estrictamente las leyes laborales. Si necesitas una carta de trabajo, el sistema la genera automáticamente con el sello de tu empresa y un código QR de verificación, lo que le da una validez y un profesionalismo superior a cualquier documento hecho a mano.`,
    details: [
      "Cálculo Automático: Olvídate de las hojas de Excel; Kyron aplica todas las fórmulas por ti.",
      "Recibos Digitales: Envía comprobantes de pago seguros que tus empleados pueden guardar en sus teléfonos.",
      "Control de Vacaciones: El sistema te avisa cuándo le toca descanso a cada integrante de tu equipo.",
      "Archivo Digital: Guarda copias de cédulas, contratos y títulos de tu personal de forma organizada."
    ]
  },
  {
    id: "ventas",
    title: "05. Punto de Venta y Cobros Rápidos",
    icon: ShoppingCart,
    content: `Vender debe ser un proceso rápido y sin complicaciones. El Punto de Venta (TPV) de Kyron ha sido creado para ser visual y muy veloz. Puedes buscar tus productos por nombre o simplemente usando un escáner de códigos de barras. El sistema maneja múltiples formas de pago al mismo tiempo: puedes cobrar una parte en bolívares por Pago Móvil y otra en dólares en efectivo, y Kyron hará el cálculo exacto al instante. Al finalizar, se genera una factura profesional lista para entregar.

El control de tus productos es total. Cada vez que vendes algo, el sistema lo descuenta de tu inventario. Si un producto está por agotarse, verás una alerta para que puedas reponerlo a tiempo. Al final del día, el proceso de 'Arqueo de Caja' te guía para que cuentes tu efectivo y cheques tus pagos digitales, dándote un reporte detallado de cualquier diferencia. Este nivel de control elimina las pérdidas y te da la tranquilidad de que todo lo que entra a tu negocio está bien registrado.`,
    details: [
      "Cobro Multimoneda: Acepta pagos combinados en Bs. y divisas con total precisión.",
      "Inventario en Vivo: Tus existencias se actualizan con cada clic en el punto de venta.",
      "Facturación Veloz: Registra a tus clientes solo con su cédula y el sistema cargará sus datos.",
      "Cierres de Caja: Reportes detallados por turno para un control administrativo total."
    ]
  },
  {
    id: "boveda",
    title: "06. Bóveda Digital y Documentos Legales",
    icon: Lock,
    content: `En Kyron, tus documentos son activos valiosos. La 'Bóveda Digital' es un espacio de máxima seguridad donde puedes resguardar tus archivos más importantes, como cédulas, RIF, títulos de propiedad y contratos. Lo que hace especial a esta bóveda es que utiliza tecnología de 'Sellado Inmutable', lo que garantiza que tus documentos no puedan ser alterados y que siempre tengas una copia fiel disponible, protegida contra cualquier pérdida física o digital. 

Pero no solo sirve para guardar; también es una herramienta de creación. Nuestra Inteligencia Artificial Legal te ayuda a redactar borradores de contratos en cuestión de segundos. Ya sea que necesites un contrato de alquiler o un acuerdo de confidencialidad, solo tienes que ingresar los datos básicos y la IA generará un documento profesional ajustado a las leyes vigentes. Además, puedes hacer seguimiento a trámites oficiales y recibir notificaciones apenas tus documentos estén listos para ser descargados.`,
    details: [
      "Seguridad Bancaria: Tu información está protegida con los estándares más altos del mercado.",
      "Redacción con IA: Genera contratos legales profesionales de forma automática y sencilla.",
      "Alertas de Vencimiento: Te avisamos con tiempo antes de que caduque tu RIF o tus permisos.",
      "Gestión de Trámites: Recibe y organiza documentos oficiales directamente en tu cuenta."
    ]
  },
  {
    id: "tecnologia",
    title: "07. Tecnología 5G, eSIM y Reciclaje",
    icon: Smartphone,
    content: `System Kyron te conecta con el futuro a través de la tecnología y la ecología. Mediante nuestro centro de conectividad, puedes activar líneas telefónicas 5G de alta velocidad en minutos. Somos pioneros en el uso de eSIM (chips digitales), lo que te permite activar un número nuevo escaneando un simple código QR desde tu oficina, sin necesidad de un chip físico. Esto es ideal para empresas que necesitan estar conectadas de forma inmediata con la red más moderna y estable.

Nuestra visión también incluye el cuidado del planeta. Hemos creado las 'Papeleras Inteligentes' Kyron, que utilizan tecnología magnética para detectar y clasificar materiales como metal y plástico. Por cada envase que recicles en nuestras estaciones, el sistema validará tu acción y te otorgará 'Eco-Créditos' en tu billetera digital. Estos puntos puedes canjearlos por descuentos reales, productos y beneficios exclusivos en nuestra red de comercios aliados, premiando tus hábitos responsables.`,
    details: [
      "Activación Instantánea: Obtén tu número telefónico y plan de datos 5G al momento.",
      "Chip Digital (eSIM): Activa servicios de comunicación modernos sin salir de casa.",
      "Eco-Créditos: Gana premios y beneficios tangibles por reciclar de forma inteligente.",
      "Impacto Positivo: Mira en tu tablero cuánto estás ayudando al medio ambiente con tus acciones."
    ]
  },
  {
    id: "soporte",
    title: "08. Academia Kyron y Ayuda Técnica",
    icon: School,
    content: `Tu crecimiento es nuestra prioridad, y por eso hemos creado la 'Academia Kyron'. Es un centro de formación dentro de la plataforma donde tú y tu equipo pueden acceder a guías prácticas sobre cómo dominar cada herramienta del sistema. Aprenderás desde cómo hacer una factura perfecta hasta cómo optimizar tus ventas. Al completar los cursos, obtendrás certificados que validan tus conocimientos, ayudándote a ser cada día más eficiente en tu gestión.

Si alguna vez tienes una duda o un problema técnico, nuestro equipo de soporte está siempre listo para ayudarte. Puedes hablar con nuestro 'Asistente de Voz IA' para obtener respuestas rápidas o contactar directamente a nuestros expertos humanos a través del chat de ayuda. No importa si es una duda sencilla o un caso complejo; estamos aquí para asegurar que tu negocio nunca se detenga y que siempre sientas el respaldo de la mejor tecnología a tu lado.`,
    details: [
      "Formación Práctica: Guías y cursos fáciles de seguir para dominar todo el sistema.",
      "Certificados Digitales: Obtén diplomas que demuestran tu pericia en el uso de la plataforma.",
      "Asistencia IA: Habla con el sistema para resolver dudas de forma natural y rápida.",
      "Soporte Directo: Acceso a especialistas humanos para resolver cualquier inconveniente."
    ]
  },
  {
    id: "horario-laboral",
    title: "09. Control de Horario Laboral desde el TPV",
    icon: Clock,
    content: `Una de las herramientas más útiles para dueños y gerentes es la posibilidad de definir el horario de trabajo de su negocio directamente desde el sistema. Kyron te permite establecer, por ejemplo, que tu tienda abre a las 8:00 a.m. y cierra a las 6:00 p.m. de lunes a sábado. Una vez configurado, el sistema gestionará automáticamente varias funciones críticas para la seguridad y organización de tu establecimiento.

Con esta funcionalidad, los cajeros solo podrán iniciar sesión y realizar ventas dentro del horario autorizado. Fuera de ese rango, el punto de venta se bloqueará automáticamente, evitando transacciones no supervisadas. Además, el sistema genera reportes detallados por cada turno de trabajo, permitiéndote ver exactamente cuánto vendió cada empleado en su franja horaria. Si necesitas abrir en un horario especial o un día festivo, el gerente puede autorizar una excepción rápidamente con su clave maestra, manteniendo siempre un registro de quién hizo el cambio y por qué.`,
    details: [
      "Bloqueo Automático: Evita ventas fuera de horas para mayor seguridad del inventario.",
      "Gestión de Turnos: Separa y analiza el rendimiento de tus empleados por mañana o tarde.",
      "Calendario de Excepciones: Configura cierres tempranos o días feriados con antelación.",
      "Autorización Maestra: Permite ventas excepcionales fuera de horario mediante clave de gerente."
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
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; line-height: 1.6; width: 100%; }
          .header { text-align: center; margin-bottom: 50pt; border-bottom: 3pt solid #0A2472; padding-bottom: 25pt; width: 100%; }
          .logo { width: 120pt; margin-bottom: 15pt; }
          h1 { color: #0A2472; font-size: 34pt; margin-bottom: 5pt; font-weight: 900; text-transform: uppercase; }
          .subtitle { color: #64748b; font-size: 14pt; text-transform: uppercase; letter-spacing: 4pt; font-weight: bold; }
          
          h2 { color: #0A2472; border-bottom: 1.5pt solid #cbd5e1; margin-top: 50pt; padding-bottom: 12pt; font-size: 24pt; font-weight: 900; page-break-before: always; text-transform: uppercase; width: 100%; }
          h3 { color: #00A86B; font-size: 16pt; margin-top: 30pt; font-weight: 800; text-transform: uppercase; border-left: 5pt solid #00A86B; padding-left: 12pt; }
          
          p { margin-bottom: 20pt; text-align: justify; font-size: 12.5pt; color: #334155; width: 100%; line-height: 1.8; }
          .intro { font-size: 15pt; font-style: italic; color: #475569; margin-bottom: 45pt; padding: 30pt; background: #f8fafc; border-left: 6pt solid #0A2472; line-height: 1.7; }
          
          ul { margin-bottom: 30pt; padding-left: 35pt; width: 100%; }
          li { margin-bottom: 14pt; font-size: 12pt; color: #1e293b; text-align: justify; }
          
          .footer { margin-top: 100pt; text-align: center; font-size: 10pt; color: #94a3b8; border-top: 1pt solid #e2e8f0; padding-top: 30pt; width: 100%; }
          .highlight-box { padding: 20pt; background-color: #f1f5f9; border-radius: 15pt; margin-bottom: 20pt; border: 1pt solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${logoBase64}" class="logo" />
          <h1>SYSTEM KYRON</h1>
          <p class="subtitle">Manual de Usuario Consolidado v2.6.5</p>
        </div>

        <div class="intro">
          Este manual ha sido diseñado para guiarte paso a paso en el uso de System Kyron. Aquí encontrarás explicaciones claras y sencillas para que puedas aprovechar al máximo cada herramienta del ecosistema, garantizando que tu empresa o tus gestiones personales se manejen con total eficiencia y seguridad legal. Bienvenido al estándar de oro de la gestión inteligente.
        </div>

        ${chapters.map((ch) => `
          <div class="section">
            <h2>${ch.title}</h2>
            <p>${ch.content}</p>
            <div class="highlight-box">
                <h3>Capacidades y Puntos Clave:</h3>
                <ul>
                ${ch.details.map(d => `<li>${d}</li>`).join('')}
                </ul>
            </div>
          </div>
        `).join('')}

        <div class="footer">
          <p>System Kyron • Telecom, Reciclaje y Control Total • Caracas, Venezuela</p>
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
        description: "El manual detallado ha sido generado con éxito.",
        action: <CheckCircle className="text-primary h-4 w-4" />
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 px-4 md:px-16 relative overflow-hidden hud-grid">
      
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
            Guía de Operaciones Detallada • Consolidado de 9 Capítulos • Versión 2.6.5
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
                        <div className="space-y-6">
                            <p className="text-base md:text-lg font-medium italic text-white/70 leading-relaxed text-justify">
                                {chapter.content}
                            </p>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-black/40 border border-white/5 shadow-inner flex flex-col">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 mb-8 flex items-center gap-3">
                                <CheckCircle className="h-4 w-4 text-emerald-500" /> Puntos clave de gestión
                            </h4>
                            <ul className="space-y-6 text-xs font-bold text-white/60 uppercase tracking-widest leading-relaxed flex-grow">
                                {chapter.details.map((detail, dIdx) => (
                                    <li key={dIdx} className="flex gap-4 items-start">
                                        <span className="text-primary font-black text-lg leading-none">»</span>
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 pt-6 border-t border-white/5">
                                <p className="text-[8px] font-black text-white/10 uppercase tracking-[0.4em]">Protocolo Verificado v2.6</p>
                            </div>
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
            SYSTEM KYRON • TELECOM, RECICLAJE Y CONTROL TOTAL • 2026
        </p>
      </footer>
    </div>
  );
}
