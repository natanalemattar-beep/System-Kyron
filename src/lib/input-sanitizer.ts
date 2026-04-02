export function sanitizeString(input: string, maxLength = 1000): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript\s*:/gi, '')
    .trim()
    .slice(0, maxLength);
}

export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase().slice(0, 254);
}

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 254;
}

export function isStrongPassword(password: string): { valid: boolean; reason?: string } {
  if (password.length < 8) return { valid: false, reason: 'Mínimo 8 caracteres' };
  if (password.length > 128) return { valid: false, reason: 'Máximo 128 caracteres' };
  if (!/[A-Z]/.test(password)) return { valid: false, reason: 'Debe contener al menos una mayúscula' };
  if (!/[a-z]/.test(password)) return { valid: false, reason: 'Debe contener al menos una minúscula' };
  if (!/[0-9]/.test(password)) return { valid: false, reason: 'Debe contener al menos un número' };
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) return { valid: false, reason: 'Debe contener al menos un carácter especial (!@#$%...)' };
  const commonPatterns = ['password', '12345678', 'qwerty', 'abcdefg', 'letmein', 'admin123', 'welcome1'];
  if (commonPatterns.some(p => password.toLowerCase().includes(p))) {
    return { valid: false, reason: 'La contraseña contiene un patrón demasiado común' };
  }
  return { valid: true };
}

export function sanitizeSearchParam(param: string, maxLength = 200): string {
  return param.replace(/[<>"'`;]/g, '').trim().slice(0, maxLength);
}
