import { NextResponse } from 'next/server';
import pptxgen from 'pptxgenjs';
import { query } from '@/lib/db';

const C = {
  navy:      '060D1F',
  navyLight: '0A1530',
  navyCard:  '0D1B38',
  blue:      '0EA5E9',
  green:     '22C55E',
  white:     'FFFFFF',
  offWhite:  'E2E8F0',
  gray:      '94A3B8',
  grayDark:  '475569',
  accent:    '38BDF8',
  gold:      'F59E0B',
  rose:      'F43F5E',
  violet:    'A855F7',
  cyan:      '06B6D4',
  indigo:    '6366F1',
  amber:     'F59E0B',
};

const W = 13.33;
const H = 7.5;
const TOTAL = 12;

// ── helpers ──────────────────────────────────────────────────────────────────

function solidBg(s: pptxgen.Slide, fill = C.navy) {
  s.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: fill }, line: { color: fill } });
}

function sideLine(s: pptxgen.Slide, color = C.blue) {
  s.addShape('rect', { x: 0, y: 0, w: 0.12, h: H, fill: { color }, line: { color } });
}

function topBottomBars(s: pptxgen.Slide) {
  s.addShape('rect', { x: 0, y: 0,        w: W, h: 0.18, fill: { color: C.blue  }, line: { color: C.blue  } });
  s.addShape('rect', { x: 0, y: H - 0.18, w: W, h: 0.18, fill: { color: C.green }, line: { color: C.green } });
}

function footer(s: pptxgen.Slide, num: number, dur: string, tag: string, tagColor = C.blue) {
  s.addShape('rect', { x: 0, y: H - 0.46, w: W, h: 0.46, fill: { color: C.navyCard }, line: { color: C.navyCard } });
  s.addShape('rect', { x: 0, y: H - 0.47, w: W, h: 0.02, fill: { color: C.grayDark }, line: { color: C.grayDark } });
  s.addText(`${num} / ${TOTAL}  ·  SYSTEM KYRON — PITCH DECK  ·  CONFIDENCIAL`, {
    x: 0.3, y: H - 0.41, w: 8.5, h: 0.32, fontSize: 7, color: C.gray, fontFace: 'Arial',
  });
  s.addShape('rect', { x: 9.8, y: H - 0.43, w: 3.3, h: 0.36, fill: { color: tagColor + '22' }, line: { color: tagColor, pt: 0.75 } });
  s.addText(`⏱ ${dur}  ·  ${tag}`, {
    x: 9.8, y: H - 0.43, w: 3.3, h: 0.36, fontSize: 7.5, bold: true, color: tagColor, fontFace: 'Arial', align: 'center', valign: 'middle',
  });
}

function sectionHeader(s: pptxgen.Slide, num: string, title: string, subtitle: string, dur: string, color = C.blue) {
  s.addText(`${num}  ·  ${dur.toUpperCase()}`, {
    x: 0.35, y: 0.28, w: 5, h: 0.3, fontSize: 8, bold: true, color, fontFace: 'Arial', charSpacing: 2,
  });
  s.addText(title, {
    x: 0.35, y: 0.58, w: 12.6, h: 0.82, fontSize: 28, bold: true, color: C.white, fontFace: 'Arial',
  });
  s.addShape('rect', { x: 0.35, y: 1.43, w: 1.8, h: 0.055, fill: { color }, line: { color } });
  if (subtitle) {
    s.addText(subtitle, {
      x: 0.35, y: 1.55, w: 12.6, h: 0.38, fontSize: 11, italic: true, color: C.gray, fontFace: 'Arial',
    });
  }
}

function kpiRow(s: pptxgen.Slide, items: { val: string; desc: string }[], y = 5.6, colors = [C.green, C.blue, C.accent]) {
  const w = (W - 0.6) / items.length;
  items.forEach((item, i) => {
    const x = 0.3 + i * w;
    const col = colors[i % colors.length];
    s.addShape('rect', { x, y, w: w - 0.1, h: 0.8, fill: { color: col + '18' }, line: { color: col, pt: 1 } });
    s.addText(item.val, {
      x: x + 0.1, y: y + 0.03, w: w - 0.3, h: 0.42,
      fontSize: 16, bold: true, italic: true, color: col, fontFace: 'Arial', align: 'center',
    });
    s.addText(item.desc, {
      x: x + 0.1, y: y + 0.44, w: w - 0.3, h: 0.3,
      fontSize: 7.5, color: C.gray, fontFace: 'Arial', align: 'center',
    });
  });
}

function rect(s: pptxgen.Slide, x: number, y: number, w: number, h: number, fill: string, line?: string) {
  s.addShape('rect', { x, y, w, h, fill: { color: fill }, line: { color: line ?? fill } });
}

// ── route ────────────────────────────────────────────────────────────────────

export async function POST() {
  try {
    const pptx = new pptxgen();
    pptx.layout  = 'LAYOUT_WIDE';
    pptx.title   = 'System Kyron — Pitch Deck';
    pptx.subject = 'Ronda Seed $500.000 USD — Sistema Operativo del Empresario Venezolano';
    pptx.author  = 'System Kyron';
    pptx.company = 'System Kyron';

    // ── 1 / 12 · PORTADA ────────────────────────────────────────────────────
    {
      const s = pptx.addSlide();
      solidBg(s);
      s.addShape('rect', { x: 0, y: 0, w: 4.7, h: H, fill: { color: C.navyCard }, line: { color: C.navyCard } });
      s.addShape('rect', { x: 4.7, y: 0, w: 0.07, h: H, fill: { color: C.blue }, line: { color: C.blue } });
      rect(s, 0, 0, 4.7, 0.12, C.blue);
      rect(s, 0, H - 0.12, 4.7, 0.12, C.green);

      s.addShape('hexagon', { x: 0.85, y: 1.4, w: 2.95, h: 2.95, fill: { color: C.blue + '18' }, line: { color: C.blue, pt: 2 } });
      s.addText('SK', { x: 0.85, y: 1.4, w: 2.95, h: 2.95, fontSize: 54, bold: true, color: C.blue, fontFace: 'Arial', align: 'center', valign: 'middle' });
      s.addText('TELECOM · RECYCLING · TOTAL CONTROL', { x: 0.25, y: 4.62, w: 4.2, h: 0.28, fontSize: 7, bold: true, color: C.blue, fontFace: 'Arial', charSpacing: 1.2 });
      s.addText('PITCH DECK  ·  CONFIDENCIAL  ·  2026', { x: 0.25, y: 5.0, w: 4.2, h: 0.28, fontSize: 7, color: C.gray, fontFace: 'Arial' });

      s.addText('SYSTEM\nKYRON', { x: 5.1, y: 0.85, w: 7.9, h: 2.1, fontSize: 62, bold: true, color: C.white, fontFace: 'Arial', lineSpacingMultiple: 1.05 });
      s.addText('El Sistema Operativo del\nEmpresario Venezolano', { x: 5.1, y: 3.1, w: 7.9, h: 1.0, fontSize: 20, italic: true, color: C.accent, fontFace: 'Arial', lineSpacingMultiple: 1.35 });
      rect(s, 5.1, 4.28, 1.8, 0.055, C.green);
      s.addText('Ronda Seed · $500.000 USD', { x: 5.1, y: 4.48, w: 7.9, h: 0.42, fontSize: 14, bold: true, color: C.green, fontFace: 'Arial' });
      s.addText('Sector Privado Venezolano  ·  Q1 2026  ·  12 diapositivas', { x: 5.1, y: 5.0, w: 7.9, h: 0.35, fontSize: 10, color: C.gray, fontFace: 'Arial' });

      rect(s, 5.1, 5.65, 4.0, 0.78, C.blue, C.blue);
      s.addText('⏱  PITCH DE 27 MINUTOS', { x: 5.1, y: 5.65, w: 4.0, h: 0.78, fontSize: 13, bold: true, color: C.white, fontFace: 'Arial', align: 'center', valign: 'middle' });

      s.addNotes('PORTADA\n\n[Entrar en escena. Contacto visual. Silencio breve.]\n\n"Buenos días / buenas tardes. Soy [Nombre], fundador de System Kyron. Gracias por este espacio."\n\n[Avanzar de inmediato a la siguiente diapositiva.]');
      footer(s, 1, '—', 'PORTADA');
    }

    // ── 2 / 12 · 01 APERTURA — GANCHO INICIAL  (2 min) ─────────────────────
    {
      const s = pptx.addSlide();
      solidBg(s, C.navyLight); sideLine(s);
      sectionHeader(s, '01', 'APERTURA — GANCHO INICIAL', '¿Cuántas horas pierde tu empresa cada semana haciendo lo que una máquina puede hacer en segundos?', '2 min', C.blue);

      s.addText('"¿Cuántas horas a la semana pierde tu empresa\nhaciendo a mano lo que una máquina puede hacer en segundos?"', {
        x: 0.4, y: 2.0, w: 12.55, h: 1.5,
        fontSize: 20, italic: true, color: C.white, fontFace: 'Arial', align: 'center', lineSpacingMultiple: 1.45,
      });
      rect(s, 3.6, 3.6, 6.1, 0.055, C.blue);
      s.addText('[PAUSA DRAMÁTICA — 3 segundos de silencio]', {
        x: 0.4, y: 3.72, w: 12.55, h: 0.35,
        fontSize: 10, italic: true, color: C.gray, fontFace: 'Arial', align: 'center',
      });
      s.addText('"Eso no es un problema de capacidad. Es un problema de herramientas."', {
        x: 0.4, y: 4.15, w: 12.55, h: 0.55,
        fontSize: 14, color: C.offWhite, fontFace: 'Arial', align: 'center', italic: true,
      });
      rect(s, 2.5, 4.85, 8.3, 0.72, C.blue, C.blue);
      s.addText('System Kyron. El sistema operativo del empresario venezolano del siglo XXI.', {
        x: 2.5, y: 4.85, w: 8.3, h: 0.72, fontSize: 13, bold: true, color: C.white, fontFace: 'Arial', align: 'center', valign: 'middle',
      });

      kpiRow(s, [
        { val: '78%', desc: 'PYMEs sin sistema contable automatizado' },
        { val: '61%', desc: 'Desconocen su exposición fiscal en tiempo real' },
        { val: '84%', desc: 'Verifican pagos móviles manualmente' },
      ], 5.65);

      s.addNotes('APERTURA — GANCHO INICIAL  (2 minutos)\n\n[Dejar que la pregunta resuene. Mirar al público. 3 segundos de silencio.]\n\n"¿Cuántas horas a la semana pierde tu empresa haciendo a mano lo que una máquina puede hacer en segundos?"\n\n[PAUSA DRAMÁTICA]\n\n"En Venezuela, el 78% de las PYMEs y empresas medianas aún llevan su contabilidad en Excel. El 61% desconoce cuánto debe exactamente al SENIAT en tiempo real. Y el 84% no puede verificar un pago móvil en menos de 5 minutos."\n\n"Eso no es un problema de capacidad. Es un problema de herramientas. Hoy les presentamos la solución."\n\n[REVEAL — con convicción:]\n\n"System Kyron. El sistema operativo del empresario venezolano del siglo XXI."');
      footer(s, 2, '2 min', 'GANCHO INICIAL', C.blue);
    }

    // ── 3 / 12 · 02 EL PROBLEMA  (3 min) ────────────────────────────────────
    {
      const s = pptx.addSlide();
      solidBg(s); sideLine(s, C.rose);
      sectionHeader(s, '02', 'EL PROBLEMA — CONTEXTO VENEZOLANO', 'Un entorno fiscal y operativo único en el mundo.', '3 min', C.rose);

      const puntos = [
        { txt: 'Maneja simultáneamente: bolívares y dólares, IVA 16%, IGTF 3%, retenciones ISLR, libros SENIAT, normas VEN-NIF y tipo de cambio BCV que fluctúa a diario.' },
        { txt: 'Cobra por pago móvil, Zelle, Reserve, Binance. Gestiona puntos de venta, nómina, inventario, y cumple con SAREN, LOPCYMAT, INPSASEL, municipalidades.' },
        { txt: 'Todo esto, con equipos pequeños, en tiempo real, sin margen de error.' },
        { txt: 'Costo de un error fiscal: hasta 150% del tributo omitido + intereses + sanciones. Una retención mal calculada puede generar una fiscalización de meses.' },
        { txt: 'ERPs importados (SAP, QuickBooks) no fueron diseñados para este contexto. System Kyron sí.' },
      ];
      puntos.forEach((p, i) => {
        const y = 2.02 + i * 0.76;
        const col = i === 2 ? C.rose : i === 4 ? C.green : C.blue;
        rect(s, 0.3, y + 0.12, 0.1, 0.42, col);
        s.addText(p.txt, {
          x: 0.58, y, w: 12.45, h: 0.65,
          fontSize: i === 2 ? 13 : 11, bold: i === 2 || i === 4, italic: i === 2,
          color: i === 2 ? C.rose : i === 4 ? C.green : C.offWhite, fontFace: 'Arial',
        });
      });

      kpiRow(s, [
        { val: '150%',      desc: 'Sanción máxima por tributo omitido (SENIAT)' },
        { val: 'Bs. 50,45', desc: 'Tasa BCV USD referencial – marzo 2026' },
        { val: '16% + 3%',  desc: 'IVA + IGTF en operaciones con divisas' },
      ], 5.65, [C.rose, C.gold, C.amber]);

      s.addNotes('EL PROBLEMA — CONTEXTO VENEZOLANO  (3 minutos)\n\n"El empresario venezolano de hoy enfrenta un entorno único en el mundo. Maneja simultáneamente: bolívares y dólares, IVA al 16%, IGTF al 3% en operaciones en divisa, retenciones de ISLR, libros del SENIAT, normas VEN-NIF, y un tipo de cambio que fluctúa a diario."\n\n"Al mismo tiempo, necesita emitir facturas, cobrar por pago móvil, Zelle, Reserve, Binance. Manejar puntos de venta. Gestionar nómina. Controlar inventario. Y cumplir con Saren, LOPCYMAT, INPSASEL, municipalidades…"\n\n[ÉNFASIS]\n\n"Todo esto, con equipos pequeños, en tiempo real, sin margen de error."\n\n"El costo promedio de un error fiscal en Venezuela puede llegar al 150% del tributo omitido más intereses y sanciones. Una retención mal calculada puede generar una fiscalización que dure meses."\n\n"Las soluciones existentes — software contable importado, ERPs costosos, hojas de cálculo — no fueron diseñadas para este contexto. System Kyron sí."');
      footer(s, 3, '3 min', 'EL PROBLEMA', C.rose);
    }

    // ── 4 / 12 · 03 LA SOLUCIÓN  (5 min) ────────────────────────────────────
    {
      const s = pptx.addSlide();
      solidBg(s, C.navyLight); sideLine(s, C.green);
      sectionHeader(s, '03', 'LA SOLUCIÓN — SYSTEM KYRON', 'Una sola plataforma. Todo lo que tu empresa necesita para operar, crecer y cumplir en Venezuela.', '5 min', C.green);

      const mods = [
        { icon: '📊', t: 'CONTABILIDAD INTELIGENTE',      d: 'Normas VEN-NIF automatizadas. Libros SENIAT en un clic: Compra-Venta, Diario, Mayor, Inventario. Ajuste RIPF con índice BCV. Declaraciones IVA/ISLR/IGTF precalculadas.', col: C.blue   },
        { icon: '📱', t: 'PAGOS DIGITALES VERIFICADOS',   d: 'Verificación de pago móvil en tiempo real. El cliente paga → 3 seg → confirmado + registrado + acreditado. Banesco, BdV, Mercantil, BNC, BOD, BBVA Provincial.', col: C.green  },
        { icon: '📡', t: 'TELECOMUNICACIONES CORPORATIVAS', d: 'Internet ilimitado + telefonía corporativa con planes contables integrados + WhatsApp Business IA que responde a clientes 24/7 automáticamente.',             col: C.accent },
        { icon: '🤝', t: 'ALIANZAS ESTRATÉGICAS',         d: 'Chévere Salud (cobertura médica), Mercantil Seguros (activos), Mapfre (seguros vehiculares). Todo gestionado dentro del sistema con integración contable automática.', col: C.gold   },
      ];
      mods.forEach((m, i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const x = 0.3 + col * 6.5, y = 2.1 + row * 1.82;
        s.addShape('rect', { x, y, w: 6.35, h: 1.7, fill: { color: C.navyCard }, line: { color: m.col, pt: 1 } });
        rect(s, x, y, 6.35, 0.08, m.col, m.col);
        s.addText(`${m.icon}  ${m.t}`, { x: x + 0.18, y: y + 0.18, w: 6.0, h: 0.42, fontSize: 11, bold: true, color: C.white, fontFace: 'Arial' });
        s.addText(m.d, { x: x + 0.18, y: y + 0.65, w: 6.0, h: 0.9, fontSize: 9.5, color: C.gray, fontFace: 'Arial', lineSpacingMultiple: 1.3 });
      });

      kpiRow(s, [
        { val: '12+',  desc: 'Módulos integrados en una sola plataforma' },
        { val: '3 seg', desc: 'Verificación automática de pago móvil' },
        { val: '100%', desc: 'Cumplimiento SENIAT garantizado' },
      ], 5.65, [C.green, C.blue, C.accent]);

      s.addNotes('LA SOLUCIÓN — SYSTEM KYRON  (5 minutos)\n\n"System Kyron es una plataforma de gestión empresarial integral, diseñada específicamente para el mercado venezolano. No es solo software contable. Es el sistema nervioso de tu empresa."\n\n[MÓDULO 1 — CONTABILIDAD]\n"Normas VEN-NIF automatizadas. Libros del SENIAT generados en un clic: Libro de Compra-Venta, Diario, Mayor, Inventario. Ajuste por inflación RIPF automático con el índice BCV. Declaraciones de IVA, ISLR, IGTF precalculadas."\n\n[MÓDULO 2 — PAGOS]\n"Verificación automática de pago móvil en tiempo real. El cliente paga y en 3 segundos el sistema confirma, registra y acredita. Sin llamadas. Sin esperas. Integración con Banesco, BdV, Mercantil, BNC, BOD, BBVA Provincial."\n\n[MÓDULO 3 — TELECOM]\n"En alianza con nuestra línea telefónica, el sistema incluye internet ilimitado, telefonía corporativa con planes contables integrados, y WhatsApp Business con IA que responde a tus clientes 24/7 automáticamente."\n\n[MÓDULO 4 — ALIANZAS]\n"Acceso directo a Chévere Salud para cobertura médica corporativa, Mercantil Seguros para protección de activos, y Mapfre para seguros vehiculares. Todo gestionado dentro del sistema con integración contable automática."\n\n[ÉNFASIS]\n"Un solo sistema. Todo lo que tu empresa necesita para operar, crecer y cumplir en Venezuela."');
      footer(s, 4, '5 min', 'LA SOLUCIÓN', C.green);
    }

    // ── 5 / 12 · 04 MERCADO OBJETIVO  (2 min) ───────────────────────────────
    {
      const s = pptx.addSlide();
      solidBg(s); sideLine(s, C.amber);
      sectionHeader(s, '04', 'MERCADO OBJETIVO', 'Cliente ideal: director/dueño 35–60 años, factura $5K–$200K USD/mes, actualmente usa Excel o contador externo.', '2 min', C.amber);

      const tam = [
        { label: 'TAM', sub: 'Mercado Total Direccionable', val: '120.000 empresas registradas en el SENIAT Venezuela', col: C.gray, bw: 7.0 },
        { label: 'SAM', sub: 'Mercado Objetivo Primario',   val: '94.000 PYMEs formales con 5–250 empleados',            col: C.blue, bw: 9.5 },
        { label: 'SOM', sub: 'Alcanzable Año 1',            val: '2.400 clientes → $4.320.000 USD ARR potencial',          col: C.green, bw: 12.0 },
      ];
      tam.forEach((d, i) => {
        const y = 2.05 + i * 1.22;
        rect(s, 0.3, y + 0.22, d.bw, 0.52, d.col + '28', d.col);
        s.addText(d.label, { x: 0.4, y, w: 1.5, h: 0.5, fontSize: 18, bold: true, italic: true, color: d.col, fontFace: 'Arial' });
        s.addText(d.sub.toUpperCase(), { x: 2.0, y: y + 0.08, w: 5, h: 0.3, fontSize: 7.5, bold: true, color: d.col, fontFace: 'Arial', charSpacing: 1 });
        s.addText(d.val, { x: 0.5, y: y + 0.82, w: 12.6, h: 0.35, fontSize: 12, bold: true, color: C.white, fontFace: 'Arial' });
      });
      s.addText('Verticales con mayor tracción: Distribuidoras · Farmacias · Ferreterías · Constructoras · Bufetes · Clínicas · Servicios · Condominios', {
        x: 0.3, y: 5.63, w: 12.75, h: 0.35, fontSize: 9.5, italic: true, color: C.gray, fontFace: 'Arial',
      });

      kpiRow(s, [
        { val: '120K', desc: 'Empresas registradas en SENIAT Venezuela' },
        { val: '94K',  desc: 'PYMEs en mercado objetivo' },
        { val: '$150', desc: 'Precio promedio mensual por empresa (USD)' },
      ], 6.05, [C.gray, C.blue, C.green]);

      s.addNotes('MERCADO OBJETIVO  (2 minutos)\n\n"Venezuela cuenta con más de 120.000 empresas formalmente registradas en el SENIAT. De ellas, aproximadamente 94.000 son PYMEs con entre 5 y 250 empleados. Ese es nuestro mercado primario."\n\n"Nuestro cliente ideal es el director o dueño de empresa entre 35 y 60 años, con operaciones en Caracas, Maracaibo, Valencia, Barquisimeto o Maracay, que factura entre $5.000 y $200.000 USD mensuales y que actualmente usa Excel, un contador externo, o software desactualizado."\n\n"Segmentos verticales con mayor tracción inicial: Distribuidoras, Farmacias, Ferreterías, Constructoras, Bufetes de abogados, Clínicas privadas, Empresas de servicios y Condominios."\n\n[DATOS]\n"TAM: 120.000 empresas · SAM: 94.000 PYMEs formales · SOM (primer año): 2.400 clientes · Precio promedio: $150 USD/mes · ARR potencial año 1: $4.320.000 USD"');
      footer(s, 5, '2 min', 'MERCADO OBJETIVO', C.amber);
    }

    // ── 6 / 12 · 05 MODELO DE NEGOCIO  (3 min) ──────────────────────────────
    {
      const s = pptx.addSlide();
      solidBg(s, C.navyLight); sideLine(s, C.violet);
      sectionHeader(s, '05', 'MODELO DE NEGOCIO', 'SaaS recurrente en USD + comisiones por alianzas + Telecom + Implementación.', '3 min', C.violet);

      const planes = [
        { icon: '🔷', t: 'PLAN PROFESIONAL — $99 USD/mes',  d: 'Contabilidad VEN-NIF · Facturación ilimitada · Conciliación 3 bancos · Pago móvil verificado · Hasta 10 usuarios · Telefonía básica.', col: C.blue   },
        { icon: '🔶', t: 'PLAN CORPORATIVO — $199 USD/mes', d: 'Todo Profesional + Conciliación 6 bancos · Módulo RRHH completo · WhatsApp IA · Telecom 5 líneas · Legal/Tributario avanzados · 50 usuarios.', col: C.accent },
        { icon: '💎', t: 'PLAN ENTERPRISE — $399 USD/mes',  d: 'Plataforma completa sin límites · Onboarding personalizado · SLA 99.9% · API bancaria · Telecom completo · Seguros y salud integrados · Usuarios ilimitados.', col: C.gold   },
      ];
      planes.forEach((p, i) => {
        const y = 2.0 + i * 1.35;
        s.addShape('rect', { x: 0.3, y, w: 12.75, h: 1.22, fill: { color: C.navyCard }, line: { color: p.col, pt: 1 } });
        rect(s, 0.3, y, 12.75, 0.08, p.col, p.col);
        s.addText(`${p.icon}  ${p.t}`, { x: 0.5, y: y + 0.18, w: 12.3, h: 0.42, fontSize: 13, bold: true, color: C.white, fontFace: 'Arial' });
        s.addText(p.d, { x: 0.5, y: y + 0.64, w: 12.3, h: 0.45, fontSize: 10, color: C.gray, fontFace: 'Arial' });
      });
      s.addText('Ingresos adicionales: Comisiones Chévere Salud / Mercantil Seguros / Mapfre  ·  Margen planes telefónicos  ·  Implementación & Capacitación', {
        x: 0.3, y: 5.65, w: 12.75, h: 0.32, fontSize: 9, italic: true, color: C.gray, fontFace: 'Arial',
      });

      kpiRow(s, [
        { val: '$99',        desc: 'Precio entrada Plan Profesional / mes (USD)' },
        { val: 'LTV $3.600+', desc: 'Valor promedio de cliente en 3 años' },
        { val: '< $80',      desc: 'Costo de adquisición de cliente (CAC)' },
      ], 6.05, [C.blue, C.green, C.violet]);

      s.addNotes('MODELO DE NEGOCIO  (3 minutos)\n\n"System Kyron opera bajo un modelo de suscripción mensual SaaS con tres niveles, más ingresos adicionales por servicios de valor agregado y comisiones de alianzas."\n\nPLAN PROFESIONAL — $99 USD/mes:\n"Contabilidad completa VEN-NIF. Facturación electrónica ilimitada. Conciliación bancaria 3 bancos. Pago móvil verificado. Hasta 10 usuarios. Telefonía básica incluida."\n\nPLAN CORPORATIVO — $199 USD/mes:\n"Todo del plan Profesional. Conciliación 6 bancos. Módulo RRHH completo. WhatsApp IA activado. Telefonía corporativa 5 líneas. Módulos legal y tributario avanzados. Hasta 50 usuarios."\n\nPLAN ENTERPRISE — $399 USD/mes:\n"Plataforma completa sin límites. Onboarding personalizado. SLA garantizado 99.9%. Integración API con sistemas bancarios. Módulo de telecomunicaciones completo. Alianzas de seguros y salud integradas. Usuarios ilimitados."\n\n"Ingresos adicionales: Comisiones por afiliación de clientes a Chévere Salud, Mercantil Seguros y Mapfre. Margen en planes telefónicos corporativos. Servicios de implementación y capacitación."');
      footer(s, 6, '3 min', 'MODELO DE NEGOCIO', C.violet);
    }

    // ── 7 / 12 · 06 VENTAJAS COMPETITIVAS  (3 min) ──────────────────────────
    {
      const s = pptx.addSlide();
      solidBg(s); sideLine(s, C.cyan);
      sectionHeader(s, '06', 'VENTAJAS COMPETITIVAS', 'Diseñado desde Venezuela, para Venezuela. Nadie más puede replicarlo rápido.', '3 min', C.cyan);

      const difs = [
        { icon: '⚡', t: 'INTELIGENCIA FISCAL VENEZOLANA',         d: 'SENIAT · Gaceta Oficial · BCV · LOPCYMAT · SAREN · SAPI. Actualizaciones automáticas. Cero riesgo de incumplimiento involuntario.',                                     col: C.gold   },
        { icon: '📱', t: 'VERIFICACIÓN DE PAGO MÓVIL EN TIEMPO REAL', d: 'Nadie más en Venezuela tiene verificación automática integrada al sistema contable. 0% de fraude. 100% de trazabilidad.',                                                col: C.green  },
        { icon: '🌐', t: 'ECOSISTEMA TODO EN UNO',                 d: 'Telefonía · internet · seguros · salud · nómina · legal · inventario. El empresario no tiene que salir de Kyron para operar.',                                              col: C.blue   },
        { icon: '🧠', t: 'IA GENERATIVA APLICADA AL CONTEXTO LOCAL', d: 'Gemini 1.5 Pro: redacta documentos legales venezolanos, extrae datos de facturas por foto, responde consultas contables en lenguaje natural.',                               col: C.accent },
      ];
      difs.forEach((d, i) => {
        const y = 2.05 + i * 1.1;
        s.addShape('rect', { x: 0.3, y, w: 12.75, h: 0.98, fill: { color: C.navyCard }, line: { color: d.col + '80', pt: 1 } });
        s.addText(d.icon, { x: 0.42, y: y + 0.18, w: 0.68, h: 0.55, fontSize: 22, align: 'center' });
        s.addText(d.t, { x: 1.22, y: y + 0.1, w: 11.55, h: 0.4, fontSize: 11.5, bold: true, color: C.white, fontFace: 'Arial' });
        s.addText(d.d, { x: 1.22, y: y + 0.52, w: 11.55, h: 0.38, fontSize: 9.5, color: C.gray, fontFace: 'Arial' });
      });
      rect(s, 0.3, 6.5, 12.75, 0.38, C.cyan + '18', C.cyan);
      s.addText('SAP, QuickBooks, Aspel — no tienen ni la mitad de estas capacidades adaptadas a Venezuela. Y cuestan 10 veces más.', {
        x: 0.3, y: 6.5, w: 12.75, h: 0.38, fontSize: 9.5, italic: true, bold: true, color: C.cyan, fontFace: 'Arial', align: 'center', valign: 'middle',
      });

      kpiRow(s, [
        { val: '0',   desc: 'Competidores con verificación de pago móvil integrada' },
        { val: '10x', desc: 'Más económico que ERPs importados equivalentes' },
        { val: '34h', desc: 'Promedio de horas ahorradas por empresa al mes' },
      ], 5.58, [C.cyan, C.green, C.blue]);

      s.addNotes('VENTAJAS COMPETITIVAS  (3 minutos)\n\n"Lo que nos diferencia no es solo tecnología. Es contexto. Somos el único sistema diseñado desde Venezuela, para Venezuela."\n\nINTELIGENCIA FISCAL:\n"Conocemos el SENIAT, la Gaceta Oficial, el BCV, la LOPCYMAT, el SAREN, el SAPI. Actualizaciones automáticas ante cualquier cambio regulatorio. Cero riesgo de incumplimiento involuntario."\n\nPAGO MÓVIL:\n"Nadie más en Venezuela ofrece verificación automática de pago móvil integrada al sistema contable. El cliente paga, el sistema lo confirma y lo registra. 0% de fraude. 100% de trazabilidad."\n\nECOSISTEMA:\n"No solo contabilidad. Telefonía, internet, seguros, salud, nómina, legal, inventario. Todo integrado. El empresario venezolano no tiene que salir de Kyron para operar su empresa."\n\nIA GENERATIVA:\n"Usando Google Gemini 1.5 Pro, el sistema redacta documentos legales venezolanos, extrae datos de facturas y recibos por foto, y responde consultas contables y tributarias en lenguaje natural."\n\n[ÉNFASIS]\n"Software importado como SAP, QuickBooks o Aspel no tienen ni la mitad de estas capacidades adaptadas al mercado venezolano. Y cuestan 10 veces más."');
      footer(s, 7, '3 min', 'VENTAJAS COMPETITIVAS', C.cyan);
    }

    // ── 8 / 12 · 07 TRACCIÓN Y VALIDACIÓN  (2 min) ──────────────────────────
    {
      const s = pptx.addSlide();
      solidBg(s, C.navyLight); sideLine(s, C.indigo);
      sectionHeader(s, '07', 'TRACCIÓN Y VALIDACIÓN', 'System Kyron no es una idea. Es un producto funcionando con clientes reales en el mercado venezolano hoy.', '2 min', C.indigo);

      const logros = [
        { icon: '🏢', t: 'CLIENTES ACTIVOS', d: 'Gestionamos contabilidad y operaciones en: distribución, retail, servicios profesionales, salud privada y construcción. Más de 240 empresas en lista de espera activa.', col: C.indigo },
        { icon: '💰', t: 'VOLUMEN DE TRANSACCIONES', d: 'Último trimestre: más de Bs. 18.400.000.000 en transacciones registradas (~$364 millones USD al tipo BCV promedio del período).', col: C.green  },
        { icon: '🤝', t: 'ALIANZAS FORMALIZADAS', d: 'Acuerdos marco: Chévere Salud + Mercantil Seguros + Mapfre Venezuela. Negociaciones avanzadas con Banesco y BNC para API bancaria certificada.', col: C.blue   },
      ];
      logros.forEach((l, i) => {
        const y = 2.05 + i * 1.25;
        s.addShape('rect', { x: 0.3, y, w: 12.75, h: 1.12, fill: { color: C.navyCard }, line: { color: l.col, pt: 1 } });
        rect(s, 0.3, y, 12.75, 0.08, l.col, l.col);
        s.addText(l.icon + '  ' + l.t, { x: 0.5, y: y + 0.18, w: 12.3, h: 0.4, fontSize: 12, bold: true, color: C.white, fontFace: 'Arial' });
        s.addText(l.d, { x: 0.5, y: y + 0.62, w: 12.3, h: 0.42, fontSize: 10, color: C.gray, fontFace: 'Arial' });
      });
      s.addText('NPS promedio: 72 puntos  ·  Retención mensual: 96.4%  ·  Ciclo demo → contrato: 11 días', {
        x: 0.3, y: 5.85, w: 12.75, h: 0.32, fontSize: 10, italic: true, bold: true, color: C.green, fontFace: 'Arial', align: 'center',
      });

      kpiRow(s, [
        { val: '96.4%',  desc: 'Tasa de retención mensual de clientes' },
        { val: '72 NPS', desc: 'Satisfacción de clientes activos' },
        { val: '11 días', desc: 'Ciclo promedio de venta (demo → contrato)' },
      ], 6.25, [C.green, C.indigo, C.blue]);

      s.addNotes('TRACCIÓN Y VALIDACIÓN  (2 minutos)\n\n"System Kyron no es una idea. Es un producto funcionando, con clientes reales, en el mercado venezolano hoy."\n\nCLIENTES ACTIVOS:\n"Actualmente gestionamos la contabilidad y operaciones de empresas en sectores: distribución, retail, servicios profesionales, salud privada y construcción. Más de 240 empresas en lista de espera."\n\nVOLUMEN:\n"En el último trimestre procesamos más de Bs. 18.400.000.000 en transacciones registradas, equivalentes a aproximadamente $364 millones USD al tipo de cambio BCV promedio del período."\n\nALIANZAS:\n"Acuerdos marco firmados con Chévere Salud, Mercantil Seguros y Mapfre Venezuela. Negociaciones avanzadas con Banesco y BNC para integración API bancaria certificada."\n\n"NPS (Net Promoter Score) promedio entre clientes actuales: 72 puntos. Tasa de retención mensual: 96.4%. Tiempo promedio desde demo a contrato firmado: 11 días."');
      footer(s, 8, '2 min', 'TRACCIÓN Y VALIDACIÓN', C.indigo);
    }

    // ── 9 / 12 · 08 PROYECCIONES FINANCIERAS  (2 min) ───────────────────────
    {
      const s = pptx.addSlide();
      solidBg(s); sideLine(s, C.green);
      sectionHeader(s, '08', 'PROYECCIONES FINANCIERAS', 'Crecimiento conservador: 2.5% conversión del SAM · churn mensual < 4% · 3 países para 2027.', '2 min', C.green);

      const hdrs = ['AÑO', 'EMPRESAS ACTIVAS', 'ARR', 'MRR AL CIERRE', 'EBITDA'];
      const cx = [0.3, 2.1, 5.2, 8.3, 11.3];
      const cw = [1.7, 3.0, 3.0, 2.9, 1.85];
      hdrs.forEach((h, i) => {
        s.addText(h, { x: cx[i], y: 2.02, w: cw[i], h: 0.38, fontSize: 8.5, bold: true, color: C.blue, fontFace: 'Arial', align: i === 0 ? 'left' : 'center', charSpacing: 1 });
      });

      const rows = [
        { year: '2026', col: C.blue,  emoji: '📈', vals: ['500',   '$720.000 USD',    '$60.000 USD',  '24%'], note: '' },
        { year: '2027', col: C.accent, emoji: '📈', vals: ['2.400', '$3.840.000 USD',  '$320.000 USD', '38%'], note: 'Expansión LATAM: Colombia + Ecuador' },
        { year: '2028', col: C.green,  emoji: '🚀', vals: ['8.000', '$14.400.000 USD', '$1.200.000 USD','52%'], note: 'Plataforma regional consolidada' },
      ];
      rows.forEach((r, i) => {
        const y = 2.52 + i * 1.3;
        s.addShape('rect', { x: 0.22, y: y - 0.05, w: 12.95, h: 1.18, fill: { color: i === 2 ? C.navyCard : C.navy }, line: { color: i === 2 ? r.col : C.grayDark, pt: i === 2 ? 1.5 : 0.5 } });
        if (i === 2) rect(s, 0.22, y - 0.05, 0.12, 1.18, r.col);
        s.addText(r.emoji + ' ' + r.year, { x: cx[0], y: y + 0.18, w: cw[0], h: 0.6, fontSize: 20, bold: true, italic: true, color: r.col, fontFace: 'Arial' });
        r.vals.forEach((v, vi) => {
          const ii = vi + 1;
          s.addText(v, {
            x: cx[ii], y: y + 0.12, w: cw[ii], h: 0.7,
            fontSize: ii === 2 ? 16 : 13, bold: ii === 2 || ii === 4,
            color: ii === 2 || ii === 4 ? r.col : C.offWhite,
            fontFace: 'Arial', align: 'center', valign: 'middle',
          });
        });
        if (r.note) s.addText(r.note, { x: cx[1], y: y + 0.78, w: 11.2, h: 0.28, fontSize: 8.5, italic: true, color: C.gray, fontFace: 'Arial' });
      });

      kpiRow(s, [
        { val: '$14.4M', desc: 'ARR proyectado año 3 (2028)' },
        { val: '52%',    desc: 'Margen EBITDA proyectado año 3' },
        { val: '3',      desc: 'Países objetivo para 2027 (VE, CO, EC)' },
      ], 6.45, [C.green, C.blue, C.accent]);

      s.addNotes('PROYECCIONES FINANCIERAS  (2 minutos)\n\n"Proyectamos un crecimiento conservador basado en nuestra tracción actual y en los 240 clientes en lista de espera."\n\nAÑO 1 — 2026:\n"Meta: 500 empresas activas · Ingreso ARR: $720.000 USD · EBITDA estimado: 24% · MRR al cierre: $60.000 USD"\n\nAÑO 2 — 2027:\n"Meta: 2.400 empresas activas · Ingreso ARR: $3.840.000 USD · EBITDA: 38% · Expansión a mercados LATAM: Colombia, Ecuador"\n\nAÑO 3 — 2028:\n"Meta: 8.000 empresas activas · Ingreso ARR: $14.400.000 USD · EBITDA: 52% · Plataforma regional consolidada"\n\n"Estas proyecciones asumen una tasa de conversión del 2.5% del mercado venezolano SAM y un churn mensual inferior al 4%, consistente con nuestros números actuales."');
      footer(s, 9, '2 min', 'PROYECCIONES', C.green);
    }

    // ── 10 / 12 · 09 EL EQUIPO  (2 min) ─────────────────────────────────────
    {
      const s = pptx.addSlide();
      solidBg(s, C.navyLight); sideLine(s, C.rose);
      sectionHeader(s, '09', 'EL EQUIPO', '20+ años de experiencia combinada en contabilidad venezolana, tecnología y telecomunicaciones.', '2 min', C.rose);

      const mbs = [
        { rol: 'FUNDADOR / CEO', d: 'Contador Público colegiado con 15 años de experiencia fiscal en Venezuela. Ex-gerente tributario en firma Big Four. Especialista en VEN-NIF, SENIAT y cumplimiento regulatorio venezolano.', col: C.blue   },
        { rol: 'CTO',           d: 'Ingeniero en computación. Especialista en arquitecturas SaaS y desarrollo de plataformas de pagos digitales en el ecosistema venezolano. Ex-desarrollador senior en entidad bancaria venezolana.', col: C.green  },
        { rol: 'CCO – ALIANZAS', d: 'Ejecutivo comercial con red de más de 800 contactos empresariales en Venezuela. Responsable de los acuerdos con Chévere Salud, Mercantil Seguros y Mapfre.', col: C.accent },
      ];
      mbs.forEach((m, i) => {
        const y = 2.05 + i * 1.22;
        s.addShape('rect', { x: 0.3, y, w: 12.75, h: 1.1, fill: { color: C.navyCard }, line: { color: m.col, pt: 1 } });
        s.addShape('ellipse', { x: 0.42, y: y + 0.2, w: 0.72, h: 0.72, fill: { color: m.col + '28' }, line: { color: m.col, pt: 1.5 } });
        s.addText('👤', { x: 0.42, y: y + 0.2, w: 0.72, h: 0.72, fontSize: 18, align: 'center', valign: 'middle' });
        s.addText(m.rol, { x: 1.3, y: y + 0.1, w: 11.5, h: 0.35, fontSize: 9, bold: true, color: m.col, fontFace: 'Arial', charSpacing: 1 });
        s.addText(m.d,   { x: 1.3, y: y + 0.48, w: 11.5, h: 0.52, fontSize: 10, color: C.gray, fontFace: 'Arial' });
      });
      rect(s, 0.3, 5.75, 12.75, 0.42, C.navyCard, C.grayDark);
      s.addText('Advisory Board: Abogados mercantiles · Contadores Públicos certificados · Especialistas fintech latinoamericano', {
        x: 0.3, y: 5.75, w: 12.75, h: 0.42, fontSize: 10, italic: true, color: C.gray, fontFace: 'Arial', align: 'center', valign: 'middle',
      });

      kpiRow(s, [
        { val: '20+',  desc: 'Años experiencia combinada del equipo fundador' },
        { val: '800+', desc: 'Contactos empresariales en red comercial' },
        { val: '3',    desc: 'Alianzas estratégicas formalizadas' },
      ], 6.28, [C.blue, C.green, C.accent]);

      s.addNotes('EL EQUIPO  (2 minutos)\n\n"Detrás de System Kyron hay un equipo fundador con más de 20 años de experiencia combinada en contabilidad venezolana, tecnología y telecomunicaciones."\n\nFUNDADOR / CEO:\n"Contador Público colegiado con 15 años de experiencia fiscal en Venezuela. Ex-gerente tributario en firma Big Four. Especialista en VEN-NIF, SENIAT y cumplimiento regulatorio venezolano."\n\nCTO:\n"Ingeniero en computación. Especialista en arquitecturas SaaS y desarrollo de plataformas de pagos digitales en el ecosistema venezolano. Ex-desarrollador senior en entidad bancaria venezolana."\n\nCCO – ALIANZAS:\n"Ejecutivo comercial con red de más de 800 contactos empresariales en Venezuela. Responsable de los acuerdos con Chévere Salud, Mercantil Seguros y Mapfre."\n\n"El equipo está complementado por un board de asesores que incluye abogados mercantiles, contadores públicos certificados, y especialistas en fintech latinoamericano."');
      footer(s, 10, '2 min', 'EL EQUIPO', C.rose);
    }

    // ── 11 / 12 · 10 RONDA DE INVERSIÓN  (3 min) ────────────────────────────
    {
      const s = pptx.addSlide();
      solidBg(s); sideLine(s, C.blue);
      sectionHeader(s, '10', 'RONDA DE INVERSIÓN — CALL TO ACTION', 'Ronda Seed $500.000 USD para acelerar lo que ya está funcionando.', '3 min', C.blue);

      const usos = [
        { pct: '35%', t: '35% — TECNOLOGÍA Y PRODUCTO',         d: 'Finalización módulos avanzados: Telecom corporativo, API bancaria Banesco/Mercantil. Infraestructura cloud para 10.000 empresas.', col: C.blue,   bw: 8.5  },
        { pct: '30%', t: '30% — EQUIPO COMERCIAL',              d: '8 ejecutivos de ventas B2B en Caracas, Maracaibo, Valencia y Barquisimeto. Meta: cerrar 500 empresas en los primeros 12 meses post-ronda.', col: C.green,  bw: 7.3  },
        { pct: '20%', t: '20% — MARKETING Y POSICIONAMIENTO',   d: 'Presencia digital + eventos empresariales + alianzas: Fedecámaras, Conindustria, Consecomercio, Cavedi.', col: C.accent, bw: 4.9  },
        { pct: '15%', t: '15% — OPERACIONES Y CAPITAL DE TRABAJO', d: '6 meses de runway operativo. Estructura administrativa. Licencias regulatorias adicionales.', col: C.gold,   bw: 3.65 },
      ];
      usos.forEach((u, i) => {
        const y = 2.05 + i * 1.2;
        s.addShape('rect', { x: 0.3, y, w: 1.55, h: 1.05, fill: { color: u.col + '1E' }, line: { color: u.col, pt: 1.5 } });
        s.addText(u.pct, { x: 0.3, y, w: 1.55, h: 1.05, fontSize: 24, bold: true, italic: true, color: u.col, fontFace: 'Arial', align: 'center', valign: 'middle' });
        s.addText(u.t, { x: 2.05, y: y + 0.05, w: 11.0, h: 0.4, fontSize: 12, bold: true, color: C.white, fontFace: 'Arial' });
        rect(s, 2.05, y + 0.52, u.bw, 0.14, u.col, u.col);
        rect(s, 2.05 + u.bw, y + 0.52, 11.0 - u.bw, 0.14, u.col + '25', u.col + '25');
        s.addText(u.d, { x: 2.05, y: y + 0.72, w: 11.0, h: 0.35, fontSize: 9.5, color: C.gray, fontFace: 'Arial' });
      });

      kpiRow(s, [
        { val: '$500K',    desc: 'Ronda seed buscada' },
        { val: '18 meses', desc: 'Runway con la inversión' },
        { val: '500',      desc: 'Empresas meta en 12 meses post-ronda' },
      ], 6.3, [C.blue, C.green, C.gold]);

      s.addNotes('RONDA DE INVERSIÓN — CALL TO ACTION  (3 minutos)\n\n"Estamos buscando nuestra primera ronda seed de $500.000 USD para acelerar lo que ya está funcionando."\n\n35% — TECNOLOGÍA:\n"Finalización de módulos avanzados: Telecom corporativo, API bancaria certificada Banesco/Mercantil. Infraestructura cloud para escalar a 10.000 empresas."\n\n30% — EQUIPO COMERCIAL:\n"Contratación de 8 ejecutivos de ventas B2B en Caracas, Maracaibo, Valencia y Barquisimeto. Meta: cerrar 500 empresas en los primeros 12 meses post-ronda."\n\n20% — MARKETING:\n"Presencia digital, eventos empresariales, alianzas con cámaras de comercio: Fedecámaras, Conindustria, Consecomercio, Cavedi."\n\n15% — OPERACIONES:\n"6 meses de runway operativo. Estructura administrativa. Licencias regulatorias adicionales."\n\n[CIERRE]\n"El mercado existe. Los clientes están esperando. El producto funciona. El equipo lo sabe hacer. Solo necesitamos el combustible para acelerar. Únase a nosotros en construir el sistema operativo del empresario venezolano."');
      footer(s, 11, '3 min', 'RONDA $500K', C.blue);
    }

    // ── 12 / 12 · CIERRE ────────────────────────────────────────────────────
    {
      const s = pptx.addSlide();
      solidBg(s);
      topBottomBars(s);
      s.addShape('hexagon', { x: 4.5, y: 0.3, w: 4.3, h: 4.3, fill: { color: C.blue + '12' }, line: { color: C.blue + '40', pt: 2 } });
      s.addText('SK', { x: 4.5, y: 0.3, w: 4.3, h: 4.3, fontSize: 80, bold: true, color: C.blue + '35', fontFace: 'Arial', align: 'center', valign: 'middle' });

      s.addText('ÚNASE A NOSOTROS', { x: 0.5, y: 1.0, w: W - 1, h: 1.1, fontSize: 46, bold: true, color: C.white, fontFace: 'Arial', align: 'center' });
      s.addText('El mercado existe. Los clientes están esperando.\nEl producto funciona. El equipo lo sabe hacer.\nSolo necesitamos el combustible para acelerar.', {
        x: 1.5, y: 2.25, w: W - 3, h: 1.3, fontSize: 15, italic: true, color: C.offWhite, fontFace: 'Arial', align: 'center', lineSpacingMultiple: 1.4,
      });

      rect(s, 3.4, 3.78, 6.53, 0.85, C.blue, C.blue);
      s.addText('CONVERSEMOS HOY → SEED $500.000 USD', { x: 3.4, y: 3.78, w: 6.53, h: 0.85, fontSize: 17, bold: true, color: C.white, fontFace: 'Arial', align: 'center', valign: 'middle' });

      [
        { icon: '🌐', t: 'system-kyron.com' },
        { icon: '📧', t: 'inversores@system-kyron.com' },
        { icon: '📱', t: '@SystemKyron' },
      ].forEach((c, i) => {
        s.addText(`${c.icon}  ${c.t}`, { x: 0.8 + i * 4.0, y: 4.92, w: 3.8, h: 0.42, fontSize: 11, color: C.gray, fontFace: 'Arial', align: 'center' });
      });

      s.addText('TELECOM · RECYCLING · TOTAL CONTROL', { x: 0.5, y: 5.6, w: W - 1, h: 0.3, fontSize: 9, bold: true, color: C.blue, fontFace: 'Arial', align: 'center', charSpacing: 2 });
      s.addText('12 diapositivas  ·  27 minutos de presentación  ·  Ronda Seed $500K  ·  2026', {
        x: 0.5, y: 6.05, w: W - 1, h: 0.28, fontSize: 8, color: C.grayDark, fontFace: 'Arial', align: 'center',
      });

      s.addNotes('CIERRE  (30 segundos)\n\n[Con calma. Con convicción. Mirar directamente al inversor.]\n\n"El mercado existe. Los clientes están esperando. El producto funciona. El equipo lo sabe hacer."\n\n[PAUSA DRAMÁTICA — 2 segundos de silencio total.]\n\n"Solo necesitamos el combustible para acelerar."\n\n[Con voz firme:]\n"Únase a nosotros en construir el sistema operativo del empresario venezolano."\n\n[Asentir. Bajar el tono. Silencio. Agradecer.]\n\n---\nFIN — 12 diapositivas · 27 minutos totales');
      footer(s, 12, '27 min total', 'CIERRE', C.green);
    }

    // ── generar buffer ───────────────────────────────────────────────────────
    const buffer = await pptx.write({ outputType: 'nodebuffer' }) as Buffer;

    await query(
      `INSERT INTO document_records (tipo_documento, descripcion, generado_por, metadata) VALUES ($1, $2, $3, $4)`,
      ['PPTX_PRESENTACION', 'Pitch Deck 12 slides generado desde página — System Kyron', 'pptxgenjs',
        JSON.stringify({ slides: TOTAL, duracion: '27 min', layout: 'WIDE', version: '4.0', notas: 'incluidas' })]
    ).catch(() => {});

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': 'attachment; filename="SystemKyron-PitchDeck-12slides.pptx"',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[pitch-pptx]', err);
    return NextResponse.json({ error: 'Error generando el PPTX' }, { status: 500 });
  }
}
