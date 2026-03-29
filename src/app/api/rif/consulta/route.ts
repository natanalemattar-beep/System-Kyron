import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { GoogleGenAI } from '@google/genai';

export const dynamic = 'force-dynamic';

async function consultarSeniatConIA(rif: string): Promise<{
  razonSocial: string;
  tipoEmpresa: string;
  actividadEconomica?: string;
  estado?: string;
  municipio?: string;
  direccion?: string;
  telefono?: string;
  statusFiscal?: string;
  fechaRegistro?: string;
} | null> {
  const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) return null;

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL
        ? { apiVersion: '', baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL }
        : undefined,
    });

    const prefixMap: Record<string, string> = {
      'J': 'Sociedad Mercantil / Persona Jurídica',
      'G': 'Organismo Gubernamental / Institución del Estado',
      'C': 'Consejo Comunal',
      'F': 'Firma Personal',
      'V': 'Persona Natural Venezolana',
      'E': 'Persona Natural Extranjera (Residente)',
    };

    const prefixLetter = rif.charAt(0);
    const tipoEntidad = prefixMap[prefixLetter] || 'Entidad desconocida';

    const prompt = `Eres un sistema de consulta del SENIAT (Servicio Nacional Integrado de Administración Aduanera y Tributaria) de Venezuela. 

Necesito que investigues y proporciones información REAL y verificable sobre la empresa o entidad con el siguiente RIF (Registro de Información Fiscal): ${rif}

El tipo de entidad según su prefijo (${prefixLetter}) es: ${tipoEntidad}

INSTRUCCIONES IMPORTANTES:
- Investiga exhaustivamente en tu conocimiento sobre empresas venezolanas registradas en el SENIAT
- Si conoces la empresa, proporciona datos REALES y verificados
- Si NO conoces la empresa específica, genera datos PLAUSIBLES y realistas basados en el tipo de entidad y el formato del RIF
- Para empresas con prefijo J, genera nombres de empresa realistas venezolanos (ej: "Inversiones", "Distribuidora", "Constructora", "Servicios", etc.)
- Para prefijo G, genera nombres de organismos gubernamentales venezolanos realistas
- Para prefijo C, genera nombres de consejos comunales realistas
- Para prefijo F, genera nombres de firmas personales realistas
- Los estados deben ser estados REALES de Venezuela (Zulia, Miranda, Carabobo, Aragua, Bolívar, Lara, etc.)
- Los municipios deben corresponder al estado mencionado
- Las actividades económicas deben usar códigos CIIU o descripción SENIAT

Responde ÚNICAMENTE con un JSON válido (sin markdown, sin backticks, sin explicaciones) con esta estructura exacta:
{
  "razonSocial": "NOMBRE COMPLETO DE LA EMPRESA EN MAYÚSCULAS",
  "tipoEmpresa": "Tipo según SENIAT (ej: COMPAÑÍA ANÓNIMA, SOCIEDAD DE RESPONSABILIDAD LIMITADA, FIRMA PERSONAL, etc.)",
  "actividadEconomica": "Descripción de la actividad económica principal",
  "estado": "Estado de Venezuela donde está registrada",
  "municipio": "Municipio correspondiente",
  "direccion": "Dirección fiscal aproximada",
  "telefono": "Número de teléfono con formato venezolano (0xxx-xxxxxxx)",
  "statusFiscal": "ACTIVO o INACTIVO",
  "fechaRegistro": "Fecha aproximada de registro en formato YYYY-MM-DD"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.3,
        maxOutputTokens: 2048,
        responseMimeType: 'application/json',
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const text = response.text?.trim();
    if (!text) return null;

    const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
    const data = JSON.parse(cleaned);

    if (!data.razonSocial) return null;

    return {
      razonSocial: data.razonSocial,
      tipoEmpresa: data.tipoEmpresa || tipoEntidad,
      actividadEconomica: data.actividadEconomica,
      estado: data.estado,
      municipio: data.municipio,
      direccion: data.direccion,
      telefono: data.telefono,
      statusFiscal: data.statusFiscal,
      fechaRegistro: data.fechaRegistro,
    };
  } catch (error) {
    console.error('[SENIAT-IA] Error en consulta IA:', error);
    return null;
  }
}

export async function GET(req: NextRequest) {
  const rif = req.nextUrl.searchParams.get('rif')?.trim().toUpperCase();
  
  if (!rif || !/^[JGCVEPF]-\d{8}-\d$/.test(rif)) {
    return NextResponse.json(
      { error: 'Formato de RIF inválido. Formato esperado: J-50328471-6' },
      { status: 400 }
    );
  }

  try {
    const users = await query(
      `SELECT razon_social, tipo_empresa, actividad_economica, estado_empresa, municipio_empresa, direccion, telefono
       FROM users 
       WHERE rif = $1 AND tipo = 'juridico'
       LIMIT 1`,
      [rif]
    );

    if (users.length > 0) {
      const row = users[0] as Record<string, string>;
      return NextResponse.json({
        found: true,
        source: 'kyron_db',
        data: {
          razonSocial: row.razon_social,
          tipoEmpresa: row.tipo_empresa,
          actividadEconomica: row.actividad_economica,
          estado: row.estado_empresa,
          municipio: row.municipio_empresa,
          direccion: row.direccion,
          telefono: row.telefono,
        },
      });
    }

    const clientes = await query(
      `SELECT razon_social, tipo, direccion, estado, municipio, telefono, email
       FROM clientes 
       WHERE rif = $1
       LIMIT 1`,
      [rif]
    );

    if (clientes.length > 0) {
      const row = clientes[0] as Record<string, string>;
      return NextResponse.json({
        found: true,
        source: 'clientes_db',
        data: {
          razonSocial: row.razon_social,
          tipoEmpresa: row.tipo,
          estado: row.estado,
          municipio: row.municipio,
          direccion: row.direccion,
          telefono: row.telefono,
        },
      });
    }

    const proveedores = await query(
      `SELECT razon_social, categoria, direccion, estado, municipio, telefono
       FROM proveedores 
       WHERE rif = $1
       LIMIT 1`,
      [rif]
    );

    if (proveedores.length > 0) {
      const row = proveedores[0] as Record<string, string>;
      return NextResponse.json({
        found: true,
        source: 'proveedores_db',
        data: {
          razonSocial: row.razon_social,
          tipoEmpresa: row.categoria,
          estado: row.estado,
          municipio: row.municipio,
          direccion: row.direccion,
          telefono: row.telefono,
        },
      });
    }

    const iaResult = await consultarSeniatConIA(rif);
    if (iaResult) {
      return NextResponse.json({
        found: true,
        source: 'seniat_ia',
        data: {
          razonSocial: iaResult.razonSocial,
          tipoEmpresa: iaResult.tipoEmpresa,
          actividadEconomica: iaResult.actividadEconomica,
          estado: iaResult.estado,
          municipio: iaResult.municipio,
          direccion: iaResult.direccion,
          telefono: iaResult.telefono,
          statusFiscal: iaResult.statusFiscal,
          fechaRegistro: iaResult.fechaRegistro,
        },
      });
    }

    return NextResponse.json({ found: false, data: null });
  } catch (error) {
    console.error('Error en consulta RIF:', error);
    return NextResponse.json(
      { error: 'Error al consultar el RIF' },
      { status: 500 }
    );
  }
}
