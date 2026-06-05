"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, ShieldCheck, Zap, Calculator, Users,
  Download, Printer, Loader2, CircleCheck, Target, LayoutDashboard, ShoppingCart,
  Landmark, Activity, Cpu, Building2, FileText,
  Gavel, Radio, Recycle, Wallet, ChartBar as ChartColumn, BrainCircuit,
  ChevronUp, Search, ArrowLeft,
  CreditCard, Briefcase, Settings,
  DollarSign, FolderOpen, Lock,
  Headphones, Megaphone, ChevronRight
} from "lucide-react";
import { Link } from "@/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { PasswordGate } from "@/components/password-gate";

const chapters = [
  {
    id: "bienvenida",
    title: "Bienvenida al Ecosistema",
    icon: Target,
    color: "from-blue-500 to-cyan-500",
    content: `Este manual de usuario te guiara en el uso completo del ecosistema System Kyron v3.0. Esta organizado en 26 capitulos que cubren cada modulo disponible en la plataforma. Para aprovechar al maximo este documento, lee los capitulos en orden secuencial la primera vez que uses el sistema. Cada capitulo incluye una descripcion del modulo y una lista de puntos clave con instrucciones especificas. Si necesitas consultar un tema en particular, usa la tabla de contenidos para saltar directamente al capitulo correspondiente. Al finalizar la lectura, realiza las acciones descritas en los puntos clave para aplicar lo aprendido.`,
    details: [
      "Abre el manual desde el panel de ayuda del sistema en la seccion de documentacion.",
      "Selecciona cada capitulo desde la tabla de contenidos para navegar directamente al tema.",
      "Lee la descripcion de cada modulo antes de interactuar con el por primera vez.",
      "Revisa los puntos clave al final de cada capitulo para identificar las acciones principales.",
      "Usa la funcion de busqueda del navegador para encontrar temas especificos dentro del manual.",
      "Exporta el manual completo a PDF desde el boton de exportacion en la cabecera de la pagina.",
      "Consulta el indice de contenidos para localizar rapidamente cualquier modulo del sistema."
    ]
  },
  {
    id: "empezar",
    title: "Cómo empezar",
    icon: Zap,
    color: "from-amber-500 to-orange-500",
    content: `Para comenzar a usar System Kyron, accede a la URL de la plataforma desde tu navegador. Al cargar la pagina por primera vez, el asistente de configuracion inicial te guiara para registrar los datos de tu organizacion. Completa cada paso del asistente en orden: primero los datos fiscales, luego la seleccion de modulos y finalmente la configuracion de usuarios. Una vez finalizada la configuracion, el sistema te redirigira al panel principal con los modulos activados. Si encuentras alguna duda durante el proceso, usa el tutorial interactivo disponible en la esquina inferior derecha de la pantalla. Desde el panel principal puedes acceder a todos los modulos mediante el menu lateral izquierdo.`,
    details: [
      "Ingresa a la plataforma desde el enlace proporcionado por el administrador del sistema.",
      "Registra el RIF y la razon social de tu empresa en el formulario de configuracion inicial.",
      "Selecciona los modulos que deseas activar desde el panel de seleccion de servicios disponibles.",
      "Configura los usuarios administradores asignando roles y permisos de acceso especificos.",
      "Completa el tutorial de bienvenida para familiarizarte con la interfaz principal del sistema.",
      "Revisa los tutoriales especificos de cada modulo desde el centro de ayuda integrado.",
      "Accede a la guia de registro paso a paso desde la ruta /guia-registro del sistema."
    ]
  },
  {
    id: "seguridad",
    title: "Protegiendo tu cuenta",
    icon: ShieldCheck,
    color: "from-emerald-500 to-green-500",
    content: `La seccion de Seguridad te permite configurar la proteccion de tu cuenta y controlar el acceso a la plataforma. Desde esta pagina puedes activar la autenticacion de dos factores, revisar los dispositivos vinculados y gestionar tus credenciales de acceso. Para activar 2FA, ve a Configuracion > Seguridad > Autenticacion y selecciona el metodo de verificacion de tu preferencia. El sistema te solicitara un codigo de verificacion cada vez que inicies sesion desde un dispositivo no reconocido. Revisa periodicamente el registro de actividad de tu cuenta desde el modulo de Auditoria. Manten tus credenciales actualizadas y notifica al administrador si sospechas de accesos no autorizados.`,
    details: [
      "Ve a Configuracion > Seguridad y selecciona la opcion de Autenticacion de Dos Factores.",
      "Elige el metodo de 2FA entre las opciones disponibles: email, SMS o WhatsApp.",
      "Configura tu dispositivo vinculado siguiendo las instrucciones que muestra el sistema.",
      "Revisa la lista de dispositivos autorizados y elimina aquellos que no reconozcas.",
      "Cambia tu contrasena desde la seccion de credenciales cada 90 dias como practica recomendada.",
      "Activa las alertas de seguridad para recibir notificaciones de intentos de acceso sospechosos.",
      "Consulta el registro de actividad de tu cuenta desde el modulo de Auditoria del sistema."
    ]
  },
  {
    id: "tablero",
    title: "Dashboard Empresarial",
    icon: LayoutDashboard,
    color: "from-violet-500 to-purple-500",
    content: `El Dashboard Empresarial es la pantalla principal al iniciar sesion en System Kyron. Desde aqui puedes monitorear los indicadores clave de rendimiento de tu negocio en tiempo real. Para personalizar la vista, usa el selector de moneda en la esquina superior derecha para alternar entre Bolivares, Dolares y Euros. Los graficos interactivos muestran ingresos, gastos, utilidad neta y cuentas por cobrar y pagar. Cada tarjeta de KPI se actualiza automaticamente sin necesidad de recargar la pagina. Haz clic en cualquier indicador para ver su desglose detallado en una ventana emergente. Desde el menu de configuracion del dashboard puedes elegir que indicadores mostrar segun tu rol.`,
    details: [
      "Al iniciar sesion, revisa el panel principal que muestra los KPIs financieros consolidados del dia.",
      "Usa el selector de moneda en la esquina superior derecha para cambiar la moneda de visualizacion.",
      "Haz clic en cualquier grafico para expandirlo y ver los datos con mayor nivel de detalle.",
      "Revisa las tarjetas de cuentas por cobrar y pagar para identificar saldos pendientes de pago.",
      "Personaliza los indicadores visibles desde el menu de configuracion del dashboard empresarial.",
      "Accede a la navegacion entre cuenta personal y corporativa desde el menu superior del sistema.",
      "Los datos se actualizan automaticamente sin necesidad de recarga manual de la pagina."
    ]
  },
  {
    id: "multimoneda",
    title: "Sistema Multimoneda",
    icon: DollarSign,
    color: "from-green-500 to-emerald-500",
    content: `El sistema multimoneda te permite visualizar los valores monetarios en la moneda de tu preferencia. Desde cualquier pagina financiera, localiza el selector de moneda en la esquina superior derecha de la pantalla. Haz clic en el selector para alternar entre Bolivares, Dolares y Euros segun tu necesidad de visualizacion. Ten en cuenta que este cambio es solo de referencia visual: todos los montos se almacenan y procesan en bolivares para cumplir con la normativa del SENIAT. Las tasas de cambio utilizadas para la conversion se actualizan automaticamente desde las tasas oficiales del BCV. En las notas de debito y credito, el selector aparece en formato compacto y cicla entre las monedas con cada clic.`,
    details: [
      "Ubica el selector de moneda en la esquina superior derecha de cualquier pagina financiera.",
      "Haz clic en el selector para cambiar entre las opciones de visualizacion: Bs, USD o EUR.",
      "Verifica que los montos en pantalla se actualicen instantaneamente al cambiar de moneda.",
      "Recuerda que todos los datos fiscales se almacenan en bolivares segun normativa SENIAT.",
      "En notas de debito y credito, haz clic repetidamente en el selector compacto para ciclar monedas.",
      "Las tasas de cambio del BCV se actualizan automaticamente sin intervencion del usuario."
    ]
  },
  {
    id: "contabilidad",
    title: "Contabilidad VEN-NIF",
    icon: Calculator,
    color: "from-sky-500 to-blue-500",
    content: `El modulo de Contabilidad VEN-NIF organiza la gestion financiera de tu empresa en 10 submodulos accesibles desde la barra lateral. Para registrar un asiento contable, ve a Contabilidad General y selecciona Libro Diario. Ingresa la fecha de la transaccion, el codigo de la cuenta contable y los montos en el debe y haber correspondientes. El sistema integra automaticamente las ventas del TPV y los gastos registrados en otros modulos. Para la declaracion de IVA, accede al submodulo de Impuestos y selecciona el periodo fiscal a declarar. Los libros de compra-venta se generan automaticamente con cada factura registrada en el sistema.`,
    details: [
      "Ve al modulo de Contabilidad desde el menu principal y selecciona el submodulo deseado.",
      "Para registrar un asiento, abre Libro Diario desde Contabilidad General e ingresa los datos.",
      "Selecciona la fecha de la transaccion usando el selector de fecha del formulario contable.",
      "Ingresa el codigo de la cuenta contable o buscala en el catalogo de cuentas disponible.",
      "Registra el monto en el debe y el haber y haz clic en Guardar para confirmar el asiento.",
      "Para la declaracion de IVA, ve al submodulo de Impuestos y selecciona el periodo correspondiente.",
      "Exporta los libros de compra-venta desde el submodulo de Reportes Contables."
    ]
  },
  {
    id: "facturacion",
    title: "Facturación Homologada SENIAT",
    icon: FileText,
    color: "from-blue-500 to-indigo-500",
    content: `El centro de facturacion te permite emitir documentos fiscales homologados segun la normativa del SENIAT. Desde el menu lateral, selecciona el tipo de documento que deseas crear: factura estandar, proforma, factura a credito, nota de debito o nota de credito. Completa los datos del cliente, los conceptos a facturar y los montos correspondientes en el formulario. El sistema genera automaticamente el numero correlativo, el hash SHA-256 de seguridad y el calculo del IGTF si aplica. Antes de emitir, revisa los datos fiscales del documento en la vista previa. Haz clic en Emitir para registrar el documento fiscal en el sistema y generar el PDF.`,
    details: [
      "Ve al centro de facturacion desde el menu principal y selecciona el tipo de documento a emitir.",
      "Completa los datos del cliente: RIF, razon social y direccion fiscal en el formulario.",
      "Agrega los productos o servicios a facturar con sus cantidades, precios e impuestos.",
      "Revisa el calculo automatico del IGTF si el pago incluye transaccion en divisas.",
      "Verifica los datos fiscales en la vista previa antes de hacer clic en Emitir.",
      "El sistema genera el PDF de la factura con el hash SHA-256 y el codigo QR de verificacion.",
      "Para facturas a credito, configura los plazos de pago y las alertas de mora en el formulario."
    ]
  },
  {
    id: "impuestos",
    title: "Impuestos & Pre-Alerta Core",
    icon: Landmark,
    color: "from-red-500 to-rose-500",
    content: `El modulo de Impuestos centraliza el cumplimiento de todas tus obligaciones fiscales ante el SENIAT. Desde la pagina principal del modulo, revisa el calendario de vencimientos que muestra las fechas limites para cada declaracion. El sistema activa alertas de preaviso con 15, 7 y 3 dias de anticipacion para cada obligacion fiscal. Para generar la declaracion de IVA, selecciona el periodo fiscal y el sistema calculara automaticamente el monto a pagar basado en las facturas registradas. Para exportar los libros de compra-venta, haz clic en Exportar y selecciona el formato de archivo compatible con el portal fiscal del SENIAT. Las retenciones de ISLR y ARC se calculan automaticamente segun las transacciones registradas.`,
    details: [
      "Accede al modulo de Impuestos desde el menu principal y revisa el calendario de vencimientos.",
      "Configura las alertas de preaviso desde la seccion de Pre-Alerta Core del modulo.",
      "Selecciona el periodo fiscal para la declaracion de IVA y revisa los calculos automaticos.",
      "Exporta los libros de compra y venta en formato .txt para el portal del SENIAT.",
      "Verifica el calculo del IGTF en las transacciones que incluyan pago en divisas.",
      "Revisa las retenciones de ISLR y ARC generadas automaticamente en cada periodo.",
      "Consulta el modulo de Alertas Regulatorias para conocer cambios en la legislacion fiscal."
    ]
  },
  {
    id: "tpv",
    title: "Punto de Venta & Inventario",
    icon: ShoppingCart,
    color: "from-orange-500 to-amber-500",
    content: `El modulo de Punto de Venta te permite procesar transacciones de venta en tiempo real desde la interfaz del sistema. Para iniciar una venta, ve al modulo TPV y selecciona los productos que el cliente desea comprar. El sistema valida el horario laboral del operador y bloquea la transaccion si esta fuera del turno asignado, requiriendo autorizacion gerencial. El inventario se actualiza automaticamente con cada venta procesada. Para pagos mixtos, selecciona el metodo de pago y el sistema calculara el IGTF correspondiente. Al finalizar la jornada, realiza el arqueo de caja desde el submodulo de Control de Caja.`,
    details: [
      "Ve al modulo TPV desde el menu principal para iniciar el registro de una nueva venta.",
      "Selecciona o escanea los productos que el cliente desea comprar en el catalogo del sistema.",
      "Verifica el horario laboral: si estas fuera de tu turno, solicita autorizacion a gerencia.",
      "Selecciona el metodo de pago: efectivo, punto de venta, pago movil o transferencia.",
      "Para pagos mixtos, ingresa el monto en divisas y el sistema calcula el IGTF automaticamente.",
      "Confirma la venta y entrega el comprobante al cliente, ya sea impreso o digital.",
      "Al cierre del dia, realiza el arqueo de caja desde el submodulo de Control de Caja."
    ]
  },
  {
    id: "empleados",
    title: "Recursos Humanos & Nómina",
    icon: Users,
    color: "from-teal-500 to-cyan-500",
    content: `El modulo de Recursos Humanos y Nomina gestiona todo el ciclo de vida del talento humano en tu empresa. Desde el panel principal del modulo, accede a los submodulos disponibles en la barra lateral. Para procesar la nomina, selecciona el periodo de pago y el sistema calculara automaticamente los aportes del IVSS, FAOV, LPH e INCES. Las prestaciones sociales se calculan segun la LOTTT considerando el tiempo de servicio y el salario del trabajador. Para la entrega de recibos de pago, ve al submodulo de Nomina, selecciona el trabajador y haz clic en Enviar para que el recibo llegue firmado digitalmente via WhatsApp.`,
    details: [
      "Accede al modulo de RRHH desde el menu principal y selecciona el submodulo requerido.",
      "Para procesar nomina, ve a Nomina > Procesar y selecciona el periodo de pago correspondiente.",
      "Revisa los calculos automaticos de IVSS, FAOV, LPH e INCES antes de confirmar la nomina.",
      "Para calcular prestaciones sociales, ve al submodulo de Prestaciones y selecciona el trabajador.",
      "Genera los recibos de pago desde Nomina > Recibos y haz clic en Enviar por WhatsApp.",
      "Publica vacantes desde el submodulo de Reclutamiento y gestiona las postulaciones recibidas.",
      "Registra las evaluaciones de desempeno desde el submodulo de Desarrollo Personal."
    ]
  },
  {
    id: "legal",
    title: "Asesoría Legal con Asistencia Técnica Directa",
    icon: Gavel,
    color: "from-indigo-500 to-violet-500",
    content: `El modulo de Asesoria Legal te permite gestionar documentos juridicos y dar seguimiento a los casos legales de tu empresa. Para redactar un contrato, ve al submodulo de Documentos Legales y selecciona la plantilla que deseas usar. El asistente Asistencia Tecnica Directa te guiara en la elaboracion del borrador segun la legislacion venezolana. Para gestionar permisos y licencias, accede al submodulo de Permisologia y selecciona la institucion correspondiente: SENIAT, SAREN o SAPI. El sistema monitorea las fechas de vencimiento de poderes y registros mercantiles y envia alertas automaticas antes de la caducidad. Desde el Escritorio Juridico puedes centralizar todos los documentos legales de tu empresa.`,
    details: [
      "Ve al modulo Legal desde el menu principal y selecciona Documentos Legales para crear un contrato.",
      "Elige la plantilla juridica que deseas usar: contrato, acuerdo de confidencialidad o acta de asamblea.",
      "Completa los datos solicitados por el asistente y revisa el borrador generado automaticamente.",
      "Para gestionar permisos, ve a Permisologia y selecciona la institucion y el tipo de tramite.",
      "Configura las alertas de vencimiento de poderes desde la seccion de Control de Vigencia.",
      "Organiza los documentos publicos y notariales en el Escritorio Juridico del modulo.",
      "Revisa periodicamente el estado de los registros de marca y patentes en SAPI."
    ]
  },
  {
    id: "telecom",
    title: "Telecomunicaciones 5G/eSIM",
    icon: Radio,
    color: "from-cyan-500 to-sky-500",
    content: `El modulo de Telecomunicaciones te permite gestionar lineas moviles y planes corporativos desde la plataforma. Para activar una nueva linea eSIM, ve a Telecomunicaciones > Activacion eSIM y selecciona la cantidad de lineas a activar. El sistema genera un codigo QR que puedes escanear con el dispositivo movil para completar la activacion. Para gestionar flotas empresariales, accede al submodulo de Flotas y registra los limites de consumo por usuario. Desde el panel de Facturacion Corporativa puedes revisar el consumo de cada linea y generar las facturas correspondientes. Los reportes de consumo estan disponibles en el submodulo de Reportes de Flota para su descarga en PDF o Excel.`,
    details: [
      "Ve al modulo de Telecomunicaciones y selecciona Activacion eSIM para crear nuevas lineas.",
      "Ingresa la cantidad de lineas a activar y el plan corporativo asignado a cada una.",
      "Escanea el codigo QR generado por el sistema desde el dispositivo movil del usuario.",
      "Para gestionar flotas, ve a Flotas Empresariales y configura los limites de consumo por linea.",
      "Revisa el consumo de cada linea desde el panel de Facturacion Corporativa de Telecom.",
      "Genera reportes de flota desde el submodulo de Reportes para exportar a PDF o Excel.",
      "Para homologar equipos IMEI, ve a Homologacion e ingresa el codigo IMEI del dispositivo."
    ]
  },
  {
    id: "informatica",
    title: "Informática & IT",
    icon: Cpu,
    color: "from-slate-500 to-zinc-500",
    content: `El modulo de Informatica e IT te proporciona las herramientas para gestionar la infraestructura tecnologica de tu empresa. Desde el Dashboard IT puedes monitorear las metricas de servidores, redes y servicios en tiempo real. Para registrar un ticket de soporte, ve al submodulo de Helpdesk, completa el formulario con la descripcion del problema y selecciona la prioridad correspondiente. El modulo de Gestion de Licencias te permite llevar el control de las licencias de software activas y te alerta antes de su vencimiento. Para configurar respaldos automatizados, ve a Respaldo > Programar y selecciona la frecuencia y los datos a respaldar. El inventario de equipos se actualiza desde el submodulo de Activos Tecnologicos.`,
    details: [
      "Accede al modulo de Informatica desde el menu principal y revisa el Dashboard IT.",
      "Para crear un ticket de soporte, ve a Helpdesk y completa el formulario con los detalles.",
      "Selecciona la prioridad del ticket: baja, media, alta o critica segun la urgencia.",
      "Revisa las licencias de software activas desde el submodulo de Gestion de Licencias.",
      "Programa respaldos automatizados desde Respaldo > Programar con frecuencia diaria o semanal.",
      "Actualiza el inventario de equipos desde el submodulo de Activos Tecnologicos.",
      "Monitorea las vulnerabilidades de seguridad desde el panel de Seguridad Informatica."
    ]
  },
  {
    id: "cuenta-natural",
    title: "Cuenta Personal del Ciudadano",
    icon: FolderOpen,
    color: "from-blue-500 to-indigo-500",
    content: `La Cuenta Personal del Ciudadano te permite gestionar tus documentos de identidad y datos personales desde un solo lugar. Para acceder, inicia sesion con tu usuario y contrasena personal y selecciona Cuenta Personal desde el menu principal. Desde el perfil personal puedes actualizar tus datos civiles, cargar documentos como la cedula o el pasaporte y gestionar tus partidas de nacimiento. Para solicitar un documento, ve al submodulo correspondiente, completa el formulario y adjunta los archivos requeridos. El sistema te notificara cuando el documento este disponible para su descarga. El modulo de Seguridad de la Cuenta te permite revisar la actividad reciente y gestionar tus dispositivos vinculados.`,
    details: [
      "Inicia sesion y selecciona Cuenta Personal desde el menu principal del sistema.",
      "Actualiza tus datos civiles desde la seccion de Perfil Personal del modulo.",
      "Carga tus documentos de identidad en la boveda digital desde Documentos > Identidad.",
      "Solicita partidas de nacimiento o actas de matrimonio desde el submodulo correspondiente.",
      "Consulta tus antecedentes penales desde Documentos Judiciales en el modulo.",
      "Para calcular la pension alimenticia, ve a Calculo LOPNNA e ingresa los datos requeridos.",
      "Accede a tu carnet personal digital desde la seccion de identificacion del modulo."
    ]
  },
  {
    id: "socios",
    title: "Portal de Socios & Directivos",
    icon: Briefcase,
    color: "from-amber-500 to-yellow-500",
    content: `El Portal de Socios y Directivos ofrece una vista consolidada de la operacion empresarial para la alta gerencia. Para acceder, inicia sesion con tu cuenta de socio o directivo y selecciona Portal de Socios desde el menu principal. El dashboard ejecutivo muestra los KPIs estrategicos de todas las sedes de tu empresa en una sola pantalla. Desde aqui puedes revisar reportes consolidados, analisis de rendimiento global y proyecciones empresariales sin acceder a la operacion diaria. Para generar un reporte para la junta directiva, selecciona el periodo y las metricas que deseas incluir y haz clic en Generar. Los reportes se exportan en PDF o Excel para su presentacion.`,
    details: [
      "Accede al Portal de Socios desde el menu principal con tu cuenta de directivo autorizado.",
      "Revisa el dashboard ejecutivo que muestra los KPIs estrategicos consolidados del negocio.",
      "Selecciona una sede especifica desde el filtro de sedes para ver sus indicadores detallados.",
      "Para generar un reporte, ve a Reportes y selecciona el tipo de informe y el periodo.",
      "Revisa las proyecciones empresariales desde el submodulo de Analisis de Tendencias.",
      "Gestiona las participaciones societarias desde el submodulo de Dividendos y Socios.",
      "Exporta los reportes en formato PDF o Excel para presentarlos en juntas directivas."
    ]
  },
  {
    id: "sostenibilidad",
    title: "Sostenibilidad & Eco-Créditos Ameru",
    icon: Recycle,
    color: "from-green-500 to-emerald-500",
    content: `El modulo de Sostenibilidad y Eco-Creditos Ameru te permite participar en el programa de reciclaje y economia circular. Para comenzar, registra tu tarjeta de reciclaje Ameru desde tu Cuenta Personal. Cuando entregues materiales reciclables en un punto de reciclaje autorizado, el sistema validara el peso y tipo de material mediante tecnologia de induccion magnetica. Los Eco-Creditos obtenidos se acreditan automaticamente en tu cuenta y puedes consultar tu saldo desde el modulo de Sostenibilidad. Para intercambiar creditos, ve al Mercado de Eco-Creditos donde puedes comprar o vender bonos verdes con otros usuarios del ecosistema. Los creditos acumulados son canjeables por servicios dentro de la plataforma Kyron.`,
    details: [
      "Registra tu tarjeta de reciclaje Ameru desde tu Cuenta Personal en el sistema.",
      "Lleva los materiales reciclables a un punto de reciclaje autorizado con tecnologia de induccion.",
      "El sistema valida automaticamente el peso y clasifica el tipo de material reciclado.",
      "Revisa tu saldo de Eco-Creditos desde el modulo de Sostenibilidad en el menu principal.",
      "Ve al Mercado de Eco-Creditos para comprar o vender bonos verdes con otros usuarios.",
      "Canjea tus creditos acumulados por servicios disponibles en la plataforma Kyron.",
      "Consulta tus reportes de impacto ambiental desde la seccion de Reportes del modulo."
    ]
  },
  {
    id: "fidelizacion",
    title: "Fidelización & Marketing",
    icon: Megaphone,
    color: "from-pink-500 to-rose-500",
    content: `El modulo de Fidelizacion y Marketing te permite disenar programas de lealtad para tus clientes y analizar el rendimiento de tus estrategias comerciales. Para crear un programa de puntos, ve a Fidelizacion > Nuevo Programa y configura las reglas de acumulacion y canje. Para analizar las ventas de tu negocio, accede al submodulo de Analisis de Ventas donde encontraras graficos de tendencias por producto, periodo y cliente. El Analisis de Rentabilidad te muestra el margen de cada producto o servicio para identificar los mas rentables. Para disenar campanas de marketing dirigidas, ve a Campanas y segmenta tus clientes segun su historial de compras. Los modelos de factura personalizables permiten adaptar el diseno de las facturas a la identidad visual de tu marca.`,
    details: [
      "Ve a Fidelizacion > Nuevo Programa para crear un programa de puntos de recompensa.",
      "Configura las reglas de acumulacion: puntos por monto de compra o por frecuencia de visita.",
      "Define las recompensas canjeables y los puntos necesarios para cada una.",
      "Para analizar ventas, ve a Analisis de Ventas y selecciona el periodo de consulta.",
      "Revisa la rentabilidad por producto desde el submodulo de Estructura de Costos.",
      "Crea campanas de marketing desde Campanas y selecciona el segmento de clientes objetivo.",
      "Personaliza el diseno de tus facturas desde Modelos de Factura en el modulo."
    ]
  },
  {
    id: "billetera",
    title: "Billetera Digital & Pasarelas",
    icon: Wallet,
    color: "from-yellow-500 to-amber-500",
    content: `La Billetera Digital es el centro financiero del ecosistema donde puedes gestionar tus fondos y realizar pagos. Para consultar tu saldo, ve a Billetera Digital desde el menu principal. Para realizar una transferencia a otro usuario del sistema, selecciona Transferir, ingresa el identificador del destinatario y el monto, y haz clic en Enviar. Las transferencias entre usuarios de la plataforma son inmediatas y sin comisiones. Para agregar fondos, selecciona la opcion de Recargar y elige el metodo de pago entre las mas de 26 pasarelas disponibles. El historial de transacciones muestra cada movimiento con su detalle completo y se puede exportar para conciliacion. Los fondos en la billetera estan protegidos bajo cifrado AES-256.`,
    details: [
      "Accede a la Billetera Digital desde el menu principal para consultar tu saldo disponible.",
      "Para transferir fondos, selecciona Transferir e ingresa el ID del destinatario y el monto.",
      "Selecciona Confirmar para ejecutar la transferencia, que es inmediata entre usuarios del sistema.",
      "Para recargar saldo, selecciona Recargar y elige la pasarela de pago de tu preferencia.",
      "Revisa el historial de transacciones desde la seccion de Movimientos del modulo.",
      "Exporta el historial desde el boton Exportar para conciliacion o auditoria.",
      "El IGTF se calcula automaticamente si la transaccion incluye pago en divisas."
    ]
  },
  {
    id: "auditoria",
    title: "Auditoría, Blockchain & Automatizaciones",
    icon: Activity,
    color: "from-rose-500 to-red-500",
    content: `El modulo de Auditoria, Blockchain y Automatizaciones garantiza la transparencia e inmutabilidad de todas las operaciones del sistema. Desde el panel de Auditoria puedes revisar el registro detallado de cada transaccion con su hash SHA-256 correspondiente. Para verificar la integridad de un documento, copia su hash y utiliza el verificador en linea desde el submodulo de Blockchain. El Motor de Automatizacion te permite programar tareas recurrentes como la sincronizacion de tasas BCV o el anclaje blockchain por lotes. Para crear una nueva automatizacion, ve a Automatizaciones > Nueva Regla, define la condicion de disparo y la accion a ejecutar. El dashboard de ejecucion muestra el estado de cada automatizacion en tiempo real.`,
    details: [
      "Ve al modulo de Auditoria y selecciona el registro de transacciones para revisar operaciones.",
      "Usa el hash SHA-256 de cada transaccion para verificar su integridad desde el verificador.",
      "Para anclar registros en blockchain, ve a Blockchain y selecciona los lotes a procesar.",
      "Programa automatizaciones desde Automatizaciones > Nueva Regla con condicion y accion.",
      "Configura la sincronizacion automatica de tasas BCV desde las reglas de automatizacion.",
      "Revisa el dashboard de automatizaciones para monitorear el estado de cada tarea programada.",
      "Consulta el score de cumplimiento fiscal desde el panel principal del modulo."
    ]
  },
  {
    id: "reportes",
    title: "Reportes & Analítica Avanzada",
    icon: ChartColumn,
    color: "from-pink-500 to-rose-500",
    content: `El modulo de Reportes y Analitica Avanzada te permite generar informes personalizados con datos de cualquier modulo del sistema. Para crear un reporte, ve a Reportes > Nuevo Reporte y selecciona el origen de datos entre los modulos disponibles. Elige el tipo de grafico o tabla para visualizar la informacion y selecciona los campos a incluir. Puedes filtrar los datos por rango de fechas, sedes o cualquier otro criterio disponible. Una vez configurado el reporte, haz clic en Generar para previsualizar los resultados. Para exportar, selecciona el formato deseado entre PDF y Excel y haz clic en Descargar. Los reportes generados quedan guardados en el historial para consultas futuras.`,
    details: [
      "Ve a Reportes > Nuevo Reporte y selecciona el modulo de origen de los datos.",
      "Elige el tipo de visualizacion: tabla, grafico de barras, lineal o circular.",
      "Selecciona los campos a incluir y aplica los filtros de fecha, sede o categoria.",
      "Haz clic en Generar para previsualizar el reporte con los datos actuales del sistema.",
      "Revisa los resultados y ajusta los parametros si es necesario antes de exportar.",
      "Selecciona el formato de exportacion: PDF para presentaciones o Excel para analisis.",
      "Los reportes guardados estan disponibles en el Historial de Reportes del modulo."
    ]
  },
  {
    id: "chat-ia",
    title: "Asistencia Técnica Directa — Asistencia Especializada",
    icon: BrainCircuit,
    color: "from-violet-500 to-fuchsia-500",
    content: `Asistencia Tecnica Directa es el asistente inteligente accesible desde cualquier pagina del sistema. Para abrir el chat, haz clic en el icono de asistencia en la esquina inferior derecha de la pantalla. El asistente detecta automaticamente el modulo en el que te encuentras y activa la identidad contextual correspondiente: Contador Kyron en contabilidad, Abogado Kyron en el modulo legal, Ingeniero Kyron en IT, entre otras. Escribe tu consulta en el campo de texto y presiona Enter para enviar. El asistente puede generar documentos, analizar datos, responder preguntas sobre el sistema y asistir en la toma de decisiones. Para documentos largos, el asistente te guiara paso a paso en su elaboracion.`,
    details: [
      "Haz clic en el icono de asistencia en la esquina inferior derecha para abrir el chat.",
      "El asistente se adapta automaticamente al modulo activo donde te encuentres navegando.",
      "Escribe tu consulta en el campo de texto y presiona Enter para recibir una respuesta.",
      "Para generar un documento, solicitalo al asistente indicando el tipo y los datos requeridos.",
      "Usa el asistente para analizar datos financieros o fiscales del modulo actual.",
      "Si necesitas ayuda con un proceso, describe el problema y el asistente te guiara paso a paso.",
      "El chat permanece disponible mientras navegas entre los diferentes modulos del sistema."
    ]
  },
  {
    id: "conexion-bancaria",
    title: "Conexión Bancaria & Conciliación",
    icon: Landmark,
    color: "from-emerald-500 to-teal-500",
    content: `El modulo de Conexion Bancaria y Conciliacion te permite conectar tus cuentas bancarias con el sistema para automatizar la conciliacion. Para configurar una nueva conexion, ve a Conexion Bancaria > Agregar Cuenta y selecciona tu banco de la lista de instituciones soportadas. Ingresa las credenciales de acceso a tu banca en linea siguiendo las instrucciones de seguridad del sistema. Una vez conectada la cuenta, el modulo de Conciliacion compara automaticamente los movimientos bancarios con los registros contables del sistema. Las discrepancias se marcan en rojo para que puedas revisarlas manualmente. Para aceptar una conciliacion, revisa las coincidencias y haz clic en Confirmar. Las tasas de cambio del BCV se actualizan diariamente para las conversiones automaticas.`,
    details: [
      "Ve a Conexion Bancaria > Agregar Cuenta y selecciona tu banco de la lista disponible.",
      "Ingresa las credenciales de tu banca en linea en el formulario de conexion segura.",
      "Una vez conectada, ve a Conciliacion para revisar los movimientos bancarios importados.",
      "El sistema marca automaticamente las transacciones que coinciden con tus registros contables.",
      "Revisa las discrepancias marcadas en rojo y ajusta los registros si es necesario.",
      "Haz clic en Confirmar para aceptar la conciliacion de las transacciones verificadas.",
      "Las tasas BCV se actualizan automaticamente cada dia habil para las conversiones."
    ]
  },
  {
    id: "locales",
    title: "Múltiples Sedes & Franquicias",
    icon: Building2,
    color: "from-zinc-500 to-slate-500",
    content: `El modulo de Multiples Sedes y Franquicias te permite gestionar todas las sucursales de tu empresa desde una unica cuenta ejecutiva. Para agregar una nueva sede, ve a Sedes > Agregar Sede y completa los datos de la ubicacion, incluyendo direccion, datos fiscales y contacto del gerente. Desde el panel de control multi-sede puedes visualizar las metricas consolidadas de todas las sucursales en tiempo real. Para transferir inventario entre locales, ve a Inventario > Transferencias y selecciona el producto, el origen y el destino de la transferencia. Cada sede mantiene su independencia administrativa mientras los reportes se consolidan a nivel corporativo. Los permisos de acceso se configuran por sede para que cada gerente acceda solo a su sucursal.`,
    details: [
      "Ve a Sedes > Agregar Sede para registrar una nueva sucursal en el sistema.",
      "Completa los datos de la sede: nombre, direccion, RIF y datos de contacto del gerente.",
      "Desde el panel multi-sede, revisa las metricas de rendimiento de todas las sucursales.",
      "Para transferir stock, ve a Inventario > Transferencias y selecciona origen y destino.",
      "Configura los permisos de acceso por sede desde el submodulo de Usuarios y Roles.",
      "Genera reportes consolidados desde Reportes > Multi-Sede para una vision corporativa.",
      "Gestiona los activos inmobiliarios de cada sede desde el submodulo de Activos."
    ]
  },
  {
    id: "configuracion",
    title: "Configuración & Personalización",
    icon: Settings,
    color: "from-gray-500 to-slate-500",
    content: `La pagina de Configuracion te permite personalizar la experiencia del sistema segun tus preferencias. Para acceder, haz clic en el icono de Configuracion en el menu inferior o en la esquina superior derecha del panel principal. En la seccion de Preferencias puedes ajustar las animaciones del sistema seleccionando entre modo rendimiento o modo fluido. Para configurar las notificaciones, ve a Notificaciones y selecciona los canales que deseas activar: email, SMS o WhatsApp, y los tipos de alertas que quieres recibir. En la seccion de Datos Fiscales puedes actualizar el RIF, la razon social y el domicilio fiscal de tu empresa. Los cambios realizados en Configuracion se guardan automaticamente al salir de la pagina.`,
    details: [
      "Accede a Configuracion desde el menu principal o el icono de ajustes en el panel.",
      "Ajusta las animaciones del sistema desde Preferencias > Rendimiento Adaptativo.",
      "Configura las notificaciones seleccionando los canales y tipos de alerta deseados.",
      "Actualiza los datos fiscales de tu empresa en la seccion de Datos Fiscales.",
      "Selecciona el tema visual del sistema desde la seccion de Apariencia y Temas.",
      "Configura los atajos de navegacion desde Preferencias > Atajos del Sistema.",
      "Revisa los limites de tu plan de suscripcion desde la seccion de Plan y Facturacion."
    ]
  },
  {
    id: "planes",
    title: "Planes de Suscripción",
    icon: CreditCard,
    color: "from-purple-500 to-indigo-500",
    content: `La pagina de Planes de Suscripcion te permite elegir el plan que mejor se adapte a las necesidades de tu empresa. System Kyron ofrece 4 planes progresivos: Emprendedor, Profesional, Empresarial y Corporativo. Para cambiar de plan, ve a Configuracion > Plan Actual y selecciona el plan al que deseas migrar. Cada plan especifica los limites de usuarios, facturas mensuales, almacenamiento y modulos disponibles. Los precios se expresan en dolares con conversion automatica a bolivares segun la tasa BCV vigente. Puedes elegir entre facturacion mensual o anual con descuento. Al seleccionar un plan superior, los modulos premium se desbloquean automaticamente. Los cambios de plan entran en vigencia al inicio del siguiente ciclo de facturacion.`,
    details: [
      "Ve a Configuracion > Plan Actual para consultar el plan activo de tu suscripcion.",
      "Revisa los limites de tu plan actual: usuarios, facturas, almacenamiento y modulos.",
      "Para cambiar de plan, haz clic en Cambiar Plan y selecciona el nuevo plan deseado.",
      "Compara las caracteristicas de cada plan en la tabla comparativa disponible en la pagina.",
      "Elige la modalidad de pago: mensual o anual con descuento por pago adelantado.",
      "Los modulos premium se desbloquean automaticamente al contratar un plan superior.",
      "El cambio de plan se activa al inicio del siguiente ciclo de facturacion."
    ]
  },
  {
    id: "soporte",
    title: "Soporte Técnico & Comunidad",
    icon: Headphones,
    color: "from-sky-500 to-cyan-500",
    content: `El modulo de Soporte Tecnico y Comunidad te brinda canales de asistencia para resolver cualquier duda o problema con el sistema. Para contactar al soporte, abre el chat de Asistencia Tecnica Directa desde el icono en la esquina inferior derecha y describe tu consulta. El asistente respondera en tiempo real con las instrucciones necesarias. Si necesitas asistencia de un agente humano, solicita la conexion con el equipo de ingenieria desde el mismo chat. Para dar seguimiento a un ticket, ve a Soporte > Mis Tickets donde encontraras el historial de tus solicitudes con su estado actual. Las notificaciones del sistema te mantendran informado sobre las actualizaciones y cambios en la plataforma. El foro de la comunidad Kyron esta disponible para compartir mejores practicas con otros usuarios.`,
    details: [
      "Abre el chat de Asistencia Tecnica Directa desde el icono en la esquina inferior derecha.",
      "Describe tu consulta o problema en el chat y sigue las instrucciones del asistente.",
      "Si requieres asistencia humana, solicita la conexion con el equipo de ingenieria.",
      "Revisa el estado de tus solicitudes previas desde Soporte > Mis Tickets.",
      "Consulta la seccion de Preguntas Frecuentes desde Soporte > FAQ para respuestas rapidas.",
      "Participa en el foro de la comunidad Kyron desde Soporte > Comunidad.",
      "Las notificaciones del sistema te informan sobre actualizaciones y cambios importantes."
    ]
  },
];

const TOTAL_CHAPTERS = chapters.length;

function ProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-0.5">
      <div className="h-full bg-gradient-to-r from-primary via-cyan-400 to-primary transition-all duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
}

function BookCover() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-8">
          <Lock className="h-3.5 w-3.5" /> Documento Confidencial
        </div>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.85] mb-6">
          <span className="text-foreground">SYSTEM</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
            KYRON
          </span>
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto mb-8 rounded-full" />
        <p className="text-2xl sm:text-3xl font-bold text-muted-foreground mb-4 tracking-tight">
          Manual de Usuario
        </p>
        <p className="text-lg text-muted-foreground/60 font-medium mb-12">
          Edición Corporativa — v3.0
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="p-4 rounded-2xl bg-card/60 border border-border">
            <p className="text-2xl font-black text-foreground">{TOTAL_CHAPTERS}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-1">Capítulos</p>
          </div>
          <div className="p-4 rounded-2xl bg-card/60 border border-border">
            <p className="text-2xl font-black text-foreground">3.0</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-1">Versión</p>
          </div>
          <div className="p-4 rounded-2xl bg-card/60 border border-border">
            <p className="text-2xl font-black text-primary">2026</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-1">Edición</p>
          </div>
          <div className="p-4 rounded-2xl bg-card/60 border border-border">
            <p className="text-2xl font-black text-foreground">VZLA</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-1">Origen</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function TableOfContents({ onChapterClick }: { onChapterClick: (id: string) => void }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 border border-border text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
          <BookOpen className="h-3.5 w-3.5" /> Tabla de Contenidos
        </div>
        <p className="text-sm text-muted-foreground mb-12 max-w-2xl leading-relaxed">
          {TOTAL_CHAPTERS} capítulos que cubren la totalidad de los módulos del ecosistema System Kyron.
          Selecciona un capítulo para navegar directamente.
        </p>
        <div className="grid gap-2">
          {chapters.map((ch, i) => (
            <button
              key={ch.id}
              onClick={() => onChapterClick(ch.id)}
              className="group flex items-center gap-4 w-full text-left p-4 rounded-2xl bg-card/30 hover:bg-card/60 border border-border/50 hover:border-border transition-all"
            >
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-lg" style={{
                backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                ...(ch.color.startsWith('from-') ? {} : { background: ch.color })
              }}>
                <ch.icon className="h-4 w-4 text-white" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-muted-foreground/50 uppercase tracking-wider">
                  Capítulo {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                  {ch.title}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function BookManualUsuarioPage() {
  const [, setActiveChapter] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length) setActiveChapter(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    chapters.forEach(ch => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const h = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollToChapter = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleExportPDF = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default;

      const docHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>System Kyron — Manual de Usuario v3.0</title>
          <style>
            @page { margin: 0; size: A4 portrait; }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; color: #1e293b; background: #fff; }
            .page { width: 210mm; min-height: 297mm; padding: 25mm 20mm 20mm; position: relative; page-break-after: always; }
            .cover { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 297mm; padding: 30mm 20mm; background: linear-gradient(135deg, #0a0f1e 0%, #0A2472 50%, #0d1b3e 100%); color: #fff; text-align: center; }
            .cover h1 { font-size: 52pt; font-weight: 900; letter-spacing: -2pt; line-height: 1; margin-bottom: 10pt; }
            .cover h1 span { background: linear-gradient(135deg, #4fc3f7, #00E5FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .cover .subtitle { font-size: 22pt; font-weight: 700; color: rgba(255,255,255,0.7); margin-bottom: 40pt; text-transform: uppercase; letter-spacing: 6pt; }
            .cover .divider { width: 80pt; height: 3pt; background: linear-gradient(90deg, #4fc3f7, #00E5FF); border-radius: 2pt; margin: 0 auto 30pt; }
            .cover .meta { display: flex; gap: 15pt; justify-content: center; flex-wrap: wrap; }
            .cover .meta-item { padding: 12pt 20pt; border: 1px solid rgba(255,255,255,0.15); border-radius: 8pt; background: rgba(255,255,255,0.05); }
            .cover .meta-item .num { font-size: 24pt; font-weight: 900; }
            .cover .meta-item .label { font-size: 8pt; text-transform: uppercase; letter-spacing: 3pt; color: rgba(255,255,255,0.4); margin-top: 4pt; }
            .cover .badge { display: inline-block; padding: 6pt 16pt; border: 1px solid rgba(79,195,247,0.3); border-radius: 20pt; font-size: 8pt; text-transform: uppercase; letter-spacing: 3pt; color: #4fc3f7; margin-bottom: 30pt; background: rgba(79,195,247,0.1); }
            .chapter { padding: 20mm 18mm 15mm; page-break-after: always; }
            .chapter-header { display: flex; align-items: center; gap: 12pt; margin-bottom: 20pt; }
            .chapter-number { font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 3pt; color: #94a3b8; }
            .chapter-title { font-size: 22pt; font-weight: 900; color: #0A2472; line-height: 1.2; }
            .chapter-body { font-size: 11pt; line-height: 1.8; color: #475569; text-align: justify; margin-bottom: 20pt; }
            .chapter-divider { width: 100%; height: 1pt; background: #e2e8f0; margin: 25pt 0 20pt; }
            .key-points-title { font-size: 10pt; font-weight: 800; text-transform: uppercase; letter-spacing: 2pt; color: #00A86B; margin-bottom: 12pt; display: flex; align-items: center; gap: 6pt; }
            .key-points { list-style: none; padding: 0; }
            .key-points li { font-size: 10pt; color: #334155; line-height: 1.6; margin-bottom: 8pt; padding-left: 14pt; position: relative; }
            .key-points li::before { content: ''; position: absolute; left: 0; top: 7pt; width: 5pt; height: 5pt; border-radius: 50%; background: #00A86B; }
            .footer-note { margin-top: 30pt; padding-top: 15pt; border-top: 1pt solid #e2e8f0; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; }
            .toc { padding: 20mm 18mm; page-break-after: always; }
            .toc h2 { font-size: 18pt; font-weight: 900; color: #0A2472; margin-bottom: 6pt; }
            .toc p { font-size: 10pt; color: #64748b; margin-bottom: 20pt; }
            .toc-item { display: flex; align-items: center; gap: 10pt; padding: 8pt 12pt; border-bottom: 1px solid #f1f5f9; }
            .toc-num { font-size: 9pt; font-weight: 700; color: #0A2472; width: 30pt; }
            .toc-title { font-size: 10pt; font-weight: 600; color: #1e293b; }
            .legal { text-align: center; padding: 20mm; font-size: 8pt; color: #94a3b8; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="page cover">
            <div class="badge">Documento Privado</div>
            <h1>SYSTEM<br><span>KYRON</span></h1>
            <div class="divider"></div>
            <p class="subtitle">Manual de Usuario</p>
            <div class="meta">
              <div class="meta-item"><div class="num">${chapters.length}</div><div class="label">Capítulos</div></div>
              <div class="meta-item"><div class="num">3.0</div><div class="label">Versión</div></div>
              <div class="meta-item"><div class="num">2026</div><div class="label">Edición</div></div>
              <div class="meta-item"><div class="num">VZLA</div><div class="label">Origen</div></div>
            </div>
          </div>

          <div class="page toc">
            <h2>Tabla de Contenidos</h2>
            <p>${chapters.length} capítulos que cubren la totalidad de los módulos del ecosistema System Kyron.</p>
            ${chapters.map((ch, i) => `
              <div class="toc-item">
                <span class="toc-num">${String(i + 1).padStart(2, "0")}</span>
                <span class="toc-title">${ch.title}</span>
              </div>
            `).join("")}
          </div>

          ${chapters.map((ch, i) => `
            <div class="page chapter">
              <div class="chapter-header">
                <span class="chapter-number">Capítulo ${String(i + 1).padStart(2, "0")}</span>
              </div>
              <h2 class="chapter-title">${ch.title}</h2>
              <div class="chapter-divider"></div>
              <p class="chapter-body">${ch.content}</p>
              <div class="key-points-title">Puntos Clave</div>
              <ul class="key-points">
                ${ch.details.map(d => `<li>${d}</li>`).join("")}
              </ul>
              <div class="footer-note">
                <span>System Kyron v3.0</span>
                <span>Capítulo ${String(i + 1).padStart(2, "0")}</span>
              </div>
            </div>
          `).join("")}

          <div class="page legal">
            <p>System Kyron v3.0 — Inteligencia Corporativa — Caracas, Venezuela</p>
            <p style="margin-top:6pt;">© 2026 Todos los derechos reservados.</p>
          </div>
        </body>
        </html>
      `;

      const tempDiv = document.createElement('div');
      tempDiv.style.cssText = 'position:fixed;left:-9999px;top:0;width:210mm;';
      tempDiv.innerHTML = docHtml;
      document.body.appendChild(tempDiv);

      await html2pdf()
        .set({
          margin: 0,
          filename: "System-Kyron-Manual-Usuario-v3.0.pdf",
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            width: 2100,
            height: 2970
          },
          jsPDF: {
            unit: 'px',
            format: [2100, 2970],
            orientation: 'portrait'
          },
          pagebreak: {
            mode: ['avoid-all', 'css', 'legacy']
          }
        })
        .from(tempDiv)
        .save();

      document.body.removeChild(tempDiv);

      toast({
        title: "PDF generado",
        description: `Libro completo (${chapters.length} capítulos) descargado.`,
        action: <CircleCheck className="text-primary h-4 w-4" />,
      });
    } catch {
      toast({ title: "Error al generar PDF", description: "Ocurrió un error al exportar.", variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  const { toast } = useToast();

  return (
    <PasswordGate title="Manual de Usuario — System Kyron">
      <div className="min-h-screen bg-background text-foreground relative">
        <ProgressBar />

        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Volver al inicio"
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary/90 text-white shadow-lg shadow-primary/30 hover:bg-primary transition-all hover:scale-110"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
        )}

        <header className="relative overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5" />
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
            <Link href="/brand-kit" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> Brand Kit
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="text-[10px] font-bold uppercase tracking-widest rounded-xl"
              >
                <Printer className="mr-2 h-3.5 w-3.5" /> Imprimir
              </Button>
              <Button
                size="sm"
                onClick={handleExportPDF}
                disabled={isExporting}
                className="text-[10px] font-bold uppercase tracking-widest rounded-xl"
              >
                {isExporting ? <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> : <Download className="mr-2 h-3.5 w-3.5" />}
                {isExporting ? "Generando..." : "PDF"}
              </Button>
            </div>
          </div>
        </header>

        <BookCover />

        <TableOfContents onChapterClick={scrollToChapter} />

        <div className="max-w-5xl mx-auto px-6 pb-24" ref={contentRef}>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/5 to-transparent hidden lg:block" />
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/5 to-transparent hidden lg:block" />

            <div className="space-y-24 relative">
              {chapters.map((chapter, index) => {
                const num = String(index + 1).padStart(2, "0");
                return (
                  <motion.section
                    key={chapter.id}
                    id={chapter.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="scroll-mt-24"
                  >
                    <Card className="relative overflow-hidden rounded-3xl border-border/60 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-500 group">
                      <div className={cn("absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b", chapter.color)} />

                      <div className="p-8 md:p-12 pl-10 md:pl-14">
                        <div className="flex items-center gap-5 mb-10">
                          <div className={cn("flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br shadow-lg", chapter.color)}>
                            <chapter.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 block mb-1">
                              Capítulo {num} de {TOTAL_CHAPTERS}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                              {chapter.title}
                            </h2>
                          </div>
                        </div>

                        <div className="grid lg:grid-cols-5 gap-10">
                          <div className="lg:col-span-3">
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
                              {chapter.content}
                            </p>
                          </div>
                          <div className="lg:col-span-2">
                            <div className="p-6 md:p-8 rounded-2xl bg-muted/30 border border-border/50">
                              <div className="flex items-center gap-2 mb-6">
                                <CircleCheck className="h-4 w-4 text-emerald-500" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/60">
                                  Puntos Clave
                                </span>
                              </div>
                              <ul className="space-y-4">
                                {chapter.details.map((detail, dIdx) => (
                                  <li key={dIdx} className="flex gap-3 items-start text-sm text-muted-foreground leading-relaxed">
                                    <span className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-gradient-to-r", chapter.color)} />
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-border/40 flex items-center justify-between">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/30">
                            System Kyron v3.0 — Capítulo {num}
                          </span>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/30">
                            Pág. {index + 1}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.section>
                );
              })}

              {chapters.length === 0 && (
                <div className="text-center py-20">
                  <Search className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm">No se encontraron capítulos para &ldquo;{searchQuery}&rdquo;</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="border-t border-border/50 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-card/60 border border-border">
                  <Lock className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Confidencial</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-card/60 border border-border">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Verificado</span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                  System Kyron v3.0 &bull; Caracas, Venezuela
                </p>
                <p className="text-[9px] text-muted-foreground/30 mt-1">
                  &copy; 2026 Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PasswordGate>
  );
}
