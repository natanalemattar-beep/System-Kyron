"use client";

import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PasswordGateProps {
    children: React.ReactNode;
    secretKey?: string;
    title?: string;
    description?: string;
}

export function PasswordGate({ 
    children, 
    secretKey = "Carlos123",
    title = "Acceso Restringido",
    description = "Este enlace es privado. Ingresa la clave secreta para continuar."
}: PasswordGateProps) {
    const [pass, setPass] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);

    const checkPass = () => {
        if (pass === secretKey) {
            setIsAuthorized(true);
        } else {
            alert("Clave incorrecta. Acceso denegado.");
        }
    };

    if (isAuthorized) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 animate-in fade-in duration-700">
            <div className="h-20 w-20 bg-zinc-800/50 rounded-3xl flex items-center justify-center mb-8 border border-zinc-700/50 shadow-2xl">
                <Lock className="h-10 w-10 text-amber-500" />
            </div>
            
            <div className="space-y-2 mb-10">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                    {title}
                </h2>
                <p className="text-zinc-500 text-sm max-w-xs mx-auto font-medium leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="flex flex-col w-full max-w-xs gap-4">
                <div className="relative group">
                    <Input 
                        type="password" 
                        placeholder="Ingresa la clave maestra..."
                        autoComplete="off"
                        className="h-14 bg-zinc-900/50 border-zinc-800 rounded-2xl px-6 text-white text-center focus:border-amber-500/50 outline-none transition-all group-hover:border-zinc-700"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && checkPass()}
                    />
                </div>
                <Button 
                    onClick={checkPass} 
                    className="h-14 bg-amber-600 hover:bg-amber-500 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-lg shadow-amber-900/20 transition-all active:scale-95"
                >
                    Desbloquear Contenido
                </Button>
            </div>

            <p className="mt-12 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">
                System Kyron • Protocolo de Seguridad 2026
            </p>
        </div>
    );
}
