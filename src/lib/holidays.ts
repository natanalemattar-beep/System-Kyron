
export type Holiday = {
  name: string;
  country: string; // 'ALL' for global
  month: number; // 0-11 (Jan-Dec)
  day: number;
  duration: number; // in days
  effect: 'snow' | 'fireworks';
};

// List of holidays. More can be added here.
export const holidays: Holiday[] = [
  {
    name: "Año Nuevo",
    country: "ALL",
    month: 0, // Enero
    day: 1,
    duration: 5,
    effect: 'fireworks',
  },
  {
    name: "Carnaval",
    country: "VE", // Venezuela
    month: 1, // Febrero
    day: 12, // Approximate start, varies each year. For demo purposes.
    duration: 2,
    effect: 'fireworks',
  },
  {
    name: "Día de la Independencia",
    country: "VE", // Venezuela
    month: 6, // Julio
    day: 5,
    duration: 1,
    effect: 'fireworks',
  },
  {
    name: "Navidad",
    country: "ALL",
    month: 11, // Diciembre
    day: 1,
    duration: 31, // Christmas season lasts for the whole month
    effect: 'snow',
  },
];
