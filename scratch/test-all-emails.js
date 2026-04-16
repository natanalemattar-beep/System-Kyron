
const nodemailer = require('nodemailer');
require('dotenv').config();

// ── Logo IMG inline con URL Absoluta (para máxima compatibilidad móvil) ──────────
const logoIMG = `<img src="https://system-kyron.vercel.app/images/logo-transparent.png" width="80" height="80" alt="System Kyron" style="display:block; margin: 0 auto; outline:none; border:none; max-width:80px; max-height:80px;" />`;

function buildTemplate({ title, body, code, magicLink, footer, badge, accent }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — System Kyron</title>
</head>
<body style="margin:0;padding:0;background-color:#060D1F;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#060D1F;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0EA5E9,#22C55E);border-radius:20px 20px 0 0;padding:2px 2px 0 2px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#060D1F;border-radius:18px 18px 0 0;padding:36px 40px 28px 40px;text-align:center;">
                    ${logoIMG}
                    <p style="margin:14px 0 2px 0;color:#F1F5F9;font-size:16px;font-weight:800;letter-spacing:5px;text-transform:uppercase;">SYSTEM KYRON</p>
                    <p style="margin:0;color:#475569;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Inteligencia Corporativa · Venezuela</p>
                    <div style="margin-top:18px;">
                      <span style="display:inline-block;background:${badge.color};color:#fff;font-size:9px;font-weight:800;letter-spacing:2px;text-transform:uppercase;padding:6px 18px;border-radius:20px;">${badge.text}</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:linear-gradient(135deg,#0EA5E9,#22C55E);padding:0 2px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#0A1225;padding:36px 44px;">
                    <h1 style="margin:0 0 14px 0;color:#F1F5F9;font-size:22px;font-weight:700;text-align:center;line-height:1.3;">${title}</h1>
                    <p style="margin:0 0 30px 0;color:#94A3B8;font-size:14px;line-height:1.75;text-align:center;">${body}</p>

                    ${magicLink ? `
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                      <tr>
                        <td align="center">
                          <a href="${magicLink}" style="display:inline-block;background:linear-gradient(135deg,#0EA5E9,#22C55E);color:#fff;font-size:13px;font-weight:800;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:18px 48px;border-radius:14px;">
                            ✓ &nbsp;Verificar mi identidad
                          </a>
                          <p style="margin:10px 0 0 0;color:#475569;font-size:11px;">Expira en <strong style="color:#F59E0B;">15 minutos</strong></p>
                        </td>
                      </tr>
                    </table>` : ''}

                    ${code ? `
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:30px;">
                      <tr>
                        <td style="background:#060D1F;border:2px solid ${accent};border-radius:16px;padding:30px;text-align:center;">
                          <p style="margin:0 0 8px 0;color:#64748B;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Código de Verificación</p>
                          <p style="margin:0 0 10px 0;color:${accent};font-size:48px;font-weight:900;letter-spacing:14px;font-family:'Courier New',Courier,monospace;">${code}</p>
                          <p style="margin:0;color:#475569;font-size:12px;">Válido por <strong style="color:#F59E0B;">10 minutos</strong> &nbsp;·&nbsp; No lo compartas</p>
                        </td>
                      </tr>
                    </table>` : ''}

                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:6px;">
                      <tr><td style="border-top:1px solid #1E293B;font-size:0;">&nbsp;</td></tr>
                    </table>

                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">
                      <tr>
                        <td style="background:#0F172A;border-left:3px solid #F59E0B;border-radius:0 10px 10px 0;padding:14px 18px;">
                          <p style="margin:0;color:#94A3B8;font-size:12px;line-height:1.6;">
                            <strong style="color:#F59E0B;">🔒 Seguridad:</strong> ${footer ?? 'Nunca compartiremos tu información. Si no solicitaste esto, ignora este mensaje.'}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0EA5E9,#22C55E);border-radius:0 0 20px 20px;padding:0 2px 2px 2px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#060D1F;border-radius:0 0 18px 18px;padding:22px 40px 26px 40px;text-align:center;">
                    <p style="margin:0 0 5px 0;color:#334155;font-size:11px;">© 2026 System Kyron · Todos los derechos reservados</p>
                    <p style="margin:0;color:#1E293B;font-size:10px;letter-spacing:1px;">LOTTT · LOPCYMAT · VEN-NIF · ISO 27001</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendAllTemplates() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', port: 587, secure: false,
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });

  await transporter.verify();
  const to = 'natanalemattar@gmail.com';
  console.log('✅ SMTP verificado. Enviando correos a', to);

  // 1. Código de verificación
  await transporter.sendMail({
    from: `"System Kyron" <${process.env.GMAIL_USER}>`,
    to, subject: '🔐 Nuevo Código de Acceso — System Kyron',
    html: buildTemplate({
      title: 'Código de Acceso Solicitado',
      body: 'Ingresaste desde un nuevo dispositivo. Usa el siguiente código de 6 dígitos para completar tu verificación.',
      code: '741258',
      badge: { color: '#0EA5E9', text: 'VERIFICACIÓN DE IDENTIDAD' },
      accent: '#0EA5E9',
      footer: 'Nunca compartas este código. Expira en 10 minutos.'
    })
  });
  console.log('✅ #1 Código enviado.');

  // 2. Magic Link
  await transporter.sendMail({
    from: `"System Kyron" <${process.env.GMAIL_USER}>`,
    to, subject: '⚡ Nuevo Enlace de Ingreso — System Kyron',
    html: buildTemplate({
      title: 'Ingreso Inmediato Sin Contraseña',
      body: 'Haz clic en el botón de abajo para acceder al panel de System Kyron de forma segura, sin necesidad de contraseña.',
      magicLink: 'https://system-kyron.vercel.app/auth/verify?token=demo123',
      badge: { color: '#22C55E', text: 'ENLACE SEGURO' },
      accent: '#22C55E',
      footer: 'Este enlace es de un solo uso y expira automáticamente en 15 minutos.'
    })
  });
  console.log('✅ #2 Magic Link enviado.');

  // 3. Alerta de seguridad
  await transporter.sendMail({
    from: `"System Kyron Alertas" <${process.env.GMAIL_USER}>`,
    to, subject: '⚠️ Nueva Alerta de Seguridad (Acceso)',
    html: buildTemplate({
      title: 'Inicio de Sesión Desde Nuevo Dispositivo',
      body: 'Detectamos un acceso a tu cuenta de System Kyron desde un dispositivo no reconocido.<br><br><strong style="color:#F59E0B;">Dispositivo:</strong> Windows 11 · Chrome 124<br><strong style="color:#F59E0B;">Módulo:</strong> Facturación Electrónica<br><strong style="color:#F59E0B;">Hora:</strong> ' + new Date().toLocaleString('es-VE') + '<br><strong style="color:#F59E0B;">IP Estimada:</strong> Caracas, Distrito Capital',
      badge: { color: '#EF4444', text: '⚠ ALERTA DE SEGURIDAD' },
      accent: '#F59E0B',
      footer: 'Si no reconoces este acceso, cambia tu contraseña inmediatamente o contacta soporte: soporte@systemkyron.com'
    })
  });
  console.log('✅ #3 Alerta enviada.');

  // 4. Bienvenida
  await transporter.sendMail({
    from: `"System Kyron" <${process.env.GMAIL_USER}>`,
    to, subject: '🎉 Te Damos la Bienvenida a Kyron',
    html: buildTemplate({
      title: 'Tu Expediente Corporativo Está Listo',
      body: 'Tu cuenta ha sido creada y verificada exitosamente. Ya tienes acceso completo a los módulos activados de System Kyron. Puedes comenzar invitando a tu equipo desde el panel de administración.',
      badge: { color: '#22C55E', text: 'BIENVENIDO' },
      accent: '#22C55E',
      footer: 'Ante cualquier duda o solicitud de soporte, escríbenos a soporte@systemkyron.com'
    })
  });
  console.log('✅ #4 Bienvenida enviada.');

  console.log('\n🎉 TODOS LOS CORREOS ENVIADOS CORRECTAMENTE CON EL NUEVO DISEÑO (VERSIÓN FINAL).');
}

sendAllTemplates().catch(console.error);
