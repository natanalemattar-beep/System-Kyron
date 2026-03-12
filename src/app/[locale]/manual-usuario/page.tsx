
"use client";

import { motion } from "framer-motion";
import { 
  BookOpen, 
  ShieldCheck, 
  Zap, 
  Radio, 
  Gavel, 
  Users, 
  Cpu, 
  Terminal,
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
  User
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

/**
 * @fileOverview Manual de Usuario de System Kyron v2.6.5.
 * 20 Capítulos escritos en lenguaje sencillo y detallado.
 */

const chapters = [
  {
    id: "bienvenida",
    title: "01. Bienvenida a System Kyron",
    icon: Target,
    content: `¡Bienvenido a System Kyron! Estamos muy felices de que hayas elegido nuestra plataforma para manejar tu negocio o tus documentos personales. Este sistema ha sido creado para facilitarte la vida. Sabemos que manejar una empresa en Venezuela puede ser difícil por tanto papeleo y leyes que cambian, por eso diseñamos Kyron: para que sea tu asistente inteligente que se encarga de lo aburrido y complicado mientras tú te enfocas en crecer.

En este manual te explicaremos paso a paso cómo usar cada herramienta de la forma más fácil posible. No necesitas ser un experto en computación para dominar Kyron; solo necesitas ganas de ordenar tu negocio. Aquí encontrarás la respuesta a todas tus dudas sobre contabilidad, ventas, personal y mucho más. Recuerda que Kyron es un sistema seguro que protege tu información como si fuera un banco, dándote la tranquilidad que mereces.`,
    details: [
      "Fácil de usar: Diseñamos todo con botones claros y explicaciones sencillas.",
      "Todo en un solo lugar: Ya no necesitas diez programas diferentes, aquí tienes todo.",
      "Seguridad total: Tus datos están protegidos y nadie más puede verlos sin tu permiso.",
      "Siempre actualizado: Si sale una nueva ley, el sistema se actualiza solo para que tú sigas cumpliendo sin esfuerzo."
    ]
  },
  {
    id: "inicio",
    title: "02. Cómo empezar a usar el sistema",
    icon: UserCircle,
    content: `Entrar a System Kyron es muy sencillo. Lo primero que verás al entrar a nuestra página es una opción llamada 'ACCESO'. Al pulsarla, verás diferentes puertas de entrada. Si eres el dueño de una empresa, entrarás por 'Contabilidad' o 'Socios'. Si eres un empleado, tendrás tu propio acceso a 'Recursos Humanos'. Y si solo quieres ver tus documentos personales, entrarás por 'Cuenta Personal'.

Una vez que elijas tu portal, el sistema te pedirá tu identificación y contraseña. Es muy importante que guardes bien tu clave y no se la des a nadie. La primera vez que entres, te recomendamos completar tu perfil: pon tu nombre, una foto si quieres y verifica que tus datos de contacto estén correctos. Así, el sistema podrá enviarte avisos importantes directamente a tu correo o teléfono cuando algo necesite tu atención.`,
    details: [
      "Elige tu portal: Selecciona la opción que mejor se adapte a lo que vas a hacer hoy.",
      "Contraseña segura: Crea una clave que sea fácil de recordar para ti pero difícil de adivinar para otros.",
      "Completa tu perfil: Un perfil completo ayuda al sistema a darte mejores recomendaciones.",
      "Verificación: El sistema puede pedirte confirmar tu identidad por seguridad, sigue los pasos en pantalla."
    ]
  },
  {
    id: "seguridad",
    title: "03. Protegiendo tu cuenta y tus datos",
    icon: ShieldCheck,
    content: `Para nosotros, tu información es lo más valioso. Por eso, Kyron usa tecnología de seguridad muy avanzada, pero para ti será muy simple de manejar. Una de las herramientas más importantes es la 'Verificación en dos pasos'. Esto significa que, además de tu clave, el sistema te pedirá un código rápido que llega a tu teléfono. Es como tener una doble cerradura en la puerta de tu casa.

Además, en la sección de seguridad podrás ver qué teléfonos o computadoras han entrado a tu cuenta. Si ves algo extraño, puedes cerrar esa sesión con un solo botón. Si alguna vez pierdes tu teléfono, tenemos un 'Bloqueo de Emergencia' que protege tus documentos al instante hasta que tú mismo digas que todo está bien. Queremos que duermas tranquilo sabiendo que tus facturas, tus contratos y tu dinero digital están bajo llave.`,
    details: [
      "Llave doble: Activa el código al teléfono para que nadie más pueda entrar.",
      "Historial de acceso: Revisa quién y desde dónde han entrado a tu cuenta.",
      "Bloqueo rápido: Protege todo en un segundo si tienes una emergencia.",
      "Privacidad: Solo tú tienes la llave maestra para ver tus documentos más importantes."
    ]
  },
  {
    id: "tablero",
    title: "04. Conoce tu tablero de herramientas",
    icon: LayoutDashboard,
    content: `Cuando entras a tu área de trabajo, verás lo que llamamos el 'Tablero Principal' o 'Centro de Mando'. Piensa en esto como el tablero de un carro: aquí ves de un vistazo cómo va todo. Verás cuánto dinero ha entrado, cuánto has gastado y si tienes tareas pendientes. Los gráficos son fáciles de leer: si la línea sube, ¡vas por buen camino!

A la izquierda siempre tendrás un menú con todos los módulos. Si necesitas ver tus ventas, vas a 'Ventas'. Si quieres ver a tus empleados, vas a 'Personal'. Lo mejor de este tablero es que es inteligente: si hay una factura que vence mañana o un empleado que cumple años, el sistema te pondrá un aviso brillante para que no se te olvide nada. Es tu asistente personal que nunca duerme.`,
    details: [
      "Vista rápida: Mira tus ganancias y gastos sin tener que buscar mucho.",
      "Menú directo: Encuentra todas las secciones de la plataforma en un solo clic.",
      "Avisos inteligentes: El sistema te avisa lo que es urgente para que no se te pase nada.",
      "Personalización: Puedes elegir qué información quieres ver primero en tu pantalla."
    ]
  },
  {
    id: "contabilidad",
    title: "05. Contabilidad sin complicaciones",
    icon: Calculator,
    content: `Mucha gente le tiene miedo a la contabilidad, pero con Kyron te va a encantar. Hemos hecho que registrar tus cuentas sea tan fácil como escribir un mensaje de texto. El sistema se encarga de sumar, restar y organizar todo bajo las leyes venezolanas. Cada vez que vendes algo en el Punto de Venta o pagas a un proveedor, el sistema anota eso automáticamente en tus libros contables.

Una función que te salvará la vida es el 'Ajuste por Inflación'. El sistema sabe cuánto cambia el valor del dinero cada día y hace los cálculos por ti para que tus reportes financieros digan siempre la verdad. Al final del mes, no tendrás que pasar horas con una calculadora; solo presionas un botón y el sistema te entrega tus balances listos para imprimir o enviar a tu contador.`,
    details: [
      "Registro automático: El sistema anota tus ventas y compras por ti.",
      "Ajuste de moneda: Maneja bolívares y dólares al mismo tiempo sin enredarte.",
      "Balances al instante: Genera tus estados financieros en segundos, no en días.",
      "Cero errores: La inteligencia artificial revisa que las cuentas siempre cuadren."
    ]
  },
  {
    id: "impuestos",
    title: "06. Tus impuestos siempre al día",
    icon: Landmark,
    content: `Cumplir con el SENIAT es obligatorio y muy importante para evitar multas. Kyron es como tener un experto fiscal sentado a tu lado. El sistema revisa que todas tus facturas tengan el RIF correcto, el número de control en orden y el IVA bien calculado. Si intentas registrar algo mal, el sistema te avisará: '¡Oye, este RIF no es válido!', protegiéndote antes de que cometas un error.

Al llegar la fecha de declaración, ya sea de IVA o de ISLR, el sistema te entrega el archivo exacto que necesitas subir al portal del SENIAT. Ya no tendrás que preocuparte por si te falta una factura o si un libro está mal foliado. Con nuestro 'Blindaje Fiscal', estarás siempre preparado para una inspección con la frente en alto y tus papeles en regla.`,
    details: [
      "Libros automáticos: Tus libros de compra y venta se llenan solos con cada operación.",
      "Archivo para el SENIAT: Genera el archivo .txt listo para declarar en un clic.",
      "Evita multas: El sistema detecta errores antes de que se conviertan en un problema legal.",
      "Recordatorios de pago: Te avisamos días antes de que venza el plazo para declarar."
    ]
  },
  {
    id: "personal",
    title: "07. Manejo fácil de tus empleados",
    icon: Users,
    content: `Tus empleados son el motor de tu empresa, y tratarlos bien según la ley es fundamental. En el módulo de Personal, puedes llevar la ficha de cada trabajador con su nombre, cargo, fecha de ingreso y sus familiares. El sistema calcula la nómina automáticamente cada quincena, incluyendo el Cestaticket, las retenciones de ley y cualquier bono extra que quieras darles.

¿Necesitas saber cuánto le debes a alguien de prestaciones sociales? Solo entra a su perfil y verás el monto acumulado al día de hoy. También puedes gestionar las vacaciones para que no se venzan y el sistema te avisará cuándo le toca descanso a cada quien. Todo se hace siguiendo la LOTTT, así que siempre estarás cumpliendo con los derechos de tus trabajadores de forma justa y transparente.`,
    details: [
      "Nómina rápida: Paga a todo tu equipo en segundos con cálculos exactos.",
      "Cálculo de liquidación: Saca la cuenta de cuánto pagar al finalizar un contrato sin errores.",
      "Control de vacaciones: Mira quién ha descansado y quién tiene días pendientes.",
      "Recibos digitales: Envía el comprobante de pago al teléfono de cada empleado por WhatsApp."
    ]
  },
  {
    id: "ventas",
    title: "08. Vende más con nuestro Punto de Venta",
    icon: ShoppingCart,
    content: `Vender debe ser rápido y alegre. Por eso creamos el Punto de Venta (TPV) de Kyron. Es una pantalla muy colorida y fácil de usar, ideal para tablets o computadoras táctiles. Solo tienes que tocar el producto que el cliente quiere o usar un lector de barras, elegir cómo te va a pagar (Efectivo, Tarjeta, Pago Móvil o Divisas) y listo. La factura se genera al momento.

El sistema está conectado con tu inventario, así que cada vez que vendes un zapato o una libreta, el sistema descuenta eso de tu almacén. Si te quedan pocos productos, el tablero te pondrá una alerta: '¡Atención, te quedan pocas resmas de papel!'. Así nunca dejarás de vender por falta de mercancía. Además, el cierre de caja al final del día es automático, ¡se acabó eso de quedarse hasta tarde contando billetes!`,
    details: [
      "Cobros rápidos: Acepta múltiples métodos de pago en una sola venta.",
      "Inventario al día: El sistema sabe qué tienes y qué te falta en tiempo real.",
      "Cierre de caja: Cuadra tu dinero al final del turno sin dolores de cabeza.",
      "Promociones: Crea combos o descuentos fácilmente para atraer más clientes."
    ]
  },
  {
    id: "legal-ia",
    title: "09. Crea contratos legales en segundos",
    icon: Gavel,
    content: `Contratar a un abogado para cada papelito puede ser costoso y lento. Con nuestra Inteligencia Artificial Legal, tú mismo puedes generar borradores de contratos profesionales. ¿Necesitas un contrato de alquiler, un acuerdo de confidencialidad o un papel para vender un carro? Solo dile al sistema los nombres de las personas y los montos, y la IA redactará el documento por ti usando lenguaje legal correcto.

Todos estos documentos se guardan en tu 'Bóveda Legal', un archivo digital que nunca se pierde y que tiene validez. Si alguna vez necesitas demostrar que un contrato existe, el sistema tiene un 'sello digital' que garantiza que ese papel es original y no ha sido cambiado. Es como tener un archivo notariado en tu propia computadora, disponible las 24 horas.`,
    details: [
      "Borradores listos: Genera documentos legales comunes sin esperar días.",
      "Lenguaje profesional: La IA escribe como un abogado experto para protegerte.",
      "Archivo inmutable: Tus documentos se sellan digitalmente para que sean válidos siempre.",
      "Control de firmas: Lleva un registro de quién ha firmado cada documento."
    ]
  },
  {
    id: "telecom-5g",
    title: "10. Activa tu línea telefónica Kyron 5G",
    icon: Smartphone,
    content: `En Kyron no solo te damos software, también te conectamos con el mundo. Tenemos nuestro propio servicio de telefonía para empresas y personas. Puedes activar una línea nueva en segundos usando algo llamado 'eSIM', que es un chip digital que no necesita un plástico físico. Solo escaneas un código con tu teléfono y ¡ya tienes señal!

Nuestra red 5G es ultra rápida, lo que garantiza que tus sistemas de cobro y contabilidad siempre tengan internet para funcionar. Como administrador, puedes repartir datos y minutos entre tus empleados, ver cuánto están consumiendo y recargar saldo para todos desde una sola pantalla. Es la forma más moderna y eficiente de manejar las comunicaciones de tu equipo de trabajo.`,
    details: [
      "Chips digitales (eSIM): Activa tu línea al instante sin ir a una tienda.",
      "Internet de alta velocidad: Navega con tecnología 5G para que tu trabajo no se detenga.",
      "Gestión de flota: Controla las líneas de todos tus empleados desde un solo lugar.",
      "Recargas fáciles: Paga tus servicios telefónicos directamente desde tu cuenta Kyron."
    ]
  },
  {
    id: "reciclaje",
    title: "11. Gana puntos por reciclar",
    icon: Recycle,
    content: `Cuidar el planeta también puede darte beneficios. A través de la Fundación Kyron, hemos instalado 'Papeleras Inteligentes' en muchos lugares. Estas papeleras usan imanes y cámaras para saber qué tipo de basura estás botando. Cuando reciclas plástico o metal en nuestras estaciones, el sistema reconoce quién eres a través de tu tarjeta digital y te regala 'Eco-Créditos'.

Estos créditos son puntos que se acumulan en tu billetera digital. Luego, puedes ir a tiendas, cafeterías o cines que sean aliados de Kyron y usar tus puntos para pagar o recibir descuentos. Es nuestra forma de agradecerte por ayudar a que Venezuela sea un país más limpio y verde. ¡Reciclar con Kyron es ganar dinero mientras cuidas el mundo!`,
    details: [
      "Puntos por reciclar: Recibe premios cada vez que uses nuestras papeleras inteligentes.",
      "Billetera verde: Mira cuántos puntos tienes acumulados en tu perfil.",
      "Canje de premios: Usa tus puntos en una gran red de comercios amigos.",
      "Impacto real: Mira cuánto CO2 has ayudado a reducir con tus acciones."
    ]
  },
  {
    id: "ingenieria",
    title: "12. Planifica tu local comercial",
    icon: Cpu,
    content: `Si estás pensando en abrir una nueva tienda o remodelar tu oficina, esta herramienta te va a encantar. Nuestra IA de ingeniería puede mirar una foto de un local vacío y decirte exactamente cuánto mide. No necesitas una cinta métrica complicada; la IA analiza las paredes y el piso para darte las medidas reales.

Con esas medidas, el sistema te ayuda a crear un presupuesto de cuánto material vas a necesitar: ¿cuántos metros de piso?, ¿cuántos galones de pintura?, ¿cuánto cuesta la mano de obra?. Te entrega un expediente técnico completo que puedes presentar a constructores o centros comerciales para que aprueben tu proyecto. Es tecnología de ingeniería avanzada puesta en tus manos de forma simple.`,
    details: [
      "Medidas por foto: Obtén el tamaño de tu local con solo una imagen.",
      "Presupuesto de obra: Saca la cuenta de materiales y costos de construcción.",
      "Planos automáticos: Genera un dibujo de cómo se verá tu local a escala.",
      "Ahorro en diseño: Planifica tu expansión sin gastar de más en mediciones manuales."
    ]
  },
  {
    id: "reportes",
    title: "13. Mira cómo crece tu negocio (Reportes)",
    icon: BarChart3,
    content: `Para tomar buenas decisiones, necesitas información clara. En la sección de 'Reportes', convertimos todos tus números en gráficas de colores que cualquier persona puede entender. Podrás ver en qué meses vendes más, qué productos son los favoritos de tus clientes y en qué estás gastando demasiado dinero.

Incluso puedes comparar tus ventas con las de otros negocios del mismo tipo (sin ver sus datos privados, claro) para saber si te está yendo mejor que al promedio. La IA de Kyron analiza estos reportes y te da consejos: 'Oye, este producto no se está vendiendo, ¿por qué no haces una oferta?'. Es como tener un consultor de negocios experto que te asesora las 24 horas del día basándose en tus propios resultados.`,
    details: [
      "Gráficas claras: Mira el pulso de tu empresa con dibujos fáciles de entender.",
      "Consejos de la IA: Recibe sugerencias personalizadas para vender más.",
      "Comparativa de mercado: Mira cómo va tu sector comercial en tiempo real.",
      "Exportación total: Baja tus reportes en PDF o Excel para tus reuniones."
    ]
  },
  {
    id: "billetera",
    title: "14. Tu Billetera Digital Kyron",
    icon: Wallet,
    content: `Kyron incluye una 'Caja Digital' para que manejes tu dinero de forma moderna. Aquí puedes guardar saldos en bolívares, dólares o euros. Es ideal para pagarle a tus proveedores o incluso para pagar la nómina de tus empleados que también usen Kyron. Todo se hace de forma interna, sin comisiones bancarias costosas y al instante.

La billetera es muy segura y requiere tu huella o reconocimiento facial para autorizar cualquier movimiento de dinero. También puedes cambiar tus bolívares por dólares o viceversa dentro del sistema, usando la tasa oficial, para proteger tus ahorros de la inflación. Es tu banco privado dentro del ecosistema, diseñado para que el dinero se mueva tan rápido como tu negocio.`,
    details: [
      "Multimoneda: Guarda y maneja diferentes divisas en un solo lugar.",
      "Pagos internos: Envía dinero a otros usuarios de Kyron sin comisiones.",
      "Cambio seguro: Cambia tus divisas a la tasa oficial de forma garantizada.",
      "Seguridad biométrica: Usa tu huella o cara para proteger tus fondos."
    ]
  },
  {
    id: "errores",
    title: "15. Revisión automática de errores",
    icon: Activity,
    content: `Errar es de humanos, pero en los impuestos o la contabilidad un error puede salir muy caro. Por eso, Kyron tiene un sistema de 'Auditoría Permanente'. Imagina que es un supervisor invisible que revisa cada clic que das. Si por error pones un cero de más o te olvidas de una retención, el sistema te detendrá y te dirá: '¡Cuidado! Este número parece incorrecto'.

Esta revisión constante te da la paz de saber que lo que estás viendo en pantalla es la verdad. Si el sistema detecta que hay una factura duplicada o que un proveedor tiene el RIF vencido, te avisará de inmediato. Nuestro objetivo es que el riesgo de tu empresa sea CERO, para que cuando llegue una inspección real, tú estés totalmente tranquilo porque Kyron ya revisó todo mil veces antes.`,
    details: [
      "Protección 24/7: El sistema revisa tus datos todo el tiempo.",
      "Alertas de error: Avisos claros cuando algo no cuadra o falta un dato.",
      "Prevención de multas: Corrige problemas antes de que el SENIAT los vea.",
      "Verificación de RIF: Asegúrate de que tus clientes y proveedores sean legales."
    ]
  },
  {
    id: "personal-docs",
    title: "16. Tus documentos personales seguros",
    icon: User,
    content: `Kyron no solo es para empresas, también es para ti como persona. En tu 'Portal Personal', puedes subir fotos de tu cédula, pasaporte, título universitario y hasta exámenes médicos. Todo se guarda en una carpeta digital súper secreta que solo tú puedes abrir. Ya no tendrás que buscar en gavetas viejas cuando necesites un papel para un trámite.

Desde aquí puedes pedir copias certificadas de tu partida de nacimiento o gestionar tus antecedentes penales. El sistema se conecta con los entes públicos para decirte cómo va tu solicitud. También puedes generar tu propia 'Tarjeta Digital de Identificación' con un código QR, ideal para presentarte profesionalmente o para identificarte en los comercios aliados de nuestra red.`,
    details: [
      "Bóveda personal: Guarda todos tus documentos importantes sin miedo a que se mojen o pierdan.",
      "Trámites civiles: Pide partidas de nacimiento y otros papeles desde tu casa.",
      "Carnet digital: Una identificación moderna que siempre llevas en tu celular.",
      "Privacidad absoluta: Nadie, ni siquiera nosotros, puede ver tus documentos personales."
    ]
  },
  {
    id: "bancos",
    title: "17. Conecta tus cuentas bancarias",
    icon: CreditCard,
    content: `Para que no tengas que estar anotando manualmente lo que pasa en tu banco, Kyron puede 'leer' tus estados de cuenta. Cuando conectas tu banco al sistema, él mismo identifica los depósitos de tus clientes y los pagos a tus proveedores. Si un cliente te hace un Pago Móvil, el sistema lo verifica en segundos y te dice: '¡Listo, el dinero ya está en tu cuenta!'.

Esto evita que caigas en estafas con capturas de pantalla falsas, porque Kyron habla directamente con el banco para confirmar la transacción. Al final del mes, la conciliación bancaria (que es ver que el banco y tu sistema digan lo mismo) se hace sola. Es como magia, pero es ingeniería avanzada trabajando para que tú tengas menos trabajo manual y más seguridad.`,
    details: [
      "Sincronización bancaria: Tus movimientos del banco aparecen en Kyron automáticamente.",
      "Adiós a las estafas: El sistema confirma que los pagos sean reales al instante.",
      "Conciliación fácil: No pierdas tiempo cuadrando el banco con tus libros.",
      "Soporte multi-banco: Conecta todas tus cuentas de diferentes bancos en un solo lugar."
    ]
  },
  {
    id: "academia",
    title: "18. Aprende con la Academia Kyron",
    icon: School,
    content: `Queremos que seas el mejor en lo que haces. Por eso creamos la 'Academia Kyron', un sitio donde puedes tomar cursos cortos y prácticos. Aprenderás desde cómo manejar mejor tus finanzas hasta cómo usar las últimas tecnologías para vender más. Los cursos están hechos en video y con explicaciones muy fáciles, como si estuviéramos conversando.

Si tienes empleados, puedes pedirles que tomen los cursos de capacitación. Al final de cada curso, el sistema les da un certificado digital que demuestra que ahora son expertos en esa área. Mantener a tu equipo actualizado con Kyron garantiza que tu empresa use la plataforma al 100% de su capacidad, sacándole todo el provecho a tu inversión.`,
    details: [
      "Cursos en video: Aprende a tu ritmo con lecciones sencillas y rápidas.",
      "Certificados oficiales: Valida tus conocimientos con diplomas digitales.",
      "Capacitación de personal: Asegúrate de que tu equipo sepa usar bien el sistema.",
      "Nuevos temas siempre: Agregamos lecciones nuevas sobre leyes y tecnología cada mes."
    ]
  },
  {
    id: "sucursales",
    title: "19. Control de múltiples locales o empresas",
    icon: Globe,
    content: `Si tienes éxito y abres un segundo local, o si manejas varias empresas diferentes, Kyron es perfecto para ti. Nuestro módulo de 'Holding' te permite ver todo desde una sola pantalla. No tienes que salirte de una cuenta para entrar a otra; puedes saltar entre tus empresas con un solo clic y comparar cómo le va a cada una.

Puedes ver un reporte consolidado, que es como sumar los resultados de todos tus negocios para ver el panorama grande. Esto es ideal para dueños que quieren supervisar a sus gerentes sin tener que estar físicamente en cada tienda. Controla el inventario, el dinero en caja y el personal de todas tus sucursales desde la comodidad de tu casa o tu oficina principal.`,
    details: [
      "Multicentro: Maneja todas tus sucursales desde una sola cuenta maestra.",
      "Visión global: Mira cuánto dinero está ganando todo tu grupo empresarial.",
      "Gestión separada: Cada local mantiene sus propios libros pero bajo tu supervisión.",
      "Control remoto: Supervisa tus negocios desde cualquier parte del mundo."
    ]
  },
  {
    id: "soporte",
    title: "20. Cómo recibir ayuda y soporte",
    icon: MessageSquare,
    content: `Nunca estarás solo. Si alguna vez tienes una duda o algo no funciona como esperabas, nuestro equipo de soporte está listo para ayudarte. Tenemos un chat inteligente dentro de la aplicación que responde tus preguntas básicas al instante. Solo escribe: '¿Cómo hago una factura?' y él te guiará paso a paso con imágenes y flechas.

Si el problema es más complicado, puedes hablar con un humano experto. Tenemos soporte por WhatsApp y correo electrónico con personas reales que conocen el mercado venezolano. También puedes consultar nuestra base de conocimiento, que es como una enciclopedia de Kyron llena de guías y trucos para que te conviertas en un usuario maestro. Tu éxito es el nuestro, así que cuenta con nosotros para lo que necesites.`,
    details: [
      "Chat inteligente: Respuestas rápidas a tus dudas 24/7.",
      "Ayuda humana: Habla con expertos que entienden tu negocio.",
      "Guías visuales: Tutoriales paso a paso con fotos para que no te pierdas.",
      "Contacto directo: Llámanos o escríbenos por WhatsApp para soporte prioritario."
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
          .logo { width: 100pt; margin-bottom: 10pt; }
          h1 { color: #2563eb; font-size: 28pt; margin-bottom: 5pt; font-weight: bold; text-transform: uppercase; }
          .subtitle { color: #64748b; font-size: 12pt; text-transform: uppercase; letter-spacing: 2pt; }
          h2 { color: #1e40af; border-bottom: 1pt solid #e2e8f0; margin-top: 40pt; padding-bottom: 5pt; font-size: 18pt; font-weight: bold; page-break-before: always; }
          h3 { color: #2563eb; font-size: 13pt; margin-top: 20pt; font-weight: bold; text-transform: uppercase; }
          p { margin-bottom: 12pt; text-align: justify; font-size: 11pt; }
          .intro { font-size: 12pt; font-style: italic; color: #475569; margin-bottom: 30pt; padding: 15pt; background: #f8fafc; border-left: 4pt solid #2563eb; }
          ul { margin-bottom: 20pt; padding-left: 20pt; }
          li { margin-bottom: 8pt; font-size: 10.5pt; }
          .footer { margin-top: 60pt; text-align: center; font-size: 9pt; color: #94a3b8; border-top: 1pt solid #f1f5f9; padding-top: 20pt; }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${logoBase64}" class="logo" />
          <h1>SYSTEM KYRON</h1>
          <p class="subtitle">Manual de Usuario Maestro v2.6.5</p>
          <p style="margin-top: 15pt; font-weight: bold; color: #2563eb;">DOCUMENTO OFICIAL DE OPERACIONES</p>
        </div>

        <div class="intro">
          Este manual ha sido diseñado para guiarte en el uso diario de la plataforma System Kyron. Aquí encontrarás explicaciones sencillas y detalladas sobre cómo manejar cada herramienta de tu negocio o tu espacio personal. Nuestro objetivo es que tengas el control total de tu información con la máxima facilidad y seguridad.
        </div>

        ${chapters.map(ch => `
          <div class="section">
            <h2>${ch.title}</h2>
            <p>${ch.content}</p>
            <h3>Puntos clave y beneficios:</h3>
            <ul>
              ${ch.details.map(d => `<li>${d}</li>`).join('')}
            </ul>
            <p style="color: #94a3b8; font-size: 9pt;">--- Fin de la sección ${ch.id} ---</p>
          </div>
        `).join('')}

        <div class="footer">
          <p>&copy; 2026 System Kyron • Corporate Intelligence Node • Caracas, Venezuela</p>
          <p>Documento generado digitalmente por el núcleo de inteligencia Kyron</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', docContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Manual_Usuario_System_Kyron_Completo.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsExporting(false);
    toast({
        title: "MANUAL GENERADO",
        description: "El manual completo de 20 capítulos ha sido descargado.",
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
        <div className="absolute bottom-0 left-0 w-full h-full bg-secondary/[0.02] rounded-full blur-[300px]" />
      </div>

      <header className="max-w-6xl mx-auto mb-20 border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-3">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <BookOpen className="h-3 w-3" /> GUÍA DE AYUDA FÁCIL
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">
            Manual de <span className="text-primary not-italic">Usuario</span>
            </h1>
            <p className="text-muted-foreground text-[10px] md:text-[12px] font-bold uppercase tracking-[0.6em] opacity-40 mt-4 max-w-2xl leading-relaxed">
            Aprende a usar System Kyron con palabras sencillas • 20 Capítulos de Ayuda Directa
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

      {/* Navegación Rápida */}
      <div className="max-w-6xl mx-auto mb-24 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 no-print">
        {chapters.map((ch, idx) => (
            <a 
                key={ch.id} 
                href={`#${ch.id}`}
                className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all text-center group"
            >
                <ch.icon className="h-5 w-5 mx-auto mb-3 text-white/20 group-hover:text-primary transition-colors" />
                <span className="text-[8px] font-black uppercase tracking-widest text-white/40 group-hover:text-white">Sección 0{idx + 1}</span>
            </a>
        ))}
      </div>

      <div className="max-w-6xl mx-auto space-y-24 pb-32">
        {chapters.map((chapter, idx) => (
          <motion.section 
            id={chapter.id}
            key={chapter.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="scroll-mt-32"
          >
            <Card className="glass-card border-none rounded-[3rem] bg-white/[0.02] overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-all pointer-events-none">
                <chapter.icon className="h-64 w-64 rotate-12" />
              </div>
              
              <div className="grid lg:grid-cols-12 gap-0">
                <div className="lg:col-span-1 bg-white/[0.03] border-r border-white/5 flex items-center justify-center p-8 lg:p-0">
                    <span className="text-4xl font-black text-white/10 uppercase vertical-text tracking-tighter">
                        CH.{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                </div>

                <div className="lg:col-span-11 p-10 md:p-16 space-y-12">
                    <header className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-primary/10 rounded-[1.5rem] border border-primary/20 shadow-inner">
                                <chapter.icon className="h-8 w-8 text-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-white">{chapter.title}</h2>
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-primary/40 to-transparent"></div>
                    </header>

                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Guía Detallada</h4>
                                <p className="text-lg font-medium italic text-white/70 leading-relaxed text-justify whitespace-pre-wrap">
                                    {chapter.content}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="p-8 rounded-[2rem] bg-black/40 border border-white/5 shadow-inner">
                                <h4 className="text-[9px] font-black uppercase tracking-[0.6em] text-white/30 mb-6 flex items-center gap-3">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" /> Puntos Importantes
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
                            
                            <div className="p-8 rounded-[2rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center group-hover:border-primary/20 transition-colors">
                                <Activity className="h-6 w-6 text-white/10 mb-4 animate-pulse" />
                                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/10 italic">Sección Verificada</span>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </Card>
          </motion.section>
        ))}
      </div>

      <footer className="max-w-6xl mx-auto border-t border-white/5 pt-20 pb-10 text-center space-y-10">
        <div className="space-y-4">
            <h3 className="text-2xl font-black uppercase italic italic-shadow">¿Necesitas Ayuda Personalizada?</h3>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] max-w-lg mx-auto">Nuestro equipo está listo para apoyarte en cualquier momento. ¡Escríbenos!</p>
        </div>
        <div className="flex justify-center gap-4">
            <Button variant="outline" className="h-14 px-10 rounded-2xl border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                CENTRO DE AYUDA
            </Button>
            <Button asChild className="btn-3d-primary h-14 px-10 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl">
                <Link href="/">VOLVER AL INICIO</Link>
            </Button>
        </div>
        <p className="text-[9px] font-black text-white/10 uppercase tracking-[1em] italic pt-10">
            SYSTEM KYRON • CORPORATE INTELLIGENCE • 2026
        </p>
      </footer>
    </div>
  );
}
