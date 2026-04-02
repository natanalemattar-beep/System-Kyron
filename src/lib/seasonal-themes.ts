export interface SeasonalEvent {
  id: string;
  nombre: string;
  emoji: string;
  particulas: string[];
  gradiente: string;
  acento: string;
  acentoSecundario: string;
  saludo: string;
  getRange: (year: number) => { inicio: Date; fin: Date };
}

function getEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

function getNthSundayOfMonth(year: number, month: number, n: number): Date {
  const first = new Date(year, month, 1);
  const dayOfWeek = first.getDay();
  const firstSunday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
  return new Date(year, month, firstSunday + (n - 1) * 7);
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export const SEASONAL_EVENTS: SeasonalEvent[] = [
  {
    id: 'ano-nuevo',
    nombre: 'Año Nuevo',
    emoji: '🎆',
    particulas: ['🎆', '🎇', '✨', '🥂', '🎉', '🎊'],
    gradiente: 'linear-gradient(135deg, rgba(234,179,8,0.08), rgba(168,85,247,0.06))',
    acento: '#EAB308',
    acentoSecundario: '#A855F7',
    saludo: '¡Feliz Año Nuevo!',
    getRange: (year) => ({
      inicio: new Date(year, 0, 1),
      fin: new Date(year, 0, 6),
    }),
  },
  {
    id: 'san-valentin',
    nombre: 'San Valentín',
    emoji: '💝',
    particulas: ['❤️', '💕', '💖', '💗', '🌹', '💝'],
    gradiente: 'linear-gradient(135deg, rgba(244,63,94,0.07), rgba(251,113,133,0.05))',
    acento: '#F43F5E',
    acentoSecundario: '#FB7185',
    saludo: '¡Feliz Día de San Valentín!',
    getRange: (year) => ({
      inicio: new Date(year, 1, 12),
      fin: new Date(year, 1, 15),
    }),
  },
  {
    id: 'carnavales',
    nombre: 'Carnavales',
    emoji: '🎭',
    particulas: ['🎭', '🎶', '💃', '🪘', '🎊', '🪅'],
    gradiente: 'linear-gradient(135deg, rgba(168,85,247,0.07), rgba(236,72,153,0.05), rgba(14,165,233,0.04))',
    acento: '#A855F7',
    acentoSecundario: '#EC4899',
    saludo: '¡Felices Carnavales!',
    getRange: (year) => {
      const easter = getEasterDate(year);
      return {
        inicio: addDays(easter, -49),
        fin: addDays(easter, -46),
      };
    },
  },
  {
    id: 'semana-santa',
    nombre: 'Semana Santa',
    emoji: '✝️',
    particulas: ['🕊️', '✝️', '🌿', '🙏', '☀️', '🕯️'],
    gradiente: 'linear-gradient(135deg, rgba(168,85,247,0.06), rgba(234,179,8,0.04))',
    acento: '#7C3AED',
    acentoSecundario: '#D97706',
    saludo: '¡Feliz Semana Santa!',
    getRange: (year) => {
      const easter = getEasterDate(year);
      return {
        inicio: addDays(easter, -7),
        fin: addDays(easter, 1),
      };
    },
  },
  {
    id: 'dia-trabajador',
    nombre: 'Día del Trabajador',
    emoji: '⚒️',
    particulas: ['⚒️', '🛠️', '💪', '👷', '🏗️', '⭐'],
    gradiente: 'linear-gradient(135deg, rgba(239,68,68,0.06), rgba(234,179,8,0.04))',
    acento: '#EF4444',
    acentoSecundario: '#EAB308',
    saludo: '¡Feliz Día del Trabajador!',
    getRange: (year) => ({
      inicio: new Date(year, 4, 1),
      fin: new Date(year, 4, 2),
    }),
  },
  {
    id: 'dia-madres',
    nombre: 'Día de las Madres',
    emoji: '👩‍👧‍👦',
    particulas: ['💐', '🌷', '🌸', '🌺', '💝', '👩‍👧‍👦'],
    gradiente: 'linear-gradient(135deg, rgba(236,72,153,0.07), rgba(244,114,182,0.05))',
    acento: '#EC4899',
    acentoSecundario: '#F472B6',
    saludo: '¡Feliz Día de las Madres!',
    getRange: (year) => {
      const secondSunday = getNthSundayOfMonth(year, 4, 2);
      return {
        inicio: addDays(secondSunday, -1),
        fin: addDays(secondSunday, 1),
      };
    },
  },
  {
    id: 'dia-padres',
    nombre: 'Día del Padre',
    emoji: '👨‍👧‍👦',
    particulas: ['👔', '🏆', '⭐', '💙', '👨‍👧‍👦', '🎖️'],
    gradiente: 'linear-gradient(135deg, rgba(14,165,233,0.07), rgba(6,182,212,0.05))',
    acento: '#0EA5E9',
    acentoSecundario: '#06B6D4',
    saludo: '¡Feliz Día del Padre!',
    getRange: (year) => {
      const thirdSunday = getNthSundayOfMonth(year, 5, 3);
      return {
        inicio: addDays(thirdSunday, -1),
        fin: addDays(thirdSunday, 1),
      };
    },
  },
  {
    id: 'independencia',
    nombre: 'Día de la Independencia',
    emoji: '🇻🇪',
    particulas: ['🇻🇪', '⭐', '🏛️', '🎆', '💛', '💙'],
    gradiente: 'linear-gradient(135deg, rgba(234,179,8,0.07), rgba(37,99,235,0.05), rgba(220,38,38,0.04))',
    acento: '#EAB308',
    acentoSecundario: '#2563EB',
    saludo: '¡Viva Venezuela! Feliz 5 de Julio',
    getRange: (year) => ({
      inicio: new Date(year, 6, 4),
      fin: new Date(year, 6, 6),
    }),
  },
  {
    id: 'halloween',
    nombre: 'Halloween',
    emoji: '🎃',
    particulas: ['🎃', '👻', '🦇', '🕷️', '🕸️', '💀'],
    gradiente: 'linear-gradient(135deg, rgba(249,115,22,0.07), rgba(168,85,247,0.05))',
    acento: '#F97316',
    acentoSecundario: '#A855F7',
    saludo: '¡Feliz Halloween!',
    getRange: (year) => ({
      inicio: new Date(year, 9, 28),
      fin: new Date(year, 10, 1),
    }),
  },
  {
    id: 'navidad',
    nombre: 'Navidad',
    emoji: '🎄',
    particulas: ['🎄', '⭐', '🎅', '🎁', '❄️', '🔔'],
    gradiente: 'linear-gradient(135deg, rgba(220,38,38,0.06), rgba(34,197,94,0.05))',
    acento: '#DC2626',
    acentoSecundario: '#22C55E',
    saludo: '¡Feliz Navidad!',
    getRange: (year) => ({
      inicio: new Date(year, 11, 15),
      fin: new Date(year, 11, 31),
    }),
  },
];

export function getActiveEvent(date: Date = new Date()): SeasonalEvent | null {
  const year = date.getFullYear();
  const now = date.getTime();

  for (const event of SEASONAL_EVENTS) {
    const { inicio, fin } = event.getRange(year);
    inicio.setHours(0, 0, 0, 0);
    fin.setHours(23, 59, 59, 999);
    if (now >= inicio.getTime() && now <= fin.getTime()) {
      return event;
    }
  }
  return null;
}

export function getUpcomingEvents(date: Date = new Date(), count = 3): Array<{ event: SeasonalEvent; daysUntil: number }> {
  const year = date.getFullYear();
  const now = date.getTime();
  const upcoming: Array<{ event: SeasonalEvent; daysUntil: number }> = [];

  for (const event of SEASONAL_EVENTS) {
    for (const y of [year, year + 1]) {
      const { inicio } = event.getRange(y);
      const diff = Math.ceil((inicio.getTime() - now) / (1000 * 60 * 60 * 24));
      if (diff > 0) {
        upcoming.push({ event, daysUntil: diff });
        break;
      }
    }
  }

  return upcoming.sort((a, b) => a.daysUntil - b.daysUntil).slice(0, count);
}
