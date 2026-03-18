import { NextResponse } from 'next/server';
import pptxgen from 'pptxgenjs';
import { query } from '@/lib/db';

const DARK_NAVY = '050C1F';
const BLUE_ACCENT = '0EA5E9';
const GREEN_ACCENT = '22C55E';
const WHITE = 'FFFFFF';
const LIGHT_GRAY = 'E2E8F0';
const MID_GRAY = '64748B';

const slides = [
  {
    titulo: 'SYSTEM KYRON',
    subtitulo: 'El Sistema Operativo del\nEmpresario Venezolano',
    tag: 'TELECOM · RECYCLING · TOTAL CONTROL',
    tipo: 'portada',
  },
  {
    titulo: 'EL PROBLEMA',
    puntos: [
      '78% de las PYMEs venezolanas usan Excel para contabilidad',
      '61% desconoce su deuda fiscal con el SENIAT en tiempo real',
      '84% verifica pagos móviles manualmente — 15+ min por operación',
      'IVA 16%, IGTF 3%, ISLR 34%, tasa BCV fluctuante: un caos total',
      'Software importado (SAP, QuickBooks) no entiende Venezuela',
    ],
    tipo: 'problema',
  },
  {
    titulo: 'LA SOLUCIÓN',
    subtitulo: 'Una sola plataforma. Todo lo que tu empresa necesita.',
    modulos: [
      { icon: '📊', nombre: 'Contabilidad VEN-NIF', desc: 'Libros SENIAT automáticos' },
      { icon: '📱', nombre: 'Pago Móvil IA', desc: 'Verificación en 3 segundos' },
      { icon: '⚖️', nombre: 'Legal IA', desc: 'Contratos con Gemini' },
      { icon: '♻️', nombre: 'Ameru Sostenibilidad', desc: 'Eco-Créditos + IA' },
      { icon: '📡', nombre: 'Telecom 5G', desc: 'Líneas + internet corporativo' },
      { icon: '👥', nombre: 'RRHH + Nómina', desc: 'LOTTT automatizado' },
    ],
    tipo: 'solucion',
  },
  {
    titulo: 'INNOVACIONES EXCLUSIVAS',
    innovaciones: [
      { num: '01', titulo: 'Verificación de pago móvil en tiempo real', desc: 'El cliente paga → 3 segundos → confirmado, registrado, acreditado. 0% fraude.' },
      { num: '02', titulo: 'OCR inteligente con Gemini', desc: 'Foto de factura → datos extraídos automáticamente con IA. Sin digitación manual.' },
      { num: '03', titulo: 'Generador legal venezolano IA', desc: 'Contratos, actas y poderes redactados por IA con base en el marco jurídico venezolano.' },
      { num: '04', titulo: 'Sostenibilidad con Eco-Créditos', desc: 'Clasificación de residuos con IA + mercado de créditos de carbono para empresas.' },
    ],
    tipo: 'innovaciones',
  },
  {
    titulo: 'TRACCIÓN & VALIDACIÓN',
    metricas: [
      { val: '96.4%', desc: 'Retención mensual de clientes' },
      { val: '72 NPS', desc: 'Satisfacción promedio' },
      { val: '240+', desc: 'Empresas en lista de espera' },
      { val: '11 días', desc: 'Ciclo promedio demo → contrato' },
    ],
    tipo: 'traccion',
  },
  {
    titulo: 'MERCADO OBJETIVO',
    datos: [
      { label: 'TAM', val: '120.000 empresas registradas en Venezuela' },
      { label: 'SAM', val: '94.000 PYMEs formales (objetivo primario)' },
      { label: 'SOM Año 1', val: '2.400 clientes — $4.3M USD ARR' },
      { label: 'Precio', val: '$99 · $199 · $399 USD / mes por empresa' },
    ],
    tipo: 'mercado',
  },
  {
    titulo: 'PROYECCIONES FINANCIERAS',
    proyecciones: [
      { año: '2026', empresas: '500', arr: '$720K USD', ebitda: '24%' },
      { año: '2027', empresas: '2.400', arr: '$3.84M USD', ebitda: '38%' },
      { año: '2028', empresas: '8.000', arr: '$14.4M USD', ebitda: '52%' },
    ],
    tipo: 'proyecciones',
  },
  {
    titulo: 'RONDA SEED — $500.000 USD',
    usos: [
      { pct: '35%', destino: 'Tecnología & Producto', detalle: 'API bancaria, módulos avanzados, infraestructura cloud 10K empresas' },
      { pct: '30%', destino: 'Equipo Comercial B2B', detalle: '8 ejecutivos en Caracas, Maracaibo, Valencia, Barquisimeto' },
      { pct: '20%', destino: 'Marketing & Posicionamiento', detalle: 'Fedecámaras, Conindustria, Consecomercio, eventos empresariales' },
      { pct: '15%', destino: 'Capital de Trabajo', detalle: '6 meses runway + licencias regulatorias' },
    ],
    tipo: 'inversion',
  },
  {
    titulo: '¿POR QUÉ AHORA?',
    razones: [
      'Venezuela: 120.000 empresas sin solución integral — el mercado existe HOY',
      'Primeros en verificación de pago móvil integrada a contabilidad en LATAM',
      '10x más económico que ERPs importados equivalentes (SAP, Oracle)',
      'IA generativa + BCV + SENIAT: una ventaja regulatoria imposible de replicar rápido',
      'Runway actual + 500K seed = 18 meses para dominar el mercado venezolano',
    ],
    tipo: 'porque_ahora',
  },
  {
    titulo: 'ÚNASE A NOSOTROS',
    subtitulo: 'El mercado existe. Los clientes esperan.\nEl producto funciona. Solo necesitamos el combustible.',
    cta: 'CONVERSEMOS HOY',
    tag: 'system-kyron.com · @SystemKyron',
    tipo: 'cierre',
  },
];

function addSlideBackground(slide: pptxgen.Slide) {
  slide.addShape(pptxgen.ShapeType.rect, {
    x: 0, y: 0, w: '100%', h: '100%',
    fill: { color: DARK_NAVY },
    line: { color: DARK_NAVY },
  });
  slide.addShape(pptxgen.ShapeType.rect, {
    x: 0, y: 0, w: 0.08, h: '100%',
    fill: { color: BLUE_ACCENT },
    line: { color: BLUE_ACCENT },
  });
}

function addSlideTitle(slide: pptxgen.Slide, titulo: string, y = 0.5) {
  slide.addText(titulo, {
    x: 0.4, y, w: 9.2, h: 0.7,
    fontSize: 28, bold: true, color: WHITE,
    fontFace: 'Arial', align: 'left',
  });
  slide.addShape(pptxgen.ShapeType.rect, {
    x: 0.4, y: y + 0.72, w: 1.2, h: 0.05,
    fill: { color: GREEN_ACCENT },
    line: { color: GREEN_ACCENT },
  });
}

export async function GET() {
  try {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_WIDE';
    pptx.title = 'System Kyron — Pitch Deck';
    pptx.subject = 'Ronda Seed $500K USD';
    pptx.author = 'System Kyron';

    for (const s of slides) {
      const slide = pptx.addSlide();
      addSlideBackground(slide);

      if (s.tipo === 'portada') {
        slide.addShape(pptxgen.ShapeType.rect, {
          x: 0, y: 0, w: 0.5, h: '100%',
          fill: { color: BLUE_ACCENT }, line: { color: BLUE_ACCENT },
        });
        slide.addText('⬡', {
          x: 1, y: 1.2, w: 2, h: 2,
          fontSize: 96, color: BLUE_ACCENT, align: 'center',
        });
        slide.addText(s.titulo!, {
          x: 3.2, y: 1.0, w: 6.5, h: 1.0,
          fontSize: 44, bold: true, color: WHITE, fontFace: 'Arial', align: 'left',
        });
        slide.addText(s.subtitulo!, {
          x: 3.2, y: 2.1, w: 6.5, h: 1.0,
          fontSize: 22, color: BLUE_ACCENT, fontFace: 'Arial', align: 'left', italic: true,
        });
        slide.addText(s.tag!, {
          x: 3.2, y: 3.2, w: 6.5, h: 0.4,
          fontSize: 11, color: MID_GRAY, fontFace: 'Arial', align: 'left', bold: true,
        });
        slide.addText('RONDA SEED · $500.000 USD · SECTOR PRIVADO VENEZOLANO', {
          x: 0, y: 5.8, w: '100%', h: 0.4,
          fontSize: 9, color: MID_GRAY, fontFace: 'Arial', align: 'center',
        });

      } else if (s.tipo === 'problema') {
        addSlideTitle(slide, s.titulo!);
        (s.puntos as string[]).forEach((punto, i) => {
          slide.addShape(pptxgen.ShapeType.rect, {
            x: 0.4, y: 1.5 + i * 0.82, w: 0.08, h: 0.5,
            fill: { color: i === 0 ? GREEN_ACCENT : BLUE_ACCENT },
            line: { color: i === 0 ? GREEN_ACCENT : BLUE_ACCENT },
          });
          slide.addText(punto, {
            x: 0.7, y: 1.5 + i * 0.82, w: 9, h: 0.5,
            fontSize: 13, color: i === 0 ? WHITE : LIGHT_GRAY,
            fontFace: 'Arial', bold: i === 0,
          });
        });

      } else if (s.tipo === 'solucion') {
        addSlideTitle(slide, s.titulo!);
        slide.addText(s.subtitulo!, {
          x: 0.4, y: 1.3, w: 9.2, h: 0.4,
          fontSize: 13, color: MID_GRAY, italic: true, fontFace: 'Arial',
        });
        const mods = s.modulos as { icon: string; nombre: string; desc: string }[];
        mods.forEach((mod, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const x = 0.4 + col * 3.2;
          const y = 1.9 + row * 1.7;
          slide.addShape(pptxgen.ShapeType.rect, {
            x, y, w: 3.0, h: 1.5,
            fill: { color: '0A1628' }, line: { color: BLUE_ACCENT, pt: 1 }, rounding: true,
          });
          slide.addText(mod.icon + ' ' + mod.nombre, {
            x: x + 0.15, y: y + 0.18, w: 2.7, h: 0.45,
            fontSize: 12, bold: true, color: WHITE, fontFace: 'Arial',
          });
          slide.addText(mod.desc, {
            x: x + 0.15, y: y + 0.65, w: 2.7, h: 0.5,
            fontSize: 10, color: MID_GRAY, fontFace: 'Arial',
          });
        });

      } else if (s.tipo === 'innovaciones') {
        addSlideTitle(slide, s.titulo!);
        const invs = s.innovaciones as { num: string; titulo: string; desc: string }[];
        invs.forEach((inv, i) => {
          const y = 1.55 + i * 1.1;
          slide.addText(inv.num, {
            x: 0.4, y, w: 0.6, h: 0.55,
            fontSize: 22, bold: true, color: BLUE_ACCENT, fontFace: 'Arial', italic: true,
          });
          slide.addText(inv.titulo, {
            x: 1.1, y, w: 8.6, h: 0.4,
            fontSize: 13, bold: true, color: WHITE, fontFace: 'Arial',
          });
          slide.addText(inv.desc, {
            x: 1.1, y: y + 0.45, w: 8.6, h: 0.45,
            fontSize: 11, color: MID_GRAY, fontFace: 'Arial',
          });
          if (i < invs.length - 1) {
            slide.addShape(pptxgen.ShapeType.rect, {
              x: 1.1, y: y + 0.96, w: 8.6, h: 0.01,
              fill: { color: '1E2D45' }, line: { color: '1E2D45' },
            });
          }
        });

      } else if (s.tipo === 'traccion') {
        addSlideTitle(slide, s.titulo!);
        const mets = s.metricas as { val: string; desc: string }[];
        mets.forEach((m, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const x = 0.4 + col * 4.7;
          const y = 1.6 + row * 2.0;
          slide.addShape(pptxgen.ShapeType.rect, {
            x, y, w: 4.4, h: 1.6,
            fill: { color: '0A1628' }, line: { color: GREEN_ACCENT, pt: 1 }, rounding: true,
          });
          slide.addText(m.val, {
            x: x + 0.2, y: y + 0.2, w: 4.0, h: 0.8,
            fontSize: 34, bold: true, color: GREEN_ACCENT, fontFace: 'Arial', align: 'center', italic: true,
          });
          slide.addText(m.desc, {
            x: x + 0.2, y: y + 1.05, w: 4.0, h: 0.4,
            fontSize: 11, color: LIGHT_GRAY, fontFace: 'Arial', align: 'center',
          });
        });

      } else if (s.tipo === 'mercado') {
        addSlideTitle(slide, s.titulo!);
        const datos = s.datos as { label: string; val: string }[];
        datos.forEach((d, i) => {
          const y = 1.55 + i * 1.0;
          slide.addShape(pptxgen.ShapeType.rect, {
            x: 0.4, y, w: 1.8, h: 0.7,
            fill: { color: BLUE_ACCENT }, line: { color: BLUE_ACCENT }, rounding: true,
          });
          slide.addText(d.label, {
            x: 0.4, y, w: 1.8, h: 0.7,
            fontSize: 13, bold: true, color: WHITE, fontFace: 'Arial', align: 'center', valign: 'middle',
          });
          slide.addText(d.val, {
            x: 2.4, y: y + 0.12, w: 7.2, h: 0.5,
            fontSize: 13, color: LIGHT_GRAY, fontFace: 'Arial',
          });
        });

      } else if (s.tipo === 'proyecciones') {
        addSlideTitle(slide, s.titulo!);
        const headers = ['AÑO', 'EMPRESAS', 'ARR', 'EBITDA'];
        const colX = [0.4, 2.8, 5.2, 7.8];
        headers.forEach((h, i) => {
          slide.addText(h, {
            x: colX[i], y: 1.4, w: 2.2, h: 0.45,
            fontSize: 11, bold: true, color: BLUE_ACCENT, fontFace: 'Arial',
          });
        });
        const projs = s.proyecciones as { año: string; empresas: string; arr: string; ebitda: string }[];
        projs.forEach((p, i) => {
          const y = 1.95 + i * 1.1;
          slide.addShape(pptxgen.ShapeType.rect, {
            x: 0.3, y: y - 0.05, w: 9.4, h: 0.95,
            fill: { color: i === 2 ? '0A1628' : '060E1A' }, line: { color: i === 2 ? GREEN_ACCENT : '1E2D45', pt: i === 2 ? 1 : 0.5 }, rounding: true,
          });
          [p.año, p.empresas, p.arr, p.ebitda].forEach((val, j) => {
            slide.addText(val, {
              x: colX[j], y, w: 2.2, h: 0.8,
              fontSize: j === 2 ? 15 : 13, bold: j === 0 || j === 2, italic: j === 2,
              color: j === 2 ? GREEN_ACCENT : j === 0 ? WHITE : LIGHT_GRAY, fontFace: 'Arial', valign: 'middle',
            });
          });
        });

      } else if (s.tipo === 'inversion') {
        addSlideTitle(slide, s.titulo!);
        const usos = s.usos as { pct: string; destino: string; detalle: string }[];
        usos.forEach((u, i) => {
          const y = 1.5 + i * 1.1;
          slide.addShape(pptxgen.ShapeType.rect, {
            x: 0.4, y, w: 1.3, h: 0.75,
            fill: { color: BLUE_ACCENT }, line: { color: BLUE_ACCENT }, rounding: true,
          });
          slide.addText(u.pct, {
            x: 0.4, y, w: 1.3, h: 0.75,
            fontSize: 18, bold: true, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Arial',
          });
          slide.addText(u.destino, {
            x: 1.9, y, w: 7.7, h: 0.38,
            fontSize: 13, bold: true, color: WHITE, fontFace: 'Arial',
          });
          slide.addText(u.detalle, {
            x: 1.9, y: y + 0.38, w: 7.7, h: 0.38,
            fontSize: 11, color: MID_GRAY, fontFace: 'Arial',
          });
        });

      } else if (s.tipo === 'porque_ahora') {
        addSlideTitle(slide, s.titulo!);
        const razones = s.razones as string[];
        razones.forEach((r, i) => {
          slide.addShape(pptxgen.ShapeType.ellipse, {
            x: 0.4, y: 1.55 + i * 0.88, w: 0.4, h: 0.4,
            fill: { color: i === 0 ? GREEN_ACCENT : BLUE_ACCENT }, line: { color: 'transparent' },
          });
          slide.addText((i + 1).toString(), {
            x: 0.4, y: 1.55 + i * 0.88, w: 0.4, h: 0.4,
            fontSize: 11, bold: true, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Arial',
          });
          slide.addText(r, {
            x: 1.0, y: 1.55 + i * 0.88, w: 8.7, h: 0.55,
            fontSize: 13, color: i === 0 ? WHITE : LIGHT_GRAY, bold: i === 0, fontFace: 'Arial', valign: 'middle',
          });
        });

      } else if (s.tipo === 'cierre') {
        slide.addShape(pptxgen.ShapeType.rect, {
          x: 0, y: 0, w: '100%', h: '100%',
          fill: { color: DARK_NAVY }, line: { color: DARK_NAVY },
        });
        slide.addShape(pptxgen.ShapeType.rect, {
          x: 0, y: 0, w: '100%', h: 0.12,
          fill: { color: BLUE_ACCENT }, line: { color: BLUE_ACCENT },
        });
        slide.addShape(pptxgen.ShapeType.rect, {
          x: 0, y: 5.88, w: '100%', h: 0.12,
          fill: { color: GREEN_ACCENT }, line: { color: GREEN_ACCENT },
        });
        slide.addText('⬡', {
          x: 3.5, y: 0.5, w: 3.0, h: 1.8,
          fontSize: 80, color: BLUE_ACCENT, align: 'center',
        });
        slide.addText(s.titulo!, {
          x: 0.5, y: 2.4, w: 9.5, h: 0.8,
          fontSize: 36, bold: true, color: WHITE, fontFace: 'Arial', align: 'center',
        });
        slide.addText(s.subtitulo!, {
          x: 1.0, y: 3.3, w: 8.0, h: 0.9,
          fontSize: 15, color: LIGHT_GRAY, fontFace: 'Arial', align: 'center', italic: true,
        });
        slide.addShape(pptxgen.ShapeType.rect, {
          x: 3.0, y: 4.4, w: 4.0, h: 0.7,
          fill: { color: BLUE_ACCENT }, line: { color: BLUE_ACCENT }, rounding: true,
        });
        slide.addText(s.cta!, {
          x: 3.0, y: 4.4, w: 4.0, h: 0.7,
          fontSize: 16, bold: true, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Arial',
        });
        slide.addText(s.tag!, {
          x: 0.5, y: 5.35, w: 9.5, h: 0.4,
          fontSize: 11, color: MID_GRAY, fontFace: 'Arial', align: 'center',
        });
      }
    }

    const buffer = await pptx.write({ outputType: 'nodebuffer' }) as Buffer;

    await query(
      `INSERT INTO document_records (tipo_documento, descripcion, generado_por, metadata) VALUES ($1, $2, $3, $4)`,
      ['PPTX_PRESENTACION', 'Presentación PowerPoint descargada — System Kyron Pitch Deck 10 slides', 'pptxgenjs', JSON.stringify({ slides: slides.length, layout: 'WIDE' })]
    ).catch(() => {});

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': 'attachment; filename="SystemKyron-PitchDeck.pptx"',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (err) {
    console.error('[pitch-pptx]', err);
    return NextResponse.json({ error: 'Error generando el PPTX' }, { status: 500 });
  }
}
