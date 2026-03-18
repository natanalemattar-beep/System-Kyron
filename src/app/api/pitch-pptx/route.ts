import { NextResponse } from 'next/server';
import pptxgen from 'pptxgenjs';
import { query } from '@/lib/db';

const C = {
  navy:      '060D1F',
  navyLight: '0A1530',
  navyCard:  '0D1B38',
  blue:      '0EA5E9',
  blueDark:  '0369A1',
  green:     '22C55E',
  greenDark: '16A34A',
  white:     'FFFFFF',
  offWhite:  'E2E8F0',
  gray:      '94A3B8',
  grayDark:  '475569',
  accent:    '38BDF8',
  gold:      'F59E0B',
};

const W = 13.33;
const H = 7.5;

function addBackground(slide: pptxgen.Slide, variant: 'dark' | 'navy' | 'accent' = 'dark') {
  if (variant === 'accent') {
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

function addFooter(slide: pptxgen.Slide, pageNum: number, total: number) {
  slide.addShape(pptxgen.ShapeType.rect, { x: 0, y: H - 0.42, w: W, h: 0.42, fill: { color: C.navyCard }, line: { color: C.navyCard } });
  slide.addShape(pptxgen.ShapeType.rect, { x: 0, y: H - 0.43, w: W, h: 0.02, fill: { color: C.grayDark }, line: { color: C.grayDark } });
  slide.addText('SYSTEM KYRON  ·  RONDA SEED $500K  ·  CONFIDENCIAL', {
    x: 0.3, y: H - 0.38, w: 9, h: 0.3,
    fontSize: 7, color: C.gray, fontFace: 'Arial', bold: false,
  });
  slide.addText(`${pageNum} / ${total}`, {
    x: W - 1.5, y: H - 0.38, w: 1.2, h: 0.3,
    fontSize: 7, color: C.gray, fontFace: 'Arial', align: 'right',
  });
}

function addSectionHeader(slide: pptxgen.Slide, label: string, title: string, color = C.blue) {
  slide.addText(label, {
    x: 0.4, y: 0.35, w: 3, h: 0.28,
    fontSize: 8, bold: true, color, fontFace: 'Arial', charSpacing: 2,
  });
  slide.addText(title, {
    x: 0.4, y: 0.65, w: 12.5, h: 0.75,
    fontSize: 30, bold: true, color: C.white, fontFace: 'Arial',
  });
  slide.addShape(pptxgen.ShapeType.rect, { x: 0.4, y: 1.45, w: 1.6, h: 0.05, fill: { color }, line: { color } });
}

function addCard(slide: pptxgen.Slide, x: number, y: number, w: number, h: number, borderColor = C.blue) {
  slide.addShape(pptxgen.ShapeType.rect, { x, y, w, h, fill: { color: C.navyCard }, line: { color: borderColor, pt: 1 }, rounding: true });
}

function addKPI(slide: pptxgen.Slide, x: number, y: number, val: string, label: string, color = C.green) {
  addCard(slide, x, y, 2.9, 1.55, color);
  slide.addText(val, {
    x: x + 0.1, y: y + 0.18, w: 2.7, h: 0.85,
    fontSize: 32, bold: true, color, fontFace: 'Arial', align: 'center', italic: true,
  });
  slide.addText(label, {
    x: x + 0.1, y: y + 1.05, w: 2.7, h: 0.38,
    fontSize: 9.5, color: C.offWhite, fontFace: 'Arial', align: 'center',
  });
}

export async function GET() {
  try {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_WIDE';
    pptx.title = 'System Kyron — Pitch Deck Seed';
    pptx.subject = 'Ronda Seed $500K USD — Sistema Operativo del Empresario Venezolano';
    pptx.author = 'System Kyron';
    pptx.company = 'System Kyron';

    const TOTAL = 13;

    // ─── SLIDE 1 — PORTADA ───────────────────────────────────────────────────
    {
      const s = pptx.addSlide();
      s.addShape(pptxgen.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.navy }, line: { color: C.navy } });
      s.addShape(pptxgen.ShapeType.rect, { x: 0, y: 0, w: 4.6, h: H, fill: { color: C.navyCard }, line: { color: C.navyCard } });
      s.addShape(pptxgen.ShapeType.rect, { x: 4.6, y: 0, w: 0.06, h: H, fill: { color: C.blue }, line: { color: C.blue } });
      s.addShape(pptxgen.ShapeType.rect, { x: 0, y: 0, w: 4.6, h: 0.12, fill: { color: C.blue }, line: { color: C.blue } });
      s.addShape(pptxgen.ShapeType.rect, { x: 0, y: H - 0.12, w: 4.6, h: 0.12, fill: { color: C.green }, line: { color: C.green } });

      s.addShape(pptxgen.ShapeType.hexagon, {
        x: 0.85, y: 1.5, w: 2.8, h: 2.8,
        fill: { color: C.blue + '22' }, line: { color: C.blue, pt: 2 },
      });
      s.addText('SK', {
        x: 0.85, y: 1.5, w: 2.8, h: 2.8,
        fontSize: 52, bold: true, color: C.blue, fontFace: 'Arial', align: 'center', valign: 'middle',
      });

      s.addText('TELECOM · RECYCLING · TOTAL CONTROL', {
        x: 0.3, y: 4.6, w: 4.0, h: 0.3,
        fontSize: 7.5, color: C.blue, fontFace: 'Arial', bold: true, charSpacing: 1.5,
      });
      s.addText('CONFIDENCIAL — 2026', {
        x: 0.3, y: 5.0, w: 4.0, h: 0.3,
        fontSize: 7, color: C.gray, fontFace: 'Arial',
      });

      s.addText('SYSTEM\nKYRON', {
        x: 5.0, y: 1.0, w: 7.8, h: 2.0,
        fontSize: 64, bold: true, color: C.white, fontFace: 'Arial', align: 'left',
        lineSpacingMultiple: 1.1,
      });
      s.addText('El Sistema Operativo del\nEmpresario Venezolano', {
        x: 5.0, y: 3.15, w: 7.8, h: 1.1,
        fontSize: 22, color: C.accent, fontFace: 'Arial', italic: true, align: 'left',
      });
      s.addShape(pptxgen.ShapeType.rect, { x: 5.0, y: 4.45, w: 1.8, h: 0.05, fill: { color: C.green }, line: { color: C.green } });
      s.addText('Ronda Seed · $500.000 USD', {
        x: 5.0, y: 4.6, w: 7.8, h: 0.4,
        fontSize: 13, color: C.green, fontFace: 'Arial', bold: true,
      });
      s.addText('Sector Privado Venezolano — Q1 2026', {
        x: 5.0, y: 5.1, w: 7.8, h: 0.35,
        fontSize: 11, color: C.gray, fontFace: 'Arial',
      });
    }

    // ─── SLIDE 2 — RESUMEN EJECUTIVO ────────────────────────────────────────
    {
      const s = pptx.addSlide();
      addBackground(s);
      addSectionHeader(s, 'RESUMEN EJECUTIVO', 'Lo que necesitas saber en 60 segundos');
      addFooter(s, 2, TOTAL);

      const items = [
        { icon: '🎯', t: 'El Problema', d: '120.000 empresas venezolanas operan sin sistema integrado. Excel + contadores manuales + software importado que no entiende Venezuela.' },
        { icon: '⚡', t: 'La Solución', d: 'System Kyron: ERP todo-en-uno con Contabilidad VEN-NIF, SENIAT automático, pago móvil verificado en 3 seg, Telecom 5G, Legal IA y Sostenibilidad.' },
        { icon: '📈', t: 'Tracción', d: '96.4% retención mensual · NPS 72 · 240+ empresas en lista de espera · 11 días de ciclo de venta demo→contrato.' },
        { icon: '💰', t: 'El Negocio', d: 'SaaS $99–$399 USD/mes · TAM 120K empresas · SOM Año 1: 2.400 clientes = $4.3M ARR · CAC < $80 · LTV $3.600+' },
        { icon: '🚀', t: 'La Ronda', d: 'Seed $500K USD: 35% Producto · 30% Ventas B2B · 20% Marketing · 15% Capital de Trabajo. Runway: 18 meses.' },
      ];

      items.forEach((item, i) => {
        const y = 1.65 + i * 1.0;
        s.addText(item.icon, { x: 0.25, y: y + 0.08, w: 0.55, h: 0.55, fontSize: 18, align: 'center' });
        s.addText(item.t, { x: 0.9, y: y, w: 2.5, h: 0.4, fontSize: 11, bold: true, color: C.blue, fontFace: 'Arial' });
        s.addText(item.d, { x: 0.9, y: y + 0.38, w: 11.8, h: 0.52, fontSize: 10, color: C.offWhite, fontFace: 'Arial' });
        if (i < items.length - 1)
          s.addShape(pptxgen.ShapeType.rect, { x: 0.25, y: y + 0.92, w: 12.6, h: 0.01, fill: { color: C.grayDark }, line: { color: C.grayDark } });
      });
    }

    // ─── SLIDE 3 — EL PROBLEMA ───────────────────────────────────────────────
    {
      const s = pptx.addSlide();
      addBackground(s, 'navy');
      addSectionHeader(s, '02  ·  EL PROBLEMA', 'El caos operativo del empresario venezolano', C.gold);
      addFooter(s, 3, TOTAL);

      const puntos = [
        { stat: '78%', txt: 'de las PYMEs venezolanas llevan contabilidad en Excel — sin automatización, sin control real.' },
        { stat: '61%', txt: 'desconoce su deuda fiscal con el SENIAT en tiempo real. Multas de hasta 150% del tributo omitido.' },
        { stat: '84%', txt: 'verifica pagos móviles manualmente: 15+ minutos por operación, fraude frecuente, sin trazabilidad.' },
        { stat: '10x', txt: 'más caro operar con ERPs importados (SAP, QuickBooks) que no entienden Venezuela ni el SENIAT.' },
        { stat: '0', txt: 'soluciones en el mercado integran Contabilidad + Telecom + SENIAT + Legal IA + Pago Móvil verificado.' },
      ];

      puntos.forEach((p, i) => {
        const y = 1.65 + i * 1.02;
        const col = i === 0 ? C.gold : C.blue;
        s.addShape(pptxgen.ShapeType.rect, { x: 0.25, y, w: 1.5, h: 0.75, fill: { color: col + '22' }, line: { color: col, pt: 1 }, rounding: true });
        s.addText(p.stat, { x: 0.25, y, w: 1.5, h: 0.75, fontSize: 18, bold: true, color: col, fontFace: 'Arial', align: 'center', valign: 'middle', italic: true });
        s.addText(p.txt, { x: 2.0, y: y + 0.12, w: 11.0, h: 0.55, fontSize: 11.5, color: i === 0 ? C.white : C.offWhite, fontFace: 'Arial', bold: i === 0 });
      });
    }

    // ─── SLIDE 4 — LA SOLUCIÓN ───────────────────────────────────────────────
    {
      const s = pptx.addSlide();
      addBackground(s);
      addSectionHeader(s, '03  ·  LA SOLUCIÓN', 'Una sola plataforma. Todo lo que tu empresa necesita.');
      addFooter(s, 4, TOTAL);

      const mods = [
        { icon: '📊', n: 'Contabilidad VEN-NIF', d: 'Libros SENIAT automáticos\nAjuste RIPF · Declaraciones IA' },
        { icon: '📱', n: 'Pago Móvil Verificado', d: 'Confirmación en 3 segundos\nCero fraude · Trazabilidad total' },
        { icon: '⚖️', n: 'Legal IA con Gemini', d: 'Contratos · Actas · Poderes\nBasado en marco jurídico VE' },
        { icon: '♻️', n: 'Ameru Sostenibilidad', d: 'Clasificación residuos IA\nMercado de Eco-Créditos' },
        { icon: '📡', n: 'Telecom 5G Corporativo', d: 'Líneas + Internet ilimitado\nWhatsApp Business IA 24/7' },
        { icon: '👥', n: 'RRHH & Nómina LOTTT', d: 'Nómina automatizada\nVacaciones · Utilidades · IVSS' },
      ];

      mods.forEach((m, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 0.25 + col * 4.35;
        const y = 1.68 + row * 2.45;
        const border = i % 2 === 0 ? C.blue : C.green;
        addCard(s, x, y, 4.1, 2.2, border);
        s.addShape(pptxgen.ShapeType.rect, { x, y, w: 4.1, h: 0.08, fill: { color: border }, line: { color: border } });
        s.addText(m.icon + '  ' + m.n, { x: x + 0.18, y: y + 0.22, w: 3.75, h: 0.55, fontSize: 12, bold: true, color: C.white, fontFace: 'Arial' });
        s.addText(m.d, { x: x + 0.18, y: y + 0.82, w: 3.75, h: 0.95, fontSize: 10, color: C.gray, fontFace: 'Arial', lineSpacingMultiple: 1.3 });
      });
    }

    // ─── SLIDE 5 — INNOVACIONES EXCLUSIVAS ──────────────────────────────────
    {
      const s = pptx.addSlide();
      addBackground(s, 'navy');
      addSectionHeader(s, '04  ·  INNOVACIONES', 'Lo que nadie más tiene en Venezuela', C.green);
      addFooter(s, 5, TOTAL);

      const invs = [
        { num: '01', color: C.green, t: 'Verificación de pago móvil en tiempo real', d: 'El cliente paga → 3 segundos → confirmado, registrado, acreditado. Integración bancaria Banesco, BdV, Mercantil, BNC, BOD, BBVA. 0% fraude, 100% trazabilidad.' },
        { num: '02', color: C.blue, t: 'OCR inteligente con Gemini IA', d: 'Foto de factura → datos extraídos automáticamente en segundos. Sin digitación manual. Reconoce RIF, montos Bs/USD, retenciones y proveedor.' },
        { num: '03', color: C.accent, t: 'Generador legal venezolano con IA', d: 'Contratos, actas, poderes y finiquitos redactados por IA basada en el Código Civil, Código de Comercio y normativa SENIAT actualizada.' },
        { num: '04', color: C.gold, t: 'Cumplimiento SENIAT 100% automatizado', d: 'Monitoreo de Gaceta Oficial en tiempo real. Actualizaciones automáticas ante cambios en alícuotas, exenciones y normativas. Cero riesgo de sanción involuntaria.' },
      ];

      invs.forEach((inv, i) => {
        const y = 1.68 + i * 1.32;
        s.addShape(pptxgen.ShapeType.rect, { x: 0.25, y, w: 0.9, h: 0.9, fill: { color: inv.color + '25' }, line: { color: inv.color, pt: 1.5 }, rounding: true });
        s.addText(inv.num, { x: 0.25, y, w: 0.9, h: 0.9, fontSize: 20, bold: true, color: inv.color, fontFace: 'Arial', align: 'center', valign: 'middle', italic: true });
        s.addText(inv.t, { x: 1.35, y: y + 0.04, w: 11.5, h: 0.42, fontSize: 12, bold: true, color: C.white, fontFace: 'Arial' });
        s.addText(inv.d, { x: 1.35, y: y + 0.5, w: 11.5, h: 0.55, fontSize: 10, color: C.gray, fontFace: 'Arial' });
        if (i < invs.length - 1)
          s.addShape(pptxgen.ShapeType.rect, { x: 0.25, y: y + 1.17, w: 12.8, h: 0.01, fill: { color: C.grayDark }, line: { color: C.grayDark } });
      });
    }

    // ─── SLIDE 6 — TRACCIÓN & VALIDACIÓN ─────────────────────────────────────
    {
      const s = pptx.addSlide();
      addBackground(s);
      addSectionHeader(s, '05  ·  TRACCIÓN', 'Números reales. Clientes reales. Hoy.');
      addFooter(s, 6, TOTAL);

      addKPI(s, 0.25, 1.75, '96.4%', 'Retención mensual de clientes', C.green);
      addKPI(s, 3.35, 1.75, '72 NPS', 'Satisfacción promedio', C.blue);
      addKPI(s, 6.45, 1.75, '240+', 'Empresas en lista de espera', C.accent);
      addKPI(s, 9.55, 1.75, '11 días', 'Ciclo demo → contrato', C.gold);

      addCard(s, 0.25, 3.55, 12.85, 2.85, C.grayDark);
      s.addText('ALIANZAS ESTRATÉGICAS FORMALIZADAS', {
        x: 0.55, y: 3.72, w: 5, h: 0.35, fontSize: 9, bold: true, color: C.blue, fontFace: 'Arial', charSpacing: 1.5,
      });
      const alianzas = [
        { n: 'Chévere Salud', d: 'Cobertura médica corporativa integrada' },
        { n: 'Mercantil Seguros', d: 'Protección de activos con registro contable automático' },
        { n: 'Mapfre Venezuela', d: 'Seguros vehiculares con integración patrimonial' },
        { n: 'Banesco / BNC', d: 'API bancaria certificada en negociación avanzada' },
      ];
      alianzas.forEach((a, i) => {
        const x = 0.55 + (i % 2) * 6.4;
        const y = 4.18 + Math.floor(i / 2) * 0.85;
        s.addShape(pptxgen.ShapeType.rect, { x, y: y + 0.08, w: 0.18, h: 0.18, fill: { color: C.green }, line: { color: C.green }, rounding: true });
        s.addText(a.n, { x: x + 0.35, y, w: 3, h: 0.38, fontSize: 11, bold: true, color: C.white, fontFace: 'Arial' });
        s.addText(a.d, { x: x + 0.35, y: y + 0.37, w: 5.9, h: 0.3, fontSize: 9.5, color: C.gray, fontFace: 'Arial' });
      });
    }

    // ─── SLIDE 7 — MERCADO OBJETIVO ──────────────────────────────────────────
    {
      const s = pptx.addSlide();
      addBackground(s, 'navy');
      addSectionHeader(s, '06  ·  MERCADO', 'El mercado existe. Hoy. Sin competidor directo.', C.gold);
      addFooter(s, 7, TOTAL);

      const datos = [
        { label: 'TAM', sub: 'Mercado Total', val: '120.000', unit: 'empresas registradas en Venezuela', color: C.gray, w: 3.0 },
        { label: 'SAM', sub: 'Mercado Objetivo', val: '94.000', unit: 'PYMEs formales 5–250 empleados', color: C.blue, w: 5.0 },
        { label: 'SOM', sub: 'Año 1 Alcanzable', val: '2.400', unit: 'clientes = $4.32M ARR', color: C.green, w: 9.0 },
      ];

      datos.forEach((d, i) => {
        const y = 1.7 + i * 1.7;
        s.addShape(pptxgen.ShapeType.rect, { x: 0.25, y: y + 0.22, w: d.w, h: 0.6, fill: { color: d.color + '30' }, line: { color: d.color, pt: 1 } });
        s.addText(d.label, { x: 0.4, y: y, w: 1.4, h: 0.55, fontSize: 18, bold: true, color: d.color, fontFace: 'Arial', italic: true });
        s.addText(d.sub.toUpperCase(), { x: 1.9, y: y + 0.1, w: 3, h: 0.35, fontSize: 8, color: d.color, fontFace: 'Arial', bold: true, charSpacing: 1 });
        s.addText(d.val, { x: 0.5, y: y + 0.85, w: 3, h: 0.55, fontSize: 13, bold: true, color: C.white, fontFace: 'Arial' });
        s.addText(d.unit, { x: d.w * 0.38, y: y + 0.92, w: 9, h: 0.42, fontSize: 11, color: C.offWhite, fontFace: 'Arial' });
      });

      s.addShape(pptxgen.ShapeType.rect, { x: 9.5, y: 1.7, w: 3.55, h: 5.0, fill: { color: C.navyCard }, line: { color: C.blue, pt: 1 }, rounding: true });
      s.addText('PRECIOS', { x: 9.7, y: 1.95, w: 3.2, h: 0.4, fontSize: 10, bold: true, color: C.blue, fontFace: 'Arial', align: 'center', charSpacing: 2 });
      const planes = [
        { n: 'PROFESIONAL', p: '$99', color: C.gray },
        { n: 'CORPORATIVO', p: '$199', color: C.blue },
        { n: 'ENTERPRISE', p: '$399', color: C.gold },
      ];
      planes.forEach((pl, i) => {
        const y = 2.55 + i * 1.35;
        s.addShape(pptxgen.ShapeType.rect, { x: 9.65, y, w: 3.1, h: 1.1, fill: { color: C.navy }, line: { color: pl.color, pt: 1 }, rounding: true });
        s.addText(pl.p + ' USD/mes', { x: 9.65, y: y + 0.08, w: 3.1, h: 0.55, fontSize: 22, bold: true, color: pl.color, fontFace: 'Arial', align: 'center', italic: true });
        s.addText(pl.n, { x: 9.65, y: y + 0.65, w: 3.1, h: 0.35, fontSize: 8.5, color: C.gray, fontFace: 'Arial', align: 'center', bold: true, charSpacing: 1 });
      });
    }

    // ─── SLIDE 8 — MODELO DE NEGOCIO ─────────────────────────────────────────
    {
      const s = pptx.addSlide();
      addBackground(s);
      addSectionHeader(s, '07  ·  MODELO DE NEGOCIO', 'SaaS recurrente + ingresos por alianzas');
      addFooter(s, 8, TOTAL);

      const streams = [
        { icon: '🔄', t: 'Suscripción SaaS (Principal)', p: '75% ingresos', d: 'Contratos mensuales/anuales a $99–$399/empresa. Alta retención (96.4%), bajo churn. Escalable sin costo marginal.' },
        { icon: '🤝', t: 'Comisiones por Alianzas', p: '15% ingresos', d: 'Por cada empresa que activa Chévere Salud, Mercantil Seguros o Mapfre, Kyron recibe comisión recurrente mensual.' },
        { icon: '📡', t: 'Telecom Corporativo', p: '7% ingresos', d: 'Margen en planes telefónicos y datos 5G corporativos. Integrados con la facturación de la plataforma.' },
        { icon: '🎓', t: 'Implementación & Training', p: '3% ingresos', d: 'Onboarding premium para empresas grandes. Capacitación contable-fiscal y cursos certificados.' },
      ];

      streams.forEach((st, i) => {
        const y = 1.7 + i * 1.36;
        addCard(s, 0.25, y, 12.85, 1.22, i === 0 ? C.blue : C.grayDark);
        s.addText(st.icon, { x: 0.35, y: y + 0.22, w: 0.65, h: 0.65, fontSize: 20, align: 'center' });
        s.addText(st.t, { x: 1.15, y: y + 0.12, w: 7, h: 0.42, fontSize: 12, bold: true, color: C.white, fontFace: 'Arial' });
        s.addShape(pptxgen.ShapeType.rect, { x: 8.6, y: y + 0.2, w: 1.8, h: 0.5, fill: { color: i === 0 ? C.green : C.navyLight }, line: { color: i === 0 ? C.green : C.grayDark }, rounding: true });
        s.addText(st.p, { x: 8.6, y: y + 0.2, w: 1.8, h: 0.5, fontSize: 10, bold: true, color: i === 0 ? C.navyCard : C.gray, fontFace: 'Arial', align: 'center', valign: 'middle' });
        s.addText(st.d, { x: 1.15, y: y + 0.58, w: 11.7, h: 0.5, fontSize: 10, color: C.gray, fontFace: 'Arial' });
      });
    }

    // ─── SLIDE 9 — VENTAJA COMPETITIVA ──────────────────────────────────────
    {
      const s = pptx.addSlide();
      addBackground(s, 'navy');
      addSectionHeader(s, '08  ·  VENTAJA COMPETITIVA', 'Por qué nadie puede copiarnos rápido', C.green);
      addFooter(s, 9, TOTAL);

      const headers = ['CARACTERÍSTICA', 'SYSTEM KYRON', 'SAP / Oracle', 'QuickBooks', 'Solución Local'];
      const colW = [3.6, 2.3, 2.3, 2.3, 2.3];
      const colX = [0.25, 3.95, 6.35, 8.75, 11.15];
      const colColors = [C.navyCard, C.navy, C.navy, C.navy, C.navy];

      colX.forEach((x, ci) => {
        s.addShape(pptxgen.ShapeType.rect, { x, y: 1.62, w: colW[ci], h: 0.5, fill: { color: ci === 1 ? C.blue : C.navyCard }, line: { color: ci === 1 ? C.blue : C.grayDark } });
        s.addText(headers[ci], { x: x + 0.1, y: 1.62, w: colW[ci] - 0.2, h: 0.5, fontSize: 8.5, bold: true, color: ci === 1 ? C.white : C.gray, fontFace: 'Arial', align: 'center', valign: 'middle', charSpacing: 0.5 });
      });

      const rows = [
        ['Contabilidad VEN-NIF nativa',     '✅', '❌', '❌', '⚠️'],
        ['SENIAT automático + Gaceta',       '✅', '❌', '❌', '⚠️'],
        ['Pago móvil verificado 3 seg',      '✅', '❌', '❌', '❌'],
        ['Legal IA (Contratos VE)',           '✅', '❌', '❌', '❌'],
        ['Telecom 5G integrado',             '✅', '❌', '❌', '❌'],
        ['Precio accesible para PYMEs',      '✅', '❌', '⚠️', '⚠️'],
        ['Soporte en español venezolano',    '✅', '⚠️', '⚠️', '✅'],
      ];

      rows.forEach((row, ri) => {
        const y = 2.22 + ri * 0.72;
        colX.forEach((x, ci) => {
          const bg = ri % 2 === 0 ? colColors[ci] : C.navy;
          const hl = ci === 1;
          s.addShape(pptxgen.ShapeType.rect, { x, y, w: colW[ci], h: 0.68, fill: { color: hl ? C.blue + '18' : bg }, line: { color: hl ? C.blue : C.grayDark + '80' } });
          const val = row[ci];
          const isEmoji = val === '✅' || val === '❌' || val === '⚠️';
          s.addText(val, {
            x: x + 0.1, y: y + 0.12, w: colW[ci] - 0.2, h: 0.44,
            fontSize: isEmoji ? 16 : 9.5,
            color: ci === 0 ? C.offWhite : C.white,
            fontFace: 'Arial', align: isEmoji ? 'center' : 'left', bold: ci === 0,
          });
        });
      });
    }

    // ─── SLIDE 10 — PROYECCIONES ─────────────────────────────────────────────
    {
      const s = pptx.addSlide();
      addBackground(s);
      addSectionHeader(s, '09  ·  PROYECCIONES', 'Crecimiento conservador basado en tracción real');
      addFooter(s, 10, TOTAL);

      const years = [
        { año: '2026', empresas: '500', arr: '$720K', mrr: '$60K', ebitda: '24%', color: C.blue },
        { año: '2027', empresas: '2.400', arr: '$3.84M', mrr: '$320K', ebitda: '38%', color: C.accent },
        { año: '2028', empresas: '8.000', arr: '$14.4M', mrr: '$1.2M', ebitda: '52%', color: C.green },
      ];

      const headers2 = ['', 'EMPRESAS', 'ARR', 'MRR', 'EBITDA'];
      const cx = [0.25, 2.6, 5.2, 8.1, 11.0];
      const cw = [2.2, 2.4, 2.7, 2.7, 2.1];

      headers2.forEach((h, i) => {
        s.addText(h, { x: cx[i], y: 1.65, w: cw[i], h: 0.4, fontSize: 9, bold: true, color: C.blue, fontFace: 'Arial', align: i === 0 ? 'left' : 'center', charSpacing: 1.5 });
      });

      years.forEach((y, ri) => {
        const row = 2.15 + ri * 1.55;
        const isBest = ri === 2;
        s.addShape(pptxgen.ShapeType.rect, {
          x: 0.2, y: row - 0.08, w: 13.0, h: 1.38,
          fill: { color: isBest ? C.navyCard : C.navy }, line: { color: isBest ? y.color : C.grayDark, pt: isBest ? 1.5 : 0.5 }, rounding: true,
        });
        const vals = [y.año, y.empresas, y.arr, y.mrr, y.ebitda];
        vals.forEach((v, ci) => {
          s.addText(v, {
            x: cx[ci], y: row + 0.22, w: cw[ci], h: 0.8,
            fontSize: ci === 0 ? 28 : ci === 2 ? 22 : 15,
            bold: ci === 0 || ci === 2, italic: ci === 0,
            color: ci === 0 ? y.color : ci === 2 ? y.color : C.offWhite,
            fontFace: 'Arial', align: ci === 0 ? 'left' : 'center', valign: 'middle',
          });
        });
        if (isBest) {
          s.addShape(pptxgen.ShapeType.rect, { x: 0.2, y: row - 0.08, w: 0.12, h: 1.38, fill: { color: y.color }, line: { color: y.color } });
          s.addText('🚀 Expansión LATAM: Colombia + Ecuador', {
            x: cx[1], y: row + 0.9, w: 11, h: 0.35, fontSize: 9, color: C.gray, fontFace: 'Arial', align: 'left',
          });
        }
      });
    }

    // ─── SLIDE 11 — EL EQUIPO ─────────────────────────────────────────────────
    {
      const s = pptx.addSlide();
      addBackground(s, 'navy');
      addSectionHeader(s, '10  ·  EL EQUIPO', 'Experiencia venezolana real. Sin curva de aprendizaje.', C.accent);
      addFooter(s, 11, TOTAL);

      const miembros = [
        { rol: 'CEO · FUNDADOR', n: 'Contador Público', d: '15 años experiencia fiscal VEN. Ex-gerente tributario Big Four. Especialista VEN-NIF, SENIAT, IVA/ISLR/IGTF.', col: C.blue },
        { rol: 'CTO', n: 'Ingeniero en Computación', d: 'Arquitecturas SaaS + plataformas de pago digital. Ex-desarrollador senior en banco venezolano de primer nivel.', col: C.green },
        { rol: 'CCO · ALIANZAS', n: 'Director Comercial', d: '800+ contactos empresariales. Responsable de alianzas Chévere Salud, Mercantil Seguros y Mapfre Venezuela.', col: C.accent },
        { rol: 'ADVISORY BOARD', n: 'Asesores Estratégicos', d: 'Abogados mercantiles · CPC certificados · Especialistas fintech LATAM · Ex-reguladores SUDEBAN.', col: C.gold },
      ];

      miembros.forEach((m, i) => {
        const x = 0.25 + (i % 2) * 6.5;
        const y = 1.7 + Math.floor(i / 2) * 2.65;
        addCard(s, x, y, 6.25, 2.4, m.col);
        s.addShape(pptxgen.ShapeType.rect, { x, y, w: 6.25, h: 0.1, fill: { color: m.col }, line: { color: m.col } });
        s.addShape(pptxgen.ShapeType.ellipse, { x: x + 0.2, y: y + 0.28, w: 1.0, h: 1.0, fill: { color: m.col + '30' }, line: { color: m.col, pt: 1.5 } });
        s.addText('👤', { x: x + 0.2, y: y + 0.28, w: 1.0, h: 1.0, fontSize: 24, align: 'center', valign: 'middle' });
        s.addText(m.rol, { x: x + 1.4, y: y + 0.25, w: 4.7, h: 0.35, fontSize: 8.5, bold: true, color: m.col, fontFace: 'Arial', charSpacing: 1 });
        s.addText(m.n, { x: x + 1.4, y: y + 0.62, w: 4.7, h: 0.42, fontSize: 12, bold: true, color: C.white, fontFace: 'Arial' });
        s.addText(m.d, { x: x + 0.2, y: y + 1.42, w: 5.85, h: 0.85, fontSize: 9.5, color: C.gray, fontFace: 'Arial', lineSpacingMultiple: 1.3 });
      });
    }

    // ─── SLIDE 12 — USO DE FONDOS ─────────────────────────────────────────────
    {
      const s = pptx.addSlide();
      addBackground(s);
      addSectionHeader(s, '11  ·  LA RONDA', 'Seed $500.000 USD — Uso estratégico de los fondos');
      addFooter(s, 12, TOTAL);

      const usos = [
        { pct: '35%', dest: 'Tecnología & Producto', det: 'API bancaria certificada (Banesco/Mercantil) · Módulos avanzados Telecom · Infraestructura cloud para 10K empresas · DevOps & seguridad', color: C.blue, barW: 8.5 },
        { pct: '30%', dest: 'Equipo Comercial B2B', det: '8 ejecutivos de ventas en Caracas, Maracaibo, Valencia, Barquisimeto · Onboarding specialists · Meta: 500 empresas en 12 meses', color: C.green, barW: 7.3 },
        { pct: '20%', dest: 'Marketing & Posicionamiento', det: 'Fedecámaras · Conindustria · Consecomercio · Cavedi · Presencia digital · Eventos empresariales nacionales', color: C.accent, barW: 4.9 },
        { pct: '15%', dest: 'Capital de Trabajo', det: '6 meses runway operativo · Estructura administrativa · Licencias regulatorias · Legal corporativo', color: C.gold, barW: 3.65 },
      ];

      usos.forEach((u, i) => {
        const y = 1.68 + i * 1.38;
        s.addShape(pptxgen.ShapeType.rect, { x: 0.25, y, w: 1.5, h: 1.15, fill: { color: u.color + '20' }, line: { color: u.color, pt: 1.5 }, rounding: true });
        s.addText(u.pct, { x: 0.25, y, w: 1.5, h: 1.15, fontSize: 24, bold: true, color: u.color, fontFace: 'Arial', align: 'center', valign: 'middle', italic: true });
        s.addText(u.dest, { x: 1.95, y: y + 0.06, w: 10.8, h: 0.42, fontSize: 12, bold: true, color: C.white, fontFace: 'Arial' });
        s.addShape(pptxgen.ShapeType.rect, { x: 1.95, y: y + 0.54, w: u.barW, h: 0.16, fill: { color: u.color + '50' }, line: { color: u.color + '50' }, rounding: true });
        s.addShape(pptxgen.ShapeType.rect, { x: 1.95, y: y + 0.54, w: Math.min(u.barW, u.barW), h: 0.16, fill: { color: u.color }, line: { color: u.color }, rounding: true });
        s.addText(u.det, { x: 1.95, y: y + 0.76, w: 10.8, h: 0.35, fontSize: 9.5, color: C.gray, fontFace: 'Arial' });
      });
    }

    // ─── SLIDE 13 — CIERRE ───────────────────────────────────────────────────
    {
      const s = pptx.addSlide();
      addBackground(s, 'accent');
      s.addShape(pptxgen.ShapeType.hexagon, { x: 4.5, y: 0.4, w: 4.3, h: 4.3, fill: { color: C.blue + '15' }, line: { color: C.blue + '50', pt: 2 } });
      s.addText('SK', { x: 4.5, y: 0.4, w: 4.3, h: 4.3, fontSize: 80, bold: true, color: C.blue + '40', fontFace: 'Arial', align: 'center', valign: 'middle' });

      s.addText('ÚNASE A NOSOTROS', {
        x: 0.5, y: 1.2, w: W - 1, h: 1.1,
        fontSize: 42, bold: true, color: C.white, fontFace: 'Arial', align: 'center',
      });
      s.addText('El mercado existe. Los clientes esperan. El producto funciona.\nSolo necesitamos el combustible para acelerar.', {
        x: 1.5, y: 2.5, w: W - 3, h: 1.0,
        fontSize: 16, color: C.offWhite, fontFace: 'Arial', align: 'center', italic: true, lineSpacingMultiple: 1.4,
      });

      s.addShape(pptxgen.ShapeType.rect, { x: 3.5, y: 3.72, w: 1.4, h: 0.06, fill: { color: C.green }, line: { color: C.green } });
      s.addShape(pptxgen.ShapeType.rect, { x: 8.43, y: 3.72, w: 1.4, h: 0.06, fill: { color: C.green }, line: { color: C.green } });

      s.addShape(pptxgen.ShapeType.rect, { x: 3.4, y: 3.95, w: 6.53, h: 0.8, fill: { color: C.blue }, line: { color: C.blue }, rounding: true });
      s.addText('CONVERSEMOS HOY → $500K SEED', {
        x: 3.4, y: 3.95, w: 6.53, h: 0.8,
        fontSize: 18, bold: true, color: C.white, fontFace: 'Arial', align: 'center', valign: 'middle',
      });

      const contactos = [
        { icon: '🌐', t: 'system-kyron.com' },
        { icon: '📧', t: 'inversores@system-kyron.com' },
        { icon: '📱', t: '@SystemKyron' },
      ];
      contactos.forEach((c, i) => {
        s.addText(c.icon + '  ' + c.t, {
          x: 1.0 + i * 3.85, y: 5.0, w: 3.6, h: 0.45,
          fontSize: 11, color: C.gray, fontFace: 'Arial', align: 'center',
        });
      });

      s.addText('TELECOM · RECYCLING · TOTAL CONTROL', {
        x: 0.5, y: 5.58, w: W - 1, h: 0.3,
        fontSize: 9, color: C.blue, fontFace: 'Arial', align: 'center', bold: true, charSpacing: 2,
      });
    }

    const buffer = await pptx.write({ outputType: 'nodebuffer' }) as Buffer;

    await query(
      `INSERT INTO document_records (tipo_documento, descripcion, generado_por, metadata) VALUES ($1, $2, $3, $4)`,
      ['PPTX_PRESENTACION', 'Pitch Deck profesional descargado — System Kyron 13 slides', 'pptxgenjs', JSON.stringify({ slides: TOTAL, layout: 'WIDE', version: '2.0' })]
    ).catch(() => {});

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': 'attachment; filename="SystemKyron-PitchDeck-2026.pptx"',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[pitch-pptx]', err);
    return NextResponse.json({ error: 'Error generando el PPTX' }, { status: 500 });
  }
}
