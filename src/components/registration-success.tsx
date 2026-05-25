'use client';

import { CircleCheck, ArrowRight, type LucideIcon } from 'lucide-react';
import { useRouter } from '@/navigation';
import { cn } from '@/lib/utils';
import type { ModuleRegistrationConfig } from '@/lib/register-modules';

interface Props {
  moduleConfig: ModuleRegistrationConfig;
  email: string;
  buttonText?: string;
}

export function RegistrationSuccess({ moduleConfig, email, buttonText }: Props) {
  const router = useRouter();
  const Icon = moduleConfig.icon;
  const btnText = buttonText || `Ir a ${moduleConfig.label}`;

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border shadow-lg">
        <div className={`absolute inset-0 bg-gradient-to-br ${moduleConfig.bgGradient}`} />
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-emerald-400/10 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        <div className="relative px-8 py-12 text-center">
          <div className={cn("inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br mb-8 shadow-xl", moduleConfig.color, moduleConfig.shadowColor)}>
            <Icon className="h-12 w-12 text-white" />
          </div>
          <div className="space-y-2 mb-8">
            <p className="text-sm font-bold text-emerald-500 uppercase tracking-widest">Registro Exitoso</p>
            <h2 className="text-3xl font-bold text-foreground leading-tight">
              ¡Bienvenido a<br />
              <span className={`bg-gradient-to-r ${moduleConfig.color} bg-clip-text text-transparent`}>
                {moduleConfig.label}!
              </span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-3">
              {moduleConfig.welcomeDescription}
            </p>
            <p className="text-xs text-muted-foreground/60 font-medium mt-2">
              {email}
            </p>
          </div>
          <button
            className={cn(
              "w-full h-12 rounded-2xl bg-gradient-to-r hover:opacity-90 text-white font-bold text-base shadow-lg transition-all inline-flex items-center justify-center gap-2",
              moduleConfig.color, moduleConfig.shadowColor
            )}
            onClick={() => router.push(moduleConfig.dashboardPath as any)}
          >
            {btnText}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
