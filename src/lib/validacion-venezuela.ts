export function validarFormatoCedula(cedula: string): { valid: boolean; error?: string; nacionalidad?: string; numero?: string } {
  const cleaned = cedula.trim().toUpperCase().replace(/\s+/g, '');

  const match = cleaned.match(/^([VEP])-?(\d{5,10})$/);
  if (!match) {
    return { valid: false, error: 'Formato inválido. Use: V-12345678, E-12345678 o P-12345678' };
  }

  const prefix = match[1];
  const numero = match[2];

  const num = parseInt(numero, 10);
  if (num <= 0) {
    return { valid: false, error: 'El número de cédula debe ser mayor a cero' };
  }

  if (num > 99999999) {
    return { valid: false, error: 'El número de cédula no puede exceder 8 dígitos significativos' };
  }

  const nacionalidadMap: Record<string, string> = {
    'V': 'Venezolano(a)',
    'E': 'Extranjero(a)',
    'P': 'Pasaporte',
  };

  return {
    valid: true,
    nacionalidad: nacionalidadMap[prefix],
    numero: `${prefix}-${numero}`,
  };
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
    'J': 'Persona Jurídica (Sociedad Mercantil)',
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
