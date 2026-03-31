import { NextResponse } from 'next/server';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';

const ALERTAS_DEMO = [
  {
    subject: '[Kyron SENIAT] Declaración de IVA vence en 3 días',
    title: '⚠️ Declaración de IVA — faltan 3 días',
    urgencia: 'alta',
    body: `
      <p style="color: #E2E8F0; font-size: 14px; margin: 0 0 12px 0;">URGENTE: Tu Declaración de IVA vence el 03 de abril de 2026. RIF: J-12345678-9. Presenta tu declaración lo antes posible para evitar multas y sanciones (SENIAT).</p>
      <div style="background: #0A1530; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">EMPRESA</p>
        <p style="color: #F1F5F9; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">Inversiones Kyron C.A.</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">RIF</p>
        <p style="color: #0EA5E9; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">J-12345678-9</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">VENCIMIENTO</p>
        <p style="color: #F59E0B; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">03 de abril de 2026</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">RIESGO DE MULTA</p>
        <p style="color: #EF4444; font-size: 13px; font-weight: 600; margin: 0;">150 a 300 UT + intereses moratorios (1.2x tasa activa BCV)</p>
      </div>
      <div style="background: #0A1530; border-left: 3px solid #F59E0B; padding: 12px 16px; border-radius: 0 8px 8px 0;">
        <p style="color: #94A3B8; font-size: 12px; margin: 0;"><strong style="color: #F59E0B;">Base Legal:</strong> COT Art. 103, Ley de IVA (G.O. 6.507)</p>
      </div>
    `,
    footer: 'Esta obligación vence pronto. Evita sanciones presentando a tiempo.',
  },
  {
    subject: '[Kyron IVSS] Aportes al Seguro Social vence MAÑANA',
    title: '🚨 Aportes al IVSS — vence MAÑANA',
    urgencia: 'critica',
    body: `
      <p style="color: #E2E8F0; font-size: 14px; margin: 0 0 12px 0;">URGENTE: Tus Aportes al IVSS (Seguro Social Obligatorio) vencen MAÑANA 05 de abril de 2026. RIF: J-12345678-9. Presenta tu pago inmediatamente para evitar multas del IVSS.</p>
      <div style="background: #0A1530; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">ENTE GUBERNAMENTAL</p>
        <p style="color: #F1F5F9; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">Instituto Venezolano de los Seguros Sociales (IVSS)</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">EMPRESA</p>
        <p style="color: #0EA5E9; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">Inversiones Kyron C.A. — J-12345678-9</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">VENCIMIENTO</p>
        <p style="color: #EF4444; font-size: 16px; font-weight: 700; margin: 0 0 12px 0;">MAÑANA — 05 de abril de 2026</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">RIESGO DE MULTA</p>
        <p style="color: #EF4444; font-size: 13px; font-weight: 600; margin: 0;">10-50 UT por cada trabajador no inscrito + intereses de mora 12% anual</p>
      </div>
      <div style="background: #0A1530; border-left: 3px solid #EF4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
        <p style="color: #94A3B8; font-size: 12px; margin: 0;"><strong style="color: #EF4444;">Base Legal:</strong> Ley del Seguro Social (G.O. 5.976), Art. 87-89</p>
      </div>
    `,
    footer: 'ACCIÓN INMEDIATA REQUERIDA. El incumplimiento genera multas por cada trabajador.',
  },
  {
    subject: '[Kyron SUNDDE] Registro de Precios Justos — 15 días',
    title: '📋 Registro SUNDDE — Precios Justos — faltan 15 días',
    urgencia: 'media',
    body: `
      <p style="color: #E2E8F0; font-size: 14px; margin: 0 0 12px 0;">Recordatorio: Tu Registro SUNDDE de Precios Justos vence el 31 de marzo de 2026. RIF: J-12345678-9. Tienes 15 días para actualizar tu registro ante la Superintendencia Nacional para la Defensa de los Derechos Socioeconómicos.</p>
      <div style="background: #0A1530; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">ENTE REGULADOR</p>
        <p style="color: #F1F5F9; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">SUNDDE — Superintendencia Nacional para la Defensa de los Derechos Socioeconómicos</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">OBLIGACIÓN</p>
        <p style="color: #0EA5E9; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">Registro de Precios Justos</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">VENCIMIENTO</p>
        <p style="color: #22C55E; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">31 de marzo de 2026</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">RIESGO DE MULTA</p>
        <p style="color: #F59E0B; font-size: 13px; font-weight: 600; margin: 0;">2.000-50.000 UT + ocupación temporal + comiso de mercancía</p>
      </div>
      <div style="background: #0A1530; border-left: 3px solid #0EA5E9; padding: 12px 16px; border-radius: 0 8px 8px 0;">
        <p style="color: #94A3B8; font-size: 12px; margin: 0;"><strong style="color: #0EA5E9;">Base Legal:</strong> Ley Orgánica de Precios Justos (G.O. 40.340), Art. 49-55</p>
      </div>
    `,
    footer: 'Alerta predictiva generada automáticamente por System Kyron.',
  },
  {
    subject: '[Kyron GACETA] Reforma Tributaria 2026 — Gaceta N° 6.952',
    title: '🚨 ALERTA REGULATORIA: Gaceta Oficial N° 6.952 Extraordinario',
    urgencia: 'critica',
    body: `
      <p style="color: #E2E8F0; font-size: 14px; margin: 0 0 12px 0;">Reforma Tributaria 2026 — Decretos 5.196, 5.197, 5.198. Modificaciones sustanciales al IVA, régimen aduanero y arancel de aduanas. Alícuota de IVA ajustada, nuevas exenciones y modificación de partidas arancelarias.</p>
      <div style="background: #0A1530; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">ENTE EMISOR</p>
        <p style="color: #F1F5F9; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">Presidencia de la República</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">TIPO</p>
        <p style="color: #0EA5E9; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">GACETA OFICIAL EXTRAORDINARIA</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">DECRETOS</p>
        <div style="background: #060E24; border-radius: 6px; padding: 12px; margin: 8px 0;">
          <p style="color: #F59E0B; font-size: 12px; font-weight: 600; margin: 0 0 6px 0;">Decreto 5.196 — Reforma Parcial del IVA</p>
          <p style="color: #94A3B8; font-size: 11px; margin: 0 0 10px 0;">Modifica alícuotas, exenciones y régimen de contribuyentes especiales.</p>
          <p style="color: #F59E0B; font-size: 12px; font-weight: 600; margin: 0 0 6px 0;">Decreto 5.197 — Reforma Ley de Aduanas</p>
          <p style="color: #94A3B8; font-size: 11px; margin: 0 0 10px 0;">Nuevos procedimientos de importación/exportación y valoración aduanera.</p>
          <p style="color: #F59E0B; font-size: 12px; font-weight: 600; margin: 0 0 6px 0;">Decreto 5.198 — Reforma Arancel de Aduanas</p>
          <p style="color: #94A3B8; font-size: 11px; margin: 0;">Modificación de partidas arancelarias y tasas de importación.</p>
        </div>
        <p style="color: #64748B; font-size: 11px; margin: 12px 0 4px 0;">VIGENCIA DESDE</p>
        <p style="color: #22C55E; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">01 de enero de 2026</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">ACCIÓN REQUERIDA</p>
        <p style="color: #EF4444; font-size: 13px; margin: 0;">Todas las empresas deben actualizar sus sistemas de facturación y retención de IVA. Importadores y exportadores deben ajustar procedimientos y documentación.</p>
      </div>
    `,
    footer: 'Alerta regulatoria generada por el Monitor Legal de System Kyron.',
  },
  {
    subject: '[Kyron ASAMBLEA NACIONAL] Ley de Protección de Datos Personales',
    title: '🏛️ [Asamblea Nacional] Ley de Protección de Datos Personales',
    urgencia: 'critica',
    body: `
      <p style="color: #E2E8F0; font-size: 14px; margin: 0 0 12px 0;">Primera ley integral de protección de datos personales en Venezuela. Derechos ARCO (Acceso, Rectificación, Cancelación, Oposición). Registro de bases de datos obligatorio.</p>
      <div style="background: #0A1530; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">ENTE EMISOR</p>
        <p style="color: #F1F5F9; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">Asamblea Nacional de Venezuela</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">TIPO DE CAMBIO</p>
        <p style="color: #A78BFA; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">LEY APROBADA</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">SECTORES AFECTADOS</p>
        <p style="color: #0EA5E9; font-size: 13px; font-weight: 600; margin: 0 0 12px 0;">Todos los sectores económicos</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">IMPACTO EMPRESARIAL</p>
        <p style="color: #E2E8F0; font-size: 13px; margin: 0 0 12px 0;">Todas las empresas que manejen datos personales deben designar un Oficial de Protección de Datos y registrar sus bases de datos.</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">ACCIÓN REQUERIDA</p>
        <div style="background: #060E24; border-radius: 6px; padding: 12px; margin: 8px 0;">
          <p style="color: #22C55E; font-size: 12px; margin: 0 0 6px 0;">✅ Designar DPO (Oficial de Protección de Datos)</p>
          <p style="color: #22C55E; font-size: 12px; margin: 0 0 6px 0;">✅ Auditar bases de datos existentes</p>
          <p style="color: #22C55E; font-size: 12px; margin: 0 0 6px 0;">✅ Implementar consentimiento informado</p>
          <p style="color: #22C55E; font-size: 12px; margin: 0;">✅ Registrar ante autoridad de control</p>
        </div>
        <p style="color: #64748B; font-size: 11px; margin: 12px 0 4px 0;">PLAZO DE ADAPTACIÓN</p>
        <p style="color: #F59E0B; font-size: 14px; font-weight: 700; margin: 0;">1 año desde publicación en Gaceta Oficial</p>
      </div>
    `,
    footer: 'Cambio legislativo detectado por el Monitor de la Asamblea Nacional — System Kyron.',
  },
  {
    subject: '[Kyron INPSASEL] Programa de Seguridad y Salud — 30 días',
    title: '🏗️ INPSASEL — Programa de Seguridad y Salud en el Trabajo',
    urgencia: 'alta',
    body: `
      <p style="color: #E2E8F0; font-size: 14px; margin: 0 0 12px 0;">Recordatorio: Tu Programa de Seguridad y Salud en el Trabajo debe ser actualizado antes del 31 de enero de 2026. El INPSASEL exige la actualización anual del programa. Tienes 30 días.</p>
      <div style="background: #0A1530; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">ENTE GUBERNAMENTAL</p>
        <p style="color: #F1F5F9; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">Instituto Nacional de Prevención, Salud y Seguridad Laborales (INPSASEL)</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">OBLIGACIÓN</p>
        <p style="color: #0EA5E9; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">Programa de Seguridad y Salud en el Trabajo</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">VENCIMIENTO</p>
        <p style="color: #F59E0B; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">31 de enero de 2026 (30 días)</p>
        <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">RIESGO DE MULTA</p>
        <p style="color: #EF4444; font-size: 13px; font-weight: 600; margin: 0;">26-75 UT por trabajador + responsabilidad civil/penal en caso de accidente</p>
      </div>
      <div style="background: #0A1530; border-left: 3px solid #F59E0B; padding: 12px 16px; border-radius: 0 8px 8px 0;">
        <p style="color: #94A3B8; font-size: 12px; margin: 0;"><strong style="color: #F59E0B;">Base Legal:</strong> LOPCYMAT Art. 56, 73, 118</p>
      </div>
    `,
    footer: 'El incumplimiento genera responsabilidad civil y penal ante accidentes laborales.',
  },
];

export async function GET() {
  const results = [];
  const destinations = [
    'natanalemattar@gmail.com',
    'alertas_systemkyron@hotmail.com',
  ];
  const timestamp = new Date().toLocaleString('es-VE', { timeZone: 'America/Caracas' });

  for (const to of destinations) {
    for (const alerta of ALERTAS_DEMO) {
      const html = buildKyronEmailTemplate({
        title: alerta.title,
        body: alerta.body,
        footer: alerta.footer,
      });

      const result = await sendEmail({
        to,
        subject: alerta.subject,
        html,
        module: 'legal',
        purpose: 'alert',
      });

      results.push({
        to,
        subject: alerta.subject,
        urgencia: alerta.urgencia,
        success: result.success,
        provider: result.provider,
        error: result.error || null,
      });
    }
  }

  return NextResponse.json({
    message: `${results.length} alertas de prueba enviadas a ${destinations.length} destinos`,
    destinations,
    timestamp,
    results,
  });
}
