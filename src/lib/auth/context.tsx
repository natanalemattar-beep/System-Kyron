'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { useRouter, usePathname } from '@/navigation';

export interface AuthUser {
    id: number;
    email: string;
    tipo: 'natural' | 'juridico' | 'admin';
    nombre: string;
    apellido?: string;
    cedula?: string;
    razon_social?: string;
    rif?: string;
    modules?: string[];
}

interface AuthContextValue {
    user: AuthUser | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Priority-ordered: first matching module wins
const MODULE_PATH_MAP: Record<string, string> = {
    contabilidad: '/dashboard-empresa',
    juridico: '/dashboard-empresa',
    legal: '/escritorio-juridico',
    ventas: '/dashboard-empresa',
    tpv: '/dashboard-empresa',
    socios: '/dashboard-socios',
    sostenibilidad: '/sostenibilidad',
    telecom: '/mi-linea',
    rrhh: '/dashboard-rrhh',
    nomina: '/dashboard-rrhh',
    talento: '/dashboard-rrhh',
    informatica: '/dashboard-it',
};

export function getModuleDashboardPath(modules?: string[]): string | null {
    if (!modules || modules.length === 0) return null;
    for (const mod of modules) {
        const path = MODULE_PATH_MAP[mod];
        if (path) return path;
    }
    return null;
}

function normalizeUser(raw: AuthUser | null | undefined): AuthUser | null {
    if (!raw?.id) return null;
    return {
        ...raw,
        modules: Array.isArray(raw.modules) ? raw.modules : [],
    };
}

function AuthProviderInner({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const isLoggingOut = useRef(false);

    const refreshUser = useCallback(async () => {
        if (isLoggingOut.current) return null;
        try {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                const normalized = normalizeUser(data.user);
                if (!isLoggingOut.current) setUser(normalized);
                return normalized;
            } else {
                setUser(null);
                return null;
            }
        } catch {
            setUser(null);
            return null;
        }
    }, []);

    useEffect(() => {
        refreshUser().finally(() => setIsLoading(false));
    }, [refreshUser]);

    useEffect(() => {
        if (!isLoading && !user && !isLoggingOut.current) {
            refreshUser();
        }
    }, [pathname, isLoading, user, refreshUser]);

    useEffect(() => {
        if (isLoading || !user?.modules) return;
        if (user.modules.length === 0) return;
        const genericPaths = ['/', '/login'];
        const isGeneric = genericPaths.some(p => pathname === p || pathname.endsWith(p) || pathname === `${p}`);
        if (!isGeneric) return;
        const dashboardPath = getModuleDashboardPath(user.modules);
        if (dashboardPath) {
            router.replace(dashboardPath as any);
        }
    }, [user, isLoading, pathname, router]);

    const login = useCallback(async (email: string, password: string) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: email, password, portal: 'personal' }),
            });
            const text = await res.text();
            let data;
            try { data = JSON.parse(text); } catch { data = { error: 'Respuesta inválida del servidor' }; }
            if (res.ok) {
                setUser(normalizeUser(data.user));
                return { success: true };
            }
            return { success: false, error: data.error ?? 'Error al iniciar sesión' };
        } catch {
            return { success: false, error: 'Error de conexión' };
        }
    }, []);

    const logout = useCallback(async () => {
        isLoggingOut.current = true;
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch {
            // Intenta limpiar sesión aunque falle la API
        }
        setUser(null);
        window.location.href = '/login';
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function AuthProvider({ children }: { children: ReactNode }) {
    return <AuthProviderInner>{children}</AuthProviderInner>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
