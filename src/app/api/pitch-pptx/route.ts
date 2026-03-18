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
};

const W = 13.33;
const H = 7.5;

function bg(slide: pptxgen.Slide, variant: 'dark' | 'navy' | 'close' = 'dark') {
  if (variant === 'close') {
    slide.addShape(pptxgen.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.navy }, line: { color: C.navy } });
    slide.addShape(pptxgen.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.18, fill: { color: C.blue }, line: { color: C.blue } });
    slide.addShape(pptxgen.ShapeType.rect, { x: 0, y: H - 0.18, w: W, h: 0.18, fill: { color: C.green }, line: { color: C.green } });
  } else if (variant === 'navy') {
    slide.addShape(pptxgen.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.navyLight }, line: { color: C.navyLight } });
    slide.addShape(pptxgen.ShapeType.rect, { x: 0, y: 0, w: 0.12, h: H, fill: { color: C.blue }, line: { color: C.blue } });
  } else {
    slide.addShape(pptxgen.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.navy }, line: { color: C.navy } });
    slide.addShape(pptxgen.ShapeType.rect, { x: 0, y: 0, w: 0.12, h: H, fill: { color: C.blue }, line: { color: C.blue } });
  }
}

function footer(slide: pptxgen.Slide, num: number, total: number, seg: string, seccion: string) {
  slide.addShape(pptxgen.ShapeType.rect, { x: 0, y: H - 0.48, w: W, h: 0.48, fill: { color: C.navyCard }, line: { color: C.navyCard } });
  slide.addShape(pptxgen.ShapeType.rect, { x: 0, y: H - 0.49, w: W, h: 0.02, fill: { color: C.grayDark }, line: { color: C.grayDark } });

  slide.addText(`${num} / ${total}  ·  SYSTEM KYRON — PITCH DECK 5 MIN  ·  CONFIDENCIAL`, {
    x: 0.3, y: H - 0.42, w: 8.5, h: 0.34,
    fontSize: 7, color: C.gray, fontFace: 'Arial',
  });

  slide.addShape(pptxgen.ShapeType.rect, { x: 10.0, y: H - 0.44, w: 3.1, h: 0.38, fill: { color: C.blue + '20' }, line: { color: C.blue, pt: 0.75 }, rounding: true });
  slide.addText(`⏱ ${seg}  ·  ${seccion}`, {
    x: 10.0, y: H - 0.44, w: 3.1, h: 0.38,
    fontSize: 7.5, bold: true, color: C.blue, fontFace: 'Arial', align: 'center', valign: 'middle',
  });
}

function header(slide: pptxgen.Slide, tag: string, title: string, color = C.blue) {
  slide.addText(tag, {
    x: 0.4, y: 0.32, w: 4, h: 0.28,
    fontSize: 8, bold: true, color, fontFace: 'Arial', charSpacing: 2,
  });
  slide.addText(title, {
    x: 0.4, y: 0.6, w: 12.5, h: 0.85,
    fontSize: 30, bold: true, color: C.white, fontFace: 'Arial',
  });
  slide.addShape(pptxgen.ShapeType.rect, { x: 0.4, y: 1.5, w: 1.6, h: 0.055, fill: { color }, line: { color } });
}

function card(slide: pptxgen.Slide, x: number, y: number, w: number, h: number, border = C.blue) {
  slide.addShape(pptxgen.ShapeType.rect, { x, y, w, h, fill: { color: C.navyCard }, line: { color: border, pt: 1 }, rounding: true });
}

function kpi(slide: pptxgen.Slide, x: number, y: number, val: string, label: string, color = C.green) {
  card(slide, x, y, 2.85, 1.6, color);
  slide.addText(val, { x: x + 0.1, y: y + 0.16, w: 2.65, h: 0.9, fontSize: 30, bold: true, italic: true, color, fontFace: 'Arial', align: 'center' });
  slide.addText(label, { x: x + 0.1, y: y + 1.1, w: 2.65, h: 0.38, fontSize: 9, color: C.offWhite, fontFace: 'Arial', align: 'center' });
}

const TOTAL = 10;

export async function GET() {
  try {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_WIDE';
    pptx.title   = 'System Kyron — Pitch Deck 5 Minutos';
    pptx.subject = 'Ronda Seed $500K USD';
    pptx.author  = 'System Kyron';
    pptx.company = 'System Kyron';

    // ─── SLIDE 1 · PORTADA · 10 seg ──────────────────────────────────────────
    {
      const s = pptx.addSlide();
      s.addShape(pptxgen.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.navy }, line: { color: C.navy } });
      s.addShape(pptxgen.ShapeType.rect, { x: 0, y: 0, w: 4.6, h: H, fill: { color: C.navyCard }, line: { color: C.navyCard } });
      s.addShape(pptxgen.ShapeType.rect, { x: 4.6, y: 0, w: 0.07, h: H, fill: { color: C.blue }, line: { color: C.blue } });
      s.addShape(pptxgen.ShapeType.rect, { x: 0, y: 0, w: 4.6, h: 0.12, fill: { color: C.blue }, line: { color: C.blue } });
      s.addShape(pptxgen.ShapeType.rect, { x: 0, y: H - 0.12, w: 4.6, h: 0.12, fill: { color: C.green }, line: { color: C.green } });

      s.addShape(pptxgen.ShapeType.hexagon, { x: 0.8, y: 1.3, w: 3.0, h: 3.0, fill: { color: C.blue + '18' }, line: { color: C.blue, pt: 2 } });
      s.addText('SK', { x: 0.8, y: 1.3, w: 3.0, h: 3.0, fontSize: 56, bold: true, color: C.blue, fontFace: 'Arial', align: 'center', valign: 'middle' });
      s.addText('TELECOM · RECYCLING · TOTAL CONTROL', { x: 0.25, y: 4.6, w: 4.1, h: 0.28, fontSize: 7, bold: true, color: C.blue, fontFace: 'Arial', charSpacing: 1.2 });
      s.addText('CONFIDENCIAL — 2026', { x: 0.25, y: 5.0, w: 4.1, h: 0.28, fontSize: 7, color: C.gray, fontFace: 'Arial' });

      s.addText('SYSTEM\nKYRON', { x: 5.0, y: 0.85, w: 8.0, h: 2.1, fontSize: 64, bold: true, color: C.white, fontFace: 'Arial', align: 'left', lineSpacingMultiple: 1.05 });
      s.addText('El Sistema Operativo del\nEmpresario Venezolano', { x: 5.0, y: 3.1, w: 8.0, h: 1.0, fontSize: 21, color: C.accent, fontFace: 'Arial', italic: true });
      s.addShape(pptxgen.ShapeType.rect, { x: 5.0, y: 4.28, w: 1.8, h: 0.055, fill: { color: C.green }, line: { color: C.green } });
      s.addText('Ronda Seed · $500.000 USD', { x: 5.0, y: 4.46, w: 8.0, h: 0.42, fontSize: 13, bold: true, color: C.green, fontFace: 'Arial' });
      s.addText('Sector Privado Venezolano — Q1 2026', { x: 5.0, y: 4.98, w: 8.0, h: 0.38, fontSize: 11, color: C.gray, fontFace: 'Arial' });

      s.addShape(pptxgen.ShapeType.rect, { x: 5.0, y: 5.7, w: 3.6, h: 0.72, fill: { color: C.blue }, line: { color: C.blue }, rounding: true });
      s.addText('⏱  5 MINUTOS DE PITCH', { x: 5.0, y: 5.7, w: 3.6, h: 0.72, fontSize: 13, bold: true, color: C.white, fontFace: 'Arial', align: 'center', valign: 'middle' });

      s.addNotes(`PORTADA — 10 segundos\n\n[Aparecer en escena. Silencio breve. Contacto visual con la audiencia.]\n\n"Buenos días / tardes. Soy [Nombre], fundador de System Kyron."\n\n[Avanzar a la siguiente diapositiva inmediatamente.]`);
      footer(s, 1, TOTAL, '10 seg', 'PORTADA');
    }

    // ─── SLIDE 2 · GANCHO · 30 seg ───────────────────────────────────────────
    {
      const s = pptx.addSlide();
      bg(s, 'navy');
      header(s, '01  ·  GANCHO INICIAL  ·  30 seg', '¿Cuántas horas pierde tu empresa cada semana?', C.gold);

      s.addText('"¿Cuántas horas a la semana pierde tu empresa\nhaciendo a mano lo que una máquina puede hacer\nen segundos?"', {
        x: 0.4, y: 1.7, w: 12.5, h: 1.8,
        fontSize: 22, italic: true, color: C.white, fontFace: 'Arial', align: 'center', valign: 'middle',
        lineSpacingMultiple: 1.5,
      });
      s.addShape(pptxgen.ShapeType.rect, { x: 3.5, y: 3.55, w: 6.3, h: 0.055, fill: { color: C.gold }, line: { color: C.gold } });

      const stats = [
        { val: '78%', txt: 'PYMEs en Excel' },
        { val: '61%', txt: 'Sin control fiscal' },
        { val: '84%', txt: 'Pagos manuales' },
      ];
      stats.forEach((st, i) => {
        const x = 1.1 + i * 3.75;
        card(s, x, 3.75, 3.4, 1.85, C.gold);
        s.addText(st.val, { x, y: 3.9, w: 3.4, h: 0.9, fontSize: 38, bold: true, italic: true, color: C.gold, fontFace: 'Arial', align: 'center' });
        s.addText(st.txt, { x, y: 4.82, w: 3.4, h: 0.55, fontSize: 11, color: C.offWhite, fontFace: 'Arial', align: 'center' });
      });

      s.addNotes(`GANCHO INICIAL — 30 segundos\n\n[Dejar que la pregunta resuene. Mirar al público. 3 segundos de silencio.]\n\n"¿Cuántas horas a la semana pierde tu empresa haciendo a mano lo que una máquina puede hacer en segundos?"\n\n[PAUSA DRAMÁTICA — 3 seg de silencio total.]\n\n"En Venezuela, el 78% de las PYMEs aún lleva su contabilidad en Excel. El 61% desconoce cuánto debe exactamente al SENIAT en tiempo real. Y el 84% verifica pagos móviles manualmente — 15 minutos por operación, cada vez."\n\n"Eso no es un problema de capacidad. Es un problema de herramientas. Hoy les presentamos la solución."\n\n[REVEAL — con convicción:] "System Kyron. El sistema operativo del empresario venezolano del siglo XXI."`);
      footer(s, 2, TOTAL, '30 seg  [0:10–0:40]', 'GANCHO');
    }

    // ─── SLIDE 3 · EL PROBLEMA · 45 seg ─────────────────────────────────────
    {
      const s = pptx.addSlide();
      bg(s);
      header(s, '02  ·  EL PROBLEMA  ·  45 seg', 'El caos operativo del empresario venezolano', C.rose);

      const puntos = [
        { stat: '78%', txt: 'Contabilidad en Excel — sin automatización, sin trazabilidad, sin control fiscal real.' },
        { stat: '61%', txt: 'No saben su deuda con el SENIAT en tiempo real. Multa máxima: 150% del tributo omitido.' },
        { stat: '84%', txt: 'Verifican pagos móviles manualmente: 15+ min por operación. Fraude frecuente.' },
        { stat: '10x', txt: 'Más caro SAP/QuickBooks — y no entienden Venezuela, el BCV ni el SENIAT.' },
        { stat: '0', txt: 'Competidores con pago móvil verificado + SENIAT automático + Legal IA + Telecom integrados.' },
      ];
      puntos.forEach((p, i) => {
        const y = 1.68 + i * 0.98;
        const col = i === 0 ? C.rose : i === 4 ? C.green : C.blue;
        s.addShape(pptxgen.ShapeType.rect, { x: 0.3, y, w: 1.5, h: 0.72, fill: { color: col + '20' }, line: { color: col, pt: 1 }, rounding: true });
        s.addText(p.stat, { x: 0.3, y, w: 1.5, h: 0.72, fontSize: 18, bold: true, italic: true, color: col, fontFace: 'Arial', align: 'center', valign: 'middle' });
        s.addText(p.txt, { x: 2.05, y: y + 0.1, w: 11.0, h: 0.52, fontSize: 11.5, color: i === 0 ? C.white : C.offWhite, fontFace: 'Arial', bold: i === 0 });
      });

      s.addNotes(`EL PROBLEMA — 45 segundos\n\n"El empresario venezolano de hoy enfrenta un entorno único en el mundo. Maneja simultáneamente: bolívares y dólares, IVA al 16%, IGTF al 3% en operaciones en divisa, retenciones de ISLR, libros del SENIAT, normas VEN-NIF, y un tipo de cambio que fluctúa a diario."\n\n"Al mismo tiempo, necesita emitir facturas, cobrar por pago móvil, Zelle, Reserve, Binance. Gestionar nómina, inventario, y cumplir con LOPCYMAT, INPSASEL, municipalidades..."\n\n[ÉNFASIS — pausa antes:] "Todo esto, con equipos pequeños, en tiempo real, sin margen de error."\n\n"El costo de un solo error fiscal en Venezuela puede llegar al 150% del tributo omitido. Las soluciones importadas — SAP, QuickBooks — no fueron diseñadas para este contexto."\n\n[Pausa.] "System Kyron, sí."`);
      footer(s, 3, TOTAL, '45 seg  [0:40–1:25]', 'EL PROBLEMA');
    }

    // ─── SLIDE 4 · LA SOLUCIÓN · 45 seg ─────────────────────────────────────
    {
      const s = pptx.addSlide();
      bg(s, 'navy');
      header(s, '03  ·  LA SOLUCIÓN  ·  45 seg', 'System Kyron — Una sola plataforma. Todo.');

      const mods = [
        { icon: '📊', n: 'Contabilidad VEN-NIF',    d: 'Libros SENIAT automáticos\nDeclaraciones IVA/ISLR/IGTF' },
        { icon: '📱', n: 'Pago Móvil Verificado',   d: 'Confirmación en 3 segundos\n6 bancos integrados · 0% fraude' },
        { icon: '⚖️', n: 'Legal IA con Gemini',     d: 'Contratos · Actas · Poderes\nMarco jurídico venezolano' },
        { icon: '♻️', n: 'Ameru Sostenibilidad',    d: 'Clasificación residuos IA\nMercado de Eco-Créditos' },
        { icon: '📡', n: 'Telecom 5G Corporativo',  d: 'Internet ilimitado · 5 líneas\nWhatsApp Business IA 24/7' },
        { icon: '👥', n: 'RRHH & Nómina LOTTT',    d: 'Nómina automatizada\nVacaciones · Utilidades · IVSS' },
      ];
      mods.forEach((m, i) => {
        const col = i % 3, row = Math.floor(i / 3);
        const x = 0.3 + col * 4.32, y = 1.68 + row * 2.45;
        const border = [C.blue, C.green, C.accent, C.gold, C.blue, C.green][i];
        card(s, x, y, 4.08, 2.2, border);
        s.addShape(pptxgen.ShapeType.rect, { x, y, w: 4.08, h: 0.08, fill: { color: border }, line: { color: border } });
        s.addText(`${m.icon}  ${m.n}`, { x: x + 0.18, y: y + 0.22, w: 3.7, h: 0.52, fontSize: 11.5, bold: true, color: C.white, fontFace: 'Arial' });
        s.addText(m.d, { x: x + 0.18, y: y + 0.82, w: 3.7, h: 0.95, fontSize: 9.5, color: C.gray, fontFace: 'Arial', lineSpacingMultiple: 1.35 });
      });

      s.addNotes(`LA SOLUCIÓN — 45 segundos\n\n"System Kyron es una plataforma de gestión empresarial integral, diseñada específicamente para el mercado venezolano. No es solo software contable. Es el sistema nervioso de tu empresa."\n\n[MOSTRAR PANTALLA — señalar módulos]\n\n"Seis módulos integrados en una sola plataforma:"\n\n"PRIMERO: Contabilidad VEN-NIF con libros SENIAT automáticos, ajuste por inflación RIPF y declaraciones precalculadas de IVA, ISLR e IGTF."\n\n"SEGUNDO: Verificación automática de pago móvil en tiempo real. El cliente paga — en 3 segundos el sistema confirma, registra y acredita. Sin llamadas. Sin esperas."\n\n"TERCERO: Legal IA con Gemini — contratos, actas y poderes redactados con inteligencia artificial basada en el marco jurídico venezolano."\n\n"Todo esto, más RRHH, Telecom 5G y Sostenibilidad — en un solo sistema."`);
      footer(s, 4, TOTAL, '45 seg  [1:25–2:10]', 'LA SOLUCIÓN');
    }

    // ─── SLIDE 5 · INNOVACIONES CLAVE · 30 seg ───────────────────────────────
    {
      const s = pptx.addSlide();
      bg(s);
      header(s, '04  ·  INNOVACIONES EXCLUSIVAS  ·  30 seg', 'Lo que nadie más tiene en Venezuela ni en LATAM', C.green);

      const invs = [
        { num: '01', col: C.green,  t: 'Pago móvil verificado en tiempo real', d: 'Cliente paga → 3 seg → confirmado + registrado + acreditado. Integra Banesco, BdV, Mercantil, BNC, BOD, BBVA. 0% fraude, 100% trazabilidad.' },
        { num: '02', col: C.blue,   t: 'OCR inteligente con Gemini IA',        d: 'Foto de factura → RIF, montos Bs/USD, retenciones y proveedor extraídos automáticamente. Sin digitación manual.' },
        { num: '03', col: C.accent, t: 'Cumplimiento SENIAT 100% automático',  d: 'Monitoreo de Gaceta Oficial en tiempo real. Actualizaciones automáticas de alícuotas y normativas. Cero riesgo de sanción involuntaria.' },
        { num: '04', col: C.gold,   t: 'Generador legal venezolano con IA',    d: 'Contratos, actas y poderes redactados por IA con base en el Código Civil, Código de Comercio y normativa SENIAT vigente.' },
      ];
      invs.forEach((inv, i) => {
        const y = 1.72 + i * 1.3;
        s.addShape(pptxgen.ShapeType.rect, { x: 0.3, y, w: 0.9, h: 0.88, fill: { color: inv.col + '22' }, line: { color: inv.col, pt: 1.5 }, rounding: true });
        s.addText(inv.num, { x: 0.3, y, w: 0.9, h: 0.88, fontSize: 20, bold: true, italic: true, color: inv.col, fontFace: 'Arial', align: 'center', valign: 'middle' });
        s.addText(inv.t, { x: 1.38, y: y + 0.04, w: 11.65, h: 0.4, fontSize: 12, bold: true, color: C.white, fontFace: 'Arial' });
        s.addText(inv.d, { x: 1.38, y: y + 0.48, w: 11.65, h: 0.55, fontSize: 10, color: C.gray, fontFace: 'Arial' });
        if (i < invs.length - 1)
          s.addShape(pptxgen.ShapeType.rect, { x: 0.3, y: y + 1.15, w: 12.75, h: 0.01, fill: { color: C.grayDark }, line: { color: C.grayDark } });
      });

      s.addNotes(`INNOVACIONES EXCLUSIVAS — 30 segundos\n\n[MOSTRAR PANTALLA — con energía y velocidad]\n\n"¿Por qué nadie puede copiarnos rápido? Cuatro innovaciones que nos hacen únicos en el mercado:"\n\n"UNO — el cliente paga por pago móvil y en tres segundos el sistema confirma, registra y acredita automáticamente. Nadie más en Venezuela tiene esto integrado a contabilidad."\n\n"DOS — Inteligencia artificial que lee facturas por foto y extrae todos los datos fiscales. Sin digitación manual."\n\n"TRES — Cumplimiento SENIAT 100% automático. Si cambia la Gaceta Oficial hoy, mañana el sistema ya está actualizado."\n\n"CUATRO — Generador de documentos legales venezolanos con IA. Contratos listos en minutos, no en días."`);
      footer(s, 5, TOTAL, '30 seg  [2:10–2:40]', 'INNOVACIONES');
    }

    // ─── SLIDE 6 · TRACCIÓN · 40 seg ─────────────────────────────────────────
    {
      const s = pptx.addSlide();
      bg(s, 'navy');
      header(s, '05  ·  TRACCIÓN & VALIDACIÓN  ·  40 seg', 'Números reales. Clientes reales. Ya.');

      kpi(s, 0.3,  1.72, '96.4%', 'Retención mensual', C.green);
      kpi(s, 3.35, 1.72, '72 NPS', 'Satisfacción clientes', C.blue);
      kpi(s, 6.4,  1.72, '240+', 'Lista de espera', C.accent);
      kpi(s, 9.45, 1.72, '11 días', 'Demo → Contrato', C.gold);

      card(s, 0.3, 3.55, 12.75, 2.7, C.grayDark);
      s.addText('ALIANZAS ESTRATÉGICAS FORMALIZADAS', { x: 0.6, y: 3.72, w: 5, h: 0.35, fontSize: 8.5, bold: true, color: C.blue, fontFace: 'Arial', charSpacing: 1.5 });
      [
        { n: 'Chévere Salud', d: 'Cobertura médica corporativa integrada en la plataforma' },
        { n: 'Mercantil Seguros', d: 'Protección de activos con registro contable automático' },
        { n: 'Mapfre Venezuela', d: 'Seguros vehiculares con integración patrimonial' },
        { n: 'Banesco / BNC', d: 'API bancaria certificada — negociación avanzada' },
      ].forEach((a, i) => {
        const x = 0.6 + (i % 2) * 6.35, y = 4.22 + Math.floor(i / 2) * 0.9;
        s.addShape(pptxgen.ShapeType.rect, { x, y: y + 0.1, w: 0.18, h: 0.18, fill: { color: C.green }, line: { color: C.green }, rounding: true });
        s.addText(a.n, { x: x + 0.35, y, w: 3, h: 0.4, fontSize: 11, bold: true, color: C.white, fontFace: 'Arial' });
        s.addText(a.d, { x: x + 0.35, y: y + 0.38, w: 6.0, h: 0.32, fontSize: 9, color: C.gray, fontFace: 'Arial' });
      });

      s.addNotes(`TRACCIÓN & VALIDACIÓN — 40 segundos\n\n"System Kyron no es una idea. Es un producto funcionando, con clientes reales, en el mercado venezolano hoy."\n\n[MOSTRAR PANTALLA — señalar métricas con convicción]\n\n"Retención mensual de clientes: 96.4%. Net Promoter Score: 72 puntos. Más de 240 empresas esperando activar su cuenta. Y el ciclo promedio desde la demo hasta el contrato firmado: 11 días."\n\n"¿Y alianzas? Acuerdos marco formalizados con Chévere Salud, Mercantil Seguros y Mapfre Venezuela. Y en negociación avanzada con Banesco y BNC para integración bancaria certificada."\n\n[PAUSA] "El mercado nos está validando. Cada semana."`);
      footer(s, 6, TOTAL, '40 seg  [2:40–3:20]', 'TRACCIÓN');
    }

    // ─── SLIDE 7 · MERCADO & MODELO · 35 seg ─────────────────────────────────
    {
      const s = pptx.addSlide();
      bg(s);
      header(s, '06  ·  MERCADO & MODELO DE NEGOCIO  ·  35 seg', 'El mercado existe hoy. Sin competidor directo.');

      const datos = [
        { label: 'TAM', sub: 'Mercado Total', val: '120.000 empresas registradas en Venezuela', col: C.gray, bw: 6.5 },
        { label: 'SAM', sub: 'Mercado Objetivo', val: '94.000 PYMEs formales (5–250 empleados)', col: C.blue, bw: 9.0 },
        { label: 'SOM Año 1', sub: 'Alcanzable', val: '2.400 clientes = $4.32M ARR potencial', col: C.green, bw: 11.5 },
      ];
      datos.forEach((d, i) => {
        const y = 1.68 + i * 1.3;
        s.addShape(pptxgen.ShapeType.rect, { x: 0.3, y: y + 0.25, w: d.bw, h: 0.55, fill: { color: d.col + '28' }, line: { color: d.col, pt: 1 } });
        s.addText(d.label, { x: 0.4, y, w: 2.5, h: 0.52, fontSize: 16, bold: true, italic: true, color: d.col, fontFace: 'Arial' });
        s.addText(d.sub.toUpperCase(), { x: 2.9, y: y + 0.1, w: 3.5, h: 0.32, fontSize: 7.5, bold: true, color: d.col, fontFace: 'Arial', charSpacing: 1 });
        s.addText(d.val, { x: 0.5, y: y + 0.88, w: 12.5, h: 0.35, fontSize: 12, bold: true, color: C.white, fontFace: 'Arial' });
      });

      s.addShape(pptxgen.ShapeType.rect, { x: 0.3, y: 5.65, w: 12.75, h: 0.9, fill: { color: C.navyCard }, line: { color: C.blue, pt: 1 }, rounding: true });
      s.addText('MODELO SaaS  ·  $99 USD/mes PROFESIONAL  ·  $199 USD/mes CORPORATIVO  ·  $399 USD/mes ENTERPRISE', {
        x: 0.3, y: 5.65, w: 12.75, h: 0.9,
        fontSize: 12, bold: true, color: C.accent, fontFace: 'Arial', align: 'center', valign: 'middle',
      });

      s.addNotes(`MERCADO & MODELO DE NEGOCIO — 35 segundos\n\n"Venezuela tiene más de 120.000 empresas formalmente registradas en el SENIAT. De ellas, 94.000 son PYMEs con entre 5 y 250 empleados — ese es nuestro mercado primario."\n\n"En el primer año, con solo el 2.5% del SAM, llegamos a 2.400 clientes activos — lo que genera $4.32 millones de ARR."\n\n"Nuestro modelo es SaaS de suscripción mensual: Plan Profesional a $99, Corporativo a $199, Enterprise a $399 — todos en dólares, todos recurrentes."\n\n"Costo de adquisición por cliente: menos de $80 dólares. Valor de vida útil del cliente en 3 años: $3.600 o más. La economía es irresistible."`);
      footer(s, 7, TOTAL, '35 seg  [3:20–3:55]', 'MERCADO & MODELO');
    }

    // ─── SLIDE 8 · EL EQUIPO · 25 seg ────────────────────────────────────────
    {
      const s = pptx.addSlide();
      bg(s, 'navy');
      header(s, '07  ·  EL EQUIPO  ·  25 seg', 'Experiencia venezolana real. Sin curva de aprendizaje.', C.accent);

      const mbs = [
        { rol: 'CEO · FUNDADOR', desc: 'Contador Público colegiado · 15 años experiencia fiscal VEN\nEx-gerente tributario Big Four · Especialista VEN-NIF, SENIAT, LOTTT', col: C.blue },
        { rol: 'CTO', desc: 'Ingeniero en Computación · Arquitecturas SaaS y pagos digitales\nEx-desarrollador senior en banco venezolano de primer nivel', col: C.green },
        { rol: 'CCO · ALIANZAS', desc: '800+ contactos empresariales en Venezuela\nResponsable de alianzas Chévere Salud, Mercantil, Mapfre', col: C.accent },
        { rol: 'ADVISORY BOARD', desc: 'Abogados mercantiles · CPC certificados\nEspecialistas fintech LATAM · Ex-reguladores SUDEBAN', col: C.gold },
      ];
      mbs.forEach((m, i) => {
        const x = 0.3 + (i % 2) * 6.5, y = 1.7 + Math.floor(i / 2) * 2.65;
        card(s, x, y, 6.2, 2.42, m.col);
        s.addShape(pptxgen.ShapeType.rect, { x, y, w: 6.2, h: 0.1, fill: { color: m.col }, line: { color: m.col } });
        s.addShape(pptxgen.ShapeType.ellipse, { x: x + 0.22, y: y + 0.28, w: 1.0, h: 1.0, fill: { color: m.col + '28' }, line: { color: m.col, pt: 1.5 } });
        s.addText('👤', { x: x + 0.22, y: y + 0.28, w: 1.0, h: 1.0, fontSize: 24, align: 'center', valign: 'middle' });
        s.addText(m.rol, { x: x + 1.4, y: y + 0.25, w: 4.65, h: 0.35, fontSize: 8, bold: true, color: m.col, fontFace: 'Arial', charSpacing: 1 });
        s.addText(m.desc, { x: x + 0.22, y: y + 1.42, w: 5.8, h: 0.9, fontSize: 9.5, color: C.gray, fontFace: 'Arial', lineSpacingMultiple: 1.35 });
      });

      s.addNotes(`EL EQUIPO — 25 segundos\n\n"Detrás de System Kyron hay un equipo fundador con más de 20 años de experiencia combinada en contabilidad venezolana, tecnología y telecomunicaciones."\n\n"Nuestro CEO es Contador Público con 15 años en fiscalidad venezolana — ex-gerente tributario en firma Big Four. Conoce el SENIAT desde adentro."\n\n"Nuestro CTO tiene experiencia probada en arquitecturas SaaS y pagos digitales en el ecosistema bancario venezolano."\n\n"Y nuestro Director de Alianzas tiene 800 contactos empresariales activos — y ya formalizó tres acuerdos estratégicos."\n\n"El equipo correcto, en el lugar correcto, en el momento correcto."`);
      footer(s, 8, TOTAL, '25 seg  [3:55–4:20]', 'EL EQUIPO');
    }

    // ─── SLIDE 9 · RONDA SEED · 25 seg ───────────────────────────────────────
    {
      const s = pptx.addSlide();
      bg(s);
      header(s, '08  ·  RONDA SEED — $500.000 USD  ·  25 seg', 'Aceleramos lo que ya está funcionando.');

      const usos = [
        { pct: '35%', dest: 'Tecnología & Producto',      det: 'API bancaria certificada · Módulos avanzados Telecom · Infraestructura cloud 10K empresas',       col: C.blue,   bw: 8.5 },
        { pct: '30%', dest: 'Equipo Comercial B2B',       det: '8 ejecutivos en Caracas, Maracaibo, Valencia, Barquisimeto · Meta: 500 empresas en 12 meses',       col: C.green,  bw: 7.3 },
        { pct: '20%', dest: 'Marketing & Posicionamiento', det: 'Fedecámaras · Conindustria · Consecomercio · Cavedi · Presencia digital · Eventos empresariales',   col: C.accent, bw: 4.9 },
        { pct: '15%', dest: 'Capital de Trabajo',          det: '6 meses runway operativo · Estructura administrativa · Licencias regulatorias',                      col: C.gold,   bw: 3.65 },
      ];
      usos.forEach((u, i) => {
        const y = 1.68 + i * 1.34;
        s.addShape(pptxgen.ShapeType.rect, { x: 0.3, y, w: 1.5, h: 1.1, fill: { color: u.col + '1E' }, line: { color: u.col, pt: 1.5 }, rounding: true });
        s.addText(u.pct, { x: 0.3, y, w: 1.5, h: 1.1, fontSize: 24, bold: true, italic: true, color: u.col, fontFace: 'Arial', align: 'center', valign: 'middle' });
        s.addText(u.dest, { x: 2.0, y: y + 0.06, w: 11.0, h: 0.42, fontSize: 12, bold: true, color: C.white, fontFace: 'Arial' });
        s.addShape(pptxgen.ShapeType.rect, { x: 2.0, y: y + 0.55, w: u.bw, h: 0.15, fill: { color: u.col }, line: { color: u.col }, rounding: true });
        s.addShape(pptxgen.ShapeType.rect, { x: 2.0 + u.bw, y: y + 0.55, w: 11.0 - u.bw, h: 0.15, fill: { color: u.col + '25' }, line: { color: u.col + '25' }, rounding: true });
        s.addText(u.det, { x: 2.0, y: y + 0.78, w: 11.0, h: 0.36, fontSize: 9.5, color: C.gray, fontFace: 'Arial' });
      });

      s.addNotes(`RONDA SEED — 25 segundos\n\n"Estamos buscando nuestra primera ronda seed de $500.000 USD para acelerar lo que ya está funcionando."\n\n[MOSTRAR PANTALLA]\n\n"El 35% va a tecnología y producto — finalizar la API bancaria certificada e infraestructura para escalar a 10.000 empresas."\n\n"El 30% a equipo comercial — 8 ejecutivos B2B en las 4 principales ciudades del país. Meta: 500 empresas en los primeros 12 meses."\n\n"El 20% a marketing y posicionamiento en cámaras de comercio."\n\n"Y el 15% a capital de trabajo — 6 meses de runway y licencias regulatorias."\n\n"Con esta inversión: 18 meses de runway para dominar el mercado venezolano."`);
      footer(s, 9, TOTAL, '25 seg  [4:20–4:45]', 'RONDA $500K');
    }

    // ─── SLIDE 10 · CIERRE · 15 seg ──────────────────────────────────────────
    {
      const s = pptx.addSlide();
      bg(s, 'close');
      s.addShape(pptxgen.ShapeType.hexagon, { x: 4.5, y: 0.3, w: 4.3, h: 4.3, fill: { color: C.blue + '12' }, line: { color: C.blue + '45', pt: 2 } });
      s.addText('SK', { x: 4.5, y: 0.3, w: 4.3, h: 4.3, fontSize: 80, bold: true, color: C.blue + '38', fontFace: 'Arial', align: 'center', valign: 'middle' });

      s.addText('ÚNASE A NOSOTROS', { x: 0.5, y: 1.05, w: W - 1, h: 1.1, fontSize: 46, bold: true, color: C.white, fontFace: 'Arial', align: 'center' });
      s.addText('El mercado existe. Los clientes esperan.\nEl producto funciona. Solo necesitamos el combustible.', {
        x: 1.5, y: 2.3, w: W - 3, h: 1.0, fontSize: 16, italic: true, color: C.offWhite, fontFace: 'Arial', align: 'center', lineSpacingMultiple: 1.4,
      });

      s.addShape(pptxgen.ShapeType.rect, { x: 3.4, y: 3.7, w: 6.53, h: 0.82, fill: { color: C.blue }, line: { color: C.blue }, rounding: true });
      s.addText('CONVERSEMOS HOY → SEED $500K USD', { x: 3.4, y: 3.7, w: 6.53, h: 0.82, fontSize: 18, bold: true, color: C.white, fontFace: 'Arial', align: 'center', valign: 'middle' });

      s.addText('⏱  DURACIÓN TOTAL: 5 MINUTOS', { x: 3.65, y: 4.72, w: 6.0, h: 0.38, fontSize: 10, bold: true, color: C.green, fontFace: 'Arial', align: 'center' });

      const contactos = [
        { icon: '🌐', t: 'system-kyron.com' },
        { icon: '📧', t: 'inversores@system-kyron.com' },
        { icon: '📱', t: '@SystemKyron' },
      ];
      contactos.forEach((c, i) => {
        s.addText(`${c.icon}  ${c.t}`, { x: 1.0 + i * 3.85, y: 5.25, w: 3.6, h: 0.42, fontSize: 11, color: C.gray, fontFace: 'Arial', align: 'center' });
      });
      s.addText('TELECOM · RECYCLING · TOTAL CONTROL', { x: 0.5, y: 5.82, w: W - 1, h: 0.28, fontSize: 8.5, bold: true, color: C.blue, fontFace: 'Arial', align: 'center', charSpacing: 2 });

      s.addNotes(`CIERRE — 15 segundos\n\n[Con calma. Con convicción. Con la vista en el auditorio.]\n\n"El mercado existe. Los clientes están esperando. El producto funciona. El equipo sabe cómo ejecutar."\n\n[PAUSA DRAMÁTICA — 2 segundos de silencio total.]\n\n"Solo necesitamos el combustible para acelerar."\n\n[Voz firme, mirando directamente al inversor:] "Únase a nosotros en construir el sistema operativo del empresario venezolano. Conversemos hoy."\n\n[Asentir. Bajar el tono. Silencio.]\n\n---\nFIN DEL PITCH — DURACIÓN TOTAL: 5 MINUTOS`);
      footer(s, 10, TOTAL, '15 seg  [4:45–5:00]', 'CIERRE');
    }

    const buffer = await pptx.write({ outputType: 'nodebuffer' }) as Buffer;

    await query(
      `INSERT INTO document_records (tipo_documento, descripcion, generado_por, metadata) VALUES ($1, $2, $3, $4)`,
      ['PPTX_PRESENTACION', 'Pitch Deck 5 minutos con guión del presentador — System Kyron 10 slides', 'pptxgenjs',
        JSON.stringify({ slides: TOTAL, duracion: '5 minutos', layout: 'WIDE', version: '3.0', notas: 'incluidas' })]
    ).catch(() => {});

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': 'attachment; filename="SystemKyron-PitchDeck-5min.pptx"',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[pitch-pptx]', err);
    return NextResponse.json({ error: 'Error generando el PPTX' }, { status: 500 });
  }
}
