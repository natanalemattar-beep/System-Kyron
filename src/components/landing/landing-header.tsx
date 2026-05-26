'use client';

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu, X, ChevronDown, ShieldCheck, ArrowRight, ChevronRight,
  KeyRound, UserPlus, Globe, Zap, Cpu, Lock, Headphones, Sparkles,
  LayoutDashboard, FileText, LifeBuoy, LogIn, UserCheck
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from "@/components/language-switcher";
import { useBannerVisible } from "@/components/demo-banner";
import { WhatIsNewModal, ChangelogTrigger } from "./what-is-new-modal";

const navItems = [
  { labelKey: 'home' as const, href: '/' },
  { labelKey: 'platform' as const, href: '/#caracteristicas' },
  { labelKey: 'plans' as const, href: '/precios' },
];

const solutions = [
  { href: "/login-linea?type=personal" as any, icon: Cpu, titleKey: 'connectivity_title' as const, descKey: 'connectivity_desc' as const, iconClass: "bg-kyron-cyan/10 border-kyron-cyan/20 text-kyron-cyan" },
  { href: "/login-escritorio-juridico", icon: ShieldCheck, titleKey: 'legal_title' as const, descKey: 'legal_desc' as const, iconClass: "bg-kyron-emerald/10 border-kyron-emerald/20 text-kyron-emerald" },
  { href: "/soporte", icon: Headphones, titleKey: null as any, descKey: null as any, label: "Atención al Cliente", desc: "Soporte con IA", iconClass: "bg-kyron-cyan/10 border-kyron-cyan/20 text-kyron-cyan" },
];

const mobileNav = [
  { label: 'Inicio', href: '/', icon: LayoutDashboard },
  { label: 'Plataforma', href: '/#caracteristicas', icon: Globe },
  { label: 'Planes', href: '/precios', icon: FileText },
  { label: 'Soporte', href: '/soporte', icon: LifeBuoy },
];

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations('LandingHeader');
  const bannerVisible = useBannerVisible();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <WhatIsNewModal forceOpen={showWhatsNew} onClose={() => setShowWhatsNew(false)} />
      <header
        className="fixed left-0 right-0 z-[150] transition-all duration-500 ease-out"
        style={{
          top: bannerVisible ? 36 : 0,
          transform: `translateY(${scrolled ? 8 : 0}px)`,
        }}
      >
        <div
          className={cn(
            "mx-auto transition-all duration-500",
            scrolled
              ? "max-w-[calc(100%-24px)] md:max-w-[1400px] rounded-2xl md:rounded-[2rem] mt-2 border border-border/50 dark:border-white/10 bg-background/70 backdrop-blur-xl shadow-xl"
              : "max-w-full px-4 md:px-8"
          )}
        >
          <div className="flex items-center justify-between h-14 md:h-20 w-full">
            {/* Logo */}
            <Link href="/" prefetch={false} className="flex items-center gap-2.5 md:gap-3.5 group shrink-0 px-2 md:px-0">
              <div className="relative">
                <Logo className="h-10 w-10 md:h-12 md:w-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 drop-shadow-glow shrink-0" />
                <div className="absolute -inset-2 bg-kyron-cyan/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm md:text-[16px] font-black tracking-tighter uppercase text-foreground transition-colors italic leading-tight">
                  System <span className="text-glow-cyan not-italic">Kyron</span>
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center">
              <div className="flex items-center gap-1 p-1.5 bg-muted/50 dark:bg-white/[0.03] border border-border/50 dark:border-white/5 rounded-2xl">
                {navItems.map((item) => (
                  <Link
                    key={item.labelKey}
                    href={item.href as any}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/60 hover:text-foreground transition-all duration-300 rounded-xl hover:bg-muted dark:hover:bg-white/5 relative group"
                  >
                    {t(item.labelKey)}
                    <span className="absolute bottom-1 left-5 right-5 h-[2px] bg-kyron-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                  </Link>
                ))}

                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/60 hover:text-foreground transition-all duration-300 rounded-xl hover:bg-muted dark:hover:bg-white/5 outline-none group">
                    {t('solutions')}
                    <ChevronDown className="h-3 w-3 opacity-30 group-data-[state=open]:rotate-180 transition-transform" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-72 p-3 rounded-2xl border border-border/50 dark:border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl mt-4 space-y-1">
                    {solutions.map((item, i) => (
                      <DropdownMenuItem key={i} asChild className="rounded-xl p-3 flex items-center gap-4 hover:bg-muted dark:hover:bg-white/5 transition-all group cursor-pointer border border-transparent hover:border-border/50 dark:hover:border-white/5">
                        <Link href={item.href}>
                          <div className={`h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 ${item.iconClass}`}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-black uppercase tracking-tight text-foreground">{item.label || t(item.titleKey!)}</p>
                            <p className="text-[9px] text-muted-foreground/50 font-bold uppercase tracking-widest truncate">{item.desc || t(item.descKey!)}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 ml-auto shrink-0 text-muted-foreground/30 group-hover:text-kyron-cyan group-hover:translate-x-1 transition-all" />
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>

            {/* Desktop right side */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <ChangelogTrigger onOpen={() => setShowWhatsNew(true)} />
              <LanguageSwitcher variant="default" align="end" />
              <ThemeToggle />
              <div className="w-px h-6 bg-border/50 mx-2" />
              <Link href="/login">
                <Button variant="ghost" className="h-10 px-5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 hover:text-foreground border border-transparent hover:border-border/50 transition-all">
                  {t('login')}
                </Button>
              </Link>
              <Link href="/register">
                <Button className="h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] bg-foreground hover:bg-foreground/90 text-background dark:bg-white dark:hover:bg-white/90 dark:text-black shadow-lg shadow-foreground/10 transition-all active:scale-95 border-none">
                  {t('register')}
                  <ArrowRight className="h-3.5 w-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl border border-border/40 dark:border-white/10 text-foreground bg-black/[0.02] dark:bg-white/[0.02] active:scale-90 transition-transform" aria-label={mobileOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}>
                    {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-sm p-0 bg-background dark:bg-[#040712] border-l border-border/50 dark:border-white/[0.06] flex flex-col">
                  {/* Gradient bg */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-kyron-cyan/[0.04] blur-[120px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/[0.03] blur-[100px] rounded-full" />
                  </div>

                  {/* Header */}
                  <SheetHeader className="p-5 pb-4 border-b border-border/50 dark:border-white/[0.06] flex flex-row items-center gap-3 shrink-0 space-y-0 relative z-10">
                    <Logo className="h-9 w-9 shrink-0 drop-shadow-glow" />
                    <div>
                      <SheetTitle className="text-base font-black tracking-tight text-foreground leading-none uppercase italic">System Kyron</SheetTitle>
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] mt-1 bg-gradient-to-r from-kyron-cyan via-blue-400 to-violet-400 bg-clip-text text-transparent block">
                        {t('mobile_portal_sub')}
                      </span>
                    </div>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="ml-auto h-10 w-10 rounded-xl border border-border/40 dark:border-white/10 shrink-0" aria-label="Cerrar menú lateral">
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </SheetHeader>

                  {/* Quick actions */}
                  <div className="px-5 pt-5 pb-3 relative z-10">
                    <div className="flex gap-3">
                      <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-kyron-cyan/5 dark:bg-kyron-cyan/10 border border-kyron-cyan/20 hover:bg-kyron-cyan/10 transition-all group">
                          <div className="h-9 w-9 rounded-xl bg-kyron-cyan/10 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                            <LogIn className="h-4 w-4 text-kyron-cyan" />
                          </div>
                          <div>
                            <p className="text-xs font-black uppercase tracking-widest text-foreground">{t('login')}</p>
                            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-kyron-cyan/50">{t('secure_portal')}</p>
                          </div>
                        </div>
                      </Link>
                      <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-foreground/5 dark:bg-white/[0.06] border border-border/50 dark:border-white/10 hover:bg-foreground/10 transition-all group">
                          <div className="h-9 w-9 rounded-xl bg-foreground/10 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                            <UserCheck className="h-4 w-4 text-foreground/70" />
                          </div>
                          <div>
                            <p className="text-xs font-black uppercase tracking-widest text-foreground">{t('register')}</p>
                            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Nuevo usuario</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Nav links */}
                  <div className="flex-1 overflow-y-auto relative z-10 px-5 pb-4 space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 px-1 pb-1 pt-2">Navegación</p>
                    {mobileNav.map((item) => (
                      <SheetClose key={item.href} asChild>
                        <Link
                          href={item.href as any}
                          onClick={(e) => handleAnchorClick(e as any, item.href)}
                          className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-muted/50 dark:hover:bg-white/[0.03] border border-transparent hover:border-border/50 dark:hover:border-white/5 transition-all group"
                        >
                          <div className="h-9 w-9 rounded-xl bg-muted/50 dark:bg-white/[0.03] flex items-center justify-center shrink-0 group-hover:bg-kyron-cyan/10 transition-colors">
                            <item.icon className="h-4 w-4 text-muted-foreground/50 group-hover:text-kyron-cyan transition-colors" />
                          </div>
                          <span className="text-sm font-bold tracking-wide text-muted-foreground/70 group-hover:text-foreground transition-colors">{item.label}</span>
                          <ChevronRight className="h-3.5 w-3.5 ml-auto text-muted-foreground/20 group-hover:text-kyron-cyan/60 transition-all" />
                        </Link>
                      </SheetClose>
                    ))}

                    <div className="pt-4 mt-4 border-t border-border/30 dark:border-white/[0.04]">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 px-1 pb-1">Soluciones</p>
                      {[
                        { href: "/login-linea?type=personal" as any, icon: Cpu, label: t('connectivity_title') },
                        { href: "/login-escritorio-juridico", icon: ShieldCheck, label: t('legal_title') },
                      ].map((item, i) => (
                        <SheetClose key={i} asChild>
                          <Link
                            href={item.href}
                            className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-muted/50 dark:hover:bg-white/[0.03] border border-transparent hover:border-border/50 dark:hover:border-white/5 transition-all group"
                            onClick={() => setMobileOpen(false)}
                          >
                            <div className="h-9 w-9 rounded-xl bg-muted/50 dark:bg-white/[0.03] flex items-center justify-center shrink-0 group-hover:bg-kyron-cyan/10 transition-colors">
                              <item.icon className="h-4 w-4 text-muted-foreground/50 group-hover:text-kyron-cyan transition-colors" />
                            </div>
                            <span className="text-sm font-bold tracking-wide text-muted-foreground/70 group-hover:text-foreground transition-colors">{item.label}</span>
                            <ChevronRight className="h-3.5 w-3.5 ml-auto text-muted-foreground/20 group-hover:text-kyron-cyan/60 transition-all" />
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="p-5 border-t border-border/50 dark:border-white/[0.06] bg-muted/20 dark:bg-black/30 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <LanguageSwitcher variant="default" align="start" />
                    </div>
                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/30 dark:bg-white/[0.02] border border-border/40 dark:border-white/5">
                      <Lock className="h-3.5 w-3.5 text-kyron-emerald/50 shrink-0" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40">{t('encryption_active')}</span>
                      <div className="ml-auto flex gap-1.5">
                        <ChangelogTrigger onOpen={() => setShowWhatsNew(true)} />
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
