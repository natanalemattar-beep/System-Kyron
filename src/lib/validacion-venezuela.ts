const CEDULA_MAX_VENEZOLANO = 45_000_000;
const CEDULA_MAX_EXTRANJERO = 99_999_999;

export type CedulaEdadEstimada = {
  rangoEdad: string;
  generacion: string;
};

export function estimarEdadPorCedula(num: number): CedulaEdadEstimada | null {
  if (num <= 0) return null;
  if (num <= 3_000_000) return { rangoEdad: '70+ años', generacion: 'Pre-1955' };
  if (num <= 6_000_000) return { rangoEdad: '60-70 años', generacion: '1955-1965' };
  if (num <= 10_000_000) return { rangoEdad: '50-60 años', generacion: '1965-1975' };
  if (num <= 15_000_000) return { rangoEdad: '40-50 años', generacion: '1975-1985' };
  if (num <= 20_000_000) return { rangoEdad: '35-45 años', generacion: '1980-1990' };
  if (num <= 25_000_000) return { rangoEdad: '28-38 años', generacion: '1988-1998' };
  if (num <= 30_000_000) return { rangoEdad: '22-32 años', generacion: '1994-2004' };
  if (num <= 35_000_000) return { rangoEdad: '18-25 años', generacion: '2000-2008' };
  if (num <= 40_000_000) return { rangoEdad: '14-20 años', generacion: '2006-2012' };
  if (num <= 45_000_000) return { rangoEdad: '10-16 años', generacion: '2010-2016' };
  return null;
}

export function validarFormatoCedula(cedula: string): {
  valid: boolean;
  error?: string;
  nacionalidad?: string;
  numero?: string;
  edadEstimada?: CedulaEdadEstimada;
  info?: string;
} {
  const cleaned = cedula.trim().toUpperCase().replace(/\s+/g, '');

  const match = cleaned.match(/^([VEP])-?(\d{1,10})$/);
  if (!match) {
    return { valid: false, error: 'Formato inválido. Use: V-12345678, E-12345678 o P-12345678' };
  }

  const prefix = match[1];
  const numero = match[2];

  const num = parseInt(numero, 10);
  if (num <= 0) {
    return { valid: false, error: 'El número de cédula debe ser mayor a cero' };
  }

  if (prefix === 'V') {
    if (num > CEDULA_MAX_VENEZOLANO) {
      return {
        valid: false,
        error: `Cédula venezolana fuera de rango. El rango válido es V-1 hasta V-${CEDULA_MAX_VENEZOLANO.toLocaleString('es-VE')}`,
      };
    }

    const edadEstimada = estimarEdadPorCedula(num);

    return {
      valid: true,
      nacionalidad: 'Venezolano(a)',
      numero: `V-${numero}`,
      edadEstimada: edadEstimada || undefined,
      info: edadEstimada
        ? `Cédula venezolana válida · Generación estimada: ${edadEstimada.generacion} (${edadEstimada.rangoEdad})`
        : 'Cédula venezolana válida',
    };
  }

  if (prefix === 'E') {
    if (num > CEDULA_MAX_EXTRANJERO) {
      return {
        valid: false,
        error: 'Número de cédula de residente fuera de rango',
      };
    }

    return {
      valid: true,
      nacionalidad: 'Extranjero(a) Residente',
      numero: `E-${numero}`,
      info: 'Cédula de extranjero residente válida',
    };
  }

  if (prefix === 'P') {
    return {
      valid: true,
      nacionalidad: 'Pasaporte',
      numero: `P-${numero}`,
      info: 'Documento de pasaporte',
    };
  }

  return { valid: false, error: 'Prefijo no reconocido' };
}

export function validarRIF(rif: string): { valid: boolean; error?: string; tipo?: string; digitoVerificador?: number; rifNormalizado?: string } {
  const cleaned = rif.trim().toUpperCase().replace(/\s+/g, '');

  const match = cleaned.match(/^([JGCVEPF])-?(\d{8})-?(\d)$/);
  if (!match) {
    return { valid: false, error: 'Formato inválido. Use: J-12345678-9' };
  }

  const prefix = match[1];
  const cuerpo = match[2];
  const digitoIngresado = parseInt(match[3], 10);

  const prefixValues: Record<string, number> = {
    'V': 1, 'E': 2, 'J': 3, 'P': 4, 'G': 5, 'C': 3, 'F': 1,
  };

  const prefixValue = prefixValues[prefix];
  if (prefixValue === undefined) {
    return { valid: false, error: 'Prefijo de RIF no reconocido' };
  }

  const digits = [prefixValue, ...cuerpo.split('').map(Number)];
  const weights = [4, 3, 2, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * weights[i];
  }

  const remainder = sum % 11;
  let digitoCalculado = 11 - remainder;

  if (digitoCalculado >= 10) {
    digitoCalculado = 0;
  }

  const tipoMap: Record<string, string> = {
    'J': 'Persona Jurídica (Sociedad Mercantil / Fundación / Asociación Civil)',
    'G': 'Organismo Gubernamental',
    'V': 'Persona Natural Venezolana',
    'E': 'Persona Natural Extranjera',
    'P': 'Pasaporte',
    'C': 'Consejo Comunal',
    'F': 'Firma Personal',
  };

  if (digitoIngresado !== digitoCalculado) {
    return {
      valid: false,
      error: `Dígito verificador inválido. Para ${prefix}-${cuerpo}, el dígito correcto es ${digitoCalculado}, se ingresó ${digitoIngresado}`,
      tipo: tipoMap[prefix],
      digitoVerificador: digitoCalculado,
    };
  }

  return {
    valid: true,
    tipo: tipoMap[prefix],
    digitoVerificador: digitoCalculado,
    rifNormalizado: `${prefix}-${cuerpo}-${digitoCalculado}`,
  };
}

export function normalizarCedula(input: string): string {
  const cleaned = input.trim().toUpperCase().replace(/\s+/g, '');
  const match = cleaned.match(/^([VEP])-?(\d+)$/);
  if (!match) return cleaned;
  return `${match[1]}-${match[2]}`;
}

export function normalizarRIF(input: string): string {
  const cleaned = input.trim().toUpperCase().replace(/\s+/g, '');
  const match = cleaned.match(/^([JGCVEPF])-?(\d{8})-?(\d)$/);
  if (!match) return cleaned;
  return `${match[1]}-${match[2]}-${match[3]}`;
}
