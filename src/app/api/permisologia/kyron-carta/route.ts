import { NextRequest, NextResponse } from "next/server";

const EMPRESA = {
  denominacion: "SYSTEM KYRON",
  emprendimiento: "Carlos Mattar",
  rif: "J-12345678-0",
  direccion: "Caracas, Distrito Capital, Venezuela",
  telefono: "+58 412-000-0000",
  email: "info@systemkyron.com",
  representante: {
    nombre: "Carlos Mattar",
    cedula: "V-00.000.000",
    cargo: "Fundador y Director General",
  },
  objetoSocial:
    "Desarrollo de soluciones tecnológicas, telecomunicaciones, consultoría corporativa, contabilidad, recursos humanos, facturación electrónica, y servicios jurídicos.",
};

type PermisoCarta = {
  id: string;
  permiso: string;
  organismo: string;
  descripcion: string;
  baseLegal?: string;
  requisitos: string[];
  tipo: "inscripcion" | "renovacion";
};

function generarTextoCarta(p: PermisoCarta): string {
  const fecha = new Date().toLocaleDateString("es-VE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return [
    `Caracas, ${fecha}.`,
    "",
    `Ciudadano(a)`,
    `Director(a) General`,
    `${p.organismo}`,
    `Su Despacho.-`,
    "",
    `REF.: SOLICITUD DE ${p.tipo === "inscripcion" ? "INSCRIPCIÓN" : "RENOVACIÓN"} — ${p.permiso.toUpperCase()}`,
    "",
    `Yo, ${EMPRESA.representante.nombre}, venezolano, mayor de edad, titular de la cédula de identidad N° ${EMPRESA.representante.cedula}, actuando en mi carácter de ${EMPRESA.representante.cargo} de "${EMPRESA.denominacion}", emprendimiento del ciudadano ${EMPRESA.emprendimiento}, domiciliada en ${EMPRESA.direccion} e identificada con el RIF N° ${EMPRESA.rif}, por medio de la presente me dirijo a usted respetuosamente para solicitar la ${p.tipo === "inscripcion" ? "inscripción" : "renovación"} del siguiente permiso:`,
    "",
    `PERMISO SOLICITADO: ${p.permiso}`,
    `ORGANISMO EMISOR: ${p.organismo}`,
    p.baseLegal ? `BASE LEGAL: ${p.baseLegal}` : null,
    "",
    `OBJETO SOCIAL: ${EMPRESA.objetoSocial}`,
    "",
    `A tal efecto, consigno los siguientes recaudos:`,
    "",
    ...p.requisitos.map((r, i) => `${i + 1}. ${r}`),
    "",
    `Sin otro particular al cual hacer referencia, quedo de usted.`,
    "",
    `Atentamente,`,
    "",
    `_________________________`,
    `${EMPRESA.representante.nombre}`,
    `${EMPRESA.representante.cargo}`,
    `${EMPRESA.denominacion}`,
    `RIF: ${EMPRESA.rif}`,
    `Emprendimiento: ${EMPRESA.emprendimiento}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(req: NextRequest) {
  try {
    const body: PermisoCarta = await req.json();

    if (!body.permiso || !body.organismo) {
      return NextResponse.json(
        { error: "permiso y organismo son requeridos" },
        { status: 400 }
      );
    }

    const carta = generarTextoCarta(body);

    return NextResponse.json({
      carta,
      empresa: {
        denominacion: EMPRESA.denominacion,
        emprendimiento: EMPRESA.emprendimiento,
        rif: EMPRESA.rif,
        representante: EMPRESA.representante,
      },
      permiso: body.permiso,
      organismo: body.organismo,
      fecha: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al generar la carta" },
      { status: 500 }
    );
  }
}
