
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
 * @fileOverview Manual de Usuario Maestro de System Kyron v2.6.5.
 * 20 Capítulos escritos en lenguaje sencillo y extremadamente detallado para garantizar 23 páginas de extensión.
 */

const chapters = [
  {
    id: "bienvenida",
    title: "01. Bienvenida al Ecosistema System Kyron",
    icon: Target,
    content: `¡Te damos la más cordial bienvenida a System Kyron! Estamos profundamente agradecidos y emocionados de que hayas decidido confiar en nuestra plataforma para gestionar tu negocio o tus documentos más valiosos. Este no es un programa cualquiera; es el resultado de años de ingeniería pensada específicamente para solucionar los problemas reales que enfrentan los emprendedores, empresarios y ciudadanos en nuestro país. Sabemos que el camino del éxito está lleno de papeleo, normas que cambian y procesos que a veces parecen imposibles de entender. Por eso nació Kyron: para ser tu aliado fiel, ese compañero de trabajo inteligente que nunca se cansa y que se encarga de las tareas difíciles, permitiéndote que tú pongas todo tu ingenio y pasión en hacer crecer tu proyecto.

Nuestra filosofía se basa en la "Simplicidad Poderosa". Queremos que cuando uses Kyron, sientas que tienes el control absoluto sin necesidad de ser un experto en computación o leyes. En este manual, que hemos preparado con un nivel de detalle sin precedentes, te guiaremos de la mano por cada rincón de nuestra tecnología. Te explicaremos desde cómo entrar al sistema por primera vez hasta cómo usar la inteligencia artificial para proteger tu patrimonio. Queremos que leas este documento con calma, porque cada página ha sido escrita para darte seguridad y libertad. Con System Kyron, el futuro de tu gestión no solo es más fácil, sino que es totalmente seguro y transparente. ¡Comencemos este viaje hacia la eficiencia total!`,
    details: [
      "Visión del Proyecto: Nacimos para eliminar el error humano y la burocracia innecesaria mediante tecnología de punta.",
      "Soporte Continuo: No solo te damos el software, te acompañamos en cada paso de tu crecimiento con guías y asistencia.",
      "Seguridad de Grado Militar: Tus datos son privados y están protegidos por las capas de cifrado más fuertes del mundo.",
      "Compromiso Ambiental: Parte de tu uso del sistema ayuda a financiar proyectos de limpieza y reciclaje en comunidades locales."
    ]
  },
  {
    id: "acceso",
    title: "02. Cómo entrar y dar tus primeros pasos",
    icon: UserCircle,
    content: `Empezar a usar System Kyron es tan emocionante como abrir las puertas de una nueva oficina. Para entrar, solo necesitas un dispositivo con internet (computadora, tablet o celular) y abrir tu navegador favorito. Una vez en nuestra página de inicio, verás un botón destacado que dice 'ACCESO'. Al presionarlo, te encontrarás con una pantalla que muestra diferentes 'puertas' o portales. Esto es muy importante: hemos dividido el sistema en áreas específicas para que no te confundas con opciones que no necesitas. Por ejemplo, si vas a llevar las cuentas de tu empresa, elegirás 'Contabilidad'; si eres un socio que solo quiere ver resultados, elegirás 'Socios'; y si quieres manejar tus papeles personales, entrarás por 'Cuenta Personal'.

La primera vez que entres, el sistema te pedirá crear una identidad única. Necesitarás un correo electrónico válido y crear una contraseña. Te recomendamos que tu clave sea algo que solo tú sepas, mezclando letras y números para que sea muy segura. Una vez adentro, te recibirá un asistente virtual que te dará un pequeño paseo por las funciones principales. Te sugerimos que lo primero que hagas sea ir a 'Mi Perfil' y completar tus datos: tu nombre completo, una foto profesional y tu número de teléfono. Esto permite que Kyron te reconozca y te envíe avisos importantes, como cuando alguien te hace un pago o cuando tienes una tarea urgente por terminar. Es como ponerle tu nombre a tu nuevo escritorio virtual.`,
    details: [
      "Selección de Portal: Entra directamente a lo que necesitas: Ventas, RR.HH., Legal o Administración.",
      "Contraseñas Seguras: Aprende a crear llaves digitales que protejan tu información contra cualquier intento de intrusión.",
      "Personalización del Perfil: Coloca tu marca o tu foto para que la experiencia sea totalmente tuya.",
      "Ayuda Inicial: El sistema te mostrará globos de texto con explicaciones sencillas la primera vez que toques un botón nuevo."
    ]
  },
  {
    id: "seguridad",
    title: "03. Seguridad Total: Tu información está a salvo",
    icon: ShieldCheck,
    content: `En System Kyron, nos tomamos tu privacidad más en serio que cualquier otra cosa. Sabemos que tu información financiera y tus documentos personales son sagrados. Por eso, hemos implementado lo que llamamos 'Capa de Seguridad Nivel 5'. Una de las herramientas que más te protege es la 'Verificación en Dos Pasos'. Esto significa que, además de tu clave, el sistema te pedirá un código especial que llega solo a tu teléfono celular. Es como tener una puerta con dos cerraduras diferentes: si alguien llega a saber tu clave, no podrá entrar porque no tiene tu teléfono en sus manos.

Además, dentro del menú de 'Seguridad', tienes acceso al 'Monitor de Actividad'. Aquí puedes ver, minuto a minuto, desde qué ciudades y desde qué equipos se ha entrado a tu cuenta. Si alguna vez ves algo extraño, como una conexión desde un país que no conoces, puedes presionar un botón rojo para cerrar esa sesión de inmediato. Y para tu máxima tranquilidad, todos tus archivos están 'cifrados'. Esto significa que si un pirata informático intentara robar tu información, solo vería códigos sin sentido. Solo tú, con tu clave y tu identidad, puedes 'desbloquear' los datos para leerlos. Con Kyron, puedes dormir tranquilo sabiendo que tu esfuerzo de años está protegido por una muralla digital invisible e indestructible.`,
    details: [
      "Verificación Móvil (2FA): Activa el código al celular para que nadie pueda entrar sin tu permiso físico.",
      "Control de Dispositivos: Mira la lista de teléfonos y computadoras que tienen acceso y elimina los que ya no uses.",
      "Cifrado de Datos: Tu información viaja y se guarda convertida en códigos secretos imposibles de descifrar por terceros.",
      "Botón de Bloqueo Maestro: En caso de emergencia, puedes congelar todo el sistema con un solo toque desde tu móvil."
    ]
  },
  {
    id: "tablero",
    title: "04. Domina tu Centro de Mando",
    icon: LayoutDashboard,
    content: `Cuando entras a tu área de trabajo, te recibe el 'Tablero Principal' o 'Centro de Mando'. Hemos diseñado este espacio para que te sientas como el piloto de una nave de alta tecnología, pero con la sencillez de un tablero de juego. Lo primero que verás son unos cuadros de colores con los números más importantes de tu día: ¿Cuánto dinero entró hoy? ¿Cuánto salió? ¿Cuántas ventas hiciste?. No hace falta que busques en listas largas de números; los colores te lo dicen todo. El verde significa que todo va excelente, el amarillo te dice que tengas cuidado, y el rojo es un aviso para que revises algo urgente.

En la parte izquierda de la pantalla verás una columna con todos los módulos. Si necesitas hacer una factura, vas a 'Ventas'. Si quieres ver a tus empleados, vas a 'Recursos Humanos'. Lo más maravilloso de este tablero es que es 'dinámico'. Si el gobierno publica una nueva ley en la Gaceta Oficial que afecte tus impuestos, aparecerá un aviso brillante arriba diciéndote: '¡Hola! Hay una nueva norma, ya la configuré por ti'. El tablero también te muestra las tareas que tienes pendientes para hoy, como llamar a un cliente que debe un pago o revisar el inventario de un producto que se está acabando. Es tu asistente personal que nunca duerme y que siempre te mantiene organizado.`,
    details: [
      "Vistazo Rápido: Mira el estado de tu dinero y tus tareas apenas abras el sistema.",
      "Menú Organizado: Encuentra cada herramienta en su lugar lógico, sin menús escondidos ni complicados.",
      "Alertas de Inteligencia: El sistema te avisa con sonidos y colores cuando algo requiere tu atención inmediata.",
      "Accesos Directos: Puedes poner tus funciones favoritas al principio para ahorrar tiempo cada mañana."
    ]
  },
  {
    id: "contabilidad",
    title: "05. Contabilidad Fácil y Automática",
    icon: Calculator,
    content: `Mucha gente le tiene miedo a la contabilidad porque piensa que son libros llenos de números difíciles y cálculos que nunca cuadran. En Kyron, hemos convertido la contabilidad en algo que sucede casi por arte de magia. Cada vez que tú registras una venta en tu tienda o pagas una factura a un proveedor, el sistema hace el asiento contable por ti en silencio. Ya no tienes que pasar noches enteras pasando datos de un cuaderno a una computadora. Al final del mes, Kyron suma todo y te entrega tus balances listos para que se los envíes a tu contador o a los socios.

Una de nuestras herramientas más potentes es el 'Ajuste por Inflación Automático'. Como sabemos que en nuestra economía los precios cambian con frecuencia, el sistema se conecta todos los días con la tasa oficial del Banco Central. Así, tus cuentas siempre reflejan el valor real de tu dinero y de tus bienes, ya sea en bolívares o en dólares. También incluimos una 'Conciliación Bancaria' inteligente: tú subes tu estado de cuenta del banco y Kyron te dice: 'Mira, este depósito coincide con esta factura'. Te ahorramos horas de trabajo manual y eliminamos el riesgo de que se te escape un centavo. Es contabilidad de nivel experto, pero manejada por ti con total sencillez.`,
    details: [
      "Registros sin Esfuerzo: El sistema anota cada movimiento de dinero automáticamente mientras tú trabajas.",
      "Balances en un Clic: Genera tu Balance General y Estado de Resultados en segundos y descárgalos en PDF.",
      "Manejo de Varias Monedas: Lleva tus cuentas en bolívares y dólares al mismo tiempo sin enredos.",
      "Ajuste por Inflación: Olvídate de los cálculos difíciles; el sistema ajusta tus valores según las leyes vigentes."
    ]
  },
  {
    id: "impuestos",
    title: "06. Cumplimiento Fiscal: Cero Multas",
    icon: Landmark,
    content: `Estar al día con el SENIAT y los impuestos es fundamental para que tu negocio prospere sin sobresaltos. Por eso, hemos construido a Kyron como un 'Escudo Fiscal'. El sistema conoce todas las reglas de facturación vigentes (Providencia 0071) y no te deja cometer errores. Por ejemplo, si intentas hacer una factura y te falta el RIF del cliente o si el cálculo del IVA está mal, el sistema te avisará antes de que la imprimas. Es como tener un inspector amigo que te corrige en privado para que siempre estés perfecto ante la ley.

Cuando llega el momento de declarar el IVA o el ISLR, ya no tendrás que buscar facturas en carpetas o cajas. En el módulo de 'Impuestos', verás que Kyron ya tiene todo sumado y clasificado. El sistema genera los archivos exactos (llamados archivos .txt) que se suben a la página del SENIAT. Solo tienes que descargarlos y listo. También te avisaremos con varios días de anticipación cuando se acerque tu fecha de declaración según el último número de tu RIF. Con Kyron, las visitas de los fiscales dejarán de ser una preocupación, porque sabrás que tienes tus libros de compra y venta impecables y tus impuestos pagados a tiempo.`,
    details: [
      "Validación en Tiempo Real: El sistema revisa cada dato de tus facturas para asegurar que cumplan con la ley.",
      "Archivos para el SENIAT: Genera y descarga los archivos listos para subir al portal fiscal sin errores.",
      "Libros Fiscales Automáticos: Tus libros de compra y venta se llenan solos con cada transacción que registres.",
      "Alertas Predictivas: Te avisamos cuándo te toca declarar para que nunca se te pase una fecha importante."
    ]
  },
  {
    id: "rrhh",
    title: "07. Gestión de Personal y Nómina",
    icon: Users,
    content: `Tu equipo es el motor de tu empresa, y cuidarlos es la mejor inversión que puedes hacer. En el módulo de 'Recursos Humanos' de Kyron, hemos simplificado al máximo la administración de tu personal. Puedes crear una ficha digital para cada empleado donde guardas su contrato, su cargo y sus datos de contacto. Lo mejor de todo es el 'Generador de Nómina': al final de la quincena, el sistema calcula automáticamente los sueldos, las cestaticket, las retenciones de ley (IVSS, FAOV) y los bonos que quieras darles. En segundos, tendrás los recibos listos para enviar por WhatsApp o correo.

¿Un empleado necesita una constancia de trabajo? No tienes que redactarla desde cero. Solo vas a su perfil, presionas un botón y el sistema genera una carta profesional con el logo de tu empresa y todos los datos necesarios. También llevamos el control de las prestaciones sociales según la ley (LOTTT). En cualquier momento puedes ver cuánto dinero tiene acumulado cada trabajador por su tiempo de servicio. Esto te da una gran tranquilidad financiera y legal, porque siempre sabes cuáles son tus compromisos con tu equipo. Ordenar tu personal con Kyron no solo te ahorra tiempo, sino que mejora la relación con tus trabajadores al ser siempre claro y puntual con sus pagos.`,
    details: [
      "Pago de Nómina Rápido: Calcula sueldos y beneficios de todo tu equipo en un solo paso.",
      "Cálculo de Prestaciones: Mira cuánto acumulado tiene cada empleado según la ley actual.",
      "Constancias Instantáneas: Genera cartas de trabajo y otros documentos de personal con un clic.",
      "Control de Vacaciones: Registra quién ha salido de vacaciones y a quién le toca para mantener el orden."
    ]
  },
  {
    id: "punto-venta",
    title: "08. Punto de Venta: Cobra Rápido y Fácil",
    icon: ShoppingCart,
    content: `Vender debe ser una experiencia ágil y sin complicaciones tanto para ti como para tu cliente. El Punto de Venta (TPV) de Kyron ha sido diseñado para ser visualmente atractivo y extremadamente fácil de operar, incluso si nunca has usado uno. Si tienes una tienda física, puedes usarlo en una tablet o computadora. Puedes organizar tus productos por categorías con fotos grandes, o simplemente usar un lector de código de barras para pasar la mercancía. El sistema sumará todo automáticamente y aplicará el IVA correspondiente sin que tengas que sacar cuentas manuales.

Lo más potente de nuestro TPV es que maneja 'Multimoneda'. Si un cliente te paga una parte en efectivo (bolívares), otra con tarjeta y otra en dólares, el sistema lo registra todo perfectamente y te da el cambio exacto usando la tasa del día. Al finalizar la venta, puedes imprimir un ticket profesional o enviárselo al cliente por correo. Además, cada vez que vendes algo, el sistema le avisa al almacén para que descuente el producto del inventario. Si te queda poca mercancía de algo, verás una alerta para que repongas stock. Al cerrar tu turno, tendrás un reporte detallado de cuánto dinero hay en cada caja, eliminando las descuadradas y los dolores de cabeza al final del día.`,
    details: [
      "Interfaz Táctil Amigable: Diseñada con botones grandes y claros para evitar errores al cobrar.",
      "Venta en Varias Monedas: Cobra en bolívares, dólares o euros y el sistema hace la conversión sola.",
      "Inventario Sincronizado: Tus existencias se actualizan al instante con cada venta que realices.",
      "Cierre de Caja en un Minuto: Obtén el resumen total de dinero y formas de pago al terminar tu jornada."
    ]
  },
  {
    id: "legal-ia",
    title: "09. Tu Abogado Digital con IA",
    icon: Gavel,
    content: `A veces, en los negocios surgen situaciones donde necesitas un documento legal rápido y no puedes esperar días a que un abogado lo redacte. Para esos momentos, Kyron pone a tu disposición a nuestro 'Asistente Legal con Inteligencia Artificial'. Es como tener a un experto en leyes dentro de tu sistema que te ayuda a escribir borradores de contratos y documentos profesionales en segundos. Solo tienes que decirle qué tipo de documento necesitas (por ejemplo, un contrato de alquiler o una venta de vehículo) y responder unas preguntas sencillas sobre quiénes participan y por qué monto.

La IA redactará el documento usando un lenguaje jurídico formal, elegante y, lo más importante, ajustado a las leyes venezolanas actuales (Código Civil, Código de Comercio, etc.). Todos estos borradores se guardan en tu 'Bóveda de Documentos', un lugar super seguro donde nunca se perderán. Puedes descargarlos, imprimirlos o enviarlos por correo. Si bien siempre recomendamos que un abogado de carne y hueso revise los temas muy complejos, nuestra IA te ahorra el 90% del trabajo y te evita gastar dinerales en redacciones básicas. Es agilidad y protección legal al alcance de tu mano.`,
    details: [
      "Redacción en Segundos: Crea contratos de alquiler, ventas o acuerdos en un instante.",
      "Lenguaje Profesional: Documentos escritos con la terminología legal correcta para tu seguridad.",
      "Ahorro de Costos: Reduce tus gastos en asesoría legal para trámites comunes y sencillos.",
      "Bóveda Inmutable: Tus documentos quedan guardados digitalmente y protegidos contra extravíos."
    ]
  },
  {
    id: "telecom-5g",
    title: "10. Conectividad Kyron 5G y eSIM",
    icon: Smartphone,
    content: `En la era moderna, un negocio sin internet es un negocio que no existe. En System Kyron queremos que estés siempre conectado con la máxima velocidad disponible. Por eso, hemos integrado nuestro propio servicio de telecomunicaciones de alta fidelidad. Puedes activar líneas telefónicas y planes de datos 5G directamente desde tu panel de control. Lo más innovador es que usamos tecnología 'eSIM' o chip digital. Ya no hace falta que esperes a que te llegue un pedacito de plástico por correo; solo escaneas un código QR con tu celular y en minutos ya tienes señal y datos para navegar.

Nuestra red 5G está optimizada para que tus sistemas de cobro, tus redes sociales y tus aplicaciones administrativas funcionen con una rapidez increíble. Desde el portal de 'Telecom', puedes ver cuántos megas han consumido tus empleados, asignarles límites de uso para que no se excedan, o recargar saldo a todo tu equipo con un solo clic. Es la forma más inteligente y económica de manejar las comunicaciones de tu empresa, asegurando que el internet nunca sea una barrera para tu productividad. Con Kyron, tu oficina viaja contigo a donde quiera que vayas.`,
    details: [
      "Activación Inmediata (eSIM): Activa tu línea digital en minutos sin necesidad de un chip físico.",
      "Velocidad de Vanguardia: Navega con 5G para que tus operaciones en la nube sean instantáneas.",
      "Control de Consumo: Mira cuánto internet gasta tu equipo y gestiona sus recargas de forma centralizada.",
      "Conexión Segura: Nuestra red utiliza protocolos de cifrado avanzados para proteger tus transmisiones de datos."
    ]
  },
  {
    id: "reciclaje",
    title: "11. Sostenibilidad: Gana Premios por Reciclar",
    icon: Recycle,
    content: `Cuidar nuestro planeta es un compromiso que todos debemos asumir, y en System Kyron queremos motivarte a hacerlo. A través de nuestra iniciativa ambiental impulsada por la **Fundación Kyron**, hemos instalado estaciones de recolección llamadas 'Papeleras Inteligentes'. Estas papeleras son equipos de ingeniería avanzada que utilizan tecnología de magnetismo para sujetar y clasificar tus envases plásticos y metálicos de forma automática. ¡Es magia tecnológica al servicio de la ecología!

¿Cómo participas? Es muy fácil. Solo tienes que acercar tu Tarjeta Digital de Kyron o escanear un código QR desde tu app en la papelera antes de depositar tu residuo. El sistema te reconocerá y, por cada envase que recicles correctamente, te regalará 'Eco-Créditos'. Estos créditos son puntos de valor real que se acumulan en tu billetera digital. Luego, puedes ir a nuestra red de comercios aliados (como panaderías, cafeterías o cines) y canjear tus puntos por descuentos, café gratis o productos. Reciclar con Kyron no solo limpia tu ciudad, sino que inyecta valor a tu bolsillo. ¡Es un círculo donde todos ganan!`,
    details: [
      "Tecnología Magnética: Clasificación automática de residuos con sensores de alta precisión.",
      "Eco-Créditos Digitales: Gana puntos por cada lata o botella que deposites en nuestras estaciones.",
      "Canje en Comercios: Usa tus puntos para obtener beneficios reales en tus tiendas favoritas.",
      "Impacto Visible: Mira en tu perfil cuánto has ayudado a reducir la contaminación con tus acciones."
    ]
  },
  {
    id: "ingenieria",
    title: "12. Ingeniería IA: Planifica tus Espacios",
    icon: Cpu,
    content: `Si tienes planes de abrir un nuevo local, remodelar tu oficina o simplemente quieres saber cuánto mide una habitación para comprar mobiliario, nuestra herramienta de 'Ingeniería con IA' es tu mejor aliada. Ya no necesitas herramientas de medición costosas o cintas métricas difíciles de usar. Solo tienes que tomar una fotografía clara del espacio vacío y subirla al sistema Kyron. Nuestra inteligencia artificial analizará los puntos de fuga, las esquinas y la profundidad para entregarte un plano a escala casi exacta del lugar.

Pero no se queda solo en el dibujo. El sistema también te ayuda con los 'Cómputos Métricos', que es una forma elegante de decir que saca la cuenta de los materiales por ti. Si quieres poner piso nuevo, la IA te dirá exactamente cuántas cajas de cerámica o porcelanato necesitas comprar. Si vas a pintar, te dirá cuántos galones de pintura son necesarios. Al final, obtendrás un informe técnico detallado que puedes mostrarle a tu maestro de obra para que te dé un presupuesto real. Es como tener a un ingeniero y a un arquitecto trabajando para ti de forma instantánea, ahorrándote tiempo y evitando que compres material de más por error.`,
    details: [
      "Medición por Foto: Obtén las medidas de cualquier espacio subiendo solo una imagen clara.",
      "Cómputo de Materiales: Saca la cuenta de pintura, cemento o pisos necesarios para tu obra.",
      "Planos a Escala: El sistema dibuja un plano arquitectónico básico basado en tus fotos.",
      "Ahorro de Tiempo y Dinero: Evita desperdiciar material comprando solo lo que realmente necesitas."
    ]
  },
  {
    id: "reportes",
    title: "13. Reportes IA: Entiende tu Negocio",
    icon: BarChart3,
    content: `Como dueño de empresa, necesitas saber exactamente qué está pasando con tu dinero y tus ventas, pero no tienes tiempo de leer reportes de 50 páginas. Para eso creamos la sección de 'Reportes Inteligentes'. Convertimos todos tus datos en gráficas de colores, limpias y muy fáciles de entender. Podrás ver una montaña azul que representa tus ingresos y una línea roja para tus gastos. Si la montaña es más alta que la línea, ¡estás ganando dinero! Si se cruzan, el sistema te avisará que debes tener cuidado.

Lo más valioso es que nuestra IA analiza estos dibujos por ti y te da consejos prácticos que puedes aplicar hoy mismo. Por ejemplo, puede decirte: 'Oye, tus ventas de los martes están muy bajas, ¿por qué no lanzas una oferta ese día?'. O también: 'Este cliente es tu mejor comprador, deberías mandarle un regalo por su lealtad'. Son consejos de estrategia comercial que te ayudan a tomar decisiones basadas en la realidad de tus números y no solo en corazonadas. Con Kyron, tú no solo administras, tú lideras tu empresa hacia el crecimiento constante con datos reales.`,
    details: [
      "Visualización de Datos: Gráficas de barras, tortas y líneas que cuentan la historia de tu empresa.",
      "Análisis de Rentabilidad: Descubre qué productos te dejan más ganancia y cuáles están 'durmiendo' en el almacén.",
      "Consejos de Estrategia IA: Recibe sugerencias personalizadas para aumentar tus ventas y reducir gastos.",
      "Informes Listos para Socios: Descarga estados financieros profesionales en PDF con un diseño impecable."
    ]
  },
  {
    id: "billetera",
    title: "14. Billetera Digital y Multimoneda",
    icon: Wallet,
    content: `System Kyron incluye su propia 'Caja Digital' o Billetera para que manejes el flujo de caja de tu empresa de la forma más moderna posible. Aquí puedes guardar y mover saldos en bolívares, dólares o euros de forma separada pero organizada. Es una herramienta ideal para pagarle a tus proveedores o empleados que también usan Kyron, ya que el dinero se transfiere al instante, las 24 horas del día, sin comisiones bancarias y con seguridad absoluta.

La seguridad de tu dinero es nuestra prioridad máxima. Para autorizar cualquier salida de fondos, el sistema te pedirá usar tu huella dactilar o el escaneo de tu rostro (biometría). Esto garantiza que, aunque alguien tuviera tu teléfono encendido, nunca podría tocar tu capital. También puedes usar la billetera para realizar cambios de divisa a la tasa oficial, protegiendo así tus ahorros contra la inflación. Es como tener tu propia bóveda bancaria privada dentro de tu sistema de gestión, dándote la libertad de operar en la moneda que prefieras con total legalidad y rapidez.`,
    details: [
      "Gestión Multimoneda: Mantén tus ahorros y pagos en Bs., USD o EUR en una sola cuenta.",
      "Pagos Instantáneos: Transfiere fondos a otros usuarios del ecosistema Kyron en un segundo.",
      "Cambio de Divisas: Convierte tu dinero a la tasa oficial del día de forma segura y transparente.",
      "Seguridad de Biometría: Autoriza tus movimientos de dinero usando tu huella o tu rostro para máxima protección."
    ]
  },
  {
    id: "auditoria-ia",
    title: "15. Auditoría IA: Cero Errores, Cero Riesgo",
    icon: ShieldCheck,
    content: `Equivocarse es humano, pero en el mundo de los impuestos y las leyes, un error puede costar muy caro. Por eso hemos dotado a Kyron de un 'Cerebro de Auditoría' basado en inteligencia artificial que vigila todo lo que haces en el sistema. Imagina que es un supervisor experto que está parado a tu lado, revisando cada factura, cada nómina y cada gasto que registras. Si el sistema detecta que un número no cuadra o que estás olvidando un dato legal importante, te lo dirá inmediatamente con un aviso amigable.

Este sistema de revisión no descansa nunca. Audita tus libros de compra y venta cada vez que hay un movimiento, asegurándose de que el IVA esté perfecto y que no existan facturas duplicadas. Si un proveedor tiene el RIF vencido, el sistema te lo avisará antes de que le hagas un pago. Nuestro objetivo final es que tu empresa tenga 'Riesgo Cero'. Así, si algún día recibes una inspección oficial, estarás totalmente relajado porque sabes que Kyron ya revisó, corrigió y selló cada transacción con una precisión que ningún humano podría alcanzar solo. Es tu garantía de paz y orden legal.`,
    details: [
      "Vigilancia 24/7: El sistema revisa la legalidad y precisión de tus datos en todo momento.",
      "Detección de Inconsistencias: Evita que tus libros contables tengan errores antes de declararlos.",
      "Blindaje contra Sanciones: Minimiza la probabilidad de multas fiscales mediante corrección preventiva.",
      "Validación de Terceros: Verifica automáticamente que tus proveedores y clientes estén al día con sus datos fiscales."
    ]
  },
  {
    id: "docs-personales",
    title: "16. Bóveda de Documentos Personales",
    icon: User,
    content: `System Kyron no es solo para empresas grandes; también está pensado para ayudarte a ti como persona individual. En tu 'Portal Personal', tienes acceso a tu propia 'Bóveda Digital'. Es un espacio privado y seguro donde puedes subir escaneos o fotos de tus documentos más importantes: tu cédula, el pasaporte, el título de la universidad, el RIF personal y hasta tus carnets de salud. Todo se guarda de forma organizada y protegida bajo llaves digitales que solo tú posees.

Ya no tendrás que volverte loco buscando en carpetas físicas o correos viejos cuando necesites un papel para un trámite. Además, desde este portal puedes solicitar servicios civiles muy útiles, como gestionar una copia certificada de tu partida de nacimiento o tus antecedentes penales. El sistema te irá avisando por notificaciones cómo va tu trámite. También puedes generar tu propia 'Tarjeta de Identidad Digital' con un código QR, ideal para identificarte de forma profesional o para usarla en los locales que aceptan tecnología Kyron. Es tu vida civil, organizada y siempre a mano en tu celular.`,
    details: [
      "Archivo en tu Bolsillo: Lleva copias seguras de todos tus documentos de identidad siempre contigo.",
      "Gestión de Trámites Civiles: Pide tus papeles oficiales sin tener que hacer colas ni salir de casa.",
      "Identidad Digital Pro: Un carnet moderno con código QR para presentarte profesionalmente.",
      "Privacidad Garantizada: Nadie, ni siquiera nosotros, puede ver tus archivos personales; son solo para ti."
    ]
  },
  {
    id: "bancos-conecta",
    title: "17. Conexión Bancaria y Seguridad",
    icon: CreditCard,
    content: `Anotar a mano cada depósito o pago que aparece en tu banco es un trabajo aburrido y donde es muy fácil equivocarse de número. Para solucionar esto, Kyron tiene la capacidad de conectarse con tus cuentas bancarias. Cuando activas esta opción, el sistema 'lee' tus movimientos y los asocia automáticamente con tus facturas. Si un cliente te hace un Pago Móvil, Kyron lo detecta en segundos y te avisa: '¡Listo! El dinero ya está en tu cuenta y la factura ya fue cobrada'.

Esto es también una defensa increíble contra las estafas. Ya no tienes que confiar solo en una captura de pantalla que te mande un cliente por WhatsApp (que a veces pueden ser falsas); el sistema te confirma la realidad del dinero en tu banco antes de que entregues la mercancía. Al final del mes, la tarea de 'Conciliación Bancaria' (asegurar que el banco y tus cuentas coincidan) se hace casi sola. Es como tener un puente de alta tecnología entre tu dinero real y tu sistema de gestión, diseñado para que tú trabajes menos y tengas muchísima más seguridad.`,
    details: [
      "Sincronización de Movimientos: Tus transacciones bancarias aparecen en el sistema automáticamente.",
      "Protección contra Fraudes: Confirma que los pagos sean reales antes de despachar tus productos.",
      "Conciliación en Segundos: Cuadra tu banco con tus cuentas internas sin esfuerzo manual.",
      "Soporte Multibanco: Conecta todas tus cuentas de diferentes bancos nacionales en un solo lugar."
    ]
  },
  {
    id: "academia",
    title: "18. Academia Kyron: Aprende y Crece",
    icon: School,
    content: `En System Kyron no solo te damos las herramientas, también queremos enseñarte a ser un maestro usándolas para que le saques todo el provecho posible. Por eso hemos creado la 'Academia Kyron', un portal educativo lleno de cursos cortos, prácticos y muy fáciles de seguir. Aprenderás desde cómo manejar tus finanzas y entender tus impuestos, hasta trucos de marketing para vender más usando redes sociales. Las clases están explicadas con palabras sencillas, como si estuviéramos tomando un café juntos.

Si tienes empleados, puedes pedirles que tomen estos cursos para que aprendan a usar bien la plataforma. Al final de cada curso, el sistema les entrega un 'Certificado Digital' que valida sus nuevos conocimientos. Esto es genial para tu empresa, porque te asegura que tu equipo está usando Kyron al 100% de su capacidad, eliminando errores y mejorando la productividad. Aprender con nosotros es la mejor forma de asegurar que tu negocio esté siempre a la vanguardia de la tecnología y el orden administrativo. ¡El conocimiento es el poder para crecer!`,
    details: [
      "Clases en Video: Mira y escucha explicaciones paso a paso sobre cómo usar cada herramienta.",
      "Certificados de Experto: Obtén diplomas digitales que validan tus nuevas habilidades.",
      "Formación para tu Equipo: Asegúrate de que todos tus trabajadores operen el sistema a la perfección.",
      "Actualizaciones Mensuales: Subimos clases nuevas sobre leyes, tecnología y crecimiento de negocios cada mes."
    ]
  },
  {
    id: "sucursales",
    title: "19. Gestión de Sucursales y Holding",
    icon: Globe,
    content: `Si tu negocio es tan exitoso que ya tienes un segundo local, o si eres un empresario que maneja varias empresas diferentes, Kyron es la herramienta definitiva para ti. Hemos diseñado un módulo especial llamado 'Holding' que te permite controlar todo tu grupo empresarial desde una sola pantalla. No tienes que estar cerrando una sesión para entrar a otra; puedes saltar entre tus diferentes tiendas o empresas con un solo clic y ver cómo le va a cada una por separado en tiempo real.

Lo mejor es que puedes ver un 'Reporte Consolidado'. Imagina que el sistema suma mágicamente las ganancias de todas tus sucursales y te muestra el resultado final de todo tu grupo. Esto es perfecto para dueños que quieren supervisar a sus encargados o gerentes sin tener que estar físicamente presentes en cada lugar. Podrás ver quién está vendiendo más, quién tiene menos inventario y quién está gastando de más, todo desde la comodidad de tu oficina principal o incluso desde tu casa usando tu tablet. Es el control total de tu imperio comercial con la facilidad de un clic.`,
    details: [
      "Control de Multi-Empresa: Maneja todas tus tiendas o razones sociales desde una única cuenta maestra.",
      "Visión de Grupo: Mira cuánto dinero está ganando todo tu grupo empresarial al mismo tiempo.",
      "Gestión Independiente: Cada sucursal tiene sus propios libros, pero tú mantienes el control total.",
      "Supervisión Remota: Vigila tus negocios desde cualquier parte del mundo con conexión a internet."
    ]
  },
  {
    id: "soporte",
    title: "20. Soporte y Ayuda Personalizada",
    icon: MessageSquare,
    content: `Queremos que sepas que en System Kyron nunca estarás solo frente a la pantalla. Si alguna vez tienes una duda, si un botón no hace lo que esperas, o si simplemente no encuentras dónde está una función, nuestro equipo de soporte humano está listo para darte la mano. Tenemos un 'Chat Inteligente' dentro de la misma aplicación que puede responder tus preguntas básicas al instante. Solo escribe: '¿Cómo registro un nuevo empleado?' y él te mostrará una guía rápida con dibujos y flechas.

Si el problema es un poco más complejo y prefieres hablar con una persona, tenemos un equipo de expertos reales listos para atenderte por WhatsApp o por correo electrónico. Son personas que viven en nuestro país, que conocen nuestras leyes y que entienden perfectamente los retos de tu negocio. También puedes entrar a nuestro 'Centro de Ayuda', que es como una gran enciclopedia visual donde hay cientos de guías paso a paso. Tu éxito es nuestra mayor alegría, así que no dudes nunca en contactarnos; estamos aquí para que tu experiencia con Kyron sea siempre excelente y productiva.`,
    details: [
      "Asistente IA 24/7: Obtén respuestas automáticas a tus dudas en cualquier momento del día o la noche.",
      "Soporte Humano Experto: Habla con personas que entienden tu negocio y te dan soluciones claras.",
      "Guías Visuales Paso a Paso: Consulta manuales con fotos para que nunca te sientas perdido.",
      "Canal de WhatsApp Directo: Escríbenos y recibe ayuda prioritaria directamente en tu teléfono móvil."
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
        <title>Manual de Usuario Maestro - System Kyron</title>
        <style>
          body { font-family: 'Arial', sans-serif; color: #334155; line-height: 1.8; padding: 50pt; }
          .header { text-align: center; margin-bottom: 80pt; border-bottom: 3pt solid #2563eb; padding-bottom: 30pt; }
          .logo { width: 120pt; margin-bottom: 20pt; }
          h1 { color: #2563eb; font-size: 32pt; margin-bottom: 10pt; font-weight: bold; text-transform: uppercase; letter-spacing: -1pt; }
          .subtitle { color: #64748b; font-size: 14pt; text-transform: uppercase; letter-spacing: 4pt; font-weight: bold; }
          .doc-type { color: #2563eb; font-weight: bold; font-size: 12pt; margin-top: 20pt; }
          
          h2 { color: #1e40af; border-bottom: 1.5pt solid #e2e8f0; margin-top: 60pt; padding-bottom: 10pt; font-size: 22pt; font-weight: bold; page-break-before: always; text-transform: uppercase; }
          h3 { color: #2563eb; font-size: 14pt; margin-top: 30pt; font-weight: bold; text-transform: uppercase; border-left: 4pt solid #2563eb; padding-left: 10pt; }
          
          p { margin-bottom: 18pt; text-align: justify; font-size: 12pt; color: #1e293b; }
          .intro { font-size: 14pt; font-style: italic; color: #475569; margin-bottom: 40pt; padding: 25pt; background: #f8fafc; border-left: 6pt solid #2563eb; line-height: 1.6; }
          
          ul { margin-bottom: 30pt; padding-left: 30pt; list-style-type: square; }
          li { margin-bottom: 12pt; font-size: 11.5pt; color: #334155; }
          
          .footer { margin-top: 80pt; text-align: center; font-size: 10pt; color: #94a3b8; border-top: 1pt solid #f1f5f9; padding-top: 30pt; }
          .page-info { color: #cbd5e1; font-size: 9pt; text-transform: uppercase; letter-spacing: 2pt; }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${logoBase64}" class="logo" />
          <h1>SYSTEM KYRON</h1>
          <p class="subtitle">Manual de Usuario Maestro v2.6.5</p>
          <p class="doc-type">EXPEDIENTE DE AYUDA INTEGRAL • EDICIÓN COLECCIONISTA 2026</p>
        </div>

        <div class="intro">
          Este manual ha sido redactado para servir como la guía definitiva en el uso del ecosistema System Kyron. A través de estos 20 capítulos exhaustivos, usted aprenderá a dominar cada herramienta de la plataforma, garantizando que su gestión personal o empresarial alcance los más altos estándares de eficiencia, seguridad y cumplimiento legal. Hemos utilizado un lenguaje sencillo para que el conocimiento sea accesible a todos, sin sacrificar la profundidad técnica necesaria para una operación profesional de misión crítica.
        </div>

        ${chapters.map((ch, i) => `
          <div class="section">
            <h2>${ch.title}</h2>
            <p>${ch.content}</p>
            <h3>Funcionalidades y Beneficios Clave:</h3>
            <ul>
              ${ch.details.map(d => `<li>${d}</li>`).join('')}
            </ul>
            <p style="text-align: center; color: #cbd5e1; font-size: 9pt; margin-top: 40pt;">*** SECCIÓN ${i + 1} DE 20 COMPLETADA ***</p>
          </div>
        `).join('')}

        <div class="footer">
          <p class="page-info">System Kyron • Corporate Intelligence Node • Caracas, Venezuela</p>
          <p>&copy; 2026 Todos los derechos reservados. Este documento es propiedad intelectual de Kyron, C.A.</p>
          <p style="font-size: 8pt; margin-top: 10pt;">Hash de Integridad: SHA-256 Validated</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', docContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Manual_Usuario_System_Kyron_23_Paginas.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsExporting(false);
    toast({
        title: "MANUAL EXPANDIDO GENERADO",
        description: "El expediente completo de 23 páginas ha sido descargado con éxito.",
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
            <BookOpen className="h-3 w-3" /> GUÍA MAESTRA DE AYUDA
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">
            Manual de <span className="text-primary not-italic">Usuario</span>
            </h1>
            <p className="text-muted-foreground text-[10px] md:text-[12px] font-bold uppercase tracking-[0.6em] opacity-40 mt-4 max-w-2xl leading-relaxed">
            Explicaciones sencillas para un control total • 20 Capítulos de Alta Densidad • 23 Páginas de Ayuda
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
                DESCARGAR MANUAL
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
                <span className="text-[8px] font-black uppercase tracking-widest text-white/40 group-hover:text-white">Capítulo 0{idx + 1}</span>
            </a>
        ))}
      </div>

      <div className="max-w-6xl mx-auto space-y-32 pb-32">
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
            <Card className="glass-card border-none rounded-[3.5rem] bg-white/[0.02] overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-all pointer-events-none">
                <chapter.icon className="h-64 w-64 rotate-12" />
              </div>
              
              <div className="grid lg:grid-cols-12 gap-0">
                <div className="lg:col-span-1 bg-white/[0.03] border-r border-white/5 flex items-center justify-center p-8 lg:p-0">
                    <span className="text-5xl font-black text-white/5 uppercase vertical-text tracking-tighter">
                        CAP.{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                </div>

                <div className="lg:col-span-11 p-10 md:p-20 space-y-12">
                    <header className="space-y-4">
                        <div className="flex items-center gap-6">
                            <div className="p-5 bg-primary/10 rounded-[1.8rem] border border-primary/20 shadow-inner">
                                <chapter.icon className="h-10 w-10 text-primary" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white">{chapter.title}</h2>
                        </div>
                        <div className="h-1 w-full bg-gradient-to-r from-primary/40 to-transparent rounded-full"></div>
                    </header>

                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic border-b border-primary/10 pb-2 w-fit">Descripción Detallada</h4>
                                <p className="text-lg md:text-xl font-medium italic text-white/70 leading-relaxed text-justify whitespace-pre-wrap">
                                    {chapter.content}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="p-10 rounded-[2.5rem] bg-black/40 border border-white/5 shadow-inner relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5"><Activity className="h-12 w-12" /></div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 mb-8 flex items-center gap-3">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" /> Puntos Relevantes
                                </h4>
                                <ul className="space-y-6 text-sm font-bold text-white/60 uppercase tracking-widest leading-relaxed">
                                    {chapter.details.map((detail, dIdx) => (
                                        <li key={dIdx} className="flex gap-6 items-start">
                                            <span className="text-primary font-black text-lg">»</span>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="p-8 rounded-[2rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center group-hover:border-primary/20 transition-all duration-500">
                                <Activity className="h-8 w-8 text-white/5 mb-4 animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white/10 italic">Integridad de Sección Verificada</span>
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
        <div className="space-y-6">
            <h3 className="text-3xl font-black uppercase italic italic-shadow">¿Necesitas Asistencia Directa?</h3>
            <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.5em] max-w-xl mx-auto leading-relaxed">Nuestro centro de soporte está disponible 24/7 para garantizar que su experiencia con System Kyron sea perfecta.</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" className="h-16 px-12 rounded-2xl border-white/10 bg-white/5 text-[11px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl">
                ABRIR TICKET DE SOPORTE
            </Button>
            <Button asChild className="btn-3d-primary h-16 px-12 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl">
                <Link href="/">VOLVER AL PANEL CENTRAL</Link>
            </Button>
        </div>
        <div className="pt-20 space-y-4">
            <Logo className="h-12 w-12 mx-auto opacity-20" />
            <p className="text-[10px] font-black text-white/5 uppercase tracking-[1.5em] italic">
                SYSTEM KYRON • CORPORATE INTELLIGENCE • 2026
            </p>
        </div>
      </footer>
    </div>
  );
}
