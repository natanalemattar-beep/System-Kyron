'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
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
    contabilidad: '/resumen-negocio',
    juridico: '/resumen-negocio',
    legal: '/escritorio-juridico',
    ventas: '/ventas',
    tpv: '/ventas',
    socios: '/socios',
    sostenibilidad: '/sostenibilidad',
    telecom: '/linea',
    rrhh: '/rrhh',
    nomina: '/rrhh',
    talento: '/rrhh',
};

export function getModuleDashboardPath(modules?: string[]): string | null {
    if (!modules || modules.length === 0) return null;
    for (const mod of modules) {
        const path = MODULE_PATH_MAP[mod];
        if (path) return path;
    }
    return null;
}

function AuthProviderInner({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const refreshUser = useCallback(async () => {
        try {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        }
    }, []);

    useEffect(() => {
        refreshUser().finally(() => setIsLoading(false));
    }, [refreshUser]);

    // Redirect to module-specific dashboard if on a generic page
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
                body: JSON.stringify({ email, password }),
            });
            const text = await res.text();
            let data;
            try { data = JSON.parse(text); } catch { data = { error: 'Respuesta inválida del servidor' }; }
            if (res.ok) {
                setUser(data.user);
                return { success: true };
            }
            return { success: false, error: data.error ?? 'Error al iniciar sesión' };
        } catch {
            return { success: false, error: 'Error de conexión' };
        }
    }, []);

    const logout = useCallback(async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null);
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
