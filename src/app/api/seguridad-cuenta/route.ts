import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

export const dynamic = 'force-dynamic';

function parseUserAgent(ua: string | null): { navegador: string; sistema: string; tipo: 'mobile' | 'desktop' } {
  if (!ua) return { navegador: 'Desconocido', sistema: 'Desconocido', tipo: 'desktop' };
  let navegador = 'Navegador';
  if (ua.includes('Edg')) navegador = 'Microsoft Edge';
  else if (ua.includes('Chrome') && !ua.includes('Edg')) navegador = 'Chrome';
  else if (ua.includes('Firefox')) navegador = 'Firefox';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) navegador = 'Safari';
  else if (ua.includes('Opera') || ua.includes('OPR')) navegador = 'Opera';

  let sistema = 'Otro';
  let tipo: 'mobile' | 'desktop' = 'desktop';
  if (ua.includes('iPhone') || ua.includes('iPad')) { sistema = 'iOS'; tipo = 'mobile'; }
  else if (ua.includes('Android')) { sistema = 'Android'; tipo = 'mobile'; }
  else if (ua.includes('Windows')) sistema = 'Windows';
  else if (ua.includes('Macintosh') || ua.includes('Mac OS')) sistema = 'macOS';
  else if (ua.includes('Linux')) sistema = 'Linux';

  return { navegador, sistema, tipo };
}

function maskIp(ip: string | null): string {
  if (!ip) return 'IP oculta';
  if (ip === '127.0.0.1' || ip === '::1') return '127.0.0.x';
  const parts = ip.split('.');
  if (parts.length === 4) return `${parts[0]}.${parts[1]}.${parts[2]}.x`;
  if (ip.includes(':')) {
    const segments = ip.split(':');
    if (segments.length >= 2) return `${segments[0]}:${segments[1]}:***`;
  }
  return 'IP oculta';
}

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const currentUa = req.headers.get('user-agent');
  const currentIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                    req.headers.get('x-real-ip') || null;
  const { navegador, sistema, tipo } = parseUserAgent(currentUa);

  const historial = await query<{
    operacion: string;
    ip_address: string | null;
    user_agent: string | null;
    risk_level: string;
    created_at: string;
    tabla_afectada: string;
    datos_nuevos: Record<string, unknown> | null;
  }>(
    `SELECT operacion, ip_address, user_agent, risk_level, created_at, tabla_afectada, datos_nuevos
     FROM auditoria_detallada
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT 20`,
    [session.userId]
  );

  const user = await queryOne<{
    email: string;
    nombre: string;
    created_at: string;
    email_verificado: boolean;
    telefono_verificado: boolean;
    telefono: string | null;
    ultimo_login: string | null;
  }>(
    `SELECT email, COALESCE(nombre, 'Usuario') as nombre, created_at,
            email_verificado, telefono_verificado, telefono, ultimo_login
     FROM users WHERE id = $1`,
    [session.userId]
  );

  const config = await queryOne<{
    notif_email: boolean;
    notif_whatsapp: boolean;
    notif_sms: boolean;
  }>(
    `SELECT notif_email, notif_whatsapp, notif_sms
     FROM configuracion_usuario WHERE user_id = $1`,
    [session.userId]
  );

  const totalEventos = await queryOne<{ count: string }>(
    `SELECT COUNT(*) as count FROM auditoria_detallada WHERE user_id = $1`,
    [session.userId]
  );

  const eventosAltos = await queryOne<{ count: string }>(
    `SELECT COUNT(*) as count FROM auditoria_detallada WHERE user_id = $1 AND risk_level IN ('high', 'critical')`,
    [session.userId]
  );

  const loginRecientes = await query<{
    ip_address: string | null;
    user_agent: string | null;
    created_at: string;
  }>(
    `SELECT ip_address, user_agent, created_at
     FROM auditoria_detallada
     WHERE user_id = $1 AND operacion = 'LOGIN'
     ORDER BY created_at DESC
     LIMIT 5`,
    [session.userId]
  );

  const sesionesFormateadas = [
    {
      id: 0,
      dispositivo: `${navegador} — ${sistema}`,
      ip: maskIp(currentIp),
      creada: new Date().toISOString(),
      actual: true,
      tipo,
    },
    ...loginRecientes
      .filter(l => {
        const parsed = parseUserAgent(l.user_agent);
        const sameDevice = parsed.navegador === navegador && parsed.sistema === sistema;
        const recent = (Date.now() - new Date(l.created_at).getTime()) < 60000;
        return !(sameDevice && recent);
      })
      .map((l, idx) => {
        const parsed = parseUserAgent(l.user_agent);
        return {
          id: idx + 1,
          dispositivo: `${parsed.navegador} — ${parsed.sistema}`,
          ip: maskIp(l.ip_address),
          creada: l.created_at,
          actual: false,
          tipo: parsed.tipo,
        };
      }),
  ];

  const historialFormateado = historial.map(h => {
    let accion = h.operacion;
    const tabla = h.tabla_afectada;
    if (h.operacion === 'LOGIN') accion = 'Inicio de sesión';
    else if (h.operacion === 'LOGOUT') accion = 'Cierre de sesión';
    else if (h.operacion === 'UPDATE' && tabla === 'users') accion = 'Actualización de datos de cuenta';
    else if (h.operacion === 'UPDATE' && tabla === 'configuracion_usuario') accion = 'Cambio de configuración';
    else if (h.operacion === 'INSERT' && tabla === 'facturas') accion = 'Factura emitida';
    else if (h.operacion === 'UPDATE' && tabla === 'facturas') accion = 'Factura actualizada';
    else if (h.operacion === 'DELETE') accion = `Eliminación de registro (${tabla})`;
    else if (h.operacion === 'INSERT' && tabla === 'notificaciones') accion = 'Notificación generada';
    else if (h.operacion === 'INSERT' && tabla === 'clientes') accion = 'Nuevo cliente registrado';
    else if (h.operacion === 'INSERT') accion = `Nuevo registro (${tabla})`;
    else if (h.operacion === 'UPDATE') accion = `Actualización (${tabla})`;
    else if (h.operacion === 'EXPORT') accion = `Exportación de datos (${tabla})`;
    else if (h.operacion === 'IMPORT') accion = `Importación de datos (${tabla})`;
    else if (h.operacion === 'SELECT') accion = `Consulta de datos (${tabla})`;

    return {
      accion,
      fecha: h.created_at,
      ip: maskIp(h.ip_address),
      riesgo: h.risk_level,
      estado: h.risk_level === 'critical' ? 'bloqueado' : h.risk_level === 'high' ? 'alerta' : 'ok',
    };
  });

  return NextResponse.json({
    usuario: {
      email: user?.email || '',
      nombre: user?.nombre || '',
      creado: user?.created_at || '',
      emailVerificado: user?.email_verificado || false,
      telefonoVerificado: user?.telefono_verificado || false,
      telefono: user?.telefono || null,
      ultimoLogin: user?.ultimo_login || null,
    },
    configuracion: {
      notifEmail: config?.notif_email ?? true,
      notifWhatsapp: config?.notif_whatsapp ?? false,
      notifSms: config?.notif_sms ?? false,
    },
    sesiones: sesionesFormateadas,
    historial: historialFormateado,
    estadisticas: {
      totalSesiones: sesionesFormateadas.length,
      totalEventos: parseInt(totalEventos?.count || '0'),
      eventosAltos: parseInt(eventosAltos?.count || '0'),
    },
  });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { cerrarTodas } = await req.json();

  if (cerrarTodas) {
    await query(
      `UPDATE user_sessions SET activa = false WHERE user_id = $1`,
      [session.userId]
    );

    await query(
      `INSERT INTO auditoria_detallada (user_id, tabla_afectada, operacion, ip_address, user_agent, risk_level, datos_nuevos)
       VALUES ($1, 'user_sessions', 'LOGOUT', $2, $3, 'medium', '{"accion": "cerrar_todas_sesiones"}'::jsonb)`,
      [
        session.userId,
        req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
        req.headers.get('user-agent') || null,
      ]
    );

    return NextResponse.json({ success: true, mensaje: 'Todas las sesiones han sido cerradas' });
  }

  return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 });
}
