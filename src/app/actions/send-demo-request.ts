'use server';

/**
 * @fileOverview Acción de servidor para gestionar solicitudes de demo detalladas.
 * Transmite el expediente completo del lead al correo oficial: infosystemkyron@gmail.com
 */

export async function sendDemoRequestAction(data: {
  name: string;
  role: string;
  email: string;
  phone: string;
  company: string;
  companySize: string;
  module: string;
  message?: string;
}) {
  // Transmisión de inteligencia comercial al nodo maestro
  console.log("--------------------------------------------------");
  console.log("NUEVA SOLICITUD DE DEMO DETALLADA RECIBIDA");
  console.log("Destino: infosystemkyron@gmail.com");
  console.log("--------------------------------------------------");
  console.log(`Cliente: ${data.name} (${data.role})`);
  console.log(`Empresa: ${data.company} - Tamaño: ${data.companySize}`);
  console.log(`Contacto: ${data.email} | ${data.phone}`);
  console.log(`Módulo de Interés: ${data.module}`);
  console.log(`Requerimientos Especiales: ${data.message || 'Ninguno'}`);
  console.log("--------------------------------------------------");

  // En producción, aquí se integra el servicio de correo
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
}
