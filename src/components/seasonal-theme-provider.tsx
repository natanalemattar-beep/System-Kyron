"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { getActiveEvent, SeasonalEvent } from '@/lib/seasonal-themes';

interface SeasonalThemeContextType {
  activeEvent: SeasonalEvent | null;
  isEnabled: boolean;
  toggleEnabled: () => void;
}

const SeasonalThemeContext = createContext<SeasonalThemeContextType>({
  activeEvent: null,
  isEnabled: true,
  toggleEnabled: () => {},
});

export function useSeasonalTheme() {
  return useContext(SeasonalThemeContext);
}

const STORAGE_KEY = 'kyron-seasonal-theme-enabled';

export function SeasonalThemeProvider({ children }: { children: ReactNode }) {
  const [activeEvent, setActiveEvent] = useState<SeasonalEvent | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      setIsEnabled(stored === 'true');
    }

    const event = getActiveEvent();
    setActiveEvent(event);

    if (event) {
      document.documentElement.style.setProperty('--seasonal-accent', event.acento);
      document.documentElement.style.setProperty('--seasonal-accent-secondary', event.acentoSecundario);
      document.documentElement.style.setProperty('--seasonal-gradient', event.gradiente);
    }

    const interval = setInterval(() => {
      const currentEvent = getActiveEvent();
      setActiveEvent(currentEvent);
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleEnabled = useCallback(() => {
    setIsEnabled(prev => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  return (
    <SeasonalThemeContext.Provider value={{ activeEvent, isEnabled, toggleEnabled }}>
      {children}
    </SeasonalThemeContext.Provider>
  );
}
