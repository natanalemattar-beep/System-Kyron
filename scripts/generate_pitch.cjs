// generate_pitch.cjs — System Kyron · Reto Inspira 2026 (HONEST VERSION)
const PptxGenJS = require("pptxgenjs");
const path = require("path");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";

// ─── Theme ───────────────────────────────────────────────
const C = {
  bg:       "04060F",
  accent:   "3B82F6",
  white:    "FFFFFF",
  dim:      "94A3B8",
  green:    "10B981",
  amber:    "F59E0B",
  rose:     "F43F5E",
  violet:   "8B5CF6",
  card:     "0D111E",
  muted:    "475569",
};

const FONT = "Segoe UI";

// helper: add a colored top + bottom bar
function bars(slide, color) {
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0,    w: "100%", h: 0.07, fill: { color } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 7.43, w: "100%", h: 0.07, fill: { color } });
}

// helper: tag line at top
function tag(slide, text, color) {
  slide.addText(text, { x: 0.5, y: 0.18, w: 12, h: 0.35, fontSize: 10, bold: true, color, fontFace: FONT });
}

// helper: big title
function title(slide, text, opts = {}) {
  slide.addText(text, { x: 0.5, y: opts.y ?? 0.65, w: opts.w ?? 9, h: opts.h ?? 1.0,
    fontSize: opts.sz ?? 40, bold: true, color: C.white, fontFace: FONT, breakLine: false, ...opts });
}

// ════════════════════════════════════════════════
// SLIDE 1 — PORTADA
// ════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { path: path.join(__dirname, "public/images/landing/hero-bg-elite.png") };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "04060F", transparency: 60 } });
  bars(s, C.accent);

  s.addImage({ path: path.join(__dirname, "public/images/logo-transparent.png"), x: 10, y: 0.5, w: 2.5, h: 2.5, sizing: { type: "contain", w: 2.5, h: 2.5 } });


  s.addText("RETO INSPIRA 2026  •  RESUMEN EJECUTIVO", { x: 0.5, y: 0.18, w: 12, h: 0.35,
    fontSize: 10, bold: true, color: C.accent, fontFace: FONT });

  s.addText("SYSTEM\nKYRON", { x: 0.5, y: 0.9, w: 9, h: 3.2,
    fontSize: 80, bold: true, color: C.white, fontFace: FONT, lineSpacingMultiple: 0.85 });

  s.addText("Todo lo que necesitas para vender y crecer:", { x: 0.5, y: 4.2, w: 10, h: 0.5,
    fontSize: 20, color: C.dim, fontFace: FONT });
  s.addText("tus líneas, tu web y cero complicaciones.", { x: 0.5, y: 4.72, w: 10, h: 0.5,
    fontSize: 20, italic: true, color: C.dim, fontFace: FONT });

  s.addShape(pptx.ShapeType.rect, { x: 0.5, y: 5.4, w: 3, h: 0.04, fill: { color: C.accent } });

  s.addText("Carlos Mattar  —  Fundador & CEO", { x: 0.5, y: 5.55, w: 9, h: 0.38,
    fontSize: 13, color: C.dim, fontFace: FONT });
  s.addText("Emprendimiento Carlos Mattar  |  RIF J-50832149-9", { x: 0.5, y: 5.96, w: 9, h: 0.35,
    fontSize: 11, color: C.muted, fontFace: FONT });
  s.addText("📱 0424-1846016   |   📸 @systemkyron   |   🌐 system-kyron.vercel.app", { x: 0.5, y: 6.45, w: 12, h: 0.38,
    fontSize: 11, color: C.muted, fontFace: FONT, align: "center" });
}

// ════════════════════════════════════════════════
// SLIDE 2 — EL PROBLEMA
// ════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  bars(s, C.rose);
  s.addImage({ path: path.join(__dirname, "public/images/logo-transparent.png"), x: 11.5, y: 0.15, w: 0.5, h: 0.5, sizing: { type: "contain", w: 0.5, h: 0.5 } });
  tag(s, "02  |  DEFINICIÓN DEL PROBLEMA", C.rose);

  s.addText("El Dolor de Cabeza Real", { x: 0.5, y: 0.65, w: 8, h: 0.9,
    fontSize: 36, bold: true, color: C.white, fontFace: FONT });
  s.addText("Pelear con la tecnología no debería ser tu trabajo.", { x: 0.5, y: 1.6, w: 8.5, h: 0.5,
    fontSize: 16, italic: true, color: C.dim, fontFace: FONT });

  const body = "Los emprendedores y pequeños empresarios pierden tiempo y dinero contratando entre 3 y 5 proveedores distintos para resolver cosas básicas: instalar líneas, armar su web y organizar sus procesos.\n\nMás del 60% de los emprendedores venezolanos no tiene presencia digital activa. Quienes la tienen reportan que gestionar varios proveedores les consume hasta un 40% de su tiempo productivo semanal.\n\nEl resultado: negocios que no venden todo lo que podrían porque están atrapados resolviendo tecnología en vez de atender a sus clientes.";
  s.addText(body, { x: 0.5, y: 2.25, w: 7.8, h: 4.8,
    fontSize: 13, color: C.dim, fontFace: FONT, breakLine: true });

  // 3 stat cards
  const stats = [
    { val: "60%",  lbl: "Sin presencia\ndigital activa" },
    { val: "40%",  lbl: "Tiempo perdido\npor semana" },
    { val: "+4",   lbl: "Proveedores\nseparados" },
  ];
  stats.forEach((st, i) => {
    const x = 9.0;
    const y = 1.8 + i * 1.85;
    s.addShape(pptx.ShapeType.rect, { x, y, w: 3.8, h: 1.6, fill: { color: C.card } });
    s.addText(st.val, { x, y: y + 0.05, w: 3.8, h: 0.8, fontSize: 32, bold: true, color: C.rose, fontFace: FONT, align: "center" });
    s.addText(st.lbl, { x, y: y + 0.85, w: 3.8, h: 0.65, fontSize: 11, color: C.dim, fontFace: FONT, align: "center" });
  });
}

// ════════════════════════════════════════════════
// SLIDE 3 — PROPUESTA DE VALOR
// ════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  bars(s, C.accent);
  s.addImage({ path: path.join(__dirname, "public/images/logo-transparent.png"), x: 11.5, y: 0.15, w: 0.5, h: 0.5, sizing: { type: "contain", w: 0.5, h: 0.5 } });
  tag(s, "03  |  PROPUESTA DE VALOR — LA SOLUCIÓN", C.accent);

  s.addText("La Solución: Todo en Un Solo Lugar", { x: 0.5, y: 0.65, w: 11, h: 0.9,
    fontSize: 34, bold: true, color: C.white, fontFace: FONT });
  s.addText("System Kyron es la única empresa que te da todo lo que necesita tu negocio, sin complicaciones.", { x: 0.5, y: 1.6, w: 11, h: 0.5,
    fontSize: 15, italic: true, color: C.dim, fontFace: FONT });

  const services = [
    { icon: "📞", title: "Líneas Corporativas", desc: "Comunicación para todo tu equipo, activa al instante y sin contratos imposibles de entender." },
    { icon: "🌐", title: "Página Web Premium",  desc: "Tu plataforma web hecha a medida, rápida, hermosa y disponible las 24 horas del día para vender por ti." },
    { icon: "⚙️", title: "Soluciones Sostenibles", desc: "Herramientas digitales para organizar tu negocio, eliminar el papel y crecer sin caos operativo." },
  ];
  services.forEach((sv, i) => {
    const y = 2.35 + i * 1.45;
    s.addShape(pptx.ShapeType.rect, { x: 0.5, y, w: 7.8, h: 1.25, fill: { color: C.card } });
    s.addText(`${sv.icon}  ${sv.title}`, { x: 0.75, y: y + 0.1, w: 7.3, h: 0.42, fontSize: 14, bold: true, color: C.accent, fontFace: FONT });
    s.addText(sv.desc, { x: 0.75, y: y + 0.58, w: 7.3, h: 0.55, fontSize: 12, color: C.dim, fontFace: FONT });
  });

  s.addText("¿Qué nos hace únicos?", { x: 9.0, y: 2.2, w: 3.9, h: 0.4, fontSize: 13, bold: true, color: C.white, fontFace: FONT });
  const diffs = ["✅  Un solo proveedor para todo", "✅  Precios claros y transparentes", "✅  Planes que crecen contigo", "✅  Atención humana, no robots", "✅  Formalización legal incluida"];
  diffs.forEach((d, i) => {
    s.addText(d, { x: 9.0, y: 2.75 + i * 0.72, w: 3.9, h: 0.5, fontSize: 12, color: C.dim, fontFace: FONT });
  });
}

// ════════════════════════════════════════════════
// SLIDE 4 — MERCADO OBJETIVO
// ════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  bars(s, C.green);
  s.addImage({ path: path.join(__dirname, "public/images/logo-transparent.png"), x: 11.5, y: 0.15, w: 0.5, h: 0.5, sizing: { type: "contain", w: 0.5, h: 0.5 } });
  tag(s, "04  |  MERCADO OBJETIVO", C.green);

  s.addText("¿A Quién Le Hablamos?", { x: 0.5, y: 0.65, w: 10, h: 0.9, fontSize: 36, bold: true, color: C.white, fontFace: FONT });

  s.addText("Perfil del Cliente Ideal", { x: 0.5, y: 1.75, w: 7, h: 0.42, fontSize: 14, bold: true, color: C.green, fontFace: FONT });
  const profile = [
    "👤  Emprendedores, dueños de negocios familiares y directores de PyMEs",
    "📍  Ubicación: Venezuela, con proyección regional a corto plazo",
    "🎂  Edad: 22 a 50 años",
    "💡  Intereses: Crecer su negocio, ahorrar tiempo, tener imagen profesional",
    "📱  Activos en redes sociales, buscan soluciones rápidas y de confianza",
  ];
  profile.forEach((p, i) => {
    s.addText(p, { x: 0.5, y: 2.3 + i * 0.72, w: 7.8, h: 0.6, fontSize: 13, color: C.dim, fontFace: FONT });
  });

  s.addText("Tamaño del Mercado", { x: 9.0, y: 1.75, w: 4.0, h: 0.42, fontSize: 14, bold: true, color: C.green, fontFace: FONT });
  const market = [
    { val: "500K+",    lbl: "Micro y PyMEs activas\nen Venezuela" },
    { val: "5,000",    lbl: "Clientes potenciales\n(solo el 1% del mercado)" },
    { val: "Regional", lbl: "Potencial de expansión\na países con realidades similares" },
  ];
  market.forEach((m, i) => {
    const y = 2.3 + i * 1.68;
    s.addShape(pptx.ShapeType.rect, { x: 9.0, y, w: 4.0, h: 1.45, fill: { color: C.card } });
    s.addText(m.val, { x: 9.0, y: y + 0.08, w: 4.0, h: 0.65, fontSize: 26, bold: true, color: C.green, fontFace: FONT, align: "center" });
    s.addText(m.lbl, { x: 9.0, y: y + 0.77, w: 4.0, h: 0.6,  fontSize: 11, color: C.dim, fontFace: FONT, align: "center" });
  });
}

// ════════════════════════════════════════════════
// SLIDE 5 — MODELO DE NEGOCIO
// ════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  bars(s, C.amber);
  s.addImage({ path: path.join(__dirname, "public/images/logo-transparent.png"), x: 11.5, y: 0.15, w: 0.5, h: 0.5, sizing: { type: "contain", w: 0.5, h: 0.5 } });
  tag(s, "05  |  MODELO DE NEGOCIO", C.amber);

  s.addText("¿Cómo Generamos Ingresos?", { x: 0.5, y: 0.65, w: 11, h: 0.9, fontSize: 36, bold: true, color: C.white, fontFace: FONT });
  s.addText("Simple, transparente y escalable.", { x: 0.5, y: 1.6, w: 7, h: 0.45, fontSize: 16, italic: true, color: C.dim, fontFace: FONT });

  const streams = [
    { num: "01", title: "Suscripción — Líneas Corporativas",
      desc: "Cobro mensual recurrente por cada línea de comunicación activa en la empresa del cliente." },
    { num: "02", title: "Proyecto + Mantenimiento — Webs",
      desc: "Pago inicial por el desarrollo web más una cuota mensual de mantenimiento y actualizaciones." },
    { num: "03", title: "Paquetes Integrales",
      desc: "Planes combinados (líneas + web + soluciones) con descuento. El cliente ahorra, nosotros fidelizamos." },
  ];
  streams.forEach((st, i) => {
    const y = 2.35 + i * 1.5;
    s.addShape(pptx.ShapeType.rect, { x: 0.5, y, w: 12.33, h: 1.3, fill: { color: C.card } });
    s.addText(st.num, { x: 0.65, y: y + 0.08, w: 0.8, h: 1.1, fontSize: 30, bold: true, color: C.amber, fontFace: FONT, valign: "middle", align: "center" });
    s.addShape(pptx.ShapeType.rect, { x: 1.6, y: y + 0.2, w: 0.04, h: 0.9, fill: { color: C.amber } });
    s.addText(st.title, { x: 1.8, y: y + 0.1, w: 10.5, h: 0.45, fontSize: 14, bold: true, color: C.white, fontFace: FONT });
    s.addText(st.desc,  { x: 1.8, y: y + 0.6, w: 10.5, h: 0.55, fontSize: 12, color: C.dim, fontFace: FONT });
  });

  s.addText("Escalabilidad: A mayor número de clientes, menor costo por cliente → mayor margen de ganancia.", {
    x: 0.5, y: 7.05, w: 12.33, h: 0.35, fontSize: 11, italic: true, color: C.muted, fontFace: FONT });
}

// ════════════════════════════════════════════════
// SLIDE 6 — MARKETING Y VENTAS
// ════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  bars(s, C.violet);
  s.addImage({ path: path.join(__dirname, "public/images/logo-transparent.png"), x: 11.5, y: 0.15, w: 0.5, h: 0.5, sizing: { type: "contain", w: 0.5, h: 0.5 } });
  tag(s, "06  |  ESTRATEGIA DE MARKETING Y VENTAS", C.violet);

  s.addText("¿Cómo Nos Van a Conocer?", { x: 0.5, y: 0.65, w: 11, h: 0.9, fontSize: 36, bold: true, color: C.white, fontFace: FONT });

  const channels = [
    { icon: "📱", title: "Redes Sociales (Instagram & TikTok)",
      desc: "Contenido educativo en el lenguaje del emprendedor: 'Cómo armar tu web sin pagar de más'. Generamos confianza antes de vender." },
    { icon: "🤝", title: "Referidos y Boca a Boca",
      desc: "Cada cliente satisfecho nos recomienda. Programa de referidos: el cliente gana un descuento por cada empresa que nos trae." },
    { icon: "🏛️", title: "Alianzas con Incubadoras y Cámaras de Comercio",
      desc: "Nos posicionamos como el proveedor tecnológico recomendado para nuevos negocios en proceso de formalización." },
    { icon: "🌐", title: "Demostración en Vivo — Nuestra Propia Web",
      desc: "system-kyron.vercel.app es nuestra mejor carta de presentación. El cliente ve el producto real antes de comprar." },
  ];
  channels.forEach((ch, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 6.5;
    const y = 2.1 + row * 2.45;
    s.addShape(pptx.ShapeType.rect, { x, y, w: 6.2, h: 2.2, fill: { color: C.card } });
    s.addText(`${ch.icon}  ${ch.title}`, { x: x + 0.2, y: y + 0.15, w: 5.8, h: 0.5, fontSize: 13, bold: true, color: C.violet, fontFace: FONT });
    s.addText(ch.desc, { x: x + 0.2, y: y + 0.72, w: 5.8, h: 1.3, fontSize: 12, color: C.dim, fontFace: FONT });
  });
}

// ════════════════════════════════════════════════
// SLIDE 7 — IMPACTO SOCIAL Y AMBIENTAL
// ════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  bars(s, C.green);
  s.addImage({ path: path.join(__dirname, "public/images/logo-transparent.png"), x: 11.5, y: 0.15, w: 0.5, h: 0.5, sizing: { type: "contain", w: 0.5, h: 0.5 } });
  tag(s, "07  |  IMPACTO SOCIAL Y AMBIENTAL", C.green);

  s.addText("Más que un Negocio, un Cambio Real", { x: 0.5, y: 0.65, w: 12, h: 0.9, fontSize: 34, bold: true, color: C.white, fontFace: FONT });

  // Social
  s.addText("🤝  Impacto Social", { x: 0.5, y: 1.8, w: 6.0, h: 0.5, fontSize: 17, bold: true, color: C.green, fontFace: FONT });
  s.addText(
    "System Kyron democratiza el acceso a la tecnología. Un emprendedor de barrio tiene hoy la misma capacidad de proyección digital que una empresa grande, sin necesitar grandes presupuestos.\n\nEsto genera empleos formales, fortalece la economía local y ayuda a más venezolanos a formalizarse y a crecer.",
    { x: 0.5, y: 2.42, w: 6.1, h: 4.0, fontSize: 13, color: C.dim, fontFace: FONT }
  );

  // Divider
  s.addShape(pptx.ShapeType.rect, { x: 6.86, y: 1.7, w: 0.05, h: 5.2, fill: { color: "1E293B" } });

  // Environmental
  s.addText("🌱  Impacto Ambiental", { x: 7.1, y: 1.8, w: 6.0, h: 0.5, fontSize: 17, bold: true, color: C.green, fontFace: FONT });
  s.addText(
    "Promovemos el modelo 100% cero papel. Todos nuestros procesos son digitales: contratos, facturas, comunicaciones y gestión de clientes.\n\nCada cliente que sumamos al sistema digital deja de usar papel en sus operaciones diarias, reduciendo su huella de carbono desde el primer día que nos contrata.",
    { x: 7.1, y: 2.42, w: 6.0, h: 4.0, fontSize: 13, color: C.dim, fontFace: FONT }
  );

  s.addText('"No vendemos solo tecnología. Vendemos un futuro más organizado, más justo y más sostenible."',
    { x: 0.5, y: 6.85, w: 12.33, h: 0.42, fontSize: 11, italic: true, color: C.muted, fontFace: FONT, align: "center" });
}

// ════════════════════════════════════════════════
// SLIDE 8 — ESTADO ACTUAL Y HOJA DE RUTA
// ════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  bars(s, C.accent);
  s.addImage({ path: path.join(__dirname, "public/images/logo-transparent.png"), x: 11.5, y: 0.15, w: 0.5, h: 0.5, sizing: { type: "contain", w: 0.5, h: 0.5 } });
  tag(s, "08  |  ESTADO ACTUAL Y HOJA DE RUTA", C.accent);

  s.addText("¿Dónde Estamos y a Dónde Vamos?", { x: 0.5, y: 0.65, w: 12, h: 0.9, fontSize: 34, bold: true, color: C.white, fontFace: FONT });

  s.addText("Estado Actual: Idea con prototipo funcional — Etapa de concurso", { x: 0.5, y: 1.7, w: 12, h: 0.45, fontSize: 14, bold: true, color: C.green, fontFace: FONT });

  const status = [
    "✅  Plataforma web (prototipo) construida y funcionando",
    "✅  Negocio registrado legalmente (RIF J-50832149-9)",
    "✅  Modelo de negocio validado conceptualmente con investigación de mercado",
  ];
  status.forEach((st, i) => {
    s.addText(st, { x: 0.5, y: 2.25 + i * 0.5, w: 12, h: 0.42, fontSize: 13, color: C.dim, fontFace: FONT });
  });

  s.addText("Objetivos — Próximos 6 Meses", { x: 0.5, y: 3.7, w: 12, h: 0.45, fontSize: 14, bold: true, color: C.accent, fontFace: FONT });

  const milestones = [
    { period: "MES 1-2", phase: "PRIMEROS CLIENTES", desc: "Activar canales de venta, conseguir los primeros 10 clientes de pago entre líneas y webs.", color: C.rose },
    { period: "MES 3-4", phase: "VALIDACIÓN",        desc: "Iterar el producto con feedback real. Establecer 2 alianzas estratégicas con incubadoras o cámaras de comercio.", color: C.amber },
    { period: "MES 5-6", phase: "ESCALAMIENTO",      desc: "Lanzar paquetes integrales y apuntar a ingresos mensuales recurrentes que cubran los costos operativos.", color: C.green },
  ];
  milestones.forEach((m, i) => {
    const x = 0.5 + i * 4.2;
    const y = 4.25;
    s.addShape(pptx.ShapeType.rect, { x, y, w: 3.9, h: 2.8, fill: { color: C.card } });
    s.addText(m.period, { x: x + 0.15, y: y + 0.15, w: 3.6, h: 0.38, fontSize: 10, bold: true, color: m.color, fontFace: FONT });
    s.addText(m.phase,  { x: x + 0.15, y: y + 0.58, w: 3.6, h: 0.5,  fontSize: 15, bold: true, color: C.white, fontFace: FONT });
    s.addText(m.desc,   { x: x + 0.15, y: y + 1.18, w: 3.6, h: 1.4,  fontSize: 12, color: C.dim, fontFace: FONT });
    s.addShape(pptx.ShapeType.rect, { x, y: y + 2.68, w: 3.9, h: 0.08, fill: { color: m.color } });
  });
}

// ════════════════════════════════════════════════
// SLIDE 9 — CIERRE
// ════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { path: path.join(__dirname, "public/images/landing/hero-bg-elite.png") };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "04060F", transparency: 60 } });
  bars(s, C.green);
  s.addImage({ path: path.join(__dirname, "public/images/logo-transparent.png"), x: 10, y: 0.5, w: 2.5, h: 2.5, sizing: { type: "contain", w: 2.5, h: 2.5 } });

  s.addText("HAGÁMOSLO\nREALIDAD", { x: 0.5, y: 0.8, w: 12.33, h: 3.0,
    fontSize: 66, bold: true, color: C.white, fontFace: FONT, align: "center", lineSpacingMultiple: 0.88 });

  s.addText("Deja que nosotros nos encarguemos de la tecnología.", { x: 0.5, y: 3.85, w: 12.33, h: 0.5,
    fontSize: 19, italic: true, color: C.dim, fontFace: FONT, align: "center" });
  s.addText("Tú dedícate a hacer lo que amas y a llevar tu negocio al siguiente nivel.", { x: 0.5, y: 4.38, w: 12.33, h: 0.5,
    fontSize: 17, italic: true, color: C.dim, fontFace: FONT, align: "center" });

  s.addShape(pptx.ShapeType.rect, { x: 3.5, y: 5.1, w: 6.33, h: 0.04, fill: { color: C.green } });

  const promises = ["✔  Te hablamos claro, sin términos raros o técnicos.",
                    "✔  Soporte rápido de personas reales, no robots.",
                    "✔  Nos encargamos de todo el trabajo pesado por ti."];
  promises.forEach((p, i) => {
    s.addText(p, { x: 3.5, y: 5.22 + i * 0.48, w: 6.5, h: 0.4, fontSize: 13, color: C.dim, fontFace: FONT, align: "center" });
  });

  s.addText("📱 0424-1846016   |   📸 @systemkyron   |   🌐 system-kyron.vercel.app", {
    x: 0.5, y: 6.88, w: 12.33, h: 0.38, fontSize: 12, color: C.muted, fontFace: FONT, align: "center" });
}

// ════════════════════════════════════════════════
// GUARDAR
// ════════════════════════════════════════════════
const out = path.join(__dirname, "Resumen_Ejecutivo_SystemKyron_RetoInspira.pptx");
pptx.writeFile({ fileName: out }).then(() => {
  console.log("✅  PPTX generado en:", out);
}).catch(e => console.error("❌", e));
