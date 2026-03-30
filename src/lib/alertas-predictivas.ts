import { query } from '@/lib/db';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';
import { sendWhatsAppNotification } from '@/lib/whatsapp-service';
import { sendSmsNotification } from '@/lib/sms-service';

interface ObligacionFiscal {
  nombre: string;
  tipo: string;
  periodicidad: 'mensual' | 'anual' | 'trimestral';
  diasAntes: number[];
  calcularFecha: (rifTerminal: number, mes: number, anio: number) => Date | null;
}

const CALENDARIO_SENIAT: Record<number, { desde: number; hasta: number }> = {
  0: { desde: 12, hasta: 12 },
  1: { desde: 13, hasta: 14 },
  2: { desde: 14, hasta: 15 },
  3: { desde: 15, hasta: 16 },
  4: { desde: 16, hasta: 17 },
  5: { desde: 17, hasta: 18 },
  6: { desde: 18, hasta: 19 },
  7: { desde: 19, hasta: 21 },
  8: { desde: 21, hasta: 23 },
  9: { desde: 23, hasta: 27 },
};

function getFechaVencimientoIVA(rifTerminal: number, mes: number, anio: number): Date | null {
  const cal = CALENDARIO_SENIAT[rifTerminal];
  if (!cal) return null;
  return new Date(anio, mes - 1, cal.hasta);
}

const OBLIGACIONES: ObligacionFiscal[] = [
  {
    nombre: 'Declaración de IVA',
    tipo: 'fiscal',
    periodicidad: 'mensual',
    diasAntes: [7, 5, 3, 1],
    calcularFecha: getFechaVencimientoIVA,
  },
  {
    nombre: 'Retención de ISLR',
    tipo: 'fiscal',
    periodicidad: 'mensual',
    diasAntes: [7, 5, 3, 1],
    calcularFecha: getFechaVencimientoIVA,
  },
  {
    nombre: 'Declaración de IGTF',
    tipo: 'fiscal',
    periodicidad: 'mensual',
    diasAntes: [7, 5, 3, 1],
    calcularFecha: getFechaVencimientoIVA,
  },
  {
    nombre: 'Aportes Parafiscales (IVSS/INCES/FAOV)',
    tipo: 'vencimiento',
    periodicidad: 'mensual',
    diasAntes: [5, 3, 1],
    calcularFecha: (_terminal, mes, anio) => new Date(anio, mes - 1, 15),
  },
  {
    nombre: 'Declaración Definitiva ISLR',
    tipo: 'fiscal',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3, 1],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 2, 31),
  },
  {
    nombre: 'Impuesto a los Grandes Patrimonios (IGP)',
    tipo: 'fiscal',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3, 1],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 2, 31),
  },
];

interface AlertaGenerada {
  userId: number;
  obligacion: string;
  diasRestantes: number;
  fechaVencimiento: Date;
}

function getRifTerminal(rif: string): number {
  const clean = rif.replace(/[^0-9]/g, '');
  const last = clean.charAt(clean.length - 1);
  return parseInt(last, 10) || 0;
}

export async function verificarAlertasPredictivas(): Promise<AlertaGenerada[]> {
  const alertasGeneradas: AlertaGenerada[] = [];
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const empresas = await query<{
    user_id: number;
    rif: string;
    nombre_empresa: string;
    email: string;
  }>(
    `SELECT u.id AS user_id, u.email, u.rif, COALESCE(u.razon_social, u.nombre) AS nombre_empresa
     FROM users u
     WHERE u.tipo = 'juridico' AND u.rif IS NOT NULL AND u.rif != ''`
  );

  if (!empresas.length) return alertasGeneradas;

  const mesActual = hoy.getMonth() + 1;
  const anioActual = hoy.getFullYear();

  for (const empresa of empresas) {
    const rifTerminal = getRifTerminal(empresa.rif);

    for (const obligacion of OBLIGACIONES) {
      const fechaVenc = obligacion.calcularFecha(rifTerminal, mesActual, anioActual);
      if (!fechaVenc) continue;

      const diffMs = fechaVenc.getTime() - hoy.getTime();
      const diasRestantes = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      if (diasRestantes < 0 || !obligacion.diasAntes.includes(diasRestantes)) continue;

      const yaEnviada = await query<{ count: string }>(
        `SELECT COUNT(*) as count FROM notificaciones
         WHERE user_id = $1
         AND titulo LIKE $2
         AND created_at > NOW() - INTERVAL '20 hours'`,
        [empresa.user_id, `%${obligacion.nombre}%${diasRestantes} día%`]
      );

      if (parseInt(yaEnviada[0]?.count ?? '0') > 0) continue;

      const titulo = diasRestantes === 1
        ? `${obligacion.nombre} vence MAÑANA`
        : `${obligacion.nombre} — faltan ${diasRestantes} días`;

      const fechaStr = fechaVenc.toLocaleDateString('es-VE', {
        day: '2-digit', month: 'long', year: 'numeric',
      });

      const mensaje = diasRestantes <= 3
        ? `URGENTE: Tu ${obligacion.nombre} vence el ${fechaStr}. RIF: ${empresa.rif}. Presenta tu declaración lo antes posible para evitar multas y sanciones del SENIAT.`
        : `Recordatorio: Tu ${obligacion.nombre} vence el ${fechaStr}. RIF: ${empresa.rif}. Tienes ${diasRestantes} días para preparar y presentar tu declaración.`;

      await query(
        `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, metadata)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          empresa.user_id,
          obligacion.tipo,
          titulo,
          mensaje,
          JSON.stringify({
            obligacion: obligacion.nombre,
            dias_restantes: diasRestantes,
            fecha_vencimiento: fechaVenc.toISOString(),
            rif: empresa.rif,
            predictiva: true,
          }),
        ]
      );

      const html = buildKyronEmailTemplate({
        title: diasRestantes <= 3 ? `⚠️ ${titulo}` : `📅 ${titulo}`,
        body: `
          <p style="color: #E2E8F0; font-size: 14px; margin: 0 0 12px 0;">${mensaje}</p>
          <div style="background: #0A1530; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">EMPRESA</p>
            <p style="color: #F1F5F9; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">${empresa.nombre_empresa}</p>
            <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">RIF</p>
            <p style="color: #0EA5E9; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">${empresa.rif}</p>
            <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">VENCIMIENTO</p>
            <p style="color: ${diasRestantes <= 3 ? '#F59E0B' : '#22C55E'}; font-size: 14px; font-weight: 700; margin: 0;">${fechaStr}</p>
          </div>
        `,
        footer: diasRestantes <= 3
          ? 'Esta obligación vence pronto. Evita sanciones presentando a tiempo.'
          : 'Alerta predictiva generada automáticamente por System Kyron.',
      });

      sendEmail({
        to: empresa.email,
        subject: `[Kyron Fiscal] ${titulo}`,
        html,
        module: 'tributos',
        purpose: 'alert',
      }).catch(() => {});

      sendWhatsAppNotification(empresa.user_id, {
        tipo: obligacion.tipo,
        titulo,
        mensaje,
      }).catch(() => {});

      sendSmsNotification(empresa.user_id, {
        tipo: obligacion.tipo,
        titulo,
        mensaje,
      }).catch(() => {});

      alertasGeneradas.push({
        userId: empresa.user_id,
        obligacion: obligacion.nombre,
        diasRestantes,
        fechaVencimiento: fechaVenc,
      });
    }
  }

  return alertasGeneradas;
}

export async function obtenerProximasObligaciones(rifTerminal: number) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const mesActual = hoy.getMonth() + 1;
  const anioActual = hoy.getFullYear();

  const proximas = [];

  for (const obligacion of OBLIGACIONES) {
    let fechaVenc = obligacion.calcularFecha(rifTerminal, mesActual, anioActual);

    if (!fechaVenc || fechaVenc.getTime() < hoy.getTime()) {
      if (obligacion.periodicidad === 'mensual') {
        const mesSiguiente = mesActual === 12 ? 1 : mesActual + 1;
        const anioSiguiente = mesActual === 12 ? anioActual + 1 : anioActual;
        fechaVenc = obligacion.calcularFecha(rifTerminal, mesSiguiente, anioSiguiente);
      } else {
        fechaVenc = obligacion.calcularFecha(rifTerminal, mesActual, anioActual + 1);
      }
    }

    if (!fechaVenc) continue;

    const diffMs = fechaVenc.getTime() - hoy.getTime();
    const diasRestantes = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    proximas.push({
      nombre: obligacion.nombre,
      tipo: obligacion.tipo,
      periodicidad: obligacion.periodicidad,
      fechaVencimiento: fechaVenc.toISOString(),
      diasRestantes,
      urgencia: diasRestantes <= 3 ? 'critica' : diasRestantes <= 7 ? 'alta' : diasRestantes <= 15 ? 'media' : 'baja',
    });
  }

  return proximas.sort((a, b) => a.diasRestantes - b.diasRestantes);
}
