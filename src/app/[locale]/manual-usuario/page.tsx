
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
  User,
  LayoutDashboard
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
 * 20 Capítulos escritos en lenguaje sencillo y extremadamente detallado para garantizar extensión.
 */

const chapters = [
  {
    id: "bienvenida",
    title: "01. Bienvenida a System Kyron",
    icon: Target,
    content: `¡Bienvenido a System Kyron! Estamos muy felices de que hayas elegido nuestra plataforma para manejar tu negocio o tus documentos personales. Este sistema ha sido creado para facilitarte la vida de una manera que nunca imaginaste. Sabemos que manejar una empresa en nuestro país puede ser un camino lleno de retos, papeleos infinitos y leyes que cambian de la noche a la mañana. Por eso, diseñamos Kyron: para que sea ese compañero de trabajo inteligente que nunca se cansa, que se encarga de todo lo aburrido y lo complicado, permitiéndote que tú pongas toda tu energía en lo que realmente importa: hacer que tu negocio crezca y que tus sueños se hagan realidad.

En este manual, que hemos preparado con mucho cariño y atención al detalle, te explicaremos paso a paso cómo usar cada una de las herramientas de la forma más fácil posible. No tienes que preocuparte si no eres un experto en computadoras o en tecnología moderna; hemos diseñado Kyron para que sea tan intuitivo como usar tu teléfono celular. Aquí encontrarás la respuesta a todas tus dudas, desde cómo registrar una venta hasta cómo manejar los pagos de tus empleados o cómo proteger tus documentos legales más importantes. Recuerda siempre que Kyron es un sistema de altísima seguridad que cuida tu información como si fuera un tesoro, dándote la tranquilidad y el respaldo que tú y tu familia merecen.`,
    details: [
      "Diseño Amigable: Hemos creado botones grandes, colores claros y explicaciones que cualquier persona puede entender sin necesidad de manuales técnicos complicados.",
      "Integración Total: Ya no tendrás que saltar de un programa a otro. En Kyron, la contabilidad habla con las ventas, y las ventas hablan con el inventario de forma natural.",
      "Seguridad Bancaria: Utilizamos la misma tecnología que los bancos más grandes del mundo para que nadie pueda ver tus datos privados sin tu autorización expresa.",
      "Actualización Automática: Cuando el gobierno anuncia un cambio en los impuestos o en las leyes laborales, el sistema se ajusta solo. Tú no tienes que hacer nada, solo seguir trabajando."
    ]
  },
  {
    id: "inicio",
    title: "02. Cómo empezar a usar el sistema",
    icon: UserCircle,
    content: `Entrar al mundo de System Kyron es el primer paso hacia una gestión mucho más ordenada. El proceso es sumamente sencillo. Cuando escribas nuestra dirección en tu navegador, lo primero que verás es una pantalla elegante con una opción brillante que dice 'ACCESO'. Al presionar ese botón, se abrirán varias 'puertas' o portales. Esto lo hicimos para que cada persona entre exactamente al lugar que necesita sin perderse en opciones que no va a usar. Si eres el dueño de la empresa o el encargado de las cuentas, elegirás 'Contabilidad'. Si eres un socio que solo quiere ver cómo van las ganancias, entrarás por 'Socios'. Los empleados tienen su propio portal de 'Recursos Humanos', y si tú solo quieres guardar tus papeles personales, entrarás por 'Cuenta Personal'.

Una vez que elijas tu portal, el sistema te pedirá tu nombre de usuario y tu contraseña. Te pedimos que crees una clave que sea fuerte pero que puedas recordar con facilidad. La primera vez que logres entrar, te daremos un pequeño tour de bienvenida. Te recomendamos que te tomes unos minutos para completar tu perfil personal: coloca tu nombre completo, verifica que tu correo electrónico esté bien escrito y, si quieres, sube una foto tuya. Esto es muy útil porque permite que el sistema se dirija a ti por tu nombre y que te envíe avisos urgentes si, por ejemplo, una factura está por vencer o si recibiste un pago nuevo.`,
    details: [
      "Selección de Portal: Cada entrada está diseñada para un rol específico, lo que hace que la pantalla sea más limpia y fácil de navegar.",
      "Contraseña de Protección: Tu clave es tu firma digital. Asegúrate de no compartirla con nadie para mantener tu información siempre a salvo.",
      "Perfil de Usuario: Al tener tus datos al día, el sistema puede automatizar muchas tareas por ti, como el envío de correos o reportes.",
      "Asistente de Bienvenida: Si es tu primera vez, deja que el sistema te guíe por las funciones principales para que te sientas como en casa desde el primer minuto."
    ]
  },
  {
    id: "seguridad",
    title: "03. Protegiendo tu cuenta y tus datos",
    icon: ShieldCheck,
    content: `Para nosotros en Kyron, proteger tu información no es solo una tarea técnica, es un compromiso de honor. Sabemos que en tus manos tienes el esfuerzo de muchos años, por eso hemos blindado el sistema con lo mejor de la tecnología actual. Una de las funciones que más te recomendamos usar es la 'Verificación de Identidad por Teléfono' (también llamada 2FA). Al activarla, el sistema te pedirá un código especial que solo llegará a tu móvil cada vez que intentes entrar. Es como tener un guardaespaldas digital que confirma que realmente eres tú quien quiere acceder a las cuentas.

Pero no nos quedamos ahí. Dentro de la sección de seguridad, tendrás una herramienta llamada 'Monitor de Conexiones'. Allí podrás ver una lista de todos los dispositivos (como teléfonos, tablets o computadoras) que han entrado a tu cuenta recientemente. Si ves algo que no te suena familiar, puedes cerrar esa sesión inmediatamente con un solo botón. Y en casos extremos, si llegas a perder tu teléfono principal, tenemos un 'Botón de Pánico' o Bloqueo Maestro que congela el acceso a todos tus documentos sensibles hasta que tú mismo verifiques tu identidad nuevamente. Queremos que sientas que con Kyron, tu información está en una caja fuerte digital indestructible.`,
    details: [
      "Doble Cerradura Digital: El código al teléfono asegura que nadie entre a tu cuenta aunque sepa tu contraseña.",
      "Control de Dispositivos: Tú tienes el mando total para decidir qué computadoras pueden ver tus datos y cuáles no.",
      "Privacidad Absoluta: Tus documentos están cifrados, lo que significa que se convierten en códigos secretos que solo tú puedes leer.",
      "Bloqueo de Emergencia: Ante cualquier sospecha de robo o pérdida, puedes proteger toda tu empresa en un segundo."
    ]
  },
  {
    id: "tablero",
    title: "04. Conoce tu tablero de herramientas",
    icon: LayoutDashboard,
    content: `Imagina que eres el capitán de un barco y que el Tablero de Kyron es tu panel de navegación. Hemos diseñado este espacio para que, sin tener que buscar mucho, sepas exactamente qué está pasando en tu negocio en este mismo instante. En la parte central verás unos cuadros grandes con números importantes: cuánto dinero ha entrado hoy, cuánto has tenido que pagar y cuánto te queda libre. Si los números están en verde, ¡celébralo, vas por buen camino! Si aparecen en rojo, el sistema te está avisando que debes prestar atención a ese gasto.

En la parte izquierda de tu pantalla siempre estará el menú principal. Está organizado por categorías lógicas como 'Ventas', 'Contabilidad' o 'Personal'. Lo más increíble de este tablero es que es inteligente. No es solo una pantalla quieta; si hay una tarea que tienes pendiente, como declarar un impuesto que vence mañana o un empleado que necesita una constancia de trabajo, el tablero te pondrá una pequeña campana brillante o un aviso de color. Es como tener un secretario que te recuerda lo importante para que tú puedas relajarte y dedicarte a ser creativo y a buscar nuevos clientes.`,
    details: [
      "Gráficos de Fácil Lectura: No necesitas ser matemático; los dibujos te muestran si tu negocio está creciendo o si debes ahorrar.",
      "Acceso Directo: Llega a cualquier parte del sistema en menos de dos clics.",
      "Recordatorios Automáticos: Olvídate de anotar fechas en calendarios de papel; el sistema lo hace por ti.",
      "Resumen de Hoy: Mira las ventas del día y los pagos realizados apenas entras al sistema."
    ]
  },
  {
    id: "contabilidad",
    title: "05. Contabilidad sin complicaciones",
    icon: Calculator,
    content: `Mucha gente piensa que la contabilidad es algo aburrido y lleno de números difíciles, pero en Kyron la hemos transformado en una experiencia sencilla y hasta satisfactoria. Ya no tienes que pasar horas llenando hojas de Excel o anotando en cuadernos que luego se pierden. El sistema es tan inteligente que 'aprende' de lo que haces. Por ejemplo, cuando registras una venta en el mostrador, Kyron ya sabe que ese dinero entró a tu caja y lo anota automáticamente en tu contabilidad sin que tú tengas que hacer nada adicional.

Una herramienta que te va a ahorrar muchísimo tiempo y dinero es nuestro calculador de 'Ajuste por Inflación'. Como sabemos que en nuestro país los precios cambian, el sistema se conecta con los datos oficiales y ajusta el valor de tus bienes y de tu dinero para que tus reportes financieros siempre digan la verdad. Al final de cada mes o de cada año, con solo presionar un botón, el sistema te entregará tu 'Balance General' y tu 'Estado de Resultados' listos para que se los muestres a tu contador o a los socios. Es contabilidad profesional, pero hecha para gente que quiere resultados rápidos y sin errores.`,
    details: [
      "Libros que se llenan solos: Tus registros contables se actualizan con cada venta o compra que hagas.",
      "Manejo de Varias Monedas: Lleva tus cuentas en bolívares y dólares al mismo tiempo sin enredarte con las tasas de cambio.",
      "Reportes Listos para Imprimir: Genera documentos oficiales que cumplen con todas las normas contables de Venezuela.",
      "Control de Gastos: Categoriza tus gastos (como luz, alquiler o sueldos) para saber en qué se está yendo el dinero."
    ]
  },
  {
    id: "impuestos",
    title: "06. Tus impuestos siempre al día",
    icon: Landmark,
    content: `Sabemos que cumplir con los impuestos y con el SENIAT es una de las mayores preocupaciones de cualquier dueño de negocio. Una multa puede ser un golpe muy fuerte para tu economía. Por eso, hemos diseñado a Kyron para que sea tu escudo protector. El sistema revisa cada factura que emites y cada compra que registras para asegurarse de que el RIF sea correcto, que el número de control siga la secuencia y que el cálculo del IVA esté perfecto. Si algo falta o está mal escrito, el sistema te lo dirá amablemente antes de que sea un problema.

Cuando llegue el momento de declarar, ya sea quincenal o mensualmente, no tendrás que buscar facturas en carpetas polvorientas. Kyron tiene una sección llamada 'Centro de Declaración' donde ya todo está sumado y organizado. Solo tienes que descargar un archivo pequeño (que llamamos archivo .txt) y subirlo directamente a la página del SENIAT. Es un proceso que antes tomaba horas y ahora solo te tomará unos minutos. Además, te avisaremos con varios días de anticipación para que nunca se te pase una fecha de pago y evites multas por olvido.`,
    details: [
      "Validación de RIF: El sistema verifica que los datos de tus clientes y proveedores sean reales y estén activos.",
      "Libros de Compra y Venta: Estos libros obligatorios se generan automáticamente y están siempre listos para una inspección.",
      "Cálculo de Retenciones: Si eres contribuyente especial, el sistema hace los cálculos de retención de IVA e ISLR por ti.",
      "Calendario Fiscal: Un aviso visual te recordará siempre cuándo te toca declarar según el último número de tu RIF."
    ]
  },
  {
    id: "personal",
    title: "07. Manejo fácil de tus empleados",
    icon: Users,
    content: `Tus empleados son como tu segunda familia y la parte más importante de tu empresa. Por eso, en Kyron hemos creado un espacio dedicado exclusivamente a cuidarlos y organizar todo lo relacionado con ellos. En el módulo de 'Personal', puedes crear una ficha digital para cada trabajador. Allí pondrás su nombre, su cargo, cuánto gana y hasta sus datos de emergencia. Lo mejor de todo es que el sistema calcula la nómina de forma automática. Al final de la quincena, solo tienes que revisar los montos y el sistema generará los recibos de pago.

¿Necesitas saber cuánto tiene acumulado un empleado en prestaciones sociales? Ya no tienes que sacar cuentas manuales difíciles. Solo entras al perfil del empleado y verás el monto exacto al día de hoy, calculado según la ley (LOTTT). También puedes llevar un control de las vacaciones para que sepas quién ha descansado y a quién le toca pronto. Todo este orden no solo hace que tus empleados estén más contentos y seguros, sino que te protege a ti legalmente porque tienes todas las pruebas de que cumples con tus obligaciones como patrono de forma justa.`,
    details: [
      "Nómina en un Clic: Paga a todo tu personal en segundos con cálculos de sueldo y bonos exactos.",
      "Cálculo de Liquidaciones: Si un empleado se va, el sistema te dice exactamente cuánto debes pagarle según la ley.",
      "Control de Asistencia: Registra las faltas o permisos de forma organizada para que la nómina siempre sea correcta.",
      "Recibos por WhatsApp: Envía el comprobante de pago directamente al teléfono del empleado para ahorrar papel y tiempo."
    ]
  },
  {
    id: "ventas",
    title: "08. Vende más con nuestro Punto de Venta",
    icon: ShoppingCart,
    content: `Vender debe ser la parte más emocionante de tu día. Para que sea así, creamos el Punto de Venta (TPV) de Kyron, pensando en que sea rápido, colorido y muy fácil de usar. Es ideal si usas una tablet en tu mostrador o una computadora. Puedes buscar los productos por su nombre o simplemente usar un lector de códigos de barras. Al elegir los productos, el sistema te muestra el total de inmediato y te permite elegir cómo te va a pagar el cliente: ¿en efectivo?, ¿con tarjeta?, ¿por Pago Móvil? o ¿con dólares?. El sistema maneja todo eso sin que te confundas con las cuentas.

Lo que hace que nuestro sistema sea especial es que está 'vivo'. Cada vez que vendes algo, el sistema le avisa al almacén: 'Oye, acabamos de vender una camisa, descuéntala del inventario'. Si te queda poca mercancía de algún producto, verás un aviso de alerta para que pidas más a tu proveedor antes de que se te agote. Al cerrar el día, el sistema te entrega un resumen de todo lo que vendiste y cuánto dinero deberías tener en caja. Se acabaron los cierres de caja hasta las 10 de la noche; con Kyron, cierras tu tienda en un minuto y te vas a descansar tranquilo.`,
    details: [
      "Pantalla Táctil Amigable: Diseñada con botones grandes para que no cometas errores al cobrar.",
      "Inventario en Tiempo Real: El sistema sabe exactamente qué tienes en tus estantes en cada momento.",
      "Multimoneda Flexible: Cobra en bolívares o divisas y el sistema hace la conversión a la tasa del día automáticamente.",
      "Ticket de Venta Profesional: Entrega a tus clientes un comprobante elegante con tu logo y todos los datos legales."
    ]
  },
  {
    id: "legal-ia",
    title: "09. Crea contratos legales en segundos",
    icon: Gavel,
    content: `A veces necesitas un documento legal rápido, como un contrato de alquiler o un permiso, y no tienes tiempo de esperar a que un abogado lo redacte. Para esos momentos creamos nuestra 'Inteligencia Artificial Legal'. Es como tener un abogado experto dentro de tu computadora que te ayuda a redactar borradores de documentos profesionales en solo segundos. Solo tienes que decirle qué tipo de papel necesitas, los nombres de las personas involucradas y los montos o fechas importantes.

La IA escribirá el documento usando las palabras correctas y citando las leyes venezolanas actuales para que el papel tenga fuerza y seriedad. Todos estos borradores se guardan en tu 'Bóveda de Documentos', un lugar seguro donde nunca se van a perder ni a mojar. Si luego quieres que tu abogado de confianza le dé un vistazo final, ya le estarás entregando un trabajo adelantado en un 90%, lo que te ahorrará mucho dinero en honorarios. Es tecnología pensada para darte poder legal y agilidad en tus negocios.`,
    details: [
      "Redacción Instantánea: Crea borradores de contratos comunes (alquiler, venta de carros, etc.) en un momento.",
      "Lenguaje de Abogado: La IA utiliza términos legales formales y precisos para tu protección.",
      "Bóveda de Resguardo: Todos tus contratos quedan archivados digitalmente para que los consultes cuando quieras.",
      "Fácil de Personalizar: Puedes cambiar cualquier parte del documento antes de imprimirlo o enviarlo."
    ]
  },
  {
    id: "telecom-5g",
    title: "10. Activa tu línea telefónica Kyron 5G",
    icon: Smartphone,
    content: `En Kyron no solo nos ocupamos de tus cuentas, también queremos que estés siempre conectado. Por eso, tenemos nuestro propio servicio de telefonía e internet móvil de alta velocidad. Puedes activar una línea nueva para ti o para tu empresa sin necesidad de comprar un chip de plástico. Usamos una tecnología llamada 'eSIM' o chip digital. Solo tienes que escanear un código con la cámara de tu teléfono y, en un par de minutos, ya tendrás señal y datos para navegar.

Nuestra red es 5G, lo que significa que es increíblemente rápida. Esto es muy importante para tu negocio, porque asegura que tus sistemas de cobro, tus redes sociales y tu contabilidad siempre tengan internet para funcionar, sin importar dónde estés. Además, desde tu panel de Kyron puedes ver cuántos megas han gastado tus empleados, ponerles límites de consumo o recargarles saldo a todos juntos con un solo botón. Es la forma más moderna, rápida y económica de manejar las comunicaciones de tu equipo de trabajo.`,
    details: [
      "Activación Digital (eSIM): Olvídate de hacer colas en tiendas; activa tu línea desde tu casa u oficina.",
      "Velocidad Ultra Rápida: Navega con 5G para que tus aplicaciones de trabajo vuelen.",
      "Gestión de Flota: Controla las líneas de todos tus trabajadores desde una sola pantalla.",
      "Planes a tu Medida: Elige el plan que más te convenga según cuánto internet necesites cada mes."
    ]
  },
  {
    id: "reciclaje",
    title: "11. Gana puntos por reciclar",
    icon: Recycle,
    content: `Cuidar el medio ambiente es una tarea de todos, y en Kyron queremos premiarte por hacerlo. A través de nuestra Fundación, hemos instalado estaciones de reciclaje llamadas 'Papeleras Inteligentes' en plazas y centros comerciales. Estas papeleras son maravillas tecnológicas: usan imanes y sensores especiales para saber si lo que estás botando es plástico o metal. Lo mejor de todo es que cada vez que reciclas, el sistema te reconoce y te da un premio.

¿Cómo funciona? Acercas tu teléfono o tu tarjeta digital de Kyron a la papelera antes de botar tu envase. El sistema te identifica y, por cada botella o lata que recicles, te regala 'Eco-Créditos'. Estos créditos son como puntos de regalo que se acumulan en tu billetera digital. Luego, puedes ir a nuestras tiendas aliadas, como panaderías, cafeterías o cines, y usar esos puntos para pagar o para obtener descuentos especiales. ¡Es nuestra forma de decirte gracias por ayudar a que nuestro país sea más limpio y verde!`,
    details: [
      "Premios por Reciclar: Recibe puntos reales cada vez que uses nuestras estaciones inteligentes.",
      "Billetera de Puntos: Mira en tu perfil cuántos 'Eco-Créditos' llevas acumulados.",
      "Canje en Comercios: Usa tus puntos para comprar café, entradas al cine o productos en tiendas amigas.",
      "Ayuda al Planeta: El sistema te muestra cuánto has ayudado a reducir la contaminación con tus acciones."
    ]
  },
  {
    id: "ingenieria",
    title: "12. Planifica tu local comercial",
    icon: Cpu,
    content: `Si estás soñando con abrir una nueva tienda, una oficina o simplemente quieres remodelar tu negocio actual, esta herramienta de ingeniería te va a fascinar. Hemos creado una Inteligencia Artificial que puede 'leer' los espacios. Ya no necesitas una cinta métrica complicada para saber cuánto mide un local vacío. Solo tienes que tomar una foto del espacio y subirla a Kyron. La IA analizará la foto y, basándose en las paredes y el suelo, te entregará las medidas casi exactas del lugar.

Pero no solo te da las medidas. El sistema también te ayuda a calcular cuántos materiales vas a necesitar para la obra. Por ejemplo, te dirá: 'Para este piso necesitas 50 cajas de porcelanato' o 'Para estas paredes necesitas 4 galones de pintura'. Al final, te entrega un informe técnico muy completo que puedes imprimir y mostrarle a tu maestro de obra o al dueño del local para que aprueben tus cambios. Es como tener un ingeniero civil y un arquitecto trabajando para ti de forma instantánea y sencilla.`,
    details: [
      "Medidas por Fotografía: Obtén el tamaño de cualquier local subiendo solo una imagen.",
      "Cálculo de Materiales: Saca la cuenta de cuánta pintura, piso o cemento vas a gastar.",
      "Planos Automáticos: El sistema dibuja un plano básico a escala de tu espacio.",
      "Presupuesto de Obra: Estima cuánto dinero vas a invertir en la remodelación antes de empezar."
    ]
  },
  {
    id: "reportes",
    title: "13. Mira cómo crece tu negocio (Reportes)",
    icon: BarChart3,
    content: `Un buen dueño de negocio necesita saber hacia dónde va su empresa, y para eso creamos la sección de 'Reportes'. Aquí no verás listas de números aburridas; convertimos toda tu información en gráficas de colores muy bonitas y fáciles de entender. Podrás ver, por ejemplo, una montaña de color azul que te muestra tus ventas: si la montaña sube cada mes, ¡felicidades, tu negocio está creciendo!

También podrás saber cuáles son tus productos 'estrella', esos que se venden más rápido, y cuáles son los que están 'dormidos' y necesitan una oferta para salir. Nuestra Inteligencia Artificial analiza estos dibujos por ti y te da consejos prácticos: 'Oye, los sábados vendes mucha comida, ¿por qué no pones una oferta especial ese día?'. Es como tener un asesor de negocios experto que mira tus cuentas todos los días y te dice qué hacer para ganar más dinero y gastar menos.`,
    details: [
      "Dibujos Fáciles: Entiende la salud de tu empresa mirando gráficas de barras y tortas de colores.",
      "Análisis de Ventas: Descubre qué productos te dan más dinero y cuáles menos.",
      "Consejos de la IA: Recibe sugerencias personalizadas para mejorar tu estrategia comercial.",
      "Descarga Profesional: Guarda tus reportes en PDF para imprimirlos o enviarlos por correo a tus socios."
    ]
  },
  {
    id: "billetera",
    title: "14. Tu Billetera Digital Kyron",
    icon: Wallet,
    content: `Kyron incluye su propia 'Caja Digital' o Billetera para que manejes tu dinero de la forma más moderna y segura posible. En esta sección puedes guardar saldos en diferentes monedas: bolívares, dólares o euros. Es una herramienta fantástica porque te permite pagarle a tus proveedores que también usen Kyron de forma inmediata, sin tener que esperar a que el banco procese la transferencia y sin pagar comisiones costosas.

La seguridad de tu billetera es máxima. Para mover cualquier cantidad de dinero, el sistema te pedirá usar tu huella dactilar o que mires a la cámara para reconocerte (biometría). Así, aunque alguien sepa tu clave, nunca podrá tocar tu dinero. También puedes usar la billetera para cambiar tus bolívares a dólares (según la tasa oficial) y así proteger tus ahorros de la inflación. Es como tener tu propio banco privado y seguro dentro del ecosistema de tu empresa, disponible en todo momento.`,
    details: [
      "Multimoneda Real: Maneja tus fondos en diferentes divisas sin complicaciones.",
      "Pagos al Instante: Envía dinero a otros usuarios de Kyron en un segundo.",
      "Cambio Seguro: Compra divisas a la tasa oficial de forma garantizada y legal.",
      "Seguridad Biométrica: Protege tu capital usando tu huella o tu rostro para autorizar pagos."
    ]
  },
  {
    id: "errores",
    title: "15. Revisión automática de errores",
    icon: Activity,
    content: `Equivocarse es algo muy común, pero en el mundo de los impuestos y las cuentas, un pequeño error puede traer grandes problemas. Por eso, en Kyron hemos creado un 'Sistema de Auditoría Permanente'. Imagina que es un supervisor invisible que está parado detrás de ti, revisando cada dato que escribes. Si por descuido escribes un número que no cuadra o si te falta un dato importante en una factura, el sistema se detendrá y te pondrá un aviso: '¡Atención! Este dato parece incorrecto'.

Esta revisión no descansa nunca. El sistema chequea que todas tus cuentas cuadren al centavo. Si detecta, por ejemplo, que el IVA de una factura está mal calculado o que estás intentando registrar una compra a un proveedor que tiene el RIF vencido, te avisará de inmediato. Nuestro objetivo es que tu negocio tenga 'Riesgo Cero'. Así, cuando llegue una inspección real de las autoridades, tú estarás totalmente relajado porque sabes que Kyron ya revisó y corrigió todo mil veces antes de que ellos llegaran.`,
    details: [
      "Supervisor 24/7: El sistema vigila la integridad de tus datos en todo momento.",
      "Alertas de Corrección: Avisos claros y amigables cuando algo no está bien.",
      "Protección contra Multas: Evita problemas legales antes de que ocurran.",
      "Validación de Datos: Asegúrate de que toda tu información fiscal sea 100% legal."
    ]
  },
  {
    id: "personal-docs",
    title: "16. Tus documentos personales seguros",
    icon: User,
    content: `Kyron no solo es una herramienta potente para las empresas, también está pensada para ayudarte a ti como persona individual. En tu 'Portal Personal', tendrás tu propia 'Bóveda Digital'. Es un espacio privado donde puedes subir fotos o escaneos de tus documentos más importantes: tu cédula de identidad, el pasaporte, el título de la universidad, el RIF personal y hasta tus exámenes médicos. Todo se guarda de forma organizada y bajo una seguridad extrema.

Ya no tendrás que volverte loco buscando en carpetas o gavetas cuando necesites un papel para un trámite. Además, desde este portal puedes pedir servicios útiles, como solicitar una copia certificada de tu partida de nacimiento o gestionar tus antecedentes penales. El sistema te irá avisando cómo va tu proceso. También puedes generar tu propia 'Tarjeta de Identidad Digital' con un código QR, que es ideal para presentarte de forma profesional o identificarte en los locales que usan tecnología Kyron.`,
    details: [
      "Tu Archivo en el Celular: Lleva siempre contigo copias seguras de todos tus documentos.",
      "Gestión de Trámites: Pide tus papeles oficiales sin tener que salir de casa.",
      "Carnet Digital Moderno: Una forma elegante y tecnológica de identificarte.",
      "Privacidad Garantizada: Nadie puede ver lo que guardas en tu bóveda personal, es solo para ti."
    ]
  },
  {
    id: "bancos",
    title: "17. Conecta tus cuentas bancarias",
    icon: CreditCard,
    content: `Sabemos que anotar a mano cada movimiento del banco en tus cuentas es un trabajo tedioso y donde es fácil cometer errores. Para solucionar esto, Kyron tiene la capacidad de 'leer' tus estados de cuenta bancarios. Cuando conectas tu banco al sistema, él mismo identifica los depósitos que te hacen tus clientes y los pagos que le haces a tus proveedores. Si un cliente te dice que ya te hizo un Pago Móvil, el sistema lo verifica en segundos y te confirma: '¡Excelente, el dinero ya está en tu banco!'.

Esto es una gran defensa contra las estafas, ya que no tendrás que confiar solo en una captura de pantalla que te envíen, sino que el sistema confirma la realidad del dinero. Al final del mes, la tarea de 'Conciliación Bancaria' (que es asegurar que lo que dice el banco coincida con lo que dicen tus libros) se hace casi sola. Es como tener un puente de alta tecnología entre tu banco y tu negocio, diseñado para que tú trabajes menos y tengas muchísima más seguridad en tu dinero.`,
    details: [
      "Lectura Automática: Tus movimientos bancarios aparecen en el sistema sin que tengas que escribirlos.",
      "Protección contra Fraudes: El sistema confirma que los pagos sean reales antes de que entregues la mercancía.",
      "Conciliación en un Segundo: Cuadra tu banco con tus cuentas internas de forma automática.",
      "Soporte para Varios Bancos: Conecta todas tus cuentas de diferentes bancos en un solo lugar centralizado."
    ]
  },
  {
    id: "academia",
    title: "18. Aprende con la Academia Kyron",
    icon: School,
    content: `En Kyron no solo te damos las herramientas, también queremos enseñarte a ser un maestro usándolas. Por eso creamos la 'Academia Kyron', un sitio web especial lleno de cursos cortos, prácticos y muy fáciles de seguir. Aprenderás desde cómo manejar mejor tus finanzas y entender tus impuestos, hasta trucos de marketing para vender más usando redes sociales. Los cursos están grabados en video y explicados con palabras que todos entendemos, como si estuviéramos tomando un café.

Si tienes empleados, puedes pedirles que tomen estos cursos para que aprendan a usar bien la plataforma. Al final de cada curso, el sistema les entrega un 'Certificado Digital' que valida que ahora son expertos en esa área. Esto es genial porque te asegura que tu equipo está usando Kyron al 100% de su capacidad, sacándole todo el provecho a tu inversión. Aprender con nosotros es la mejor forma de asegurar que tu negocio esté siempre a la vanguardia de la tecnología y el orden administrativo.`,
    details: [
      "Clases en Video: Aprende mirando y escuchando explicaciones sencillas y paso a paso.",
      "Certificados de Experto: Obtén diplomas digitales que validan tus nuevos conocimientos.",
      "Formación para tu Equipo: Asegúrate de que todos tus trabajadores sepan usar el sistema a la perfección.",
      "Temas Actualizados: Cada mes subimos clases nuevas sobre leyes, tecnología y crecimiento de negocios."
    ]
  },
  {
    id: "sucursales",
    title: "19. Control de múltiples locales o empresas",
    icon: Globe,
    content: `Si tu negocio es tan exitoso que ya tienes un segundo local, o si eres un empresario que maneja varias empresas diferentes, Kyron es la herramienta definitiva para ti. Hemos diseñado un módulo especial llamado 'Holding' que te permite controlar todo tu imperio empresarial desde una sola pantalla. No tienes que estar cerrando una sesión para entrar a otra; puedes saltar entre tus diferentes tiendas o empresas con un solo clic y ver cómo le va a cada una por separado.

Lo mejor es que puedes ver un 'Reporte Consolidado'. Imagina que el sistema suma mágicamente las ganancias de todas tus sucursales y te muestra el resultado final de todo tu grupo. Esto es perfecto para dueños que quieren supervisar a sus encargados o gerentes sin tener que estar físicamente presentes en cada lugar. Podrás ver quién está vendiendo más, quién tiene menos inventario y quién está gastando de más, todo desde la comodidad de tu oficina principal o incluso desde tu casa usando tu tablet.`,
    details: [
      "Control Multicentro: Maneja todas tus tiendas o empresas desde una única cuenta maestra.",
      "Visión de Conjunto: Mira cuánto dinero está ganando todo tu grupo empresarial al mismo tiempo.",
      "Gestión Independiente: Cada sucursal tiene sus propios libros, pero tú eres el que tiene el control total.",
      "Supervisión a Distancia: Vigila tus negocios desde cualquier parte del mundo con internet."
    ]
  },
  {
    id: "soporte",
    title: "20. Cómo recibir ayuda y soporte",
    icon: MessageSquare,
    content: `Queremos que sepas que en Kyron nunca estarás solo frente a la pantalla. Si alguna vez tienes una duda, si un botón no hace lo que esperas, o si simplemente no encuentras dónde está una función, nuestro equipo de soporte está listo para darte la mano. Tenemos un 'Chat Inteligente' dentro de la misma aplicación que puede responder tus preguntas básicas al instante. Solo escribe: '¿Cómo registro un nuevo empleado?' y él te mostrará una guía rápida con dibujos y flechas.

Si el problema es un poco más complejo y prefieres hablar con una persona, tenemos un equipo de humanos expertos listos para atenderte por WhatsApp o por correo electrónico. Son personas reales que viven en nuestro país, que conocen nuestras leyes y que entienden perfectamente los retos de tu negocio. También puedes entrar a nuestro 'Centro de Ayuda', que es como una gran enciclopedia de Kyron donde hay cientos de guías visuales. Tu éxito es nuestra mayor alegría, así que no dudes nunca en contactarnos; estamos aquí para que tu experiencia con Kyron sea siempre excelente.`,
    details: [
      "Asistente IA 24/7: Obtén respuestas automáticas a tus dudas en cualquier momento del día o la noche.",
      "Ayuda de Personas Reales: Habla con expertos que entienden tu negocio y te dan soluciones claras.",
      "Manuales con Fotos: Consulta guías visuales paso a paso para que nunca te pierdas.",
      "Canal Directo por WhatsApp: Escríbenos y recibe soporte prioritario directamente en tu teléfono."
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
