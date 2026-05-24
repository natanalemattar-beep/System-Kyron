"use client";

import { ResourceHeader } from "@/components/brand/ResourceHeader";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Globe, Moon, Sun, Monitor, Smartphone, Shield, Bell, User, Lock, Palette } from "lucide-react";

export default function ConfiguracionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900">
      <ResourceHeader />
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-white tracking-tight">Configuración</h1>
          <p className="text-sm text-zinc-400">Personaliza tu experiencia en System Kyron</p>
        </div>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Idioma y Región</h2>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Idioma de la interfaz</p>
                <p className="text-xs text-zinc-500">Cambia el idioma de toda la plataforma</p>
              </div>
              <LanguageSwitcher variant="default" align="end" />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Palette className="h-5 w-5 text-violet-400" />
            <h2 className="text-lg font-bold text-white">Apariencia</h2>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Tema</p>
                <p className="text-xs text-zinc-500">Claro, oscuro o según tu sistema</p>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Seguridad</h2>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Contraseña</p>
                <p className="text-xs text-zinc-500">Actualiza tu contraseña de acceso</p>
              </div>
              <Lock className="h-5 w-5 text-zinc-600" />
            </div>
            <div className="h-px bg-zinc-800" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Verificación en dos pasos</p>
                <p className="text-xs text-zinc-500">Añade una capa extra de seguridad</p>
              </div>
              <Shield className="h-5 w-5 text-zinc-600" />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Notificaciones</h2>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-4">
            <p className="text-sm text-zinc-500">Gestiona qué notificaciones recibes por correo y en la plataforma.</p>
            <p className="text-xs text-zinc-600">Próximamente</p>
          </div>
        </section>
      </div>
    </div>
  );
}
