'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface Preferences {
  reducir_animaciones: boolean;
  nav_lateral: boolean;
}

interface PreferencesContextValue {
  prefs: Preferences;
  updatePref: (key: keyof Preferences, value: boolean) => void;
  loading: boolean;
}

const defaultPrefs: Preferences = {
  reducir_animaciones: false,
  nav_lateral: false,
};

const LOCAL_KEY = 'kyron-ui-prefs';

const PreferencesContext = createContext<PreferencesContextValue>({
  prefs: defaultPrefs,
  updatePref: () => {},
  loading: true,
});

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Preferences>(defaultPrefs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      try {
        setPrefs({ ...defaultPrefs, ...JSON.parse(stored) });
      } catch {}
    }

    fetch('/api/configuracion')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.config) {
          const serverPrefs: Preferences = {
            reducir_animaciones: data.config.reducir_animaciones ?? false,
            nav_lateral: data.config.nav_lateral ?? false,
          };
          setPrefs(serverPrefs);
          localStorage.setItem(LOCAL_KEY, JSON.stringify(serverPrefs));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (prefs.reducir_animaciones) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [prefs.reducir_animaciones]);

  const updatePref = useCallback((key: keyof Preferences, value: boolean) => {
    setPrefs(prev => {
      const next = { ...prev, [key]: value };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
      return next;
    });

    fetch('/api/configuracion', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [key]: value }),
    }).catch(() => {});
  }, []);

  return (
    <PreferencesContext.Provider value={{ prefs, updatePref, loading }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  return useContext(PreferencesContext);
}
