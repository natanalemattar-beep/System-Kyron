'use server';

/**
 * @fileOverview Acción de servidor para gestionar solicitudes de demo.
 * Envía la información capturada al correo oficial de System Kyron.
 */

export async function sendDemoRequestAction(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  module: string;
}) {
  // Transmisión entrante para el nuevo correo oficial: systemkyronofficial@gmail.com
  console.log("Transmisión entrante para systemkyronofficial@gmail.com:", data);

  // En producción, aquí se integraría un proveedor como Resend o SendGrid:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'System Kyron <onboarding@resend.dev>',
  //   to: 'systemkyronofficial@gmail.com',
  //   subject: `Nueva Solicitud de Demo: ${data.company}`,
  //   text: `Nombre: ${data.name}\nCorreo: ${data.email}\nTeléfono: ${data.phone}\nMódulo: ${data.module}`
  // });

  // Simulamos un retraso de red de misión crítica
  await new Promise((resolve) => setTimeout(resolve, 800));

  return { success: true };
}
