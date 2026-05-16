'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Lock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

// Clave de acceso: Carlos123
const CORRECT_PASSWORD = 'Carlos123';

export function PasswordGate({ children, title }: { children: React.ReactNode; title: string }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsUnlocked(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 mb-4 shadow-lg">
            <Sparkles className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
          <p className="text-gray-400">Ingresa la clave de acceso</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Clave de acceso"
              className={cn(
                "w-full pl-12 pr-4 py-4 rounded-xl bg-gray-900/50 border text-white placeholder-gray-500",
                "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent",
                error ? "border-red-500 animate-shake" : "border-gray-700"
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-lg"
          >
            Acceder
          </Button>
          {error && (
            <p className="text-red-500 text-center text-sm">Clave incorrecta. Intenta de nuevo.</p>
          )}
        </form>
      </div>
    </div>
  );
}