import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getOrCreateConfig(userId: number) {
  let config = await queryOne(
    `SELECT id, idioma, moneda_preferida, zona_horaria,
            notif_email, notif_whatsapp, telefono_whatsapp,
            notif_sms, telefono_sms,
            notif_vencimientos, notif_pagos,
            iva_pct::text, igtf_pct::text, islr_pct::text,
            rif_empresa, nombre_comercial, logo_url, pie_factura,
            email_verificacion, email_alertas, updated_at
     FROM configuracion_usuario WHERE user_id = $1`,
    [userId]
  );

  if (!config) {
    const [row] = await query(
      `INSERT INTO configuracion_usuario (user_id)
       VALUES ($1)
       RETURNING id, idioma, moneda_preferida, zona_horaria,
                 notif_email, notif_whatsapp, telefono_whatsapp,
                 notif_sms, telefono_sms,
                 notif_vencimientos, notif_pagos,
                 iva_pct::text, igtf_pct::text, islr_pct::text,
                 rif_empresa, nombre_comercial, logo_url, pie_factura,
                 email_verificacion, email_alertas, updated_at`,
      [userId]
    );
    config = row;
  }

  return config;
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const config = await getOrCreateConfig(session.userId);
  return NextResponse.json({ config });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const {
    idioma, moneda_preferida, zona_horaria,
    notif_email, notif_whatsapp, telefono_whatsapp,
    notif_sms, telefono_sms,
    notif_vencimientos, notif_pagos,
    iva_pct, igtf_pct, islr_pct,
    rif_empresa, nombre_comercial, logo_url, pie_factura,
    email_verificacion, email_alertas
  } = body;

  await getOrCreateConfig(session.userId);

  const [config] = await query(
    `UPDATE configuracion_usuario
     SET idioma             = COALESCE($1,  idioma),
         moneda_preferida   = COALESCE($2,  moneda_preferida),
         zona_horaria       = COALESCE($3,  zona_horaria),
         notif_email        = COALESCE($4,  notif_email),
         notif_whatsapp     = COALESCE($5,  notif_whatsapp),
         telefono_whatsapp  = COALESCE($6,  telefono_whatsapp),
         notif_sms          = COALESCE($7,  notif_sms),
         telefono_sms       = COALESCE($8,  telefono_sms),
         notif_vencimientos = COALESCE($9,  notif_vencimientos),
         notif_pagos        = COALESCE($10, notif_pagos),
         iva_pct            = COALESCE($11, iva_pct),
         igtf_pct           = COALESCE($12, igtf_pct),
         islr_pct           = COALESCE($13, islr_pct),
         rif_empresa        = COALESCE($14, rif_empresa),
         nombre_comercial   = COALESCE($15, nombre_comercial),
         logo_url           = COALESCE($16, logo_url),
         pie_factura        = COALESCE($17, pie_factura),
         email_verificacion = COALESCE($18, email_verificacion),
         email_alertas      = COALESCE($19, email_alertas),
         updated_at         = NOW()
     WHERE user_id = $20
     RETURNING id, idioma, moneda_preferida, notif_whatsapp, telefono_whatsapp,
               notif_sms, telefono_sms, iva_pct::text, igtf_pct::text,
               email_verificacion, email_alertas, updated_at`,
    [
      idioma ?? null,
      moneda_preferida ?? null,
      zona_horaria ?? null,
      notif_email !== undefined ? notif_email : null,
      notif_whatsapp !== undefined ? notif_whatsapp : null,
      telefono_whatsapp ?? null,
      notif_sms !== undefined ? notif_sms : null,
      telefono_sms ?? null,
      notif_vencimientos !== undefined ? notif_vencimientos : null,
      notif_pagos !== undefined ? notif_pagos : null,
      iva_pct ? parseFloat(iva_pct) : null,
      igtf_pct ? parseFloat(igtf_pct) : null,
      islr_pct ? parseFloat(islr_pct) : null,
      rif_empresa ?? null,
      nombre_comercial ?? null,
      logo_url ?? null,
      pie_factura ?? null,
      email_verificacion ?? null,
      email_alertas ?? null,
      session.userId,
    ]
  );

  return NextResponse.json({ success: true, config });
}
