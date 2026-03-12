
"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { 
  BookOpen, 
  ShieldCheck, 
  Zap, 
  Radio, 
  Gavel, 
  Users, 
  Cpu, 
  ChevronRight,
  Lock,
  Search,
  FileText,
  Activity,
  Network,
  Database,
  BrainCircuit,
  Fingerprint,
  Smartphone,
  Recycle,
  Coins,
  Scale,
  Calculator,
  Target,
  BarChart3,
  Globe,
  Briefcase,
  Award,
  AlertTriangle,
  Landmark,
  School,
  Download,
  Printer,
  ChevronLeft,
  Loader2,
  CheckCircle,
  UserCircle,
  ShoppingCart,
  Wallet,
  CreditCard,
  MessageSquare,
  User,
  LayoutDashboard
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

/**
 * @fileOverview Manual de Usuario Consolidado - System Kyron v2.6.5.
 * 8 Capítulos esenciales que cubren todo el ecosistema con lenguaje sencillo.
 */

const chapters = [
  {
    id: "bienvenida",
    title: "01. Bienvenida y Acceso Seguro",
    icon: Target,
    content: `¡Bienvenido a System Kyron! Has elegido la plataforma más avanzada para cuidar tu negocio y tus documentos. Entrar es muy fácil: solo necesitas tu correo y una contraseña segura. Para protegerte al máximo, usamos 'Verificación en Dos Pasos', lo que significa que el sistema te pedirá un código que llega a tu celular. También puedes entrar usando tu huella o tu rostro si tu equipo lo permite. Recuerda que hemos dividido el sistema en 'Portales' (Personal, Contabilidad, Ventas, etc.) para que veas solo lo que necesitas usar en cada momento.`,
    details: [
      "Acceso Multi-Portal: Elige tu área de trabajo (Ventas, Legal, Personal, etc.)",
      "Seguridad Nivel 5: Tu cuenta está protegida por claves, códigos al celular y biometría.",
      "Perfil Personal: Sube tu foto y datos para que el sistema te reconozca.",
      "Privacidad Total: Tus datos están cifrados; nadie más puede verlos."
    ]
  },
  {
    id: "centro-mando",
    title: "02. Centro de Mando y Navegación",
    icon: LayoutDashboard,
    content: `El 'Tablero Principal' es tu oficina virtual. Aquí verás gráficos sencillos que te dicen cómo va tu dinero y tus ventas. El color verde te indica que todo va bien y el rojo es para cosas que necesitan tu atención. A la izquierda tienes el menú con todos los módulos. Si el sistema detecta algo importante, como una nueva ley o un pago pendiente, te pondrá un aviso brillante. Es como tener un asistente que te mantiene organizado todo el día.`,
    details: [
      "Vistazo Rápido: Mira tus ingresos y gastos apenas entras.",
      "Alertas Inteligentes: Avisos sobre facturas por vencer o cambios legales.",
      "Menú Lateral: Accede a todos los servicios con un solo clic.",
      "Tareas del Día: Listado de pendientes para que no se te olvide nada."
    ]
  },
  {
    id: "finanzas",
    title: "03. Finanzas e Impuestos Automáticos",
    icon: Calculator,
    content: `Olvídate de sacar cuentas difíciles. Kyron registra cada venta y gasto automáticamente. El sistema se conecta con el Banco Central para ajustar tus cuentas a la tasa del día, protegiéndote contra la inflación. Para los impuestos, Kyron prepara tus Libros de Compra y Venta y genera los archivos listos para el SENIAT. El sistema revisa que no falte ningún dato legal en tus facturas para evitarte multas. Es contabilidad profesional hecha fácil para ti.`,
    details: [
      "Contabilidad en Vivo: Los balances se actualizan con cada venta.",
      "Blindaje SENIAT: Validación de RIF y datos fiscales en tiempo real.",
      "Ajuste por Inflación: Cálculos automáticos basados en tasas oficiales.",
      "Conciliación Bancaria: Empareja tus depósitos del banco con tus facturas."
    ]
  },
  {
    id: "personal",
    title: "04. Gestión de Personal y Nómina",
    icon: Users,
    content: `Administrar a tu equipo es muy sencillo. Puedes calcular la nómina de toda tu empresa en segundos, incluyendo sueldos, bonos y retenciones de ley (IVSS, FAOV). El sistema genera los recibos de pago y los envía por WhatsApp o correo. También puedes ver cuánto tiene acumulado cada trabajador en prestaciones sociales y generar cartas de trabajo profesionales con un solo botón. Mantén a tu equipo feliz con pagos puntuales y claros.`,
    details: [
      "Nómina Rápida: Calcula y paga a todo tu personal en un paso.",
      "Recibos Digitales: Envío automático por WhatsApp y email.",
      "Cálculo de Prestaciones: Control total de la antigüedad y liquidaciones.",
      "Fichas de Empleado: Guarda contratos y documentos de tu equipo en un solo lugar."
    ]
  },
  {
    id: "ventas",
    title: "05. Ventas y Punto de Venta (TPV)",
    icon: ShoppingCart,
    content: `Vende rápido en tu tienda o por internet. El Punto de Venta es táctil y muy fácil de usar. Puedes cobrar en bolívares, dólares o cualquier combinación de pagos. El sistema descuenta la mercancía del inventario al momento y te avisa si te queda poco stock. Al final del día, el 'Cierre de Caja' te da un reporte exacto de cuánto dinero recibiste por cada método, eliminando errores y pérdidas.`,
    details: [
      "Cobro Multimoneda: Acepta Bs., USD y pagos digitales fácilmente.",
      "Control de Inventario: Tus existencias se actualizan solas al vender.",
      "Factura Fiscal: Diseño homologado listo para imprimir o enviar.",
      "Cierre de Turno: Cuadre de caja perfecto en menos de un minuto."
    ]
  },
  {
    id: "boveda",
    title: "06. Bóveda Digital y Documentos",
    icon: Lock,
    content: `Guarda tus documentos más importantes en un lugar donde nunca se pierdan. En la 'Bóveda Digital' puedes subir tu cédula, RIF, títulos y contratos. Todo queda guardado con seguridad militar. Además, nuestra IA te ayuda a redactar borradores de contratos legales en segundos. También puedes gestionar trámites como partidas de nacimiento o antecedentes penales directamente desde el sistema, sin hacer colas.`,
    details: [
      "Resguardo Seguro: Tus archivos están protegidos y solo tú los ves.",
      "Generador Legal IA: Crea contratos de alquiler o ventas en un instante.",
      "Trámites Civiles: Solicita documentos oficiales desde tu casa.",
      "Alertas de Vencimiento: Te avisamos cuando te toque renovar el RIF o pasaporte."
    ]
  },
  {
    id: "tecnologia",
    title: "07. Tecnología, 5G y Sostenibilidad",
    icon: Smartphone,
    content: `System Kyron te mantiene a la vanguardia. Puedes activar líneas 5G y eSIMs (chips digitales) en minutos para estar siempre conectado. Además, con nuestra iniciativa ambiental, puedes ganar 'Eco-Créditos' por reciclar en nuestras Papeleras Inteligentes. Estas estaciones usan tecnología de magnetismo para clasificar tus residuos. Los puntos que ganes los puedes canjear por premios y descuentos en muchos comercios.`,
    details: [
      "Línea Kyron 5G: Internet de alta velocidad activado al momento.",
      "eSIM Digital: Olvídate de los chips físicos, usa un código QR.",
      "Puntos por Reciclar: Gana beneficios por cuidar el planeta.",
      "Mapa de Alianzas: Encuentra locales para canjear tus Eco-Créditos."
    ]
  },
  {
    id: "soporte",
    title: "08. Ayuda, Soporte y Academia",
    icon: School,
    content: `Nunca estarás solo. Si tienes dudas, puedes hablar con nuestro asistente inteligente o contactar a nuestros expertos por WhatsApp. También tienes acceso a la 'Academia Kyron', un lugar con cursos cortos para que tú y tu equipo aprendan a sacarle todo el jugo a la plataforma. Al terminar los cursos, recibirás certificados que validan tus nuevas habilidades. Estamos aquí para asegurar que tu negocio crezca sin límites.`,
    details: [
      "Soporte Humano: Personas reales listas para ayudarte por chat.",
      "Academia Kyron: Cursos fáciles sobre finanzas, leyes y ventas.",
      "Certificados Digitales: Demuestra tus conocimientos con diplomas oficiales.",
      "Guías Visuales: Manuales con fotos paso a paso para cada herramienta."
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
          body { font-family: 'Arial', sans-serif; color: #334155; line-height: 1.6; padding: 40pt; }
          .header { text-align: center; margin-bottom: 60pt; border-bottom: 2pt solid #2563eb; padding-bottom: 20pt; }
          .logo { width: 100pt; margin-bottom: 15pt; }
          h1 { color: #2563eb; font-size: 28pt; margin-bottom: 5pt; font-weight: bold; text-transform: uppercase; }
          .subtitle { color: #64748b; font-size: 12pt; text-transform: uppercase; letter-spacing: 2pt; font-weight: bold; }
          
          h2 { color: #1e40af; border-bottom: 1pt solid #e2e8f0; margin-top: 40pt; padding-bottom: 8pt; font-size: 18pt; font-weight: bold; page-break-before: always; text-transform: uppercase; }
          h3 { color: #2563eb; font-size: 12pt; margin-top: 20pt; font-weight: bold; text-transform: uppercase; border-left: 3pt solid #2563eb; padding-left: 8pt; }
          
          p { margin-bottom: 12pt; text-align: justify; font-size: 11pt; color: #1e293b; }
          .intro { font-size: 12pt; font-style: italic; color: #475569; margin-bottom: 30pt; padding: 20pt; background: #f8fafc; border-left: 4pt solid #2563eb; }
          
          ul { margin-bottom: 20pt; padding-left: 25pt; }
          li { margin-bottom: 8pt; font-size: 10.5pt; color: #334155; }
          
          .footer { margin-top: 60pt; text-align: center; font-size: 9pt; color: #94a3b8; border-top: 1pt solid #f1f5f9; padding-top: 20pt; }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${logoBase64}" class="logo" />
          <h1>SYSTEM KYRON</h1>
          <p class="subtitle">Manual de Usuario Consolidado v2.6.5</p>
        </div>

        <div class="intro">
          Esta guía rápida ha sido diseñada para que aprendas a usar System Kyron de forma fácil y segura. En los siguientes 8 capítulos encontrarás todo lo necesario para manejar tu empresa o tus documentos personales con total confianza. Bienvenido al futuro de la gestión inteligente.
        </div>

        ${chapters.map((ch) => `
          <div class="section">
            <h2>${ch.title}</h2>
            <p>${ch.content}</p>
            <h3>Puntos clave:</h3>
            <ul>
              ${ch.details.map(d => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        `).join('')}

        <div class="footer">
          <p>System Kyron • Corporate Intelligence Node • Caracas, Venezuela</p>
          <p>&copy; 2026 Todos los derechos reservados.</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', docContent], { type: 'application/vnd.ms-word' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Manual_Usuario_System_Kyron_Consolidado.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsExporting(false);
    toast({
        title: "MANUAL DESCARGADO",
        description: "El manual consolidado ha sido generado con éxito.",
        action: <CheckCircle className="text-primary h-4 w-4" />
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 px-4 md:px-16 relative overflow-hidden hud-grid">
      
      {/* Logo oculto para la exportación */}
      <div className="hidden" ref={logoRef} aria-hidden="true">
        <Logo className="h-40 w-40" />
      </div>

      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-full h-full bg-primary/[0.03] rounded-full blur-[300px]" />
      </div>

      <header className="max-w-6xl mx-auto mb-20 border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-3">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <BookOpen className="h-3 w-3" /> GUÍA RÁPIDA DE USUARIO
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">
            Manual de <span className="text-primary not-italic">Usuario</span>
            </h1>
            <p className="text-muted-foreground text-[10px] md:text-[12px] font-bold uppercase tracking-[0.6em] opacity-40 mt-4 max-w-2xl leading-relaxed">
            Consolidado de 8 Capítulos • Explicaciones sencillas para un control total
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
                        0{idx + 1}
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
                                <CheckCircle className="h-4 w-4 text-emerald-500" /> Puntos clave
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
