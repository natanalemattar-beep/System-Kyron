
export type Holiday = {
  name: string;
  country: string; // 'ALL' for global
  month: number; // 0-11 (Jan-Dec)
  day: number;
  duration: number; // in days
  effect: 'snow' | 'confetti';
};

// List of holidays. More can be added here.
const holidays: Holiday[] = [
  {
    name: "Año Nuevo",
    country: "ALL",
    month: 0, // Enero
    day: 1,
    duration: 1,
    effect: 'confetti',
  },
  {
    name: "Carnaval",
    country: "VE", // Venezuela
    month: 1, // Febrero
    day: 12, // Approximate start, varies each year. For demo purposes.
    duration: 2,
    effect: 'confetti',
  },
  {
    name: "Día de la Independencia",
    country: "VE", // Venezuela
    month: 6, // Julio
    day: 5,
    duration: 1,
    effect: 'confetti',
  },
  {
    name: "Navidad",
    country: "ALL",
    month: 11, // Diciembre
    day: 1,
    duration: 31,
    effect: 'snow',
  },
];

/**
 * Checks if the current date falls within any of the defined holidays.
 * @returns The active Holiday object or null if no holiday is active.
 */
export function getCurrentHoliday(): Holiday | null {
  // --- TEMPORARY FOR DEMONSTRATION ---
  // This line forces the Christmas holiday to be active so you can see the effect.
  // I will remove this later to restore the real-date functionality.
  return holidays.find(h => h.name === "Navidad") || null;
  // --- END TEMPORARY ---

  /*
  // Original logic based on real date:
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();

  for (const holiday of holidays) {
    const holidayEndDate = new Date(now.getFullYear(), holiday.month, holiday.day + holiday.duration - 1);
    const holidayStartDate = new Date(now.getFullYear(), holiday.month, holiday.day);

    if (now >= holidayStartDate && now <= holidayEndDate) {
      // For now, we are not filtering by country, but this is where you would add logic
      // to check the user's region against `holiday.country`.
      return holiday;
    }
  }

  return null;
  */
}
